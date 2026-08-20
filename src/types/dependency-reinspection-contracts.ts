/**
 * Dependency and reinspection candidate contracts.
 *
 * These declarations record relationships and observed changes. They do not
 * detect changes, reopen work, grant authority, restart workcells, or execute
 * any action.
 */

export type DependencyRelation = 'TOUCHES' | 'RELIES_ON';
export type ReinspectionStatus = 'PENDING_HUMAN_REVIEW' | 'REVIEWED' | 'SUPERSEDED';

export interface DependencyDeclaration {
  id: string;
  task_wall_id: string;
  workcell_id?: string;
  relation: DependencyRelation;
  target_type: string;
  target_id: string;
  recorded_at: string;
  evidence_references: string[];
}

/** A change observation that may require review; it is not a reopening decision. */
export interface ReinspectionCandidate {
  id: string;
  task_wall_id: string;
  dependency_declaration_id: string;
  observed_change: string;
  observed_at: string;
  status: ReinspectionStatus;
  evidence_references: string[];
  human_review_reference?: string;
}

/** Preserves UNKNOWN versus NOVELTY without supplying routing behavior. */
export interface UncertaintyObservation {
  id: string;
  task_wall_id: string;
  classification: 'UNKNOWN' | 'NOVELTY';
  observation: string;
  observed_at: string;
  evidence_references: string[];
  required_next_state: 'HOLD_FOR_REVIEW';
}
