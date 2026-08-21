import { assessRoboticsLifecycle } from '../robotics/system-lifecycle';
import type { RoboticsLifecycleRecord } from '../types/robotics-system-authority-lifecycle-contracts';

const record: RoboticsLifecycleRecord = {
  identity: { system_id: 'cell-01', robot_ids: ['robot-01'], system_class: 'ROBOT_CELL', model_versions: ['controller-01'], workcell_id: 'workcell-01', jurisdiction: 'US', lifecycle_stage: 'INTEGRATION', applicable_standard_references: ['OSHA-1910.147', 'ISO-10218-2:2025'], excluded_standard_references: [] },
  integration: { controller_ids: ['controller-01'], end_effector_ids: ['gripper-01'], sensor_ids: ['camera-01'], safety_controller_ids: ['safety-plc-01'], network_surfaces: ['cell-network'], adjacent_machine_ids: [], workspace_boundary_reference: 'workspace-01', communication_protocols: ['safety-io'], uninspected_surfaces: ['remote-maintenance'] },
  operating_modes: ['SETUP', 'MAINTENANCE', 'PRODUCTION', 'RECOVERY'],
  human_roles: [{ role: 'STOP_AUTHORITY', subject_id: 'human-01', authority_basis: 'site procedure', verified: true }, { role: 'RECOVERY_OWNER', subject_id: 'human-02', authority_basis: 'site procedure', verified: true }],
  energy_control: { energy_sources: ['electrical', 'pneumatic'], isolation_points: ['disconnect-01'], stored_energy_state: 'UNKNOWN', verification_method: 'zero-energy test', group_lockout_state: 'UNKNOWN', protected_worker_ids: ['worker-01'] },
  ground_truth_records: [],
  lifecycle_controls: ['guarding', 'lockout-tagout'],
  stop_path_reference: 'stop-01',
  recovery_reference: 'recovery-01',
  decommissioning_reference: undefined,
  open_questions: ['Does the stop path dominate stored energy?'],
  uncertainty: ['Remote maintenance surface not inspected.'],
  human_review_state: 'PREPARED',
  motion_authority_granted: false,
  machine_certification_issued: false,
};

describe('robotics system authority and lifecycle record', () => {
  it('holds on incomplete integration, energy, ground truth, and lifecycle evidence', () => {
    const result = assessRoboticsLifecycle(record);
    expect(result.status).toBe('HOLD');
    expect(result.missing).toEqual(expect.arrayContaining(['uninspected integration surfaces', 'stored-energy state', 'group lockout state', 'ground-truth record', 'decommissioning procedure']));
    expect(result.machine_authority_boundary).toBe('NO_MOTION_AUTHORITY_NO_CERTIFICATION_NO_COMPLIANCE_CLAIM');
  });
});
