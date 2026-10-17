"""Simulation-only multi-process brake. Separate processes, NOT separate administrators."""
import multiprocessing as mp
import secrets

def authority_loop(commands, replies):
    epoch = 0
    revoked = set()
    issued = {}
    while True:
        op, payload = commands.get()
        if op == 'stop':
            return
        if op == 'grant':
            identity, action, nonce = payload
            token = secrets.token_hex(24)
            issued[token] = (identity, action, nonce, epoch)
            replies.put(token)
        elif op == 'revoke':
            revoked.add(payload)
            epoch += 1
            replies.put(epoch)
        elif op == 'check':
            token, identity, action, nonce = payload
            grant = issued.get(token)
            replies.put(bool(grant and grant == (identity, action, nonce, epoch) and identity not in revoked))

def resource_loop(commands, authority_commands, authority_replies, observations):
    used = set()
    while True:
        op, payload = commands.get()
        if op == 'stop':
            return
        if op == 'commit':
            token, identity, action, nonce = payload
            authority_commands.put(('check', payload))
            allowed = authority_replies.get(timeout=3)
            success = bool(allowed and (identity, nonce) not in used)
            if success:
                used.add((identity, nonce))
            observations.put((success, identity, action, nonce))

class Laboratory:
    def __init__(self):
        ctx = mp.get_context('spawn')
        self.auth_cmd, self.auth_reply = ctx.Queue(), ctx.Queue()
        self.res_cmd, self.observations = ctx.Queue(), ctx.Queue()
        self.authority = ctx.Process(target=authority_loop, args=(self.auth_cmd, self.auth_reply))
        self.resource = ctx.Process(target=resource_loop, args=(self.res_cmd, self.auth_cmd, self.auth_reply, self.observations))
        self.authority.start()
        self.resource.start()
    def grant(self, identity='requester', action='fixture-write', nonce='n1'):
        self.auth_cmd.put(('grant', (identity, action, nonce)))
        return self.auth_reply.get(timeout=3)
    def revoke(self, identity='requester'):
        self.auth_cmd.put(('revoke', identity))
        return self.auth_reply.get(timeout=3)
    def commit(self, token, identity='requester', action='fixture-write', nonce='n1'):
        self.res_cmd.put(('commit', (token, identity, action, nonce)))
        return self.observations.get(timeout=3)[0]
    def close(self):
        self.res_cmd.put(('stop', None))
        self.auth_cmd.put(('stop', None))
        self.resource.join(timeout=3)
        self.authority.join(timeout=3)
        for p in (self.resource, self.authority):
            if p.is_alive():
                p.terminate()
                p.join()
