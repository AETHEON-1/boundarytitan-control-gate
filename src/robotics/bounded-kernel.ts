import type { BoundedKernelInput, BoundedKernelResult, EvidenceStatus, GateDecision, MotionLedgerEntry, SpecialistHandoff } from '../types/robotics-bounded-kernel-contracts';

/** Read-only gate. It cannot grant motion authority. */
export function assessBoundedRoboticsKernel(input: BoundedKernelInput, proposalId: string, now: string): BoundedKernelResult {
  const reasons: string[] = [];
  const decisions: string[] = [];
  let evidence: EvidenceStatus = 'SUPPORTED';
  const allIsolated = input.maintenance.energy_sources.length > 0 && input.maintenance.energy_sources.every((source) => source.isolated);
  const degraded = input.degradation.some((record) => record.status === 'EXCEEDED');
  const brakeTestValid = Boolean(input.brake.last_test_id && input.brake.last_test_status === 'PASS' && input.brake.last_tested_at && input.brake.independent_verifier_id && input.brake.measured_latency_ms !== undefined && input.brake.measured_latency_ms <= input.brake.maximum_latency_ms);
  const brakeIndependent = input.brake.independent_of_model && input.brake.independent_of_planner && input.brake.bypasses_ordinary_motion_control;
  const standardsReviewed = input.standards.applicability_status === 'REVIEWED' && Boolean(input.standards.competent_reviewer_id && input.standards.reviewed_at);
  const independentMeasurementPresent = input.independent_measurement_ids.length > 0;

  if (!input.manifest.allowed_actions.length || input.manifest.forbidden_actions.length === 0) reasons.push('Authority manifest is incomplete; allowed and forbidden actions must both be explicit.');
  if (new Date(input.manifest.expires_at).getTime() <= new Date(now).getTime()) reasons.push('Authority manifest is expired.');
  if (input.manifest.stop_authority_ids.length === 0 || !input.manifest.consequence_owner_id) reasons.push('Consequence owner or stop authority is missing.');
  if (input.safety.current !== 'AUTHORIZED' && input.safety.current !== 'STANDBY') reasons.push('Safety state does not admit a pre-action review.');
  if (!brakeIndependent) reasons.push('External brake independence is not established.');
  if (!brakeTestValid) { reasons.push('External brake does not have a current passing test with independent verification.'); evidence = 'NOT_TESTED'; }
  if (input.brake.measured_latency_ms === undefined) { reasons.push('External brake measured latency is missing.'); evidence = 'NOT_TESTED'; }
  if (input.brake.measured_latency_ms !== undefined && input.brake.measured_latency_ms > input.brake.maximum_latency_ms) reasons.push('Measured brake latency exceeds the maximum.');
  if (input.brake.expected_latency_ms > input.brake.maximum_latency_ms) reasons.push('Declared brake latency exceeds the maximum.');
  if (input.maintenance.lockout_required && !allIsolated) reasons.push('Required energy sources are not all isolated.');
  if (input.maintenance.authorized_employee_ids.length === 0) reasons.push('No authorized maintenance employee is named.');
  if (input.communication !== 'AVAILABLE') reasons.push('Communication state is not fully available.');
  if (degraded) reasons.push('A degradation metric exceeds its declared bound.');
  if (!standardsReviewed) reasons.push('Standards applicability is not independently reviewed.');
  if (!independentMeasurementPresent) { reasons.push('No independent measurement is recorded.'); evidence = 'NOT_TESTED'; }
  if (input.uncertainty.length) { reasons.push('Unresolved uncertainty remains.'); evidence = evidence === 'SUPPORTED' ? 'INDETERMINATE' : evidence; }
  if (reasons.length) { decisions.push('Hold motion and preserve the evidence.'); decisions.push('Route unresolved conditions to the named external owner.'); }
  const decision: GateDecision = reasons.length ? 'HOLD' : 'MOTION_ELIGIBLE_FOR_EXTERNAL_DECISION';
  const ledgerEntry: MotionLedgerEntry = { entry_id: `ledger:${proposalId}:${now}`, proposal_id: proposalId, robot_id: input.manifest.robot_id, state: reasons.length ? 'HUMAN_REVIEW' : 'PROPOSED', event: 'PRE_ACTION_ASSESSMENT', actor_id: 'bounded-kernel', occurred_at: now, source_ids: [input.manifest.manifest_id, input.brake.contract_id], independent_measurement_ids: input.independent_measurement_ids, uncertainty: input.uncertainty, consequence_owner_id: input.manifest.consequence_owner_id, authorization_status: 'NOT_AUTHORITY' };
  const failedTests: string[] = [];
  if (!brakeIndependent || !brakeTestValid) failedTests.push('External brake dominance test');
  if (input.maintenance.lockout_required && !allIsolated) failedTests.push('Hazardous energy isolation verification');
  if (!standardsReviewed) failedTests.push('Standards applicability review');
  if (!independentMeasurementPresent) failedTests.push('Independent measurement review');
  const handoff: SpecialistHandoff = { handoff_id: `handoff:${proposalId}:${now}`, recipient_roles: ['robotics safety engineer', 'controls engineer', 'site authority'], verified_facts: ['The kernel is read-only.', 'Motion authority is never granted by this result.'], bounded_inferences: ['The action remains bounded only by the supplied manifest and evidence.'], open_questions: reasons, failed_tests: failedTests, required_decisions: decisions, external_stop_authority: input.manifest.stop_authority_ids.join(', '), deployment_approved: false, self_certification: false };
  return { decision, evidence_status: evidence, reasons, required_human_decisions: decisions, ledger_entry: ledgerEntry, specialist_handoff: handoff };
}
