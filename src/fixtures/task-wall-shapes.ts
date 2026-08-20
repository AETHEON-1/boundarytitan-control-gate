import type {
  BoundaryGrammar,
  HandoffPackage,
  ReinspectionRecord,
  RevocationContinuityRecord,
  TaskDependencyLink,
  TaskWall,
} from '../types/task-wall-contracts';

/** Declaration-only examples used to make the future-contract shape inspectable. */
export const taskWallShape: TaskWall = {
  id: 'task-wall-example-001',
  purpose: 'Prepare a bounded review package.',
  allowed_scope: ['collect cited evidence', 'prepare draft handoff package'],
  excluded_scope: ['issue permission', 'execute external action', 'deploy'],
  consequence_budget: 'No external consequence; draft artifacts only.',
  accountable_owner_id: 'human-owner-example',
  declared_at: '2026-08-20T00:00:00Z',
  expires_at: '2026-08-27T00:00:00Z',
  state: 'DECLARED',
  source_references: ['BOUNDARY-ATLAS-CONTEXT-NOTES.md'],
};

export const boundaryGrammarShape: BoundaryGrammar = {
  id: 'boundary-grammar-example-001',
  version: 'candidate-0.1',
  terms: ['UNKNOWN', 'NOVELTY', 'SUPPORTED', 'HOLD', 'OWNER', 'MAY'],
  declared_at: '2026-08-20T00:00:00Z',
  source_references: ['BOUNDARY-ATLAS-CONTEXT-NOTES.md'],
};

export const dependencyShape: TaskDependencyLink = {
  id: 'dependency-example-001',
  task_wall_id: taskWallShape.id,
  relation: 'RELIES_ON',
  target_type: 'evidence-context',
  target_id: 'context-example-001',
  recorded_at: '2026-08-20T00:00:00Z',
  source_references: ['BOUNDARY-ATLAS-CONTEXT-NOTES.md'],
};

export const reinspectionShape: ReinspectionRecord = {
  id: 'reinspection-example-001',
  task_wall_id: taskWallShape.id,
  dependency_link_id: dependencyShape.id,
  observed_change: 'Evidence context changed after package preparation.',
  observed_at: '2026-08-20T00:00:00Z',
  status: 'PENDING_HUMAN_REVIEW',
  source_references: ['BOUNDARY-ATLAS-CONTEXT-NOTES.md'],
};

export const handoffPackageShape: HandoffPackage = {
  id: 'handoff-example-001',
  task_wall_id: taskWallShape.id,
  current_state: 'HOLD',
  completed_scope: ['collected cited evidence'],
  evidence_references: ['evidence-example-001'],
  contradictions: ['Publication status remains an owner decision.'],
  dependency_link_ids: [dependencyShape.id],
  failed_approaches: ['Treated public availability as publication authorization.'],
  reopening_conditions: ['Human owner supplies a scoped reopening decision.'],
  next_admissible_moves: ['Present the package for human review.'],
  prepared_at: '2026-08-20T00:00:00Z',
  prepared_by: 'machine-preparation-example',
};

export const revocationContinuityShape: RevocationContinuityRecord = {
  id: 'revocation-example-001',
  subject_type: 'permission-grant',
  subject_id: 'permission-example-001',
  revoked_at: '2026-08-20T00:00:00Z',
  revocation_authority_id: 'human-revocation-authority-example',
  recovery_behavior: 'MUST_NOT_RESTORE_EFFECTIVENESS',
  evidence_references: ['evidence-example-002'],
};
