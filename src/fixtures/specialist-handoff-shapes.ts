import type { SpecialistHandoffPacket } from '../types/specialist-handoff-contracts';

export const specialistHandoffPacketShape: SpecialistHandoffPacket = {
  id: 'specialist-handoff-example-001',
  bounded_claim: 'The contracts preserve stated distinctions without granting authority.',
  artifact_references: ['SPECIALIST-HANDOFF-v0.1.md', 'STATE-RECONCILIATION-v1.1.md'],
  questions: [{ id: 'question-001', question: 'Does any object collapse evidence into authority?', target_object: 'all contracts', rejection_condition: 'A machine-produced state can issue or validate consequential authority.' }],
  non_claims: ['No safety certification.', 'No deployment readiness.', 'No external review completion.'],
  unresolved_questions: ['Which specialist role is appropriate?'],
  human_owner_id: 'human-owner-example',
  state: 'PREPARED_FOR_HUMAN_OWNER_REVIEW',
};
