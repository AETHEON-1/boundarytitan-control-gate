import type { ActionProposal, EvidenceItem, OwnerAssignment, RoutingColor } from '../types/core-contracts';

export type EvidenceStatus = 'CURRENT' | 'STALE' | 'UNVERIFIABLE' | 'UNKNOWN';

/** Evidence supplied to the deterministic Phase 2 classifier. */
export interface ProposalAssessmentInput {
  proposal: Partial<ActionProposal>;
  accountableOwner?: Pick<OwnerAssignment, 'subject_id' | 'revocation_path'>;
  evidence?: EvidenceItem[];
  evidenceStatus?: EvidenceStatus;
  highConsequence?: boolean;
  hasPreActionHumanAuthority?: boolean;
  hasOperationalExternalStopPath?: boolean;
  machineSelfApprovalClaimed?: boolean;
  prohibitedConductClaimed?: boolean;
}

export interface RuleFinding { rule: string; color: Exclude<RoutingColor, 'GREEN_ELIGIBLE'>; message: string; }
export interface ProposalAssessment { routing_color: RoutingColor; findings: RuleFinding[]; missing_fields: string[]; }

const rank: Record<RoutingColor, number> = { GREEN_ELIGIBLE: 0, YELLOW: 1, RED: 2, BLACK: 3 };

/**
 * Pure, deterministic Phase 2 classification. It creates no authority object,
 * changes no state, and does not issue a permission, release, or execution.
 */
export function evaluateProposal(input: ProposalAssessmentInput): ProposalAssessment {
  const findings: RuleFinding[] = [];
  const missing_fields: string[] = [];
  const add = (rule: string, color: RuleFinding['color'], message: string, missing?: string) => {
    findings.push({ rule, color, message });
    if (missing) missing_fields.push(missing);
  };
  const proposal = input.proposal;

  if (!proposal.lane_id) add('R-001', 'YELLOW', 'Missing lane.', 'lane');
  if (!input.accountableOwner?.subject_id) add('R-002', 'YELLOW', 'Missing accountable owner.', 'accountable_owner');
  if (input.accountableOwner?.subject_id && !input.accountableOwner.revocation_path) add('R-003', 'RED', 'Owner deny/revoke path is not evidenced.');
  if (!input.evidence?.length) add('R-004', 'YELLOW', 'Missing evidence.', 'evidence');
  if (input.evidenceStatus === 'STALE' || input.evidenceStatus === 'UNVERIFIABLE') add('R-005', input.highConsequence ? 'RED' : 'YELLOW', 'Evidence is stale or unverifiable.');
  if (!proposal.expected_consequence) add('R-006', 'YELLOW', 'Missing consequence description.', 'expected_consequence');
  if (!proposal.reversibility || proposal.reversibility === 'UNKNOWN') add('R-007', 'YELLOW', 'Missing reversibility statement.', 'reversibility');
  if (proposal.reversibility === 'IRREVERSIBLE' && !input.hasPreActionHumanAuthority) add('R-008', 'RED', 'Irreversible action lacks evidenced pre-action human authority.');
  if (!input.hasOperationalExternalStopPath) add('R-009', 'RED', 'Missing operational external stop path.', 'external_stop_path');
  if (input.machineSelfApprovalClaimed) add('R-010', 'BLACK', 'Machine self-approval or self-certification claimed.');
  if (input.prohibitedConductClaimed) add('R-011', 'BLACK', 'Prohibited conduct or review bypass claimed.');

  const routing_color = findings.reduce<RoutingColor>((color, finding) => rank[finding.color] > rank[color] ? finding.color : color, 'GREEN_ELIGIBLE');
  return { routing_color, findings, missing_fields };
}
