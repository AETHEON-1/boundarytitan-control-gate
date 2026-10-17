# BoundaryTitan Interaction Sensor

State: MERGED INTO MAIN; two manual HTTP-403 failures preserved; post-repair manual run 39038591178 VERIFIED from job logs and artifact metadata. Scheduled execution and notification delivery NOT YET OBSERVED.
Owner: human BoundaryTitan repository owner. Scope: read-only observation only.

## Operational configuration
- GitHub Actions: .github/workflows/interaction-sensor.yml
- Schedule: daily 13:17 UTC; manual workflow_dispatch is also configured.
- Collector: scripts/interaction_sensor.py, with fixture tests at tests/test_interaction_sensor.py.
- Endpoints: repository counts (including aggregate stars), first-page forks and issues (issues includes PR metadata). Discussion, views and clones are not collected by the native workflow.
- Output: interaction-report.json uploaded as a workflow artifact, nominal retention 90 days. The upload step runs even after preceding step failure.
- Separate ChatGPT hourly Open-World Kernel Scout monitors material external GitHub interactions and PR/workflow status; weekly Boundary Integrity Audit reviews monitoring failures and evidence continuity. This is not guaranteed instantaneous alert delivery.

## Verification still required
1. Open Actions > Interaction sensor (read-only) > Run workflow, or wait for scheduled execution.
2. Inspect fixture-test and collector job logs, result status, JSON artifact and API failures.
3. Independently verify next scheduled run; check delayed/missing runs and artifact retention.
4. Check notifications are enabled and delivered for material external events in the existing monitor.
5. Test 403, 404, 429, malformed JSON, timeout, missing run and lost artifact; record contradictions.
6. Validate baseline comparison, event deduplication and independent evidence custody separately.

## Limitations
- The workflow is a snapshot, not a complete event ledger; first 100 items per list.
- No anonymous visitor identities. No clone/view metrics in the native collector.
- No automatic issue/PR response, repository writes, or authorization.
- A successful job is not independent proof of completeness, accuracy or delivery.
- GitHub administration controls both workflow and artifacts; external stop/custody remains unproven.
- Missing activity evidence is not evidence of zero activity.

CAN ⊬ MAY. No owner, no brake. No ledger, no trust.

## Preserved failure and repair (2026-10-17)
- Manual run 1: repository, forks and issues succeeded; individual stargazers returned HTTP 403. Fixture tests and artifact upload succeeded; collector exited 1.
- Manual run 2: same endpoint failure. X-RateLimit-Remaining=4985, Retry-After absent, GitHub request ID CC11:A1778:23AD606:74750C5:6AD37DF2. Ordinary primary rate-limit exhaustion is not supported by this evidence; exact restriction unproven.
- Repair: remove individual-stargazer listing from required endpoints, retain aggregate stargazers_count from repository metadata; no elevated token permissions. Fixture updated to assert no stargazer request.
- Loss: cannot identify individual stargazers; aggregate count does not establish who starred or why. This is a declared scope reduction, not a successful individual-stargazer test.
- Required disposition: rerun workflow, verify successful tests, collection, artifact and next scheduled execution. Do not certify from code changes alone.

## Verified manual receipt and pending schedule (2026-10-17)
- Successful manual run: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39038591178 at 33b3df7208c224cd0477beb541ed0e8f12afc514; tests, collection and upload succeeded. Artifact 12102548377; GitHub-reported digest sha256:9b077d60e9dfbece76f454e25ae77d032f96871b9bc352192a5a3106d7146a09. Metadata/logs inspected, artifact bytes not independently downloaded or custodied in this review.
- Retrieved run list: two failed and one successful manual workflow_dispatch runs; no schedule event observed. Next nominal cron occurrence after merge: 2026-10-18 13:17 UTC / 08:17 CDT. GitHub may delay/skip scheduled execution; do not infer reliability from configuration.
- Verify event=schedule, commit, fixture/collector/upload steps, artifact contents/digest and recipient delivery separately. If no run appears, record UNKNOWN; do not fabricate zero activity. This review did not add a reminder or broaden a monitor.
- PR #89's stale unmerged description was corrected, preserving the earlier wording in its dated correction account.
