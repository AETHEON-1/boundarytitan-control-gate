import { evaluateProposal } from './evaluate-proposal';
import { validActionProposal, validEvidenceItem, validOwnerAssignment } from '../fixtures/valid-shapes';

const complete = { proposal: validActionProposal, accountableOwner: { subject_id: validOwnerAssignment.subject_id, revocation_path: 'owner-stop' }, evidence: [validEvidenceItem], evidenceStatus: 'CURRENT' as const, hasOperationalExternalStopPath: true };

describe('Phase 2 deterministic routing', () => {
  test('returns Green eligibility only for the complete structural input', () => {
    expect(evaluateProposal(complete)).toEqual({ routing_color: 'GREEN_ELIGIBLE', findings: [], missing_fields: [] });
  });
  test('returns Yellow for missing lane and evidence', () => {
    const result = evaluateProposal({ ...complete, proposal: { ...validActionProposal, lane_id: '' }, evidence: [] });
    expect(result.routing_color).toBe('YELLOW');
    expect(result.findings.map(f => f.rule)).toEqual(expect.arrayContaining(['R-001', 'R-004']));
  });
  test('returns Red for a missing stop path or irreversible action without pre-action authority', () => {
    expect(evaluateProposal({ ...complete, hasOperationalExternalStopPath: false }).routing_color).toBe('RED');
    expect(evaluateProposal({ ...complete, proposal: { ...validActionProposal, reversibility: 'IRREVERSIBLE' } }).routing_color).toBe('RED');
  });
  test('returns Black for self-approval and prohibited conduct claims', () => {
    expect(evaluateProposal({ ...complete, machineSelfApprovalClaimed: true }).routing_color).toBe('BLACK');
    expect(evaluateProposal({ ...complete, prohibitedConductClaimed: true }).routing_color).toBe('BLACK');
  });
  test('does not return authority, permission, release, or execution fields', () => {
    const result = evaluateProposal(complete) as unknown as Record<string, unknown>;
    for (const key of ['approval', 'permission', 'release', 'execution', 'humanDecision']) expect(result[key]).toBeUndefined();
  });
});
