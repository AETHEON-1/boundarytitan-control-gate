import unittest
from engine import FIXED, RULES, Observation, analyze, receipt

class EngineTests(unittest.TestCase):
    def test_fixed_registry(self):
        self.assertEqual([x[0] for x in FIXED], ["CAN","MAY","OWNER","EVIDENCE","PATH","BRAKE","REVOCATION","RECOVERY","CONTESTATION","RECURSION"])
    def test_adaptive_lineage(self):
        r = analyze([Observation("O1","delegation","worker retains key","fixture:delegation")])
        self.assertEqual(len(r["adaptive"]), 2)
        self.assertTrue(all(x["origin"] == "O1" and x["state"] == "NOT TESTED" for x in r["adaptive"]))
    def test_all_mechanisms(self):
        o = [Observation(f"O{i}", key, "hypothesis", f"fixture:{key}") for i,key in enumerate(RULES)]
        self.assertEqual(len(analyze(o)["adaptive"]), sum(map(len, RULES.values())))
    def test_no_authority_promotion(self):
        for state in ("SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"):
            r = analyze([Observation("X","credential","attempt","fixture:revoked",state)])
            self.assertIs(r["execution_authorized"], False)
            self.assertEqual(r["adaptive"][0]["state"], "NOT TESTED")
    def test_counterexample_refusal_delay(self):
        r = analyze([Observation("X","refusal_delay","authorized payment blocked","fixture:delay")])
        self.assertIn("legitimate action", r["adaptive"][0]["question"])
    def test_self_assessment_attack(self):
        r = analyze([Observation("X","self_evaluation","score rewritten","fixture:self")])
        self.assertIn("scoring", r["adaptive"][0]["question"])
    def test_duplicate_rejected(self):
        o = Observation("X","race","event","fixture:race")
        with self.assertRaises(ValueError): analyze([o,o])
    def test_unknown_mechanism_rejected(self):
        with self.assertRaises(ValueError): analyze([Observation("X","magic","event","fixture:x")])
    def test_missing_provenance_rejected(self):
        with self.assertRaises(ValueError): analyze([Observation("X","race","event","")])
    def test_deterministic_receipt(self):
        o = [Observation("X","alternate_path","bypass","fixture:path")]
        self.assertEqual(receipt(o), receipt(o))
    def test_input_immutable(self):
        o = [Observation("X","override","forgery","fixture:override")]
        analyze(o)
        self.assertEqual(o[0].state, "NOT TESTED")
    def test_no_execution_interface(self):
        import engine
        self.assertFalse(any(hasattr(engine,x) for x in ("execute","authorize","deploy","publish","merge")))

if __name__ == "__main__": unittest.main(verbosity=2)
