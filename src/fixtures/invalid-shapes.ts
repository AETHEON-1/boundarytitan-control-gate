/**
 * Static doctrine vectors. They document prohibited shapes only; Phase 1 does
 * not detect, reject, or enforce them at runtime.
 */
export const prohibitedAuthorityCollapseVectors = [
  { name: 'validated-to-approved', doctrine_reference: ['C-07', 'R-013'], prohibited_because: 'Validation output is not approval authority.' },
  { name: 'green-to-permission', doctrine_reference: ['C-08', 'R-012'], prohibited_because: 'Green eligibility is not permission authority.' },
  { name: 'approved-to-executed', doctrine_reference: ['R-015', 'R-016', 'R-017'], prohibited_because: 'Approval is distinct from permission, release, and execution.' },
  { name: 'receipt-to-released', doctrine_reference: ['C-09', 'R-014'], prohibited_because: 'A receipt is evidence, not release authority.' },
  { name: 'machine-to-human-decision', doctrine_reference: ['C-01', 'D-001', 'R-013'], prohibited_because: 'Machine output is not a human decision.' },
  { name: 'restart-to-prior-released-state', doctrine_reference: ['D-015', 'R-026'], prohibited_because: 'Release authority does not silently inherit across restart.' },
] as const;

/** Raw JSON-shaped negative vector for frozen-schema compatibility testing. */
export const receiptMissingRequiredFields = { receipt_id: '550e8400-e29b-41d4-a716-446655440008', schema_version: '1.0.0', created_at: '2026-08-20T10:05:00Z', proposed_action: 'prepare-summary', evidence: [], affected_surface: 'document-summary', expected_consequence: 'reviewable-summary-created', approval_state: 'PENDING', routing_color: 'GREEN_ELIGIBLE' };
