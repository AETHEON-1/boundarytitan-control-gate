import { runAuthorityMultiplicationHarness } from '../workflows/authority-multiplication-harness';
import type { AuthorityMultiplicationInput, AuthorityPrimitive, AuthorityState } from '../types/authority-multiplication-contracts';

const emptyState: AuthorityState = { state_id: 's0', grants: [], capabilities: [], evidence_refs: [], external_no_active: false };
const base = (primitives: AuthorityPrimitive[], max_depth = 2): AuthorityMultiplicationInput => ({
  run_id: 'test', initial_state: emptyState, primitives, max_depth,
  external_stop_authority_id: 'human-stop', consequence_owner_id: 'owner-1',
  independent_verifier_id: 'reviewer-1', live_connection: false, credentials_used: false,
});

test('explores order rather than collapsing A→B and B→A', () => {
  const a: AuthorityPrimitive = { id:'a', kind:'RETRY', actor_id:'x', action:'a', target:'t', consequence_class:'C' };
  const b: AuthorityPrimitive = { id:'b', kind:'RESTART', actor_id:'x', action:'b', target:'t', consequence_class:'C' };
  const result = runAuthorityMultiplicationHarness(base([a,b]));
  const orders = result.traces.filter(t => t.primitive_ids.length === 2).map(t => t.primitive_ids.join('>'));
  expect(orders).toContain('a>b');
  expect(orders).toContain('b>a');
});

test('does not call ordered coverage global exhaustion', () => {
  const p: AuthorityPrimitive = { id:'p', kind:'PERMISSION', actor_id:'a', action:'read', target:'d', consequence_class:'OBS', authority_source_id:'rule' };
  const result = runAuthorityMultiplicationHarness(base([p],1));
  expect(result.coverage.ordered_sequences_complete_within_depth).toBe(true);
  expect(result.coverage.concurrency_tested).toBe(false);
  expect(result.coverage.restart_restore_semantics_tested).toBe(false);
});

test('preserves CAN after MAY is revoked', () => {
  const initial: AuthorityState = {
    ...emptyState,
    grants:[{id:'g1',actor_id:'a',action:'write',target:'t',consequence_class:'STATE',source_id:'rule'}],
    capabilities:['a:write:t'],
  };
  const revoke: AuthorityPrimitive = { id:'r',kind:'REVOCATION',actor_id:'a',action:'write',target:'t',consequence_class:'STATE',grant_id:'g1' };
  const result = runAuthorityMultiplicationHarness({...base([revoke],1),initial_state:initial});
  expect(result.traces[0].transitions[0].authority_delta).toContain('-g1:revoked');
  expect(result.traces[0].transitions[0].capability_delta).toHaveLength(0);
});

test('tracks single-use consumption without implying technical impossibility of replay', () => {
  const initial: AuthorityState = {
    ...emptyState,
    grants:[{id:'once',actor_id:'a',action:'redeem',target:'token',consequence_class:'SESSION',source_id:'rule',remaining_uses:1}],
    capabilities:['a:redeem:token'],
  };
  const consume: AuthorityPrimitive = { id:'c',kind:'CONSUMPTION',actor_id:'a',action:'redeem',target:'token',consequence_class:'SESSION',grant_id:'once' };
  const result = runAuthorityMultiplicationHarness({...base([consume],1),initial_state:initial});
  expect(result.traces[0].transitions[0].authority_delta).toContain('~once:remaining=0');
  expect(result.traces[0].transitions[0].capability_delta).toHaveLength(0);
});

test('cross-consequence permissions produce a candidate, not an authorization verdict', () => {
  const a: AuthorityPrimitive = { id:'pa',kind:'PERMISSION',actor_id:'a',action:'read',target:'d',consequence_class:'OBS',authority_source_id:'ra' };
  const b: AuthorityPrimitive = { id:'pb',kind:'PERMISSION',actor_id:'a',action:'send',target:'x',consequence_class:'TRANSFER',authority_source_id:'rb' };
  const result = runAuthorityMultiplicationHarness(base([a,b]));
  const trace = result.traces.find(t => t.primitive_ids.join('>') === 'pa>pb');
  expect(trace?.first_unsupported_arrow).toBe('candidate composed consequence requires independent authority trace');
  expect(trace?.classification).toBe('INDETERMINATE');
});

test('rejects an invalid exploration bound', () => {
  const result = runAuthorityMultiplicationHarness(base([],0));
  expect(result.disposition).toBe('TEST_INVALID');
  expect(result.coverage.ordered_sequences_complete_within_depth).toBe(false);
});
