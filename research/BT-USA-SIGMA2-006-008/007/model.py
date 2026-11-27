"""Deterministic synthetic denial-persistence model. No external I/O."""
from dataclasses import dataclass, field

@dataclass
class Job:
    id: str
    action: str
    issued_epoch: int
    delegated: bool = False
    committed: bool = False

@dataclass
class System:
    mode: str
    epoch: int = 0
    denied: set = field(default_factory=set)
    jobs: dict = field(default_factory=dict)
    ledger: list = field(default_factory=list)
    stale_cache: set = field(default_factory=set)
    online: bool = True

    def dispatch(self, job_id, action, delegated=False):
        self.jobs[job_id] = Job(job_id, action, self.epoch, delegated)
        self.stale_cache.add(job_id)
        self.ledger.append(('dispatch', job_id, self.epoch))

    def deny(self, action):
        self.epoch += 1
        self.denied.add(action)
        self.ledger.append(('deny', action, self.epoch))

    def commit(self, job_id, path='queue'):
        job = self.jobs[job_id]
        if job.committed:
            self.ledger.append(('duplicate_block', job_id, path))
            return False
        if self.mode == 'recipient':
            if not self.online or job.action in self.denied or job.issued_epoch != self.epoch:
                self.ledger.append(('blocked', job_id, path))
                return False
        else:
            if job_id not in self.stale_cache:
                self.ledger.append(('blocked', job_id, path))
                return False
        job.committed = True
        self.ledger.append(('commit', job_id, path))
        return True

    def recover(self):
        self.ledger.append(('recovery', self.epoch))

    def committed_after_denial(self):
        denied_actions = set()
        violations = []
        for event in self.ledger:
            if event[0] == 'deny':
                denied_actions.add(event[1])
            elif event[0] == 'commit':
                job = self.jobs[event[1]]
                if job.action in denied_actions:
                    violations.append(event[1])
        return violations
