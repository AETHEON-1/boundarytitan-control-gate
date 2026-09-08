# 17 — Test Strategy

## Test layers

Unit tests
- rule evaluation
- state transitions
- receipt validation
- permission scope

Integration tests
- proposal to receipt
- human decision to permission
- permission to release
- revocation to execution denial

Authority-boundary tests
- machine cannot create approval
- validation cannot create permission
- Green cannot create release
- receipt cannot create execution

Adversarial tests
- replay
- stale evidence
- owner collision
- hidden action
- credential misuse
- stop-path outage
- restart inheritance
- confused deputy
- token audience substitution
- stale authorization cache
- check-to-commit revocation race
- TOCTOU action mutation
- tool poisoning
- tool shadowing and name collision
- tool rug pull after approval
- delegation amplification
- cross-agent authority laundering
- local-permission composition into unauthorized aggregate consequence
- output-to-execution laundering
- hidden side-effect channels
- fail-open dependency outage
- brake dependency capture
- policy-version drift
- downstream prompt cascade
- recovery/break-glass bypass

Consequence-path dominance tests
- enumerate every declared execution and side-effect surface
- require an enforcement decision on every reachable consequential path
- attempt direct, fallback, recovery, queued, peer-agent, restart, and cached-session bypasses
- treat UNKNOWN mediation coverage as a hold, not a pass
- verify the gate can make NO stick before irreversible commit
- verify the executor cannot disable or outlive the brake through a shared dependency

Delegation tests
- descendants cannot gain authority absent from parent authorization
- acting agent cannot treat peer request as permission
- revoked ancestor authority invalidates bounded descendants within the declared latency budget

Composition tests
- individually permitted actions cannot silently exceed aggregate consequence limits
- aggregate state change re-enters authority review when a declared boundary is crossed

Latency tests
- revocation reaches enforcement before irreversible commit
- stop path dominates planner/executor timing
- cached authorization expires within the declared revocation budget
- restart cannot resurrect expired or revoked authority

Ledger tests
- every critical transition emits an event
- event order and hashes remain valid
- corrections do not erase prior records
- missing events are detectable
- retries, recovery, and cancellation cannot create unlogged consequence paths

UI tests
- Green is never displayed as Approved
- receipt always shows “not permission”
- stop authority is visible
- missing owner/evidence/stop path cannot be hidden

## Public battery

`AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md` defines the current open defensive challenge surface.

The challenge is not to show that the gate works on the happy path.

The challenge is to find one path to consequence that does not have to cross it.

## Acceptance rule

A passing test suite is evidence of conformance to tested requirements. It is not certification of safety, correctness, complete mediation, legal authority, or deployment approval.

Only externally attributable evidence and human-owner disposition may change an open challenge state.
