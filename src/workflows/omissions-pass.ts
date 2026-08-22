import type { OmissionPassFinding, OmissionsPassInput, OmissionPassResult } from '../types/omissions-pass-contracts';

const finding = (surface_id: string | undefined, category: OmissionPassFinding['category'], severity: OmissionPassFinding['severity'], missing: string, question: string, rejection_condition: string): OmissionPassFinding => ({ finding_id: `${category.toLowerCase()}:${surface_id ?? 'workflow'}`, surface_id, category, severity, missing, question, rejection_condition });

/** Read-only omissions scan. Absence is preserved; it is never inferred away. */
export function runOmissionsPass(input: OmissionsPassInput): OmissionPassResult {
  const findings: OmissionPassFinding[] = [];
  const uninspected = input.surfaces.filter((surface) => !surface.inspected).map((surface) => surface.surface_id);
  for (const surface of input.surfaces) {
    if (!surface.inspected) findings.push(finding(surface.surface_id, 'COVERAGE', 'HIGH', 'surface not inspected', `What evidence covers ${surface.name}?`, 'Do not claim completeness across an uninspected surface.'));
    if (!surface.evidence_ids.length) findings.push(finding(surface.surface_id, 'EVIDENCE', 'HIGH', 'evidence custody', `What inspectable evidence supports ${surface.name}?`, 'Do not treat the surface as established.'));
    if (!surface.affected_party_ids.length) findings.push(finding(surface.surface_id, 'AFFECTED_PARTY', 'HIGH', 'affected party', `Who bears the consequence if ${surface.name} is wrong?`, 'Hold before a consequence-bearing transition.'));
    if (!surface.consequence_owner_id) findings.push(finding(surface.surface_id, 'OWNER', 'HIGH', 'consequence owner', `Who owns the consequence for ${surface.name}?`, 'No owner, no progression.'));
    if (!surface.decision_owner_id) findings.push(finding(surface.surface_id, 'AUTHORITY', 'HIGH', 'decision owner', `Who may accept, reject, narrow, or reopen ${surface.name}?`, 'A machine or lane cannot become the decision owner.'));
    if (!surface.authority_basis_id) findings.push(finding(surface.surface_id, 'AUTHORITY', 'HIGH', 'authority basis', `What establishes permission for the relevant transition?`, 'Capability and evidence do not establish permission.'));
    if (!surface.external_stop_path_id) findings.push(finding(surface.surface_id, 'STOP_PATH', 'HIGH', 'external stop path', `Who can still say no before consequence?`, 'Do not proceed without an operational external stop.'));
    if (!surface.independent_measurement_ids.length) findings.push(finding(surface.surface_id, 'EVIDENCE', 'MEDIUM', 'independent measurement', `What measurement exists outside the proposing system?`, 'Do not treat self-produced output as independent verification.'));
    if (surface.reversible === undefined) findings.push(finding(surface.surface_id, 'REVERSIBILITY', 'HIGH', 'reversibility status', `Can ${surface.name} be reversed, and by whom?`, 'Do not treat an unknown consequence as reversible.'));
    if (surface.reversible === false && surface.harm_window_ms === undefined) findings.push(finding(surface.surface_id, 'TEMPORAL', 'HIGH', 'harm window', `How much time exists to stop ${surface.name} before irreversible harm?`, 'Hold an irreversible action without a declared harm window.'));
    if (!surface.appeal_path_id) findings.push(finding(surface.surface_id, 'APPEAL', 'MEDIUM', 'appeal path', `How can an affected party contest or reopen the result?`, 'Do not close a consequential disposition without a remedy path.'));
    if (!surface.ledger_event_id) findings.push(finding(surface.surface_id, 'LEDGER', 'MEDIUM', 'ledger event', `What record reconstructs the transition for ${surface.name}?`, 'No ledger, no accountable transition.'));
    if (!surface.specialist_role) findings.push(finding(surface.surface_id, 'SPECIALIST', 'MEDIUM', 'specialist route', `Which competent specialist can reject this result?`, 'Route unresolved domain questions before progression.'));
    if (!surface.accessibility_reviewed) findings.push(finding(surface.surface_id, 'ACCESSIBILITY', 'MEDIUM', 'accessible review path', `Can affected people understand, contest, and use the review path?`, 'Do not treat an inaccessible appeal as meaningful review.'));
    if (surface.dependencies.length === 0) findings.push(finding(surface.surface_id, 'DEPENDENCY', 'MEDIUM', 'dependency map', `What systems, credentials, vendors, or people does ${surface.name} depend on?`, 'Do not claim isolated control without dependency evidence.'));
    if (surface.uncertainty.length) findings.push(finding(surface.surface_id, 'ASSUMPTION', 'MEDIUM', 'preserved uncertainty', `Which uncertainty remains unresolved for ${surface.name}?`, 'Preserve uncertainty; do not convert it into approval.'));
  }
  for (const claimId of input.claims_without_sources) findings.push(finding(undefined, 'EVIDENCE', 'HIGH', `source for claim ${claimId}`, `What source supports claim ${claimId}?`, 'Remove or downgrade unsupported claims.'));
  for (const assumption of input.declared_assumptions) findings.push(finding(undefined, 'ASSUMPTION', 'MEDIUM', assumption, `What evidence would falsify assumption: ${assumption}?`, 'Do not silently promote an assumption into fact.'));
  if (input.proposed_action && !input.surfaces.some((surface) => surface.external_stop_path_id)) findings.push(finding(undefined, 'STOP_PATH', 'HIGH', 'workflow external stop', 'Who can stop the proposed action?', 'Hold the proposed action.'));
  return { pass_id: input.pass_id, state: findings.length ? 'OMISSIONS_FOUND' : 'NO_OMISSIONS_IN_SUPPLIED_SURFACES', findings, uninspected_surfaces: uninspected, unsupported_claim_ids: input.claims_without_sources, first_unsupported_question: findings[0]?.question, machine_authority: false, closure: false };
}
