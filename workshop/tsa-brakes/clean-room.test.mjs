import test from 'node:test';
import assert from 'node:assert/strict';
import { createBrake } from './brake.mjs';

const make = () => {
  const effects = [], records = [];
  const brake = createBrake({
    clock: () => 10,
    observe: event => records.push(event),
    effect: async request => { effects.push(request); return 'ok'; }
  });
  const spec = { taskId:'case', principal:'reviewer', actions:['write'],
    resources:['fixture'], maxCommits:1, deadline:20 };
  const request = { principal:'reviewer', action:'write', resource:'fixture', payload:{} };
  brake.authorize(spec);
  return {brake, request, effects, records};
};

test('clean room: model report cannot change observed fixture effect', async () => {
  const x = make();
  await x.brake.commit(x.brake.issue('case',x.request),x.request);
  const modelReport = { claimedEffects:0 };
  assert.equal(modelReport.claimedEffects,0);
  assert.equal(x.effects.length,1);
});

test('clean room: valid facts alone do not authorize execution', async () => {
  const x = make();
  await assert.rejects(x.brake.commit({taskId:'case',token:'none',epoch:1},x.request));
  assert.equal(x.effects.length,0);
});

test('clean room: completion invalidates an issued grant', async () => {
  const x = make();
  const grant = x.brake.issue('case',x.request);
  x.brake.complete('case');
  await assert.rejects(x.brake.commit(grant,x.request));
  assert.equal(x.effects.length,0);
});

test('clean room: authorized positive control must execute', async () => {
  const x = make();
  const grant = x.brake.issue('case',x.request);
  assert.equal(await x.brake.commit(grant,x.request),'ok');
  assert.equal(x.effects.length,1);
});
