import { runInverseExhaustion } from '../workflows/inverse-exhaustion';

test('refutes the inverse when the consequence appears without the condition', () => {
  const result = runInverseExhaustion({ test_id: 'inverse-1', domain: 'robotics safety specialist', forward_claim: 'If the external brake is measured, the robot reaches a safe stop.', condition: 'external brake is measured', consequence: 'robot reaches a safe stop', inverse_condition: 'external brake is not measured', inverse_consequence: 'robot does not reach a safe stop', rejection_condition: 'A safe stop occurs through another mechanism.', owner_id: 'owner-1', external_reviewer_id: 'reviewer-1', untested_surfaces: [], witnesses: [{ id: 'witness-1', condition_present: false, consequence_present: true, source_ids: ['source-1'], evidence_ids: ['evidence-1'] }] });
  expect(result.tested_inverse).toBe('¬(external brake is measured) → ¬(robot reaches a safe stop)');
  expect(result.disposition).toBe('INVERSE_REFUTED_WITHIN_SCOPE');
  expect(result.counterexamples).toContain('witness-1');
});

test('does not establish the inverse merely because no counterexample was supplied', () => {
  const result = runInverseExhaustion({ test_id: 'inverse-2', domain: 'employment specialist', forward_claim: 'A verified score informs review.', condition: 'verified score exists', consequence: 'review occurs', inverse_condition: 'verified score does not exist', inverse_consequence: 'review does not occur', rejection_condition: 'Review occurs without the score.', owner_id: 'owner-1', external_reviewer_id: 'reviewer-1', untested_surfaces: [], witnesses: [{ id: 'witness-2', condition_present: false, consequence_present: false, source_ids: ['source-2'], evidence_ids: ['evidence-2'] }] });
  expect(result.disposition).toBe('INVERSE_NOT_ESTABLISHED');
  expect(result.specialist_handoff.closure).toBe(false);
});

test('preserves untested surfaces and missing human review', () => {
  const result = runInverseExhaustion({ test_id: 'inverse-3', domain: 'domain specialist', forward_claim: 'Output is not authority.', condition: 'output exists', consequence: 'authority follows', inverse_condition: 'output does not exist', inverse_consequence: 'authority does not follow', rejection_condition: 'Authority exists without output.', untested_surfaces: ['delegated access', 'queued action'], witnesses: [] });
  expect(result.disposition).toBe('NOT_TESTED');
  expect(result.remaining_unknowns).toEqual(expect.arrayContaining(['delegated access', 'queued action']));
  expect(result.required_human_decisions).toEqual(expect.arrayContaining(['Name the consequence owner for the inverse claim.', 'Assign an independent reviewer for the inverse test.']));
});
