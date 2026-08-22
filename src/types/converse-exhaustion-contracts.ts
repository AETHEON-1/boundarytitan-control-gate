export type ConverseDisposition = 'CONVERSE_SUPPORTED_WITHIN_SCOPE' | 'CONVERSE_NOT_ESTABLISHED' | 'CONVERSE_REFUTED_WITHIN_SCOPE' | 'NOT_TESTED';

export interface ConverseExhaustionInput {
  test_id: string;
  forward_claim: string;
  forward_condition: string;
  forward_consequence: string;
  converse_condition: string;
  converse_consequence: string;
  domain: string;
  witnesses: Array<{ id: string; condition_present: boolean; consequence_present: boolean; source_ids: string[]; evidence_ids: string[]; notes?: string }>;
  untested_surfaces: string[];
  owner_id?: string;
  external_reviewer_id?: string;
  rejection_condition: string;
}

export interface ConverseExhaustionResult {
  test_id: string;
  disposition: ConverseDisposition;
  forward_claim: string;
  tested_converse: string;
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
