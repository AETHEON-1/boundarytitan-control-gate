export type OmissionPassCategory = 'EVIDENCE' | 'ASSUMPTION' | 'OWNER' | 'AUTHORITY' | 'STOP_PATH' | 'CONSEQUENCE' | 'AFFECTED_PARTY' | 'REVERSIBILITY' | 'APPEAL' | 'TEMPORAL' | 'DEPENDENCY' | 'COVERAGE' | 'ACCESSIBILITY' | 'LEDGER' | 'SPECIALIST';

export interface OmissionPassSurface {
  surface_id: string;
  name: string;
  inspected: boolean;
  dependencies: string[];
  affected_party_ids: string[];
  consequence_owner_id?: string;
  decision_owner_id?: string;
  authority_basis_id?: string;
  external_stop_path_id?: string;
  evidence_ids: string[];
  independent_measurement_ids: string[];
  reversible?: boolean;
  harm_window_ms?: number;
  appeal_path_id?: string;
  ledger_event_id?: string;
  specialist_role?: string;
  accessibility_reviewed: boolean;
  uncertainty: string[];
}

export interface OmissionsPassInput {
  pass_id: string;
  surfaces: OmissionPassSurface[];
  claims_without_sources: string[];
  declared_assumptions: string[];
  proposed_action?: string;
}

export interface OmissionPassFinding {
  finding_id: string;
  surface_id?: string;
  category: OmissionPassCategory;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  missing: string;
  question: string;
  rejection_condition: string;
}

export interface OmissionPassResult {
  pass_id: string;
  state: 'OMISSIONS_FOUND' | 'NO_OMISSIONS_IN_SUPPLIED_SURFACES';
  findings: OmissionPassFinding[];
  uninspected_surfaces: string[];
  unsupported_claim_ids: string[];
  first_unsupported_question?: string;
  machine_authority: false;
  closure: false;
}
