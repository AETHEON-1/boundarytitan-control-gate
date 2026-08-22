import type { ActionAuthorityEvidencePacket } from '../types/action-authority-evidence-packet';
import type { DelegationRevocationRecord } from '../types/delegation-revocation-record';
import type { MediationCoverageRecord } from '../types/mediation-coverage-record';

describe('authority boundary invariants', () => {
  it('keeps machine authority and certification permanently false in the packet shape', () => {
    const packet: ActionAuthorityEvidencePacket = {
      packet_id: 'packet-01', principal_id: 'agent-01', delegation_chain: ['human-01', 'agent-01'], human_intent_hash: 'intent-hash', normalized_action_hash: 'action-hash', target_reference: 'target-01', consequence_class: 'WRITE', policy_reference: 'policy-01', policy_version: 'v1', policy_observed_at: '2026-08-21T00:00:00Z', policy_expires_at: '2026-08-21T00:05:00Z', evidence_references: [], consequence_owner_id: 'owner-01', external_stop_reference: 'stop-01', disposition: 'HELD', evidence_state: 'NOT_TESTED', uncertainty: ['readback absent'], open_questions: ['who can still deny?'], machine_authority_granted: false, machine_certification_issued: false,
    };
    expect(packet.machine_authority_granted).toBe(false);
    expect(packet.machine_certification_issued).toBe(false);
  });

  it('identifies revocation and unknown bypass as hold conditions', () => {
    const delegation: DelegationRevocationRecord = { delegation_id: 'd-01', issuer_id: 'human-01', recipient_id: 'agent-01', scope: ['read'], attenuation_rule: 'MONOTONICALLY_NARROWING', authority_basis: 'site policy', issued_at: '2026-08-21T00:00:00Z', expires_at: '2026-08-21T00:05:00Z', revoked: true, revoked_at: '2026-08-21T00:01:00Z', descendants: [], consequence_owner_id: 'owner-01', evidence_references: [] };
    const bypass: MediationCoverageRecord = { surface_id: 'shell-01', surface_kind: 'SHELL', consequence_class: 'WRITE', coverage: 'UNKNOWN', owner_id: 'owner-01', evidence_references: [], uncertainty: ['not inspected'] };
    expect(delegation.revoked).toBe(true);
    expect(bypass.coverage).toBe('UNKNOWN');
  });
});
