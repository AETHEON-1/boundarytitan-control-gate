# Next-person handoff | BT-HC-004 Disconnected Brake

**State:** YELLOW, documentation-only staged branch. No runtime test, merge, publication, or deployment has occurred.  
**Owner:** Human BoundaryTitan repository owner.  
**Brake:** The owner may reject, revise, or abandon this proposal. Nothing in this branch grants operational authority.

## Start here (in order)

1. Read `proposals/encyclopedia-of-chaos/EOC-BT-004-20261018-disconnected-brake.md`.
2. Read `challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml`.
3. Read `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md`, especially AM-01, AM-05, AM-06, AM-16, AM-17, AM-20, AM-21.
4. Read `CURRENT-REPOSITORY-STATE-v0.2.md`; it is a historical snapshot, not a fresh verification of this branch.
5. Review the two source artifacts generated in the conversation, `brake_connectivity_local_model_result.json` and `BT-HC-004-local-falsification-ledger-002.json`. **They are not attached to this Git branch.** Request the originals before relying on their exact bytes.

## What we know

- The first Python model deliberately allowed an unmediated executor to commit after STOP while a mediated route denied execution.
- A second Python model exercised 12 deterministic scenarios. All assertions matched the model's expected outcomes.
- Resource-side stop enforcement, removal of the direct path, and commit-time revalidation defeated the constructed bypass.
- These are demonstrations of model behavior, not proof of a vulnerability in the GitHub repository.
- No independent observation, actual concurrent processes, physical brake, database, or real deployment was tested.

## Do not lose these eight records

F01: constructed bypass survives gate-only STOP.
F02: direct executor was hard-coded to commit.
F03: stop timing not independently measured.
F04: real process/network/cache/race/restart not exercised.
F05: pre-STOP commits cannot be called post-STOP failures.
F06: one denied route does not prove all routes are denied.
F07: resource-side denial is only a local model result.
F08: no real consequence owner or independent custodian established.

## First task for successor

**Before running anything:** identify the exact repository specimen and commit, named test resource, owner, approved isolation boundary, stop authority, evidence custodian, and rollback plan. Do not test live services or third-party infrastructure.

**Baseline checks in an approved local checkout:**
```sh
npm ci
npm run typecheck
npm test -- --runInBand
npm run test:python
npm run verify:state
```
Record environment versions, checkout SHA, exit codes, and complete logs. These commands are proposed; **not executed during this handoff**. `verify:state` may fail on the staged branch because the tracked-tree manifest has not been reconciled; preserve that failure instead of silently regenerating the manifest.

**Bounded runtime challenge:** implement an isolated resource and independent stop authority; define the exact effective-stop boundary and in-flight action policy; inventory alternate paths; challenge STOP-versus-COMMIT, cached permission, restart, outage, and shared-dependency capture. Observe the resource independently. Keep attempted, denied, committed, missing, and indeterminate events.

## Acceptance and refusal

- **SUPPORTED** only for a declared, reproducible scope with independent resource-state evidence.
- **CONTRADICTED** if a reachable prohibited path commits after effective STOP under the declared timing policy.
- **INDETERMINATE** for missing path inventory, ambiguous chronology, or insufficient custody.
- **TEST INVALID** if controls, owner, environment, or measurement definition shift during the test.
- **NOT TESTED** for everything outside the executed scope.
- No automatic promotion to global safety, certification, deployment, or publication.

## Git handoff

Branch: `eoc/bt-004-disconnected-brake-20261018`  
First entry commit: `da25f42ff6822d0c3a916686008f37a9b62e5edf`  
Canonical Encyclopedia directory/index: **not verified**. This is a proposed location.  
Before merge: identify canonical index; reconcile current tracked-tree ledger and dependency findings; run checks; obtain independent specialist challenge; obtain explicit human-owner merge decision.

## Stop conditions

Stop and preserve evidence if an unexpected external endpoint is reached, a real credential or sensitive resource is encountered, test isolation is uncertain, a consequence is not reversible as declared, or the brake depends on the executor's cooperation.

**Do not turn a clean test run into a declaration of authority.**

CAN ⊬ MAY. No owner, no brake. No ledger, no trust.
