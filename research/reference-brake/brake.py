"""In-memory simulation-only brake; not a security boundary or live authorization service."""
from dataclasses import dataclass
import hashlib
import hmac
import json

@dataclass(frozen=True)
class Request:
    identity: str
    action: str
    resource: str
    nonce: str
    epoch: int

class IndependentAuthority:
    def __init__(self):
        self.epoch = 0
        self.grants = set()
        self.revoked = set()
        self.secret = b'fixture-key-held-only-by-authority'

    def grant(self, req):
        if req.epoch != self.epoch:
            raise ValueError('stale epoch')
        payload = json.dumps(req.__dict__, sort_keys=True).encode()
        token = hmac.new(self.secret, payload, hashlib.sha256).hexdigest()
        self.grants.add((req, token))
        return token

    def revoke(self, identity):
        self.revoked.add(identity)
        self.epoch += 1

    def allows(self, req, token):
        payload = json.dumps(req.__dict__, sort_keys=True).encode()
        expected = hmac.new(self.secret, payload, hashlib.sha256).hexdigest()
        return (req.epoch == self.epoch and req.identity not in self.revoked
                and hmac.compare_digest(expected, token)
                and (req, token) in self.grants)

class Resource:
    def __init__(self, authority):
        self._authority = authority
        self._commits = []
        self._used_nonces = set()

    def commit(self, req, token):
        if not self._authority.allows(req, token):
            return False
        if (req.identity, req.nonce) in self._used_nonces:
            return False
        self._used_nonces.add((req.identity, req.nonce))
        self._commits.append(req)
        return True

    def observed(self):
        return tuple(self._commits)

class Requester:
    def __init__(self, resource):
        self.resource = resource
        self.queue = []

    def enqueue(self, req, token):
        self.queue.append((req, token))

    def restart(self):
        return Requester(self.resource)

    def flush(self):
        results = [self.resource.commit(r, t) for r, t in self.queue]
        self.queue.clear()
        return results
