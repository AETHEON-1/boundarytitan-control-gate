# BT-RSI-010 | Swarm Composition Controlled Simulation

**State: YELLOW / DEVELOPMENT EVIDENCE.** Pinned parent: `32b0b64da8a9677534a542623ccfe5a9fdf04224`. No autonomous agents, deployed swarm, external effect, independent review, or permission to execute consequences.

## Human translation
Two workers may each obey their own instructions and still collectively exceed an authorized limit. Counting workers is not counting independent evidence. A stopped worker does not mean its queue, successors, or orchestrator have stopped.

## Composition arrows
```text
Human authority -> task scope -> worker A ----+
                            -> worker B ----+--> orchestrator/queue --> resource --> consequence
                            -> successor C -+          |                 |
                                          global cap   revocation       external observation
```
Every arrow is separately challengeable. A resource-side consequence is not established by a gate log alone.

## Six preregistered controlled negative controls
1. Two individually allowed amounts of six exceed a shared cap of ten; a candidate global budget rejects the second.
2. A successor inherits a token but not valid task/action authority; a naive delegation model permits the wrong action.
3. A copied bearer token impersonates another worker in a naive gate; a worker-bound fixture denies it.
4. A queued action executes after stop in an unguarded consumer; a candidate commit-time check denies it.
5. Two worker reports share one underlying evidence source; a provenance-aware count returns one.
6. An orchestrator bypasses a stopped application gate by writing effects directly; a candidate API gate denies it but **does not prevent direct resource writes**.

## Result interpretation
Passing the seven tests means the expected synthetic failures were observed and the bounded fixture rejected corresponding API requests. It does **not** prove swarm composition is bounded. No concurrent workers, actual cryptographic principals, global distributed transactions, independently owned resource, model-generated behavior, or independent human authority verification are exercised. The orchestrator bypass remains an explicit defeating example for application-only enforcement.

## Repo-standard handoff
- Roles: RSI Scout (inventory), Builder (fixture), Breaker (negative controls), Evidence Keeper (pinned receipts).
- Change: offline Python six-case composition battery and CI hook.
- Consequence surface: research branch files and CI only.
- Decision/consequence owner: human repository owner, not independently authenticated by this fixture.
- Stop: repository owner and GitHub access controls; effective external independence not tested.
- Command: `cd research/rsi/BT-RSI-001 && python3 -m unittest -v test_swarm_composition.py`.
- Evidence: CI run at final SHA; retain raw failures and integrity-manifest receipts.
- Unknowns: global cap under concurrency, cross-host delegation, post-revocation effects, independent resource custody, authority legitimacy, model-generated coordination.
- Disposition: YELLOW; no merge, deployment, field testing, certification, or independent validation.

**Stopping condition:** six negative controls, pinned clean CI, explicit residuals, and human review before advancing to a real bounded multi-worker runtime. CAN ⊬ MAY.
