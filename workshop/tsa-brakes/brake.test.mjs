import test from 'node:test';
import assert from 'node:assert/strict';
import { createBrake, BrakeDenied } from './brake.mjs';

const setup = () => {
  let now = 100;
  const effects = [], evidence = [];
  const brake = createBrake({
    clock: () => now,
    observe: e => evidence.push(e),
    effect: async x => { effects.push(x); return 'effect-committed'; }
  });
  const spec = { taskId: 't1', principal: 'agent-a', actions: ['write'],
    resources: ['sandbox-file'], maxCommits: 2, deadline: 200 };
  return { brake, spec, effects, evidence, setTime: x => now = x };
};
const req = { principal: 'agent-a', action: 'write', resource: 'sandbox-file', payload: { value: 1 } };
const rejected = async (fn, reason) =>
  assert.rejects(fn, e => e instanceof BrakeDenied && e.reason === reason);

test('TSA: scoped grant commits exactly once; replay denied', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  const g=x.brake.issue('t1',req);
  assert.equal(await x.brake.commit(g,req),'effect-committed');
  await rejected(() => x.brake.commit(g,req),'REVOKED_OR_REPLAYED');
  assert.equal(x.effects.length,1);
});
test('situational: wrong principal, action or resource denied', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  await rejected(async () => x.brake.issue('t1',{...req,resource:'other'}),'OUT_OF_SCOPE');
  const g=x.brake.issue('t1',req);
  await rejected(() => x.brake.commit(g,{...req,principal:'agent-b'}),'SCOPE_MISMATCH');
  assert.equal(x.effects.length,0);
});
test('temporal: expiration denies old token', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  const g=x.brake.issue('t1',req); x.setTime(200);
  await rejected(() => x.brake.commit(g,req),'EXPIRED');
  assert.equal(x.effects.length,0);
});
test('zombie hunter: completion extinguishes queued grant, cannot reopen same task', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  const g=x.brake.issue('t1',req); x.brake.complete('t1');
  await rejected(() => x.brake.commit(g,req),'TASK_CLOSED');
  await rejected(async () => x.brake.authorize(x.spec),'INVALID_SPEC');
  assert.equal(x.effects.length,0);
});
test('revocation: old grant cannot survive', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  const g=x.brake.issue('t1',req); x.brake.revoke('t1');
  await rejected(() => x.brake.commit(g,req),'TASK_CLOSED');
  assert.equal(x.effects.length,0);
});
test('budget: task may not exceed maximum committed operations', async () => {
  const x=setup(); x.brake.authorize({...x.spec,maxCommits:1});
  await x.brake.commit(x.brake.issue('t1',req),req);
  await rejected(async () => x.brake.issue('t1',req),'BUDGET_EXHAUSTED');
  assert.equal(x.effects.length,1);
});
test('cross-disciplinary: task A grant cannot be used for task B', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  x.brake.authorize({...x.spec,taskId:'t2'});
  const g=x.brake.issue('t1',req);
  await rejected(() => x.brake.commit({...g,taskId:'t2'},req),'REVOKED_OR_REPLAYED');
  assert.equal(x.effects.length,0);
});
test('observation: observer failure prevents admission before effect', async () => {
  const evidence=[];
  const effects=[];
  const b=createBrake({clock:()=>100,
    observe:e=>{evidence.push(e); if(e.kind==='COMMIT_ADMITTED') throw Error('observer offline');},
    effect:async x=>effects.push(x)});
  b.authorize({taskId:'t',principal:'a',actions:['write'],resources:['r'],maxCommits:1,deadline:200});
  const g=b.issue('t',{principal:'a',action:'write',resource:'r'});
  await assert.rejects(()=>b.commit(g,{principal:'a',action:'write',resource:'r'}),/observer offline/);
  assert.equal(effects.length,0);
});
test('inverse: deny-only can appear safe; require authorized positive control', async () => {
  const x=setup(); x.brake.authorize(x.spec);
  const g=x.brake.issue('t1',req);
  await x.brake.commit(g,req);
  assert.equal(x.effects.length,1);
  assert.equal(x.evidence.some(e=>e.kind==='COMMIT_ADMITTED'),true);
});
