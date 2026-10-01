import type {
  AuthorityMultiplicationInput,
  AuthorityMultiplicationResult,
  AuthorityPrimitive,
  CompositionTrace,
} from '../types/authority-multiplication-contracts';

function combinations<T>(items: T[], depth: number): T[][] {
  const out: T[][] = [];
  const walk = (prefix: T[], remaining: T[], target: number) => {
    if (prefix.length === target) { out.push(prefix); return; }
    remaining.forEach((item, index) => walk([...prefix, item], remaining.slice(index + 1), target));
  };
  for (let d = 1; d <= Math.min(depth, items.length); d += 1) walk([], items, d);
  return out;
}

function inspectTrace(runId: string, sequence: AuthorityPrimitive[], index: number): CompositionTrace {
  const authoritySources = [...new Set(sequence.map(p => p.authority_source_id).filter((x): x is string => Boolean(x)))];
  const resultingActions = sequence.map(p => `${p.actor_id}:${p.action}:${p.target}`);
  const permissionless = sequence.filter(p => p.kind === 'CAPABILITY' && !p.authority_source_id);
  const composedPermissions = sequence.filter(p => p.kind === 'PERMISSION').length > 1;
  const consequenceClasses = new Set(sequence.map(p => p.consequence_class));
  let firstUnsupportedArrow: string | undefined;
  const notes: string[] = [];

  if (permissionless.length) {
    firstUnsupportedArrow = 'capability -> permission';
    notes.push('At least one capability primitive has no declared authority source.');
  } else if (composedPermissions && consequenceClasses.size > 1) {
    firstUnsupportedArrow = 'locally permitted actions -> composed consequence';
    notes.push('Multiple permissions compose across consequence classes; aggregate authority requires independent justification.');
  }

  return {
    trace_id: `${runId}-trace-${index + 1}`,
    primitive_ids: sequence.map(p => p.id),
    initial_authority_sources: authoritySources,
    resulting_actions: resultingActions,
    first_unsupported_arrow: firstUnsupportedArrow,
    classification: firstUnsupportedArrow ? 'INDETERMINATE' : 'NOT_TESTED',
    notes,
  };
}

/**
 * Bounded combinatorial evidence generator.
 *
 * It does not execute actions, infer legitimate authority, certify safety,
 * or convert a locally valid permission into authority for a composition.
 */
export function runAuthorityMultiplicationHarness(
  input: AuthorityMultiplicationInput,
): AuthorityMultiplicationResult {
  if (!Number.isInteger(input.max_depth) || input.max_depth < 1) {
    return {
      run_id: input.run_id,
      traces: [],
      coverage: { primitive_count: input.primitives.length, generated_trace_count: 0, max_depth: input.max_depth, exhaustive_within_declared_bound: false },
      candidate_counterexamples: [],
      disposition: 'TEST_INVALID',
      machine_authority: false,
      deployment_approved: false,
    };
  }

  const sequences = combinations(input.primitives, input.max_depth);
  const traces = sequences.map((sequence, index) => inspectTrace(input.run_id, sequence, index));
  const candidates = traces.filter(trace => Boolean(trace.first_unsupported_arrow));
  const boundaryMissing = !input.external_stop_authority_id || !input.consequence_owner_id || !input.independent_verifier_id;

  return {
    run_id: input.run_id,
    traces,
    coverage: {
      primitive_count: input.primitives.length,
      generated_trace_count: traces.length,
      max_depth: input.max_depth,
      exhaustive_within_declared_bound: true,
    },
    candidate_counterexamples: candidates,
    disposition: boundaryMissing ? 'INDETERMINATE' : candidates.length ? 'INDETERMINATE' : 'NOT_TESTED',
    machine_authority: false,
    deployment_approved: false,
  };
}
