import { inspectPermission } from '../maintenance/zombie-permission-hunter';
import { zombieHunterContext, zombiePermissionFixture } from '../fixtures/zombie-permission-hunter-shapes';

describe('Zombie Permission Hunter prototype', () => {
  it('classifies expired and overbroad access without mutating state', () => {
    const output = inspectPermission(zombiePermissionFixture, zombieHunterContext);
    expect(output.finding.status).toBe('OVERBROAD');
    expect(output.finding.evidence_state).toBe('NOT_TESTED');
    expect(output.finding.recommended_disposition).toBe('HUMAN_REVIEW');
    expect(output.finding.action_taken).toBe('NONE');
    expect(output.finding.uncertainty).toContain('Uninspected surfaces remain: cached-tokens, delegated-access');
    expect(output.machine_authority_boundary).toBe('NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE');
  });

  it('does not claim completeness when all declarations look valid', () => {
    const output = inspectPermission({
      ...zombiePermissionFixture,
      id: 'permission-valid-001',
      granted_scope: ['read:inventory'],
      observed_scope: ['read:inventory'],
      expires_at: '2026-08-22T00:00:00Z',
      owner_id: 'owner-01',
    }, { ...zombieHunterContext, uninspected_surfaces: [] });
    expect(output.finding.status).toBe('VALID');
    expect(output.finding.coverage_statement).toContain('completeness is not established');
    expect(output.human_translation_key.choices_remaining).toContain('Hold');
  });
});
