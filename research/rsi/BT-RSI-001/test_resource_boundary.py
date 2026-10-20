import os,unittest
from resource_boundary import authority_receipt,validate_receipt,protected_resource_probe
class ExternalBoundary(unittest.TestCase):
    def setUp(self):
        self.record={"task":"T","human_owner":"test-owner","jurisdiction":"synthetic",
          "scope":"inspect","consequence_owner":"test-consequence-owner","stop_owner":"test-controller"}
        self.key=b"fixture-registry-secret"
    def test_external_registry_receipt_binds_owner_and_scope(self):
        sig=authority_receipt(self.record,self.key)
        self.assertTrue(validate_receipt(self.record,sig,self.key,"T"))
    def test_machine_substitution_of_human_owner_is_detected(self):
        sig=authority_receipt(self.record,self.key)
        changed=dict(self.record,human_owner="model-claimed-owner")
        self.assertFalse(validate_receipt(changed,sig,self.key,"T"))
    def test_cross_task_replay_rejected(self):
        sig=authority_receipt(self.record,self.key)
        self.assertFalse(validate_receipt(self.record,sig,self.key,"T2"))
    def test_missing_stop_owner_rejected(self):
        changed=dict(self.record);del changed["stop_owner"]
        sig=authority_receipt(changed,self.key)
        self.assertFalse(validate_receipt(changed,sig,self.key,"T"))
    def test_worker_uid_cannot_write_resource(self):
        r=protected_resource_probe()
        if r["state"]=="TEST INVALID":self.skipTest(r["reason"])
        self.assertEqual(r["state"],"SUPPORTED",r)
        self.assertTrue(r["resource_unchanged"])
if __name__=="__main__":unittest.main()
