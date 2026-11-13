/** Sigma-2 candidate interrogator. Research output, never permission. */
export type EvidenceState = "SUPPORTED"|"CONTRADICTED"|"INDETERMINATE"|"TEST INVALID"|"NOT TESTED";
export type EdgeKind = "observation"|"inference"|"authority"|"execution"|"consequence";
export interface Edge {
  id:string; from:string; to:string; kind:EdgeKind;
  evidenceIds:string[]; owner?:string; authorityOrigin?:string;
  externalStopId?:string; permissionScope?:string;
}
export interface Claim {
  id:string; proposition:string; domain:string;
  assumptions:string[]; edges:Edge[]; evidence:Record<string,EvidenceState>;
  defeatingObservations:string[]; comparisons?:string[];
}
export interface Finding {
  code:string; edgeId?:string; detail:string; status:"OPEN"|"CONTRADICTED";
}
export interface Inspection {
  claimId:string; findings:Finding[];
  openQuestions:string[]; proposedTests:string[];
  disposition:"RESEARCH_ONLY";
  permissionGranted:false;
}
const consequential = new Set<EdgeKind>(["authority","execution","consequence"]);
export function inspect(claim:Claim):Inspection {
  if(!claim.id || !claim.proposition || !claim.domain) throw new Error("Claim identity, proposition and domain are required");
  const findings:Finding[]=[];
  const ids=new Set<string>();
  for(const edge of claim.edges) {
    if(!edge.id || !edge.from || !edge.to || ids.has(edge.id)) throw new Error("Invalid or duplicate edge identifier");
    ids.add(edge.id);
    if(!edge.evidenceIds.length) findings.push({code:"NO_EVIDENCE",edgeId:edge.id,detail:"Transition has no cited evidence",status:"OPEN"});
    for(const id of edge.evidenceIds){
      const state=claim.evidence[id];
      if(!state || state!=="SUPPORTED") findings.push({code:state==="CONTRADICTED"?"CONTRADICTED_EVIDENCE":"UNSUPPORTED_EVIDENCE",edgeId:edge.id,detail:`Evidence ${id}: ${state??"missing"}`,status:state==="CONTRADICTED"?"CONTRADICTED":"OPEN"});
    }
    if(consequential.has(edge.kind)){
      for(const [field,value] of Object.entries({owner:edge.owner,authorityOrigin:edge.authorityOrigin,externalStopId:edge.externalStopId,permissionScope:edge.permissionScope})){
        if(!value?.trim()) findings.push({code:"MISSING_"+field.toUpperCase(),edgeId:edge.id,detail:`Missing ${field} on consequential edge`,status:"OPEN"});
      }
    }
  }
  if(!claim.defeatingObservations.length) findings.push({code:"UNFALSIFIABLE_CANDIDATE",detail:"No defeating observation specified",status:"OPEN"});
  if(!claim.comparisons?.length) findings.push({code:"NO_BASELINE",detail:"No independent baseline comparison",status:"OPEN"});
  return {
    claimId:claim.id,findings,
    openQuestions:findings.map(f=>`What inspectable observation resolves ${f.code}${f.edgeId?" at "+f.edgeId:""}?`),
    proposedTests:[
      ...claim.defeatingObservations.map(d=>`Attempt counterexample: ${d}`),
      "Check alternate consequential paths not modeled in supplied graph",
      "Compare result against competent baseline; retain no-benefit outcome",
      "Check that any claimed external stop actually denies the declared effect"
    ],
    disposition:"RESEARCH_ONLY",permissionGranted:false
  };
}
export interface KernelCandidate { id:string; statement:string; necessaryAssumptions:string[]; counterexamples:string[]; equivalentExistingPrinciples:string[]; domainsTested:string[]; }
export interface KernelAssessment { id:string; compressionCandidate:boolean; unresolved:string[]; promotionAuthorized:false; }
export function assessKernel(k:KernelCandidate):KernelAssessment {
  if(!k.id || !k.statement) throw new Error("Kernel identity and statement required");
  const unresolved:string[]=[];
  if(!k.necessaryAssumptions.length) unresolved.push("Necessary assumptions not enumerated");
  if(!k.counterexamples.length) unresolved.push("No active counterexample search");
  if(!k.equivalentExistingPrinciples.length) unresolved.push("No reduction/prior-art comparison");
  if(k.domainsTested.length<2) unresolved.push("Cross-domain transfer not demonstrated");
  return {id:k.id,compressionCandidate:k.necessaryAssumptions.length<=2,unresolved,promotionAuthorized:false};
}
