"""Synthetic Sigma-2 incremental detection fixtures. No external services or real payments."""
import unittest
from dataclasses import dataclass

@dataclass(frozen=True)
class Fixture:
    name: str
    approval_durable: bool
    revoked: bool
    execution_recheck: bool
    independent_stop: bool
    executed: bool
    expected_authorized: bool

def effective_authority(f):
    return f.approval_durable or not f.revoked

def baseline_flags(f):
    # Modeled specialist baseline: execution-time policy validation.
    return f.executed and not effective_authority(f)

def sigma2_flags(f):
    # Candidate Sigma-2 method; currently same decision as baseline.
    return f.executed and not effective_authority(f)

def run_fixture(f):
    if f.expected_authorized != effective_authority(f):
        raise ValueError("Fixture policy oracle contradicts supplied authority facts")
    if f.independent_stop and f.executed:
        raise ValueError("Inconsistent fixture: effective stop and execution")
    if f.execution_recheck and f.executed and not effective_authority(f):
        raise ValueError("Inconsistent fixture: enforced recheck and unauthorized execution")
    return {"baseline": baseline_flags(f), "sigma2": sigma2_flags(f),
            "unauthorized_execution": f.executed and not effective_authority(f)}

class IncrementalDetectionTests(unittest.TestCase):
    def test_unauthorized_queued_execution_detected_by_both(self):
        f = Fixture("revoked_queued", False, True, False, False, True, False)
        self.assertEqual(run_fixture(f), {
            "baseline": True, "sigma2": True, "unauthorized_execution": True})

    def test_durable_approval_is_not_automatically_illegal(self):
        f = Fixture("durable_approval", True, True, False, False, True, True)
        self.assertFalse(run_fixture(f)["sigma2"])

    def test_effective_stop_blocks_execution(self):
        f = Fixture("stopped", False, True, False, True, False, False)
        self.assertFalse(run_fixture(f)["unauthorized_execution"])

    def test_false_positive_guard(self):
        f = Fixture("valid_unrevoked", False, False, True, False, True, True)
        self.assertFalse(run_fixture(f)["baseline"])
        self.assertFalse(run_fixture(f)["sigma2"])

    def test_no_incremental_claim_from_same_rule(self):
        fixtures = [
            Fixture("revoked", False, True, False, False, True, False),
            Fixture("durable", True, True, False, False, True, True),
            Fixture("stopped", False, True, False, True, False, False),
            Fixture("ordinary", False, False, True, False, True, True),
        ]
        incremental = sum(run_fixture(f)["sigma2"] and not run_fixture(f)["baseline"]
                          for f in fixtures)
        self.assertEqual(incremental, 0)

    def test_inconsistent_oracle_rejected(self):
        with self.assertRaises(ValueError):
            run_fixture(Fixture("bad_oracle", False, True, False, False, True, True))

if __name__ == "__main__":
    unittest.main()
