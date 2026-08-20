/**
 * Proposed Task Wall contracts.
 *
 * Declaration-only Phase 3 candidates derived from the current-work
 * integration map. These types do not calculate task state, issue authority,
 * persist revocation, authorize reopening, or execute any action.
 */

export type BoundaryTerm =
  | 'UNKNOWN'
  | 'NOVELTY'
  | 'SUPPORTED'
  | 'HOLD'
  | 'OWNER'
  | 'MAY';

export type TaskWallState = 'DECLARED' | 'HELD' | 'EXPIRED' | 'REVOKED';

/** An immutable statement of the bounded task, not permission to perform it. */
export interface TaskWall {
  id: string;
  purpose: string;
  allowed_scope: string[];
  excluded_scope: string[];
  consequence_budget: string;
  accountable_owner_id: string;
  declared_at: string;
  expires_at: string;
  state: TaskWallState;
  source_references: string[];
}

/** Defines vocabulary available to a task package; it has no routing behavior. */
export interface BoundaryGrammar {
  id: string;
  version: string;
  terms: BoundaryTerm[];
  declared_at: string;
  source_references: string[];
}

/** A declarative relation whose change may require later human review. */
export interface TaskDependencyLink {
  id: string;
  task_wall_id: string;
  relation: 'TOUCHES' | 'RELIES_ON';
  target_type: string;
  target_id: string;
  recorded_at: string;
  source_references: string[];
}

/** Records that a dependency changed; it does not reopen or re-authorize work. */
export interface ReinspectionRecord {
  id: string;
  task_wall_id: string;
  dependency_link_id: string;
  observed_change: string;
  observed_at: string;
  status: 'PENDING_HUMAN_REVIEW' | 'REVIEWED';
  source_references: string[];
}

/** Evidence-package shape for handing off work without disposing of it. */
export interface HandoffPackage {
  id: string;
  task_wall_id: string;
  current_state: BoundaryTerm;
  completed_scope: string[];
  evidence_references: string[];
  contradictions: string[];
  dependency_link_ids: string[];
  failed_approaches: string[];
  reopening_conditions: string[];
  next_admissible_moves: string[];
  prepared_at: string;
  prepared_by: string;
}

/**
 * Declares a revocation observation. It is not a mechanism and cannot make a
 * revocation persistent across a real process restart.
 */
export interface RevocationContinuityRecord {
  id: string;
  subject_type: string;
  subject_id: string;
  revoked_at: string;
  revocation_authority_id: string;
  recovery_behavior: 'MUST_NOT_RESTORE_EFFECTIVENESS';
  evidence_references: string[];
}
