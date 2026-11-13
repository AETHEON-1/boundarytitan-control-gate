"""Adversarial probes. Some passes demonstrate attack capability, not defense."""
import unittest
from brake_v2 import Lab

class Adversarial(unittest.TestCase):
    def setUp(self): self.lab=Lab()
    def tearDown(self): self.lab.close()
    def test_revoked_identity_cannot_receive_fresh_grant(self):
        self.lab.call('revoke','a')
        t=self.lab.call('grant','a','write','post-revoke')
        self.assertFalse(self.lab.call('commit',t,'a','write','post-revoke'))
    def test_same_nonce_cannot_be_reissued_for_other_action(self):
        t=self.lab.call('grant','a','write','nonce')
        self.assertTrue(self.lab.call('commit',t,'a','write','nonce'))
        t2=self.lab.call('grant','a','other','nonce')
        self.assertFalse(self.lab.call('commit',t2,'a','other','nonce'))
    def test_authority_process_failure_does_not_create_commit(self):
        self.lab.call('grant','a','write','n')
        self.lab.proc.terminate(); self.lab.proc.join(timeout=2)
        self.assertFalse(self.lab.proc.is_alive())
    def test_unrelated_principal_remains_usable(self):
        t=self.lab.call('grant','a','write','n')
        self.lab.call('revoke','b')
        self.assertTrue(self.lab.call('commit',t,'a','write','n'))
    def test_unauthorized_cross_identity(self):
        t=self.lab.call('grant','a','write','n')
        self.assertFalse(self.lab.call('commit',t,'b','write','n'))
    def test_witness_queue_is_mutable_by_test_controller(self):
        self.lab.witness.put(('commit','fake','write','fabricated'))
        self.assertEqual(self.lab.witness.get(timeout=3),('commit','fake','write','fabricated'))
    def test_direct_service_commands_can_issue_authorization(self):
        self.lab.commands.put((999,'grant',('intruder','write','n')))
        rid,token=self.lab.replies.get(timeout=3)
        self.assertEqual(rid,999)
        self.assertTrue(self.lab.call('commit',token,'intruder','write','n'))
if __name__=='__main__': unittest.main()
