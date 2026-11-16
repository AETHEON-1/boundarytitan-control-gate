"""AGAT synthetic authority-boundary laboratory. Python 3.11+, stdlib only.

Run: python -m unittest discover -s experiments/agat -p 'test_*.py' -v
No network, subprocess, cloud API, production credential, or real consequence sink.
"""
import dataclasses
import hashlib
import json
import unittest


@dataclasses.dataclass(frozen=True)
class Permit:
    subject: str
    action: str
    epoch: int
    nonce: str


class Evidence:
    """Observer-owned append-only in-process event chain (not tamper-proof)."""
    def __init__(self):
        self.events = []
        self.head = "0" * 64

    def record(self, kind, **fields):
        payload = {"seq": len(self.events), "kind": kind, **fields}
        serialized = json.dumps(payload, sort_keys=True, separators=(",", ":"))
        self.head = hashlib.sha256((self.head + serialized).encode()).hexdigest()
        self.events.append((payload, self.head))

    def verify(self):
        previous = "0" * 64
        for payload, digest in self.events:
            serialized = json.dumps(payload, sort_keys=True, separators=(",", ":"))
            previous = hashlib.sha256((previous + serialized).encode()).hexdigest()
            if previous != digest:
                return False
        return previous == self.head


class Gate:
    """Gate state is separate from the requester; simulation, not OS isolation."""
    def __init__(self, evidence):
        self.epoch = 0
        self.issued = set()
        self.used = set()
        self.evidence = evidence

    def issue(self, subject, action, nonce):
        permit = Permit(subject, action, self.epoch, nonce)
        self.issued.add(permit)
        self.evidence.record("issued", nonce=nonce, epoch=self.epoch)
        return permit

    def revoke_all(self):
        self.epoch += 1
        self.evidence.record("revoked", epoch=self.epoch)

    def authorize(self, permit, subject, action):
        allowed = (permit in self.issued and permit not in self.used
                   and permit.epoch == self.epoch
                   and permit.subject == subject and permit.action == action)
        self.evidence.record("decision", nonce=permit.nonce, allowed=allowed,
                             current_epoch=self.epoch)
        if allowed:
            self.used.add(permit)
        return allowed


class Sink:
    """All synthetic consequences enter through the gate."""
    def __init__(self, gate, evidence):
        self.__gate = gate
        self.__evidence = evidence
        self.commits = []

    def commit(self, permit, subject, action):
        if not self.__gate.authorize(permit, subject, action):
            return False
        self.commits.append((subject, action, permit.nonce))
        self.__evidence.record("commit", nonce=permit.nonce, action=action)
        return True


class AGATTests(unittest.TestCase):
    def setUp(self):
        self.evidence = Evidence()
        self.gate = Gate(self.evidence)
        self.sink = Sink(self.gate, self.evidence)

    def test_valid_once_and_replay_refused(self):
        p = self.gate.issue("agent", "synthetic_refund", "n1")
        self.assertTrue(self.sink.commit(p, "agent", "synthetic_refund"))
        self.assertFalse(self.sink.commit(p, "agent", "synthetic_refund"))
        self.assertEqual(len(self.sink.commits), 1)

    def test_revoked_queued_permit_refused(self):
        queued = self.gate.issue("agent", "synthetic_refund", "n2")
        self.gate.revoke_all()
        self.assertFalse(self.sink.commit(queued, "agent", "synthetic_refund"))
        self.assertEqual(self.sink.commits, [])

    def test_delegate_and_action_substitution_refused(self):
        p = self.gate.issue("agent", "synthetic_refund", "n3")
        self.assertFalse(self.sink.commit(p, "delegate", "synthetic_refund"))
        self.assertFalse(self.sink.commit(p, "agent", "synthetic_deploy"))
        self.assertEqual(self.sink.commits, [])

    def test_forged_permit_refused(self):
        forged = Permit("agent", "synthetic_refund", 0, "invented")
        self.assertFalse(self.sink.commit(forged, "agent", "synthetic_refund"))

    def test_restart_requires_fresh_gate_state(self):
        p = self.gate.issue("agent", "synthetic_refund", "n4")
        self.gate.revoke_all()
        # Model a restarted requester; external gate and revocation epoch persist.
        restarted_requester = "agent"
        self.assertFalse(self.sink.commit(p, restarted_requester, "synthetic_refund"))

    def test_evidence_tamper_detected(self):
        p = self.gate.issue("agent", "synthetic_refund", "n5")
        self.sink.commit(p, "agent", "synthetic_refund")
        self.assertTrue(self.evidence.verify())
        self.evidence.events[0][0]["nonce"] = "tampered"
        self.assertFalse(self.evidence.verify())


if __name__ == "__main__":
    unittest.main()
