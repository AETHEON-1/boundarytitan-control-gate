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

## Superseding evidence checkpoint (2026-10-17)
The earlier open entries remain intact as historical evidence, but their current state has changed:
- F-20261017-01: RESOLVED. Canonical existing location verified: `encyclopedia-of-chaos/`. Earlier guessed paths were wrong.
- F-20261017-05: RESOLVED at commit `5ea7ad42618688bd07baf76ebe85eeb16f8a5f6b`. [PR run 39085924168](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39085924168) and [push run 39085920700](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39085920700) both concluded SUCCESS, including repository-state verification. Earlier failed runs remain preserved.
- Security: PARTIAL TRIAGE. `package.json` declares seven direct devDependencies; all 287 non-root entries in `package-lock.json` have `dev: true`. The historical `npm ci` output reported 35 advisories (3 moderate, 31 high, 1 critical). Dev-only classification does not establish non-exploitability, because CI installs and runs development tools. Advisory-level package identification, fix ranges, reachable build/CI paths, and remediation decisions remain OPEN.
- An explicit diagnostic npm audit capture has been added to CI for subsequent runs; audit collection is nonblocking and **does not constitute a security gate or security PASS**. Retrieve the complete report artifact and perform advisory-by-advisory triage.
- PR #95 was observed as open, non-draft on the GitHub API at this checkpoint, contrary to the earlier draft instruction. This observation does not change the human MERGE HOLD. Do not merge without a new explicit decision.
- All CD-01..CD-10 remain NOT TESTED. Independent consequence brake remains NOT ESTABLISHED.

After this documentation change, rerun CI and verify the manifest against the new commit. Freeze earlier evidence; never replace RED history with GREEN claims.
