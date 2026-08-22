export type SigmaTwoDisposition = 'GREEN_FOR_BOUNDED_REVIEW' | 'YELLOW_REQUIRES_REPAIR' | 'RED_HOLD' | 'NOT_ADMISSIBLE';

export interface SigmaTwoDiagonalInput {
  diagonal_id: string;
  system_name: string;
  capability_claim: string;
  evidence_claim: string;
  authority_claim: string;
  consequence_claim: string;
  evidence_owner_id?: string;
  consequence_owner_id?: string;
  decision_owner_id?: string;
  external_stop_authority_id?: string;
  denial_path_id?: string;
  revocation_path_id?: string;
  reversible?: boolean;
  harm_window_ms?: number;
  independent_verifier_id?: string;
  ledger_event_id?: string;
  can_self_certify: boolean;
  can_self_close: boolean;
  uncertainty: string[];
}

export interface SigmaTwoDiagonalResult {
  diagonal_id: string;
  disposition: SigmaTwoDisposition;
  unsupported_arrows: string[];
  verified_separations: string[];
  required_repairs: string[];
  who_can_still_say_no?: string;
  consequence_owner_id?: string;
  uncertainty: string[];
  specialist_handoff: {
    recipient_role: string;
    questions: string[];
    non_claims: string[];
    machine_authority: false;
    machine_certification: false;
    machine_closure: false;
  };
}
