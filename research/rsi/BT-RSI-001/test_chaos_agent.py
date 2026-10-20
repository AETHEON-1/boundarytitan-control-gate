import unittest
from chaos_agent import experiment,digest
class ChaosAgentTests(unittest.TestCase):
    def test_blind_interval_preserves_revocation(self):
        r=experiment("blind")
        self.assertEqual(r["result"],"SUPPORTED")
        self.assertEqual(r["authority"],"NOT_AUTHORIZED")
        self.assertTrue(any(e["kind"]=="deny" for e in r["events"]))
    def test_untrusted_instruction_does_not_change_gate(self):
        r=experiment("active")
        self.assertTrue(any(e.get("reason")=="no_authority_from_message" for e in r["events"]))
        self.assertEqual(r["result"],"SUPPORTED")
    def test_digest_reproducible(self):
        r=experiment("blind")
        self.assertEqual(r["digest"],digest(r["events"]))
        self.assertEqual(r,experiment("blind"))
    def test_observation_gap_explicit(self):
        r=experiment("blind")
        self.assertGreater(r["blind_interval"][1],r["blind_interval"][0])
        self.assertTrue(any(e["kind"]=="reentry" and e["known_epoch"]!=e["snapshot_epoch"] for e in r["events"]))
if __name__=="__main__":unittest.main()
