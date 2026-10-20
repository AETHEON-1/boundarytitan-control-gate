import unittest
from runner import run_scenario, digest

class BoundedWorkflowTests(unittest.TestCase):
    def test_denials_and_positive_control(self):
        for case in ("self_grant","parent_replay","revoked_parent","alternate_path"):
            with self.subTest(case=case):
                r=run_scenario(case)
                self.assertEqual(r["test_state"],"SUPPORTED")
                self.assertFalse(r["observed_effect"])
        self.assertTrue(run_scenario("authorized_read")["observed_effect"])

    def test_deliberate_failure_is_detected(self):
        r=run_scenario("alternate_path",inject_bypass=True)
        self.assertEqual(r["test_state"],"CONTRADICTED")
        self.assertTrue(r["observed_effect"])
        self.assertIn("deliberate_gate_bypass",[x["event"] for x in r["trace"]])

    def test_trace_integrity(self):
        r=run_scenario("self_grant")
        self.assertEqual(r["trace_sha256"],digest(r["trace"]))
        self.assertEqual([x["sequence"] for x in r["trace"]],list(range(1,len(r["trace"])+1)))
        self.assertEqual(r["trace"][-1]["role"],"evidence_keeper")

    def test_no_self_authorization(self):
        for case in ("self_grant","parent_replay","revoked_parent","alternate_path","authorized_read"):
            self.assertEqual(run_scenario(case)["authority_disposition"],"NOT_AUTHORIZED")

    def test_reproducibility(self):
        self.assertEqual(run_scenario("revoked_parent"),run_scenario("revoked_parent"))

if __name__=="__main__":
    unittest.main()
