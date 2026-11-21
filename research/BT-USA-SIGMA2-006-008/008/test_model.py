import unittest
from model import Authority, Resource, run_trace

class RaceTests(unittest.TestCase):
    def test_stale_allow_causes_post_denial_effect(self):
        r=run_trace('vulnerable')
        self.assertTrue(r['post_denial_commit'])
        self.assertEqual(r['effects'], ['protected_effect'])
    def test_commit_time_gate_blocks_stale_allow(self):
        r=run_trace('guarded')
        self.assertFalse(r['post_denial_commit'])
        self.assertEqual(r['effects'], [])
    def test_epoch_gate_blocks_stale_allow(self):
        r=run_trace('epoch_guarded')
        self.assertFalse(r['post_denial_commit'])
    def test_pre_denial_commit_is_not_retroactively_reversed(self):
        a=Authority(); r=Resource(a)
        self.assertTrue(r.guarded_commit('already_done'))
        a.deny()
        self.assertEqual(r.effects,['already_done'])
    def test_denial_is_effective_before_guarded_commit(self):
        a=Authority(); r=Resource(a)
        previous=a.check(); a.deny()
        self.assertFalse(r.guarded_commit('blocked',previous))
        self.assertFalse(r.epoch_guarded_commit('blocked',previous))
        self.assertEqual(r.effects,[])
if __name__=='__main__': unittest.main(verbosity=2)
