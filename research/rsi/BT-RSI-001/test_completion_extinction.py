import unittest
from completion_extinction import run,vulnerable_completion_control
class CompletionExtinction(unittest.TestCase):
    def test_completion_extinguishes_stale_grants_for_all_actor_labels(self):
        r=run()
        self.assertTrue(r["before"]["allowed"])
        self.assertTrue(r["close"]["closed"])
        self.assertEqual(len(r["after"]),5)
        self.assertTrue(all(not x["allowed"] and x["closed_at_decision"] for x in r["after"]))
        self.assertEqual(len(r["effects"]),1)
        self.assertEqual(r["unauthorized_after_close"],[])
    def test_deliberately_broken_completion_gate_is_detected(self):
        r=vulnerable_completion_control()
        self.assertTrue(r["violation_detected"])
        self.assertEqual(len(r["effects"]),1)
if __name__=="__main__":unittest.main()
