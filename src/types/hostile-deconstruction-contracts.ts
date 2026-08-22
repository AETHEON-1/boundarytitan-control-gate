export type HostileDisposition =
  | 'DERIVED'
  | 'REQUIRES_PREMISE'
  | 'COMPATIBLE_BUT_NOT_DERIVED'
  | 'IMPLEMENTATION'
  | 'CONTRADICTED'
  | 'UNDERDETERMINED';

export type ClaimClass = 'DOCUMENTED_RECORD' | 'BOUNDED_INFERENCE' | 'OPEN_QUESTION';

export interface HostileDeconstructionInput {
  inquiry_id: string;
  claim: string;
  seed: string;
  evidence_ids: string[];
  assumptions: string[];
  consequence_path: string[];
  consequence_owner_id?: string;
  external_stop_authority_id?: string;
  inspected_boundary: string[];
  uninspected_surfaces: string[];
  independent_evaluator_id?: string;
  human_disposition_owner_id?: string;
}

export interface HostileAttack {
  attack_id: string;
  mode: 'OMISSION' | 'INVERSE' | 'CONVERSE' | 'NEGATION' | 'REVERSAL' | 'BOUNDARY' | 'METHOD';
  question: string;
  unsupported_arrow?: string;
  disposition: HostileDisposition;
}

export interface HostileDeconstructionResult {
  inquiry_id: string;
  claim_class: ClaimClass;
  disposition: HostileDisposition;
  first_unsupported_arrow?: string;
  attacks: HostileAttack[];
  evidence_end: string;
  unresolved_questions: string[];
  machine_authority: false;
  machine_certification: false;
  machine_closure: false;
  human_disposition_required: true;
}
