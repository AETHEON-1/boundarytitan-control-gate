"use strict";
const test=require("node:test"),assert=require("node:assert/strict"),fs=require("node:fs"),os=require("node:os"),path=require("node:path");
const fixture=require("../research/task-bridge/synthetic-finding.v0.1.json");
const {digest}=require("./task-delivery-envelope");
const {fresh,validateLedger,append,writeNew}=require("./task-replay-ledger");
function envelope(id="r1"){const output=JSON.parse(JSON.stringify(fixture)),raw=JSON.stringify(output);return {schema:"BT-TASK-DELIVERY-v0.1",taskRunId:id,taskId:output.taskId,output,originalOutput:raw,originalOutputSha256:digest(raw),deliveryVerified:false,authorizationGranted:false}}
test("ledger starts empty and valid",()=>assert.equal(validateLedger(fresh()),true));
test("first receipt preserves source unverified state",()=>{const r=append(fresh(),envelope());assert.equal(r.receipt.sourceRunAttribution,"CLAIMED_NOT_INDEPENDENTLY_VERIFIED");assert.equal(r.receipt.authorizationGranted,false);assert.equal(validateLedger(r.ledger),true)});
test("duplicates rejected across stored entries",()=>{const r=append(fresh(),envelope());assert.throws(()=>append(r.ledger,envelope()),/Duplicate/)});
test("second different run appends without rewriting first",()=>{const a=append(fresh(),envelope()),b=append(a.ledger,envelope("r2"));assert.deepEqual(b.ledger.entries[0],a.ledger.entries[0]);assert.equal(b.ledger.entries.length,2)});
test("tampered digest rejected",()=>{const r=append(fresh(),envelope());r.ledger.entries[0].receiptHash="fake";assert.throws(()=>validateLedger(r.ledger),/hash/)});
test("removed entry rejected",()=>{const a=append(fresh(),envelope()),b=append(a.ledger,envelope("r2"));b.ledger.entries.shift();assert.throws(()=>validateLedger(b.ledger),/Corrupt|head/)});
test("concurrent or existing destination not overwritten",()=>{const dir=fs.mkdtempSync(path.join(os.tmpdir(),"eoc-"));try{const p=path.join(dir,"record.json");writeNew(p,{original:true});assert.throws(()=>writeNew(p,{original:false}),/EEXIST/);assert.deepEqual(JSON.parse(fs.readFileSync(p)),{original:true})}finally{fs.rmSync(dir,{recursive:true,force:true})}});
test("untrusted identity not promoted to authenticated state",()=>{const r=append(fresh(),envelope());assert.equal(r.ledger.entries[0].sourceRunAttribution,"CLAIMED_NOT_INDEPENDENTLY_VERIFIED")});
