import { runInquisitionEngine } from '../workflows/inquisition-engine';

const complete = { inquiry_id: 'inquisition-1', claim: 'The bounded assessment is suitable for specialist review.', claimed_capability: 'prepare assessment', evidence_ids: ['evidence-1'], source_ids: ['source-1'], assumptions: [], consequence_path: ['assessment', 'human review'], consequence_owner_id: 'owner-1', decision_owner_id: 'decision-1', external_stop_path_id: 'stop-1', revocation_path_id: 'revoke-1', reversible: true, independent_verifier_id: 'verifier-1', claimed_authority: undefined, self_certification_possible: false, uninspected_surfaces: [] };

test('survives an initial attack only when the control surface is supplied', () => {
  const result = runInquisitionEngine(complete);
  expect(result.disposition).toBe('SURVIVES_INITIAL_ATTACK');
  expect(result.attacks).toHaveLength(0);
  expect(result.machine_verdict).toBe(false);
});

test('attacks missing owners, stop paths, revocation, evidence, and coverage', () => {
  const result = runInquisitionEngine({ ...complete, evidence_ids: [], consequence_owner_id: undefined, external_stop_path_id: undefined, revocation_path_id: undefined, uninspected_surfaces: ['queued actions'] });
  expect(result.disposition).toBe('REQUIRES_REPAIR');
  expect(result.attacks.map((item) => item.category)).toEqual(expect.arrayContaining(['EVIDENCE', 'OWNER', 'AUTHORITY', 'COVERAGE']));
});

test('holds for counterevidence when self-certification is possible', () => {
  const result = runInquisitionEngine({ ...complete, self_certification_possible: true });
  expect(result.disposition).toBe('HOLD_FOR_COUNTEREVIDENCE');
  expect(result.attacks.some((item) => item.category === 'SELF_CERTIFICATION')).toBe(true);
  expect(result.closure).toBe(false);
});

test('holds an irreversible claim without a harm window', () => {
  const result = runInquisitionEngine({ ...complete, reversible: false, harm_window_ms: undefined });
  expect(result.attacks.some((item) => item.category === 'TEMPORAL')).toBe(true);
});
