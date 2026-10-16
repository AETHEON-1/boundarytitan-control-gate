// Durable resource-side reference gate. No real-world effects; the protected effect
// is a committed entry in an owner-controlled fixture state file.
// Must run under a different OS principal and storage permissions in a real deployment.
import {readFileSync,writeFileSync,renameSync,openSync,closeSync,fsyncSync,existsSync} from 'node:fs';
import {dirname,join} from 'node:path';
import {verifyGrant} from './authority-crypto.mjs';

function persist(path,obj){
 const tmp=join(dirname(path),'.'+process.pid+'.'+Math.random().toString(16).slice(2)+'.tmp');
 const fd=openSync(tmp,'wx',0o600);
 try{writeFileSync(fd,JSON.stringify(obj));fsyncSync(fd);}finally{closeSync(fd);}
 renameSync(tmp,path);
 // Durability on a POSIX local filesystem requires syncing the directory.
 const dir=openSync(dirname(path),'r');
 try{fsyncSync(dir);}finally{closeSync(dir);}
}
export function openResourceGate({path,publicPem,clock=()=>Date.now()}){
 if(!path||!publicPem)throw Error('CONFIG_REQUIRED');
 const state=existsSync(path)?JSON.parse(readFileSync(path,'utf8')):{tasks:{},effects:[],version:1};
 const task=id=>{const t=state.tasks[id];if(!t)throw Error('UNKNOWN_TASK');return t;};
 const register=(spec)=>{
  if(!spec||!spec.taskId||!spec.principal||!spec.action||!spec.resource||
   !Number.isSafeInteger(spec.deadline)||spec.deadline<=clock()||
   !Number.isSafeInteger(spec.maxCommits)||spec.maxCommits<1||
   state.tasks[spec.taskId])throw Error('INVALID_TASK');
  state.tasks[spec.taskId]={principal:spec.principal,action:spec.action,
   resource:spec.resource,deadline:spec.deadline,maxCommits:spec.maxCommits,
   epoch:1,closed:false,count:0,used:[]};
  persist(path,state);
 };
 const close=(id)=>{
  const t=task(id);if(t.closed)return;
  t.closed=true;t.epoch++;persist(path,state);
 };
 const commit=(token,request)=>{
  const c=verifyGrant(publicPem,token),t=task(c.taskId);
  if(t.closed)throw Error('TASK_CLOSED');
  if(clock()>=t.deadline)throw Error('EXPIRED');
  if(c.epoch!==t.epoch||c.principal!==t.principal||c.action!==t.action||
   c.resource!==t.resource||c.deadline!==t.deadline||
   c.maxCommits!==t.maxCommits)throw Error('SCOPE_OR_EPOCH');
  if(request.principal!==t.principal||request.action!==t.action||
   request.resource!==t.resource)throw Error('REQUEST_SCOPE');
  if(t.used.includes(c.jti))throw Error('REPLAY');
  if(t.count>=t.maxCommits)throw Error('BUDGET');
  t.used.push(c.jti);t.count++;
  const effect={taskId:c.taskId,jti:c.jti,resource:t.resource,committedAt:clock()};
  state.effects.push(effect);
  persist(path,state); // no await before admission and durable fixture effect
  return structuredClone(effect);
 };
 return Object.freeze({register,close,commit,inspect:()=>structuredClone(state)});
}
