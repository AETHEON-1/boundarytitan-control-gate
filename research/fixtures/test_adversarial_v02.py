"""Regression probes for the offline BoundaryTitan Workshop v0.2 candidate.

Run only in a checkout of the extracted v0.2 workshop folder with:
    python -m unittest -v test_adversarial_v02.py

Intentionally failing tests. Keep them RED until an independently
reviewable repair is proposed. No production execution is performed.
"""
import copy
import json
import unittest
from pathlib import Path
from workshop import inspect

FIXTURE = Path(__file__).resolve().parent / "fixtures" / "agent-revocation.json"

class KnownFailureProbes(unittest.TestCase):
    def case(self):
        return json.loads(FIXTURE.read_text(encoding="utf-8"))

    def findings(self, c):
        return inspect(c)["findings"]

    def test_F01_reject_malformed_digest(self):
        c = self.case()
        c["sources"][0]["content_sha256"] = "not-a-hash"
        self.assertTrue(any("invalid" in f or "malformed" in f for f in self.findings(c)))

    def test_F02_reject_self_attested_independence(self):
        c = self.case()
        c["sources"][0]["independently_authenticated"] = True
        self.assertTrue(any("authenticity" in f for f in self.findings(c)))

    def test_F03_resolve_independent_review(self):
        c = self.case()
        c["claims"][0].update(evidence_state="SUPPORTED", independent_review_ref="fictional-review-123")
        self.assertTrue(any("independent review" in f for f in self.findings(c)))

    def test_F04_reject_truthy_false_strings(self):
        c = self.case()
        c["corrections"][0].update(origin_corrected="false", recipient_inventory_complete="false",
            downstream_repair_confirmed="false", independent_confirmation_ref="fabricated")
        self.assertTrue(any(f.startswith("correction corr-1:") for f in self.findings(c)))

    def test_F05_resolve_omission_cause_evidence(self):
        c = self.case()
        c["omissions"][0]["cause_evidence_refs"] = ["fabricated"]
        self.assertFalse(inspect(c)["omissions"][0]["cause_established"])

    def test_F06_require_transition_mapping(self):
        c = self.case()
        c["proposed_transitions"] = []
        self.assertTrue(any("transition" in f for f in self.findings(c)))

    def test_F07_resolve_authority_evidence(self):
        c = self.case()
        c["authority_chain"] = {k: {"state": "EVIDENCED", "evidence_refs": ["imaginary"]}
            for k in ("origin", "owner", "scope", "access", "execution", "consequence", "stop", "recovery")}
        self.assertTrue(any(f.startswith(("origin:", "owner:", "scope:", "access:",
            "execution:", "consequence:", "stop:", "recovery:")) for f in self.findings(c)))

if __name__ == "__main__":
    unittest.main()
