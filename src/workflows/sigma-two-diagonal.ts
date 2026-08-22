import type { SigmaTwoDiagonalInput, SigmaTwoDiagonalResult } from '../types/sigma-two-diagonal-contracts';

/** Recursive Sigma-2 check: the inspected system cannot sign its own authority transition. */
export function runSigmaTwoDiagonal(input: SigmaTwoDiagonalInput): SigmaTwoDiagonalResult {
  const arrows: string[] = [];
  const repairs: string[] = [];
  const separations: string[] = ['Capability is separate from authority.', 'Evidence is separate from authority.', 'Output is not authority.'];
  if (!input.evidence_owner_id) { arrows.push('evidence → established claim'); repairs.push('Name an evidence owner.'); }
  if (!input.consequence_owner_id) { arrows.push('authority → consequence'); repairs.push('Name the consequence owner.'); }
  if (!input.decision_owner_id) { arrows.push('recommendation → decision'); repairs.push('Name the decision owner.'); }
  if (!input.external_stop_authority_id) { arrows.push('system continuation → permitted continuation'); repairs.push('Identify an external stop authority.'); }
  if (!input.denial_path_id) { arrows.push('capability → permission'); repairs.push('Provide an operational denial path.'); }
  if (!input.revocation_path_id) { arrows.push('permission → continued validity'); repairs.push('Provide a revocation path that dominates continuation.'); }
  if (input.reversible === undefined) { repairs.push('Establish reversibility.'); }
  if (input.reversible === false && input.harm_window_ms === undefined) { arrows.push('irreversible action → controllable consequence'); repairs.push('Declare the harm window before irreversible action.'); }
  if (!input.independent_verifier_id) { repairs.push('Name an independent verifier.'); }
  if (!input.ledger_event_id) { repairs.push('Record the transition in an inspectable ledger.'); }
  if (input.can_self_certify) { arrows.push('system output → system certification'); repairs.push('Disable self-certification.'); }
  if (input.can_self_close) { arrows.push('system output → system closure'); repairs.push('Disable self-closure and preserve reopening.'); }
  if (input.uncertainty.length) repairs.push('Preserve unresolved uncertainty in the human decision packet.');
  let disposition: SigmaTwoDiagonalResult['disposition'] = 'GREEN_FOR_BOUNDED_REVIEW';
  if (!input.capability_claim || !input.evidence_claim || !input.authority_claim || !input.consequence_claim) disposition = 'NOT_ADMISSIBLE';
  else if (arrows.some((arrow) => arrow.includes('system output') || arrow.includes('irreversible'))) disposition = 'RED_HOLD';
  else if (repairs.length) disposition = 'YELLOW_REQUIRES_REPAIR';
  return { diagonal_id: input.diagonal_id, disposition, unsupported_arrows: arrows, verified_separations: separations, required_repairs: repairs, who_can_still_say_no: input.external_stop_authority_id, consequence_owner_id: input.consequence_owner_id, uncertainty: input.uncertainty, specialist_handoff: { recipient_role: 'independent domain specialist', questions: [...arrows.map((arrow) => `What evidence and authority justify ${arrow}?`), ...repairs], non_claims: ['This diagonal check does not certify the inspected system.', 'This diagonal check does not grant authority.', 'This diagonal check does not close the inspected system or its review.'], machine_authority: false, machine_certification: false, machine_closure: false } };
}
