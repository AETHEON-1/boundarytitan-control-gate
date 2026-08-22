import type { EvidenceState, HumanTranslationKey, HunterContext, PermissionRecord, ZombieHunterOutput, ZombiePermissionFinding, ZombieFindingStatus } from '../types/zombie-permission-hunter-contracts';
const validDate = (value?: string) => value !== undefined && !Number.isNaN(Date.parse(value));
export function inspectPermission(permission: PermissionRecord, context: HunterContext, now = new Date(context.as_of)): ZombieHunterOutput {
  const reasons: string[] = [], unknown: string[] = [], conditions: ZombieFindingStatus[] = [];
  const evidenceIds = [...permission.evidence_ids];
  let evidenceState: EvidenceState = evidenceIds.length ? 'SUPPORTED' : 'INDETERMINATE';
  if (!permission.owner_id) { conditions.push('ORPHANED'); reasons.push('No named owner is present in the inspected permission record.'); }
  if (!permission.lane_id) { conditions.push('UNRESOLVED'); reasons.push('Lane assignment is absent.'); }
  else if (permission.lane_id !== context.lane_id) { conditions.push('OUT_OF_LANE'); reasons.push('Permission lane differs from the assigned inspection lane.'); }
  if (!evidenceIds.length) { conditions.push('STALE_EVIDENCE'); reasons.push('No evidence reference is present.'); }
  if (permission.expires_at && !validDate(permission.expires_at)) { conditions.push('INVALID_TIME'); reasons.push('Permission expiry is not a valid timestamp.'); }
  if (permission.granted_at && !validDate(permission.granted_at)) { conditions.push('INVALID_TIME'); reasons.push('Permission grant time is not a valid timestamp.'); }
  if (permission.expires_at && validDate(permission.expires_at)) {
    const expiry = new Date(permission.expires_at);
    if (expiry <= now) { conditions.push('EXPIRED'); reasons.push('Permission expiry has passed.'); }
    else if (expiry.getTime() - now.getTime() <= 86400000) { conditions.push('EXPIRING'); reasons.push('Permission expires within the next 24 hours.'); }
  }
  if (permission.granted_at && permission.expires_at && validDate(permission.granted_at) && validDate(permission.expires_at) && new Date(permission.expires_at) <= new Date(permission.granted_at)) { conditions.push('INVALID_TIME'); reasons.push('Expiry is not after grant time.'); }
  if (permission.granted_scope.some((item) => !permission.observed_scope.includes(item))) { conditions.push('OVERBROAD'); reasons.push('Granted scope exceeds the observed scope declaration; observation coverage may be incomplete.'); }
  if (context.uninspected_surfaces.length) { unknown.push('Uninspected surfaces remain: ' + context.uninspected_surfaces.join(', ')); evidenceState = evidenceState === 'SUPPORTED' ? 'NOT_TESTED' : evidenceState; }
  if (!conditions.length && context.uninspected_surfaces.length) conditions.push('NOT_INSPECTED');
  const status = conditions[0] ?? 'NO_DECLARED_DEFECT_DETECTED';
  const owner = permission.owner_id ?? 'UNRESOLVED_OWNER';
  const denialAuthority = context.human_owner_id;
  const revocationAuthority = permission.revocation_authority_id ?? 'UNRESOLVED_REVOCATION_AUTHORITY';
  const finding: ZombiePermissionFinding = { id: 'zph-' + permission.id, permission_id: permission.id, status, detected_conditions: conditions, evidence_state: evidenceState, reasons, evidence_ids: evidenceIds, competing_interpretations: ['Dormant or recovery access may be intentional; authority basis is not established.'], consequence: permission.affected_surface + ' / ' + permission.consequence_class, reversibility: permission.consequence_class, owner_id: permission.owner_id, denial_authority_id: denialAuthority, revocation_authority_id: permission.revocation_authority_id, recommended_disposition: conditions.length ? 'HUMAN_REVIEW' : 'CONTINUE', action_taken: 'NONE', uncertainty: unknown, coverage_statement: 'No zombie permission was detected only within the inspected records, surfaces, rules, and time window; completeness is not established.', who_can_still_say_no: [denialAuthority] };
  const human_translation_key: HumanTranslationKey = { what_happened: 'Permission ' + permission.id + ' was inspected against declared lane, scope, evidence, owner, and time conditions.', what_changed: reasons.length ? reasons.join(' ') : 'No declared validity defect was detected.', evidenced: evidenceIds, inferred: [], unknown, consequences: [finding.consequence], choices_remaining: ['Continue', 'Hold', 'Escalate', 'Request more evidence'], owner, denial_path: denialAuthority, revocation_path: revocationAuthority, appeal_path: 'Route to the named human owner or separately designated appeal authority.', timing: 'Inspection time: ' + context.as_of + '; expiry: ' + (permission.expires_at ?? 'not declared'), translation_loss: ['Evidence contents, custody, and external permission reality were not supplied to this read-only function.'] };
  return { finding, human_translation_key, consequence_receipt_reference: 'receipt:' + finding.id, ledger_event_type: 'PERMISSION_REVIEW_FINDING', machine_authority_boundary: 'NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE' };
}
