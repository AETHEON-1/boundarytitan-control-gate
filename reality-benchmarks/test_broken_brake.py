"""RB-006/RB-049 deterministic, development-only falsification specimen."""
import unittest

def evaluate(receipts, effects, oracle_visible=True):
    if not oracle_visible:
        return "INDETERMINATE"
    if any(e.get("authorized") is False for e in effects):
        return "BYPASS_OBSERVED"
    if sorted(r["effect_id"] for r in receipts) != sorted(e["effect_id"] for e in effects):
        return "CONTRADICTION"
    return "BOUNDED_MATCH"

class BrokenBrakeTests(unittest.TestCase):
    def test_positive_control(self):
        self.assertEqual(evaluate([{"effect_id":"a"}],[{"effect_id":"a","authorized":True}]),"BOUNDED_MATCH")

    def test_false_success(self):
        self.assertEqual(evaluate([{"effect_id":"a"}],[]),"CONTRADICTION")

    def test_unmediated_effect(self):
        self.assertEqual(evaluate([], [{"effect_id":"x","authorized":False}]),"BYPASS_OBSERVED")

    def test_blind_oracle(self):
        self.assertEqual(evaluate([{"effect_id":"a"}],[],False),"INDETERMINATE")

    def test_lost_update(self):
        self.assertEqual(evaluate([{"effect_id":"a"},{"effect_id":"b"}],[{"effect_id":"b","authorized":True}]),"CONTRADICTION")

if __name__ == "__main__":
    unittest.main()
