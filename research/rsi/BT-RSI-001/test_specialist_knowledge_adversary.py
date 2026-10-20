import unittest
from specialist_knowledge_adversary import Authority,IndependentCustodian,specialist_interrogation
class SpecialistKnowledgeBattery(unittest.TestCase):
    def setUp(self):
        self.c=IndependentCustodian(b"external-test-secret")
        self.a=Authority("human-owner","T","inspect","nonce-1")
    def test_persuasive_evidence_cannot_replace_signature(self):
        self.assertEqual(self.c.execute(self.a,"","auditor-approved"),"DENIED_INVALID_AUTHORITY")
    def test_self_declared_jurisdiction_cannot_replace_signature(self):
        self.assertEqual(self.c.execute(self.a,"model-approved",{"jurisdiction":"claimed"}),"DENIED_INVALID_AUTHORITY")
    def test_review_checklist_knowledge_cannot_authorize(self):
        self.assertEqual(self.c.execute(self.a,"checklist-complete",{"score":100}),"DENIED_INVALID_AUTHORITY")
    def test_valid_authority_then_stop_extinguishes_remaining_use(self):
        sig=self.c.sign_for_external_owner(self.a)
        self.assertEqual(self.c.execute(self.a,sig,{}),"COMMITTED")
        self.c.close("T")
        another=Authority("human-owner","T","inspect","nonce-2")
        sig2=self.c.sign_for_external_owner(another)
        self.assertEqual(self.c.execute(another,sig2,{}),"DENIED_CLOSED")
        self.assertEqual(len(self.c.effects),1)
    def test_replay_rejected(self):
        sig=self.c.sign_for_external_owner(self.a)
        self.assertEqual(self.c.execute(self.a,sig,{}),"COMMITTED")
        self.assertEqual(self.c.execute(self.a,sig,{}),"DENIED_REPLAY")
    def test_scope_change_invalidates_authority(self):
        sig=self.c.sign_for_external_owner(self.a)
        altered=Authority("human-owner","T","deploy","nonce-1")
        self.assertEqual(self.c.execute(altered,sig,{}),"DENIED_INVALID_AUTHORITY")
    def test_all_six_specialist_surfaces_have_defeating_observation(self):
        rows=specialist_interrogation()
        self.assertEqual(len(rows),6)
        self.assertTrue(all(x["defeating_observation"] and x["missing_independent_fact"] for x in rows))
if __name__=="__main__":unittest.main()
