import concurrent.futures
import sqlite3
import tempfile
import unittest
from pathlib import Path
from authority_transition_ledger import Custodian,BoundaryError,observe,sample_record

class LedgerBattery(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.path=Path(self.tmp.name)/"authority.db"
        self.secrets={"worker-A":b"alpha-key","successor-B":b"beta-key"}
        self.c=Custodian(self.path,self.secrets)
        self.c.open_task("T1")
        self.record=sample_record()
    def tearDown(self):self.tmp.cleanup()
    def sign(self,actor="worker-A",task="T1",payload="inspect"):
        return self.c.issue_signature(actor,task,payload)
    def test_completion_survives_custodian_restart(self):
        self.c.close("T1",self.record)
        restarted=Custodian(self.path,self.secrets)
        r=restarted.commit("T1","worker-A","inspect",self.sign(),self.record)
        self.assertEqual(r["reason"],"CLOSED_OR_UNKNOWN")
        self.assertEqual(observe(self.path)["effects"],[])
    def test_identity_impersonation_fails(self):
        r=self.c.commit("T1","successor-B","inspect",self.sign("worker-A"),self.record)
        self.assertEqual(r["reason"],"UNAUTHENTICATED")
    def test_cross_task_replay_fails(self):
        self.c.open_task("T2")
        r=self.c.commit("T2","worker-A","inspect",self.sign(task="T1"),self.record)
        self.assertEqual(r["reason"],"UNAUTHENTICATED")
    def test_missing_owner_fails_closed(self):
        bad=dict(self.record);del bad["consequence_owner"]
        r=self.c.commit("T1","worker-A","inspect",self.sign(),bad)
        self.assertEqual(r["reason"],"MISSING_AUTHORITY_METADATA")
    def test_observer_sees_committed_effect_and_close(self):
        self.assertTrue(self.c.commit("T1","worker-A","inspect",self.sign(),self.record)["allowed"])
        self.c.close("T1",self.record)
        result=observe(self.path)
        self.assertEqual(len(result["effects"]),1)
        self.assertEqual([x[1] for x in result["transitions"]],["EFFECT","CLOSED"])
    def test_close_vs_concurrent_commits_has_no_effect_after_close_in_ledger_order(self):
        # Concurrent threads; SQLite BEGIN IMMEDIATE serializes commit and closure.
        def operation(i):
            if i==0:
                try:self.c.close("T1",self.record)
                except BoundaryError:pass
                return "close"
            return self.c.commit("T1","worker-A",str(i),self.sign(payload=str(i)),self.record)
        with concurrent.futures.ThreadPoolExecutor(max_workers=12) as pool:
            list(pool.map(operation,range(60)))
        events=observe(self.path)["transitions"]
        closes=[i for i,e in enumerate(events) if e[1]=="CLOSED"]
        self.assertEqual(len(closes),1)
        self.assertFalse(any(e[1]=="EFFECT" for e in events[closes[0]+1:]))
    def test_stale_successor_grant_after_close(self):
        token=self.sign("successor-B")
        self.c.close("T1",self.record)
        r=self.c.commit("T1","successor-B","inspect",token,self.record)
        self.assertEqual(r["reason"],"CLOSED_OR_UNKNOWN")
    def test_missing_task_fails_closed(self):
        r=self.c.commit("nonexistent","worker-A","inspect",self.sign(task="nonexistent"),self.record)
        self.assertEqual(r["reason"],"CLOSED_OR_UNKNOWN")
if __name__=="__main__":unittest.main()
