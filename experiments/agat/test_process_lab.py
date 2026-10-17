"""AGAT second-stage local process and persistent revocation tests.

A process boundary is not an OS security boundary: same-user attackers may access
the SQLite file. This suite intentionally exposes that limitation.
"""
import multiprocessing as mp
import os
import sqlite3
import tempfile
import unittest


def gate_worker(path, conn):
    db = sqlite3.connect(path)
    db.execute("CREATE TABLE IF NOT EXISTS state (id INTEGER PRIMARY KEY CHECK(id=1), epoch INTEGER NOT NULL, halted INTEGER NOT NULL DEFAULT 0)")
    db.execute("INSERT OR IGNORE INTO state VALUES (1,0)")
    db.execute("CREATE TABLE IF NOT EXISTS permits (nonce TEXT PRIMARY KEY, subject TEXT, action TEXT, epoch INTEGER, used INTEGER DEFAULT 0)")
    db.commit()
    while True:
        command, args = conn.recv()
        if command == "stop":
            conn.send(True)
            break
        if command == "halt":
            # Simulated external stop authority. Durable latch, no requester reset API.
            db.execute("UPDATE state SET halted=1, epoch=epoch+1 WHERE id=1")
            db.commit()
            conn.send(True)
        elif command == "issue":
            nonce, subject, action = args
            epoch, halted = db.execute("SELECT epoch, halted FROM state WHERE id=1").fetchone()
            if halted:
                conn.send(False)
                continue
            try:
                db.execute("INSERT INTO permits VALUES (?,?,?,?,0)", (nonce, subject, action, epoch))
                db.commit()
                conn.send(True)
            except sqlite3.IntegrityError:
                conn.send(False)
        elif command == "revoke":
            db.execute("UPDATE state SET epoch=epoch+1 WHERE id=1")
            db.commit()
            conn.send(True)
        elif command == "commit":
            nonce, subject, action = args
            # Single atomic UPDATE mediates synthetic commit and consumes permit.
            cursor = db.execute("""UPDATE permits SET used=1
                WHERE nonce=? AND subject=? AND action=? AND used=0
                AND epoch=(SELECT epoch FROM state WHERE id=1)
                AND (SELECT halted FROM state WHERE id=1)=0""",
                (nonce, subject, action))
            db.commit()
            conn.send(cursor.rowcount == 1)
        else:
            conn.send(False)
    db.close()
    conn.close()


class ProcessLab(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.path = os.path.join(self.temp.name, "gate.sqlite")
        self.start_worker()

    def start_worker(self):
        self.parent, child = mp.Pipe()
        self.process = mp.Process(target=gate_worker, args=(self.path, child))
        self.process.start()
        child.close()

    def call(self, command, *args):
        self.parent.send((command, args))
        self.assertTrue(self.parent.poll(5), "worker timeout")
        return self.parent.recv()

    def stop_worker(self):
        if self.process.is_alive():
            self.call("stop")
            self.process.join(5)
        if self.process.is_alive():
            self.process.terminate()
            self.process.join(5)
            self.fail("worker failed to stop")
        self.parent.close()

    def tearDown(self):
        self.stop_worker()
        self.temp.cleanup()

    def test_revoke_survives_gate_process_restart(self):
        self.assertTrue(self.call("issue", "queued", "agent", "synthetic_refund"))
        self.assertTrue(self.call("revoke"))
        self.stop_worker()
        self.start_worker()
        self.assertFalse(self.call("commit", "queued", "agent", "synthetic_refund"))

    def test_replay_and_delegation_blocked_across_process(self):
        self.assertTrue(self.call("issue", "once", "agent", "synthetic_refund"))
        self.assertFalse(self.call("commit", "once", "delegate", "synthetic_refund"))
        self.assertTrue(self.call("commit", "once", "agent", "synthetic_refund"))
        self.assertFalse(self.call("commit", "once", "agent", "synthetic_refund"))

    def test_halt_denies_queued_commit_and_new_issue(self):
        self.assertTrue(self.call("issue", "queued-stop", "agent", "synthetic_refund"))
        self.assertTrue(self.call("halt"))
        self.assertFalse(self.call("commit", "queued-stop", "agent", "synthetic_refund"))
        self.assertFalse(self.call("issue", "new-stop", "agent", "synthetic_refund"))

    def test_halt_survives_process_restart_and_revoke(self):
        self.assertTrue(self.call("issue", "old-stop", "agent", "synthetic_refund"))
        self.assertTrue(self.call("halt"))
        self.stop_worker()
        self.start_worker()
        self.assertTrue(self.call("revoke"))
        self.assertFalse(self.call("commit", "old-stop", "agent", "synthetic_refund"))
        self.assertFalse(self.call("issue", "new-after-restart", "agent", "synthetic_refund"))
        self.assertFalse(self.call("resume"))

    def test_duplicate_nonce_not_reissued(self):
        self.assertTrue(self.call("issue", "n", "agent", "synthetic_refund"))
        self.assertFalse(self.call("issue", "n", "agent", "synthetic_refund"))


class DefectiveGate:
    """Known-bad fixture: authorizes by subject/action and ignores revocation."""
    def __init__(self):
        self.permits = set()
    def issue(self, nonce, subject, action):
        self.permits.add((nonce, subject, action))
    def commit(self, nonce, subject, action):
        return (nonce, subject, action) in self.permits
    def revoke(self):
        pass


class DefectDetection(unittest.TestCase):
    def test_detect_deliberately_defective_revocation(self):
        bad = DefectiveGate()
        bad.issue("n", "agent", "synthetic_refund")
        bad.revoke()
        observed_unauthorized_commit = bad.commit("n", "agent", "synthetic_refund")
        self.assertTrue(observed_unauthorized_commit,
                        "Defect fixture must demonstrate an unauthorized commit")


if __name__ == "__main__":
    unittest.main()
