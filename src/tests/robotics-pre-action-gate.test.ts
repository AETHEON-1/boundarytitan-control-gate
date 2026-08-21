import { assessRoboticsPreAction } from '../robotics/pre-action-gate';
import type { RoboticsMotionProposal, RoboticsPreActionContext } from '../types/robotics-pre-action-contracts';

const proposal: RoboticsMotionProposal = {
  id: 'motion-001', task_id: 'task-001', lane_id: 'robotics', workspace: 'cell-a',
  tool_id: 'gripper-01', payload: 'unknown-box', planned_force: '50N',
  planned_speed: '0.2m/s', planned_energy: 'unknown', affected_surface: 'shared workspace',
  reversibility: 'UNKNOWN',
};
const context: RoboticsPreActionContext = {
  as_of: '2026-08-21T00:00:00Z',
  world_state: { id: 'state-001', robot_id: 'robot-01', model_version: 'wm-01', observed_at: '2026-08-21T00:00:00Z', source_ids: ['camera-01'], sensor_conflicts: [], occlusions: ['behind-pallet'], unknowns: ['payload mass'], independent_measurement_ids: [] },
  stop_state: { external_stop_path_id: 'stop-01', stop_owner_id: 'human-01', availability: 'AVAILABLE', residual_energy_state: 'UNKNOWN' },
  human_release_owner_id: 'human-01', human_release_present: false, permission_valid: false,
  task_expired: false, communication_state: 'AVAILABLE',
};

describe('robotics pre-action boundary', () => {
  it('holds when state, force, release, or stop conditions are unresolved', () => {
    const result = assessRoboticsPreAction(proposal, context);
    expect(result.gate_state).toBe('HOLD');
    expect(result.motion_authority_granted).toBe(false);
    expect(result.world_model_is_authority).toBe(false);
    expect(result.reasons).toEqual(expect.arrayContaining(['Residual energy is not established as controlled.', 'Motion permission is not established.']));
  });
  it('never turns a clean assessment into motion permission', () => {
    const result = assessRoboticsPreAction(proposal, {
      ...context,
      world_state: { ...context.world_state, occlusions: [], unknowns: [], independent_measurement_ids: ['metrology-01'] },
      stop_state: { ...context.stop_state, residual_energy_state: 'CONTROLLED', measured_stop_latency_ms: 40, maximum_allowed_stop_latency_ms: 100 },
      human_release_owner_id: 'human-01', human_release_present: true, permission_valid: true,
      communication_state: 'AVAILABLE',
    });
    expect(result.gate_state).toBe('HOLD');
    expect(result.motion_authority_granted).toBe(false);
    expect(result.human_translation_key.next_permitted_step).toContain('Human review');
  });
});
