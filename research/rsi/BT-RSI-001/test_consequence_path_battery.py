import unittest
from consequence_path_battery import (direct_database_bypass,stolen_key,
 administrator_override,asynchronous_effect,false_owner_metadata,register)
class ConsequencePathBattery(unittest.TestCase):
    def test_direct_resource_bypass_is_visible(self):
        r=direct_database_bypass()
        self.assertTrue(r["bypass_effect_detected"])
        self.assertFalse(r["custodian_prevented"])
    def test_stolen_credential_is_not_human_consent(self):
        r=stolen_key()
        self.assertTrue(r["unauthorized_principal_can_replay"])
        self.assertFalse(r["cryptographic_identity_proves_consent"])
    def test_privileged_admin_can_resurrect_closure(self):
        r=administrator_override()
        self.assertTrue(r["closed_task_resurrected"])
        self.assertFalse(r["independent_admin_custody"])
    def test_async_external_effect_escapes_close(self):
        r=asynchronous_effect()
        self.assertTrue(r["effect_after_close"])
        self.assertFalse(r["external_commit_barrier"])
    def test_plausible_fake_owner_is_accepted(self):
        r=false_owner_metadata()
        self.assertTrue(r["fabricated_metadata_accepted"])
        self.assertFalse(r["independent_authority_verification"])
    def test_all_five_controls_registered(self):
        self.assertEqual(set(register()),{"direct_database","stolen_key",
            "administrator_override","asynchronous_effect","false_owner_metadata"})
if __name__=="__main__":unittest.main()
