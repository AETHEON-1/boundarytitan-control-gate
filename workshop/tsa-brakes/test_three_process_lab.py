import sqlite3
import tempfile
import unittest
from three_process_lab import launch

class ThreeProcessBoundaryTests(unittest.TestCase):
    def setUp(self):
        self.tmp=tempfile.TemporaryDirectory()
        self.processes,self.owner,self.observer,self.requester,self.resource_db,self.observer_db=launch(self.tmp.name)
        self.assertTrue(self.owner.call('register',task='task')['ok'])
    def tearDown(self):
        try:self.requester.call('shutdown')
        except (EOFError,BrokenPipeError,OSError):pass
        try:self.owner.call('shutdown')
        except (EOFError,BrokenPipeError,OSError):pass
        try:self.observer.call('shutdown')
        except (EOFError,BrokenPipeError,OSError):pass
        for x in (self.owner,self.observer,self.requester):x.close()
        for p in self.processes:
            p.join(timeout=3)
            if p.is_alive():p.terminate();p.join()
        self.tmp.cleanup()
    def effect(self):
        with sqlite3.connect(self.resource_db) as c:
            return c.execute('SELECT token FROM effects ORDER BY token').fetchall()
    def test_revocation_replay_and_queued_request_denied(self):
        self.assertTrue(self.requester.call('commit',task='task',token='before')['ok'])
        self.assertTrue(self.owner.call('stop',task='task')['ok'])
        self.assertFalse(self.requester.call('commit',task='task',token='queued')['ok'])
        self.assertFalse(self.requester.call('commit',task='task',token='before')['ok'])
        self.assertFalse(self.requester.call('register',task='forged')['ok'])
        self.assertEqual(self.effect(),[('before',)])
        self.assertEqual(self.observer.call('read')['receipts'],[('before',)])
    def test_compromised_resource_operator_can_write_directly(self):
        self.assertTrue(self.owner.call('stop',task='task')['ok'])
        with sqlite3.connect(self.resource_db) as c:
            c.execute('INSERT INTO effects VALUES(?,?)',('bypass','task'))
        self.assertEqual(self.effect(),[('bypass',)])
        # Observer does not receive a direct-DB bypass. Missing evidence is
        # a material observation-channel failure, NOT successful detection.
        self.assertEqual(self.observer.call('read')['receipts'],[])
    def test_same_host_admin_can_erase_both_records(self):
        self.assertTrue(self.requester.call('commit',task='task',token='before')['ok'])
        with sqlite3.connect(self.resource_db) as c:c.execute('DELETE FROM effects')
        with sqlite3.connect(self.observer_db) as c:c.execute('DELETE FROM receipts')
        self.assertEqual(self.effect(),[])
        self.assertEqual(self.observer.call('read')['receipts'],[])
    def test_replay_after_stop_cannot_recreate_witness_may(self):
        self.assertTrue(self.owner.call('stop',task='task')['ok'])
        self.assertFalse(self.requester.call('commit',task='task',token='queued',epoch=1)['ok'])
        self.assertFalse(self.requester.call('commit',task='task',token='epoch2',epoch=2)['ok'])
        self.assertFalse(self.owner.call('register',task='task')['ok'])

if __name__=='__main__':unittest.main()
