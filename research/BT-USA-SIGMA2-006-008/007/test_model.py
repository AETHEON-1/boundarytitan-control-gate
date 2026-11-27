import unittest
from model import System

PATHS = ('queue', 'delegate', 'replay', 'recovery')

class DenialTests(unittest.TestCase):
    def test_vulnerable_post_denial_paths(self):
        for path in PATHS:
            with self.subTest(path=path):
                s = System('local'); s.dispatch('j', 'transfer', delegated=(path=='delegate'))
                s.deny('transfer')
                if path == 'recovery': s.recover()
                self.assertTrue(s.commit('j', path))
                self.assertEqual(s.committed_after_denial(), ['j'])
    def test_recipient_blocks_all_paths(self):
        for path in PATHS:
            with self.subTest(path=path):
                s = System('recipient'); s.dispatch('j', 'transfer', delegated=(path=='delegate'))
                s.deny('transfer')
                if path == 'recovery': s.recover()
                self.assertFalse(s.commit('j', path))
                self.assertEqual(s.committed_after_denial(), [])
    def test_recipient_fail_closed_on_partition(self):
        s=System('recipient'); s.dispatch('j','transfer'); s.online=False
        self.assertFalse(s.commit('j'))
    def test_recipient_replay_is_idempotent(self):
        s=System('recipient'); s.dispatch('j','transfer')
        self.assertTrue(s.commit('j'))
        self.assertFalse(s.commit('j','replay'))
    def test_pre_denial_commit_not_retroactively_prevented(self):
        s=System('recipient'); s.dispatch('j','transfer')
        self.assertTrue(s.commit('j'))
        s.deny('transfer')
        self.assertEqual(s.committed_after_denial(), [])
        self.assertTrue(s.jobs['j'].committed)
    def test_unrelated_action_not_blocked_by_denial(self):
        s=System('recipient'); s.dispatch('j','inspect')
        s.deny('transfer')
        self.assertFalse(s.commit('j'))
        s.dispatch('j2','inspect')
        self.assertTrue(s.commit('j2'))
    def test_denied_action_remains_denied_after_recovery(self):
        s=System('recipient'); s.dispatch('j','transfer'); s.deny('transfer'); s.recover()
        s.dispatch('j2','transfer')
        self.assertFalse(s.commit('j'))
        self.assertFalse(s.commit('j2'))
if __name__ == '__main__': unittest.main()
