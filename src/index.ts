/** Public read-only BoundaryTitan preparation surface. */
export { assessCanMayTransition } from './can-may/universal-kernel';
export { checkReceiptCompleteness, deriveReviewStatus, renderReviewSurface, toReviewSurfaceModel } from './review/review-surface';
export { assessSwitchboardAgentGate } from './workflows/switchboard-agent-gate';
export { assessBoundedRoboticsKernel } from './robotics/bounded-kernel';
export { parseUtcTimestamp, isActiveUtcWindow } from './types/temporal';

export type { CanMayKernelInput, CanMayKernelResult } from './types/can-may-kernel-contracts';
export type { ConsequenceReceiptV2 } from './types/consequence-receipt-v2-contracts';
export type { LaneDefinition } from './types/lane-contracts';
export type { SwitchboardAgentGateResult, SwitchboardAgentRequest } from './types/switchboard-agent-gate-contracts';
export type { BoundedKernelInput, BoundedKernelResult } from './types/robotics-bounded-kernel-contracts';

/** This package produces evidence and routing only; it never grants authority. */
export const MACHINE_AUTHORITY = false as const;
export const MACHINE_CERTIFICATION = false as const;
export const MACHINE_CLOSURE = false as const;
