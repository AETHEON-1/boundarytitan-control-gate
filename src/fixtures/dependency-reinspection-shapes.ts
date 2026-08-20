import type {
  DependencyDeclaration,
  ReinspectionCandidate,
  UncertaintyObservation,
} from '../types/dependency-reinspection-contracts';

export const dependencyDeclarationShape: DependencyDeclaration = {
  id: 'dependency-declaration-example-001',
  task_wall_id: 'task-wall-example-001',
  workcell_id: 'workcell-example-001',
  relation: 'RELIES_ON',
  target_type: 'evidence-context',
  target_id: 'context-example-001',
  recorded_at: '2026-08-20T00:00:00Z',
  evidence_references: ['evidence-example-001'],
};

export const reinspectionCandidateShape: ReinspectionCandidate = {
  id: 'reinspection-candidate-example-001',
  task_wall_id: dependencyDeclarationShape.task_wall_id,
  dependency_declaration_id: dependencyDeclarationShape.id,
  observed_change: 'The relied-on evidence context changed after preparation.',
  observed_at: '2026-08-20T00:00:00Z',
  status: 'PENDING_HUMAN_REVIEW',
  evidence_references: ['evidence-example-002'],
};

export const noveltyObservationShape: UncertaintyObservation = {
  id: 'uncertainty-observation-example-001',
  task_wall_id: dependencyDeclarationShape.task_wall_id,
  classification: 'NOVELTY',
  observation: 'Observed condition is outside the declared workcell context.',
  observed_at: '2026-08-20T00:00:00Z',
  evidence_references: ['evidence-example-003'],
  required_next_state: 'HOLD_FOR_REVIEW',
};
