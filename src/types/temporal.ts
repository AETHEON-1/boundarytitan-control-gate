/**
 * Shared deterministic time primitives.
 *
 * These helpers validate timestamps; they do not establish trust in the
 * clock, the source, the owner, or the authority represented by a record.
 */

const UTC_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/;

export function parseUtcTimestamp(value: string | undefined): number | undefined {
  if (!value || !UTC_TIMESTAMP.test(value)) return undefined;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? undefined : parsed;
}

export function isActiveUtcWindow(start: string | undefined, end: string | undefined, now: string): boolean {
  const startMs = parseUtcTimestamp(start);
  const endMs = parseUtcTimestamp(end);
  const nowMs = parseUtcTimestamp(now);
  return startMs !== undefined && endMs !== undefined && nowMs !== undefined && startMs <= nowMs && nowMs < endMs;
}
