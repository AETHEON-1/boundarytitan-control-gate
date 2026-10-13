"use strict";
/** Cross-layer evidence admission checker. This never authenticates a ChatGPT task run. */
const {validateTransport}=require("./evidence-transit");
const {validateLedger}=require("./task-replay-ledger");
const {inspectHTK}=require("./htk-inspector");
const {validate}=require("./verify-encyclopedia");
const {createHash}=require("node:crypto");
const hash=x=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
function evaluate({packet,secret,priorLedger,expectedPriorHead,htkRecord,archiveCandidate,originEvidence}){
 if(expectedPriorHead===undefined)throw Error("Independent prior-head input required");
 validateLedger(priorLedger);
 if(priorLedger.head!==expectedPriorHead)throw Error("Prior-head witness mismatch");
 const transit=validateTransport(packet,secret,priorLedger);
 const htk=inspectHTK(htkRecord);
 validate(archiveCandidate);
 if(archiveCandidate.authorizationGranted!==false||transit.receipt.authorizationGranted!==false)throw Error("Authority laundering");
 const parsed=JSON.parse(packet.payload);
 if(parsed.output.claim!==htkRecord.originalUtterance)throw Error("HTK source claim mismatch");
 if(!archiveCandidate.observations.some(x=>x.description.includes(htkRecord.originalUtterance)))throw Error("Encyclopedia candidate missing source text");
 const failures=[];
 if(!originEvidence||originEvidence.verified!==true)failures.push("TASK_ORIGIN_NOT_ATTESTED");
 if(htk.gaps.length)failures.push("HTK_GAPS_UNRESOLVED");
 failures.push("EXTERNAL_STOP_NOT_TESTED");
 const body={schema:"BT-END-TO-END-RESEARCH-v0.1",taskKey:transit.receipt.key,transport:transit.transport,taskOrigin:originEvidence?.verified===true?"CLAIMED_VERIFIED_NOT_INDEPENDENTLY_CHECKED":"NOT_ATTESTED",priorLedgerHead:expectedPriorHead,nextLedgerHead:transit.ledger.head,htkState:htk.terminalState,htkGaps:htk.gaps,archiveCandidateId:archiveCandidate.id,failures,archiveAdmission:"HUMAN_REQUIRED",authorizationGranted:false,consequenceExecution:false};
 return {result:{...body,digest:hash(body)},ledger:transit.ledger};
}
module.exports={evaluate};
