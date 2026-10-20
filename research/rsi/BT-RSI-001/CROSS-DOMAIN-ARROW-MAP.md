# BT-RSI-009 | Cross-Domain Arrow Map and Swarm Composition Preparation

**State:** YELLOW / DEVELOPMENT EVIDENCE. **Base SHA:** `8fdfa35c30fce0f1af51dbc8ef7e0b0550311530`. **Lane:** RSI research, isolated branch, unmerged. **Human disposition:** development approved; no merge, deployment, swarm dispatch, certification, or independent validation.

## Human translation key

A worker can know every specialist procedure and still lack permission. A ledger can record the door without enforcing it. An external control is only meaningful if the worker cannot rewrite, bypass, or impersonate it. A named human owner is not evidence that the person exists, has standing, or actually authorized the action.

## Two independent paths and their intersection

```text
EPISTEMIC: artifact -> observation -> inference -> evidence -> fact under stated standard
                       |            |          |           |
                    provenance   uncertainty  custody    independent challenge

AUTHORITY: source of authority -> jurisdiction -> standing -> authorized procedure
                                      |               |             |
                               applicability    verified owner   review/appeal

INTERSECTION: established facts + applicable rule + authorized decision maker
                                      |
                             bounded disposition
                                      |
                         independent execution gate
                                      |
                            resource-side effect
                                      |
                       consequence owner / stop / appeal
```

Every arrow has an **external challenge**, not an automatic promotion. Fact does not create rule; rule does not create jurisdiction; correct judgment does not create authority; signed metadata does not create legitimacy. The authority registry is not a self-appointing machine.

## Arrow interrogation register

| Arrow | Specialist question | Defeating observation | External source/owner needed |
|---|---|---|---|
| Artifact -> observation | Was the source faithfully captured? | Altered input or missing context | Evidence custodian |
| Observation -> inference | What competing explanations remain? | Alternative explanation fits | Domain specialist |
| Inference -> evidence | What is the provenance and standard? | Circular self-citation | Independent evidence reviewer |
| Evidence -> established fact | Under what standard is this established? | Source does not meet standard | Authorized fact finder |
| Fact + rule -> jurisdiction | Does this rule apply here? | Wrong jurisdiction or temporal scope | Institutional/legal authority |
| Jurisdiction -> standing | Who is entitled to decide? | Invented owner or delegated power | Identity/standing verifier |
| Decision -> execution | What resource path enforces the decision? | Direct write, admin override | Independent resource custodian |
| Execution -> effect | Was the actual resource changed? | Hidden queue or side effect | Resource-side observer |
| Revocation -> extinction | Did all delegated and queued paths stop? | Post-stop consequence | Independent stop custodian |
| Effect -> appeal/correction | Can an affected party challenge and remedy? | Nominal appeal with no power | Appeal/recovery authority |

## Cross-domain specialist reading

- **Security:** IAM, root access, key custody, replay, race windows, and shared trust domains.
- **Distributed systems:** queue visibility, commit barriers, idempotency, durability, retries, and partial failure.
- **Law/public administration:** actual legal authority, jurisdiction, standing, review, appeal, and enforceability.
- **Safety/robotics:** actuator-side effects, physical stop power, and irreversibility.
- **Finance/operations:** cumulative spend, delegated purchases, third-party obligations, and reconciliation.
- **Human factors:** persuasive evidence, reviewer attention, misleading summaries, and automation bias.

No sector's authority is inherited by another sector. The ledger connects evidence, not permission.

## Cross-language testing contract

Canonical JSON vectors in `cross_language_vectors.json` use **synthetic records only**. Python and JavaScript implement the same narrow predicate: required human authority fields must be present and nonblank; an AI claimant cannot serve as the named decision owner; evidence states must be one of SUPPORTED, CONTRADICTED, INDETERMINATE, TEST INVALID, NOT TESTED. This is a **metadata lint**, not verification of legitimacy or effective control. Cross-language agreement demonstrates consistency on these vectors, not real-world truth. SQL is separately exercised by BT-RSI-005's SQLite transactions; Linux permissions by BT-RSI-007. TypeScript/Jest and shell are already used by repository verification. Do not add languages merely for a language count.

## Swarm composition preregistration, NOT EXECUTED

The worker is not the system. The arrows are the system.

Candidate falsifiers: individually scoped workers aggregate to exceed a global spending cap; two workers each use valid credentials but share a bypass path; an orchestrator routes around a denied custodian; queued effects survive global stop; successor workers inherit stale authorization; workers jointly manufacture independent-looking corroboration; independently harmless outputs combine into a consequential instruction; approval fatigue collapses meaningful human refusal.

Required future harness: separate principal identities, global resource budget, durable revocation epoch, resource-side observer, blinded adversarial operator, and owner-authenticated disposition. No swarm launch before a separate human authorization.

## AGENTS.md handoff

- **RSI Scout:** inspect missing arrows and unmodeled consequences. Read-only.
- **RSI Builder:** develop cross-language fixture and documentation only.
- **RSI Breaker:** target mismatched predicates and composition counterexamples.
- **RSI Evidence Keeper:** preserve raw CI receipts, manifest hashes, negative controls, and unresolved claims.
- **Change digest:** cross-domain map, language parity vectors, test runner, composition preregistration.
- **Consequence surface:** isolated research files and GitHub Actions CI; no external effects intended.
- **Decision/consequence owner:** human BoundaryTitan repository owner (identity/standing not independently verified here).
- **Stop authority:** human repository owner and GitHub repository controls (effective independence not verified).
- **Test command:** `cd research/rsi/BT-RSI-001 && python3 -m unittest -v test_cross_language_contract.py`; `node research/rsi/BT-RSI-001/cross_language_contract.js`.
- **Raw output:** GitHub Actions workflow receipts pinned to final SHA, not a machine-issued certificate.
- **Failure/uncertainty register:** metadata lint is not legitimacy; local key signing is not independent custody; root/admin bypass; no real human study; no external device; no cross-host swarm; no demonstrated global composition enforcement.
- **Human disposition:** YELLOW / development only. Independent review and deployment require separate authorization.

**Stopping criterion:** complete documentation, pinned test receipts, no unacknowledged manifest drift, preserved limits, and an explicit human decision before swarm construction.
