import type { ControlEventRecord } from './control-event-record';

export type EvaluationDisposition =
  | 'SUPPORTED_WITHIN_SCOPE'
  | 'CONTRADICTED'
  | 'INDETERMINATE'
  | 'TEST_INVALID'
  | 'NOT_TESTED';

export interface EvaluationRecord {
  record_id: string;
  schema_version: '0.1';
  evaluated_at: string;
  evaluator_id: string;
  scenario_id: string;
  claim: string;
  tested_boundary: string[];
  untested_surfaces: string[];
  evidence_refs: string[];
  event_ids: string[];
  first_unsupported_arrow: string;
  inverse_result: EvaluationDisposition;
  converse_result: EvaluationDisposition;
  disposition: EvaluationDisposition;
  consequence_owner_id?: string;
  external_stop_authority_id?: string;
  open_questions: string[];
  required_human_decisions: string[];
  human_review_required: true;
  machine_authority: false;
  machine_certification: false;
  machine_closure: false;
}

export interface EvaluationRecordInput extends Omit<EvaluationRecord, 'schema_version' | 'human_review_required' | 'machine_authority' | 'machine_certification' | 'machine_closure'> {
  events?: ControlEventRecord[];
}

/** Builds an evidence record; it does not evaluate or authorize the claim. */
export function createEvaluationRecord(input: EvaluationRecordInput): EvaluationRecord {
  const { events, ...record } = input;
  return {
    ...record,
    schema_version: '0.1',
    event_ids: input.event_ids.length ? input.event_ids : (events ?? []).map((event) => event.event_id),
    human_review_required: true,
    machine_authority: false,
    machine_certification: false,
    machine_closure: false,
  };
}
