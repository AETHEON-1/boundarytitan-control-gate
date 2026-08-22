export type FiftyOneFiftyClass = 'DOCUMENTED_RECORD' | 'BOUNDED_INFERENCE' | 'OPEN_QUESTION';

export interface FiftyOneFiftyClaim {
  claim_id: string;
  text: string;
  class: FiftyOneFiftyClass;
  source_ids: string[];
  evidence_ids: string[];
  capability_stage?: string;
  authority_stage?: string;
  consequence_surface?: string;
  consequence_owner_id?: string;
  external_stop_path_id?: string;
  uncertainty: string[];
}

export interface FiftyOneFiftyOmission {
  omission_id: string;
  category: 'EVIDENCE' | 'OWNER' | 'AUTHORITY' | 'STOP_PATH' | 'CONSEQUENCE' | 'REVERSIBILITY' | 'APPEAL' | 'UNINSPECTED_SURFACE' | 'TEMPORAL';
  description: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  rejection_condition: string;
}

export interface FiftyOneFiftyWorkflowInput {
  workflow_id: string;
  claims: FiftyOneFiftyClaim[];
  uninspected_surfaces: string[];
  proposed_action?: string;
  specialist_role?: string;
}

export interface FiftyOneFiftyWorkflowResult {
  workflow_id: string;
  state: 'PREPARATION_ONLY' | 'HUMAN_REVIEW_REQUIRED';
  record: FiftyOneFiftyClaim[];
  omissions: FiftyOneFiftyOmission[];
  first_unsupported_arrow?: string;
  consequence_owner_id?: string;
  external_stop_path_id?: string;
  specialist_handoff: {
    recipient_role: string;
    questions: string[];
    non_claims: string[];
    machine_authority: false;
    closure: false;
  };
}
