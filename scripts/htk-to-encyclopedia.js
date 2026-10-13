"use strict";
const {inspectHTK}=require("./htk-inspector");
const {validate}=require("./verify-encyclopedia");
function toEncyclopediaCandidate(input){
 const result=inspectHTK(input);
 const entry={
  schema:"BT-EOC-ENTRY-v0.1",id:"EOC-20261013-HTK-INSPECTION-v0.1",recordedDate:"2026-10-13",
  kind:"HTK_INSPECTION_CANDIDATE",
  claim:"Structured HTK translation inspection of: "+result.originalUtterance,
  sources:input.sourceRefs.map(locator=>({type:"declared_source_reference",locator})),
  evidenceState:"NOT TESTED",
  observations:[{id:"HTK-INSPECTION",description:JSON.stringify({originalUtterance:result.originalUtterance,machineInterpretations:result.machineInterpretations,gaps:result.gaps,terminalState:result.terminalState}),state:"NOT TESTED"}],
  testCases:[{id:"HTK-NEGATIVE-FIXTURES",purpose:"Check translation ambiguity and authority laundering",execution:"See scripts/htk-inspector.test.js; record is not execution evidence"}],
  reproduction:["node scripts/htk-to-encyclopedia.js research/fixtures/htk-inspection-v0.1.json .research-output/htk-eoc-candidate.json","node --test scripts/htk-to-encyclopedia.test.js"],
  environment:"Node.js 20, offline static fixture",limitations:["Machine interpretation is not verified process evidence","No external stop exercised","This is an archive candidate, not an admitted historical entry"],
  consequenceHypotheses:{beneficial:[],harmful:[],classification:"UNKNOWN"},
  authorityState:"NOT_ESTABLISHED",externalStopState:"NOT_TESTED",specialistReview:"NOT_STARTED",authorizationGranted:false,
  links:{parent:null,supersedes:null,corrections:[]},reopenConditions:["Specialist interpretation contradicts proposal","Independent transition evidence changes","Evidence custody changes"]
 };
 validate(entry);
 return entry;
}
if(require.main===module){try{const fs=require("node:fs"),path=require("node:path");const [src,dst]=process.argv.slice(2);if(!src||!dst)throw Error("Input and output file required");const e=toEncyclopediaCandidate(JSON.parse(fs.readFileSync(src,"utf8")));fs.mkdirSync(path.dirname(dst),{recursive:true});fs.writeFileSync(dst,JSON.stringify(e,null,2)+"\n");console.log("HTK EOC candidate prepared; admission and authorization not granted");}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={toEncyclopediaCandidate};
