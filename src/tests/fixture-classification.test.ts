import { prohibitedAuthorityCollapseVectors } from '../fixtures/invalid-shapes';

describe('Phase 1 static doctrine-vector classification', () => {
  test('records all required prohibited-collapse vectors', () => {
    expect(prohibitedAuthorityCollapseVectors.map((vector) => vector.name)).toEqual([
      'validated-to-approved', 'green-to-permission', 'approved-to-executed',
      'receipt-to-released', 'machine-to-human-decision', 'restart-to-prior-released-state',
    ]);
  });

  test('records a doctrine reference and rationale for each vector', () => {
    for (const vector of prohibitedAuthorityCollapseVectors) {
      expect(vector.doctrine_reference.length).toBeGreaterThan(0);
      expect(vector.prohibited_because.length).toBeGreaterThan(0);
    }
  });
});
