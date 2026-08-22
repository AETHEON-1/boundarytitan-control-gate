import type { CanMayKernelInput, CanMayKernelResult } from '../types/can-may-kernel-contracts';

/** Read-only CAN → MAY assessment. It never grants authority. */
export function assessCanMayTransition(input: CanMayKernelInput): CanMayKernelResult {
  const reasons: string[] = [];
  const t = input.transition;
  const missing = (value: string | undefined) => !value;

  if (!t.evidence_ids.length || input.evidence_status !== 'SUPPORTED') reasons.push('Transition evidence is absent, incomplete, or not supported.');
  if (missing(t.authority_basis_id)) reasons.push('Authority basis is missing.');
  if (missing(t.consequence_owner_id)) reasons.push('Consequence owner is missing.');
  if (missing(t.decision_owner_id)) reasons.push('Decision owner is missing.');
  if (missing(t.denial_authority_id)) reasons.push('Denial authority is missing.');
  if (missing(t.revocation_authority_id)) reasons.push('Revocation authority is missing.');
  if (missing(t.external_stop_path_id)) reasons.push('External stop path is missing.');
  if (!t.affected_party_ids.length) reasons.push('Affected party is not identified.');
  if (!t.reversible && t.harm_window_ms === undefined) reasons.push('Irreversible transition has no declared harm window.');
  if (!t.independent_measurement_ids.length) reasons.push('Independent measurement is missing.');
  if (!input.communication_available) reasons.push('Communication required for external review is unavailable.');
  if (!input.ledger_event_id) reasons.push('Ledger event is missing.');
  if (t.uncertainty.length) reasons.push('Unresolved uncertainty remains.');

  const first = reasons[0] ?? 'No unsupported arrow detected within the supplied boundary.';
  const handoff = {
    recipient_role: input.specialist_role ?? 'domain specialist',
    verified_facts: ['The kernel is read-only.', 'CAN does not entail MAY.', 'The result is not authority.'],
    bounded_inferences: [`The supplied evidence describes a ${t.capability} capability and a requested ${t.requested_authority} transition.`],
    open_questions: reasons,
    failed_controls: reasons.map((reason) => reason.replace(/ is missing\.$/, ' control')),
    affected_party_ids: t.affected_party_ids,
    external_stop_path: t.external_stop_path_id ?? '',
    machine_authority: false as const,
    machine_certification: false as const,
    closure: false as const,
  };
  return { disposition: reasons.length ? 'HUMAN_REVIEW_REQUIRED' : 'ELIGIBLE_FOR_EXTERNAL_DECISION', evidence_status: reasons.length && input.evidence_status === 'SUPPORTED' ? 'INDETERMINATE' : input.evidence_status, first_unsupported_arrow: first, reasons, ledger_event_id: input.ledger_event_id, handoff, authorization_status: 'NOT_AUTHORITY' };
}
