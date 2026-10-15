# The Empty Chair | Specialist handoff v0.1

**Status:** YELLOW / machine-prepared handoff. **Scope:** read-only software characterization. **PR:** https://github.com/AETHEON-1/boundarytitan-control-gate/pull/81
**Base:** main commit `62684c2d041cfb5e67a1ee2eec9e2397a487e50b`. Pin the final PR head SHA at execution. PR #79 and PR #80 are independent candidates; do not combine their results.

## Human translation
The AI can leave the room and the same deterministic CAN→MAY assessor still evaluates the supplied fields. The current assessor cannot verify whether a named grant was revoked after the input was assembled. A nonempty grant ID is not an active grant, and an assessment is not enforcement.

## Test matrix and evidence
| ID | Fixture | Expected observation | Limits |
| --- | --- | --- | --- |
| EC-A/B | Same transition, AI-labelled versus human-labelled proposer | Identical `assessCanMayTransition` output; `NOT_AUTHORITY` | No model inference, actual human participant, or authorization tested |
| EC-C1 | Delete authority-basis identifier | `HUMAN_REVIEW_REQUIRED` and explicit missing-basis reason | Does not establish live revocation |
| EC-C2 | External revocation occurs but old grant ID remains in supplied fixture | Same `ELIGIBLE_FOR_EXTERNAL_DECISION` assessment as before; still `NOT_AUTHORITY` | **Known limitation**, not successful fail-closed revocation |

## Existing machine-run evidence
GitHub Actions run [38763734051](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38763734051) at `3e529afad56e1142b3e04151944b6e3f80237449`:
- TypeScript typecheck: SUCCESS.
- Jest: **37 suites / 115 tests passed**, including the three Empty Chair cases.
- Python handoff: **3 tests passed**.
- Repository-state verification: FAILED (exit 1). Seven tracked files absent from the manifest: two newly added Empty Chair files and five existing FR-001 handoff files.
- This failed evidence is preserved. Manifest repair requires a **new commit and rerun**. Earlier successful steps are not transferable to a later SHA.

## Specialist roles
- **TypeScript/test engineer:** reproduce three fixtures, inspect input equivalence and failure-message semantics, challenge whether tests are tautological.
- **Security/identity engineer:** specify trusted grant-state, authorization epoch, replay/restart and queue cancellation tests; identify the real external revocation owner.
- **Safety/robotics engineer:** assess whether any software-only result is mistakenly mapped to torque, power, inertia, or physical stop. Do not actuate hardware.
- **Evidence/custody reviewer:** independently compare pinned source, CI logs, manifest hashes, missing evidence and successor records.
- **Accessibility/HCI reviewer:** evaluate whether a newcomer can locate the claim, execute tests and report contradictions without AI or coaching. PR #80 accessibility acceptance remains separate.
- **Legal/public-authority reviewer:** distinguish identifier presence, valid delegation, standing, actual refusal, and enforceable consequence; no legal determination is implied.

## Exact reproduction protocol
```bash
git rev-parse HEAD
node --version; npm --version; python3 --version
sha256sum package-lock.json CURRENT-REPOSITORY-MANIFEST.json
npm ci
npm run typecheck
npm test -- --coverage=false
npm run test:python
npm run verify:state
```
For true AI-OFF isolation: install dependencies first, then run under **externally enforced no-network isolation** and sanitized provider credentials. No such run is claimed in this handoff. Record network policy evidence rather than assuming empty API keys prove isolation.

## Falsifiers / negative controls
1. Different assessment from AI versus human label alone with all substantive fields equal.
2. Missing authority-basis ID yields eligibility for external decision.
3. Stale grant ID continues to look eligible, **already characterized as a limitation**; challenge any inference that the kernel enforces revocation.
4. A test cannot run without a model, credentials, or external inference.
5. Same actor updates both artifact and manifest without independent approval, then calls manifest consistency authorization.
6. CI PASS is described as a real-world external stop, deployment permission, or human certification.

## Acceptance questions for independent specialist
1. Which precise claim was reproduced at which SHA, on which OS/runtime, with what exit codes?
2. What observation would contradict each claim? Is the negative case independently falsifiable?
3. Who owns grant validity and revocation, and how is that state supplied across retry/restart/partition?
4. Can a queued action execute after the last external NO? This is **NOT TESTED**.
5. Is the source/custody record independent of the actor being evaluated?
6. What is missing, and what must reopen before a stronger claim?

## Evidence contract
Preserve raw command output, environment/version list, SHA, dependency-lock hash, file hashes, exact expected and observed behavior, reviewer role/independence, disagreement, custody handoff, missing data, and reopen triggers. Never overwrite failed CI evidence with the repair. Human owner decides admission, merge, publication and any consequence-bearing action.

**Disposition:** bounded software characterization supported only at the CI SHA; full AI-OFF, independent specialist replication, revocation enforcement and physical consequence claims remain NOT TESTED / INDETERMINATE. Only GREEN proceeds. CAN ⊬ MAY.
