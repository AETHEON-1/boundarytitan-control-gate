# BoundaryTitan Interaction Sensor: draft implementation

State: PROPOSED / UNMERGED / NOT ACTIVE. Owner: BoundaryTitan human repository owner.
Scope: GitHub-hosted, read-only observations. No authority or correctness conclusions.

## Operation
A scheduled (13:17 UTC daily) or manually dispatched workflow uses the ephemeral GITHUB_TOKEN to read public repository counters, recent stars/forks/issues, discussions, and traffic. A JSON snapshot is uploaded as a 90-day Actions artifact. Failure of any endpoint fails the workflow while retaining a report where artifact upload runs; no silent success. Note: GitHub's discussions REST route may return 404 or 410 on unsupported configurations; this remains an explicit failure until independently handled. Traffic endpoints may require elevated repository access beyond the workflow token. Treat those as known integration risks, not evidence of zero activity.

## Gaps and threats
- No email/push alert or daily digest yet; no independent notification owner.
- No historical comparison or deduplication; counts are not identities or proof of adoption.
- Pagination only covers 100 most recent records. Clones/views have a limited rolling window.
- Workflow and artifacts share GitHub administration; no independent evidence custody or brake.
- Forked PRs must never run submitted code with elevated permissions.
- The workflow can be disabled, delayed, or deleted; missing runs are unknown, not zero.
- No hidden visitor identity is available from GitHub.
- The API failure ledger records errors, but artifact upload itself may fail.

## Acceptance tests before activation
1. Run collector with fixture responses and forced 403/404/429/timeout; require explicit failures.
2. Confirm least-privilege permissions and absence of write tokens.
3. Confirm first snapshot and artifact are readable by the human owner.
4. Test skipped scheduled run and retention expiration.
5. Establish an independent digest destination and verify delivery, then compare consecutive snapshots.
6. Review notification volume and separate signal from inference.

No deployment, merging, publishing, or operational trust is implied by this draft.
CAN does not entail MAY. The owner retains final admission and stop authority.
