import unittest
from vulnerable_gate_negative_control import exercise
from successor_revocation import run_scenario
class DeliberatelyBrokenGate(unittest.TestCase):
    def test_negative_control_produces_detectable_unauthorized_effect(self):
        r=exercise()
        self.assertEqual(r["result"],"CONTRADICTED")
        self.assertTrue(r["counterexample_detected"])
        self.assertEqual(len(r["unauthorized_effects"]),1)
        self.assertEqual(r["unauthorized_effects"][0]["actor"],"successor-B")
    def test_comparison_gate_denies_stale_successors(self):
        r=run_scenario()
        self.assertEqual(r["post_revoke_accepted"],0)
        self.assertEqual(len(r["effects"]),1)
if __name__=="__main__":unittest.main()
