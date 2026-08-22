import { laneRegistry } from '../fixtures/lane-registry';
import { routeLane } from '../workflows/lane-router';

test('routes a bounded request without transferring authority', () => {
  const result = routeLane({ request_id: 'route-1', summary: 'inspect robotics brake evidence', candidate_lane_ids: ['robotics'], owner_id: 'owner-1', external_stop_path_id: 'stop-1' }, laneRegistry);
  expect(result.route_status).toBe('ROUTED_FOR_PREPARATION');
  expect(result.selected_lane_id).toBe('robotics');
  expect(result.authority_transferred).toBe(false);
  expect(result.owner_assigned).toBe(false);
});

test('does not silently choose between multiple lanes', () => {
  const result = routeLane({ request_id: 'route-2', summary: 'review an agent robotics action', candidate_lane_ids: ['agent', 'robotics'], owner_id: 'owner-1', external_stop_path_id: 'stop-1' }, laneRegistry);
  expect(result.route_status).toBe('HUMAN_LANE_SELECTION_REQUIRED');
});

test('holds routing when owner or stop path is absent', () => {
  const result = routeLane({ request_id: 'route-3', summary: 'publish result', candidate_lane_ids: ['publication'], owner_id: undefined, external_stop_path_id: undefined }, laneRegistry);
  expect(result.route_status).toBe('HUMAN_LANE_SELECTION_REQUIRED');
  expect(result.reasons).toEqual(expect.arrayContaining(['Owner is not supplied.', 'External stop path is not supplied.']));
});
