export type LaneState = 'CATALOGED' | 'PREPARATION_ONLY' | 'HUMAN_REVIEW_REQUIRED' | 'SEALED';

export interface LaneDefinition {
  lane_id: string;
  name: string;
  scope: string;
  admissible_preparation: string[];
  forbidden_actions: string[];
  required_owner_role: string;
  external_stop_required: true;
  specialist_role: string;
  state: LaneState;
}

export interface LaneRouteRequest {
  request_id: string;
  summary: string;
  candidate_lane_ids: string[];
  consequence_surface?: string;
  owner_id?: string;
  external_stop_path_id?: string;
}

export interface LaneRouteResult {
  request_id: string;
  selected_lane_id?: string;
  route_status: 'ROUTED_FOR_PREPARATION' | 'HUMAN_LANE_SELECTION_REQUIRED' | 'NO_LANE_MATCH';
  reasons: string[];
  authority_transferred: false;
  owner_assigned: false;
}
