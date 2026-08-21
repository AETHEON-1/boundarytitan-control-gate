/** Declaration-only robotics pre-action boundary contracts. */
export type RoboticsEvidenceState = 'SUPPORTED' | 'CONTRADICTED' | 'INDETERMINATE' | 'NOT_TESTED' | 'TEST_INVALID';
export type RoboticsGateState = 'HOLD' | 'HUMAN_REVIEW_REQUIRED' | 'MOTION_ELIGIBLE_FOR_EXTERNAL_DECISION';
export interface RoboticsWorldState {
  id: string;
  robot_id: string;
  model_version: string;
  observed_at: string;
  source_ids: string[];
  sensor_conflicts: string[];
  occlusions: string[];
  unknowns: string[];
  independent_measurement_ids: string[];
}
export interface RoboticsMotionProposal {
  id: string;
  task_id: string;
  lane_id: string;
  workspace: string;
  tool_id: string;
  payload: string;
  planned_force: string;
  planned_speed: string;
  planned_energy: string;
  affected_surface: string;
  reversibility: 'REVERSIBLE' | 'PARTIALLY_REVERSIBLE' | 'IRREVERSIBLE' | 'UNKNOWN';
}
export interface RoboticsStopState {
  external_stop_path_id: string;
  stop_owner_id: string;
  availability: 'AVAILABLE' | 'UNAVAILABLE' | 'UNKNOWN';
  measured_stop_latency_ms?: number;
  maximum_allowed_stop_latency_ms?: number;
  residual_energy_state: 'CONTROLLED' | 'PRESENT' | 'UNKNOWN';
}
export interface RoboticsPreActionContext {
  as_of: string;
  world_state: RoboticsWorldState;
  stop_state: RoboticsStopState;
  human_release_owner_id?: string;
  human_release_present: boolean;
  permission_valid: boolean;
  task_expired: boolean;
  communication_state: 'AVAILABLE' | 'DEGRADED' | 'LOST' | 'UNKNOWN';
}
export interface RoboticsPreActionResult {
  proposal_id: string;
  gate_state: RoboticsGateState;
  evidence_state: RoboticsEvidenceState;
  reasons: string[];
  unknowns: string[];
  required_human_decisions: string[];
  motion_authority_granted: false;
  world_model_is_authority: false;
  human_translation_key: {
    what_model_estimates: string;
    what_is_independently_measured: string;
    what_remains_unknown: string[];
    consequence: string;
    who_can_still_say_no: string[];
    next_permitted_step: string;
  };
}
