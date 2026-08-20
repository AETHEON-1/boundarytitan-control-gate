import {
  dependencyDeclarationShape,
  noveltyObservationShape,
  reinspectionCandidateShape,
} from '../fixtures/dependency-reinspection-shapes';

describe('dependency and reinspection candidate shapes', () => {
  test('records an explicit relationship rather than inferring system conformance', () => {
    expect(dependencyDeclarationShape.relation).toBe('RELIES_ON');
    expect(dependencyDeclarationShape.evidence_references.length).toBeGreaterThan(0);
  });

  test('creates a review candidate without automatic reopening or continuation', () => {
    expect(reinspectionCandidateShape.status).toBe('PENDING_HUMAN_REVIEW');
    expect(reinspectionCandidateShape).not.toHaveProperty('reopen');
    expect(reinspectionCandidateShape).not.toHaveProperty('continue');
  });

  test('keeps novelty distinct and requires a hold for review', () => {
    expect(noveltyObservationShape.classification).toBe('NOVELTY');
    expect(noveltyObservationShape.required_next_state).toBe('HOLD_FOR_REVIEW');
  });
});
