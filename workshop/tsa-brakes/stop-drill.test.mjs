import test from 'node:test';
import assert from 'node:assert/strict';
import { assessStopDrill, zombieInventory } from './stop-drill.mjs';
const base=()=>({
  specimenSha:'test-sha',taskId:'t',resourceId:'r',
  requesterId:'agent',stopOwner:'operator',observerId:'resource-auditor',
  observerIndependent:true,resourcePathCoverage:true,revocationDurable:true,
  stopEffectiveAt:20,commitBoundaryAt:20,effects:[],
  attempts:[{expected:'ALLOW',actual:'COMMITTED'},{expected:'DENY',actual:'DENIED'}]
});
test('bounded stop claim supported only with positive and negative controls',()=>{
  assert.equal(assessStopDrill(base()).state,'SUPPORTED');
});
test('post-stop resource commit contradicts claimed brake',()=>{
  const d=base();d.effects.push({resourceId:'r',committedAt:21});
  assert.equal(assessStopDrill(d).state,'CONTRADICTED');
});
test('self-observer invalidates independent drill',()=>{
  const d=base();d.observerId='agent';
  assert.equal(assessStopDrill(d).state,'TEST INVALID');
});
test('unverified consequence path prevents supported finding',()=>{
  const d=base();d.resourcePathCoverage=false;
  assert.equal(assessStopDrill(d).state,'INDETERMINATE');
});
test('deny-only specimen cannot establish operational brake',()=>{
  const d=base();d.attempts=[{expected:'DENY',actual:'DENIED'}];
  assert.equal(assessStopDrill(d).state,'TEST INVALID');
});
test('unknown stop order cannot be promoted to supported',()=>{
  const d=base();delete d.stopEffectiveAt;
  assert.equal(assessStopDrill(d).state,'INDETERMINATE');
});
test('zombie hunter distinguishes confirmed residual capability from unknown',()=>{
  const x=zombieInventory([
    {id:'a',kind:'queue',independentProbeCommitted:true},
    {id:'b',kind:'lease',resourceSideRevoked:true,independentProbeDenied:true},
    {id:'c',kind:'snapshot',resourceSideRevoked:true}
  ]);
  assert.deepEqual(x.map(v=>v.status),['ZOMBIE_CONFIRMED','EXTINCTION_OBSERVED','UNRESOLVED']);
});
test('human override without independent roles cannot be certified',()=>{
  const d=base();d.stopOwner='agent';
  assert.equal(assessStopDrill(d).state,'TEST INVALID');
});
