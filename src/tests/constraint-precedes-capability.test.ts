import { assessConstraintBeforeCapability } from '../workflows/constraint-precedes-capability';

const complete = { assessment_id: 'constraint-1', capability_name: 'bounded inspection', capability_claim: 'The system can inspect a declared surface.', constraints: ['read-only', 'declared surface only', 'human review before consequence'], forbidden_actions: ['write', 'delete', 'publish'], allowed_scope: ['read declared evidence'], evidence_ids: ['evidence-1'], constraint_owner_id: 'constraint-owner', consequence_owner_id: 'consequence-owner', external_stop_path_id: 'stop-1', revocation_path_id: 'revoke-1', harm_window_ms: 1000, independent_measurement_ids: ['measurement-1'], uncertainty: [] };

test('admits capability only after the constraint envelope is supplied', () => {
  const result = assessConstraintBeforeCapability(complete);
  expect(result.disposition).toBe('CAPABILITY_ADMITTED_FOR_BOUNDED_REVIEW');
  expect(result.constraints_before_capability).toBe(true);
  expect(result.machine_authority).toBe(false);
  expect(result.deployment_approved).toBe(false);
});

test('holds capability when constraints are missing', () => {
  const result = assessConstraintBeforeCapability({ ...complete, external_stop_path_id: undefined, constraints: [], forbidden_actions: [], consequence_owner_id: undefined });
  expect(result.disposition).toBe('CAPABILITY_HELD_FOR_CONSTRAINT_REPAIR');
  expect(result.missing_constraints).toEqual(expect.arrayContaining(['constraint envelope', 'forbidden action boundary', 'external stop path', 'consequence owner']));
});

test('preserves uncertainty before capability admission', () => {
  const result = assessConstraintBeforeCapability({ ...complete, uncertainty: ['surface coverage is incomplete'] });
  expect(result.disposition).toBe('CAPABILITY_ADMITTED_FOR_BOUNDED_REVIEW');
  expect(result.required_human_decisions).toContain('Preserve uncertainty before capability admission.');
  expect(result.uncertainty).toContain('surface coverage is incomplete');
});

test('rejects an undefined capability', () => {
  const result = assessConstraintBeforeCapability({ ...complete, capability_name: '', capability_claim: '' });
  expect(result.disposition).toBe('NOT_ADMISSIBLE');
});
