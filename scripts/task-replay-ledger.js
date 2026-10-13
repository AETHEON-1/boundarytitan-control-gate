"use strict";
/** Deterministic persistent receipt ledger. Research admission only. */
const fs=require("node:fs"),path=require("node:path"),crypto=require("node:crypto");
const {ingest}=require("./task-delivery-envelope");
const sha=x=>crypto.createHash("sha256").update(JSON.stringify(x)).digest("hex");
const fresh=()=>({schema:"BT-TASK-REPLAY-LEDGER-v0.1",entries:[],head:null});
function validateLedger(ledger){
 if(!ledger||ledger.schema!=="BT-TASK-REPLAY-LEDGER-v0.1"||!Array.isArray(ledger.entries))throw Error("Invalid replay ledger");
 let prior=null;const keys=new Set();
 for(const item of ledger.entries){
  if(!item||typeof item.key!=="string"||!item.key||keys.has(item.key)||item.previousHash!==prior||typeof item.receiptHash!=="string"||!item.receiptHash)throw Error("Corrupt or duplicate replay ledger");
  const {recordHash,...body}=item;if(recordHash!==sha(body))throw Error("Replay ledger hash mismatch");keys.add(item.key);prior=item.recordHash;
 }
 if(ledger.head!==prior)throw Error("Replay ledger head mismatch");
 return true;
}
function append(ledger,envelope){
 validateLedger(ledger);
 const receipt=ingest(envelope,ledger.entries.map(x=>x.key));
 const body={key:receipt.key,receiptHash:sha(receipt),previousHash:ledger.head,sourceRunAttribution:receipt.sourceRunAttribution};
 const item={...body,recordHash:sha(body)};
 const next={schema:ledger.schema,entries:[...ledger.entries,item],head:item.recordHash};
 validateLedger(next);
 return {ledger:next,receipt};
}
/** Output is written exclusively through an atomic exclusive-create path. No external GitHub writes. */
function writeNew(file,value){
 fs.mkdirSync(path.dirname(file),{recursive:true});
 fs.writeFileSync(file,JSON.stringify(value,null,2)+"\n",{flag:"wx",mode:0o600});
}
if(require.main===module){try{
 const [envelopeFile,priorFile,nextFile,receiptFile]=process.argv.slice(2);
 if(!envelopeFile||!priorFile||!nextFile||!receiptFile)throw Error("Usage: node scripts/task-replay-ledger.js envelope.json prior.json next.json receipt.json");
 if(path.resolve(priorFile)===path.resolve(nextFile)||path.resolve(nextFile)===path.resolve(receiptFile))throw Error("Refusing to overwrite or alias provenance paths");
 const prior=JSON.parse(fs.readFileSync(priorFile,"utf8"));
 const result=append(prior,JSON.parse(fs.readFileSync(envelopeFile,"utf8")));
 writeNew(nextFile,result.ledger);writeNew(receiptFile,result.receipt);
 console.log("Research-only ledger and receipt written; task origin UNVERIFIED");
}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={fresh,validateLedger,append,writeNew};
