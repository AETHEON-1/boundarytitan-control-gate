# BoundaryTitan Interaction Sensor

State: MERGED INTO MAIN; scheduled collection configured; first successful run NOT YET VERIFIED.
Owner: human BoundaryTitan repository owner. Scope: read-only observation only.

## Operational configuration
- GitHub Actions: .github/workflows/interaction-sensor.yml
- Schedule: daily 13:17 UTC; manual workflow_dispatch is also configured.
- Collector: scripts/interaction_sensor.py, with fixture tests at tests/test_interaction_sensor.py.
- Endpoints: repository counts, first-page stargazers, forks and issues (issues includes PR metadata). Discussion, views and clones are not collected by the native workflow.
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
