import type { FiftyOneFiftyOmission, FiftyOneFiftyWorkflowInput, FiftyOneFiftyWorkflowResult } from '../types/fifty-one-fifty-contracts';

/** 51-50: documented record, bounded inference, open question, then omissions. */
export function runFiftyOneFiftyWorkflow(input: FiftyOneFiftyWorkflowInput): FiftyOneFiftyWorkflowResult {
  const omissions: FiftyOneFiftyOmission[] = [];
  const claims = input.claims;
  const firstUnsupported = claims.find((claim) => claim.authority_stage && !claim.consequence_owner_id)?.authority_stage;
  const firstOpen = claims.find((claim) => claim.class === 'OPEN_QUESTION');

  for (const claim of claims) {
    if (!claim.source_ids.length || !claim.evidence_ids.length) omissions.push({ omission_id: `evidence:${claim.claim_id}`, category: 'EVIDENCE', description: `Claim ${claim.claim_id} lacks source or evidence custody.`, severity: 'HIGH', rejection_condition: 'Do not treat the claim as established without inspectable evidence.' });
    if (claim.authority_stage && !claim.consequence_owner_id) omissions.push({ omission_id: `owner:${claim.claim_id}`, category: 'OWNER', description: `Claim ${claim.claim_id} crosses toward authority without a consequence owner.`, severity: 'HIGH', rejection_condition: 'Hold before any consequence-bearing transition.' });
    if (claim.authority_stage && !claim.external_stop_path_id) omissions.push({ omission_id: `stop:${claim.claim_id}`, category: 'STOP_PATH', description: `Claim ${claim.claim_id} has no external stop path.`, severity: 'HIGH', rejection_condition: 'Do not proceed without an operational external denial or stop path.' });
    if (claim.consequence_surface && !claim.capability_stage) omissions.push({ omission_id: `capability:${claim.claim_id}`, category: 'AUTHORITY', description: `Claim ${claim.claim_id} names consequence without a bounded capability statement.`, severity: 'MEDIUM', rejection_condition: 'Separate what the system can do from what anyone may permit.' });
    if (claim.uncertainty.length) omissions.push({ omission_id: `uncertainty:${claim.claim_id}`, category: 'EVIDENCE', description: `Claim ${claim.claim_id} contains unresolved uncertainty.`, severity: 'MEDIUM', rejection_condition: 'Preserve the uncertainty; do not convert it into approval.' });
  }
  for (const surface of input.uninspected_surfaces) omissions.push({ omission_id: `uninspected:${surface}`, category: 'UNINSPECTED_SURFACE', description: `Surface remains uninspected: ${surface}.`, severity: 'HIGH', rejection_condition: 'Do not claim completeness across an uninspected surface.' });
  if (input.proposed_action && !claims.some((claim) => claim.external_stop_path_id)) omissions.push({ omission_id: 'workflow:stop', category: 'STOP_PATH', description: 'A proposed action has no visible external stop path.', severity: 'HIGH', rejection_condition: 'Hold the proposed action.' });

  const questions = omissions.map((omission) => `${omission.description} ${omission.rejection_condition}`);
  if (firstOpen) questions.push(`Open question requires human disposition: ${firstOpen.text}`);
  return {
    workflow_id: input.workflow_id,
    state: 'HUMAN_REVIEW_REQUIRED',
    record: claims,
    omissions,
    first_unsupported_arrow: firstUnsupported,
    consequence_owner_id: claims.find((claim) => claim.consequence_owner_id)?.consequence_owner_id,
    external_stop_path_id: claims.find((claim) => claim.external_stop_path_id)?.external_stop_path_id,
    specialist_handoff: {
      recipient_role: input.specialist_role ?? 'domain specialist',
      questions,
      non_claims: ['This workflow does not establish truth beyond supplied evidence.', 'This workflow does not grant authority.', 'This workflow does not certify completeness, safety, or deployment readiness.'],
      machine_authority: false,
      closure: false,
    },
  };
}
