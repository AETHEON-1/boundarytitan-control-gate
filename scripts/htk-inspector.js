"use strict";
/** Human Translation Key: inspectable translation, never authorization. */
const allowed=new Set(["OBSERVED","ASSERTED","SUPPORTED","INFERRED","CONTRADICTED","UNKNOWN","REQUESTED","DISPOSITION_ISSUED","ENFORCED","EXECUTED","CONSEQUENCE_OBSERVED","REVOCATION_ISSUED","REVOCATION_ENFORCED","UNREACHABLE_WITHIN_TESTED_SURFACE"]);
function meaningful(x){return typeof x==="string"&&x.trim().length>0}
function inspectHTK(record){
 if(!record||record.schema!=="BT-HTK-INSPECTION-v0.1"||!meaningful(record.id)||!meaningful(record.originalUtterance)||!Array.isArray(record.transitions))throw Error("Invalid HTK record");
 const gaps=[],ids=new Set();
 if(!record.transitions.length)gaps.push({code:"NO_TRANSITIONS",transitionId:null});
 for(const t of record.transitions){
  if(!meaningful(t.id)||ids.has(t.id))throw Error("Duplicate or invalid transition ID");ids.add(t.id);
  for(const key of ["interpretation","before","after","mechanism","consequence","consequenceOwner","evidenceId","authorityOrigin","stopPath","reversal"])if(!meaningful(t[key]))gaps.push({code:"MISSING_"+key.toUpperCase(),transitionId:t.id});
  if(!allowed.has(t.evidenceState))throw Error("Invalid evidence state");
  if(t.evidenceState!=="SUPPORTED")gaps.push({code:"UNESTABLISHED_EVIDENCE",transitionId:t.id});
 }
 if(record.uniqueInterpretation!==true)gaps.push({code:"NO_UNIQUE_INTERPRETATION",transitionId:null});
 if(!Array.isArray(record.sourceRefs)||!record.sourceRefs.length)gaps.push({code:"NO_SOURCE_LINEAGE",transitionId:null});
 return {schema:"BT-HTK-RESULT-v0.1",id:record.id,originalUtterance:record.originalUtterance,machineInterpretations:record.transitions.map(t=>({id:t.id,interpretation:t.interpretation,before:t.before,after:t.after,consequence:t.consequence,evidenceState:t.evidenceState})),gaps,terminalState:gaps.some(g=>g.code==="NO_UNIQUE_INTERPRETATION")?"NO UNIQUE INTERPRETATION":"INSPECTION_ONLY",authorizationGranted:false,externalStopVerified:false};
}
module.exports={inspectHTK};
