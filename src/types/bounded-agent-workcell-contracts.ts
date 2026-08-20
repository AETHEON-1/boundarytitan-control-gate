/**
 * Bounded Agent Workcell candidate contracts.
 * Declaration only: no agent runtime, scheduling, tool invocation, authority,
 * closure, reopening, credential use, or external-state interaction exists.
 */

export type PreparationOperation =
  | 'DETECT'
  | 'SORT'
  | 'SUMMARIZE'
  | 'COMPARE'
  | 'MAP'
  | 'SIMULATE'
  | 'DRAFT'
  | 'PREPARE';

export type WorkcellState = 'DECLARED' | 'ACTIVE' | 'HELD' | 'EXPIRED' | 'REVOKED';

export interface BoundedAgentIdentity {
  agent_id: string;
  agent_version: string;
  contract_reference: string;
  permitted_operations: PreparationOperation[];
  prohibited_operations: string[];
}

export interface BoundedAgentWorkcell {
  id: string;
  agent: BoundedAgentIdentity;
  task_wall_id: string;
  lane_id: string;
  deliverable_reference: string;
  accountable_human_owner_id: string;
  delegation_reference: string;
  external_stop_path_id: string;
  handoff_package_id?: string;
  closure_conditions: string[];
  reopen_conditions: string[];
  state: WorkcellState;
  declared_at: string;
  expires_at: string;
}
