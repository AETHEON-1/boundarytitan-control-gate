/** Declaration-only specialist handoff candidate contracts. */
export interface SpecialistQuestion {
  id: string;
  question: string;
  target_object: string;
  rejection_condition: string;
}

export interface SpecialistHandoffPacket {
  id: string;
  bounded_claim: string;
  artifact_references: string[];
  questions: SpecialistQuestion[];
  non_claims: string[];
  unresolved_questions: string[];
  human_owner_id: string;
  state: 'PREPARED_FOR_HUMAN_OWNER_REVIEW';
}
