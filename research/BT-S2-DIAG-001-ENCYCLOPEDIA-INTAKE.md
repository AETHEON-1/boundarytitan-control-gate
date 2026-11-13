# BT-S2-DIAG-001 | Procedural failures and Encyclopedia of Chaos candidate
Date: 2026-10-27
State: PROPOSED ARCHIVE INTAKE / NOT ADMITTED / NOT TESTED

## P-S2-01: Search discovery failure
Attempt: GitHub connected code search for "Encyclopedia of Chaos", "specialist handoff", "BT-AIRA", and "manifest" against default branch.
Observation: four searches returned zero results, despite README.md fetch showing specialist pointers and PR #108 containing an agent-identity handoff. This is a search-coverage failure, not proof of missing content.
Mitigation: direct README fetch and PR #56/#97/#103/#108 changed-file inventories. Remaining limitation: no exhaustive tree-wide duplicate audit. Evidence state: SUPPORTED for observed empty search results; cause INDETERMINATE.
Reopen: index availability or full-tree comparison establishes coverage.

## P-S2-02: Archive admission and base mismatch
Observation: PR #56 defines Encyclopedia of Chaos on feature/encyclopedia-of-chaos-v01, stacked on another PR; archive is not established on main by this review. A new research-branch Markdown record does not meet BT-EOC-ENTRY-v0.1 admission or append-only validator workflow.
Disposition: this file is an intake candidate only; no JSON archive entry or canonical archival claim. Required: human archive-owner routing, validated schema, correct branch/manifest reconciliation, and independent receipt.
Evidence state: SUPPORTED for PR structure; admission NOT TESTED.

## P-S2-03: Manifest consistency hazard
Known prior issue #109 reported a stale CURRENT-REPOSITORY-MANIFEST.json on another branch and failed executable checkout. This package does not claim current manifest verification, byte-level validation or CI. New branch files may require manifest reconciliation before review admission.
Evidence state: INDETERMINATE for this branch; prior report is context, not current failure.
Reopen: independently inspect exact branch tree and manifest; execute authorized verifier later.

## P-S2-04: Same-session analysis independence defect
Observation: the two N01 authority maps were generated in one assistant session. Their convergence cannot count as independent model or specialist evidence.
Disposition: analytical comparison only; blind independent analysis NOT TESTED.
Reopen: independent frozen-input outputs with raw custody and predetermined crosswalk.

## P-S2-05: Unexecuted gate and simulated outcomes
Observation: ten gate challenges and cross-domain combinations are specifications only; no runtime fixture or independent consequence observer executed.
Disposition: NOT TESTED, not a passing safety claim.
Reopen: human-authorized isolated test with independent evidence, negative and positive controls.

## Corrections and stop
Do not overwrite historical failures. Append separately identified corrections on approved archive lineage. No machine-issued archive admission, merge, test execution, or deployment. Human owner retains external NO.
