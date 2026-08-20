import { specialistHandoffPacketShape } from '../fixtures/specialist-handoff-shapes';

describe('specialist handoff candidate shape', () => {
  test('asks for attackable questions, non-claims, and unresolved questions', () => {
    expect(specialistHandoffPacketShape.questions[0].rejection_condition).toBeTruthy();
    expect(specialistHandoffPacketShape.non_claims.length).toBeGreaterThan(0);
    expect(specialistHandoffPacketShape.unresolved_questions.length).toBeGreaterThan(0);
  });
  test('stops at human-owner review', () => {
    expect(specialistHandoffPacketShape.state).toBe('PREPARED_FOR_HUMAN_OWNER_REVIEW');
    expect(specialistHandoffPacketShape).not.toHaveProperty('send');
    expect(specialistHandoffPacketShape).not.toHaveProperty('certification');
  });
});
