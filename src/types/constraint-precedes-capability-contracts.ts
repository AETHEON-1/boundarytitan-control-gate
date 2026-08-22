export type ConstraintCapabilityDisposition = 'CAPABILITY_ADMITTED_FOR_BOUNDED_REVIEW' | 'CAPABILITY_HELD_FOR_CONSTRAINT_REPAIR' | 'NOT_ADMISSIBLE';

export interface ConstraintPrecedesCapabilityInput {
  assessment_id: string;
  capability_name: string;
  capability_claim: string;
  constraints: string[];
  forbidden_actions: string[];
  allowed_scope: string[];
  evidence_ids: string[];
  constraint_owner_id?: string;
  consequence_owner_id?: string;
  external_stop_path_id?: string;
  revocation_path_id?: string;
  harm_window_ms?: number;
  independent_measurement_ids: string[];
  uncertainty: string[];
}

export interface ConstraintPrecedesCapabilityResult {
  assessment_id: string;
  disposition: ConstraintCapabilityDisposition;
  capability_name: string;
  constraints_before_capability: true;
  missing_constraints: string[];
  verified_constraints: string[];
  forbidden_actions: string[];
  allowed_scope: string[];
  uncertainty: string[];
  required_human_decisions: string[];
  machine_authority: false;
  deployment_approved: false;
}
