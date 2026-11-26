# EC-RFR-001 | Recurrence after repair: November 25 evidence addendum

State: YELLOW / REVIEW PREPARATION / NOT ADMITTED. Parent: EC-RFR-001. Local date America/Chicago; CI timestamps are UTC November 26. Human repository owner retains admission, merge, test authorization, disposition and external stop. No new canonical classification or doctrine. This addendum does not replace historical records.

## Evidence register

Repository: https://github.com/AETHEON-1/boundarytitan-control-gate

- Parent record: [EC-RFR-001](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/reality-benchmarks/2026-11-17-ec-rfr-001-v0.1.md). October 19: six omissions; November 14 repair; November 16: seventeen omissions; November 17: reconciled baseline. Counts are snapshot observations, not cumulative distinct paths.
- Original main: `f15f4d15597f76878a8059d81d8c358bd1d22358`. [Failed job 139634822749](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/45737700135/job/139634822749): 36 Jest suites / 112 tests and three Python tests passed; repository-state verifier failed, listing 27 missing paths. Inventory inspection: 340 in-scope blobs, 313 entries, 27 absent, zero stale paths and zero listed size discrepancies. No claim of malicious tampering.
- Repair candidate: `13814c09ef7c8ef2652ac4627606722eef0574a9`. [PR #197](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/197), draft, open, unmerged; only CURRENT-REPOSITORY-MANIFEST.json changed, 135 lines added, none deleted. Twenty-seven SHA-256 digests computed from pinned base64-decoded bytes; 313 prior entries preserved with unchanged blob identity from previously verified `5af0235fb51d4f1d64bbd4eef79964b8fd29150c`. [Prior verify job](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/44163502024/job/134323295097). Prior entries not individually rehashed by the preparing assistant except README control; hosted verifier subsequently checked the candidate inventory.
- [Repair job 139634919520](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/45737727976/job/139634919520): 36 suites / 112 tests, three Python tests passed; verifier logged `Repository state verification passed: 340 repository files; current tree ledger matches.` [Second job 139634832956](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/45737703236/job/139634832956): successful step conclusions, raw logs not separately inspected here. Both runs share verifier and hosting dependencies, not independent assurance.
- Read-only GitHub inspection: main still equals original base; mergeable=true; candidate tree `32be22a35ef6c184d6258f65693a1791512889a0`; proposed merge object `f62696da7cf716eb098eacf4629aa560bc657d91` has identical tree and parents original main and candidate head. This establishes tree equivalence at inspection, not a merged state or future eligibility. Recheck immediately before human disposition.
- Branch surface reports protected=false, enabled=false, enforcement_level=off, empty required checks. Rulesets query with includes_parents=true returned []; detailed branch-protection endpoint returned HTTP 403 (integration access denied). Effective organization rules, actor credentials, bypasses, emergency recovery and alternative paths remain UNKNOWN. No inference of unrestricted write authority.

## Mechanism and first unsupported arrow

Record preparation -> content and manifest composition -> candidate commit -> ref transition -> post-push verification -> repair -> review -> admission decision.

Observed: main contained an incomplete manifest and the verifier detected the condition after a push; candidate repair passed the existing verifier. First unsupported enforcement arrow: check FAIL -> independently enforced prevention of invalid target-ref transition. Do not confuse an error response, a draft state, or a passing repair with prevention. Competing explanations include omitted procedure, integration defect, absent or ineffective enforcement, authorized exception or combinations. Intent and complete causal attribution not established.

Correction does not entail prevention. Detection does not entail denial. Recovery does not entail immunity. These are bounded research distinctions; no general theorem of inevitability is asserted.

## Retrieval crosswalk (candidate metadata, not index admission)

Existing parent ID EC-RFR-001; original domain repository integrity / CI/CD. Original proposition: correction of current inventory; rejected inference: correction alone prevents recurrence. Conditions: later additions not reconciled in observed snapshot; effective enforcement not fully visible. Observed consequence: incomplete current evidence ledger and failed verification, not a demonstrated production safety failure. Useful residue: functioning verifier, pinned negative and positive controls, historical failure chronology. Counterevidence: successful earlier and current repair runs; no inference that correction itself failed. Candidate associations: FM-002 local-to-global composition failure; FM-010 incomplete mediation; FM-011 evidence custody failure (inventory gap only); FM-014 investigator-induced failure (prior separately documented transfer discrepancy; no causal attribution of this recurrence). No new mechanism ID. Existing prototype candidates.json contains five entries and no EC-RFR-001; prepare this crosswalk for later schema-reviewed admission without editing index or taxonomy.

Existing reference: [EC-MIKA-001](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/2026-11-24-mechanism-indexed-knowledge-architecture-v0.1.md); [transfer failure TF01](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/encyclopedia-of-chaos/reality-benchmarks/2026-11-17-ec-rfr-001-tf01-v0.1.md).

## Specialist handoff: reuse RB-RFR-001, no new test IDs

[Existing test contract](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f15f4d15597f76878a8059d81d8c358bd1d22358/research/repository-integrity/2026-11-17-rb-rfr-001-test-contract.md); [PR #122](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/122) sentinel; [PR #130](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/130) existing 15-test handoff; [PR #185](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/185) preventive enforcement proposal. All remain untouched. Proposed discriminators below are refinements of the existing test contract, NOT EXECUTED, not additional authorized tests.

| Existing test | Refinement | Required observation |
|---|---|---|
| T01/T02 | Missing entry, failed check | Detector failure separately from denial; independent target ref unchanged on attempted invalid admission |
| T04 | Alter content while preserving byte count | Digest mismatch detected; admission outcome independently observed |
| T03 | Successful check bound to old head; concurrent base or head update | Invalid or unverified new target state not admitted; refresh exact revision and policy context |
| T05 | Authorized test actor with privileged exception | Record effective authority and real target outcome; distinguish explicit exception from silent bypass |
| T06 | Recovery attempts to restore an inconsistent state | Actual final ref and verification state; recovery route cannot be assumed covered |
| T07 | Proposed verifier or workflow alteration | Independent policy/check producer and version binding; no self-approval |
| T08 | Valid authorized change | Positive control: legitimate transition remains possible |

Independent reviewer: CI/CD security and formal authorization specialist, not assigned. Question: What effective mechanism guarantees that a denied or stale verification cannot be routed around on the declared admission paths, and what independent evidence would falsify that guarantee? Required oracle: separately controlled observation of exact target ref before/after, attempted operation, actor authority, rules, check producer and revision, timestamp, remote outcome, persistent recovery state. Error output alone insufficient. Negative control: invalid state becomes target despite claimed preventive mechanism. Positive control: authorized valid transition succeeds. Report tested paths and exceptions; finite tests cannot prove all reachable paths covered. No real repository enforcement attempts, credentials, policy change, restore or live test without separate approval; use a separately authorized disposable environment. Prior original and repaired commits are historical specimens, not authorization to replay them.

## Reproduction and owner decision

For a clean authorized checkout, independently inspect both pinned revisions and run the existing `npm run verify:state` without `--write`; preserve stdout/stderr, exit codes, environment, commit, manifest and file digests. The verifier also includes unignored untracked files, so declare checkout cleanliness. Compare candidate and proposed merge trees; recheck base, actual checks and their binding at time of any decision. CI success is scoped evidence, not independent specialist certification. No new run initiated in this assessment. Existing repair candidate may be considered by owner separately from enforcement proposal; merging alone does not resolve recurrence.

## Cross-disciplinary research questions (not findings)

Industrial maintenance: does repair restore function without constraining the initiating conditions? Financial controls: does reconciliation detect bad settlement after commitment rather than deny it? Cybersecurity: can recovery reintroduce a revoked capability? Clinical quality: does a corrected record prevent later stale propagation? AI containment: does evaluation failure prevent actual release or only produce a report? Investigate each with its own authority, consequence, controls and evidence; analogy does not establish transfer. No new external case investigation undertaken here.

## Investigator limitations and stop

Previous repair receipt records connector batching limit (observed in prior conversation), and a DNS/local-checkout blocker (attributed prior receipt, not independently reproduced here). First retrieval was split; hosted verification later succeeded. Detailed protection inspection denied; preserve 403 rather than infer absent controls. No independent reviewer findings or effect oracle. No full review of every PR #130 test body or effective policies; refinements may overlap existing cases. Do not promote novelty. Stop at review/authorization frontier. Reopen on independent objection, material change to base/head/check binding, evidence of enforcement or bypass, or explicitly authorized bounded test. No repository writes, index mutation, policy change, test execution, publication, merge or deployment in this preparation. Human owner must approve durable placement separately; if admitted, reconcile manifest atomically with added content and preserve this receipt. Main remains unchanged at inspection.

Freeze the evidence. Never freeze the search.
CAN ⊬ MAY.
