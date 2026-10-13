"use strict";
const crypto=require("node:crypto"),fs=require("node:fs"),path=require("node:path");
const registry=require("../research/task-bridge/task-registry.v0.1.json");
const hash=x=>crypto.createHash("sha256").update(JSON.stringify(x)).digest("hex");
const states=new Set(["SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"]);
const dispositions=new Set(["NEW_DELTA","COUNTEREXAMPLE","NEGATIVE_RESULT","RETRIEVAL_FAILED","INCONCLUSIVE","SUPPRESSED_DUPLICATE","MISSED_INTERVAL","CORRECTION"]);
function convert(input){
 if(!input||input.schema!=="BT-TASK-FINDING-v0.1"||typeof input.taskId!=="string")throw Error("Invalid task finding schema");
 const task=registry.tasks.find(t=>t.id===input.taskId&&t.enabled);
 if(!task)throw Error("Unknown or inactive task");
 if(!dispositions.has(input.disposition)||!states.has(input.evidenceState))throw Error("Invalid disposition or evidence state");
 for(const key of ["findingId","observedAt","claim","source","falsifier","firstUnsupportedArrow"])if(typeof input[key]!=="string"||!input[key].trim())throw Error("Missing "+key);
 if(!Array.isArray(input.omissions)||!Array.isArray(input.failures)||!Array.isArray(input.rivalHypotheses))throw Error("Missing challenge arrays");
 if(input.executionAuthorized!==false||input.publicationAuthorized!==false)throw Error("Task may not authorize execution or publication");
 const record={schema:"BT-TASK-ARCHIVE-CANDIDATE-v0.1",findingId:input.findingId,taskId:task.id,taskLane:task.lane,classification:task.sensitivity,disposition:input.disposition,evidenceState:input.evidenceState,observedAt:input.observedAt,claim:input.claim,sourceLocator:input.source,sourceVerified:false,firstUnsupportedArrow:input.firstUnsupportedArrow,falsifier:input.falsifier,rivalHypotheses:input.rivalHypotheses,omissions:input.omissions,failures:input.failures,htk:{humanReadable:input.claim,translationVerified:false},archiveState:"CANDIDATE_NOT_FROZEN",authorizationGranted:false,externalStopVerified:false};
 return {...record,fingerprint:hash(record)};
}
function verify(r){if(!r||r.archiveState!=="CANDIDATE_NOT_FROZEN"||r.authorizationGranted!==false||r.externalStopVerified!==false||r.sourceVerified!==false)return false;const {fingerprint,...body}=r;return hash(body)===fingerprint}
if(require.main===module){try{const [source,target]=process.argv.slice(2);if(!source||!target)throw Error("Provide finding input and candidate output");const result=convert(JSON.parse(fs.readFileSync(source,"utf8")));if(!verify(result))throw Error("Invalid output");fs.mkdirSync(path.dirname(target),{recursive:true});fs.writeFileSync(target,JSON.stringify(result,null,2)+"\n");console.log("Task evidence candidate prepared: "+result.findingId)}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={convert,verify};
