import type {
  HostileAttack,
  HostileDeconstructionInput,
  HostileDeconstructionResult,
} from '../types/hostile-deconstruction-contracts';

const makeAttack = (
  mode: HostileAttack['mode'],
  index: number,
  question: string,
  disposition: HostileAttack['disposition'],
  unsupported_arrow?: string,
): HostileAttack => ({
  attack_id: `${mode.toLowerCase()}-${index + 1}`,
  mode,
  question,
  disposition,
  ...(unsupported_arrow ? { unsupported_arrow } : {}),
});

export function runHostileDeconstruction(
  input: HostileDeconstructionInput,
): HostileDeconstructionResult {
  const attacks: HostileAttack[] = [];
  const claim = input.claim.trim();

  if (!claim) {
    attacks.push(makeAttack('BOUNDARY', 0, 'What exact claim is being frozen?', 'UNDERDETERMINED'));
  }
  if (!input.seed.trim()) {
    attacks.push(makeAttack('BOUNDARY', attacks.length, 'What proposition is established before analysis begins?', 'REQUIRES_PREMISE'));
  }
  if (!input.evidence_ids.length) {
    attacks.push(makeAttack('OMISSION', attacks.length, 'What evidence establishes the seed?', 'UNDERDETERMINED', 'evidence -> established seed'));
  }
  if (input.assumptions.length) {
    input.assumptions.forEach((assumption, index) =>
      attacks.push(makeAttack('OMISSION', attacks.length + index, `What independently supports the assumption: ${assumption}?`, 'REQUIRES_PREMISE')),
    );
  }
  if (!input.consequence_owner_id) {
    attacks.push(makeAttack('BOUNDARY', attacks.length, 'Who owns the consequence if the claim is wrong?', 'REQUIRES_PREMISE', 'claim -> consequence ownership'));
  }
  if (!input.external_stop_authority_id) {
    attacks.push(makeAttack('BOUNDARY', attacks.length, 'Who can still say no before consequence?', 'REQUIRES_PREMISE', 'system output -> permission'));
  }
  if (!input.uninspected_surfaces.length && !input.inspected_boundary.length) {
    attacks.push(makeAttack('OMISSION', attacks.length, 'What boundary was actually inspected?', 'UNDERDETERMINED'));
  }
  input.uninspected_surfaces.forEach((surface, index) =>
    attacks.push(makeAttack('BOUNDARY', attacks.length + index, `What happens on the uninspected surface: ${surface}?`, 'COMPATIBLE_BUT_NOT_DERIVED', `tested boundary -> complete coverage (${surface})`)),
  );
  if (!input.independent_evaluator_id) {
    attacks.push(makeAttack('METHOD', attacks.length, 'Who evaluates the attack independently of the system under examination?', 'REQUIRES_PREMISE', 'machine output -> evaluation authority'));
  }

  const first = attacks[0];
  const disposition: HostileDeconstructionResult['disposition'] =
    !claim || !input.seed.trim()
      ? 'UNDERDETERMINED'
      : first?.disposition ?? 'DERIVED';

  const claim_class: HostileDeconstructionResult['claim_class'] =
    input.evidence_ids.length ? 'DOCUMENTED_RECORD' : 'OPEN_QUESTION';

  return {
    inquiry_id: input.inquiry_id,
    claim_class,
    disposition,
    ...(first?.unsupported_arrow ? { first_unsupported_arrow: first.unsupported_arrow } : {}),
    attacks,
    evidence_end: first
      ? `Evidence ends at: ${first.question}`
      : 'No unsupported arrow found within the tested boundary.',
    unresolved_questions: attacks.map((attack) => attack.question),
    machine_authority: false,
    machine_certification: false,
    machine_closure: false,
    human_disposition_required: true,
  };
}
