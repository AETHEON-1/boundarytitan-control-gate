import os
import sqlite3
import tempfile
import unittest
from resource_boundary import launch

class ResourceBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.r=os.path.join(self.tmp.name,"resource.db")
        self.w=os.path.join(self.tmp.name,"witness.db")
        self.process,self.requester,self.owner=launch(self.r,self.w)
        self.assertTrue(self.owner.call("register",task="task",budget=2)["ok"])

    def tearDown(self):
        try:
            self.owner.call("shutdown")
        finally:
            self.requester.close()
            self.owner.close()
            self.process.join(timeout=10)
            if self.process.is_alive():
                self.process.terminate()
                self.process.join()
            self.tmp.cleanup()

    def observed(self):
        # Independent SQLite reader, but same host/admin; no independent custody.
        with sqlite3.connect("file:"+self.r+"?mode=ro",uri=True) as db:
            return db.execute("SELECT token FROM effects ORDER BY token").fetchall()

    def test_requester_cannot_register_stop_or_shutdown_via_its_endpoint(self):
        for command in ("register","stop","shutdown"):
            result=self.requester.call(command,task="task")
            self.assertFalse(result["ok"])
            self.assertIn("REQUESTER_CANNOT_MUTATE_AUTHORITY",result["error"])
        self.assertTrue(self.requester.call("commit",task="task",token="allowed")["ok"])
        self.assertEqual(self.observed(),[("allowed",)])

    def test_owner_stop_blocks_stale_grant_and_independent_reader_sees_no_effect(self):
        self.assertTrue(self.owner.call("stop",task="task")["ok"])
        denied=self.requester.call("commit",task="task",token="stale")
        self.assertFalse(denied["ok"])
        self.assertIn("STOPPED_OR_STALE",denied["error"])
        self.assertEqual(self.observed(),[])

    def test_owner_stop_blocks_new_token_after_stop(self):
        self.assertTrue(self.requester.call("commit",task="task",token="before")["ok"])
        self.assertTrue(self.owner.call("stop",task="task")["ok"])
        denied=self.requester.call("commit",task="task",token="after")
        self.assertFalse(denied["ok"])
        self.assertEqual(self.observed(),[("before",)])

    def test_requester_replay_denied(self):
        self.assertTrue(self.requester.call("commit",task="task",token="one")["ok"])
        self.assertFalse(self.requester.call("commit",task="task",token="one")["ok"])
        self.assertEqual(self.observed(),[("one",)])

if __name__=="__main__":
    unittest.main()
