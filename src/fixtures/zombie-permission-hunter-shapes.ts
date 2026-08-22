import type { HunterContext, PermissionRecord } from '../types/zombie-permission-hunter-contracts';

export const zombiePermissionFixture: PermissionRecord = {
  id: 'permission-stale-001',
  principal_id: 'agent-maintenance-01',
  lane_id: 'maintenance',
  granted_scope: ['read:inventory', 'write:inventory'],
  observed_scope: ['read:inventory'],
  purpose: 'Declared maintenance inspection',
  evidence_ids: ['evidence-grant-001'],
  granted_at: '2026-08-20T10:00:00Z',
  expires_at: '2026-08-20T12:00:00Z',
  affected_surface: 'inventory service',
  consequence_class: 'REVERSIBLE',
};

export const zombieHunterContext: HunterContext = {
  id: 'task-zph-001',
  lane_id: 'maintenance',
  inspected_sources: ['permission-registry', 'task-envelope'],
  uninspected_surfaces: ['cached-tokens', 'delegated-access'],
  as_of: '2026-08-21T00:00:00Z',
  external_stop_path_id: 'stop-maintenance-01',
  stop_path_owner_id: 'human-owner-01',
  human_owner_id: 'human-owner-01',
};
