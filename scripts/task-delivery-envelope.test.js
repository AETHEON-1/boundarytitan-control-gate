"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const finding=require("../research/task-bridge/synthetic-finding.v0.1.json");
const {ingest,digest}=require("./task-delivery-envelope");
function sample(){const output=JSON.parse(JSON.stringify(finding));const originalOutput=JSON.stringify(output);return {schema:"BT-TASK-DELIVERY-v0.1",taskId:output.taskId,taskRunId:"synthetic-run-001",originalOutput,originalOutputSha256:digest(originalOutput),output,deliveryVerified:false,authorizationGranted:false}}
test("bounded synthetic envelope accepted as unverified receipt",()=>{const x=ingest(sample());assert.equal(x.delivery,"MANUAL_OR_UNVERIFIED");assert.equal(x.authorizationGranted,false)});
test("reject missing run ID",()=>{const x=sample();x.taskRunId="";assert.throws(()=>ingest(x),/lineage/)});
test("reject raw output mutation",()=>{const x=sample();x.originalOutput+=" ";assert.throws(()=>ingest(x),/hash/)});
test("reject task identity substitution",()=>{const x=sample();x.taskId="other";assert.throws(()=>ingest(x),/unknown|mismatch/i)});
test("reject duplicate run delivery",()=>{const x=sample();assert.throws(()=>ingest(x,[x.taskId+":"+x.taskRunId]),/Duplicate/)});
test("reject self certified delivery",()=>{const x=sample();x.deliveryVerified=true;assert.throws(()=>ingest(x),/self-certify/)});
test("reject permission escalation",()=>{const x=sample();x.authorizationGranted=true;assert.throws(()=>ingest(x),/approval/)});
test("negative result remains preserved",()=>{const x=sample();x.output.disposition="NEGATIVE_RESULT";x.originalOutput=JSON.stringify(x.output);x.originalOutputSha256=digest(x.originalOutput);assert.equal(ingest(x).candidate.disposition,"NEGATIVE_RESULT")});
