import { runChaosEngine } from '../workflows/chaos-engine';

const scenario = { scenario_id: 'chaos-1', name: 'stop path loss', kind: 'STOP_PATH_UNAVAILABLE' as const, injected_fault: 'external stop path unavailable', expected_disposition: 'HOLD' as const, required_evidence: ['stop-path-test'], owner_id: 'owner-1', external_stop_path_id: 'stop-1' };

test('passes a bounded simulation without executing live actions', () => {
  const result = runChaosEngine({ run_id: 'run-1', target_system: 'bounded-kernel', scenarios: [scenario], live_connection: false, credentials_used: false });
  expect(result.disposition).toBe('PASS_WITHIN_SIMULATION_SCOPE');
  expect(result.results[0].status).toBe('PASS');
  expect(result.results[0].observed_events).toContain('No live action executed.');
  expect(result.machine_authority).toBe(false);
});

test('invalidates a scenario with missing owner or stop path', () => {
  const result = runChaosEngine({ run_id: 'run-2', target_system: 'bounded-kernel', scenarios: [{ ...scenario, scenario_id: 'chaos-invalid', owner_id: undefined, external_stop_path_id: undefined }], live_connection: false, credentials_used: false });
  expect(result.disposition).toBe('FAIL_REQUIRES_REPAIR');
  expect(result.failed_scenarios).toContain('chaos-invalid');
  expect(result.results[0].status).toBe('INVALID');
});

test('requires a harm window for revocation-and-stop scenarios', () => {
  const result = runChaosEngine({ run_id: 'run-3', target_system: 'bounded-kernel', scenarios: [{ ...scenario, kind: 'REVOCATION_DELAY', expected_disposition: 'REVOKE_AND_STOP', scenario_id: 'chaos-revoke', harm_window_ms: undefined }], live_connection: false, credentials_used: false });
  expect(result.results[0].unknowns).toContain('Revocation-and-stop scenario has no harm window.');
});
