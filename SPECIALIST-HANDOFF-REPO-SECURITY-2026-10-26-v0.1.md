# BoundaryTitan repository security handoff

Date: October 26, 2026

Repository: [AETHEON-1/boundarytitan-control-gate](https://github.com/AETHEON-1/boundarytitan-control-gate)

Disposition: CI hardening merged; merge enforcement not enabled; dependency findings require triage. This is a specialist review package, not a completed security audit, independent validation, or certification.

## What needs attention

PR #110 is merged and the merged commit's verification job succeeded. However, its fresh `npm ci` reported **four vulnerabilities: one moderate, two high and one critical**. The job continued and passed. Package identities, advisory identifiers, dependency paths and application-specific exploitability were not established from the retrieved log.

**Requiring the existing `verify` check would block failed verification, but would not block the dependency findings observed in this successful run.** A specialist must distinguish these two controls before describing the repository as security-gated.

GitHub's branch response still reports `protected: false`, and the repository ruleset list is empty. Protection could not be enabled through the available GitHub connection, which exposes no administration-write operation. The browser route was signed out and authentication was not completed. No merge rule was applied.

## Exact change and source identity

- Base main commit: `2e3296cad8d0b8416b336d0b6fd973264243f6ad`.
- Patch commit: `fb9974d8f1a1944c362e6c404a9cf4163a4819f4`.
- [Pull request #110](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/110): merged October 26, 2026 at 23:45:54 UTC / 6:45:54 p.m. CDT.
- Merge commit and main head at retrieval: `2bfdd8f9d015fe2f7a16a4fac81a460f593bd456`.
- Evidence retrieved during preparation on October 26, 2026; this is a point-in-time record. Refresh live settings and main before implementation.

The user expressly instructed the assistant to merge the prepared patch and then enable rules blocking merges when checks fail. The first transition completed; the second did not. This document does not extend that instruction to dependency upgrades, new integrations, live exploitation, publication, deployment or certification.

## What changed

| File | Merged change | Intended effect and limit |
| --- | --- | --- |
| `.github/workflows/verify.yml` | Node.js 20 replaced with `24.22.1`; ten-minute job timeout | Moves project verification off an end-of-life runtime; bounds execution duration. Does not prove absence of vulnerabilities. |
| Both workflow files | Existing action major versions replaced with full upstream commit hashes | Removes dependence on movable action tags at those references. This does not audit the actions or lock all transitive code. |
| Both workflow files | Checkout configured with `persist-credentials: false` | Prevents checkout from retaining Git credentials in repository configuration. The sensor still intentionally receives its read-only token for collection. |
| `.github/dependabot.yml` | Weekly `github-actions` ecosystem added alongside existing npm updates | Creates an update-discovery path for Actions. It does not merge updates, enforce remediation deadlines or guarantee updates to the workflow's `node-version` value. |
| `CURRENT-REPOSITORY-MANIFEST.json` | Current file digests and sizes refreshed | Preserves the repository's existing tree-consistency check. Historical release records and doctrine were not revised. A matching manifest is not independent integrity verification. |

Pinned actions: checkout `11d5960a326750d5838078e36cf38b85af677262`; setup-node `49933ea5288caeca8642d1e84afbd3f7d6820020`; setup-python `a26af69be951a213d495a4c3e4e4022e16d87065`; upload-artifact `ea165f8d65b6e75b540449e92b4886f43607fa02`. These resolved from the respective official repositories' existing major-version references. Full action-source review was not performed. The action execution runtime and the Node runtime installed for the project are separate dependency surfaces.

## Verification evidence and corrections

Local checks on Node.js 24.22.1 completed successfully: TypeScript typecheck; 36 Jest suites / 112 tests; three Python handoff tests; five interaction-sensor fixture tests; YAML parsing; action-hash and credential-setting checks; repository-state verification; and whitespace validation.

Two local failures remain in the correction record:

1. A fresh offline npm installation failed with `ENOTCACHED`. Local tests then used existing dependencies whose lockfile matched the target. Those tests did not establish fresh-install reproducibility.
2. The first repository-state check correctly reported drift in the three edited configuration files. The current-tree manifest was regenerated using the existing repository script; the check then succeeded. The checker was not weakened.

The subsequent GitHub run resolved the fresh-install uncertainty for that hosted run: its log records Node.js `v24.22.1`, a completed `npm ci`, 286 packages added / 287 packages audited, 36 passing Jest suites / 112 tests, three passing Python handoff tests, and successful repository-state verification for 286 repository files. Installation and audit counts describe that run and should not be treated as a universal package inventory.

The five interaction-sensor fixture tests were run locally; the merged push verification job does not run those additional fixtures. The sensor itself was not run locally against live GitHub data during this patch validation.

Most importantly, the successful install also reported the four vulnerabilities above. **Install success, test success and vulnerability absence are distinct claims.** No `npm audit fix` or automatic dependency repair was performed. The prior statement that fresh installation was unverified is superseded only for the observed GitHub run; complete dependency security remains unresolved.

## Primary evidence register

1. [PR #110 and its four-file diff](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/110) — merged change, authorizing context, patch and merge identities.
2. [Merged-main verification run 40421964528](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40421964528) and [verify job 121918317132](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40421964528/job/121918317132) — fresh install, test results, audit summary and manifest verification. This is the same repository's CI evidence, not an independent security assessment.
3. [PR verification run 40421905277](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40421905277) and [branch verification run 40421892486](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/40421892486) — both completed successfully before merge.
4. [Main branch API](https://api.github.com/repos/AETHEON-1/boundarytitan-control-gate/branches/main) — observed main head and `protected: false`.
5. [Repository rulesets API](https://api.github.com/repos/AETHEON-1/boundarytitan-control-gate/rulesets) — observed empty list. Do not substitute an empty ruleset list alone for all possible protection-state evidence.
6. [Merged source snapshot](https://github.com/AETHEON-1/boundarytitan-control-gate/tree/2bfdd8f9d015fe2f7a16a4fac81a460f593bd456) — inspect `.github/workflows/verify.yml`, `.github/workflows/interaction-sensor.yml`, `.github/dependabot.yml`, `.github/CODEOWNERS`, `SECURITY.md`, `package.json` and `package-lock.json`.

The branch-protection detail API returned HTTP 403 (`Resource not accessible by integration`). Dependabot-alert and code-scanning-alert reads were rejected as unsupported endpoints. Those failures do not establish that alerts or protections are absent. A full Codex Security audit could not start because required preflight reference material was unavailable; no complete code-audit result exists.

## Bounded specialist question

Does the configured GitHub control path actually prevent a main-branch update when the intended verification evidence is absent or failing, and which dependency findings remain outside that gate?

Primary discipline: repository security / CI supply-chain engineering. Review the concrete repository and enforcement path, not BoundaryTitan as a whole. Preserve counterexamples and scope limits; do not treat public availability, silence or a passing check as specialist assent.

## Specialist work requested

### A. Triage the dependency findings first

Retrieve a structured dependency-audit result for the exact merged lockfile in a clean, approved environment. Preserve tool version, timestamp, advisory IDs, affected versions, direct/transitive paths, platform conditions, fixes and source records. Separate a vulnerable development dependency from a reachable execution path, and separate reachable execution from credential or downstream access.

The manifest declares development dependencies, and no production dependencies were declared in the inspected root package. Development dependencies still execute in CI; that label does not remove their authority or risk. Determine what each relevant package can read, execute or transmit during install and testing. No secret leak, malicious package, exploited CI run or production compromise was established by this review.

Propose the smallest compatible upgrades or scoped exceptions. Define an explicit audit policy and owner before making an audit result a required gate; do not silently suppress critical findings or run broad automatic fixes. A count or severity label alone does not establish exploitability, but a successful unit-test run does not dispose of the finding either.

### B. Enable and verify the merge gate

Minimum intended behavior: ordinary updates to `main` must go through a pull request and cannot merge when the required `verify` check is missing, pending or failing. Require the checked revision to be current with the target branch, or use a deliberately chosen merge-queue equivalent. Bind the required check to the expected GitHub Actions producer where supported; the observed producer app ID was `15368`.

Inspect existing rules first, then configure an active main-targeting ruleset or equivalent protection. Record the exact rule ID, target, required context, producer binding, freshness behavior, enforcement mode and every bypass actor. The owner must choose any exceptional bypass policy explicitly; a bypass is not ordinary enforced denial. Reviewer requirements should reflect actual available reviewers rather than create an unusable self-approval requirement.

Determine whether workflow, manifest and control-file changes receive effective review. `CODEOWNERS` currently routes all files to `@AETHEON-1`; the file alone does not enforce review. Required checks can themselves be changed by sufficiently privileged code or settings updates. Document who can alter the gate, what review applies and what independent evidence survives such a change.

### C. Independently test denial and recovery

Proposal only — NOT TESTED. In a separately authorized disposable repository or bounded test branch with equivalent rules, attempt a merge with a deliberately failing check, an absent check, a pending check, a stale checked commit and a mismatched check producer. Inspect direct-push, administrator and app bypass behavior without disabling real protections. Preserve the rejected operation and server response, not merely a red dashboard.

Measure when the refusal becomes binding relative to merge execution; do not assume a latency value. Restore the fixture to a successful check and confirm the permitted path works without weakening rules. Preserve audit history, recovery instructions and named operators. Do not deliberately break main or create a live failure merely to demonstrate a gate.

## Authority, ownership and remaining judgment

Repository owner and settings authority: `@AETHEON-1`. Independent security reviewer: not assigned. Dependency-triage owner and remediation timetable: pending owner assignment. CI produces test evidence; it does not accept residual risk. GitHub enforces whatever rules are actually configured; sufficiently privileged administrators may still change them.

First unsupported arrow: **successful `verify` result → independently established security or effective merge denial**. The audit summary and current unprotected state show why these propositions must remain separate.

Evidence that would change this disposition: independently reviewed dependency attribution and remediation; retrieved active protection configuration; attributable denied-merge evidence for the intended cases; checked bypass and recovery paths; and human disposition of residual findings. Alternative explanations remain open: audit findings may be unreachable or confined to a development use, while tests may accurately establish the behavior they cover. Neither alternative closes the other claim.

External stop before merge should be an enforced GitHub rule controlled by the human owner, with explicit review of privileged bypasses. At the recorded cutoff, that rule was not established. Reverting a merged commit is a recovery action; it does not undo any disclosure, execution or external effects that may already have occurred. No such effects were established here.

Current state: **hardening merged; CI behavior observed; dependency triage pending; merge gate not enabled; independent denial/recovery testing not performed; specialist disposition pending.**

Publication scope: the human owner explicitly authorized making this handoff public alongside the repository's existing specialist handoffs. This repository edition adds that publication record and the bounded review question to the prepared document. It does not claim delivery to a named specialist, acknowledgment, independent review or acceptance. Review remains pending. Public availability does not certify the repository or authorize additional consequential action. CAN ⊬ MAY.
