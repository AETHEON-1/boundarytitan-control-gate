import type { ConsequenceReceiptV2 } from '../types/consequence-receipt-v2-contracts';

export type ReviewSurfaceStatus = 'GREEN_ELIGIBLE' | 'YELLOW' | 'RED' | 'BLACK';

export interface CompletenessFinding { code: string; message: string; severity: 'YELLOW' | 'RED' | 'BLACK'; }

export interface ReviewSurfaceModel {
  receipt_id: string;
  status: ReviewSurfaceStatus;
  findings: CompletenessFinding[];
  scope: string;
  expected_consequence: string;
  affected_surface: string;
  reversibility: string;
  accountable_owner: string;
  decision_owner: string;
  evidence: ConsequenceReceiptV2['evidence'];
  dependency_context_state: ConsequenceReceiptV2['dependency_context_state'];
  dependencies: string[];
  reinspection_candidates: string[];
  unresolved_questions: string[];
  stop_path_owner: string;
  revocation_authority: string;
  who_can_still_say_no: string[];
  expiry: string;
}

export function checkReceiptCompleteness(receipt: ConsequenceReceiptV2): CompletenessFinding[] {
  const findings: CompletenessFinding[] = [];
  if (!receipt.accountable_human_owner_id || !receipt.decision_owner_id) findings.push({ code: 'MISSING_OWNER', message: 'A named human owner is required.', severity: 'RED' });
  if (!receipt.external_stop_path_id || !receipt.stop_path_owner_id) findings.push({ code: 'MISSING_STOP_PATH', message: 'An external stop path and owner are required.', severity: 'RED' });
  if (!receipt.revocation_authority_id) findings.push({ code: 'MISSING_REVOCATION_AUTHORITY', message: 'A revocation authority is required.', severity: 'YELLOW' });
  if (!receipt.reversibility || receipt.reversibility === 'UNKNOWN') findings.push({ code: 'UNKNOWN_REVERSIBILITY', message: 'Reversibility must be stated.', severity: 'YELLOW' });
  if (receipt.evidence.length === 0) findings.push({ code: 'MISSING_EVIDENCE', message: 'Evidence is required.', severity: 'RED' });
  if (receipt.evidence.some((item) => item.freshness_status !== 'CURRENT')) findings.push({ code: 'NONCURRENT_EVIDENCE', message: 'Evidence is stale or freshness is unknown.', severity: 'YELLOW' });
  if (receipt.evidence.some((item) => !item.evidence_custodian_id)) findings.push({ code: 'MISSING_EVIDENCE_CUSTODY', message: 'Evidence custody is required.', severity: 'YELLOW' });
  if (receipt.dependency_context_state === 'UNKNOWN') findings.push({ code: 'UNKNOWN_DEPENDENCY_CONTEXT', message: 'Dependency context is unknown.', severity: 'YELLOW' });
  if (receipt.unresolved_questions.length === 0) findings.push({ code: 'MISSING_UNRESOLVED_QUESTIONS', message: 'Open questions must be visible.', severity: 'YELLOW' });
  if (receipt.who_can_still_say_no.length === 0) findings.push({ code: 'MISSING_DENIAL_PATH', message: 'A visible denial path is required.', severity: 'RED' });
  if (!receipt.expiry) findings.push({ code: 'MISSING_EXPIRY', message: 'Receipt expiry is required.', severity: 'YELLOW' });
  return findings;
}

export function deriveReviewStatus(receipt: ConsequenceReceiptV2, findings = checkReceiptCompleteness(receipt)): ReviewSurfaceStatus {
  if (findings.some((finding) => finding.severity === 'BLACK')) return 'BLACK';
  if (findings.some((finding) => finding.severity === 'RED')) return 'RED';
  if (findings.length > 0 || receipt.review_state !== 'HELD_FOR_HUMAN_REVIEW') return 'YELLOW';
  return 'GREEN_ELIGIBLE';
}

export function toReviewSurfaceModel(receipt: ConsequenceReceiptV2): ReviewSurfaceModel {
  const findings = checkReceiptCompleteness(receipt);
  return { receipt_id: receipt.id, status: deriveReviewStatus(receipt, findings), findings, scope: receipt.scope, expected_consequence: receipt.expected_consequence, affected_surface: receipt.affected_surface, reversibility: receipt.reversibility, accountable_owner: receipt.accountable_human_owner_id, decision_owner: receipt.decision_owner_id, evidence: receipt.evidence, dependency_context_state: receipt.dependency_context_state, dependencies: receipt.dependency_references, reinspection_candidates: receipt.reinspection_candidate_references, unresolved_questions: receipt.unresolved_questions, stop_path_owner: receipt.stop_path_owner_id, revocation_authority: receipt.revocation_authority_id, who_can_still_say_no: receipt.who_can_still_say_no, expiry: receipt.expiry };
}

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] as string);
const list = (items: string[]) => `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;

/** Static rendering only. This string contains no forms, controls, network calls, or actions. */
export function renderReviewSurface(receipt: ConsequenceReceiptV2): string {
  const model = toReviewSurfaceModel(receipt);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>BoundaryTitan Review Packet</title></head><body><main><h1>BoundaryTitan Review Packet</h1><p>Status: <strong>${model.status}</strong> — review eligibility only; not approval or permission.</p><section><h2>What is proposed?</h2><p>${escapeHtml(model.scope)}</p><h2>What could change?</h2><p>${escapeHtml(model.expected_consequence)}</p><h2>Who owns the consequence?</h2><p>Accountable owner: ${escapeHtml(model.accountable_owner)}. Decision owner: ${escapeHtml(model.decision_owner)}.</p><h2>What evidence supports it?</h2>${list(model.evidence.map((item) => `${item.claim} (${item.freshness_status}; custodian: ${item.evidence_custodian_id})`))}<h2>What is uncertain?</h2>${list(model.unresolved_questions)}<h2>What does this rely on?</h2><p>Context: ${escapeHtml(model.dependency_context_state)}</p>${list(model.dependencies)}<h2>What has changed underneath it?</h2>${list(model.reinspection_candidates)}<h2>Who can stop it?</h2><p>Stop-path owner: ${escapeHtml(model.stop_path_owner)}. Revocation authority: ${escapeHtml(model.revocation_authority)}.</p><h2>Who can still say no?</h2>${list(model.who_can_still_say_no)}<h2>Completeness findings</h2>${list(model.findings.map((finding) => `${finding.severity}: ${finding.message}`))}<p>Expires: ${escapeHtml(model.expiry)}</p></section></main></body></html>`;
}
