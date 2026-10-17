"""BT-WF-001: synthetic, read-only, deterministic model checks. No network, disk writes, or live credentials."""
import hashlib
import json
import unittest

def digest(value):
    return hashlib.sha256(json.dumps(value, sort_keys=True, separators=(",", ":")).encode()).hexdigest()

def bypass_paths(graph, entry="requester", target="effect", gate="gate"):
    """Enumerate simple paths in a finite directed graph; unknown nodes are not evidence of coverage."""
    out = []
    def walk(node, path):
        if node == target:
            if gate not in path:
                out.append(path)
            return
        for nxt in graph.get(node, []):
            if nxt not in path:
                walk(nxt, path + [nxt])
    walk(entry, [entry])
    return out

def stale_revocation(events):
    """Event order is a logical order. Missing revocation or commit evidence is INDETERMINATE."""
    grant = None
    revoked = set()
    decisions = []
    for e in events:
        if e["kind"] == "grant":
            grant = (e["id"], e["scope"])
        elif e["kind"] == "revoke":
            revoked.add(e["id"])
        elif e["kind"] == "effect":
            if grant is None:
                decisions.append("INDETERMINATE")
            else:
                decisions.append("DENY" if grant[0] in revoked or grant[1] != e["scope"] else "ALLOW_IN_MODEL")
    return decisions

def correspondence(controller, observer):
    if observer is None or not observer.get("independent", False):
        return "INDETERMINATE"
    if controller == "PASS" and observer["effect"] == "NO_EFFECT":
        return "CONTRADICTED"
    if observer["effect"] == "EFFECT":
        return "OBSERVED_WITHIN_SCOPE"
    return "UNOBSERVED"

def tamper_check(original, candidate, checkpoint):
    if not checkpoint:
        return "INDETERMINATE"
    return "UNCHANGED" if digest(original) == checkpoint == digest(candidate) else "TAMPER_DETECTED"

class WorkflowIntegrityFixtures(unittest.TestCase):
    def test_authority_bypass_detected(self):
        graph = {"requester": ["gate", "shortcut"], "gate": ["effect"], "shortcut": ["effect"]}
        self.assertEqual(bypass_paths(graph), [["requester", "shortcut", "effect"]])
    def test_gate_only_model(self):
        self.assertEqual(bypass_paths({"requester": ["gate"], "gate": ["effect"]}), [])
    def test_revocation_after_queue(self):
        events = [{"kind":"grant","id":"g1","scope":"A"},{"kind":"revoke","id":"g1"},{"kind":"effect","scope":"A"}]
        self.assertEqual(stale_revocation(events), ["DENY"])
    def test_scope_mismatch(self):
        self.assertEqual(stale_revocation([{"kind":"grant","id":"g1","scope":"A"},{"kind":"effect","scope":"B"}]), ["DENY"])
    def test_observer_contradiction(self):
        self.assertEqual(correspondence("PASS", {"independent":True,"effect":"NO_EFFECT"}), "CONTRADICTED")
    def test_missing_independent_observer(self):
        self.assertEqual(correspondence("PASS", None), "INDETERMINATE")
    def test_tampering_detected(self):
        original = [{"event":"denied","id":1}]
        self.assertEqual(tamper_check(original, [{"event":"approved","id":1}], digest(original)), "TAMPER_DETECTED")
    def test_missing_checkpoint_inconclusive(self):
        self.assertEqual(tamper_check([], [], None), "INDETERMINATE")

if __name__ == "__main__":
    unittest.main()
