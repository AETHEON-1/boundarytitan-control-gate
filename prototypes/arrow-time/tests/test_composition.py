import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from arrowtime import analyze

class CompositionTests(unittest.TestCase):
    def setUp(self):
        self.f = json.loads((ROOT / "fixtures" / "composition_over_limit.json").read_text())
    def findings(self):
        return [x for x in analyze(self.f)["findings"] if x["code"].startswith("COMPOSITION")]
    def test_limit_exceeded(self):
        self.assertEqual(self.findings()[0]["state"], "CONTRADICTED")
    def test_limit_met(self):
        self.f["events"][1]["amount"] = "30"
        self.assertEqual(self.findings()[0]["state"], "SUPPORTED")
        self.assertEqual(analyze(self.f)["authority_certification"], "NOT AUTHORIZED")
    def test_missing_event(self):
        self.f["cross_action_constraints"][0]["event_ids"].append("absent")
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_missing_amount(self):
        del self.f["events"][0]["amount"]
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_mismatched_permission(self):
        self.f["events"][1]["permission"] = "other"
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_duplicate_member(self):
        self.f["cross_action_constraints"][0]["event_ids"] = ["debit1", "debit1"]
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_unsupported_constraint(self):
        self.f["cross_action_constraints"][0]["kind"] = "other"
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_negative_amount(self):
        self.f["events"][0]["amount"] = "-1"
        self.assertEqual(self.findings()[0]["state"], "INDETERMINATE")
    def test_no_constraint(self):
        del self.f["cross_action_constraints"]
        self.assertEqual(self.findings(), [])
    def test_deterministic(self):
        self.assertEqual(analyze(self.f), analyze(self.f))
