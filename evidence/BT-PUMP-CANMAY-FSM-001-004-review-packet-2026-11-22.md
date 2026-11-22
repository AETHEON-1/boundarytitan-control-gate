# BT-PUMP-CANMAY-FSM-001–004 | Consolidated specialist evidence register

**State:** YELLOW / INTERNAL MODEL RESULTS / INDEPENDENT REPRODUCTION PENDING.  
**Owner approval:** Repository evidence placement approved 2026-11-22.  
**Primary lane:** [G04, issue #166](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/166).  
**Predecessors:** AM-13 in `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md`; #131 cross-PR composition; #127 revocation; #162 coordination; existing EC-02.  
**Evidence scope:** Synthetic, isolated Python finite-state models. No production system, independent tester, mathematical novelty, or P vs NP conclusion.

## Claim-to-evidence crosswalk

| ID | Claim / test | Bounded result | Status |
|---|---|---|---|
| 001 | Two locally passing guards may violate independently stipulated global policy | Four states, A then B and B then A violate not(a and b) | Internal reproduction |
| 002 | n independent once-only actions, quota k | First violating trace depth k+1 for 0 <= k < n; atomic sequential policy recheck prevents it | Internal enumeration and elementary proof |
| 003 | Stale concurrent checks, revocation and repairs | Check0, Check1, Commit0, Commit1 violates quota=1; Check0, Revoke, Commit0 violates revocation property; revocation-only control stops latter but not former | Internal bounded BFS |
| 004 | External consequence, record, presented state may diverge | Authorize, external_effect, crash_before_record gives effect without durable success record; authorize, revoke, external_effect gives post-revocation effect | Internal bounded BFS |

## Formal witnesses and successful negative controls

**001:** S={(0,0),(1,0),(0,1),(1,1)}; initial (0,0); A sets first bit, guard not a; B sets second bit, guard not b; I=not(a and b). Both A;B and B;A locally pass and end in (1,1), violating I.

**002:** S={0,1}^n, each action sets one previously unset bit; I_k(s) iff popcount(s)<=k. For 0<=k<n, the shortest violation has length k+1. With sequential atomic transitions guarded by I_k(T_i(s)), no violation is reachable in this model. The reported specimen covers n=2..10 (35 parameter combinations); a separate three-state chain disproves universal four-state minimality. No universal minimality claim.

**003:** For quota=1, both checks can observe available quota before either commits. Reported exhaustive state/edge counts, including a history monitor: stale 34/43, revocation gate 27/39, commit-time recheck 25/38, atomic 13/15. Stale and revocation-only variants violate quota; stale also permits commit after revoke. Recheck and atomic variants show no violation in the explored model. These controls assume modeled serialized commit semantics; no real distributed atomicity demonstrated.

**004:** Unsafe 12 states/16 edges, spoofed presentation 14/19, idealized atomic 6/6. Unsafe model permits effect after revocation and effect without a success record. Spoofed model also permits a record/visible mismatch. Idealized atomic control exhibits none of these witnesses in the explored scope. An initial 'audited' variant did NOT implement independent auditing; it is not audit evidence.

## Local specimen custody (SHA-256 of files re-executed in isolated runtime)

| Specimen | SHA-256 |
|---|---|
| `boundarytitan_fsm_counterexample.py` | `941a6a93212cd5838b3e5cfb9c2246e1e14ca7737d03f7f15141cf06d85b0c6b` |
| `bt_pump_canmay_family.py` | `f88bee55a727c71baaae2d90a9238a26006bc8a1a8c50a735adf2ed2ef6cecfc` |
| `bt_pump_canmay_phase3.py` | `d8e6189f9d828f73c146b2672efc5d0de74c3d4354b4eb8bcc2d2bd604df1c01` |
| `bt_pump_canmay_phase4.py` | `1ed126d7964c73f27e6138cbbaeff8d0d1019316629e8c85d3ba316012c91a28` |

All four scripts were re-executed in the originating runtime on 2026-11-22 with no reported assertion failures. **This markdown record does not contain the source bytes.** The hashes are custody anchors, NOT independent reproduction, and repository reviewers cannot reconstruct the exact specimens from hashes alone. Obtain and preserve source bytes in an independently accessible review package before upgrading the evidence state. Original local phase reports and JSON results are retained separately; they are not represented as uploaded here.

## Reviewer reproduction contract

1. Obtain the four exact source files and check SHA-256 against this register; if unavailable, return **EVIDENCE INCOMPLETE**.
2. Run each using a recorded Python interpreter/version in an isolated, network-disabled environment. Capture stdout, stderr, exit status, timestamps, and output hashes.
3. Independently reconstruct the transition relation, reachable states and invariant monitors; compare against the witnesses and counts above.
4. Challenge negative controls with altered scheduling, stale reads, retry, partial external effect, failure between effect and record, and concurrent revocation.
5. Check state-based versus history-based property monitoring and demonstrate whether distinct actual states can share recorded or visible observations.
6. Challenge minimality only under a declared class of machines; test inverse/converse and 51–50 perturbations.
7. Distinguish explicit-state reachability, succinctly represented reachability, bounded trace checking, and specification fidelity. Existing NL/PSPACE background is prior art; no new reduction or P vs NP result.
8. Return a signed/attributed report with environment, source digests, counterexamples, successful negative controls, failed tests, assumptions, uncertainty and independent stop authority.

## Open obligations / omissions

- **Custody:** Source bytes are not repository-hosted in this packet; independent rerun is not established.
- **Execution:** Atomic effect+record is a mathematical idealization; distributed side effects, retries, compensation, crashes, and idempotency remain untested.
- **Revocation:** No measured worst-case latency or proof that revocation outruns real consequence.
- **Observation:** No independent audit channel; actual, recorded, presented states are abstract Booleans.
- **Policy:** A mathematically preserved invariant is not proof of faithful human intent or legitimate authority.
- **Coverage:** No evidence of complete mediation across any actual product.
- **Minimality:** Three-state chain is a bounded counterexample; minimality requires model-class constraints.
- **Complexity:** No new hardness reduction, complexity classification for a restricted authorization class, or P vs NP result.
- **Prior art:** Composition, TOCTOU, model checking, revocation races and evidence integrity have established literatures; integrated method novelty unproven.

## Independent reviewer disposition vocabulary

FAILURE REPRODUCED / NO FAILURE OBSERVED WITHIN TESTED SCOPE / TEST INVALID / INDETERMINATE / NOT TESTED / EVIDENCE INCOMPLETE.

No reviewer result automatically certifies the control architecture. Human owner retains admission, publication, merge, deployment, closure, and external stop authority. This register does not amend frozen doctrine.

**Freeze the evidence. Never freeze the search. CAN ⊬ MAY.**
