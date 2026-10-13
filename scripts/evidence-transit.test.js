"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const finding=require("../research/task-bridge/synthetic-finding.v0.1.json");
const {digest}=require("./task-delivery-envelope");
const {fresh}=require("./task-replay-ledger");
const {validateTransport,signForSyntheticTest}=require("./evidence-transit");
const secret="SYNTHETIC-ONLY-NEVER-USE-AS-A-REAL-KEY-1234";
function envelope(run="synthetic-1"){const output=JSON.parse(JSON.stringify(finding)),originalOutput=JSON.stringify(output);return {schema:"BT-TASK-DELIVERY-v0.1",taskId:output.taskId,taskRunId:run,originalOutput,originalOutputSha256:digest(originalOutput),output,deliveryVerified:false,authorizationGranted:false}}
test("signed transport yields nonauthorizing unverified task receipt",()=>{const r=validateTransport(signForSyntheticTest(envelope(),secret),secret);assert.equal(r.transport,"HMAC_AUTHENTICATED_SHARED_SECRET");assert.equal(r.taskOrigin,"NOT_ATTESTED");assert.equal(r.authorizationGranted,false)});
test("tampered payload rejected",()=>{const p=signForSyntheticTest(envelope(),secret);p.payload+=" ";assert.throws(()=>validateTransport(p,secret),/authentication/)});
test("incorrect transport secret rejected",()=>assert.throws(()=>validateTransport(signForSyntheticTest(envelope(),secret),secret+"another"),/authentication/));
test("weak transport secret rejected",()=>assert.throws(()=>validateTransport(signForSyntheticTest(envelope(),secret),"short"),/strong/));
test("unsigned packet rejected",()=>{const p=signForSyntheticTest(envelope(),secret);delete p.signature;assert.throws(()=>validateTransport(p,secret),/Malformed/)});
test("outer identity substitution rejected",()=>{const p=signForSyntheticTest(envelope(),secret);p.taskId="other";assert.throws(()=>validateTransport(p,secret),/mismatch/)});
test("repeated task run rejected with prior ledger",()=>{const p=signForSyntheticTest(envelope(),secret),r=validateTransport(p,secret);assert.throws(()=>validateTransport(p,secret,r.ledger),/Duplicate/)});
test("new task run extends prior ledger",()=>{const first=validateTransport(signForSyntheticTest(envelope(),secret),secret);const second=validateTransport(signForSyntheticTest(envelope("synthetic-2"),secret),secret,first.ledger);assert.equal(second.ledger.entries.length,2)});
test("rejected original-output mismatch even if transport valid",()=>{const e=envelope();e.output.claim="different";assert.throws(()=>validateTransport(signForSyntheticTest(e,secret),secret),/differs/)});
test("transport attestation never masquerades as task service attestation",()=>{const r=validateTransport(signForSyntheticTest(envelope(),secret),secret);assert.equal(r.receipt.sourceRunAttribution,"CLAIMED_NOT_INDEPENDENTLY_VERIFIED");assert.equal(r.archiveAdmission,"HUMAN_REQUIRED")});
