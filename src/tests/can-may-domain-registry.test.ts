import { canMayDomainRegistry } from '../fixtures/can-may-domain-registry';

describe('CAN → MAY domain registry', () => {
  test('maps every current exploration surface to a bounded adapter', () => {
    expect(canMayDomainRegistry.adapters.length).toBeGreaterThanOrEqual(30);
    expect(new Set(canMayDomainRegistry.adapters.map((adapter) => adapter.id)).size).toBe(canMayDomainRegistry.adapters.length);
    expect(canMayDomainRegistry.exhaustive).toBe(false);
  });

  test('requires consequence ownership and an external stop for every adapter', () => {
    expect(canMayDomainRegistry.adapters.every((adapter) => adapter.consequence_owner_required && adapter.external_stop_required && adapter.affected_party_required)).toBe(true);
  });

  test('preserves a specialist route and unsupported arrow for every adapter', () => {
    expect(canMayDomainRegistry.adapters.every((adapter) => adapter.specialist_role.length > 0 && adapter.first_unsupported_arrow.includes('→'))).toBe(true);
  });
});
