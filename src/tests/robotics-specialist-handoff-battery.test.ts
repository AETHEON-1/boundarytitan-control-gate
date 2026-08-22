import { assessBoundedRoboticsKernel } from '../robotics/bounded-kernel';
import type { BoundedKernelInput } from '../types/robotics-bounded-kernel-contracts';

const valid: BoundedKernelInput = {
  manifest: { manifest_id: 'manifest-battery', robot_id: 'robot-battery', version: '1', task_id: 'task-battery', lane_id: 'lane-1', workspace_id: 'cell-1', allowed_actions: ['inspect'], forbidden_actions: ['enter-human-zone'], tool_ids: ['camera'], payload_limit: '0kg', speed_limit: '0.1m/s', force_limit: '10N', consequence_owner_id: 'owner-1', stop_authority_ids: ['stop-1'], expires_at: '2099-01-01T00:00:00Z', revocable: true, motion_authority_granted: false },
  safety: { current: 'STANDBY', transitions: [], restart_requires_external_release: true, automatic_restart_allowed: false },
  brake: { contract_id: 'brake-battery', path_id: 'path-1', independent_of_model: true, independent_of_planner: true, bypasses_ordinary_motion_control: true, trigger_types: ['human-presence'], stop_method: 'dynamic-brake', expected_latency_ms: 20, measured_latency_ms: 20, maximum_latency_ms: 100, maximum_stopping_distance: '0.1m', residual_energy_policy: 'controlled', safe_state: 'held-and-isolated', restart_policy: 'MANUAL_EXTERNAL_RELEASE_ONLY', last_test_id: 'brake-test-1', last_test_status: 'PASS', last_tested_at: '2026-08-21T00:00:00Z', independent_verifier_id: 'verifier-1' },
  maintenance: { machine_id: 'robot-battery', authorized_employee_ids: ['tech-1'], energy_sources: [{ source_id: 'battery', type: 'BATTERY', isolation_method: 'physical disconnect', isolated: true }], shutdown_steps: ['stop', 'isolate'], verification_steps: ['test zero motion'], restart_steps: ['inspect', 'release'], lockout_required: true, maintenance_entry_permitted: false },
  degradation: [], standards: { robot_class: 'industrial', environment: 'guarded cell', task: 'inspection', standards: ['ISO 10218-2:2025'], exclusions: [], applicability_status: 'REVIEWED', competent_reviewer_id: 'reviewer-1', reviewed_at: '2026-08-21T00:00:00Z' }, independent_measurement_ids: ['measurement-1'], communication: 'AVAILABLE', uncertainty: [],
};

const assess = (input: BoundedKernelInput = valid) => assessBoundedRoboticsKernel(input, 'proposal-battery', '2026-08-22T00:00:00Z');

describe('specialist handoff test battery', () => {
  test('preserves the human stop path and blocks machine authority', () => {
    const handoff = assess().specialist_handoff;
    expect(handoff.external_stop_authority).toBe('stop-1');
    expect(handoff.recipient_roles).toEqual(expect.arrayContaining(['robotics safety engineer', 'controls engineer', 'site authority']));
    expect(handoff.deployment_approved).toBe(false);
    expect(handoff.self_certification).toBe(false);
    expect(assess().ledger_entry.authorization_status).toBe('NOT_AUTHORITY');
  });

  test('turns missing brake evidence into an explicit failed test and open question', () => {
    const input = { ...valid, brake: { ...valid.brake, last_test_status: 'NOT_RUN' as const, measured_latency_ms: undefined, independent_verifier_id: undefined } };
    const result = assess(input);
    expect(result.specialist_handoff.failed_tests).toContain('External brake dominance test');
    expect(result.specialist_handoff.open_questions).toEqual(expect.arrayContaining(['External brake does not have a current passing test with independent verification.', 'External brake measured latency is missing.']));
  });

  test('does not erase unknowns or permit a handoff to imply readiness', () => {
    const result = assess({ ...valid, uncertainty: ['Human-contact force measurement is not available.'], independent_measurement_ids: [], standards: { ...valid.standards, applicability_status: 'OPEN', competent_reviewer_id: undefined, reviewed_at: undefined } });
    expect(result.evidence_status).toBe('NOT_TESTED');
    expect(result.specialist_handoff.open_questions).toContain('Unresolved uncertainty remains.');
    expect(result.specialist_handoff.failed_tests).toEqual(expect.arrayContaining(['Independent measurement review', 'Standards applicability review']));
    expect(result.specialist_handoff.deployment_approved).toBe(false);
  });

  test('routes consequence ownership gaps to human review', () => {
    const input = { ...valid, manifest: { ...valid.manifest, consequence_owner_id: '', stop_authority_ids: [] } };
    const result = assess(input);
    expect(result.decision).toBe('HOLD');
    expect(result.specialist_handoff.open_questions).toContain('Consequence owner or stop authority is missing.');
    expect(result.specialist_handoff.required_decisions).toContain('Route unresolved conditions to the named external owner.');
  });
});
