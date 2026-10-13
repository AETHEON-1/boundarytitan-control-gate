# Big Picture: Evidence Transit and Encyclopedia of Chaos v0.1

Task sensors (5 enabled; original schedules unchanged) → source-output envelope → transport custody boundary → replay/consistency tests → HTK + Sigma-2 / Raccoon inspection → review artifact → separately authorized Encyclopedia admission → linked correction or further tests.

## Operational layers
1. **Discovery (CAN):** existing ChatGPT scheduled tasks surface material deltas, inverse cases, missing evidence and failures. Tasks are not authorized by this repo merely because a task exists.
2. **Transport (candidate):** signed HMAC packets establish that a holder of the shared transport key supplied the exact bytes. They do NOT establish that ChatGPT actually executed the claimed task or authored the bytes. Rotate keys externally and NEVER store real keys in Git, public artifacts, or task prompts.
3. **Evidence:** raw JSON must match the structured finding; content SHA-256 detects byte change; a supplied prior ledger must be valid and include previous run keys. Missing run identity or contradictory records are rejected.
4. **Challenge:** HTK, Sigma-2, Raccoon and competing hypotheses expose unsupported arrows; no machine classification issues permission.
5. **History:** versioned ledger and Encyclopedia proposal; human admission freezes historical record. Corrections are new records. Independent immutable custody is not established.
6. **Consequence:** human-controlled and externally enforced authority; none of the intake workflows may transmit, merge, publish, purchase or deploy based on candidate output.

## End-to-end executable synthetic demonstration
`node --test scripts/evidence-transit.test.js scripts/task-replay-ledger.test.js scripts/task-delivery-envelope.test.js scripts/task-to-encyclopedia.test.js`

The tests use a synthetic key that MUST NOT be used operationally. CI does not use production secrets, does not publish private task results, and does not modify any task configuration.

## Blocking gaps before live unattended claims
- **No Task-origin attestation.** The scheduler output needs an independently attributable task run ID, execution time, original output and external corroboration.
- **No installed unattended Tasks → GitHub transport.** A GitHub workflow triggered by a new commit or dispatcher cannot prove ChatGPT created the original result. No connector credentials or webhooks configured.
- **No shared atomic replay store.** Forks can pass independently against stale ledgers. Need an external single-writer or conditional CAS revision and a separately witnessed head.
- **No verified external runtime stop** for arbitrary machine-generated code.
- **No verified archive append-only enforcement** or independent case custodian.
- **Privacy control missing:** task output can include personal job details or sensitive attribution; exclude from public workflow artifacts until explicit redaction and review.

## Prior failure and test preservation
Run 38459903618 FAILED because its negative-result fixture changed structured data without updating original bytes. That showed correct consistency rejection; the fixture was repaired without weakening validation. Run 38460039285 PASSED. Run 38456854956 preserved source-validation failures NEG-F01..03, repaired and retested later. PR #60 preserved untested live task-to-GitHub origin. A green repository workflow does not close the source-delivery gap.

## Next admissible field experiment
One individually selected task output with independently observed run attribution → isolated key custody → signed envelope → constrained authenticated receipt → independently compare original output and run metadata → one-writer persistent ledger with externally witnessed previous head → human archive decision. All research-only until a human separately authorizes each consequential action.

CAN ⊬ MAY. Maximum investigative reach, minimum authority substitution.
