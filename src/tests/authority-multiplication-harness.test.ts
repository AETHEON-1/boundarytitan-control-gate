import { runAuthorityMultiplicationHarness } from '../workflows/authority-multiplication-harness';
import type { AuthorityPrimitive } from '../types/authority-multiplication-contracts';

const permissionA: AuthorityPrimitive = {
  id: 'p-a', kind: 'PERMISSION', actor_id: 'actor-a', action: 'read', target: 'dataset-a',
  consequence_class: 'OBSERVATION', authority_source_id: 'rule-a',
};
const permissionB: AuthorityPrimitive = {
  id: 'p-b', kind: 'PERMISSION', actor_id: 'actor-b', action: 'send', target: 'external-b',
  consequence_class: 'EXTERNAL_TRANSFER', authority_source_id: 'rule-b',
};

test('does not promote locally valid permissions into composed authority', () => {
  const result = runAuthorityMultiplicationHarness({
    run_id: 'amh-1', primitives: [permissionA, permissionB], max_depth: 2,
    external_stop_authority_id: 'human-stop', consequence_owner_id: 'owner-1',
    independent_verifier_id: 'reviewer-1', live_connection: false, credentials_used: false,
  });
  const composed = result.traces.find(t => t.primitive_ids.length === 2);
  expect(composed?.first_unsupported_arrow).toBe('locally permitted actions -> composed consequence');
  expect(composed?.classification).toBe('INDETERMINATE');
  expect(result.machine_authority).toBe(false);
  expect(result.deployment_approved).toBe(false);
});

test('marks capability without an authority source as an unsupported arrow', () => {
  const capability: AuthorityPrimitive = {
    id: 'can-1', kind: 'CAPABILITY', actor_id: 'agent-1', action: 'write',
    target: 'system', consequence_class: 'STATE_CHANGE',
  };
  const result = runAuthorityMultiplicationHarness({
    run_id: 'amh-2', primitives: [capability], max_depth: 1,
    external_stop_authority_id: 'human-stop', consequence_owner_id: 'owner-1',
    independent_verifier_id: 'reviewer-1', live_connection: false, credentials_used: false,
  });
  expect(result.candidate_counterexamples[0].first_unsupported_arrow).toBe('capability -> permission');
});

test('rejects an invalid exploration bound', () => {
  const result = runAuthorityMultiplicationHarness({
    run_id: 'amh-invalid', primitives: [permissionA], max_depth: 0,
    live_connection: false, credentials_used: false,
  });
  expect(result.disposition).toBe('TEST_INVALID');
  expect(result.coverage.exhaustive_within_declared_bound).toBe(false);
});
