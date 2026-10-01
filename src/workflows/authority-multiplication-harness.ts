import type {
  AuthorityGrant,
  AuthorityMultiplicationInput,
  AuthorityMultiplicationResult,
  AuthorityPrimitive,
  AuthorityState,
  CompositionTrace,
  TransitionRecord,
} from '../types/authority-multiplication-contracts';

function permutations<T>(items: T[], maxDepth: number): T[][] {
  const out: T[][] = [];
  const walk = (prefix: T[], remaining: T[]) => {
    if (prefix.length > 0) out.push(prefix);
    if (prefix.length >= maxDepth) return;
    remaining.forEach((item, index) =>
      walk([...prefix, item], [...remaining.slice(0, index), ...remaining.slice(index + 1)]),
    );
  };
  walk([], items);
  return out;
}

function cloneState(state: AuthorityState, id: string): AuthorityState {
  return { ...state, state_id: id, grants: state.grants.map(g => ({ ...g })), capabilities: [...state.capabilities], evidence_refs: [...state.evidence_refs] };
}

function applicableGrant(state: AuthorityState, p: AuthorityPrimitive): AuthorityGrant | undefined {
  return state.grants.find(g =>
    !g.revoked &&
    g.actor_id === p.actor_id &&
    g.action === p.action &&
    g.target === p.target &&
    g.consequence_class === p.consequence_class &&
    (g.remaining_uses === undefined || g.remaining_uses > 0),
  );
}

function transition(state: AuthorityState, p: AuthorityPrimitive, step: number): { state: AuthorityState; record: TransitionRecord; unsupported?: string } {
  const next = cloneState(state, `${state.state_id}:${p.id}`);
  const authorityDelta: string[] = [];
  const capabilityDelta: string[] = [];
  let unsupported: string | undefined;

  if (p.kind === 'CAPABILITY') {
    const cap = `${p.actor_id}:${p.action}:${p.target}`;
    if (!next.capabilities.includes(cap)) { next.capabilities.push(cap); capabilityDelta.push(`+${cap}`); }
    if (!applicableGrant(state, p) && !p.authority_source_id) unsupported = 'capability -> permission';
  }

  if (p.kind === 'PERMISSION' || p.kind === 'AUTHORITY_RULE') {
    if (!p.authority_source_id) {
      unsupported = 'authority grant without declared source';
    } else {
      const id = p.grant_id ?? `grant:${p.id}`;
      next.grants.push({
        id, actor_id: p.actor_id, action: p.action, target: p.target,
        consequence_class: p.consequence_class, source_id: p.authority_source_id,
        valid_from: p.valid_from, valid_until: p.valid_until,
        remaining_uses: p.single_use ? 1 : undefined,
      });
      authorityDelta.push(`+${id}`);
    }
  }

  if (p.kind === 'REVOCATION' && p.grant_id) {
    const grant = next.grants.find(g => g.id === p.grant_id);
    if (grant) { grant.revoked = true; authorityDelta.push(`-${grant.id}:revoked`); }
  }

  if (p.kind === 'CONSUMPTION' && p.grant_id) {
    const grant = next.grants.find(g => g.id === p.grant_id);
    if (grant?.remaining_uses !== undefined) {
      grant.remaining_uses = Math.max(0, grant.remaining_uses - 1);
      authorityDelta.push(`~${grant.id}:remaining=${grant.remaining_uses}`);
    }
  }

  if (p.kind === 'EXTERNAL_NO') next.external_no_active = true;
  if (p.kind === 'EVIDENCE_ACTION') next.evidence_refs.push(p.id);

  return {
    state: next,
    unsupported,
    record: {
      step, primitive_id: p.id, before_state_id: state.state_id, after_state_id: next.state_id,
      authority_delta: authorityDelta, capability_delta: capabilityDelta,
      consequence_class: p.consequence_class, external_no_active: next.external_no_active,
    },
  };
}

function inspectTrace(input: AuthorityMultiplicationInput, sequence: AuthorityPrimitive[], index: number): CompositionTrace {
  let state = cloneState(input.initial_state, input.initial_state.state_id);
  const transitions: TransitionRecord[] = [];
  let firstUnsupportedArrow: string | undefined;
  const notes: string[] = [];

  sequence.forEach((p, i) => {
    const result = transition(state, p, i + 1);
    state = result.state;
    transitions.push(result.record);
    if (!firstUnsupportedArrow && result.unsupported) firstUnsupportedArrow = result.unsupported;
  });

  const permissions = sequence.filter(p => p.kind === 'PERMISSION');
  if (!firstUnsupportedArrow && permissions.length > 1 && new Set(permissions.map(p => p.consequence_class)).size > 1) {
    firstUnsupportedArrow = 'candidate composed consequence requires independent authority trace';
    notes.push('Cross-consequence composition is a candidate only; it is not itself proof of unauthorized authority.');
  }

  return {
    trace_id: `${input.run_id}-trace-${index + 1}`,
    primitive_ids: sequence.map(p => p.id),
    transitions,
    initial_authority_sources: [...new Set(input.initial_state.grants.map(g => g.source_id))],
    resulting_actions: sequence.map(p => `${p.actor_id}:${p.action}:${p.target}`),
    first_unsupported_arrow: firstUnsupportedArrow,
    classification: firstUnsupportedArrow ? 'INDETERMINATE' : 'NOT_TESTED',
    notes,
  };
}

/**
 * v0.4 synchronization slice: bounded ordered state-transition exploration.
 * No live actions, credentials, authority adjudication, certification, or deployment.
 */
export function runAuthorityMultiplicationHarness(input: AuthorityMultiplicationInput): AuthorityMultiplicationResult {
  if (!Number.isInteger(input.max_depth) || input.max_depth < 1) {
    return {
      run_id: input.run_id, traces: [],
      coverage: { primitive_count: input.primitives.length, generated_trace_count: 0, max_depth: input.max_depth, ordered_sequences_complete_within_depth: false, concurrency_tested: false, restart_restore_semantics_tested: false, evidence_plane_tested: false },
      candidate_counterexamples: [], disposition: 'TEST_INVALID', machine_authority: false, deployment_approved: false,
    };
  }

  const sequences = permutations(input.primitives, Math.min(input.max_depth, input.primitives.length));
  const traces = sequences.map((sequence, index) => inspectTrace(input, sequence, index));
  const candidates = traces.filter(t => Boolean(t.first_unsupported_arrow));
  const boundaryMissing = !input.external_stop_authority_id || !input.consequence_owner_id || !input.independent_verifier_id;

  return {
    run_id: input.run_id,
    traces,
    coverage: {
      primitive_count: input.primitives.length,
      generated_trace_count: traces.length,
      max_depth: input.max_depth,
      ordered_sequences_complete_within_depth: true,
      concurrency_tested: false,
      restart_restore_semantics_tested: false,
      evidence_plane_tested: false,
    },
    candidate_counterexamples: candidates,
    disposition: boundaryMissing ? 'INDETERMINATE' : candidates.length ? 'INDETERMINATE' : 'NOT_TESTED',
    machine_authority: false,
    deployment_approved: false,
  };
}
