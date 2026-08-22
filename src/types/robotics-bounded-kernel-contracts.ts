/**
 * Vendor-neutral, declaration-only contracts for the BoundaryTitan robotics
 * bounded kernel. These contracts prepare evidence and block unsafe
 * continuation; they never grant motion authority or certify safety.
 */
export type KernelState = 'UNAUTHORIZED' | 'STANDBY' | 'AUTHORIZED' | 'PROPOSED' | 'RELEASED' | 'MOVING' | 'STOP_REQUESTED' | 'STOPPING' | 'SAFE_STOP' | 'ENERGY_ISOLATED' | 'FAULT' | 'HUMAN_REVIEW' | 'RESTART_PENDING' | 'REVOKED';
export type EvidenceStatus = 'SUPPORTED' | 'CONTRADICTED' | 'INDETERMINATE' | 'NOT_TESTED' | 'TEST_INVALID';
export type GateDecision = 'HOLD' | 'HUMAN_REVIEW_REQUIRED' | 'MOTION_ELIGIBLE_FOR_EXTERNAL_DECISION';

export interface AuthorityManifest {
  manifest_id: string;
  robot_id: string;
  version: string;
  task_id: string;
  lane_id: string;
  workspace_id: string;
  allowed_actions: string[];
  forbidden_actions: string[];
  tool_ids: string[];
  payload_limit: string;
  speed_limit: string;
  force_limit: string;
  consequence_owner_id: string;
  stop_authority_ids: string[];
  expires_at: string;
  revocable: true;
  motion_authority_granted: false;
}

export interface SafetyStateTransition { from: KernelState; to: KernelState; event: string; actor_id: string; occurred_at: string; evidence_ids: string[]; }
export interface SafetyStateMachine { current: KernelState; transitions: SafetyStateTransition[]; restart_requires_external_release: true; automatic_restart_allowed: false; }

export interface ExternalBrakeContract {
  contract_id: string;
  path_id: string;
  independent_of_model: true;
  independent_of_planner: true;
  bypasses_ordinary_motion_control: true;
  trigger_types: string[];
  stop_method: string;
  expected_latency_ms: number;
  measured_latency_ms?: number;
  maximum_latency_ms: number;
  maximum_stopping_distance: string;
  residual_energy_policy: string;
  safe_state: string;
  restart_policy: 'MANUAL_EXTERNAL_RELEASE_ONLY';
  last_test_id?: string;
  last_test_status?: 'PASS' | 'FAIL' | 'NOT_RUN' | 'INVALID';
  last_tested_at?: string;
  independent_verifier_id?: string;
}

export interface MotionLedgerEntry { entry_id: string; proposal_id: string; robot_id: string; state: KernelState; event: string; actor_id: string; occurred_at: string; source_ids: string[]; independent_measurement_ids: string[]; uncertainty: string[]; consequence_owner_id: string; authorization_status: 'NOT_AUTHORITY'; }
export interface FaultInjectionScenario { scenario_id: string; name: string; injected_fault: string; expected_state: KernelState; expected_control: string; expected_ledger_events: string[]; }
export interface FaultInjectionResult { scenario_id: string; status: 'PASS' | 'FAIL' | 'NOT_RUN' | 'INVALID'; observed_state?: KernelState; observed_events: string[]; unknowns: string[]; }

export interface EnergySource { source_id: string; type: 'ELECTRICAL' | 'BATTERY' | 'HYDRAULIC' | 'PNEUMATIC' | 'GRAVITATIONAL' | 'ROTATIONAL' | 'THERMAL' | 'MECHANICAL' | 'OTHER'; isolation_method: string; isolated: boolean; verified_by?: string; verified_at?: string; }
export interface MaintenancePack { machine_id: string; authorized_employee_ids: string[]; energy_sources: EnergySource[]; shutdown_steps: string[]; verification_steps: string[]; restart_steps: string[]; lockout_required: boolean; maintenance_entry_permitted: false; }

export interface HandContactPack { hand_id: string; force_limit: string; pressure_limit: string; slip_detection: boolean; tactile_measurement: boolean; human_contact_action: 'STOP_AND_HOLD' | 'STOP_AND_RELEASE' | 'HUMAN_REVIEW'; pinch_shear_zones: string[]; contact_measurement_ids: string[]; }
export interface DegradationRecord { robot_id: string; component: string; metric: string; measured_value: string; allowed_bound: string; status: 'WITHIN_BOUND' | 'EXCEEDED' | 'UNKNOWN'; measured_at: string; evidence_id: string; }
export interface StandardsApplicability { robot_class: string; environment: string; task: string; standards: string[]; exclusions: string[]; competent_reviewer_id?: string; reviewed_at?: string; applicability_status: 'OPEN' | 'REVIEWED' | 'NOT_ESTABLISHED'; }
export interface SpecialistHandoff { handoff_id: string; recipient_roles: string[]; verified_facts: string[]; bounded_inferences: string[]; open_questions: string[]; failed_tests: string[]; required_decisions: string[]; external_stop_authority: string; deployment_approved: false; self_certification: false; }

export interface BoundedKernelInput { manifest: AuthorityManifest; safety: SafetyStateMachine; brake: ExternalBrakeContract; maintenance: MaintenancePack; degradation: DegradationRecord[]; standards: StandardsApplicability; independent_measurement_ids: string[]; communication: 'AVAILABLE' | 'DEGRADED' | 'LOST' | 'UNKNOWN'; uncertainty: string[]; }
export interface BoundedKernelResult { decision: GateDecision; evidence_status: EvidenceStatus; reasons: string[]; required_human_decisions: string[]; ledger_entry: MotionLedgerEntry; specialist_handoff: SpecialistHandoff; }
