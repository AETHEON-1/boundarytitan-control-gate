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
  | 'RESTART'
  | 'RETRY'
  | 'DELEGATION'
  | 'IDENTITY_TRANSITION'
  | 'EVIDENCE_ACTION';

export interface AuthorityPrimitive {
  id: string;
  kind: PrimitiveKind;
  actor_id: string;
  action: string;
  target: string;
  consequence_class: string;
  authority_source_id?: string;
  valid_from?: string;
  valid_until?: string;
  single_use?: boolean;
}

export interface AuthorityMultiplicationInput {
  run_id: string;
  primitives: AuthorityPrimitive[];
  max_depth: number;
  external_stop_authority_id?: string;
  consequence_owner_id?: string;
  independent_verifier_id?: string;
  declared_consequence_limit?: string;
  live_connection: false;
  credentials_used: false;
}

export interface CompositionTrace {
  trace_id: string;
  primitive_ids: string[];
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
    exhaustive_within_declared_bound: boolean;
  };
  candidate_counterexamples: CompositionTrace[];
  disposition: MultiplicationEvidenceState;
  machine_authority: false;
  deployment_approved: false;
}
