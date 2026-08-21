import type {
  EvidenceState,
  HumanTranslationKey,
  HunterContext,
  PermissionRecord,
  ZombieHunterOutput,
  ZombiePermissionFinding,
} from '../types/zombie-permission-hunter-contracts';

/**
 * Read-only prototype.
 *
 * It classifies declarations. It does not revoke, grant, certify completeness,
 * choose owners, or close a review. A preauthorized block is represented only
 * as an explicit disposition; no external state is changed here.
 */
export function inspectPermission(
  permission: PermissionRecord,
  context: HunterContext,
  now = new Date(context.as_of),
): ZombieHunterOutput {
  const reasons: string[] = [];
  const unknown: string[] = [];
  const evidenceIds = [...permission.evidence_ids];
  let status: ZombiePermissionFinding['status'] = 'VALID';
  let evidenceState: EvidenceState = 'SUPPORTED';

  if (!permission.owner_id) {
    status = 'ORPHANED';
    reasons.push('No named owner is present in the inspected permission record.');
  }
  if (!permission.lane_id) {
    status = status === 'VALID' ? 'UNRESOLVED' : status;
    reasons.push('Lane assignment is absent.');
  } else if (permission.lane_id !== context.lane_id) {
    status = 'OUT_OF_LANE';
    reasons.push('Permission lane differs from the assigned inspection lane.');
  }
  if (permission.evidence_ids.length === 0) {
    status = 'STALE_EVIDENCE';
    evidenceState = 'INDETERMINATE';
    reasons.push('No evidence reference is present.');
  }
  if (permission.expires_at && new Date(permission.expires_at) <= now) {
    status = 'EXPIRED';
    reasons.push('Permission expiry has passed.');
  } else if (permission.expires_at && new Date(permission.expires_at).getTime() - now.getTime() <= 86_400_000) {
    status = status === 'VALID' ? 'EXPIRING' : status;
    reasons.push('Permission expires within the next 24 hours.');
  }
  if (permission.granted_scope.some((item) => !permission.observed_scope.includes(item))) {
    status = 'OVERBROAD';
    reasons.push('Granted scope exceeds the observed scope declaration.');
  }
  if (context.uninspected_surfaces.length > 0) {
    unknown.push('Uninspected surfaces remain: ' + context.uninspected_surfaces.join(', '));
    if (status === 'VALID') status = 'NOT_INSPECTED';
    evidenceState = evidenceState === 'SUPPORTED' ? 'NOT_TESTED' : evidenceState;
  }

  const requiresHumanReview = status !== 'VALID' && status !== 'EXPIRING';
  const disposition = requiresHumanReview ? 'HUMAN_REVIEW' : 'CONTINUE';
  const owner = permission.owner_id ?? 'UNRESOLVED_OWNER';
  const denial = context.human_owner_id;
  const revocation = permission.revocation_authority_id ?? 'UNRESOLVED_REVOCATION_AUTHORITY';
  const finding: ZombiePermissionFinding = {
    id: 'zph-' + permission.id,
    permission_id: permission.id,
    status,
    evidence_state: evidenceState,
    reasons,
    evidence_ids: evidenceIds,
    competing_interpretations: permission.owner_id ? [] : ['Dormant or recovery access may be intentional; authority basis is not established.'],
    consequence: permission.affected_surface + ' / ' + permission.consequence_class,
    reversibility: permission.consequence_class,
    owner: permission.owner_id,
    denial_authority_id: denial,
    revocation_authority_id: permission.revocation_authority_id,
    recommended_disposition: disposition,
    action_taken: 'NONE',
    uncertainty: unknown,
    coverage_statement: 'No zombie permission was detected only within the inspected records, surfaces, rules, and time window; completeness is not established.',
    who_can_still_say_no: [denial],
  };

  const human_translation_key: HumanTranslationKey = {
    what_happened: 'Permission ' + permission.id + ' was inspected against its declared lane, scope, evidence, owner, and time conditions.',
    what_changed: reasons.length ? reasons.join(' ') : 'No declared validity defect was detected.',
    evidenced: evidenceIds,
    inferred: reasons,
    unknown: unknown,
    consequences: [finding.consequence],
    choices_remaining: ['Continue', 'Hold', 'Block under an existing rule', 'Escalate', 'Request more evidence'],
    owner,
    denial_path: denial,
    revocation_path: revocation,
    appeal_path: 'Route to the named human owner or separately designated appeal authority.',
    timing: 'Inspection time: ' + context.as_of + '; permission expiry: ' + (permission.expires_at ?? 'not declared'),
    translation_loss: [],
  };

  return {
    finding,
    human_translation_key,
    consequence_receipt_reference: 'receipt:' + finding.id,
    ledger_event_type: 'PERMISSION_REVIEW_FINDING',
    machine_authority_boundary: 'NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE',
  };
}
