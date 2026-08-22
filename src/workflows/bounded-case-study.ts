import type { BoundedCaseStudyInput, BoundedCaseStudyResult } from '../types/bounded-case-study-contracts';

/** Produces a bounded case study. It is editorial and diagnostic, never dispositive. */
export function buildBoundedCaseStudy(input: BoundedCaseStudyInput): BoundedCaseStudyResult {
  const questions = [...input.open_questions];
  const decisions: string[] = [];
  const unsupported: string[] = [];
  let state: BoundedCaseStudyResult['state'] = 'GREEN';

  if (!input.trigger.trim() || !input.title.trim() || !input.control_gap.trim() || !input.sigma_line.trim()) state = 'NOT_ADMISSIBLE';
  for (const fact of input.verified_facts) {
    if (!fact.source_ids.length || !fact.evidence_ids.length) { state = 'YELLOW'; questions.push(`Fact ${fact.fact_id} lacks complete source and evidence custody.`); }
  }
  if (!input.verified_facts.length) { state = 'NOT_ADMISSIBLE'; questions.push('No verified facts supplied.'); }
  if (!input.bounded_inferences.length) { state = state === 'GREEN' ? 'YELLOW' : state; questions.push('No bounded inference is stated; the case may be under-specified.'); }
  if (!input.consequence_path.length) { state = 'YELLOW'; questions.push('Consequence path is missing.'); }
  if (!input.consequence_owner_id) { state = 'RED'; questions.push('Consequence owner is missing.'); decisions.push('Name the human or institution that owns the consequence.'); }
  if (!input.external_stop_path_id) { state = 'RED'; questions.push('External stop path is missing.'); decisions.push('Identify who can still deny, stop, revoke, or narrow the consequence.'); }
  if (!input.specialist_role) { state = state === 'GREEN' ? 'YELLOW' : state; questions.push('Specialist route is missing.'); }
  if (!input.reversibility || input.reversibility === 'UNKNOWN') { state = state === 'GREEN' ? 'YELLOW' : state; questions.push('Reversibility is unknown.'); }
  if ((input.reversibility === 'IRREVERSIBLE' || input.reversibility === 'PARTIALLY_REVERSIBLE') && input.harm_window_ms === undefined) { state = 'RED'; questions.push('Irreversible or partially reversible consequence has no declared harm window.'); decisions.push('Establish the time available to stop the consequence before proceeding.'); }
  if (input.bounded_inferences.some((inference) => /authorized|approved|safe|complete|certified/i.test(inference))) { state = 'RED'; unsupported.push('Bounded inference contains authority, safety, completeness, or certification language.'); questions.push('Rewrite the inference so it does not promote evidence into authority or closure.'); }
  if (input.consequence_path.length > 1) unsupported.push(`${input.consequence_path[0]} → ${input.consequence_path[1]}`);

  return { case_id: input.case_id, state, trigger: input.trigger, verified_facts: input.verified_facts, bounded_inferences: input.bounded_inferences, open_questions: questions, control_gap: input.control_gap, consequence_path: input.consequence_path, first_unsupported_arrow: unsupported[0], required_human_decisions: decisions, specialist_handoff: { recipient_role: input.specialist_role ?? 'domain specialist', questions, non_claims: ['This case study does not establish universal truth.', 'This case study does not certify safety, compliance, completeness, or deployment.', 'This case study does not grant authority or close review.'], machine_authority: false, closure: false }, sigma_line: input.sigma_line };
}
