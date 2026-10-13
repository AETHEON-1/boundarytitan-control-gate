"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const finding=require("../research/task-bridge/synthetic-finding.v0.1.json");
const {digest}=require("./task-delivery-envelope"),{fresh}=require("./task-replay-ledger");
const {signForSyntheticTest}=require("./evidence-transit"),{toEncyclopediaCandidate}=require("./htk-to-encyclopedia"),{evaluate}=require("./e2e-admission-gate");
const secret="SYNTHETIC-TEST-KEY-NOT-A-PRODUCTION-SECRET-123";
function fixture(){
 const output=JSON.parse(JSON.stringify(finding)),originalOutput=JSON.stringify(output);
 const envelope={schema:"BT-TASK-DELIVERY-v0.1",taskId:output.taskId,taskRunId:"synthetic-e2e-001",originalOutput,originalOutputSha256:digest(originalOutput),output,deliveryVerified:false,authorizationGranted:false};
 const htkRecord={schema:"BT-HTK-INSPECTION-v0.1",id:"HTK-E2E",originalUtterance:output.claim,uniqueInterpretation:false,sourceRefs:["synthetic:fixture"],transitions:[{id:"T1",interpretation:"Report an unproven authority claim",before:"research",after:"proposal",mechanism:"interpretation",consequence:"potential misleading authority inference",consequenceOwner:"human reviewer",evidenceId:"E1",evidenceState:"ASSERTED",authorityOrigin:"",stopPath:"",reversal:"correct with linked entry"}]};
 return {packet:signForSyntheticTest(envelope,secret),secret,priorLedger:fresh(),expectedPriorHead:null,htkRecord,archiveCandidate:toEncyclopediaCandidate(htkRecord)};
}
test("full synthetic integration creates research-only receipt",()=>{const x=evaluate(fixture());assert.equal(x.result.authorizationGranted,false);assert.equal(x.result.archiveAdmission,"HUMAN_REQUIRED");assert(x.result.failures.includes("TASK_ORIGIN_NOT_ATTESTED"))});
test("witness mismatch blocks result",()=>{const x=fixture();x.expectedPriorHead="fabricated";assert.throws(()=>evaluate(x),/witness/)});
test("missing witness input blocks result",()=>{const x=fixture();delete x.expectedPriorHead;assert.throws(()=>evaluate(x),/input required/)});
test("changed signed original blocks result",()=>{const x=fixture();x.packet.payload+=" ";assert.throws(()=>evaluate(x),/authentication/)});
test("HTK altered source wording blocks result",()=>{const x=fixture();x.htkRecord.originalUtterance="different";assert.throws(()=>evaluate(x),/claim mismatch/)});
test("archive candidate cannot hide source wording",()=>{const x=fixture();x.archiveCandidate.observations[0].description="other";assert.throws(()=>evaluate(x),/missing source text/)});
test("claimed origin verification is not independently attested",()=>{const x=fixture();x.originEvidence={verified:true};assert.equal(evaluate(x).result.taskOrigin,"CLAIMED_VERIFIED_NOT_INDEPENDENTLY_CHECKED")});
test("replay against returned ledger is blocked",()=>{const x=fixture(),a=evaluate(x);x.priorLedger=a.ledger;x.expectedPriorHead=a.ledger.head;assert.throws(()=>evaluate(x),/Duplicate/)});
test("ambiguous HTK does not become permission",()=>{const x=evaluate(fixture());assert.equal(x.result.htkState,"NO UNIQUE INTERPRETATION");assert.equal(x.result.consequenceExecution,false)});
