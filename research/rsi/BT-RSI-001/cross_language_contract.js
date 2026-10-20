// BT-RSI-009: synthetic metadata lint, not legitimacy or authorization.
"use strict";
const fs=require("fs"),path=require("path");
const fields=["evidence_source","rule_source","jurisdiction","decision_owner","consequence_owner","execution_authority","stop_authority","appeal_path"];
const states=new Set(["SUPPORTED","CONTRADICTED","INDETERMINATE","TEST INVALID","NOT TESTED"]);
function lint(record){
 return fields.every(k=>typeof record[k]==="string"&&record[k].trim().length>0)
 && !new Set(["ai","model","machine"]).has(record.decision_owner.trim().toLowerCase())
 && states.has(record.evidence_state);
}
if(require.main===module){
 const vectors=JSON.parse(fs.readFileSync(path.join(__dirname,"cross_language_vectors.json"),"utf8"));
 for(const v of vectors.cases)if(lint(v.record)!==v.expected)throw Error("MISMATCH "+v.id);
 console.log("BT-RSI-009 JS fixture parity: "+vectors.cases.length+" vectors checked; NOT authority validation");
}
module.exports={lint};
