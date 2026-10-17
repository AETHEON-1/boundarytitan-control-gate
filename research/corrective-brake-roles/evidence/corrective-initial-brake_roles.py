"""Local role-channel experiment. Harness/host owner is trusted, not contained."""
import multiprocessing as mp
from multiprocessing.connection import wait
import secrets


def witness_service(writer, observer):
    events = []
    while True:
        for conn in wait([writer, observer]):
            try:
                op, value = conn.recv()
            except EOFError:
                return
            if conn is writer and op == 'append':
                events.append(value)
                conn.send(True)
            elif conn is observer and op == 'snapshot':
                conn.send(tuple(events))
            else:
                conn.send(False)


def resource_service(issuer, requester, inspector, writer, principal):
    epochs, grants, used, suspended, effects = {}, {}, set(), set(), []
    roles = {issuer: 'issuer', requester: 'requester', inspector: 'inspector'}
    while True:
        for conn in wait(list(roles)):
            try:
                op, args = conn.recv()
            except EOFError:
                return
            role, result = roles[conn], False
            if role == 'issuer' and op == 'grant':
                who, action, nonce = args
                if who not in suspended:
                    result = secrets.token_hex(24)
                    grants[result] = (who, action, nonce, epochs.get(who, 0))
            elif role == 'issuer' and op in ('invalidate_grants', 'suspend_identity'):
                who, = args
                epochs[who] = epochs.get(who, 0) + 1
                if op == 'suspend_identity':
                    suspended.add(who)
                result = True
            elif role == 'issuer' and op == 'resume_identity':
                who, = args
                suspended.discard(who)
                result = True
            elif role == 'requester' and op == 'commit':
                token, who, action, nonce = args
                result = bool(who == principal and who not in suspended
                              and grants.get(token) == (who, action, nonce, epochs.get(who, 0))
                              and (who, nonce) not in used)
                if result:
                    used.add((who, nonce))
                    effects.append((who, action, nonce))
                    # Effect happens before acknowledgment: witness loss is UNKNOWN,
                    # not proof of no effect. This is deliberately not a transaction.
                    writer.send(('append', effects[-1]))
                    if not writer.poll(1):
                        result = 'EFFECT_COMMITTED_WITNESS_UNKNOWN'
                    else:
                        writer.recv()
            elif role == 'inspector' and op == 'snapshot':
                result = tuple(effects)
            conn.send(result)


class Client:
    def __init__(self, connection):
        self.connection = connection

    def call(self, operation, *args):
        try:
            self.connection.send((operation, args))
            if not self.connection.poll(2):
                return 'UNKNOWN'
            return self.connection.recv()
        except (BrokenPipeError, EOFError, OSError):
            return 'UNKNOWN'


class Lab:
    """Trusted test controller owns ALL handles; not a production boundary."""
    def __init__(self):
        ctx = mp.get_context('spawn')
        i, si = ctx.Pipe(); r, sr = ctx.Pipe(); x, sx = ctx.Pipe()
        w, sw = ctx.Pipe(); o, so = ctx.Pipe()
        self.issuer, self.requester, self.inspector = Client(i), Client(r), Client(x)
        self.observer = Client(o)
        self.witness = ctx.Process(target=witness_service, args=(sw, so))
        self.resource = ctx.Process(target=resource_service, args=(si, sr, sx, w, 'a'))
        self.witness.start(); self.resource.start()
        for endpoint in (si, sr, sx, w, sw, so):
            endpoint.close()

    def close(self):
        for proc in (self.resource, self.witness):
            if proc.is_alive():
                proc.terminate()
            proc.join(3)
        for client in (self.issuer, self.requester, self.inspector, self.observer):
            client.connection.close()
