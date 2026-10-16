"""Three-Authority Compromise Test, v0.1.

This is a bounded SAME-ADMINISTRATION negative-control specimen, not three
independent security principals. Tests prove requester API separation and
demonstrate how a compromised resource operator can bypass both the resource
gate and a same-host observer. No real-world compromise is performed.
"""
import os
import sqlite3
import tempfile
import unittest
from resource_boundary import launch

class ThreeAuthorityCompromise(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.resource = os.path.join(self.tmp.name, 'resource.sqlite')
        self.witness = os.path.join(self.tmp.name, 'witness.sqlite')
        self.observer = os.path.join(self.tmp.name, 'observer.sqlite')
        self.process, self.requester, self.owner = launch(self.resource, self.witness)
        assert self.owner.call('register', task='task', budget=2)['ok']
        with sqlite3.connect(self.observer) as db:
            db.execute('CREATE TABLE observed(token TEXT PRIMARY KEY, source TEXT NOT NULL)')
    def tearDown(self):
        try:
            if self.process.is_alive(): self.owner.call('shutdown')
        except (BrokenPipeError, EOFError, OSError): pass
        self.requester.close()
        self.owner.close()
        self.process.join(timeout=5)
        if self.process.is_alive():
            self.process.terminate()
            self.process.join(timeout=5)
        self.tmp.cleanup()
    def effects(self):
        with sqlite3.connect(self.resource) as db:
            return db.execute('SELECT token FROM effects ORDER BY token').fetchall()
    def observations(self):
        with sqlite3.connect(self.observer) as db:
            return db.execute('SELECT token FROM observed ORDER BY token').fetchall()
    def copy_effects_to_observer(self):
        # Polling observer, deliberately NOT independently administered.
        for (token,) in self.effects():
            with sqlite3.connect(self.observer) as db:
                db.execute('INSERT OR IGNORE INTO observed VALUES(?,?)', (token, 'resource-read'))
    def test_requester_replay_queue_and_owner_revocation(self):
        self.assertTrue(self.requester.call('commit', task='task', token='before')['ok'])
        queued = dict(command='commit', task='task', token='queued', epoch=1)
        self.assertTrue(self.owner.call('stop', task='task')['ok'])
        self.assertFalse(self.requester.call(**queued)['ok'])
        self.assertFalse(self.requester.call('commit', task='task', token='before')['ok'])
        self.assertFalse(self.requester.call('register', task='forged')['ok'])
        self.assertFalse(self.requester.call('stop', task='task')['ok'])
        self.assertEqual(self.effects(), [('before',)])
    def test_restart_after_stop_rejects_queued_request(self):
        self.assertTrue(self.owner.call('stop', task='task')['ok'])
        self.assertTrue(self.owner.call('shutdown')['ok'])
        self.process.join(timeout=5)
        self.requester.close()
        self.owner.close()
        self.process, self.requester, self.owner = launch(self.resource, self.witness)
        self.assertFalse(self.requester.call('commit', task='task', token='queued')['ok'])
        self.assertEqual(self.effects(), [])
    def test_resource_operator_direct_write_bypasses_gate(self):
        self.assertTrue(self.owner.call('stop', task='task')['ok'])
        self.assertFalse(self.requester.call('commit', task='task', token='blocked')['ok'])
        # Compromised host operator holds direct SQLite write access.
        # This is the explicit defeating observation, not a passing boundary.
        with sqlite3.connect(self.resource) as db:
            db.execute('INSERT INTO effects VALUES(?,?,?)', ('operator-bypass', 'task', 0))
        self.assertEqual(self.effects(), [('operator-bypass',)])
        self.copy_effects_to_observer()
        self.assertEqual(self.observations(), [('operator-bypass',)])
    def test_same_host_operator_can_erase_evidence(self):
        self.assertTrue(self.owner.call('stop', task='task')['ok'])
        with sqlite3.connect(self.resource) as db:
            db.execute('INSERT INTO effects VALUES(?,?,?)', ('concealed', 'task', 0))
        self.copy_effects_to_observer()
        self.assertEqual(self.observations(), [('concealed',)])
        # Same OS principal can erase BOTH copies. This is not independent custody.
        with sqlite3.connect(self.resource) as db:
            db.execute('DELETE FROM effects WHERE token=?', ('concealed',))
        with sqlite3.connect(self.observer) as db:
            db.execute('DELETE FROM observed WHERE token=?', ('concealed',))
        self.assertEqual(self.effects(), [])
        self.assertEqual(self.observations(), [])
    def test_alternative_direct_resource_path_is_unmediated(self):
        self.assertTrue(self.owner.call('stop', task='task')['ok'])
        # Alternate path is direct DB access, not a requester API command.
        with sqlite3.connect(self.resource) as db:
            db.execute('UPDATE tasks SET closed=0, epoch=1 WHERE id=?', ('task',))
            db.execute('INSERT INTO effects VALUES(?,?,?)', ('alternate-path', 'task', 0))
        self.assertFalse(self.requester.call('commit', task='task', token='still-denied')['ok'])
        self.assertEqual(self.effects(), [('alternate-path',)])

if __name__ == '__main__':
    unittest.main()
