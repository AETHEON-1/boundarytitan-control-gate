# Manifest Authority Falsification: bounded preparation

State: PREPARED / NOT EXECUTED
Origin: draft PR #45 head b7b59dec2024f963d904fa63e8d5e79fd76d8871
Authority: human owner retains test admission, disposition, merge, and deployment decisions.
Scope: isolated disposable worktrees or temporary clones only. Do not mutate main, PR #45, historical release manifests, or the disabled workflow.

## Question

Can a verifier return success when a changed file and regenerated current manifest agree, despite the absence of independent authorization for that change?

## Existing behavior and boundaries

- scripts/verify-repository-state.js compares tracked/unignored working-tree files with CURRENT-REPOSITORY-MANIFEST.json by path, size, and SHA-256.
- Its --write mode regenerates the current manifest. That is a consistency mechanism, not an independent approval path.
- It checks machine_certification=false and deployment_authority=false.
- It builds maps by path; explicit duplicate-path rejection is not present in the inspected code.
- Existing CI success is not evidence that an independent authority approved a proposed change.

## Candidate battery (NOT RUN)

| ID | Mutation in disposable copy | Expected verifier outcome | Authority interpretation |
| --- | --- | --- | --- |
| MAF-01 | Change one tracked test fixture without changing manifest | FAIL: hash/size drift | Detects inconsistency only |
| MAF-02 | Change that fixture and regenerate manifest using --write | May PASS consistency | Must NOT imply approved change; primary falsification target |
| MAF-03 | Duplicate a manifest files[] entry with same path | Current implementation may PASS | A duplicate record must be separately flagged in strengthened verifier |
| MAF-04 | Duplicate a path with conflicting digest | Current map behavior may mask one entry | Require explicit rejection regardless of ordering |
| MAF-05 | Remove a tracked-file entry | FAIL: missing tracked file | Consistency check |
| MAF-06 | Add an entry for a nonexistent file | FAIL: untracked or missing file | Consistency check |
| MAF-07 | Set machine_certification or deployment_authority true | FAIL | Metadata invariant |
| MAF-08 | Corrupt JSON syntax | Nonzero exit / parser error | Failure must be recorded; human-readable error improvement is optional |
| MAF-09 | Edit verifier and manifest together | May PASS consistency | Self-verification cannot establish trusted verifier provenance |
| MAF-10 | Compare reviewed commit SHA to independently held approved SHA | Mismatch must block approval at external gate | Requires an independent gate, not currently established |

## Isolation and evidence requirements

1. Independently approve exact test cases and a disposable test environment before execution.
2. Record source commit, isolated worktree identity, runner/runtime versions, and fixture hashes.
3. For each mutation record command, exit code, stdout/stderr, resulting manifest digest, and unexpected side effects.
4. Preserve original artifacts and all failing results. Never repair a failed run in place.
5. Reset or destroy each disposable worktree before the next case; verify no writes reached the baseline branch.
6. Have an evaluator independent of the test-generating mechanism interpret the evidence.
7. Distinguish SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED.
8. Do not infer bypass-resistant authorization from successful consistency checks.

## Admission gates

- No push/merge to main; no production deployment.
- No execution with privileged production credentials.
- No alteration or re-enablement of the disabled workflow.
- No automatic --write on the canonical repository.
- No self-approval of test thresholds, corrections, or disposition.
- If the external approval gate is absent, record NOT TESTED for enforcement.

## Known omission register

- A self-consistent malicious code+manifest pair can satisfy file-integrity checks.
- GitHub branch protections and required reviews were not independently verified.
- Runner/action supply-chain provenance is not established by passing unit tests.
- CI npm audit previously reported dependency vulnerabilities; no vulnerability triage has been performed here.
- Symbolic links, ignored files, manifest duplicate entries, and parser failure behavior require explicit coverage.
- Independent approval ledger, revocation, and downstream merge/deploy bypass paths are NOT TESTED.

## Review deliverable

Human reviewer should approve or reject the battery, choose the independent evidence custodian, and authorize a separate execution tranche. This document is preparation only and carries no certification or permission to proceed.

CAN ⊬ MAY. Maximize CAN; keep MAY outside.
