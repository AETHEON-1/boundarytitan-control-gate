import type { ConverseExhaustionInput, ConverseExhaustionResult } from '../types/converse-exhaustion-contracts';

/** Tests a converse only within supplied witnesses; it cannot establish a universal converse. */
export function runConverseExhaustion(input: ConverseExhaustionInput): ConverseExhaustionResult {
  const counterexamples: string[] = [];
  const unsupported: string[] = [];
  const unknowns = [...input.untested_surfaces];
  for (const witness of input.witnesses) {
    if (!witness.source_ids.length || !witness.evidence_ids.length) { unknowns.push(`Witness ${witness.id} lacks evidence custody.`); continue; }
    if (witness.condition_present && !witness.consequence_present) counterexamples.push(witness.id);
    if (!witness.condition_present && witness.consequence_present) unsupported.push(`Witness ${witness.id} shows consequence without the stated condition.`);
  }
  const tested = `${input.converse_condition} → ${input.converse_consequence}`;
  let disposition: ConverseExhaustionResult['disposition'] = 'NOT_TESTED';
  if (input.witnesses.length && !unknowns.length) disposition = counterexamples.length ? 'CONVERSE_REFUTED_WITHIN_SCOPE' : 'CONVERSE_NOT_ESTABLISHED';
  else if (counterexamples.length) disposition = 'CONVERSE_REFUTED_WITHIN_SCOPE';
  const decisions: string[] = [];
  decisions.push('Do not reverse the forward claim without separate evidence.');
  if (!input.owner_id) decisions.push('Name the consequence owner for the converse claim.');
  if (!input.external_reviewer_id) decisions.push('Assign an independent reviewer for the converse test.');
  const questions = [
    `What evidence would establish the converse: ${tested}?`,
    `Which witness would falsify the converse? Rejection condition: ${input.rejection_condition}`,
    ...unknowns,
  ];
  return { test_id: input.test_id, disposition, forward_claim: input.forward_claim, tested_converse: tested, witnesses_examined: input.witnesses.map((witness) => witness.id), counterexamples, unsupported_bridges: unsupported, remaining_unknowns: unknowns, required_human_decisions: decisions, specialist_handoff: { recipient_role: input.domain, questions, non_claims: ['A surviving finite witness set does not prove a universal converse.', 'A counterexample within scope does not characterize every possible failure.', 'This workflow does not grant authority or close the claim.'], machine_authority: false, closure: false } };
}
