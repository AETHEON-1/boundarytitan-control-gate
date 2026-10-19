"use strict";
const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const root=path.resolve(__dirname,"../encyclopedia-of-chaos/entries");
const required=["schema","id","recordedDate","kind","claim","sources","evidenceState","observations","testCases","reproduction","environment","limitations","consequenceHypotheses","authorityState","externalStopState","specialistReview","authorizationGranted","links","reopenConditions"];
function validate(entry){
 for(const key of required)if(!(key in entry))throw Error("Missing "+key);
 if(entry.schema!=="BT-EOC-ENTRY-v0.1"||!/^EOC-[0-9]{8}-[A-Z0-9-]+-v[0-9]+\.[0-9]+$/.test(entry.id))throw Error("Invalid EOC schema or ID");
 if(!["SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"].includes(entry.evidenceState))throw Error("Invalid evidence state");
 if(entry.authorizationGranted!==false)throw Error("Encyclopedia may not issue authorization");
 if(!Array.isArray(entry.sources)||!entry.sources.length||!Array.isArray(entry.testCases)||!Array.isArray(entry.limitations)||!Array.isArray(entry.reopenConditions))throw Error("Missing lineage or test arrays");
 if(!entry.links||!Array.isArray(entry.links.corrections))throw Error("Invalid revision links");
 return true;
}
function inspectDirectory(dir=root){let names=fs.readdirSync(dir).filter(n=>n.endsWith(".json")),ids=new Set();for(const name of names){let entry=JSON.parse(fs.readFileSync(path.join(dir,name),"utf8"));validate(entry);if(name!==entry.id+".json"||ids.has(entry.id))throw Error("Duplicate or mismatched entry identity");ids.add(entry.id)}return names.length}
if(require.main===module){try{console.log("Encyclopedia entries validated: "+inspectDirectory())}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={validate,inspectDirectory};
