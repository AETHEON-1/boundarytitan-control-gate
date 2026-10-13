import {createHash} from "crypto";
import {inspect,assessKernel,Claim,KernelCandidate,Inspection,KernelAssessment} from "./sigma2-kernel-forge";
export interface Candidate {id:string;parentId?:string;version:number;claim:Claim;kernel:KernelCandidate;proposedBenefits:string[];proposedHarms:string[];testResults:{id:string;expected:string;observed:string;provenance:string;independent:boolean}[];proposedChanges:string[];affectedDependencies:string[]}
export interface Challenge {candidateId:string;fingerprint:string;sigma2:Inspection;kernel:KernelAssessment; evidenceGaps:string[];emergence:"BENEFIT_CANDIDATE"|"HARM_CANDIDATE"|"AMBIGUOUS"|"UNKNOWN"; testsToBuild:string[];impact:{changed:string[];dependencies:string[];testsInvalidated:string[]};specialists:string[];state:"CHALLENGE_OPEN";executionAuthorized:false}
export interface CaseLedger {schema:"BT-IMPOSSIBLE-CASE-v0.1";runId:string;entries:Challenge[];previousHash:string|null;headHash:string;mode:"SYNTHETIC_OFFLINE_ONLY"}
const unique=(items:string[]):string[]=>[...new Set(items)].sort();
const digest=(x:unknown):string=>createHash("sha256").update(JSON.stringify(x)).digest("hex");
/** Deterministic adversarial research proposal. No dynamic code execution or external authorization. */
export function challenge(candidate:Candidate):Challenge {
 if(!candidate.id || !Number.isInteger(candidate.version)||candidate.version<0||candidate.claim.id!==candidate.id)throw new Error("Invalid candidate");
 const sigma2=inspect(candidate.claim),kernel=assessKernel(candidate.kernel);
 const gaps=[...sigma2.findings.map(f=>f.code+(f.edgeId?":"+f.edgeId:"")),...kernel.unresolved];
 for(const t of candidate.testResults)if(!t.id||!t.independent||!t.provenance||t.expected!==t.observed)gaps.push("TEST_UNRESOLVED:"+(t.id||"missing"));
 if(!candidate.testResults.some(t=>t.independent))gaps.push("NO_INDEPENDENT_EVALUATION");
 const benefit=!!candidate.proposedBenefits.length,harm=!!candidate.proposedHarms.length;
 return {candidateId:candidate.id,fingerprint:digest(candidate),sigma2,kernel,evidenceGaps:unique(gaps),emergence:benefit&&harm?"AMBIGUOUS":benefit?"BENEFIT_CANDIDATE":harm?"HARM_CANDIDATE":"UNKNOWN",testsToBuild:unique([...sigma2.proposedTests,...candidate.proposedChanges.map(x=>"Regression test for change: "+x),...candidate.affectedDependencies.map(x=>"Recheck dependency: "+x),"Challenge R-factor provenance and independent denial","Test beneficial and harmful emergence hypotheses","Test Raccoon assessment against independent baseline"]),impact:{changed:unique(candidate.proposedChanges),dependencies:unique(candidate.affectedDependencies),testsInvalidated:unique(candidate.affectedDependencies.map(x=>"RECHECK:"+x))},specialists:unique(candidate.claim.edges.filter(x=>["authority","execution","consequence"].includes(x.kind)).map(x=>x.owner?.trim()||"UNASSIGNED_CONSEQUENCE_OWNER")),state:"CHALLENGE_OPEN",executionAuthorized:false};
}
export function verifyLedger(l:CaseLedger):boolean {const {headHash,...body}=l;return body.schema==="BT-IMPOSSIBLE-CASE-v0.1"&&body.mode==="SYNTHETIC_OFFLINE_ONLY"&&digest(body)===headHash&&body.entries.every(x=>x.state==="CHALLENGE_OPEN"&&x.executionAuthorized===false)}
export function appendChallenge(previous:CaseLedger|null,runId:string,entry:Challenge):CaseLedger{
 if(entry.executionAuthorized!==false||entry.state!=="CHALLENGE_OPEN")throw new Error("Non-challenge record rejected");
 if(previous&&(previous.runId!==runId||!verifyLedger(previous)))throw new Error("Invalid prior ledger");
 const body={schema:"BT-IMPOSSIBLE-CASE-v0.1" as const,runId,entries:[...(previous?.entries||[]),entry],previousHash:previous?.headHash||null,mode:"SYNTHETIC_OFFLINE_ONLY" as const};
 return {...body,headHash:digest(body)};
}
export function inspectGenerations(candidates:Candidate[],maxGenerations=20):CaseLedger {
 if(!Number.isInteger(maxGenerations)||maxGenerations<1||maxGenerations>100)throw new Error("Invalid bound");
 if(candidates.length>maxGenerations)throw new Error("Generation budget exceeded");
 const ids=new Set<string>();let l:CaseLedger|null=null;
 for(const c of candidates){if(ids.has(c.id))throw new Error("Duplicate generation");if(c.parentId&&!ids.has(c.parentId))throw new Error("Untraced parent");ids.add(c.id);l=appendChallenge(l,"IMPOS-LOCAL-001",challenge(c))}
 if(!l)throw new Error("Empty candidate run");return l;
}
