"""Development-only serialized authority+commit simulator, no external enforcement."""
import multiprocessing as mp
import secrets

def service(commands, replies, witness):
    versions = {}
    grants = {}
    used = set()
    commits = []
    while True:
        reqid, op, args = commands.get()
        if op == 'stop':
            replies.put((reqid, True)); return
        if op == 'grant':
            who, action, nonce = args
            token = secrets.token_hex(24)
            grants[token] = (who, action, nonce, versions.get(who, 0))
            result = token
        elif op == 'revoke':
            who, = args
            versions[who] = versions.get(who, 0) + 1
            result = versions[who]
        elif op == 'commit':
            token, who, action, nonce = args
            allowed = grants.get(token) == (who, action, nonce, versions.get(who, 0))
            result = bool(allowed and (who, nonce) not in used)
            if result:
                used.add((who, nonce))
                commits.append((who, action, nonce))
                witness.put(('commit', who, action, nonce))
        elif op == 'snapshot':
            result = tuple(commits)
        else:
            result = False
        replies.put((reqid, result))

class Lab:
    def __init__(self):
        ctx = mp.get_context('spawn')
        self.commands, self.replies, self.witness = ctx.Queue(), ctx.Queue(), ctx.Queue()
        self.proc = ctx.Process(target=service, args=(self.commands, self.replies, self.witness))
        self.proc.start()
        self.seq = 0
    def call(self, op, *args):
        self.seq += 1
        self.commands.put((self.seq, op, args))
        rid, result = self.replies.get(timeout=3)
        assert rid == self.seq
        return result
    def close(self):
        if self.proc.is_alive():
            self.call('stop')
        self.proc.join(timeout=3)
        if self.proc.is_alive():
            self.proc.terminate()
            self.proc.join()
