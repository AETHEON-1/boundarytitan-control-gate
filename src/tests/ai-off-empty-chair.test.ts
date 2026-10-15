import { assessCanMayTransition } from '../can-may/universal-kernel';
import type { CanMayKernelInput } from '../types/can-may-kernel-contracts';

/**
 * EMPTY CHAIR / AI-OFF software-only characterization.
 * This is not a live authorization, execution, or revocation test.
 */
const fixture = (): CanMayKernelInput => ({
  domain: 'PERSONAL_PRODUCTIVITY',
  system_id: 'empty-chair-simulated-proposer',
  evidence_status: 'SUPPORTED',
  communication_available: true,
  ledger_event_id: 'simulated-ledger-001',
  transition: {
    transition_id: 'simulated-proposal-001',
    capability: 'CAN_PREPARE',
    requested_authority: 'MAY_PREPARE',
    evidence_ids: ['simulated-evidence-001'],
    authority_basis_id: 'simulated-grant-001',
    consequence_owner_id: 'human-consequence-owner',
    decision_owner_id: 'human-decision-owner',
    denial_authority_id: 'human-denial-owner',
    revocation_authority_id: 'human-revocation-owner',
    external_stop_path_id: 'simulated-external-stop',
    affected_party_ids: ['simulated-affected-party'],
    reversible: true,
    independent_measurement_ids: ['simulated-measurement'],
    uncertainty: [],
    rejection_condition: 'Reject on external denial or revoked grant',
  },
});

describe('AI-OFF Empty Chair characterization, no execution authority', () => {
  test('A/B: proposer identity does not alter a deterministic assessment', () => {
    const ai = fixture();
    const human = fixture();
    ai.system_id = 'ai-proposer';
    human.system_id = 'human-proposer';
    expect(assessCanMayTransition(ai)).toEqual(assessCanMayTransition(human));
    expect(assessCanMayTransition(ai).authorization_status).toBe('NOT_AUTHORITY');
  });

  test('C1: removing the declared authority basis causes human review', () => {
    const revoked = fixture();
    delete revoked.transition.authority_basis_id;
    const result = assessCanMayTransition(revoked);
    expect(result.disposition).toBe('HUMAN_REVIEW_REQUIRED');
    expect(result.reasons).toContain('Authority basis is missing.');
    expect(result.authorization_status).toBe('NOT_AUTHORITY');
  });

  test('C2: retained stale grant identifier is NOT checked for revocation', () => {
    // The kernel has no authoritative grant-state, epoch, or execution interface.
    // A revoked grant ID left in the input is indistinguishable from an active ID.
    const before = fixture();
    const afterExternalRevocation = fixture();
    expect(assessCanMayTransition(afterExternalRevocation))
      .toEqual(assessCanMayTransition(before));
    expect(assessCanMayTransition(afterExternalRevocation).disposition)
      .toBe('ELIGIBLE_FOR_EXTERNAL_DECISION');
    // This is a limitation demonstration, NOT evidence of permitted execution.
    expect(assessCanMayTransition(afterExternalRevocation).authorization_status)
      .toBe('NOT_AUTHORITY');
  });
});
