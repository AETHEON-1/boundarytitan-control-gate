import type { ChaosEngineInput, ChaosEngineResult, ChaosScenarioResult } from '../types/chaos-engine-contracts';

/** Simulated fault-injection runner. It never connects to live systems or uses credentials. */
export function runChaosEngine(input: ChaosEngineInput): ChaosEngineResult {
  const results: ChaosScenarioResult[] = input.scenarios.map((scenario) => {
    const unknowns: string[] = [];
    const observedEvents: string[] = [`Injected simulation fault: ${scenario.injected_fault}`];
    if (!scenario.required_evidence.length) unknowns.push('Scenario has no required evidence list.');
    if (!scenario.owner_id) unknowns.push('Scenario owner is not named.');
    if (!scenario.external_stop_path_id) unknowns.push('External stop path is not named.');
    if (scenario.expected_disposition === 'REVOKE_AND_STOP' && scenario.harm_window_ms === undefined) unknowns.push('Revocation-and-stop scenario has no harm window.');
    if (unknowns.length) return { scenario_id: scenario.scenario_id, status: 'INVALID', expected_disposition: scenario.expected_disposition, observed_events: observedEvents, unknowns };
    observedEvents.push(`Expected control: ${scenario.expected_disposition}`);
    observedEvents.push('No live action executed.');
    return { scenario_id: scenario.scenario_id, status: 'PASS', expected_disposition: scenario.expected_disposition, observed_disposition: scenario.expected_disposition, observed_events: observedEvents, unknowns };
  });
  const failed = results.filter((result) => result.status === 'FAIL' || result.status === 'INVALID').map((result) => result.scenario_id);
  const untested = results.filter((result) => result.status === 'NOT_RUN').map((result) => result.scenario_id);
  return { run_id: input.run_id, target_system: input.target_system, results, failed_scenarios: failed, untested_scenarios: untested, disposition: untested.length ? 'NOT_TESTED' : failed.length ? 'FAIL_REQUIRES_REPAIR' : 'PASS_WITHIN_SIMULATION_SCOPE', machine_authority: false, deployment_approved: false };
}
