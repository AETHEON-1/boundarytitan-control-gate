import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from arrowtime.reproducibility import replay

class ReproducibilityTests(unittest.TestCase):
    def setUp(self):
        self.fixture = json.loads((ROOT / "fixtures" / "composition_over_limit.json").read_text())
    def test_repeated_analysis_is_stable(self):
        r = replay(self.fixture, 30)
        self.assertTrue(r["analysis_reproducible"])
        self.assertEqual(len(r["unique_output_hashes"]), 1)
    def test_key_order_does_not_change_input_hash(self):
        reversed_fixture = dict(reversed(list(self.fixture.items())))
        self.assertEqual(replay(self.fixture, 1)["input_sha256"], replay(reversed_fixture, 1)["input_sha256"])
    def test_changed_action_changes_input_hash(self):
        before = replay(self.fixture, 1)["input_sha256"]
        self.fixture["events"][1]["amount"] = "30"
        self.assertNotEqual(before, replay(self.fixture, 1)["input_sha256"])
    def test_no_execution_or_consequence_claim(self):
        r = replay(self.fixture, 2)
        self.assertEqual(r["execution_reproduced"], "NOT TESTED")
        self.assertEqual(r["consequence_reproduced"], "NOT TESTED")
    def test_reject_unbounded_replay(self):
        with self.assertRaises(ValueError):
            replay(self.fixture, 1001)
