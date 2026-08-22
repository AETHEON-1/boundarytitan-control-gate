export type ChaosScenarioKind = 'MISSING_EVIDENCE' | 'OWNER_UNAVAILABLE' | 'STOP_PATH_UNAVAILABLE' | 'REVOCATION_DELAY' | 'STALE_EVIDENCE' | 'CLOCK_SKEW' | 'DEPENDENCY_FAILURE' | 'CONTRADICTORY_SIGNAL' | 'RETRY_AFTER_REVOCATION' | 'LEDGER_GAP' | 'UNINSPECTED_SURFACE';
export type ChaosExpectedDisposition = 'HOLD' | 'HUMAN_REVIEW_REQUIRED' | 'SAFE_DEGRADED_MODE' | 'REVOKE_AND_STOP';

export interface ChaosScenario {
  scenario_id: string;
  name: string;
  kind: ChaosScenarioKind;
  injected_fault: string;
  expected_disposition: ChaosExpectedDisposition;
  required_evidence: string[];
  owner_id?: string;
  external_stop_path_id?: string;
  harm_window_ms?: number;
}

export interface ChaosEngineInput {
  run_id: string;
  target_system: string;
  scenarios: ChaosScenario[];
  live_connection: false;
  credentials_used: false;
}

export interface ChaosScenarioResult {
  scenario_id: string;
  status: 'PASS' | 'FAIL' | 'NOT_RUN' | 'INVALID';
  expected_disposition: ChaosExpectedDisposition;
  observed_disposition?: ChaosExpectedDisposition;
  observed_events: string[];
  unknowns: string[];
}

export interface ChaosEngineResult {
  run_id: string;
  target_system: string;
  results: ChaosScenarioResult[];
  failed_scenarios: string[];
  untested_scenarios: string[];
  disposition: 'PASS_WITHIN_SIMULATION_SCOPE' | 'FAIL_REQUIRES_REPAIR' | 'NOT_TESTED';
  machine_authority: false;
  deployment_approved: false;
}
