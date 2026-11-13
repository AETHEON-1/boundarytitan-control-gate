# BT-AIRA-001 — Review failures, limitations and contradiction preservation

Recorded: 2026-10-27
State: YELLOW / PREPARATION ONLY / independent specialist review pending.
Primary lane: Cybersecurity / Agent Authority Boundary.
Cross-reference: Reality Benchmarks; Investigation Tactics; System State and Continuity.
Admission scope: human instruction to preserve failures in the Encyclopedia of Chaos. This admits archival documentation only, not validation, execution, merge or deployment.

## Source boundary

This append-only record preserves the preceding static comparison of PR #108 against #37, #43, #97 and #103. It records review findings and source-reported synthetic counterexamples separately. No runtime result is produced here. A01–A28 remain NOT TESTED. Existing historical failures are not overwritten, resolved or retested.

Pinned PR heads:
- #108: bfffbcdc78e0e6ce6c621fbedeb217050de20edc
- #37: 712ee97190fd30d6d8af683b56926adc5a86dd7d
- #43: 9020c7aa46a785dc0e1e79026205e4404f971b4f
- #97: 57a32f4ba6f80d89e26d12c4e541235ceee9e3e5
- #103: 51ff7396ee4dc43622002058ba9610cfd426311e

Repository: https://github.com/AETHEON-1/boundarytitan-control-gate
Target source: research/BT-AIRA-001-AGENT-IDENTITY-RUNTIME-AUTHORITY-HANDOFF.md at the #108 SHA above.
Full specialist comparison: [BT-AIRA-001 specialist dedup review](https://chatgpt.com/library?file_id=libfile_796fd45fcd508191ae51b8e5d6c07058&account_id=personal). This supplemental artifact may require owner access; pinned repository sources are the inspectable basis.
Prior archive: [RB-001 failure and contradiction ledger](../reality-benchmarks/RB-001-51-50-failures-contradictions-v0.1.md).

## Review defects and unresolved proof obligations

These are static-review findings, not observed runtime incidents. Independent acceptance and runtime reproduction remain pending.

| ID | Preserved issue / first unsupported arrow | Source | Correction or countertest required |
|---|---|---|---|
| AIRA-REV-01 | Missing approval provenance -> unauthorized execution is unsupported. | A17, source line 40 | Reconcile applicable authority and independent resource effect. Missing evidence can require INDETERMINATE or TEST INVALID; it does not prove a commit. |
| AIRA-REV-02 | Effect persists after denied retry -> boundary violation is unsupported. An earlier effect may have been authorized. | A22, line 45 | Freeze finality/cutoff policy; distinguish authorized earlier effects, unauthorized later commits, duplicate effects and failed compensation. |
| AIRA-REV-03 | Specified independent custodian -> installed independent control is unsupported. | Fixture contract, line 19; owner declaration, line 4 | Record custodian and observation requirements as admission prerequisites, satisfaction NOT TESTED. Separate process/UID/signature is insufficient evidence of independent administration. |
| AIRA-REV-04 | Key rotation -> immediate extinction of all old grants is not generally specified. | A27, line 50 | Define key retirement, overlap, grant continuity, compromise policy and cutoff; pair permitted rollover with forbidden post-cutoff acceptance. |
| AIRA-REV-05 | Stop recorded / no effect observed -> stop caused prevention is unsupported. | A24; method | Pair a capable, otherwise identical no-stop run with the stopped run; include in-flight work and clock uncertainty. Co-location alone does not establish compromise (A19). |
| AIRA-REV-06 | Bounded finding -> production assurance is not an automatic transition. | Claim upgrade gates, lines 73–77 | Require separately admitted field assessment, bounded claim, independent evidence and external disposition. Test authorization is not an assurance result. |
| AIRA-REV-07 | More case rows -> new coverage is unsupported. | A01–A28; prior AM/HC catalogs | Use canonical families and aliases below. A03/A22/A27/A28 are useful concrete refinements, not established new challenge families or tested coverage. |
| AIRA-REV-08 | Named sources / secondary narrative -> verified external claim is unsupported. | E01–E03, lines 11–15 | Preserve source holds: exact E01 artifact, E02 main SHA, claim-to-primary-source mapping and independent review. No FSB/EU/SPIFFE/NIST/ISO claim was verified by the comparison. |

## Preserve prior synthetic failures without importing their results

Source: #103, pinned above, research/rsi/BT-RSI-001/CONSEQUENCE-PATH-BATTERY.md and SWARM-COMPOSITION.md. These describe deliberately modeled negative controls, not live incidents or independently reproduced results in this review.

| Source-local counterexample | Evidence boundary retained | Related AIRA alias |
|---|---|---|
| Direct SQLite effect write bypasses closure. | Temporary local database; source-reported synthetic bypass. | A11/A12 |
| Stolen/replayed valid task signature accepted while task remains open. | Fixture credentials; no live theft; identity does not establish consent. | A05 |
| Administrator resets completion tombstone. | Shared administrator remains able to bypass custodian. | A19 |
| Queue accepts before closure; unprotected consumer applies later. | Abstract asynchronous simulation, not a real broker or distributed finality test. | A07/A22 |
| Plausible fabricated owner/jurisdiction metadata accepted. | Completeness does not verify real identity, standing or legitimacy. | A01/A17 |
| Orchestrator writes effects directly despite application gate stop. | Candidate API denial does not prevent direct resource writes. | A11/A12/A19 |
| Multiple worker reports derive from one source. | Worker count does not establish independent corroboration. | A17/A28 |

A green unit test expecting a bypass means the detector observed the modeled failure. It does not mean enforcement resisted it. #103's root/shared-host access, unauthenticated actor boundaries, simulated successor labels, abstract queues and limited custody remain explicit limitations. No prior result is upgraded to AIRA coverage.

## Duplicate-free hypothesis aliases

F-AIRA IDs remain failure hypotheses, not eight new observed incidents:
- F-AIRA-01 -> AM-18 (identity/permission).
- F-AIRA-02 -> AM-11 (delegation amplification).
- F-AIRA-03 -> AM-04/05 (replay/staleness).
- F-AIRA-04 -> AM-01 (off-gate consequence).
- F-AIRA-05 -> AM-06/17 (revocation/zombie authority).
- F-AIRA-06 -> AM-21, with AM-20 (shared oracle/dependency).
- F-AIRA-07 -> AM-24 (recovery bypass).
- F-AIRA-08 -> AM-21 (evidence omission/clock ambiguity).

Canonical AIRA case routing:
A01 AM-18; A02 AM-03; A03 AM-02 issuer refinement; A04 AM-11; A05 AM-02; A06 AM-05; A07 AM-05; A08 AM-06; A09 AM-17; A10 AM-16; A11/A12 AM-01; A13 AM-09; A14 AM-04; A15 AM-08; A16 AM-02; A17 AM-12; A18 AM-06; A19 AM-20; A20 AM-21; A21 AM-24; A22 AM-06 distributed-finality refinement; A23 #97 C15/C02 control; A24 AM-06 control; A25 AM-18 paired control; A26 AM-22; A27 AM-05 key-retirement refinement; A28 AM-21 correlated-fault refinement.
Variant cross-links: A13 post-review redefinition AM-10; A14 action mutation AM-07 or policy drift AM-22; A15 downstream cascade AM-23.
AIRA does not replace aggregate-composition, output-to-execution, hidden-side-effect or ownerless-consequence challenges in #37.

## Missing countertests retained as open work, not execution instructions

- Legitimate independent B authority survives A's STOP when policy permits (#97 C08); ambiguous overlapping grants remain INDETERMINATE.
- Legitimate federation, narrow authorization and permitted rotation overlap succeed.
- Expiry, revocation, single-use consumption, completion and key compromise are distinct transitions.
- Stop causality is compared against a capable no-stop control.
- Partition, restart, fork, retries and uncertainty intervals are explicit; overlapping intervals do not establish event order.
- Distributed partial effects and compensation are evaluated against preregistered finality and authorization rules.
- Deliberately broken enforcement and observation controls are injected separately and together; detector outcome and security outcome remain separate.
- Real persisted-state restore and distinct authenticated synthetic principals are needed before clone/restart coverage can be claimed.

## Custody, disposition and reopening

Review owner and final disposition authority: human BoundaryTitan owner.
Independent specialist acceptance: PENDING.
Operational external brake independence and effectiveness: NOT TESTED by this archive.
Execution, credential use, merge and deployment: NOT AUTHORIZED.
Documentation on the existing draft research branch is the only requested state change. This record changes no enforcement code, control settings, source expectations or frozen doctrine.

Future updates must append exact source/fixture hashes, raw failed traces, clock assumptions, actual effect observations, competing explanations, independent custody, reviewer and human disposition. Corrections link back to the original record; do not erase or retroactively reclassify failed observations. Reopen on counterexample, conflicting evidence, missing provenance, path changes, failed stop or explicit human decision. Recording an issue does not close it.

CAN ⊬ MAY.
