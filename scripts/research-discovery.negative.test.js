"use strict";
const test=require("node:test"),assert=require("node:assert/strict");
const {run}=require("./research-discovery");
function fixture(){return {schema:"BT-RESEARCH-INPUT-v0.1",cases:[{id:"C1",source:"synthetic:adversarial",claim:"A",rival:"B",defeater:"C",baseline:"D",transitions:[{id:"E1",from:"a",to:"b",kind:"execution"}],observations:[{id:"O1",report:"first",state:"ASSERTED",provenance:"local"}]}]};}
test("NEG-F01 duplicate observation IDs must be rejected",()=>{
 const x=fixture();x.cases[0].observations.push({id:"O1",report:"conflicting second",state:"OBSERVED",provenance:"self"});
 assert.throws(()=>run(x),/duplicate.*observation|observation.*duplicate/i,"duplicate observations are accepted and can create inconsistent provenance");
});
test("NEG-F02 missing all observations must produce an explicit uncertainty gap",()=>{
 const x=fixture();x.cases[0].observations=[];
 const output=run(x);
 assert(output.cases[0].gaps.some(g=>g.code==="NO_OBSERVATIONS"),"absence is currently invisible in the gap ledger");
});
test("NEG-F03 asserted external stop cannot be treated as verified stop evidence",()=>{
 const x=fixture();x.cases[0].transitions[0].stop="button";
 const output=run(x);
 assert(output.cases[0].gaps.some(g=>g.code==="UNVERIFIED_STOP"),"presence of a stop label removes missing-stop gap without effectiveness evidence");
});
