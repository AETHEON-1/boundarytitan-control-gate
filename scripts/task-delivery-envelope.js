"use strict";
const crypto=require("node:crypto"),fs=require("node:fs"),path=require("node:path");
const {convert}=require("./task-to-encyclopedia");
const registry=require("../research/task-bridge/task-registry.v0.1.json");
const digest=x=>crypto.createHash("sha256").update(x).digest("hex");
function ingest(envelope,known=[]){
 if(!envelope||envelope.schema!=="BT-TASK-DELIVERY-v0.1"||!envelope.taskRunId||!envelope.taskId||!envelope.output||typeof envelope.originalOutput!=="string")throw Error("Missing delivery lineage");
 if(!registry.tasks.some(x=>x.id===envelope.taskId&&x.enabled))throw Error("Task unknown or disabled");
 if(envelope.output.taskId!==envelope.taskId)throw Error("Task identity mismatch");
 if(digest(envelope.originalOutput)!==envelope.originalOutputSha256)throw Error("Raw output hash mismatch");
 if(envelope.deliveryVerified!==false||envelope.authorizationGranted!==false)throw Error("Envelope cannot self-certify delivery or approval");
 const key=envelope.taskId+":"+envelope.taskRunId;
 if(known.includes(key))throw Error("Duplicate delivery");
 const candidate=convert(envelope.output);
 return {schema:"BT-TASK-DELIVERY-RECEIPT-v0.1",key,originalOutputSha256:envelope.originalOutputSha256,candidate,sourceRunAttribution:"CLAIMED_NOT_INDEPENDENTLY_VERIFIED",delivery:"MANUAL_OR_UNVERIFIED",archiveAdmission:"HUMAN_REQUIRED",authorizationGranted:false};
}
if(require.main===module){try{let [src,dst]=process.argv.slice(2);if(!src||!dst)throw Error("Usage: node scripts/task-delivery-envelope.js input.json output.json");let result=ingest(JSON.parse(fs.readFileSync(src,"utf8")));fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,JSON.stringify(result,null,2)+"\n");console.log("Candidate receipt prepared; source delivery unverified");}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={ingest,digest};
