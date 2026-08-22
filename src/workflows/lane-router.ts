import type { LaneRouteRequest, LaneRouteResult } from '../types/lane-contracts';
import type { LaneDefinition } from '../types/lane-contracts';

/** Routes preparation only. Routing does not transfer ownership or authority. */
export function routeLane(request: LaneRouteRequest, lanes: LaneDefinition[]): LaneRouteResult {
  const candidates = lanes.filter((lane) => request.candidate_lane_ids.includes(lane.lane_id));
  if (!candidates.length) return { request_id: request.request_id, route_status: 'NO_LANE_MATCH', reasons: ['No declared lane matches the request.'], authority_transferred: false, owner_assigned: false };
  if (candidates.length > 1) return { request_id: request.request_id, route_status: 'HUMAN_LANE_SELECTION_REQUIRED', reasons: ['Multiple lanes match; routing cannot select the consequential owner.'], authority_transferred: false, owner_assigned: false };
  const lane = candidates[0];
  const reasons: string[] = [];
  if (!request.owner_id) reasons.push('Owner is not supplied.');
  if (!request.external_stop_path_id) reasons.push('External stop path is not supplied.');
  if (lane.state === 'SEALED') reasons.push('Lane is sealed.');
  return { request_id: request.request_id, selected_lane_id: lane.lane_id, route_status: reasons.length ? 'HUMAN_LANE_SELECTION_REQUIRED' : 'ROUTED_FOR_PREPARATION', reasons, authority_transferred: false, owner_assigned: false };
}
