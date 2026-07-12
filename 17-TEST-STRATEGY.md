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

Latency tests
- revocation reaches enforcement before irreversible commit
- stop path dominates planner/executor timing

Ledger tests
- every critical transition emits an event
- event order and hashes remain valid
- corrections do not erase prior records

UI tests
- Green is never displayed as Approved
- receipt always shows “not permission”
- stop authority is visible
- missing owner/evidence/stop path cannot be hidden

## Acceptance rule

A passing test suite is evidence of conformance to tested requirements. It is not certification of safety, correctness, or authority.
