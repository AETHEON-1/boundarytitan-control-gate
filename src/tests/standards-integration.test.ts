import Ajv from 'ajv/dist/2020';
import { createEvaluationRecord } from '../types/evaluation-record';
import type { ControlEventRecord } from '../types/control-event-record';
import evaluationSchema from '../../evaluation-record.schema.json';
import eventSchema from '../../control-event-record.schema.json';

const ajv = new Ajv({ strict: true });
const validateEvaluation = ajv.compile(evaluationSchema);
const validateEvent = ajv.compile(eventSchema);

const event: ControlEventRecord = {
  event_id: 'event-1', trace_id: 'trace-1', event_type: 'AUTHORITY_REQUESTED', occurred_at: '2026-09-08T12:00:00Z', actor_id: 'bounded-kernel',
  subject_refs: ['scenario-1'], input_refs: ['receipt-1'], output_refs: ['evaluation-1'], evidence_refs: ['evidence-1'], authority_refs: ['policy-1'],
  owner_refs: ['owner-1'], external_stop_refs: ['stop-1'], authorization_status: 'EXTERNAL_DECISION_REQUIRED', uncertainty: ['live enforcement not tested'],
};

test('creates a schema-valid evaluation record from a normalized event', () => {
  const record = createEvaluationRecord({
    record_id: 'evaluation-1', evaluated_at: '2026-09-08T12:00:00Z', evaluator_id: 'boundarytitan-kernel', scenario_id: 'scenario-1',
    claim: 'The supplied boundary is sufficient for external review.', tested_boundary: ['receipt completeness'], untested_surfaces: ['live credentials'],
    evidence_refs: ['evidence-1'], event_ids: [], events: [event], first_unsupported_arrow: 'declared control -> reachable control',
    inverse_result: 'NOT_TESTED', converse_result: 'CONTRADICTED', disposition: 'INDETERMINATE', open_questions: ['Can the stop path make NO stick?'],
    required_human_decisions: ['Name the external decision owner.'],
  });
  expect(validateEvent(event)).toBe(true);
  expect(validateEvaluation(record)).toBe(true);
  expect(record.event_ids).toEqual(['event-1']);
  expect(record.machine_authority).toBe(false);
});

test('rejects noncanonical timestamps and authority-like flags', () => {
  const record = createEvaluationRecord({
    record_id: 'evaluation-2', evaluated_at: '2026-09-08', evaluator_id: 'kernel', scenario_id: 'scenario-2', claim: 'claim',
    tested_boundary: [], untested_surfaces: [], evidence_refs: [], event_ids: [], first_unsupported_arrow: 'A -> B', inverse_result: 'NOT_TESTED',
    converse_result: 'NOT_TESTED', disposition: 'NOT_TESTED', open_questions: [], required_human_decisions: [],
  });
  expect(validateEvaluation(record)).toBe(false);
});
