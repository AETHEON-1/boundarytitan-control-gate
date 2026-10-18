# Specialist handoff and preservation checkpoint (2026-10-17)

State: YELLOW / NOT TESTED / draft PR. This file is a handoff, not a second test battery or second encyclopedia.

## First actions for the next maintainer
1. Inspect the repository tree and locate the **canonical Encyclopedia of Chaos**. Two guessed paths (`ENCYCLOPEDIA-OF-CHAOS.md`, `docs/ENCYCLOPEDIA-OF-CHAOS.md`) were NOT FOUND. Do not create a competing encyclopedia. Record the verified canonical path and link it here.
2. Perform full semantic deduplication of `docs/research/CROSS-DOMAIN-FALSIFICATION-SPECIALIST-ENTRYPOINT-v0.1.md` against AM-01 through AM-24, BT-HC-004, existing AGAT tests, and all other repository question inventories. A search yielding no results is not evidence of absence.
3. Known likely overlaps requiring reconciliation: CD-02 with AM-19 (ownerless consequence), CD-10 with AM-20/AM-21 (independent observer and evidence control), CD-08 with review and evidence-custody cases. Narrow to a genuinely distinct hypothesis or mark LINKED-EXISTING; never execute duplicate fixtures for a new score.
4. Verify whether PR #93 is merged, pending, or superseded before implementing any synthetic gate fixture.
5. Confirm whether `npm run verify:state` rejects expected new tracked files because of manifest drift. Preserve failure and update the manifest only under the existing custody protocol, never merely to turn CI green.
6. Run existing read-only tests and record exact commit, environment, exit code, raw traces, expected/actual behavior and failures. Do not claim tests ran from this handoff.
7. Obtain independent human review before any human-participant study. Start with safe hypothetical vignettes.

## Observed repository integration work
- A draft specialist entrypoint was added in this branch.
- README now links the entrypoint.
- Existing AM-01 through AM-24 already cover technical bypass, revocation, restart, delegation, recovery, ownerless consequences, brake dependency, and evidence suppression.
- No new execution result, physical stop measurement, specialist validation, or formal counterexample is claimed.

## Failure and contradiction record to transfer to the canonical encyclopedia
F-20261017-01 | Encyclopedia location unresolved | Attempted two guessed top-level/docs paths; both 404. Consequence: cannot honestly claim Encyclopedia of Chaos updated. State: OPEN.
F-20261017-02 | Global duplicate exclusion unverified | Existing AM battery was read and overlaps identified; complete repository inventory not obtained. State: OPEN.
F-20261017-03 | New challenges unexecuted | Ten proposed CD scenarios have no measured outcomes. State: NOT TESTED.
F-20261017-04 | Independent brake unverified | AGAT PR #93 explicitly calls itself synthetic and same-process; no independent consequence-stop evidence from this change. State: OPEN.
F-20261017-05 | Manifest drift risk | README and research files changed; state verification not executed in this pass. State: NOT TESTED.

Keep failed or inconclusive outcomes. A human may decide whether to merge, but may not retroactively turn NOT TESTED into PASS.

CAN ⊬ MAY. Freeze evidence; never freeze the search.
