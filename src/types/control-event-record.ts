import type { Reversibility } from './core-contracts';

/** Normalized event vocabulary for evidence and control-surface traces. */
export type ControlEventType =
  | 'INTAKE'
  | 'EVIDENCE_PRESERVED'
  | 'AUTHORITY_REQUESTED'
  | 'OWNER_ASSIGNED'
  | 'STOP_TESTED'
  | 'REVOCATION_ISSUED'
  | 'BYPASS_DETECTED'
  | 'CONSEQUENCE_COMMITTED'
  | 'HUMAN_DISPOSITION'
  | 'REOPENED';

export interface ControlEventRecord {
  event_id: string;
  trace_id: string;
  event_type: ControlEventType;
  occurred_at: string;
  actor_id: string;
  subject_refs: string[];
  input_refs: string[];
  output_refs: string[];
  evidence_refs: string[];
  authority_refs: string[];
  owner_refs: string[];
  external_stop_refs: string[];
  consequence_class?: string;
  reversibility?: Reversibility;
  authorization_status: 'NOT_AUTHORITY' | 'EXTERNAL_DECISION_REQUIRED' | 'UNKNOWN';
  uncertainty: string[];
}
