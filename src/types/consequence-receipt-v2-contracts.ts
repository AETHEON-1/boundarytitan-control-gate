/**
 * Consequence Receipt v2 candidate contracts.
 *
 * A receipt describes a proposed consequence for human review. It does not
 * approve, grant permission, issue release, execute, close, or certify.
 */

export type ReceiptReviewState = 'PREPARED' | 'HELD_FOR_HUMAN_REVIEW' | 'SUPERSEDED';
export type ConsequenceReversibility = 'REVERSIBLE' | 'PARTIALLY_REVERSIBLE' | 'IRREVERSIBLE' | 'UNKNOWN';
export type DependencyContextState = 'RECORDED' | 'NONE_DECLARED' | 'UNKNOWN';

export interface ReceiptEvidenceReference {
  evidence_id: string;
  claim: string;
  source_reference: string;
  evidence_custodian_id: string;
  freshness_status: 'CURRENT' | 'STALE' | 'UNKNOWN';
  content_hash?: string;
}

export interface ConsequenceReceiptV2 {
  id: string;
  proposal_reference: string;
  task_wall_id?: string;
  workcell_id?: string;
  scope: string;
  expected_consequence: string;
  affected_surface: string;
  reversibility: ConsequenceReversibility;
  accountable_human_owner_id: string;
  decision_owner_id: string;
  external_stop_path_id: string;
  stop_path_owner_id: string;
  revocation_authority_id: string;
  evidence: ReceiptEvidenceReference[];
  dependency_context_state: DependencyContextState;
  dependency_references: string[];
  reinspection_candidate_references: string[];
  unresolved_questions: string[];
  who_can_still_say_no: string[];
  review_state: ReceiptReviewState;
  prepared_at: string;
  prepared_by: string;
  expiry: string;
}
