import { consequenceReceiptV2Shape } from '../fixtures/consequence-receipt-v2-shapes';

describe('Consequence Receipt v2 candidate shape', () => {
  test('makes scope, consequence, owners, evidence, and stop path visible', () => {
    expect(consequenceReceiptV2Shape.scope).toBeTruthy();
    expect(consequenceReceiptV2Shape.expected_consequence).toBeTruthy();
    expect(consequenceReceiptV2Shape.evidence.length).toBeGreaterThan(0);
    expect(consequenceReceiptV2Shape.external_stop_path_id).toBeTruthy();
    expect(consequenceReceiptV2Shape.stop_path_owner_id).toBeTruthy();
    expect(consequenceReceiptV2Shape.revocation_authority_id).toBeTruthy();
    expect(consequenceReceiptV2Shape.evidence[0].evidence_custodian_id).toBeTruthy();
    expect(consequenceReceiptV2Shape.who_can_still_say_no.length).toBeGreaterThan(0);
  });

  test('holds the packet for human review rather than representing permission', () => {
    expect(consequenceReceiptV2Shape.review_state).toBe('HELD_FOR_HUMAN_REVIEW');
    expect(consequenceReceiptV2Shape).not.toHaveProperty('permission');
    expect(consequenceReceiptV2Shape).not.toHaveProperty('release_token');
    expect(consequenceReceiptV2Shape).not.toHaveProperty('execution');
  });

  test('preserves unresolved questions and expiry', () => {
    expect(consequenceReceiptV2Shape.unresolved_questions.length).toBeGreaterThan(0);
    expect(consequenceReceiptV2Shape.expiry).toBeTruthy();
  });
});
