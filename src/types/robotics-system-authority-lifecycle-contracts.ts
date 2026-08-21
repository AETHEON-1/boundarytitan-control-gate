/** Declaration-only integrated robotics authority and lifecycle contracts. */
export type RoboticsLifecycleStage = 'DESIGN' | 'INTEGRATION' | 'COMMISSIONING' | 'OPERATION' | 'MAINTENANCE' | 'RECOVERY' | 'DECOMMISSIONING' | 'DISPOSAL';
export type RoboticsSystemClass = 'INDUSTRIAL_ROBOT' | 'ROBOT_CELL' | 'MOBILE_ROBOT' | 'SERVICE_ROBOT' | 'CONSTRUCTION_ROBOT' | 'EMERGENCY_RESPONSE_ROBOT' | 'MEDICAL_OR_ASSISTIVE_ROBOT' | 'OTHER';
export type RoboticsOperatingMode = 'PRODUCTION' | 'PROGRAMMING' | 'SETUP' | 'TESTING' | 'ADJUSTMENT' | 'MAINTENANCE' | 'JAM_CLEARING' | 'INSPECTION' | 'RECOVERY' | 'RESTART' | 'TELEOPERATION' | 'SHARED_AUTONOMY';
export type RoboticsEvidenceState = 'SUPPORTED' | 'CONTRADICTED' | 'INDETERMINATE' | 'NOT_TESTED' | 'TEST_INVALID' | 'REQUIRES_PREMISE';

export interface RoboticsSystemIdentity {
  system_id: string;
  robot_ids: string[];
  system_class: RoboticsSystemClass;
  model_versions: string[];
  workcell_id?: string;
  jurisdiction: string;
  lifecycle_stage: RoboticsLifecycleStage;
  applicable_standard_references: string[];
  excluded_standard_references: string[];
}

export interface RoboticsIntegrationSurface {
  controller_ids: string[];
  end_effector_ids: string[];
  sensor_ids: string[];
  safety_controller_ids: string[];
  network_surfaces: string[];
  adjacent_machine_ids: string[];
  workspace_boundary_reference: string;
  communication_protocols: string[];
  uninspected_surfaces: string[];
}

export interface RoboticsHumanRole {
  role: 'TASK_OWNER' | 'MOTION_RELEASE_OWNER' | 'SAFETY_AUTHORITY' | 'STOP_AUTHORITY' | 'AUTHORIZED_EMPLOYEE' | 'AFFECTED_EMPLOYEE' | 'RECOVERY_OWNER' | 'EVIDENCE_CUSTODIAN' | 'SPECIALIST_REVIEWER';
  subject_id: string;
  authority_basis: string;
  verified: boolean;
  expiry?: string;
}

export interface RoboticsEnergyControl {
  energy_sources: string[];
  isolation_points: string[];
  stored_energy_state: 'RELIEVED' | 'DISCONNECTED' | 'RESTRAINED' | 'PRESENT' | 'UNKNOWN';
  verification_method?: string;
  group_lockout_state: 'NOT_APPLICABLE' | 'ACTIVE' | 'CLEAR' | 'UNKNOWN';
  protected_worker_ids: string[];
  restoration_procedure_reference?: string;
}

export interface RoboticsGroundTruthRecord {
  id: string;
  subject: string;
  measurement_method: string;
  source_ids: string[];
  calibration_reference?: string;
  measured_at: string;
  uncertainty: string;
  comparison_rule: string;
  disagreement_threshold: string;
  independent_verifier_id?: string;
  evidence_state: RoboticsEvidenceState;
}

export interface RoboticsLifecycleRecord {
  identity: RoboticsSystemIdentity;
  integration: RoboticsIntegrationSurface;
  operating_modes: RoboticsOperatingMode[];
  human_roles: RoboticsHumanRole[];
  energy_control: RoboticsEnergyControl;
  ground_truth_records: RoboticsGroundTruthRecord[];
  lifecycle_controls: string[];
  stop_path_reference: string;
  recovery_reference: string;
  decommissioning_reference?: string;
  open_questions: string[];
  uncertainty: string[];
  human_review_state: 'PREPARED' | 'HELD' | 'EXTERNALLY_REVIEWED' | 'NOT_TESTED';
  motion_authority_granted: false;
  machine_certification_issued: false;
}
