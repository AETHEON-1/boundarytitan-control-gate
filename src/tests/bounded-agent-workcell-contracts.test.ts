import { boundedAgentWorkcellShape } from '../fixtures/bounded-agent-workcell-shapes';

describe('Bounded Agent Workcell candidate shape', () => {
  test('binds one agent, lane, task wall, owner, delegation, and external stop path', () => {
    expect(boundedAgentWorkcellShape.task_wall_id).toBeTruthy();
    expect(boundedAgentWorkcellShape.lane_id).toBeTruthy();
    expect(boundedAgentWorkcellShape.accountable_human_owner_id).toBeTruthy();
    expect(boundedAgentWorkcellShape.delegation_reference).toBeTruthy();
    expect(boundedAgentWorkcellShape.external_stop_path_id).toBeTruthy();
  });

  test('allows preparation functions and forbids authority or external action', () => {
    expect(boundedAgentWorkcellShape.agent.permitted_operations).toEqual(expect.arrayContaining(['DETECT', 'PREPARE']));
    expect(boundedAgentWorkcellShape.agent.prohibited_operations).toEqual(expect.arrayContaining(['AUTHORIZE', 'PUBLISH', 'SEND', 'DEPLOY', 'CLOSE_WORK']));
  });

  test('exposes expiry and human-controlled closure/reopen conditions', () => {
    expect(boundedAgentWorkcellShape.expires_at).toBeTruthy();
    expect(boundedAgentWorkcellShape.closure_conditions.join(' ')).toMatch(/human owner/i);
    expect(boundedAgentWorkcellShape.reopen_conditions.join(' ')).toMatch(/human owner/i);
  });
});
