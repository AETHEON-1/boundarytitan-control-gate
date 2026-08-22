import { assessCanMayTransition } from '../can-may/universal-kernel';
import type { CanMayKernelInput } from '../types/can-may-kernel-contracts';

const complete: CanMayKernelInput = {
  domain: 'HUMAN_ELIGIBILITY', system_id: 'screening-system-1', evidence_status: 'SUPPORTED', communication_available: true, ledger_event_id: 'event-1', specialist_role: 'employment decision specialist',
  transition: { transition_id: 'transition-1', capability: 'CAN_CLASSIFY', requested_authority: 'MAY_CREATE_CONSEQUENCE', evidence_ids: ['evidence-1'], authority_basis_id: 'basis-1', consequence_owner_id: 'employer-1', decision_owner_id: 'decision-owner-1', denial_authority_id: 'deny-1', revocation_authority_id: 'revoke-1', external_stop_path_id: 'stop-1', affected_party_ids: ['applicant-1'], reversible: true, independent_measurement_ids: ['measurement-1'], uncertainty: [], rejection_condition: 'No adverse disposition without independent human decision.', },
};

test('separates capability from permission even when supplied evidence is complete', () => {
  const result = assessCanMayTransition(complete);
  expect(result.disposition).toBe('ELIGIBLE_FOR_EXTERNAL_DECISION');
  expect(result.authorization_status).toBe('NOT_AUTHORITY');
  expect(result.handoff.machine_authority).toBe(false);
  expect(result.handoff.closure).toBe(false);
});

test('locates the first unsupported arrow when authority basis is absent', () => {
  const result = assessCanMayTransition({ ...complete, transition: { ...complete.transition, authority_basis_id: undefined, external_stop_path_id: undefined } });
  expect(result.disposition).toBe('HUMAN_REVIEW_REQUIRED');
  expect(result.first_unsupported_arrow).toBe('Authority basis is missing.');
  expect(result.handoff.open_questions).toEqual(expect.arrayContaining(['Authority basis is missing.', 'External stop path is missing.']));
});

test('preserves uncertainty and affected parties', () => {
  const result = assessCanMayTransition({ ...complete, transition: { ...complete.transition, uncertainty: ['The classifier may use an uninspected proxy feature.'], affected_party_ids: ['applicant-1', 'worker-group-1'] } });
  expect(result.evidence_status).toBe('INDETERMINATE');
  expect(result.handoff.open_questions).toContain('Unresolved uncertainty remains.');
  expect(result.handoff.affected_party_ids).toEqual(['applicant-1', 'worker-group-1']);
});

test('fails closed when an irreversible transition has no harm window', () => {
  const result = assessCanMayTransition({ ...complete, transition: { ...complete.transition, reversible: false, harm_window_ms: undefined } });
  expect(result.disposition).toBe('HUMAN_REVIEW_REQUIRED');
  expect(result.reasons).toContain('Irreversible transition has no declared harm window.');
});
