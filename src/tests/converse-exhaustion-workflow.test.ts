import { runConverseExhaustion } from '../workflows/converse-exhaustion';

test('finds a bounded counterexample to a reversed authority claim', () => {
  const result = runConverseExhaustion({ test_id: 'converse-1', domain: 'robotics safety specialist', forward_claim: 'A measured external brake can stop the robot.', forward_condition: 'external brake is measured and independent', forward_consequence: 'robot reaches safe stop', converse_condition: 'robot reaches safe stop', converse_consequence: 'external brake was measured and independent', rejection_condition: 'A safe stop occurs through another mechanism.', owner_id: 'owner-1', external_reviewer_id: 'reviewer-1', untested_surfaces: [], witnesses: [{ id: 'witness-1', condition_present: false, consequence_present: true, source_ids: ['source-1'], evidence_ids: ['evidence-1'] }] });
  expect(result.disposition).toBe('CONVERSE_NOT_ESTABLISHED');
  expect(result.unsupported_bridges).toContain('Witness witness-1 shows consequence without the stated condition.');
  expect(result.specialist_handoff.machine_authority).toBe(false);
});

test('refutes the converse within scope when a condition exists without the consequence', () => {
  const result = runConverseExhaustion({ test_id: 'converse-2', domain: 'employment specialist', forward_claim: 'A verified score may inform review.', forward_condition: 'verified score exists', forward_consequence: 'review occurs', converse_condition: 'verified score exists', converse_consequence: 'review occurs', rejection_condition: 'A verified score exists but no review occurs.', untested_surfaces: [], witnesses: [{ id: 'witness-2', condition_present: true, consequence_present: false, source_ids: ['source-2'], evidence_ids: ['evidence-2'] }] });
  expect(result.disposition).toBe('CONVERSE_REFUTED_WITHIN_SCOPE');
  expect(result.counterexamples).toContain('witness-2');
});

test('preserves unknown surfaces and refuses universal closure', () => {
  const result = runConverseExhaustion({ test_id: 'converse-3', domain: 'domain specialist', forward_claim: 'Output is not authority.', forward_condition: 'output exists', forward_consequence: 'authority does not follow', converse_condition: 'authority exists', converse_consequence: 'output exists', rejection_condition: 'Authority exists without the output.', untested_surfaces: ['delegated access', 'queued action'], witnesses: [] });
  expect(result.disposition).toBe('NOT_TESTED');
  expect(result.remaining_unknowns).toEqual(expect.arrayContaining(['delegated access', 'queued action']));
  expect(result.specialist_handoff.closure).toBe(false);
});
