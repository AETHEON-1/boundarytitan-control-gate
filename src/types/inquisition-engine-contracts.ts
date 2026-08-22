export type InquisitionDisposition = 'SURVIVES_INITIAL_ATTACK' | 'REQUIRES_REPAIR' | 'HOLD_FOR_COUNTEREVIDENCE' | 'NOT_ADMISSIBLE';

export interface InquisitionEngineInput {
  inquiry_id: string;
  claim: string;
  claimed_capability?: string;
  claimed_authority?: string;
  evidence_ids: string[];
  source_ids: string[];
  assumptions: string[];
  consequence_path: string[];
  consequence_owner_id?: string;
  decision_owner_id?: string;
  external_stop_path_id?: string;
  revocation_path_id?: string;
  reversible?: boolean;
  harm_window_ms?: number;
  independent_verifier_id?: string;
  self_certification_possible: boolean;
  uninspected_surfaces: string[];
}

export interface InquisitionAttack {
  attack_id: string;
  category: 'CLAIM' | 'EVIDENCE' | 'ASSUMPTION' | 'AUTHORITY' | 'OWNER' | 'CONSEQUENCE' | 'TEMPORAL' | 'REVERSIBILITY' | 'SELF_CERTIFICATION' | 'COVERAGE';
  question: string;
  rejection_condition: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface InquisitionEngineResult {
  inquiry_id: string;
  disposition: InquisitionDisposition;
  attacks: InquisitionAttack[];
  strongest_attack?: InquisitionAttack;
  counterevidence_requested: string[];
  unresolved_questions: string[];
  machine_authority: false;
  machine_verdict: false;
  closure: false;
}
