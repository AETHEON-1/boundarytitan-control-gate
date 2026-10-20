import unittest
from successor_revocation import run_scenario,fault_probe
class SuccessorRevocation(unittest.TestCase):
    def test_successor_replay_denied(self):
        r=run_scenario()
        self.assertTrue(r["before"]["allowed"])
        self.assertEqual([e["actor"] for e in r["after"]],["A","B","C"])
        self.assertEqual(r["post_revoke_accepted"],0)
        self.assertEqual(len(r["effects"]),1)
    def test_infinite_workload_stops(self):
        self.assertTrue(fault_probe("infinite")["terminated"])
    def test_bounded_starvation_stops(self):
        self.assertTrue(fault_probe("starvation")["terminated"])
if __name__=="__main__":unittest.main()
