"use strict";
/**
 * Milestone 001 evidence gate. This is an offline assessor, not an origin verifier.
 * Its output deliberately cannot certify live provenance or authorize admission.
 */
const {createHash}=require("node:crypto");
const cryptoHash=(s)=>createHash("sha256").update(s,"utf8").digest("hex");
function assess(e){
 if(!e||e.schema!=="BT-M001-EVIDENCE-v0.1")throw Error("Invalid milestone evidence schema");
 if(!e.task||typeof e.task.taskId!=="string"||!e.task.taskId)throw Error("Missing task identity");
 if(!e.github||typeof e.github.headSha!=="string")throw Error("Missing repository provenance metadata");
 if(e.originAttested===true||e.archiveAdmitted===true||e.executionAuthorized===true)throw Error("Self-declared authority or attestation prohibited");
 const observations=[],blocking=[];
 const note=(code,state,description,blocked=true)=>{
  const item={code,state,description};observations.push(item);if(blocked)blocking.push(code);
 };
 if(typeof e.task.lastRunTime==="string"&&e.task.lastRunTime){
  note("TASK_SCHEDULE_METADATA_PRESENT","SUPPORTED","Task definition reports a last-run timestamp; no execution ID is inferred",false);
 }else note("TASK_LAST_RUN_TIME_MISSING","INDETERMINATE","Task execution timestamp unavailable");
 if(typeof e.task.executionId==="string"&&e.task.executionId){
  note("EXECUTION_ID_CLAIM_ONLY","INDETERMINATE","Unverified execution ID cannot authenticate scheduler origin");
 }else note("EXECUTION_ID_UNAVAILABLE","NOT TESTED","No independently retrievable scheduler execution ID");
 const raw=e.task.originalOutput;
 if(typeof raw!=="string"||raw.length===0)note("ORIGINAL_TASK_OUTPUT_UNAVAILABLE","NOT TESTED","No exact scheduler output available for byte comparison");
 else {
  note("TASK_OUTPUT_BYTES_SUPPLIED","SUPPORTED","Raw output supplied, provenance still unverified",false);
  if(typeof e.task.reportedSha256==="string"&&cryptoHash(raw)!==e.task.reportedSha256)
   note("TASK_OUTPUT_DIGEST_MISMATCH","CONTRADICTED","Raw output does not match reported SHA-256");
 }
 if(!e.github.artifactId)note("GITHUB_RECEIPT_MISSING","NOT TESTED","No GitHub artifact or intake receipt");
 else if(e.github.sourceKind==="SYNTHETIC_FIXTURE")
  note("GITHUB_ARTIFACT_SYNTHETIC","SUPPORTED","Artifact exists but originates from synthetic repository fixture");
 else note("GITHUB_ARTIFACT_ORIGIN_UNVERIFIED","INDETERMINATE","Artifact identity does not prove task-origin authenticity");
 if(typeof e.github.deliveredOriginalOutput==="string"&&typeof raw==="string"&&raw.length>0){
  if(raw!==e.github.deliveredOriginalOutput)note("DELIVERY_BYTES_MISMATCH","CONTRADICTED","Original bytes differ across the delivery boundary");
  else note("DELIVERED_BYTES_MATCH","SUPPORTED","Byte equality observed, but source/run origin remains unverified",false);
 }else note("LIVE_DELIVERY_BYTES_NOT_COMPARED","NOT TESTED","Exact scheduled output and matching GitHub receipt not jointly accessible");
 note("INDEPENDENT_ORIGIN_ATTESTATION_MISSING","NOT TESTED","No independently trusted scheduler-origin verification adapter or source proof");
 note("INDEPENDENT_CUSTODY_UNVERIFIED","NOT TESTED","No independently witnessed atomic ledger head or persistent CAS established");
 note("ENCLYCLOPEDIA_ADMISSION_NOT_PERFORMED","NOT TESTED","No human archive-admission record was issued");
 const result={schema:"BT-M001-RESULT-v0.1",milestone:"FIRST_AUTHENTIC_RESEARCH_DELIVERY",status:"NOT ESTABLISHED",evidenceState:"INDETERMINATE",taskId:e.task.taskId,reportedLastRunTime:e.task.lastRunTime||null,githubHeadSha:e.github.headSha,githubArtifactId:e.github.artifactId||null,observations,blocking,externalStopTested:false,archiveAdmitted:false,authorizationGranted:false};
 return {...result,resultSha256:cryptoHash(JSON.stringify(result))};
}
module.exports={assess};
if(require.main===module){
 try{
  const fs=require("node:fs"),path=require("node:path");
  const [input,output]=process.argv.slice(2);if(!input||!output)throw Error("Usage: node scripts/milestone001-evidence-audit.js evidence.json output.json");
  const result=assess(JSON.parse(fs.readFileSync(input,"utf8")));
  fs.mkdirSync(path.dirname(output),{recursive:true});
  fs.writeFileSync(output,JSON.stringify(result,null,2)+"\n",{flag:"wx",mode:0o600});
  console.log("Milestone 001: "+result.status+"; blockers: "+result.blocking.join(","));
 }catch(error){console.error(error.message);process.exitCode=1;}
}
