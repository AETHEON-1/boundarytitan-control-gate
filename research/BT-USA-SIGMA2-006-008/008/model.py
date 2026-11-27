"""Deterministic synthetic check/commit race. No external effects."""
from dataclasses import dataclass, field
from threading import RLock

@dataclass
class Authority:
    permitted: bool = True
    epoch: int = 0
    lock: RLock = field(default_factory=RLock)

    def check(self):
        with self.lock:
            return self.permitted, self.epoch

    def deny(self):
        with self.lock:
            self.permitted = False
            self.epoch += 1
            return self.epoch

@dataclass
class Resource:
    authority: Authority
    effects: list = field(default_factory=list)

    def vulnerable_commit(self, action, prior_check):
        if prior_check[0]:
            self.effects.append(action)
            return True
        return False

    def guarded_commit(self, action, prior_check=None):
        with self.authority.lock:
            if not self.authority.permitted:
                return False
            self.effects.append(action)
            return True

    def epoch_guarded_commit(self, action, prior_check):
        with self.authority.lock:
            if not self.authority.permitted or prior_check[1] != self.authority.epoch:
                return False
            self.effects.append(action)
            return True

def run_trace(mode):
    a = Authority()
    r = Resource(a)
    log = []
    prior = a.check()
    log.append({'step':'T1', 'event':'check', 'allowed':prior[0], 'epoch':prior[1]})
    log.append({'step':'T2', 'event':'worker_paused', 'effects':len(r.effects)})
    epoch = a.deny()
    log.append({'step':'T3', 'event':'human_deny_effective', 'epoch':epoch})
    log.append({'step':'T4', 'event':'resume_with_stale_check', 'epoch':prior[1]})
    fn = {'vulnerable':r.vulnerable_commit, 'guarded':r.guarded_commit, 'epoch_guarded':r.epoch_guarded_commit}[mode]
    committed = fn('protected_effect', prior)
    log.append({'step':'T5', 'event':'commit_attempt', 'committed':committed, 'effects':len(r.effects)})
    return {'design':mode, 'trace':log, 'effects':r.effects, 'post_denial_commit':committed}
