"use strict";
/** Transport authentication is NOT task-origin attestation. */
const crypto=require("node:crypto"),fs=require("node:fs"),path=require("node:path");
const {ingest}=require("./task-delivery-envelope");
const {fresh,append,validateLedger}=require("./task-replay-ledger");
function mac(secret,body){return crypto.createHmac("sha256",secret).update(body).digest("hex")}
function equalHex(a,b){if(!/^[a-f0-9]{64}$/i.test(a||"")||!/^[a-f0-9]{64}$/i.test(b||""))return false;return crypto.timingSafeEqual(Buffer.from(a,"hex"),Buffer.from(b,"hex"))}
function validateTransport(packet,secret,ledger=fresh()){
 if(!packet||packet.schema!=="BT-EVIDENCE-TRANSIT-v0.1"||typeof packet.payload!=="string"||!packet.payload||!packet.signature||!packet.keyId)throw Error("Malformed transport packet");
 if(typeof secret!=="string"||secret.length<32)throw Error("Missing strong transport secret");
 if(!equalHex(mac(secret,packet.payload),packet.signature))throw Error("Invalid transport authentication");
 let envelope;try{envelope=JSON.parse(packet.payload)}catch{throw Error("Invalid signed payload JSON")}
 if(envelope.taskId!==packet.taskId)throw Error("Signed task mismatch");
 validateLedger(ledger);
 const output=append(ledger,envelope);
 return {receipt:output.receipt,ledger:output.ledger,transport:"HMAC_AUTHENTICATED_SHARED_SECRET",taskOrigin:"NOT_ATTESTED",externalStop:"NOT_TESTED",archiveAdmission:"HUMAN_REQUIRED",authorizationGranted:false};
}
function signForSyntheticTest(envelope,secret){const payload=JSON.stringify(envelope);return {schema:"BT-EVIDENCE-TRANSIT-v0.1",keyId:"SYNTHETIC-KEY",taskId:envelope.taskId,payload,signature:mac(secret,payload)}}
if(require.main===module){try{
 const [packetFile,priorFile,destination]=process.argv.slice(2);
 if(!packetFile||!priorFile||!destination)throw Error("Usage: node scripts/evidence-transit.js signed-packet.json prior-ledger.json output-directory");
 const secret=process.env.BT_INTAKE_HMAC_KEY;if(!secret)throw Error("BT_INTAKE_HMAC_KEY not configured");
 const result=validateTransport(JSON.parse(fs.readFileSync(packetFile,"utf8")),secret,JSON.parse(fs.readFileSync(priorFile,"utf8")));
 // Fail before writing if output already exists; single-writer, offline-only staging.
 if(fs.existsSync(destination))throw Error("Output directory exists; refusing overwrite");
 fs.mkdirSync(destination,{recursive:false,mode:0o700});
 fs.writeFileSync(path.join(destination,"receipt.json"),JSON.stringify(result.receipt,null,2)+"\n",{flag:"wx",mode:0o600});
 fs.writeFileSync(path.join(destination,"ledger.json"),JSON.stringify(result.ledger,null,2)+"\n",{flag:"wx",mode:0o600});
 console.log("Verified transport; task origin NOT ATTESTED; no archive admission");
}catch(e){console.error(e.message);process.exitCode=1}}
module.exports={mac,validateTransport,signForSyntheticTest};
