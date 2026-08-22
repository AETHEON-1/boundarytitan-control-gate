import type { RoboticsLifecycleRecord } from '../types/robotics-system-authority-lifecycle-contracts';

/**
 * Read-only completeness assessment. It cannot certify a robotics system,
 * grant motion authority, or declare regulatory compliance.
 */
export function assessRoboticsLifecycle(record: RoboticsLifecycleRecord): {
  status: 'HOLD' | 'HUMAN_REVIEW_REQUIRED';
  missing: string[];
  uncertainty: string[];
  machine_authority_boundary: 'NO_MOTION_AUTHORITY_NO_CERTIFICATION_NO_COMPLIANCE_CLAIM';
} {
  const missing: string[] = [];
  if (!record.identity.system_id || !record.identity.system_class) missing.push('system classification');
  if (!record.identity.jurisdiction) missing.push('jurisdiction');
  if (!record.identity.applicable_standard_references.length) missing.push('applicable standards register');
  if (!record.integration.workspace_boundary_reference) missing.push('workspace boundary');
  if (!record.integration.safety_controller_ids.length) missing.push('safety controller');
  if (record.integration.uninspected_surfaces.length) missing.push('uninspected integration surfaces');
  if (!record.human_roles.some((role) => role.role === 'STOP_AUTHORITY' && role.verified)) missing.push('verified stop authority');
  if (!record.human_roles.some((role) => role.role === 'RECOVERY_OWNER' && role.verified)) missing.push('verified recovery owner');
  if (record.energy_control.energy_sources.length === 0) missing.push('energy sources');
  if (record.energy_control.stored_energy_state === 'UNKNOWN') missing.push('stored-energy state');
  if (record.energy_control.group_lockout_state === 'UNKNOWN') missing.push('group lockout state');
  if (record.ground_truth_records.length === 0) missing.push('ground-truth record');
  if (record.ground_truth_records.some((item) => item.evidence_state !== 'SUPPORTED')) missing.push('supported ground-truth evidence');
  if (!record.stop_path_reference) missing.push('stop-path reference');
  if (!record.recovery_reference) missing.push('recovery procedure');
  if (!record.decommissioning_reference) missing.push('decommissioning procedure');
  return { status: missing.length ? 'HOLD' : 'HUMAN_REVIEW_REQUIRED', missing, uncertainty: record.uncertainty, machine_authority_boundary: 'NO_MOTION_AUTHORITY_NO_CERTIFICATION_NO_COMPLIANCE_CLAIM' };
}
