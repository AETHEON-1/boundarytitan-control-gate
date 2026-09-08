import { isActiveUtcWindow, parseUtcTimestamp } from '../types/temporal';

test('accepts only canonical UTC timestamps', () => {
  expect(parseUtcTimestamp('2026-09-08T12:00:00Z')).toBe(1788868800000);
  expect(parseUtcTimestamp('2026-09-08T12:00:00.000Z')).toBe(1788868800000);
  expect(parseUtcTimestamp('2026-09-08')).toBeUndefined();
  expect(parseUtcTimestamp('2026-09-08T12:00:00-04:00')).toBeUndefined();
});

test('requires an active half-open validity window', () => {
  expect(isActiveUtcWindow('2026-09-08T12:00:00Z', '2026-09-08T13:00:00Z', '2026-09-08T12:30:00Z')).toBe(true);
  expect(isActiveUtcWindow('2026-09-08T12:00:00Z', '2026-09-08T13:00:00Z', '2026-09-08T13:00:00Z')).toBe(false);
});
