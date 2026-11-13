import unittest
from brake import IndependentAuthority, Request, Resource, Requester

class BrakeTests(unittest.TestCase):
    def setUp(self):
        self.authority = IndependentAuthority()
        self.resource = Resource(self.authority)
        self.req = Request('worker', 'transfer-simulated', 'ledger-fixture', 'nonce-1', 0)
        self.token = self.authority.grant(self.req)

    def test_authorized_commit(self):
        self.assertTrue(self.resource.commit(self.req, self.token))
        self.assertEqual(len(self.resource.observed()), 1)

    def test_compromised_requester_cannot_forge_authority(self):
        self.assertFalse(self.resource.commit(self.req, 'attacker-forged-token'))
        self.assertEqual(self.resource.observed(), ())

    def test_replay_denied(self):
        self.assertTrue(self.resource.commit(self.req, self.token))
        self.assertFalse(self.resource.commit(self.req, self.token))
        self.assertEqual(len(self.resource.observed()), 1)

    def test_revocation_denies_queued_action(self):
        requester = Requester(self.resource)
        requester.enqueue(self.req, self.token)
        self.authority.revoke('worker')
        self.assertEqual(requester.flush(), [False])
        self.assertEqual(self.resource.observed(), ())

    def test_restart_and_replay_denied_after_revocation(self):
        requester = Requester(self.resource)
        requester.enqueue(self.req, self.token)
        persisted = requester.queue.copy()
        self.authority.revoke('worker')
        restarted = requester.restart()
        restarted.queue = persisted
        self.assertEqual(restarted.flush(), [False])
        self.assertEqual(self.resource.observed(), ())

    def test_action_mutation_denied(self):
        mutated = Request('worker', 'transfer-simulated', 'other-resource', 'nonce-1', 0)
        self.assertFalse(self.resource.commit(mutated, self.token))

    def test_old_epoch_denied_even_other_identity(self):
        self.authority.revoke('unrelated')
        self.assertFalse(self.resource.commit(self.req, self.token))

if __name__ == '__main__':
    unittest.main()
