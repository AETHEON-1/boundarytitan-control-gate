export type MultiplicationEvidenceState =
  | 'SUPPORTED'
  | 'CONTRADICTED'
  | 'INDETERMINATE'
  | 'TEST_INVALID'
  | 'NOT_TESTED';

export type PrimitiveKind =
  | 'CAPABILITY'
  | 'PERMISSION'
  | 'AUTHORITY_RULE'
  | 'REVOCATION'
  | 'CONSUMPTION'
  | 'RESTART'
  | 'RESTORE'
  | 'RETRY'
  | 'DELEGATION'
  | 'IDENTITY_TRANSITION'
  | 'EVIDENCE_ACTION'
  | 'EXTERNAL_NO';

export interface AuthorityGrant {
  id: string;
  actor_id: string;
  action: string;
  target: string;
  consequence_class: string;
  source_id: string;
  valid_from?: string;
  valid_until?: string;
  remaining_uses?: number;
  revoked?: boolean;
}

export interface AuthorityState {
  state_id: string;
  grants: AuthorityGrant[];
  capabilities: string[];
  evidence_refs: string[];
  external_no_active: boolean;
}

export interface AuthorityPrimitive {
  id: string;
  kind: PrimitiveKind;
  actor_id: string;
  action: string;
  target: string;
  consequence_class: string;
  authority_source_id?: string;
  grant_id?: string;
  valid_from?: string;
  valid_until?: string;
  single_use?: boolean;
}

export interface AuthorityMultiplicationInput {
  run_id: string;
  initial_state: AuthorityState;
  primitives: AuthorityPrimitive[];
  max_depth: number;
  external_stop_authority_id?: string;
  consequence_owner_id?: string;
  independent_verifier_id?: string;
  declared_consequence_limit?: string;
  live_connection: false;
  credentials_used: false;
}

export interface TransitionRecord {
  step: number;
  primitive_id: string;
  before_state_id: string;
  after_state_id: string;
  authority_delta: string[];
  capability_delta: string[];
  consequence_class: string;
  external_no_active: boolean;
}

export interface CompositionTrace {
  trace_id: string;
  primitive_ids: string[];
  transitions: TransitionRecord[];
  initial_authority_sources: string[];
  resulting_actions: string[];
  first_unsupported_arrow?: string;
  classification: MultiplicationEvidenceState;
  notes: string[];
}

export interface AuthorityMultiplicationResult {
  run_id: string;
  traces: CompositionTrace[];
  coverage: {
    primitive_count: number;
    generated_trace_count: number;
    max_depth: number;
    ordered_sequences_complete_within_depth: boolean;
    concurrency_tested: boolean;
    restart_restore_semantics_tested: boolean;
    evidence_plane_tested: boolean;
  };
  candidate_counterexamples: CompositionTrace[];
  disposition: MultiplicationEvidenceState;
  machine_authority: false;
  deployment_approved: false;
}
