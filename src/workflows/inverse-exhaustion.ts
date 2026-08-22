import type { InverseExhaustionInput, InverseExhaustionResult } from '../types/inverse-exhaustion-contracts';

/** Tests the logical inverse only within supplied witnesses; it cannot establish universal negation. */
export function runInverseExhaustion(input: InverseExhaustionInput): InverseExhaustionResult {
  const counterexamples: string[] = [];
  const unsupported: string[] = [];
  const unknowns = [...input.untested_surfaces];
  for (const witness of input.witnesses) {
    if (!witness.source_ids.length || !witness.evidence_ids.length) { unknowns.push(`Witness ${witness.id} lacks evidence custody.`); continue; }
    // Inverse: not condition -> not consequence. A witness with neither condition nor consequence supports it.
    // A witness with no condition but a present consequence refutes it.
    if (!witness.condition_present && witness.consequence_present) counterexamples.push(witness.id);
    if (witness.condition_present && !witness.consequence_present) unsupported.push(`Witness ${witness.id} shows the condition without the consequence; the forward claim is not established by this witness.`);
  }
  const tested = `¬(${input.condition}) → ¬(${input.consequence})`;
  let disposition: InverseExhaustionResult['disposition'] = 'NOT_TESTED';
  if (counterexamples.length) disposition = 'INVERSE_REFUTED_WITHIN_SCOPE';
  else if (input.witnesses.length && !unknowns.length) disposition = 'INVERSE_NOT_ESTABLISHED';
  const decisions = ['Do not infer the inverse from the forward claim without separate evidence.'];
  if (!input.owner_id) decisions.push('Name the consequence owner for the inverse claim.');
  if (!input.external_reviewer_id) decisions.push('Assign an independent reviewer for the inverse test.');
  const questions = [`What evidence would establish ${tested}?`, `Which witness would falsify the inverse? Rejection condition: ${input.rejection_condition}`, ...unknowns];
  return { test_id: input.test_id, disposition, forward_claim: input.forward_claim, tested_inverse: tested, witnesses_examined: input.witnesses.map((witness) => witness.id), counterexamples, unsupported_bridges: unsupported, remaining_unknowns: unknowns, required_human_decisions: decisions, specialist_handoff: { recipient_role: input.domain, questions, non_claims: ['A surviving finite witness set does not prove a universal inverse.', 'A counterexample within scope does not characterize every possible failure.', 'This workflow does not grant authority or close review.'], machine_authority: false, closure: false } };
}
