import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {makeTestKeys,issueGrant} from './authority-crypto.mjs';
import {openResourceGate} from './durable-resource.mjs';

function specimen(){
 const dir=mkdtempSync(join(tmpdir(),'bt-stop-'));
 const path=join(dir,'state.json');
 const keys=makeTestKeys();let now=100;
 const spec={taskId:'task',principal:'worker',action:'write',resource:'owned-sandbox',
  deadline:200,maxCommits:2};
 const request={principal:'worker',action:'write',resource:'owned-sandbox'};
 const open=()=>openResourceGate({path,publicPem:keys.publicPem,clock:()=>now});
 const claims=()=>({...spec,epoch:1});
 const grant=()=>issueGrant(keys.privatePem,claims());
 const cleanup=()=>rmSync(dir,{recursive:true,force:true});
 return {open,spec,request,grant,keys,cleanup,advance:()=>now=200};
}
test('owner stop tombstone survives process-style resource reopening',()=>{
 const x=specimen();try{
  const gate=x.open();gate.register(x.spec);const queued=x.grant();
  gate.close('task');
  const restored=x.open();
  assert.throws(()=>restored.commit(queued,x.request),/TASK_CLOSED/);
  assert.equal(restored.inspect().effects.length,0);
 }finally{x.cleanup();}
});
test('same issuer key after restart does not resurrect a stopped grant',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);g.close('task');
  const newGrant=x.grant();
  assert.throws(()=>x.open().commit(newGrant,x.request),/TASK_CLOSED/);
 }finally{x.cleanup();}
});
test('delegated identity cannot spend parent permission',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);
  assert.throws(()=>g.commit(x.grant(),{...x.request,principal:'delegate'}),/REQUEST_SCOPE/);
  assert.equal(g.inspect().effects.length,0);
 }finally{x.cleanup();}
});
test('authorized positive control and replay rejection',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);const token=x.grant();
  g.commit(token,x.request);
  assert.throws(()=>x.open().commit(token,x.request),/REPLAY/);
  assert.equal(x.open().inspect().effects.length,1);
 }finally{x.cleanup();}
});
test('queued grant expires before resource commit',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);const token=x.grant();x.advance();
  assert.throws(()=>g.commit(token,x.request),/EXPIRED/);
  assert.equal(g.inspect().effects.length,0);
 }finally{x.cleanup();}
});
test('requester cannot forge grant with another private key',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);
  const forged=issueGrant(makeTestKeys().privatePem,{...x.spec,epoch:1});
  assert.throws(()=>g.commit(forged,x.request),/SIGNATURE_INVALID/);
 }finally{x.cleanup();}
});
test('human privileged local override remains a documented open failure',()=>{
 const x=specimen();try{
  const g=x.open();g.register(x.spec);
  // An actor with direct access to this object can call close/register;
  // this fixture does not prove OS-level role isolation.
  assert.equal(typeof g.close,'function');
 }finally{x.cleanup();}
});
