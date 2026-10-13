# Engineer Handoff Contract v0.1 (candidate)

Status: PROPOSED; contributor guidance, not a frozen-baseline amendment or approval.

## Why this exists
A successor must be able to execute a tool, reproduce both success and failure, challenge the evidence, identify where authority ends, and continue without asking the original author to reconstruct the work.

## Definition of handoff-ready
Every new engineering instrument must provide:
1. **Runnable entrypoint:** exact commands, supported versions, dependencies, offline mode, inputs, outputs and examples. A document-only object is explicitly labeled DESIGN ONLY.
2. **Reproducible evidence:** source/dataset lineage, hashes, original and transformed records, environment, commands, expected output, actual output, date, and named evidence custodian. A locator or a claimed digest never substitutes for retrieved bytes and independently checked provenance.
3. **Failure register:** persistent IDs for regressions, minimal reproduction, expected vs observed, impact, evidence status, suspected cause labeled as hypothesis, and repair/reopen criteria. Failures remain visible after a repair.
4. **Authority connections:** authority origin and independent proof; decision, evidence, execution and consequence owners; scoped identity/credentials; preconditions, proposed state transition, revocation, tested external stop mechanism, recovery and appeal. Empty fields remain UNKNOWN, never implicitly GREEN.
5. **Independent challenge:** an exact test that could overturn the claimed behavior; third-party instructions; negative controls; limitations; and a record of contradictory results.
6. **Human disposition:** named human owner, explicit permitted scope, dated decision record and separately identified publishing/merging/deployment permissions. A repository commit, CI result, package hash, or machine recommendation is never such permission.

## Lifecycle
DISCOVER → BUILD → FREEZE FIXTURE → RUN POSITIVE & NEGATIVE TESTS → DOCUMENT FAILURES → REPAIR CANDIDATE → RERUN → EXTERNAL REVIEW → HUMAN DISPOSITION → STATE RECORD.

The review packet must preserve both the pre-repair failure and post-repair result. Unknown and unsupported evidence cannot become SUPPORTED through machine self-report.

## Submission requirements
- Include `HANDOFF.md` for each tool with copy-paste run and test commands.
- Include a deterministic offline smoke fixture and a negative/adversarial fixture. Separate intentionally failing regression probes from default CI with explicit instructions; never quietly delete them.
- Add or update the tracked-tree manifest using `npm run verify:state -- --write` and re-run `npm run verify:state` before proposing merge.
- Disclose any dependency vulnerabilities and sandbox/access limits; do not claim security based on passing unit tests.
- Deliver both the capability artifact and a linked authority dossier.
- Report what is **NOT TESTED** and what the machine cannot verify.

## Minimum per-tool HANDOFF.md template
```
Tool and version:
Status (DESIGN / PREPARED / TESTED LOCALLY / INDEPENDENTLY REVIEWED):
Intended domain and problem:
Exact entrypoint and dependencies:
Quickstart command:
Sample input and expected output:
Test command and results:
Known failures and regression IDs:
Source provenance / hashes / evidence custodian:
Claims and defeating observations:
Decision owner / execution owner / consequence owner:
Credential and scope requirements:
External brake (who controls, how tested, latency):
Revocation / correction / appeal:
Non-claims and unresolved work:
Human Decision Record (if any):
Successor's next reproducible step:
```

## First concrete handoff: Workshop v0.2
See `research/WORKSHOP-v0.2-ADVERSARIAL-FAILURE-LEDGER-20261013.md` for F01–F07. The separate offline v0.2 package is **not stored in this repository**. Its red tests are not runnable from a plain GitHub checkout; obtaining the exact candidate artifact is a blocking prerequisite for independent reproduction. Do not mistake a failure ledger for independent verification. Keep the test suite explicitly excluded from default CI until the candidate code and immutable provenance are admitted.

## Completion rule
A successful tool is not a successful handoff if the next engineer cannot independently reproduce what worked, see what failed, locate the evidence, and determine who may say no.
