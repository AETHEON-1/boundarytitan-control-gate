import { completeReviewReceipt, missingOwnerReviewReceipt, staleEvidenceReviewReceipt, unknownDependencyReviewReceipt } from '../fixtures/review-surface-shapes';
import { checkReceiptCompleteness, deriveReviewStatus, renderReviewSurface } from '../review/review-surface';

describe('read-only review surface', () => {
  test('renders a complete packet as review-eligible, never approved', () => {
    expect(deriveReviewStatus(completeReviewReceipt)).toBe('GREEN_ELIGIBLE');
    expect(renderReviewSurface(completeReviewReceipt)).toContain('review eligibility only; not approval or permission');
  });
  test('downgrades stale evidence', () => {
    expect(deriveReviewStatus(staleEvidenceReviewReceipt)).toBe('YELLOW');
    expect(checkReceiptCompleteness(staleEvidenceReviewReceipt).map((finding) => finding.code)).toContain('NONCURRENT_EVIDENCE');
  });
  test('holds packets with missing owners', () => {
    expect(deriveReviewStatus(missingOwnerReviewReceipt)).toBe('RED');
    expect(checkReceiptCompleteness(missingOwnerReviewReceipt).map((finding) => finding.code)).toContain('MISSING_OWNER');
  });
  test('downgrades unknown dependency context without requiring artificial dependencies', () => {
    expect(deriveReviewStatus(unknownDependencyReviewReceipt)).toBe('YELLOW');
    expect(checkReceiptCompleteness(unknownDependencyReviewReceipt).map((finding) => finding.code)).toContain('UNKNOWN_DEPENDENCY_CONTEXT');
  });
  test('separates dependencies from actual reinspection candidates', () => {
    const html = renderReviewSurface(completeReviewReceipt);
    expect(html).toContain('What does this rely on?');
    expect(html).toContain('What has changed underneath it?');
  });
  test('does not render action controls', () => {
    const html = renderReviewSurface(completeReviewReceipt);
    expect(html).not.toMatch(/<button|<form|approve|release|execute/i);
  });
  test('holds expired, invalid, and blank evidence metadata', () => {
    expect(deriveReviewStatus({ ...completeReviewReceipt, expiry: '2000-01-01T00:00:00Z' })).toBe('RED');
    expect(deriveReviewStatus({ ...completeReviewReceipt, expiry: 'not-a-date' })).toBe('RED');
    expect(deriveReviewStatus({ ...completeReviewReceipt, evidence: [{ ...completeReviewReceipt.evidence[0], claim: '   ' }] })).toBe('RED');
  });
});
