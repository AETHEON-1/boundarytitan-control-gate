import { runHostileDeconstruction } from '../workflows/hostile-deconstruction';

const base = {
  inquiry_id: 'hd-001',
  claim: 'The bounded output is suitable for human review.',
  seed: 'The output was generated from the supplied record.',
  evidence_ids: ['evidence-1'],
  assumptions: [],
  consequence_path: ['review', 'human disposition'],
  consequence_owner_id: 'owner-1',
  external_stop_authority_id: 'stop-1',
  inspected_boundary: ['supplied record', 'bounded output'],
  uninspected_surfaces: [],
  independent_evaluator_id: 'evaluator-1',
  human_disposition_owner_id: 'human-1',
};

test('returns a bounded result without machine authority', () => {
  const result = runHostileDeconstruction(base);
  expect(result.disposition).toBe('DERIVED');
  expect(result.machine_authority).toBe(false);
  expect(result.machine_certification).toBe(false);
  expect(result.machine_closure).toBe(false);
  expect(result.human_disposition_required).toBe(true);
});

test('stops at the first missing consequence owner', () => {
  const result = runHostileDeconstruction({ ...base, consequence_owner_id: undefined });
  expect(result.disposition).toBe('REQUIRES_PREMISE');
  expect(result.first_unsupported_arrow).toBe('claim -> consequence ownership');
});

test('preserves uncertainty across an uninspected surface', () => {
  const result = runHostileDeconstruction({ ...base, uninspected_surfaces: ['legacy direct path'] });
  expect(result.disposition).toBe('COMPATIBLE_BUT_NOT_DERIVED');
  expect(result.first_unsupported_arrow).toContain('tested boundary -> complete coverage');
});

test('does not treat missing evidence as a contradiction', () => {
  const result = runHostileDeconstruction({ ...base, evidence_ids: [] });
  expect(result.disposition).toBe('UNDERDETERMINED');
  expect(result.attacks[0].disposition).toBe('UNDERDETERMINED');
});
