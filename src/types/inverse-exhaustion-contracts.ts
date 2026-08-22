export type InverseDisposition = 'INVERSE_SUPPORTED_WITHIN_SCOPE' | 'INVERSE_NOT_ESTABLISHED' | 'INVERSE_REFUTED_WITHIN_SCOPE' | 'NOT_TESTED';

export interface InverseExhaustionInput {
  test_id: string;
  domain: string;
  forward_claim: string;
  condition: string;
  consequence: string;
  inverse_condition: string;
  inverse_consequence: string;
  witnesses: Array<{ id: string; condition_present: boolean; consequence_present: boolean; source_ids: string[]; evidence_ids: string[]; notes?: string }>;
  untested_surfaces: string[];
  owner_id?: string;
  external_reviewer_id?: string;
  rejection_condition: string;
}

export interface InverseExhaustionResult {
  test_id: string;
  disposition: InverseDisposition;
  forward_claim: string;
  tested_inverse: string;
  witnesses_examined: string[];
  counterexamples: string[];
  unsupported_bridges: string[];
  remaining_unknowns: string[];
  required_human_decisions: string[];
  specialist_handoff: {
    recipient_role: string;
    questions: string[];
    non_claims: string[];
    machine_authority: false;
    closure: false;
  };
}
