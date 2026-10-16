import test from 'node:test';
import assert from 'node:assert/strict';
import { createBrake } from './brake.mjs';
import { openResourceGate } from './durable-resource.mjs';
import { makeTestKeys, issueGrant } from './authority-crypto.mjs';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

test('ADVERSARIAL A1: failed observer consumes grant despite no effect', async () => {
  let effects = 0;
  let fail = true;
  const b = createBrake({
    clock: () => 1,
    observe: e => { if (e.kind === 'COMMIT_ADMITTED' && fail) throw Error('OBSERVER_DOWN'); },
    effect: async () => { effects++; }
  });
  b.authorize({taskId:'t',principal:'p',actions:['write'],resources:['r'],maxCommits:1,deadline:10});
  const req={principal:'p',action:'write',resource:'r'};
  const grant=b.issue('t',req);
  await assert.rejects(b.commit(grant,req),/OBSERVER_DOWN/);
  assert.equal(effects,0);
  fail=false;
  await assert.rejects(b.commit(grant,req),/REVOKED_OR_REPLAYED/);
  assert.equal(effects,0);
  // This is a documented availability/atomicity failure, not unauthorized execution.
});

test('ADVERSARIAL A2: stale same-file resource instances overwrite prior effect', () => {
  const dir=mkdtempSync(join(tmpdir(),'bt-adversarial-'));
  try {
    const path=join(dir,'state.json');
    const keys=makeTestKeys();
    const spec={taskId:'t',principal:'p',action:'write',resource:'r',deadline:100,maxCommits:2};
    const req={principal:'p',action:'write',resource:'r'};
    const g0=openResourceGate({path,publicPem:keys.publicPem,clock:()=>1});
    g0.register(spec);
    const a=openResourceGate({path,publicPem:keys.publicPem,clock:()=>1});
    const b=openResourceGate({path,publicPem:keys.publicPem,clock:()=>1});
    a.commit(issueGrant(keys.privatePem,{...spec,epoch:1}),req);
    b.commit(issueGrant(keys.privatePem,{...spec,epoch:1}),req);
    const final=openResourceGate({path,publicPem:keys.publicPem,clock:()=>1}).inspect();
    assert.equal(final.effects.length,1);
    assert.equal(final.tasks.t.count,1);
    // Both commits returned successfully but one durable effect was lost.
  } finally { rmSync(dir,{recursive:true,force:true}); }
});

test('ADVERSARIAL A3: task-local issuer interface can mint authority without external approval', () => {
  const b=createBrake({clock:()=>1,observe:()=>{},effect:async()=>true});
  assert.equal(typeof b.authorize,'function');
  b.authorize({taskId:'self',principal:'p',actions:['write'],resources:['r'],maxCommits:1,deadline:10});
  const grant=b.issue('self',{principal:'p',action:'write',resource:'r'});
  assert.equal(await b.commit(grant,{principal:'p',action:'write',resource:'r'}),true);
  // This demonstrates reachability only; no external MAY was established.
});
