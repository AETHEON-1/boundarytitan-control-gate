/** Declaration-only Zombie Permission Hunter prototype contracts. */
export type ZombieFindingStatus =
  | 'VALID' | 'EXPIRING' | 'EXPIRED' | 'ORPHANED' | 'OUT_OF_LANE'
  | 'OVERBROAD' | 'STALE_EVIDENCE' | 'REVOCATION_FAILED'
  | 'UNRESOLVED' | 'BLOCKED' | 'ESCALATED'
  | 'HUMAN_REVIEW_REQUIRED' | 'NOT_INSPECTED';

export type EvidenceState =
  | 'SUPPORTED' | 'CONTRADICTED' | 'INDETERMINATE'
  | 'TEST_INVALID' | 'NOT_TESTED' | 'REQUIRES_PREMISE';

export interface PermissionRecord {
  id: string;
  principal_id: string;
  lane_id?: string;
  granted_scope: string[];
  observed_scope: string[];
  purpose?: string;
  owner_id?: string;
  evidence_ids: string[];
  granted_at?: string;
  expires_at?: string;
  last_reviewed_at?: string;
  revocation_authority_id?: string;
  affected_surface: string;
  consequence_class: 'OBSERVATION' | 'REVERSIBLE' | 'CONDITIONALLY_REVERSIBLE' | 'IRREVERSIBLE' | 'UNKNOWN';
}

export interface HunterContext {
  id: string;
  lane_id: string;
  inspected_sources: string[];
  uninspected_surfaces: string[];
  as_of: string;
  external_stop_path_id: string;
  stop_path_owner_id: string;
  human_owner_id: string;
}

export interface ZombiePermissionFinding {
  id: string;
  permission_id: string;
  status: ZombieFindingStatus;
  evidence_state: EvidenceState;
  reasons: string[];
  evidence_ids: string[];
  competing_interpretations: string[];
  consequence: string;
  reversibility: PermissionRecord['consequence_class'];
  owner_id?: string;
  denial_authority_id?: string;
  revocation_authority_id?: string;
  recommended_disposition: 'CONTINUE' | 'HOLD' | 'BLOCK' | 'ESCALATE' | 'HUMAN_REVIEW';
  action_taken: 'NONE' | 'PREAUTHORIZED_BLOCK';
  uncertainty: string[];
  coverage_statement: string;
  who_can_still_say_no: string[];
}

export interface HumanTranslationKey {
  what_happened: string;
  what_changed: string;
  evidenced: string[];
  inferred: string[];
  unknown: string[];
  consequences: string[];
  choices_remaining: string[];
  owner: string;
  denial_path: string;
  revocation_path: string;
  appeal_path: string;
  timing: string;
  translation_loss: string[];
}

export interface ZombieHunterOutput {
  finding: ZombiePermissionFinding;
  human_translation_key: HumanTranslationKey;
  consequence_receipt_reference: string;
  ledger_event_type: 'PERMISSION_REVIEW_FINDING';
  machine_authority_boundary: 'NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE';
}
