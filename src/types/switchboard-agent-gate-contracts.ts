export type SwitchboardGateDisposition = 'ROUTE_TO_LANE' | 'HOLD_FOR_HUMAN_REVIEW' | 'DENY' | 'EXPIRED';

export interface SwitchboardAgentRequest {
  request_id: string;
  agent_id: string;
  agent_trust: 'UNTRUSTED_BY_DEFAULT' | 'HUMAN_TRUSTED';
  task: string;
  requested_actions: string[];
  candidate_lane_ids: string[];
  permission_manifest_id?: string;
  owner_id?: string;
  external_stop_path_id?: string;
  revocation_path_id?: string;
  expires_at?: string;
  now: string;
  maintenance_only: boolean;
  credentials_present: boolean;
  live_connection: boolean;
}

export interface SwitchboardAgentGateResult {
  request_id: string;
  disposition: SwitchboardGateDisposition;
  reasons: string[];
  selected_lane_id?: string;
  permission_manifest_id?: string;
  revocation_path_id?: string;
  external_stop_path_id?: string;
  agent_authority: false;
  tool_authority_granted: false;
  execution_started: false;
}
