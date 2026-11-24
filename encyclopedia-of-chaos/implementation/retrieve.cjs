"use strict";
function checkSchema(v,s,path="$"){
 const fail=m=>{throw Error(path+": "+m)};
 if(s.const!==undefined&&v!==s.const)fail("const");
 if(s.enum&&!s.enum.includes(v))fail("enum");
 if(s.type==="object"){if(!v||typeof v!=="object"||Array.isArray(v))fail("object");for(const k of s.required||[])if(!Object.prototype.hasOwnProperty.call(v,k))fail("missing "+k);for(const k of Object.keys(v)){if(!Object.prototype.hasOwnProperty.call(s.properties||{},k)){if(s.additionalProperties===false)fail("unknown "+k)}else checkSchema(v[k],s.properties[k],path+"."+k)}}
 if(s.type==="array"){if(!Array.isArray(v))fail("array");v.forEach((x,i)=>checkSchema(x,s.items,path+"["+i+"]"))}
 if(s.type==="string"){if(typeof v!=="string")fail("string");if(s.minLength!==undefined&&v.length<s.minLength)fail("length");if(s.pattern&&!new RegExp(s.pattern).test(v))fail("pattern")}
 if(s.type==="integer"){if(!Number.isInteger(v)||v<s.minimum)fail("integer/minimum")}
}
function ingest(records,schema,registry){
 if(!Array.isArray(records))throw Error("expected records array");
 const ids=new Set(registry.mechanisms.map(m=>m.id)), seen=new Set();
 for(const r of records){checkSchema(r,schema);const key=r.id+"@"+r.revision;if(seen.has(key))throw Error("duplicate revision "+key);seen.add(key);const tags=new Set();for(const m of r.mechanisms){if(!ids.has(m.id))throw Error("unknown mechanism "+m.id);const k=m.id+"@"+m.relation;if(tags.has(k))throw Error("duplicate assignment");tags.add(k)}}
 return JSON.parse(JSON.stringify(records));
}
function retrieve(records,registry,options={}){
 const {mechanism,text="",history=false}=options;
 if(mechanism&&!registry.mechanisms.some(m=>m.id===mechanism))throw Error("unknown query mechanism");
 const latest=new Map();for(const r of records)if(!latest.has(r.id)||latest.get(r.id).revision<r.revision)latest.set(r.id,r);
 const tokens=text.toLowerCase().match(/[a-z0-9]+/g)||[];
 return (history?records:[...latest.values()]).map(r=>{
  const matches=r.mechanisms.filter(m=>!mechanism||m.id===mechanism);
  if(mechanism&&!matches.length)return null;
  const hay=[r.title,r.original_domain,r.original_proposition,r.rejected_assumption,r.failure_mechanism,r.failure_conditions,r.observed_consequence,r.remaining_useful_information,r.uncertainty,r.counterevidence,r.transfer_applications,r.transfer_limitations,r.reopening_conditions].join(" ").toLowerCase();
  const hits=tokens.filter(t=>hay.includes(t));
  if(tokens.length&&!hits.length)return null;
  return {id:r.id,revision:r.revision,title:r.title,score:hits.length,matched_terms:[...new Set(hits)],matched_mechanisms:matches,record:r};
 }).filter(Boolean).sort((a,b)=>b.score-a.score||(a.id<b.id?-1:a.id>b.id?1:a.revision-b.revision));
}
function runTests(schema,registry,records){
 const results=[], clone=x=>JSON.parse(JSON.stringify(x));
 const check=(name,fn)=>{try{if(!fn())throw Error("assertion false");results.push({name,result:"PASS"})}catch(e){results.push({name,result:"FAIL",error:String(e)})}};
 const rejects=fn=>{try{fn();return false}catch{return true}};
 const data=ingest(records,schema,registry), query=o=>retrieve(data,registry,o);
 check("all initial candidates validate",()=>data.length===5);
 check("maritime-to-AI override and aviation positive control",()=>{const q=query({mechanism:"FM-009",text:"autonomous AI recovery"});return q.some(x=>x.id==="EC-GL-010")&&q.some(x=>x.id==="EC-GL-009"&&x.matched_mechanisms[0].relation==="POSITIVE_CONTROL")});
 check("correlated errors not returned as override failure",()=>!query({mechanism:"FM-009"}).some(x=>x.id==="EC-CMDF-002"));
 check("common dependency retrieved",()=>query({mechanism:"FM-001"}).some(x=>x.id==="EC-GL-001"));
 check("unknown mandatory field rejected",()=>{const r=clone(data[0]);delete r.uncertainty;return rejects(()=>ingest([r],schema,registry))});
 check("blank required text rejected",()=>{const r=clone(data[0]);r.counterevidence=" ";return rejects(()=>ingest([r],schema,registry))});
 check("machine admission rejected",()=>{const r=clone(data[0]);r.authority_state="ADMITTED";return rejects(()=>ingest([r],schema,registry))});
 check("unknown mechanism rejected",()=>{const r=clone(data[0]);r.mechanisms[0].id="FM-999";return rejects(()=>ingest([r],schema,registry))});
 check("duplicate revision rejected",()=>rejects(()=>ingest([data[0],data[0]],schema,registry)));
 check("correction latest and historical retention",()=>{const r=clone(data[0]);r.revision=2;r.uncertainty="Synthetic correction; not actual evidence.";const d=ingest([...data,r],schema,registry);return retrieve(d,registry,{mechanism:"FM-009"}).find(x=>x.id===r.id).revision===2&&retrieve(d,registry,{mechanism:"FM-009",history:true}).filter(x=>x.id===r.id).length===2});
 check("unclassified record remains text searchable",()=>{const r=clone(data[0]);r.id="EC-SYNTH-001";r.mechanisms=[];r.title="Synthetic zirconium fixture";const d=ingest([r],schema,registry);return retrieve(d,registry,{text:"zirconium"}).length===1&&retrieve(d,registry,{mechanism:"FM-009"}).length===0});
 check("provenance and counterevidence survive retrieval",()=>query({mechanism:"FM-009"}).every(x=>x.record.source.url&&x.record.counterevidence&&x.record.uncertainty&&x.record.transfer_limitations));
 check("unknown query mechanism rejected",()=>rejects(()=>query({mechanism:"FM-999"})));
 check("null search is explicit empty result",()=>query({text:"zzqnonexistenttoken"}).length===0);
 check("deterministic ordering",()=>JSON.stringify(query({text:"recovery"}))===JSON.stringify(retrieve([...data].reverse(),registry,{text:"recovery"})));
 return results;
}
module.exports={checkSchema,ingest,retrieve,runTests};
if(require.main===module){
 const schema=require("./entry.schema.json"), registry=require("./mechanisms.json"), records=require("./candidates.json");
 const args=process.argv.slice(2), options={};
 try{if(args.length===1&&args[0]==="--test"){const results=runTests(schema,registry,records);console.log(JSON.stringify(results,null,2));if(results.some(x=>x.result!=="PASS"))process.exitCode=1;}else{for(let i=0;i<args.length;i++){if(args[i]==="--history")options.history=true;else if(args[i]==="--mechanism"||args[i]==="--text"){const key=args[i].slice(2);if(!args[i+1]||args[i+1].startsWith("--"))throw Error("missing argument "+args[i]);options[key]=args[++i];}else throw Error("unknown argument "+args[i]);}console.log(JSON.stringify(retrieve(ingest(records,schema,registry),registry,options),null,2));}}catch(e){console.error(String(e));process.exitCode=1;}
}
