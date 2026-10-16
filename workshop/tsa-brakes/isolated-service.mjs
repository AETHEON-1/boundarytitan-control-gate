// Separate-process reference authority and protected resource.
// Controller-only IPC, not a production trust boundary.
import { createHmac, timingSafeEqual, randomUUID } from 'node:crypto';
const role=process.env.BT_ROLE;
const key=process.env.BT_TEST_KEY;
if (!['issuer','resource'].includes(role) || !key) throw Error('isolated fixture configuration missing');
const grants=new Map(), tasks=new Map(), effects=[], events=[];
const sign = data => createHmac('sha256',key).update(data).digest('hex');
const token = claims => { const body=Buffer.from(JSON.stringify(claims)).toString('base64url'); return body+'.'+sign(body); };
const decode = value => {
  if (typeof value!=='string') throw Error('TOKEN_INVALID');
  const parts=value.split('.');
  if(parts.length!==2 || !/^[a-f0-9]{64}$/.test(parts[1])) throw Error('TOKEN_INVALID');
  const a=Buffer.from(sign(parts[0]),'hex'),b=Buffer.from(parts[1],'hex');
  if(!timingSafeEqual(a,b)) throw Error('TOKEN_INVALID');
  return JSON.parse(Buffer.from(parts[0],'base64url').toString('utf8'));
};
const requireTask=id=>{const t=tasks.get(id);if(!t) throw Error('UNKNOWN_TASK');return t;};
const active=t=>{if(t.closed)throw Error('TASK_CLOSED');if(Date.now()>=t.deadline)throw Error('EXPIRED');};
const handle=async ({cmd,args={}})=>{
  if(role==='issuer'){
    if(cmd==='register'){
      const {taskId,principal,action,resource,deadline,maxCommits}=args;
      if(![taskId,principal,action,resource].every(x=>typeof x==='string'&&x.length>0)||
        !Number.isSafeInteger(deadline)||deadline<=Date.now()||
        !Number.isSafeInteger(maxCommits)||maxCommits<1||tasks.has(taskId))throw Error('INVALID_TASK');
      tasks.set(taskId,{taskId,principal,action,resource,deadline,maxCommits,epoch:1,closed:false});
      return {taskId,epoch:1};
    }
    if(cmd==='issue'){
      const t=requireTask(args.taskId);active(t);
      const claims={...t,jti:randomUUID()};delete claims.closed;
      return token(claims);
    }
    if(cmd==='close'){
      const t=requireTask(args.taskId);t.closed=true;t.epoch++;
      return {taskId:t.taskId,epoch:t.epoch,closed:true};
    }
    throw Error('ISSUER_COMMAND_DENIED');
  }
  if(cmd==='register'){
    const {taskId,principal,action,resource,deadline,maxCommits}=args;
    if(tasks.has(taskId))throw Error('DUPLICATE_TASK');
    tasks.set(taskId,{taskId,principal,action,resource,deadline,maxCommits,epoch:1,closed:false,count:0,used:new Set()});
    return true;
  }
  if(cmd==='close'){
    const t=requireTask(args.taskId);t.closed=true;t.epoch=args.epoch;
    return true;
  }
  if(cmd==='commit'){
    const c=decode(args.token),t=requireTask(c.taskId);
    active(t);
    if(c.epoch!==t.epoch||c.principal!==t.principal||c.action!==t.action||
      c.resource!==t.resource||c.deadline!==t.deadline||
      c.maxCommits!==t.maxCommits)throw Error('SCOPE_OR_EPOCH');
    if(args.principal!==t.principal||args.action!==t.action||args.resource!==t.resource)throw Error('REQUEST_SCOPE');
    if(t.used.has(c.jti))throw Error('REPLAY');
    if(t.count>=t.maxCommits)throw Error('BUDGET');
    t.used.add(c.jti);t.count++;
    const e={taskId:t.taskId,principal:t.principal,action:t.action,resource:t.resource,jti:c.jti};
    effects.push(e);events.push({kind:'RESOURCE_COMMITTED',...e});
    return {committed:true,count:t.count};
  }
  if(cmd==='inspect')return {effects:[...effects],events:[...events]};
  throw Error('RESOURCE_COMMAND_DENIED');
};
process.on('message',async m=>{
  try {const result=await handle(m);process.send({id:m.id,ok:true,result});}
  catch(e){process.send({id:m.id,ok:false,error:e.message});}
});
