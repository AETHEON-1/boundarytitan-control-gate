// BT-TSA-BRAKE-001: development-only reference monitor, not a security boundary.
// In production the enforcer and protected resource MUST live outside agent control.
import { randomUUID } from 'node:crypto';

export class BrakeDenied extends Error {
  constructor(reason) { super(reason); this.name = 'BrakeDenied'; this.reason = reason; }
}
const own = (o,k) => Object.prototype.hasOwnProperty.call(o,k);
const finite = n => Number.isSafeInteger(n) && n >= 0;
const nonempty = s => typeof s === 'string' && s.length > 0;
const copy = x => structuredClone(x);
const deny = reason => { throw new BrakeDenied(reason); };

// Authority grants are created only by a distinct issuer interface.
// This local module is a fixture: possession of its JS object is NOT independent authority.
export function createBrake({ effect, observe, clock = () => Date.now() }) {
  if (typeof effect !== 'function' || typeof observe !== 'function') throw Error('trusted effect and observer required');
  const tasks = new Map();
  const events = [];
  let sequence = 0;
  const record = (kind, data) => {
    const event = Object.freeze({ seq: ++sequence, kind, ...copy(data) });
    events.push(event);
    observe(copy(event)); // Observer failures abort before execution; never silently drop evidence.
    return event;
  };
  const requireTask = id => { const t = tasks.get(id); if (!t) deny('UNKNOWN_TASK'); return t; };
  const current = t => { if (t.closed) deny('TASK_CLOSED'); if (clock() >= t.deadline) deny('EXPIRED'); };
  const authorize = spec => {
    if (!spec || !nonempty(spec.taskId) || !nonempty(spec.principal) ||
      !Array.isArray(spec.actions) || !spec.actions.length || !spec.actions.every(nonempty) ||
      !Array.isArray(spec.resources) || !spec.resources.length || !spec.resources.every(nonempty) ||
      !finite(spec.maxCommits) || spec.maxCommits === 0 || !finite(spec.deadline) ||
      spec.deadline <= clock() || tasks.has(spec.taskId)) deny('INVALID_SPEC');
    const t = { taskId: spec.taskId, principal: spec.principal,
      actions: new Set(spec.actions), resources: new Set(spec.resources),
      maxCommits: spec.maxCommits, commits: 0, deadline: spec.deadline,
      epoch: 1, closed: false, tokens: new Map() };
    record('TASK_AUTHORIZED', { taskId: t.taskId, epoch: t.epoch });
    tasks.set(t.taskId, t);
    return Object.freeze({ taskId: t.taskId, epoch: t.epoch });
  };
  const issue = (taskId, { principal, action, resource }) => {
    const t = requireTask(taskId); current(t);
    if (principal !== t.principal || !t.actions.has(action) || !t.resources.has(resource)) deny('OUT_OF_SCOPE');
    if (t.commits >= t.maxCommits) deny('BUDGET_EXHAUSTED');
    const token = randomUUID();
    t.tokens.set(token, { principal, action, resource, epoch: t.epoch, used: false });
    record('TOKEN_ISSUED', { taskId, epoch: t.epoch, action, resource });
    return Object.freeze({ taskId, token, epoch: t.epoch });
  };
  const commit = async (grant, { principal, action, resource, payload }) => {
    if (!grant || !nonempty(grant.taskId) || !nonempty(grant.token)) deny('INVALID_GRANT');
    const t = requireTask(grant.taskId);
    // All checks and token consumption occur synchronously before first await.
    current(t);
    const p = t.tokens.get(grant.token);
    if (!p || p.used || p.epoch !== t.epoch || grant.epoch !== t.epoch) deny('REVOKED_OR_REPLAYED');
    if (p.principal !== principal || p.action !== action || p.resource !== resource) deny('SCOPE_MISMATCH');
    if (t.commits >= t.maxCommits) deny('BUDGET_EXHAUSTED');
    p.used = true; t.commits++;
    record('COMMIT_ADMITTED', { taskId: t.taskId, epoch: t.epoch, action, resource });
    // In-flight effects cannot be rolled back by this fixture. Production requires
    // atomic resource-side admission/commit, fencing, and an external stop mechanism.
    return effect({ taskId: t.taskId, principal, action, resource, payload: copy(payload) });
  };
  const extinguish = (taskId, kind) => {
    const t = requireTask(taskId);
    if (t.closed) return;
    t.closed = true; t.epoch++; t.tokens.clear();
    record(kind, { taskId, epoch: t.epoch });
  };
  return Object.freeze({
    authorize, issue, commit,
    revoke: id => extinguish(id, 'TASK_REVOKED'),
    complete: id => extinguish(id, 'TASK_COMPLETED'),
    snapshot: () => copy(events),
    // No reopen API. New task requires a new identity and external issuance.
  });
}
