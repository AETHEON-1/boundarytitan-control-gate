import { runFiftyOneFiftyWorkflow } from '../workflows/fifty-one-fifty';

test('classifies the supplied record and exposes the first unsupported authority arrow', () => {
  const result = runFiftyOneFiftyWorkflow({ workflow_id: '51-50-1', specialist_role: 'controls specialist', uninspected_surfaces: ['queued actions'], claims: [
    { claim_id: 'record-1', text: 'The system emitted a stop recommendation.', class: 'DOCUMENTED_RECORD', source_ids: ['log-1'], evidence_ids: ['evidence-1'], capability_stage: 'CAN_RECOMMEND', uncertainty: [] },
    { claim_id: 'inference-1', text: 'The recommendation may reduce harm.', class: 'BOUNDED_INFERENCE', source_ids: ['analysis-1'], evidence_ids: ['evidence-2'], capability_stage: 'CAN_RECOMMEND', consequence_surface: 'physical safety', uncertainty: ['Outcome not independently measured.'] },
    { claim_id: 'question-1', text: 'May the system trigger the stop?', class: 'OPEN_QUESTION', source_ids: ['request-1'], evidence_ids: ['evidence-3'], capability_stage: 'CAN_TRIGGER', authority_stage: 'MAY_TRIGGER', external_stop_path_id: 'stop-1', uncertainty: [] },
  ] });
  expect(result.state).toBe('HUMAN_REVIEW_REQUIRED');
  expect(result.first_unsupported_arrow).toBe('MAY_TRIGGER');
  expect(result.omissions.some((omission) => omission.category === 'OWNER')).toBe(true);
  expect(result.omissions.some((omission) => omission.category === 'UNINSPECTED_SURFACE')).toBe(true);
  expect(result.specialist_handoff.machine_authority).toBe(false);
  expect(result.specialist_handoff.closure).toBe(false);
});

test('preserves the three 51-50 classes and blocks unsupported completeness', () => {
  const result = runFiftyOneFiftyWorkflow({ workflow_id: '51-50-2', uninspected_surfaces: [], claims: [
    { claim_id: 'r', text: 'record', class: 'DOCUMENTED_RECORD', source_ids: ['s'], evidence_ids: ['e'], uncertainty: [] },
    { claim_id: 'i', text: 'inference', class: 'BOUNDED_INFERENCE', source_ids: ['s'], evidence_ids: ['e'], uncertainty: [] },
    { claim_id: 'q', text: 'question', class: 'OPEN_QUESTION', source_ids: ['s'], evidence_ids: ['e'], uncertainty: [] },
  ] });
  expect(result.record.map((claim) => claim.class)).toEqual(['DOCUMENTED_RECORD', 'BOUNDED_INFERENCE', 'OPEN_QUESTION']);
  expect(result.specialist_handoff.non_claims).toContain('This workflow does not certify completeness, safety, or deployment readiness.');
});
