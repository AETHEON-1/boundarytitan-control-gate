# FR-001 candidate repair | CI evidence record

**Date:** 2026-10-15
**State:** VERIFIED SOFTWARE CHECKS / YELLOW FOR SYSTEM ACCEPTANCE
**Candidate commit:** `2a2e95d0423c5129b4298eff10ed9aaaaa5f58ca`
**Pull request:** https://github.com/AETHEON-1/boundarytitan-control-gate/pull/79
**Successful PR workflow:** https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38759095388
**Successful push workflow:** https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38759088557
**Previous failed workflow:** https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38758948778

## Observed result (GitHub Actions)
The PR-triggered workflow for the exact candidate commit completed successfully:
- Dependency installation: PASS
- TypeScript typecheck: PASS
- Jest: **36 suites passed, 115 tests passed**
- Python handoff: **3 tests passed**
- Repository-state verifier: **PASS; 274 repository files accounted for in current tree ledger**

The earlier workflow on commit `12cdce6e8a0e775c37c989b9689c05430b1ddd9c` failed repository-state verification. The failure identified drift in two robotics files and five missing FR-001 handoff entries. Commit `2a2e95d` updated the manifest, after which the recorded workflows passed.

## Scope
Software-only CI of candidate pre-action checks for unresolved unknowns, timestamp mismatch and malformed declared force/speed/energy. No motor, physical stop, energy dissipation, independent brake, hardware, operator response, or consequence observation was tested.

## Remaining gaps and potential falsifiers
1. The provisional freshness rule rejects any observation predating decision time. It has not been validated against realistic sensor latency or an approved age budget.
2. Physical quantity parsing is syntactic; no calibration, allowable force/energy envelope or independent unit validation exists.
3. The candidate does not establish identity binding between proposal, robot, tool, workspace, and grant.
4. The assessment remains a read-only classifier; it does not independently enforce a power or execution path.
5. Passing tests do not establish test adequacy, physical safety, external authority, certification, or release permission.
6. Independent reviewer signoff, named consequence owner and acceptance decision are pending.

## Disposition
- **SUPPORTED (bounded):** GitHub Actions verified the candidate commit under its declared checks.
- **CONTRADICTED (historical):** the prior manifest was out of sync; preserved as a failure and corrected on candidate branch.
- **NOT TESTED:** physical containment, independence, and consequence-level stop.
- **YELLOW:** candidate not promoted to operational GREEN; human review remains required.

## Reopen conditions
Reopen on failing CI, changed candidate SHA, manifest mismatch, new bypass witness, invalid test premise, physical counterexample, or specialist contradiction.

**Only GREEN proceeds. No owner, no brake. No ledger, no trust. CAN ⊬ MAY.**
