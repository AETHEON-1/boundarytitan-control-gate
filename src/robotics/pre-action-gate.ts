import type { RoboticsEvidenceState, RoboticsMotionProposal, RoboticsPreActionContext, RoboticsPreActionResult } from '../types/robotics-pre-action-contracts';

/**
 * Read-only pre-action assessment. It never grants motion authority.
 */
export function assessRoboticsPreAction(proposal: RoboticsMotionProposal, context: RoboticsPreActionContext): RoboticsPreActionResult {
  const reasons: string[] = [];
  const unknowns = [...context.world_state.unknowns];
  const decisions: string[] = [];
  let evidenceState: RoboticsEvidenceState = 'SUPPORTED';

  if (context.world_state.sensor_conflicts.length) {
    reasons.push('Sensor conflicts remain unresolved.');
    evidenceState = 'INDETERMINATE';
  }
  if (context.world_state.occlusions.length) {
    unknowns.push('Occlusions: ' + context.world_state.occlusions.join(', '));
    evidenceState = 'INDETERMINATE';
  }
  if (!context.world_state.independent_measurement_ids.length) {
    reasons.push('No independent measurement is recorded.');
    evidenceState = 'NOT_TESTED';
  }
  if (context.stop_state.availability !== 'AVAILABLE') reasons.push('External stop path is unavailable or unknown.');
  if (context.stop_state.residual_energy_state !== 'CONTROLLED') reasons.push('Residual energy is not established as controlled.');
  if (context.stop_state.measured_stop_latency_ms === undefined) reasons.push('Stop latency is not measured.');
  if (context.stop_state.maximum_allowed_stop_latency_ms !== undefined && context.stop_state.measured_stop_latency_ms !== undefined && context.stop_state.measured_stop_latency_ms > context.stop_state.maximum_allowed_stop_latency_ms) reasons.push('Measured stop latency exceeds the declared maximum.');
  if (!context.human_release_present || !context.human_release_owner_id) { reasons.push('Human release is absent or unnamed.'); decisions.push('Identify the external human release owner.'); }
  if (!context.permission_valid) { reasons.push('Motion permission is not established.'); decisions.push('Resolve permission status externally.'); }
  if (context.task_expired) { reasons.push('Task envelope is expired.'); decisions.push('Reconstitute authority before considering motion.'); }
  if (context.communication_state !== 'AVAILABLE') reasons.push('Communication state is not fully available.');
  if (proposal.reversibility === 'UNKNOWN') reasons.push('Motion reversibility is unknown.');

  const hold = reasons.length > 0;
  if (hold) decisions.push('Hold motion and preserve the evidence.');
  return {
    proposal_id: proposal.id,
    gate_state: hold ? 'HOLD' : 'MOTION_ELIGIBLE_FOR_EXTERNAL_DECISION',
    evidence_state: evidenceState,
    reasons,
    unknowns,
    required_human_decisions: decisions,
    motion_authority_granted: false,
    world_model_is_authority: false,
    human_translation_key: {
      what_model_estimates: 'The world model estimates the state represented by ' + context.world_state.id + '.',
      what_is_independently_measured: context.world_state.independent_measurement_ids.join(', ') || 'None recorded.',
      what_remains_unknown: unknowns,
      consequence: proposal.affected_surface + ' / force: ' + proposal.planned_force + ' / energy: ' + proposal.planned_energy,
      who_can_still_say_no: context.human_release_owner_id ? [context.human_release_owner_id, context.stop_state.stop_owner_id] : [context.stop_state.stop_owner_id],
      next_permitted_step: hold ? 'Human review or evidence collection; no motion.' : 'External human decision; this result is not permission.',
    },
  };
}
