/** Declaration-only action authority and evidence contracts. */
export type ActionDisposition = 'DENIED' | 'HELD' | 'REQUIRES_EXTERNAL_REVIEW' | 'EXECUTED_PENDING_READBACK' | 'READBACK_SUPPORTED' | 'READBACK_CONTRADICTED' | 'INDETERMINATE';
export type EvidenceState = 'SUPPORTED' | 'CONTRADICTED' | 'INDETERMINATE' | 'NOT_TESTED' | 'TEST_INVALID';

export interface ActionAuthorityEvidencePacket {
  packet_id: string;
  principal_id: string;
  delegation_chain: string[];
  human_intent_hash: string;
  normalized_action_hash: string;
  target_reference: string;
  consequence_class: string;
  policy_reference: string;
  policy_version: string;
  policy_observed_at: string;
  policy_expires_at: string;
  evidence_references: string[];
  approval_reference?: string;
  approval_subject_id?: string;
  approval_action_hash?: string;
  approval_expires_at?: string;
  execution_reference?: string;
  readback_reference?: string;
  consequence_owner_id: string;
  external_stop_reference: string;
  disposition: ActionDisposition;
  evidence_state: EvidenceState;
  uncertainty: string[];
  open_questions: string[];
  machine_authority_granted: false;
  machine_certification_issued: false;
}
