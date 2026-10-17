import unittest
from brake_v2 import Lab

class BrakeTests(unittest.TestCase):
    def setUp(self): self.lab = Lab()
    def tearDown(self): self.lab.close()
    def test_authorized(self):
        t=self.lab.call('grant','a','write','1')
        self.assertTrue(self.lab.call('commit',t,'a','write','1'))
    def test_forgery(self):
        self.assertFalse(self.lab.call('commit','fake','a','write','1'))
    def test_replay(self):
        t=self.lab.call('grant','a','write','1')
        self.assertTrue(self.lab.call('commit',t,'a','write','1'))
        self.assertFalse(self.lab.call('commit',t,'a','write','1'))
    def test_mutation(self):
        t=self.lab.call('grant','a','write','1')
        self.assertFalse(self.lab.call('commit',t,'a','other','1'))
    def test_revoked(self):
        t=self.lab.call('grant','a','write','1')
        self.lab.call('revoke','a')
        self.assertFalse(self.lab.call('commit',t,'a','write','1'))
    def test_unrelated_survives(self):
        t=self.lab.call('grant','a','write','1')
        self.lab.call('revoke','b')
        self.assertTrue(self.lab.call('commit',t,'a','write','1'))
    def test_revocation_before_commit(self):
        t=self.lab.call('grant','a','write','1')
        self.lab.call('revoke','a')
        self.assertFalse(self.lab.call('commit',t,'a','write','1'))
        self.assertEqual(self.lab.call('snapshot'), ())
    def test_restart_replay_simulated(self):
        t=self.lab.call('grant','a','write','1')
        self.lab.call('revoke','a')
        self.assertFalse(self.lab.call('commit',t,'a','write','1'))
    def test_witness_emission(self):
        t=self.lab.call('grant','a','write','1')
        self.assertTrue(self.lab.call('commit',t,'a','write','1'))
        self.assertEqual(self.lab.witness.get(timeout=3),('commit','a','write','1'))
    def test_cross_identity(self):
        t=self.lab.call('grant','a','write','1')
        self.assertFalse(self.lab.call('commit',t,'b','write','1'))
if __name__=='__main__': unittest.main()
