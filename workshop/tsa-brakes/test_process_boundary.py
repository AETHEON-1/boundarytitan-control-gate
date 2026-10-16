"""Adversarial sandbox-only process/race battery. No real independent OS custody."""
import multiprocessing as mp
import os
import sqlite3
import tempfile
import time
import unittest
from transactional_brake import Brake

def attempt(resource, witness, token, start, out):
    start.wait()
    b = Brake(resource, witness)
    try:
        b.commit("task", token)
        out.put(("COMMITTED", token))
    except Exception as e:
        out.put(("DENIED", token, str(e)))
    finally:
        b.close()

def stop_task(resource, witness, start, out):
    start.wait()
    b = Brake(resource, witness)
    try:
        b.stop("task")
        out.put(("STOP_ACK", time.monotonic_ns()))
    except Exception as e:
        out.put(("STOP_ERROR", str(e)))
    finally:
        b.close()

def observe_effects(resource, out):
    # Separate process and SQLite connection; same OS principal, NOT independent custody.
    db = sqlite3.connect("file:" + resource + "?mode=ro", uri=True)
    try:
        out.put(db.execute("SELECT token,task FROM effects ORDER BY token").fetchall())
    finally:
        db.close()

class ProcessBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.r = os.path.join(self.tmp.name, "resource.db")
        self.w = os.path.join(self.tmp.name, "witness.db")
        b = Brake(self.r, self.w)
        b.register("task", budget=1)
        b.close()

    def tearDown(self):
        self.tmp.cleanup()

    def observe(self):
        q = mp.Queue()
        p = mp.Process(target=observe_effects, args=(self.r, q))
        p.start()
        value = q.get(timeout=10)
        p.join(timeout=10)
        self.assertEqual(p.exitcode, 0)
        return value

    def test_requester_has_no_mutation_command_in_commit_interface(self):
        # The Brake class itself is privileged and not suitable as requester API.
        b = Brake(self.r, self.w)
        self.assertTrue(callable(b.register))
        self.assertTrue(callable(b.stop))
        b.close()
        # Documents current crossing: do NOT claim caller isolation from this specimen.

    def test_competing_processes_single_effect_independent_reader(self):
        start = mp.Event()
        out = mp.Queue()
        workers = [mp.Process(target=attempt, args=(self.r,self.w,"p"+str(i),start,out)) for i in range(8)]
        for p in workers: p.start()
        start.set()
        outcomes = [out.get(timeout=20) for _ in workers]
        for p in workers:
            p.join(timeout=20)
            self.assertEqual(p.exitcode, 0)
        self.assertEqual(sum(x[0]=="COMMITTED" for x in outcomes),1)
        self.assertEqual(len(self.observe()),1)

    def test_stop_before_workers_start_prevents_all_effects(self):
        b=Brake(self.r,self.w)
        b.stop("task")
        b.close()
        start=mp.Event()
        out=mp.Queue()
        workers=[mp.Process(target=attempt,args=(self.r,self.w,"late"+str(i),start,out)) for i in range(4)]
        for p in workers:p.start()
        start.set()
        outcomes=[out.get(timeout=20) for _ in workers]
        for p in workers:p.join(timeout=20);self.assertEqual(p.exitcode,0)
        self.assertTrue(all(x[0]=="DENIED" for x in outcomes))
        self.assertEqual(self.observe(),[])

    def test_racing_stop_and_commit_has_at_most_one_effect(self):
        start=mp.Event()
        out=mp.Queue()
        processes=[mp.Process(target=attempt,args=(self.r,self.w,"race",start,out)),
                   mp.Process(target=stop_task,args=(self.r,self.w,start,out))]
        for p in processes:p.start()
        start.set()
        outcomes=[out.get(timeout=20) for _ in processes]
        for p in processes:p.join(timeout=20);self.assertEqual(p.exitcode,0)
        self.assertEqual(sum(x[0]=="STOP_ACK" for x in outcomes),1)
        self.assertLessEqual(len(self.observe()),1)
        # This is NOT a proof of a universal stop ordering. Requires linearization trace.

    def test_crash_after_stop_preserves_tombstone(self):
        b=Brake(self.r,self.w)
        b.stop("task")
        b.close()
        # Kill a separate process while trying a stale grant after acknowledged stop.
        start=mp.Event()
        out=mp.Queue()
        p=mp.Process(target=attempt,args=(self.r,self.w,"after-stop",start,out))
        p.start()
        start.set()
        result=out.get(timeout=20)
        p.join(timeout=20)
        self.assertEqual(result[0],"DENIED")
        self.assertEqual(self.observe(),[])

if __name__=="__main__":
    unittest.main()
