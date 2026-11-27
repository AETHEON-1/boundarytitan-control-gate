import unittest
from fixture import CASES, evaluate

class FixtureTests(unittest.TestCase):
    def test_baseline(self):
        r=evaluate(CASES[0]); self.assertTrue(r['model_stopped']); self.assertFalse(r['queued_executes'])
    def test_unverified_signal(self):
        self.assertFalse(evaluate(CASES[1])['standing'])
    def test_translation_drift(self):
        self.assertFalse(evaluate(CASES[2])['translation_faithful'])
    def test_stopped_but_queued(self):
        r=evaluate(CASES[3]); self.assertTrue(r['model_stopped']); self.assertTrue(r['queued_executes'])
    def test_denial_does_not_propagate(self):
        self.assertFalse(evaluate(CASES[4])['denial_effective'])
    def test_invalid_order(self):
        self.assertFalse(evaluate(CASES[5])['authorized_stop'])
if __name__ == '__main__': unittest.main()
