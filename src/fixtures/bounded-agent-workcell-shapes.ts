import type { BoundedAgentWorkcell } from '../types/bounded-agent-workcell-contracts';

export const boundedAgentWorkcellShape: BoundedAgentWorkcell = {
  id: 'workcell-example-001',
  agent: {
    agent_id: 'evidence-preparer',
    agent_version: 'candidate-0.1',
    contract_reference: 'agent-contract-example-001',
    permitted_operations: ['DETECT', 'SORT', 'SUMMARIZE', 'COMPARE', 'MAP', 'SIMULATE', 'DRAFT', 'PREPARE'],
    prohibited_operations: ['AUTHORIZE', 'PUBLISH', 'SEND', 'SPEND', 'DELETE', 'SUBMIT', 'DEPLOY', 'CHANGE_PERMISSIONS', 'EXPAND_SCOPE', 'CLOSE_WORK'],
  },
  task_wall_id: 'task-wall-example-001',
  lane_id: 'evidence-preparation',
  deliverable_reference: 'handoff-draft-example-001',
  accountable_human_owner_id: 'human-owner-example',
  delegation_reference: 'delegation-example-001',
  external_stop_path_id: 'external-stop-example-001',
  closure_conditions: ['Named human owner records disposition.'],
  reopen_conditions: ['Named human owner records material delta.'],
  state: 'DECLARED',
  declared_at: '2026-08-20T00:00:00Z',
  expires_at: '2026-08-27T00:00:00Z',
};
