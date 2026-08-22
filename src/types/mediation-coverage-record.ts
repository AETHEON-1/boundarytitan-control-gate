/** Declaration-only complete-mediation coverage contracts. */
export type MediationCoverage = 'MEDIATED' | 'BLOCKED' | 'UNKNOWN' | 'EXTERNALLY_STOPPED';
export interface MediationCoverageRecord {
  surface_id: string;
  surface_kind: 'API' | 'SDK' | 'SHELL' | 'PLUGIN' | 'WORKER' | 'RETRY_QUEUE' | 'CACHED_CREDENTIAL' | 'EMERGENCY_OVERRIDE' | 'VENDOR_PATH' | 'PHYSICAL_CONTROL' | 'NETWORK_ROUTE' | 'ADMIN_PATH';
  consequence_class: string;
  coverage: MediationCoverage;
  gateway_reference?: string;
  external_stop_reference?: string;
  owner_id: string;
  evidence_references: string[];
  uncertainty: string[];
}
