import unittest
from swarm_composition import *
class SwarmComposition(unittest.TestCase):
 def test_local_quotas_aggregate_into_global_violation(self):
  self.assertTrue(local_only_budget_failure()["unauthorized_global_excess"])
  result,w=bounded_budget()
  self.assertEqual(result,["COMMITTED","DENIED_GLOBAL_CAP"])
  self.assertEqual(w.spent,6)
 def test_successor_delegation_launders_scope(self):
  self.assertTrue(delegation_failure()["successor_can_deploy"])
  self.assertEqual(bounded_delegation(),"DENIED_IDENTITY")
 def test_bearer_token_can_cross_worker_boundary(self):
  self.assertTrue(shared_credential_failure()["impersonation_accepted"])
  self.assertEqual(bounded_shared_identity(),"DENIED_IDENTITY")
 def test_queue_after_stop(self):
  self.assertTrue(queue_after_stop_failure()["post_stop_effect"])
  self.assertEqual(bounded_queue_after_stop(),"DENIED_CLOSED")
 def test_evidence_sources_not_worker_count(self):
  self.assertEqual(corroboration_failure()["naive_independent_count"],2)
  self.assertEqual(bounded_corroboration(),1)
 def test_orchestrator_direct_effect_bypasses_gate(self):
  self.assertTrue(orchestrator_bypass_failure()["post_stop_resource_effect"])
  r,w=bounded_orchestrator()
  self.assertEqual(r,"DENIED_CLOSED")
  self.assertEqual(w.effects,[])
 def test_register_has_all_six_cases(self):
  self.assertEqual(len(run_register()),6)
if __name__=="__main__":unittest.main()
