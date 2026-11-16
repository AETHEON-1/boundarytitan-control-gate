import { inspectToolInventory } from '../workflows/tool-inventory-normalization';
import { TOOLBOX_PRIMITIVES } from '../types/tool-inventory-normalization-contracts';
import type { ToolInventoryCandidate } from '../types/tool-inventory-normalization-contracts';

const candidate = (id: string, lane = 'control'): ToolInventoryCandidate => ({
  candidate_id: id, original_name: 'Synthetic candidate', source_ref: 'fixture-only',
  purpose: 'Compare supplied declarations', lane_id: lane, kind: 'TOOL',
  declared_primitives: ['SOURCE', 'COMPARE'],
});

test('retains the existing 18-primitive vocabulary', () => {
  expect(TOOLBOX_PRIMITIVES).toHaveLength(18);
  expect(new Set(TOOLBOX_PRIMITIVES).size).toBe(18);
});

test('flags reordered or repeated shared primitives without merging cross-lane identities', () => {
  const a = Object.freeze(candidate('a', 'control'));
  const b = Object.freeze({ ...candidate('b', 'permission'), declared_primitives: Object.freeze(['COMPARE', 'SOURCE', 'COMPARE']) });
  const input = Object.freeze([a, b]);
  const result = inspectToolInventory(input);
  expect(result.original_records).toEqual(input);
  expect(result.findings).toEqual([expect.objectContaining({ code: 'SHARED_PRIMITIVE_SET', record_indices: [0, 1] })]);
  expect(result.identities_merged).toBe(false);
  expect(result.permissions_combined).toBe(false);
  expect(result.semantic_equivalence_established).toBe(false);
});

test('reports duplicate identifiers even when the second declaration is malformed', () => {
  const result = inspectToolInventory([candidate('a'), { candidate_id: ' a ' }]);
  expect(result.findings).toEqual(expect.arrayContaining([
    expect.objectContaining({ code: 'DUPLICATE_ID', record_indices: [0, 1] }),
    expect.objectContaining({ code: 'INVALID_RECORD', record_indices: [1] }),
  ]));
  expect(result.original_records).toHaveLength(2);
});

test('does not group unmapped records or partially recognized primitive sets', () => {
  const result = inspectToolInventory([
    { ...candidate('a'), declared_primitives: [] },
    { ...candidate('b'), declared_primitives: [] },
    { ...candidate('c'), declared_primitives: ['SOURCE', 'UNDECLARED'] },
    candidate('d'),
  ]);
  expect(result.compared_records).toBe(1);
  expect(result.findings.map(f => f.code)).toEqual(['UNMAPPED', 'UNMAPPED', 'UNKNOWN_PRIMITIVE']);
});

test('preserves unknown classification, invalid provenance and malformed entries', () => {
  const input = [{ ...candidate('a'), kind: 'UNKNOWN' }, { ...candidate('b'), source_ref: ' ' }, null];
  const result = inspectToolInventory(input);
  expect(result.original_records).toEqual(input);
  expect(result.findings.map(f => f.code)).toEqual(['UNKNOWN_KIND', 'INVALID_RECORD', 'INVALID_RECORD']);
});

test('does not establish completeness for empty, malformed or clean input', () => {
  for (const input of [[], null, [candidate('a')]]) {
    const result = inspectToolInventory(input);
    expect(result.inventory_completeness_established).toBe(false);
    expect(result.machine_authority).toBe(false);
    expect(result.machine_certification).toBe(false);
    expect(result.machine_closure).toBe(false);
    expect(result.human_review_required).toBe(true);
  }
  expect(inspectToolInventory([]).findings[0].code).toBe('INVALID_INVENTORY');
  expect(inspectToolInventory(null).findings[0].code).toBe('INVALID_INVENTORY');
});

test('keeps sparse array positions and rejects missing primitive entries', () => {
  const sparse = new Array(2);
  sparse[1] = { ...candidate('b'), declared_primitives: new Array(1) };
  const result = inspectToolInventory(sparse);
  expect(result.original_records).toHaveLength(2);
  expect(result.findings.map(f => f.code)).toEqual(['INVALID_RECORD', 'UNKNOWN_PRIMITIVE']);
});

test('ignores input attempts to assign output authority', () => {
  const result = inspectToolInventory([{ ...candidate('a'), machine_authority: true, permissions_combined: true }]);
  expect(result.machine_authority).toBe(false);
  expect(result.permissions_combined).toBe(false);
});
