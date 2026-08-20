/**
 * Phase 1 core contracts.
 *
 * Declaration-only types derived from RC1. These types contain no runtime
 * validation, transition, authorization, release, or execution behavior.
 */

export type RoutingColor = 'GREEN_ELIGIBLE' | 'YELLOW' | 'RED' | 'BLACK';
export type Reversibility =
  | 'REVERSIBLE'
  | 'PARTIALLY_REVERSIBLE'
  | 'IRREVERSIBLE'
  | 'UNKNOWN';

export interface Signal {
  id: string;
  source: string;
  received_at: string;
  payload_reference: string;
  sensitivity?: string;
  integrity_status?: string;
}

export interface Lane {
  id: string;
  name: string;
  description?: string;
  allowed_preparation?: string[];
  forbidden_actions?: string[];
  owner_requirements?: string;
  stop_path_requirements?: string;
}

export interface ActionProposal {
  id: string;
  signal_id?: string;
  lane_id: string;
  action_type: string;
  scope: string;
  destination?: string;
  affected_surface: string;
  expected_consequence: string;
  reversibility: Reversibility;
}

export interface EvidenceItem {
  id: string;
  source_uri: string;
  source_class: string;
  title: string;
  collected_at: string;
  freshness?: string;
  content_hash?: string;
  custodian?: string;
  claim_ids?: string[];
}

/** Mirrors the frozen owner-role.schema.json shape. */
export interface OwnerAssignment {
  id: string;
  role_type:
    | 'ACCOUNTABLE_OWNER'
    | 'DECISION_OWNER'
    | 'REVIEWER'
    | 'OPERATOR'
    | 'RELEASE_AUTHORITY'
    | 'REVOCATION_AUTHORITY'
    | 'EMERGENCY_STOP_AUTHORITY'
    | 'AUDITOR'
    | 'EVIDENCE_CUSTODIAN'
    | 'SYSTEM_CUSTODIAN'
    | 'AFFECTED_PARTY';
  subject_id: string;
  authority_basis: string;
  scope: string;
  effective_from: string;
  expires_at?: string | null;
  revocation_path?: string;
}

export interface ValidationResult {
  id: string;
  proposal_id: string;
  rule_version: string;
  routing_color: RoutingColor;
  findings: string[];
  missing_fields?: string[];
  evaluated_at: string;
}

/** Mirrors the frozen consequence-receipt.schema.json shape. */
export interface ConsequenceReceipt {
  receipt_id: string;
  schema_version: string;
  created_at: string;
  created_by?: string;
  lane: string;
  proposed_action: string;
  action_scope?: string;
  named_accountable_owner: string;
  decision_owner?: string;
  evidence: string[];
  affected_surface: string;
  expected_consequence: string;
  reversibility: Reversibility;
  rollback_plan?: string;
  external_stop_path: string;
  stop_path_owner?: string;
  stop_path_test_status?: 'UNTESTED' | 'PASS' | 'FAIL' | 'UNKNOWN';
  approval_state: 'PENDING' | 'APPROVED' | 'DENIED' | 'EXPIRED' | 'REVOKED' | 'SUPERSEDED';
  permission_state?: 'NOT_GRANTED' | 'GRANTED' | 'SUSPENDED' | 'EXPIRED' | 'REVOKED' | 'CONSUMED';
  release_state?: 'NOT_RELEASED' | 'RELEASED' | 'BLOCKED' | 'EXPIRED' | 'REVOKED' | 'CONSUMED';
  execution_state?: 'NOT_STARTED' | 'STARTED' | 'PAUSED' | 'STOPPED' | 'SUCCEEDED' | 'FAILED' | 'ROLLED_BACK' | 'IRREVERSIBLE';
  expiry?: string | null;
  revocation_authority?: string;
  who_can_still_say_no: string;
  source_provenance?: string[];
  validation_findings?: string[];
  routing_color: RoutingColor;
  unresolved_questions?: string[];
  audit_event_ids?: string[];
}
