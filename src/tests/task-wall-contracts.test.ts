import {
  boundaryGrammarShape,
  handoffPackageShape,
  reinspectionShape,
  revocationContinuityShape,
  taskWallShape,
} from '../fixtures/task-wall-shapes';

describe('proposed Task Wall contract shapes', () => {
  test('keeps a declared boundary separate from authority or execution', () => {
    expect(taskWallShape.excluded_scope).toEqual(
      expect.arrayContaining(['issue permission', 'execute external action', 'deploy']),
    );
    expect(taskWallShape).not.toHaveProperty('permission');
    expect(taskWallShape).not.toHaveProperty('release_token');
    expect(taskWallShape).not.toHaveProperty('execution');
  });

  test('makes all Boundary Grammar terms explicit', () => {
    expect(boundaryGrammarShape.terms).toEqual(
      expect.arrayContaining(['UNKNOWN', 'NOVELTY', 'SUPPORTED', 'HOLD', 'OWNER', 'MAY']),
    );
  });

  test('preserves dependency-driven reinspection as a review record', () => {
    expect(reinspectionShape.status).toBe('PENDING_HUMAN_REVIEW');
    expect(reinspectionShape).not.toHaveProperty('reopen_authorization');
  });

  test('requires an evidence package rather than an autonomous disposition', () => {
    expect(handoffPackageShape.current_state).toBe('HOLD');
    expect(handoffPackageShape.contradictions.length).toBeGreaterThan(0);
    expect(handoffPackageShape).not.toHaveProperty('decision');
  });

  test('states non-restoration after revocation without implementing it', () => {
    expect(revocationContinuityShape.recovery_behavior).toBe('MUST_NOT_RESTORE_EFFECTIVENESS');
    expect(revocationContinuityShape).not.toHaveProperty('restore');
  });
});
