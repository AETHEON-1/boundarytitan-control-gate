import io
import json
import unittest
import urllib.error
from scripts.interaction_sensor import collect

class FakeResponse:
    def __init__(self, payload):
        self.body = io.BytesIO(json.dumps(payload).encode())
    def __enter__(self): return self
    def __exit__(self, *args): return False
    def read(self, *args): return self.body.read(*args)

class SensorTests(unittest.TestCase):
    def test_snapshot(self):
        def opener(request, timeout):
            if request.full_url.endswith("/repos/example/repo"):
                return FakeResponse({"stargazers_count": 2, "forks_count": 1, "open_issues_count": 0})
            return FakeResponse([])
        r = collect("example/repo", "fixture", opener)
        self.assertEqual(r["failures"], [])
        self.assertEqual(r["evidence"]["repository"]["stargazers_count"], 2)
    def test_http_error_is_not_zero_activity(self):
        def opener(request, timeout):
            raise urllib.error.HTTPError(request.full_url, 403, "Forbidden", {}, None)
        r = collect("example/repo", "fixture", opener)
        self.assertEqual(len(r["failures"]), 4)
        self.assertEqual(r["evidence"], {})
    def test_missing_token_rejected(self):
        with self.assertRaises(ValueError):
            collect("example/repo", "")
    def test_invalid_repo_rejected(self):
        with self.assertRaises(ValueError):
            collect("../bad", "fixture")

if __name__ == "__main__":
    unittest.main()
