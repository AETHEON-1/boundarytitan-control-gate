import { consequenceReceiptV2Shape } from './consequence-receipt-v2-shapes';
import type { ConsequenceReceiptV2 } from '../types/consequence-receipt-v2-contracts';

export const completeReviewReceipt: ConsequenceReceiptV2 = consequenceReceiptV2Shape;
export const staleEvidenceReviewReceipt: ConsequenceReceiptV2 = { ...consequenceReceiptV2Shape, evidence: [{ ...consequenceReceiptV2Shape.evidence[0], freshness_status: 'STALE' }] };
export const missingOwnerReviewReceipt: ConsequenceReceiptV2 = { ...consequenceReceiptV2Shape, accountable_human_owner_id: '', decision_owner_id: '' };
export const unknownDependencyReviewReceipt: ConsequenceReceiptV2 = { ...consequenceReceiptV2Shape, dependency_context_state: 'UNKNOWN', dependency_references: [] };
