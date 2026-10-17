import unittest
import tempfile
from pathlib import Path
from brake_roles import Lab
from probe_pickle import Marker


class RoleTests(unittest.TestCase):
    def setUp(self): self.lab = Lab()
    def tearDown(self): self.lab.close()

    def grant(self, nonce='n'):
        return self.lab.issuer.call('grant', 'a', 'write', nonce)

    def commit(self, token, nonce='n'):
        return self.lab.requester.call('commit', token, 'a', 'write', nonce)

    def test_authorized_effect_matches_separate_witness(self):
        self.assertIs(self.commit(self.grant()), True)
        self.assertEqual(self.lab.inspector.call('snapshot'), (('a','write','n'),))
        self.assertEqual(self.lab.observer.call('snapshot'), (('a','write','n'),))

    def test_requester_cannot_mint_or_administer(self):
        for op, args in [('grant', ('intruder','write','n')),
                         ('invalidate_grants', ('a',)), ('suspend_identity', ('a',)),
                         ('resume_identity', ('a',))]:
            self.assertIs(self.lab.requester.call(op, *args), False)
        self.assertEqual(self.lab.inspector.call('snapshot'), ())

    def test_observer_cannot_fabricate_witness(self):
        self.assertIs(self.lab.observer.call('append', ('fake','write','fabricated')), False)
        self.assertEqual(self.lab.observer.call('snapshot'), ())

    def test_untrusted_serialized_object_is_never_executed(self):
        with tempfile.TemporaryDirectory() as directory:
            target = Path(directory) / 'marker'
            self.lab.requester.connection.send(Marker(str(target)))
            self.assertTrue(self.lab.requester.connection.poll(2))
            self.assertEqual(self.lab.requester.connection.recv_bytes(), b'false')
            self.assertFalse(target.exists())
            self.assertEqual(self.lab.inspector.call('snapshot'), ())

    def test_invalidate_old_grant_allows_new_grant(self):
        old = self.grant('old')
        self.lab.issuer.call('invalidate_grants', 'a')
        self.assertIs(self.commit(old, 'old'), False)
        self.assertIs(self.commit(self.grant('new'), 'new'), True)

    def test_suspension_requires_issuer_resume(self):
        old = self.grant('old')
        self.lab.issuer.call('suspend_identity', 'a')
        self.assertIs(self.lab.issuer.call('grant','a','write','new'), False)
        self.assertIs(self.commit(old, 'old'), False)
        self.assertIs(self.lab.requester.call('resume_identity', 'a'), False)
        self.assertEqual(self.lab.inspector.call('snapshot'), ())
        self.lab.issuer.call('resume_identity', 'a')
        self.assertIs(self.commit(old, 'old'), False)
        self.assertIs(self.commit(self.grant('new'), 'new'), True)

    def test_replay_and_mutation_rejected(self):
        token = self.grant()
        self.assertIs(self.lab.requester.call('commit',token,'b','write','n'), False)
        self.assertIs(self.lab.requester.call('commit',token,'a','other','n'), False)
        self.assertIs(self.commit(token), True)
        self.assertIs(self.commit(token), False)

    def test_resource_loss_does_not_claim_no_effect(self):
        token = self.grant()
        self.lab.resource.terminate(); self.lab.resource.join(3)
        self.assertEqual(self.commit(token), 'UNKNOWN')

    def test_trusted_controller_can_still_issue_authority(self):
        # A passing test of attacker access would be a containment failure.
        # Host/harness compromise remains outside the demonstrated boundary.
        self.assertIs(self.commit(self.grant()), True)

    def test_witness_loss_preserves_committed_effect(self):
        token = self.grant()
        self.lab.witness.terminate(); self.lab.witness.join(3)
        result = self.commit(token)
        self.assertEqual(result, 'EFFECT_COMMITTED_WITNESS_UNKNOWN')
        self.assertEqual(self.lab.inspector.call('snapshot'), (('a','write','n'),))
        self.assertTrue(self.lab.resource.is_alive())


if __name__ == '__main__': unittest.main()
