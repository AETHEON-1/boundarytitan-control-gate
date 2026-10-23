import json
import sys
import unittest
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from arrowtime import analyze

def fixture(name):
    return json.loads((ROOT / "fixtures" / name).read_text())

class EngineTests(unittest.TestCase):
    def test_determinism(self):
        f = fixture("revoked_queued.json")
        self.assertEqual(analyze(f), analyze(f))
    def test_revocation(self):
        self.assertIn("PRIOR_REVOCATION", [x["code"] for x in analyze(fixture("revoked_queued.json"))["findings"]])
    def test_unknowns(self):
        self.assertIn("EVENT_TIME", [x["code"] for x in analyze(fixture("unknowns.json"))["findings"]])
    def test_no_certification(self):
        self.assertEqual(analyze(fixture("valid_window.json"))["authority_certification"], "NOT AUTHORIZED")
    def test_window_end_exclusive(self):
        f = fixture("valid_window.json")
        f["events"][0]["time"] = "2026-10-23T11:00:00Z"
        self.assertIn("CONTRADICTED", [x["state"] for x in analyze(f)["findings"]])
    def test_missing_edge_endpoint(self):
        f = fixture("valid_window.json")
        f["edges"] = [{"from":"missing","to":"owner","type":"execution"}]
        self.assertIn("EDGE_SCHEMA", [x["code"] for x in analyze(f)["findings"]])
    def test_causal_cycle(self):
        f = fixture("valid_window.json")
        f["events"] = [{"id":"a","time":"2026-10-23T10:00:00Z","after":["b"]},{"id":"b","time":"2026-10-23T10:00:00Z","after":["a"]}]
        self.assertIn("CAUSAL_CYCLE", [x["code"] for x in analyze(f)["findings"]])
    def test_missing_stop(self):
        self.assertIn("MISSING_STOP", [x["code"] for x in analyze(fixture("revoked_queued.json"))["findings"]])

if __name__ == "__main__":
    unittest.main()
