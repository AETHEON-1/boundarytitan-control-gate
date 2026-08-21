import type { HunterContext, PermissionRecord, ZombieHunterOutput } from '../types/zombie-permission-hunter-contracts';
import { inspectPermission } from './zombie-permission-hunter';

/**
 * Batch preparation only. The function evaluates supplied records and returns
 * independent findings. It performs no authorization, revocation, or closure.
 */
export function inspectPermissions(
  permissions: PermissionRecord[],
  context: HunterContext,
  now = new Date(context.as_of),
): ZombieHunterOutput[] {
  return permissions.map((permission) => inspectPermission(permission, context, now));
}
