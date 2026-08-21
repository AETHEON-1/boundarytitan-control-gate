import { inspectPermissions } from '../maintenance/zombie-permission-hunter-batch';
import { zombieHunterContext, zombiePermissionFixture } from '../fixtures/zombie-permission-hunter-shapes';

describe('Zombie Permission Hunter batch prototype', () => {
  it('returns independent read-only findings for each supplied record', () => {
    const outputs = inspectPermissions([
      zombiePermissionFixture,
      { ...zombiePermissionFixture, id: 'permission-002', owner_id: 'owner-02', granted_scope: ['read:inventory'], observed_scope: ['read:inventory'], expires_at: '2026-08-22T00:00:00Z' },
    ], { ...zombieHunterContext, uninspected_surfaces: [] });

    expect(outputs).toHaveLength(2);
    expect(outputs[0].finding.recommended_disposition).toBe('HUMAN_REVIEW');
    expect(outputs[1].finding.status).toBe('NO_DECLARED_DEFECT_DETECTED');
    expect(outputs.every((output) => output.finding.action_taken === 'NONE')).toBe(true);
    expect(outputs.every((output) => output.machine_authority_boundary === 'NO_AUTHORIZATION_NO_CERTIFICATION_NO_CLOSURE')).toBe(true);
  });
});
