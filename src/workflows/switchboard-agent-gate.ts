import type { LaneDefinition } from '../types/lane-contracts';
import type { SwitchboardAgentGateResult, SwitchboardAgentRequest } from '../types/switchboard-agent-gate-contracts';

/** Read-only admission gate for untrusted agents. It never grants tool or execution authority. */
export function assessSwitchboardAgentGate(request: SwitchboardAgentRequest, lanes: LaneDefinition[]): SwitchboardAgentGateResult {
  const reasons: string[] = [];
  if (!request.agent_id.trim()) reasons.push('Agent identity is missing.');
  if (request.agent_trust !== 'UNTRUSTED_BY_DEFAULT') reasons.push('Agent trust state is not explicitly bounded.');
  if (!request.task.trim()) reasons.push('Task is missing.');
  if (!request.requested_actions.length) reasons.push('Requested actions are missing.');
  if (!request.permission_manifest_id) reasons.push('Permission manifest is missing.');
  if (!request.owner_id) reasons.push('Owner is missing.');
  if (!request.external_stop_path_id) reasons.push('External stop path is missing.');
  if (!request.revocation_path_id) reasons.push('Revocation path is missing.');
  if (!request.expires_at) reasons.push('Expiry is missing.');
  else if (new Date(request.expires_at).getTime() <= new Date(request.now).getTime()) return { request_id: request.request_id, disposition: 'EXPIRED', reasons: ['Agent request is expired.'], permission_manifest_id: request.permission_manifest_id, revocation_path_id: request.revocation_path_id, external_stop_path_id: request.external_stop_path_id, agent_authority: false, tool_authority_granted: false, execution_started: false };
  if (!request.maintenance_only) reasons.push('Agent task is not restricted to system maintenance.');
  if (request.credentials_present) reasons.push('Live credentials are present in the agent request.');
  if (request.live_connection) reasons.push('Live connection is present in the agent request.');
  const candidates = lanes.filter((lane) => request.candidate_lane_ids.includes(lane.lane_id));
  if (!candidates.length) reasons.push('No candidate lane matches.');
  if (candidates.length > 1) reasons.push('Multiple candidate lanes require human selection.');
  const disposition = reasons.length ? (reasons.some((reason) => reason.includes('credentials') || reason.includes('Live connection') || reason.includes('expired')) ? 'DENY' : 'HOLD_FOR_HUMAN_REVIEW') : 'ROUTE_TO_LANE';
  return { request_id: request.request_id, disposition, reasons, selected_lane_id: candidates.length === 1 ? candidates[0].lane_id : undefined, permission_manifest_id: request.permission_manifest_id, revocation_path_id: request.revocation_path_id, external_stop_path_id: request.external_stop_path_id, agent_authority: false, tool_authority_granted: false, execution_started: false };
}
