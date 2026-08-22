/** Domain-neutral contracts for separating capability from permission. */
export type ConsequenceDomain = 'PHYSICAL_CONTROL' | 'HUMAN_ELIGIBILITY' | 'PUBLIC_AUTHORITY' | 'INFORMATION_VISIBILITY' | 'MONEY_AND_CONTRACTS' | 'ENVIRONMENT_AND_RESOURCES' | 'RESEARCH_AND_PUBLICATION' | 'PERSONAL_PRODUCTIVITY' | 'OTHER';
export type ClaimStage = 'CAN_PREPARE' | 'CAN_OBSERVE' | 'CAN_STORE' | 'CAN_AUTHENTICATE' | 'CAN_DETECT' | 'CAN_IDENTIFY' | 'CAN_INFER' | 'CAN_CLASSIFY' | 'CAN_SCORE' | 'CAN_RECOMMEND' | 'CAN_RANK' | 'CAN_OPTIMIZE' | 'CAN_TRIGGER' | 'CAN_EXECUTE' | 'CAN_ALTER_STATE' | 'CAN_CREATE_CONSEQUENCE';
export type AuthorityStage = 'MAY_PREPARE' | 'MAY_OBSERVE' | 'MAY_STORE' | 'MAY_AUTHENTICATE' | 'MAY_DETECT' | 'MAY_IDENTIFY' | 'MAY_INFER' | 'MAY_CLASSIFY' | 'MAY_SCORE' | 'MAY_RECOMMEND' | 'MAY_RANK' | 'MAY_OPTIMIZE' | 'MAY_TRIGGER' | 'MAY_EXECUTE' | 'MAY_ALTER_STATE' | 'MAY_CREATE_CONSEQUENCE';
export type CanMayDisposition = 'HOLD' | 'HUMAN_REVIEW_REQUIRED' | 'ELIGIBLE_FOR_EXTERNAL_DECISION';
export type CanMayEvidence = 'SUPPORTED' | 'INDETERMINATE' | 'NOT_TESTED' | 'CONTRADICTED';

export interface CanMayTransition {
  transition_id: string;
  capability: ClaimStage;
  requested_authority: AuthorityStage;
  evidence_ids: string[];
  authority_basis_id?: string;
  consequence_owner_id?: string;
  decision_owner_id?: string;
  denial_authority_id?: string;
  revocation_authority_id?: string;
  external_stop_path_id?: string;
  affected_party_ids: string[];
  reversible: boolean;
  harm_window_ms?: number;
  independent_measurement_ids: string[];
  uncertainty: string[];
  rejection_condition: string;
}

export interface CanMayKernelInput {
  domain: ConsequenceDomain;
  system_id: string;
  transition: CanMayTransition;
  evidence_status: CanMayEvidence;
  communication_available: boolean;
  ledger_event_id?: string;
  specialist_role?: string;
}

export interface CanMayHandoff {
  recipient_role: string;
  verified_facts: string[];
  bounded_inferences: string[];
  open_questions: string[];
  failed_controls: string[];
  affected_party_ids: string[];
  external_stop_path: string;
  machine_authority: false;
  machine_certification: false;
  closure: false;
}

export interface CanMayKernelResult {
  disposition: CanMayDisposition;
  evidence_status: CanMayEvidence;
  first_unsupported_arrow: string;
  reasons: string[];
  ledger_event_id?: string;
  handoff: CanMayHandoff;
  authorization_status: 'NOT_AUTHORITY';
}
