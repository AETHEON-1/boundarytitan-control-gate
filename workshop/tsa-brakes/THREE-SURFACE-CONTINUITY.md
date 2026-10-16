# BoundaryTitan Three-Surface Continuity Protocol v0.1
**Status: YELLOW | proposed sync contract | review-only | no automatic publication or deployment**

## Surfaces
- **GitHub:** https://github.com/AETHEON-1/boundarytitan-control-gate (versioned architecture, source, tests, correction/failure ledgers). Draft PR #82 is a candidate, not merged implementation.
- **Task:** Boundary Integrity Audit, task ID `6a9c5ef8e6988191ace958acbb114ba0` (scheduled read-only comparison, drift and omission detection, material alerts).
- **Public archive:** https://boundarytitan.wordpress.com/ (human-published articles and timestamped claims). Public article is not a certification or substitute for tested code.

## Authority / direction
```
GITHUB (versioned candidate and baseline) <--> TASK (read-only reconciliation) <--> WORDPRESS (public record)
            |                                     |
            +----------> HUMAN DISPOSITION <------+
```
This is a logical evidence comparison, not a bidirectional write integration. Do not automatically commit from task, modify WordPress, merge PR, deploy, freeze doctrine or self-admit findings.

## Reconciliation key and record
Every material candidate should include:
```json
{
  "schema": "BT-CONTINUITY-v0.1",
  "findingId": "human-readable stable ID",
  "observedAt": "ISO8601 or UNKNOWN",
  "taskId": "6a9c5ef8e6988191ace958acbb114ba0",
  "repo": "AETHEON-1/boundarytitan-control-gate",
  "ref": "exact branch or tag",
  "commitSha": "verified commit or UNKNOWN",
  "pullRequest": "exact PR URL/status or UNKNOWN",
  "filePaths": [],
  "articleUrls": [],
  "articlePublicationOrUpdateDates": [],
  "claim": "bounded claim",
  "documentedRecord": [],
  "boundedInference": [],
  "openQuestions": [],
  "contradictions": [],
  "omissions": [],
  "firstUnsupportedArrow": "or UNKNOWN",
  "evidenceState": "SUPPORTED | CONTRADICTED | INDETERMINATE | TEST INVALID | NOT TESTED",
  "repoDelivery": "NOT_ATTEMPTED | VERIFIED | FAILED",
  "wordpressDelivery": "NOT_ATTEMPTED | VERIFIED | FAILED",
  "humanDisposition": "PENDING",
  "executionAuthorized": false,
  "publicationAuthorized": false
}
```
The record must never fabricate a commit, run receipt, article date, review, or custody attestation.

## Task reconciliation loop
1. Read current default branch and named draft PR separately. Record precise SHA, merge status, and accessibility; do not equate a branch with main.
2. Inspect relevant published WordPress article pages and dates when publicly retrievable. If inaccessible, record SOURCE_INACCESSIBLE; do not infer deletion or absence.
3. Compare claim-by-claim: public claim vs repository evidence vs task finding. Flag unsupported upgrades, stale references, corrected claims not propagated, orphaned tests, missing controls, and omitted consequence paths.
4. Compare current snapshot to last **actually accessible** snapshot. If previous snapshot is unavailable, mark continuity gap; never invent delta or run history.
5. Perform a new independent unknown-unknown challenge using [UNKNOWN-UNKNOWNS-CHALLENGE-BATTERY.md](UNKNOWN-UNKNOWNS-CHALLENGE-BATTERY.md) and ask what is missing from the battery itself.
6. Prepare a human-reviewable discrepancy record with exact links and evidence states. Notify only on material drift, failed access, actionable contradiction, correction propagation failure, or human decision.
7. After human approval, a separate explicitly authorized publication/repo action may be requested; a task report is never permission to execute it.

## Sync health states
- ALIGNED_OBSERVED: inspected references support bounded matching claims (not proof).
- DRIFT_DETECTED: concrete material mismatch with exact sources.
- PARTIAL_VISIBILITY: one or more surfaces inaccessible or incomplete.
- BASELINE_MISSING: prior comparable snapshot not available.
- REVIEW_PENDING: discrepancy awaits human disposition.
- NOT_CHECKED: no actual reconciliation run.

## Privacy and publication boundary
Never upload private task contents, credentials, victim details, personal job-search records or unpublished investigations to a public repo or WordPress. Published article claims are historical public records, not mutable machine-owned truth. Corrections require human-approved publication.

## Current baseline
This file creates a continuity **contract**, not evidence that three-way reconciliation has run. Initial state: NOT_CHECKED. WordPress write connector not connected in this session. Independent evidence custody remains unestablished.

**CAN ⊬ MAY. No owner, no brake. No ledger, no trust.**
