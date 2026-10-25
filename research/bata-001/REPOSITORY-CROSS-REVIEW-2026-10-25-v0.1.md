# Cross-repository review | 2026-10-25 | v0.1
Status: PARTIAL REVIEW / YELLOW. NOT a complete tree audit. No execution, dependency change, merge, deployment or security claim upgrade.

## Inspection performed
Read default-branch README. Queried GitHub open issues and PRs, and searched indexed code (two queries returned no results, not evidence of absence). Reviewed issue #102, #101, #107 and PR #103, #104, #106, #108 descriptions. Reviewed public research context for three-authority experiments. Full file-by-file source inspection, current CI, dependency audit JSON, and independent runtime tests NOT PERFORMED.

## Priority register
R01 HIGH: Protected-resource direct-write bypass documented in synthetic three-authority test; source/privilege independence not proven. Preserve bypass as failure, not repaired by gate-only pass. Specialist challenge PR #82 / issue #83.
R02 HIGH: Issue #102 reports 35 aggregate npm advisories (3 moderate, 31 high, 1 critical) in pinned October 19 CI. Individual advisory identities, reachability, fixes and current count UNKNOWN. No dependency repair authorized or attempted.
R03 HIGH: PR #103 synthetic four-role isolation does not prove cross-process/privileged bypass resistance, external stop, custody or production enforcement. Independent review pending.
R04 HIGH: PR #104 manifest omission caused failed verification, with follow-up repair; PR #106 reports empty manifest despite generator exit 0, caught by readback. Preserve original failures and check readback before any claim of integrity.
R05 HIGH: Issue #101 blind experimental packets sealed, independent specialist challenge outstanding. No dispatch authorized.
R06 MEDIUM: PR #108 explicitly requires deduplication against PRs #37, #43, #97, #103; do not count test variants as independent evidence.
R07 MEDIUM: PR #106 sensor chronology corrected, proving absence-of-evidence can be misreported as evidence-of-absence. Retain earlier mistaken interpretation and corrected chronology.
R08 HIGH: BATA-001 source S2 is PROPOSED with effective date undetermined. The current effective plan, its appeal provisions, and assessment-specific applicability are unverified. This blocks legal claims.
R09 MEDIUM: BATA-001 package was created on a branch without verifying repository-state manifest inclusion or CI. A file creation commit is NOT proof of passing repository integrity checks. Require manifest reconciliation and hosted checks before claim upgrade.
R10 MEDIUM: Repository review itself is incomplete. Search-index empty results cannot certify absence of a topic. Full tree inventory, branches, CI, file bytes and provenance remain uninspected.

## Corrective dispositions
C01 Correct claims only: downgrade any description of this review as 'full repo verified' to PARTIAL REVIEW. Preserve R10.
C02 Keep source distinctions: proposal vs operative plan, structural test vs live control, passing negative-control test vs safe boundary.
C03 Do not silently modify frozen doctrine, historic failure logs, source artifacts, lockfiles, tests, CI policy, or branch protections.
C04 Before new source-level repairs, obtain complete current tree and baseline, verify manifest scheme, reproduce failing behavior in isolated environment, patch minimal files on separate branch, preserve old failure and new readback/CI results.
C05 For BATA-001, independently verify official primary URLs and exact section/page, then append source correction if required. No assertion that previous URL is broken without testing.

## Consequence receipt
Owner: Human BoundaryTitan owner. Surface: isolated research branch review document only. Evidence: named issues/PRs and README, with gaps explicit. Reversible: branch can be reverted. External stop: human owner controls branch merge and access. Who may say no: owner, independent specialists. No outreach, deployment, merge, certification or claim promotion.
