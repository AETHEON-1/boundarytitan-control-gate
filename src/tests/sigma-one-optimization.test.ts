import { optimizeSigmaOne } from '../workflows/sigma-one-optimization';

test('orders preparation work without transferring authority', () => {
  const result = optimizeSigmaOne({ optimization_id: 'opt-1', objective: 'UNCERTAINTY_REDUCTION', items: [
    { id: 'low', label: 'low', evidence_count: 4, unresolved_count: 0, consequence_weight: 1, owner_present: true, external_stop_present: true, estimated_cost: 2 },
    { id: 'high', label: 'high', evidence_count: 0, unresolved_count: 3, consequence_weight: 5, owner_present: true, external_stop_present: true, estimated_cost: 1 },
  ]});
  expect(result.ordered_item_ids).toEqual(['high', 'low']);
  expect(result.authority_transferred).toBe(false);
  expect(result.permission_granted).toBe(false);
});

test('holds work with missing owner or external stop path', () => {
  const result = optimizeSigmaOne({ optimization_id: 'opt-2', objective: 'REVIEW_READINESS', items: [
    { id: 'held', label: 'held', evidence_count: 2, unresolved_count: 1, consequence_weight: 2, owner_present: false, external_stop_present: true, estimated_cost: 1 },
  ]});
  expect(result.held_item_ids).toEqual(['held']);
  expect(result.human_disposition_required).toBe(true);
});
