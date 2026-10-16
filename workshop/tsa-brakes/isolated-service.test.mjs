import test from 'node:test';
import assert from 'node:assert/strict';
import { fork } from 'node:child_process';
import { randomBytes } from 'node:crypto';
const service=new URL('./isolated-service.mjs',import.meta.url);
function spawn(role,key){
  const child=fork(service,[],{env:{...process.env,BT_ROLE:role,BT_TEST_KEY:key},stdio:['ignore','ignore','pipe','ipc']});
  let next=0;const pending=new Map();
  child.on('message',m=>{const p=pending.get(m.id);if(!p)return;pending.delete(m.id);m.ok?p.resolve(m.result):p.reject(Error(m.error));});
  child.on('exit',()=>{for(const p of pending.values())p.reject(Error('SERVICE_EXIT'));pending.clear();});
  return {child,call:(cmd,args={})=>new Promise((resolve,reject)=>{
    const id=++next;pending.set(id,{resolve,reject});child.send({id,cmd,args});
  }),stop:()=>child.kill()};
}
async function fixture(){
  const key=randomBytes(32).toString('hex');
  const issuer=spawn('issuer',key),resource=spawn('resource',key);
  const task={taskId:'t-'+randomBytes(6).toString('hex'),principal:'agent',
    action:'write',resource:'owned-fixture',deadline:Date.now()+30000,maxCommits:3};
  await issuer.call('register',task);await resource.call('register',task);
  const request={principal:'agent',action:'write',resource:'owned-fixture'};
  const close=async()=>{const x=await issuer.call('close',{taskId:task.taskId});
    await resource.call('close',x);};
  return {issuer,resource,task,request,close,stop:()=>{issuer.stop();resource.stop();}};
}
test('separate processes: valid scoped grant commits once; replay rejected',async t=>{
  const f=await fixture();t.after(f.stop);
  assert.notEqual(f.issuer.child.pid,f.resource.child.pid);
  const token=await f.issuer.call('issue',{taskId:f.task.taskId});
  await f.resource.call('commit',{token,...f.request});
  await assert.rejects(f.resource.call('commit',{token,...f.request}),/REPLAY/);
  assert.equal((await f.resource.call('inspect')).effects.length,1);
});
test('revocation: pre-issued token cannot commit after resource closure',async t=>{
  const f=await fixture();t.after(f.stop);
  const token=await f.issuer.call('issue',{taskId:f.task.taskId});
  await f.close();
  await assert.rejects(f.resource.call('commit',{token,...f.request}),/TASK_CLOSED/);
  assert.equal((await f.resource.call('inspect')).effects.length,0);
});
test('queued execution: delayed token cannot outlive completion',async t=>{
  const f=await fixture();t.after(f.stop);
  const queued=await f.issuer.call('issue',{taskId:f.task.taskId});
  await f.close();
  await assert.rejects(f.resource.call('commit',{token:queued,...f.request}),/TASK_CLOSED/);
});
test('delegated identity: grant cannot cross principal boundary',async t=>{
  const f=await fixture();t.after(f.stop);
  const token=await f.issuer.call('issue',{taskId:f.task.taskId});
  await assert.rejects(f.resource.call('commit',{token,...f.request,principal:'delegate'}),/REQUEST_SCOPE/);
  assert.equal((await f.resource.call('inspect')).effects.length,0);
});
test('restart: old grant cannot be accepted without restored authority state',async t=>{
  const f=await fixture();t.after(f.stop);
  const token=await f.issuer.call('issue',{taskId:f.task.taskId});
  const replacement=spawn('resource',randomBytes(32).toString('hex'));
  t.after(replacement.stop);
  await replacement.call('register',f.task);
  await assert.rejects(replacement.call('commit',{token,...f.request}),/TOKEN_INVALID/);
  assert.equal((await replacement.call('inspect')).effects.length,0);
});
test('authority forgery: arbitrary token is rejected at resource',async t=>{
  const f=await fixture();t.after(f.stop);
  await assert.rejects(f.resource.call('commit',{token:'fabricated',...f.request}),/TOKEN_INVALID/);
  assert.equal((await f.resource.call('inspect')).effects.length,0);
});
