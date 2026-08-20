/**
 * Later-phase cross-schema references.
 * Declaration only: these contracts do not implement their associated logic.
 */

export interface HumanDecision { id: string; proposal_id: string; decision_type: 'approve' | 'deny' | 'hold' | 'narrow' | 'revoke'; decision_owner: string; rationale?: string; evidence_ids?: string[]; scope?: string; effective_at?: string; expires_at?: string; }
export interface PermissionGrant { id: string; approval_id: string; action_scope: string; destination_scope?: string; conditions?: string[]; issued_at: string; expires_at?: string; revocation_status?: 'NOT_REVOKED' | 'REVOKED' | 'SUSPENDED'; }
export interface ReleaseToken { id: string; permission_id: string; action_hash?: string; issued_at: string; expires_at?: string; consumed_at?: string; revoked_at?: string; }
export interface ExecutionRecord { id: string; release_token_id: string; started_at: string; ended_at?: string; outcome?: string; consequence_observed?: string; rollback_status?: string; }
export interface AuditEvent { id: string; event_type: string; actor: string; authority_basis?: string; object_type: string; object_id: string; prior_state?: string | null; new_state?: string | null; timestamp: string; evidence_hash?: string | null; notes?: string | null; }
export interface StopPath { id: string; controller: string; mechanism: string; target: string; activation_method?: string; test_status?: 'UNTESTED' | 'PASS' | 'FAIL' | 'UNKNOWN'; last_tested_at?: string; latency_budget?: string; }
export interface Incident { id: string; severity?: string; detected_at: string; affected_objects?: string[]; containment?: string; owner?: string; remedy?: string; closure?: string; }
