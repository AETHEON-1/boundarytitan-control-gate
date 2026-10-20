import unittest
from adversarial_omissions import (restart_resurrection_counterexample,
 identity_spoof_counterexample,cross_task_isolation,ownership_omission,authority_laundering)
from consequence_mapping import interrogate,example
class OmissionBattery(unittest.TestCase):
    def test_restart_counterexample_is_explicit(self):
        self.assertTrue(restart_resurrection_counterexample()["resurrection_possible"])
    def test_identity_spoof_counterexample_is_explicit(self):
        self.assertTrue(identity_spoof_counterexample()["unauthorized_impersonation_accepted"])
    def test_cross_task_scope(self):
        self.assertFalse(cross_task_isolation()["cross_task_allowed"])
    def test_missing_consequence_owner_blocks_permission(self):
        r=ownership_omission()
        self.assertIn("consequence_owner",r["missing"])
        self.assertFalse(r["execution_permission"])
    def test_model_authority_laundering_flagged(self):
        r=authority_laundering()
        self.assertIn("authority_from_model",r["contradictions"])
        self.assertIn("model_as_final_decision_owner",r["contradictions"])
    def test_complete_human_map_still_does_not_authorize(self):
        r=interrogate(example())
        self.assertEqual(r["missing"],[])
        self.assertFalse(r["execution_permission"])
    def test_unknown_evidence_state_flagged(self):
        record=example();record["evidence_state"]="CERTIFIED"
        self.assertIn("invalid_evidence_state",interrogate(record)["contradictions"])
if __name__=="__main__":unittest.main()
