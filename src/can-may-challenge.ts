/** Research-only counterexample search. Static cases, no execution capability. */
import {Candidate,challenge} from "./impossible-loop";
export type Verdict="COUNTEREXAMPLE_CANDIDATE"|"INCONCLUSIVE"|"BOUNDED_SUPPORT";
export interface ChallengeCase {id:string; hypothesis:string; rival:string; defeatingObservation:string; evidence:string[]; baseline:string; candidate:Candidate}
export interface ChallengeResult {id:string; verdict:Verdict; reasons:string[]; nextTests:string[]; machineApproval:false; executionAuthorized:false}
export function interrogateCase(c:ChallengeCase):ChallengeResult {
  if(!c.id||!c.hypothesis||!c.rival||!c.defeatingObservation||!c.baseline)throw new Error("Competing hypotheses, falsifier and baseline required");
  const x=challenge(c.candidate);
  const independent=c.candidate.testResults.filter(t=>t.independent&&t.provenance.trim());
  const observedDefeat=independent.some(t=>t.observed===c.defeatingObservation&&t.expected!==t.observed);
  const matched=independent.some(t=>t.expected===t.observed);
  const verdict:Verdict=observedDefeat?"COUNTEREXAMPLE_CANDIDATE":matched&&x.evidenceGaps.length===0?"BOUNDED_SUPPORT":"INCONCLUSIVE";
  const reasons=[...x.evidenceGaps, ...(independent.length?[]:["NO_INDEPENDENT_RECORDED_TEST"]),...(observedDefeat?["DEFEATING_OBSERVATION_REPORTED_NOT_AUTHENTICATED"]:[])];
  return {id:c.id,verdict,reasons,nextTests:[...x.testsToBuild,"Verify observation provenance outside acting system","Check whether baseline outperforms Sigma-2 on the same case"],machineApproval:false,executionAuthorized:false};
}
export function runChallengeSet(cases:ChallengeCase[],limit=50):ChallengeResult[]{
 if(!Number.isInteger(limit)||limit<1||limit>100||cases.length>limit)throw new Error("Bounded challenge quota exceeded");
 const ids=new Set<string>();return cases.map(c=>{if(ids.has(c.id))throw new Error("Duplicate case");ids.add(c.id);return interrogateCase(c)});
}
