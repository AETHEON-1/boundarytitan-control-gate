import { buildBoundedCaseStudy } from '../workflows/bounded-case-study';

const base = { case_id: 'bcs-1', title: 'A machine recommendation crosses a human boundary', trigger: 'A system produces a recommendation used in a consequential workflow.', verified_facts: [{ fact_id: 'fact-1', statement: 'The system produced the recommendation.', source_ids: ['source-1'], evidence_ids: ['evidence-1'] }], bounded_inferences: ['The recommendation may influence a downstream decision.'], open_questions: ['Was the downstream state independently verified?'], control_gap: 'The transition from recommendation to consequence is not separately recorded.', consequence_path: ['CAN_RECOMMEND', 'MAY_CREATE_CONSEQUENCE'], consequence_owner_id: 'owner-1', external_stop_path_id: 'stop-1', reversibility: 'REVERSIBLE' as const, specialist_role: 'domain specialist', sigma_line: 'Output is not authority.' };

test('builds a bounded case study with preserved uncertainty and non-authority', () => {
  const result = buildBoundedCaseStudy(base);
  expect(result.state).toBe('GREEN');
  expect(result.verified_facts[0].statement).toContain('produced');
  expect(result.open_questions).toContain('Was the downstream state independently verified?');
  expect(result.specialist_handoff.machine_authority).toBe(false);
  expect(result.specialist_handoff.closure).toBe(false);
  expect(result.sigma_line).toBe('Output is not authority.');
});

test('turns missing owner and stop path red', () => {
  const result = buildBoundedCaseStudy({ ...base, consequence_owner_id: undefined, external_stop_path_id: undefined });
  expect(result.state).toBe('RED');
  expect(result.required_human_decisions).toEqual(expect.arrayContaining(['Name the human or institution that owns the consequence.', 'Identify who can still deny, stop, revoke, or narrow the consequence.']));
});

test('rejects unsupported safety or authority language hidden inside inference', () => {
  const result = buildBoundedCaseStudy({ ...base, bounded_inferences: ['The system is safe and approved for deployment.'] });
  expect(result.state).toBe('RED');
  expect(result.first_unsupported_arrow).toContain('Bounded inference contains authority');
});

test('refuses a case with no verified facts', () => {
  const result = buildBoundedCaseStudy({ ...base, verified_facts: [] });
  expect(result.state).toBe('NOT_ADMISSIBLE');
  expect(result.open_questions).toContain('No verified facts supplied.');
});
