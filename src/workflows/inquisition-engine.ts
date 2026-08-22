import type { InquisitionAttack, InquisitionEngineInput, InquisitionEngineResult } from '../types/inquisition-engine-contracts';

const attack = (category: InquisitionAttack['category'], question: string, rejection_condition: string, severity: InquisitionAttack['severity']): InquisitionAttack => ({ attack_id: `${category.toLowerCase()}:${question.slice(0, 24).replace(/\s+/g, '-')}`, category, question, rejection_condition, severity });

/** Adversarial claim interrogation. It produces questions, not verdicts. */
export function runInquisitionEngine(input: InquisitionEngineInput): InquisitionEngineResult {
  const attacks: InquisitionAttack[] = [];
  if (!input.claim.trim()) attacks.push(attack('CLAIM', 'What exactly is being claimed?', 'Reject an empty or undefined claim.', 'HIGH'));
  if (!input.evidence_ids.length || !input.source_ids.length) attacks.push(attack('EVIDENCE', 'What inspectable source and evidence establish the claim?', 'Do not treat unsupported output as established.', 'HIGH'));
  for (const assumption of input.assumptions) attacks.push(attack('ASSUMPTION', `What would falsify this assumption: ${assumption}?`, 'Do not promote an assumption into fact.', 'MEDIUM'));
  if (input.claimed_authority && !input.decision_owner_id) attacks.push(attack('AUTHORITY', 'Who authorized the claimed authority transition?', 'Capability or output cannot supply authority.', 'HIGH'));
  if (!input.consequence_owner_id) attacks.push(attack('OWNER', 'Who takes the consequence if this claim is wrong?', 'No owner, no progression.', 'HIGH'));
  if (input.consequence_path.length === 0) attacks.push(attack('CONSEQUENCE', 'What can happen if this claim is acted upon?', 'Do not review authority without a consequence path.', 'HIGH'));
  if (!input.external_stop_path_id) attacks.push(attack('AUTHORITY', 'Who can still say no before consequence?', 'Hold without an operational external stop.', 'HIGH'));
  if (!input.revocation_path_id) attacks.push(attack('AUTHORITY', 'Who can revoke the permission or release?', 'Hold without a revocation path.', 'HIGH'));
  if (input.reversible === undefined) attacks.push(attack('REVERSIBILITY', 'Can the consequence be reversed?', 'Unknown reversibility cannot be treated as safe.', 'HIGH'));
  if (input.reversible === false && input.harm_window_ms === undefined) attacks.push(attack('TEMPORAL', 'How long is the window to stop an irreversible consequence?', 'Hold an irreversible transition without a harm window.', 'HIGH'));
  if (!input.independent_verifier_id) attacks.push(attack('EVIDENCE', 'Who independently verified the evidence chain?', 'Self-produced evidence cannot independently certify itself.', 'MEDIUM'));
  if (input.self_certification_possible) attacks.push(attack('SELF_CERTIFICATION', 'Can the inspected system declare its own claim successful?', 'Reject self-certification and self-closure.', 'HIGH'));
  for (const surface of input.uninspected_surfaces) attacks.push(attack('COVERAGE', `What happens on the uninspected surface: ${surface}?`, 'Do not claim completeness over uninspected surfaces.', 'HIGH'));
  const high = attacks.filter((item) => item.severity === 'HIGH');
  const disposition: InquisitionEngineResult['disposition'] = !input.claim.trim() ? 'NOT_ADMISSIBLE' : high.some((item) => item.category === 'SELF_CERTIFICATION') ? 'HOLD_FOR_COUNTEREVIDENCE' : attacks.length ? 'REQUIRES_REPAIR' : 'SURVIVES_INITIAL_ATTACK';
  return { inquiry_id: input.inquiry_id, disposition, attacks, strongest_attack: attacks[0], counterevidence_requested: attacks.map((item) => item.rejection_condition), unresolved_questions: attacks.map((item) => item.question), machine_authority: false, machine_verdict: false, closure: false };
}
