import { laneRegistry } from '../fixtures/lane-registry';
import { assessSwitchboardAgentGate } from '../workflows/switchboard-agent-gate';

const valid = { request_id: 'switch-1', agent_id: 'agent-1', agent_trust: 'UNTRUSTED_BY_DEFAULT' as const, task: 'inspect repository maintenance state', requested_actions: ['read repository files'], candidate_lane_ids: ['control'], permission_manifest_id: 'manifest-1', owner_id: 'owner-1', external_stop_path_id: 'stop-1', revocation_path_id: 'revoke-1', expires_at: '2099-01-01T00:00:00Z', now: '2026-08-22T00:00:00Z', maintenance_only: true, credentials_present: false, live_connection: false };

test('routes a bounded maintenance request without granting authority', () => {
  const result = assessSwitchboardAgentGate(valid, laneRegistry);
  expect(result.disposition).toBe('ROUTE_TO_LANE');
  expect(result.selected_lane_id).toBe('control');
  expect(result.agent_authority).toBe(false);
  expect(result.tool_authority_granted).toBe(false);
  expect(result.execution_started).toBe(false);
});

test('holds non-maintenance or incomplete requests', () => {
  const result = assessSwitchboardAgentGate({ ...valid, maintenance_only: false, owner_id: undefined, external_stop_path_id: undefined }, laneRegistry);
  expect(result.disposition).toBe('HOLD_FOR_HUMAN_REVIEW');
  expect(result.reasons).toEqual(expect.arrayContaining(['Agent task is not restricted to system maintenance.', 'Owner is missing.', 'External stop path is missing.']));
});

test('denies live credentials or live connection', () => {
  const result = assessSwitchboardAgentGate({ ...valid, credentials_present: true }, laneRegistry);
  expect(result.disposition).toBe('DENY');
  expect(result.agent_authority).toBe(false);
});

test('expires requests before routing', () => {
  const result = assessSwitchboardAgentGate({ ...valid, expires_at: '2026-08-21T00:00:00Z' }, laneRegistry);
  expect(result.disposition).toBe('EXPIRED');
});
