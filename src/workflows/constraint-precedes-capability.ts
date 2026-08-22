import type { ConstraintPrecedesCapabilityInput, ConstraintPrecedesCapabilityResult } from '../types/constraint-precedes-capability-contracts';

/** Admission check: constraints are evaluated before a capability can proceed to review. */
export function assessConstraintBeforeCapability(input: ConstraintPrecedesCapabilityInput): ConstraintPrecedesCapabilityResult {
  const missing: string[] = [];
  const decisions: string[] = [];
  if (!input.capability_name.trim() || !input.capability_claim.trim()) missing.push('capability definition');
  if (!input.constraints.length) missing.push('constraint envelope');
  if (!input.forbidden_actions.length) missing.push('forbidden action boundary');
  if (!input.allowed_scope.length) missing.push('allowed scope');
  if (!input.evidence_ids.length) missing.push('evidence custody');
  if (!input.constraint_owner_id) missing.push('constraint owner');
  if (!input.consequence_owner_id) missing.push('consequence owner');
  if (!input.external_stop_path_id) missing.push('external stop path');
  if (!input.revocation_path_id) missing.push('revocation path');
  if (!input.independent_measurement_ids.length) missing.push('independent measurement');
  if (input.harm_window_ms === undefined) missing.push('harm window');
  if (input.uncertainty.length) decisions.push('Preserve uncertainty before capability admission.');
  if (missing.length) decisions.push('Repair the constraint envelope before admitting capability.');
  return { assessment_id: input.assessment_id, disposition: !input.capability_name.trim() || !input.capability_claim.trim() ? 'NOT_ADMISSIBLE' : missing.length ? 'CAPABILITY_HELD_FOR_CONSTRAINT_REPAIR' : 'CAPABILITY_ADMITTED_FOR_BOUNDED_REVIEW', capability_name: input.capability_name, constraints_before_capability: true, missing_constraints: missing, verified_constraints: input.constraints, forbidden_actions: input.forbidden_actions, allowed_scope: input.allowed_scope, uncertainty: input.uncertainty, required_human_decisions: decisions, machine_authority: false, deployment_approved: false };
}
