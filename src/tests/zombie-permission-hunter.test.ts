import { inspectPermission } from '../maintenance/zombie-permission-hunter';
import { zombieHunterContext, zombiePermissionFixture } from '../fixtures/zombie-permission-hunter-shapes';

describe('Zombie Permission Hunter prototype', () => {
  it('preserves multiple conditions and uncertainty without mutating state', () => {
    const output = inspectPermission(zombiePermissionFixture, zombieHunterContext);
    expect(output.finding.detected_conditions).toEqual(expect.arrayContaining(['EXPIRED', 'OVERBROAD']));
    expect(output.finding.recommended_disposition).toBe('HUMAN_REVIEW');
    expect(output.finding.action_taken).toBe('NONE');
    expect(output.finding.evidence_state).toBe('NOT_TESTED');
    expect(output.finding.uncertainty).toContain('Uninspected surfaces remain: cached-tokens, delegated-access');
    expect(output.finding.coverage_statement).toContain('completeness is not established');
    expect(output.machine_authority_boundary).toBe('NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE');
  });

  it('does not infer denial authority or completeness from a clean declaration', () => {
    const output = inspectPermission({
      ...zombiePermissionFixture, id: 'permission-valid-001', granted_scope: ['read:inventory'],
      observed_scope: ['read:inventory'], expires_at: '2026-08-22T00:00:00Z', owner_id: 'owner-01',
    }, { ...zombieHunterContext, uninspected_surfaces: [] });
    expect(output.finding.status).toBe('NO_DECLARED_DEFECT_DETECTED');
    expect(output.finding.coverage_statement).toContain('completeness is not established');
    expect(output.human_translation_key.translation_loss.length).toBeGreaterThan(0);
  });
});
