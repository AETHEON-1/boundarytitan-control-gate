#!/usr/bin/env node
/** Offline hypothesis-expansion runner: research candidates only, never an authorization service. */
"use strict";
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const hash=x=>crypto.createHash("sha256").update(JSON.stringify(x)).digest("hex");
const valid=s=>typeof s==="string"&&s.trim().length>0;
function run(input){
 if(input?.schema!=="BT-RESEARCH-INPUT-v0.1"||!Array.isArray(input.cases)||!input.cases.length||input.cases.length>40)throw Error("Invalid bounded research input");
 const ids=new Set();
 const cases=input.cases.map(c=>{
  if(!valid(c.id)||ids.has(c.id)||!["source","claim","rival","defeater","baseline"].every(k=>valid(c[k]))||!Array.isArray(c.transitions)||!Array.isArray(c.observations)||c.transitions.length>60||c.observations.length>60)throw Error("Invalid or duplicate research case");
  ids.add(c.id);const gaps=[],tests=[],seen=new Set();
  for(const t of c.transitions){
   if(!valid(t.id)||seen.has(t.id)||!valid(t.from)||!valid(t.to)||!["data","authority","execution","consequence"].includes(t.kind))throw Error("Invalid transition");
   seen.add(t.id);
   if(t.kind!=="data"){
    for(const k of ["authorityOrigin","owner","scope","stop"])if(!valid(t[k]))gaps.push({edge:t.id,code:"MISSING_"+k.toUpperCase()});
    tests.push({kind:"BOUNDARY",description:"Attempt alternate consequential path at "+t.id+"; independently test denial"});
   }
  }
  for(const o of c.observations){if(!valid(o.id)||!valid(o.report)||!valid(o.provenance)||!["OBSERVED","ASSERTED","CONTRADICTED","NOT_TESTED"].includes(o.state))throw Error("Invalid observation");if(o.state!=="OBSERVED")gaps.push({observation:o.id,code:"OBSERVATION_"+o.state})}
  tests.push({kind:"FALSIFY",description:c.defeater},{kind:"BASELINE",description:"Compare identical evidence and costs against "+c.baseline},{kind:"INVERSE",description:"Find case where rival predicts better: "+c.rival},{kind:"REDUCE",description:"Remove one assumption and retest the proposed kernel"});
  const counterexamples=c.observations.filter(o=>o.state==="OBSERVED"&&o.report===c.defeater).map(o=>({observationId:o.id,status:"COUNTEREXAMPLE_CANDIDATE_UNAUTHENTICATED"}));
  return {id:c.id,source:c.source,inputHash:hash(c),hypotheses:[c.claim,c.rival],gaps,tests,counterexamples,decision:"RESEARCH_ONLY",authorization:false};
 });
 const body={schema:"BT-RESEARCH-OUTPUT-v0.1",inputHash:hash(input),cases,permission:"NOT_ESTABLISHED",externalStop:"NOT_TESTED",mode:"OFFLINE_RESEARCH_ONLY"};
 return {...body,digest:hash(body)};
}
function verify(output){if(!output||output.permission!=="NOT_ESTABLISHED"||output.mode!=="OFFLINE_RESEARCH_ONLY"||output.cases?.some(c=>c.authorization!==false||c.decision!=="RESEARCH_ONLY"))return false;const {digest,...body}=output;return hash(body)===digest}
if(require.main===module){try{const [source,destination]=process.argv.slice(2);if(!source||!destination)throw Error("Usage: node scripts/research-discovery.js input.json output.json");const result=run(JSON.parse(fs.readFileSync(source,"utf8")));if(!verify(result))throw Error("Invalid research output");fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,JSON.stringify(result,null,2)+"\n");console.log("Research dossiers prepared: "+result.cases.length)}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={run,verify};
