# AI-OFF / The Empty Chair — bounded software workshop v0.1

**State:** YELLOW. Candidate experiment only. No merge, publication approval, physical actuation, or live authority.

## Question
What remains inspectable when a live AI model is absent? Distinguish deterministic software behavior from authority, enforcement, independent reproduction, and consequence control.

## Scope and pinning
This candidate is based on `main`, separately from draft PR #79 (robotics negatives) and draft PR #80 (specialist front door). Do not mix their test counts or evidence. Record the exact tested commit SHA, runtime versions, and full logs. Tests use only local TypeScript fixtures; they neither contact a model nor operate a device.

## Executable characterization
`src/tests/ai-off-empty-chair.test.ts` contains:
- **A/B:** identical structured proposal from AI-labelled and human-labelled proposers produces the same read-only CAN→MAY assessment. The kernel does not evaluate proposer identity.
- **C1:** removal of the declared authority-basis identifier produces `HUMAN_REVIEW_REQUIRED`.
- **C2, limitation:** a retained but externally revoked identifier produces the same result as an active identifier. The current kernel has no independent grant validity/epoch lookup and cannot establish revocation enforcement. `ELIGIBLE_FOR_EXTERNAL_DECISION` is never permission.

These are software characterization tests, not proof of an independent brake. C2 is an intentional *negative finding* to preserve, not a passing revocation-control test.

## Reproduce
```bash
git rev-parse HEAD
node --version && npm --version && python3 --version
npm ci
npm run typecheck
npm test -- --coverage=false
npm run test:python
npm run verify:state
```
Capture exact exit codes, raw logs, dependency-lock hash, and environment. For a credential-null rerun, remove model credentials *from the test process environment*, without printing values. For a genuinely network-denied claim, execute already-installed dependencies under independently enforced network isolation; this candidate does **not** implement or claim such isolation.

## Falsifiers and next tests
1. Proposer identity changes the result with all material proposal fields fixed.
2. Missing authority basis yields external-decision eligibility.
3. A stale/revoked identifier remains eligible for external decision: **currently characterized as a limitation**, requiring a separate trusted authority-state/epoch check before any enforcement claim.
4. Any test secretly requires model credentials or outbound inference.
5. A reviewer cannot reproduce from pinned source without an AI assistant.

Do not promote `C1` into `C3: revocation enforced`. Identifier presence is not validity, and a read-only assessment is not an execution gate.

## Evidence ledger / custody
For each run record: claim ID, branch, exact SHA, Node/npm/Python versions, OS, dependency lock SHA-256, exact commands and exit codes, raw logs and hashes, network condition, credential condition (names only), observations, contradictions, reviewer independence, and reopen trigger. Preserve failed predecessor evidence. No machine certification or self-admission to canonical archive.

## Unexecuted acceptance
External no-network run, true credential-null audit, independent specialist reproduction, current-grant lookup, queued-action cancellation after revocation, physical stop enforcement, and human review: **NOT TESTED** unless separately evidenced.

**CAN ⊬ MAY. Only GREEN proceeds.**
