"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),crypto=require("node:crypto");
const {assess}=require("./milestone001-evidence-audit");
const fixture=require("../research/task-bridge/milestone001-observed-20261013.v0.1.json");
const sample=()=>JSON.parse(JSON.stringify(fixture));
test("actual task metadata plus synthetic GitHub artifact does not pass live delivery",()=>{
 const r=assess(sample());assert.equal(r.status,"NOT ESTABLISHED");assert.equal(r.authorizationGranted,false);
 assert(r.blocking.includes("ORIGINAL_TASK_OUTPUT_UNAVAILABLE"));assert(r.blocking.includes("GITHUB_ARTIFACT_SYNTHETIC"));
});
test("missing scheduler run ID remains visible",()=>assert(assess(sample()).blocking.includes("EXECUTION_ID_UNAVAILABLE")));
test("task-supplied fake origin attestation rejected",()=>{const x=sample();x.originAttested=true;assert.throws(()=>assess(x),/Self-declared/)});
test("task-supplied fake archive admission rejected",()=>{const x=sample();x.archiveAdmitted=true;assert.throws(()=>assess(x),/Self-declared/)});
test("task-supplied fake execution permission rejected",()=>{const x=sample();x.executionAuthorized=true;assert.throws(()=>assess(x),/Self-declared/)});
test("mismatched reported raw digest is contradicted",()=>{
 const x=sample();x.task.originalOutput="{\"finding\":1}";x.task.reportedSha256="0".repeat(64);
 assert(assess(x).blocking.includes("TASK_OUTPUT_DIGEST_MISMATCH"));
});
test("mismatched task-to-repo bytes are contradicted",()=>{
 const x=sample();x.task.originalOutput="original";x.github.deliveredOriginalOutput="different";
 assert(assess(x).blocking.includes("DELIVERY_BYTES_MISMATCH"));
});
test("matching bytes do not magically prove origin or shared custody",()=>{
 const x=sample();x.task.originalOutput="same";x.github.deliveredOriginalOutput="same";x.github.sourceKind="CLAIMED_LIVE";
 const r=assess(x);assert(r.observations.some(y=>y.code==="DELIVERED_BYTES_MATCH"));
 assert(r.blocking.includes("INDEPENDENT_ORIGIN_ATTESTATION_MISSING"));assert.equal(r.status,"NOT ESTABLISHED");
});
test("claimed execution identifier is not authenticated evidence",()=>{
 const x=sample();x.task.executionId="CLAIMED-RUN";const r=assess(x);
 assert(r.blocking.includes("EXECUTION_ID_CLAIM_ONLY"));
});
test("result deterministic and checkable",()=>assert.deepEqual(assess(sample()),assess(sample())));
test("missing task identity rejected",()=>{const x=sample();x.task.taskId="";assert.throws(()=>assess(x),/task identity/)});
test("missing repository provenance rejected",()=>{const x=sample();x.github.headSha=null;assert.throws(()=>assess(x),/repository provenance/)});
