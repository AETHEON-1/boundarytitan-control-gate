# Unknown-Unknowns Challenge Battery | Boundary Engineering
**Status: YELLOW. Adversarial hypotheses, NOT TESTED unless separately evidenced.**
**Purpose:** Find failure surfaces the human owner, implementing engineer, model, or specialist did not think to ask about. This battery supplements, never replaces, existing tests.

## Discovery protocol
1. Independently reconstruct consequence paths from resource APIs, credentials, queues, hardware, logs, and recovery procedures. Do not start from the claimed architecture diagram.
2. Enumerate every authority-bearing state transition: issue, delegate, cache, queue, retry, commit, stop, restore, reissue, override, observe, appeal.
3. Attack each transition across temporal, compositional, organizational, physical, and evidentiary boundaries. Vary order, crash point, privilege, clock, and observer availability.
4. Run an authorized positive control and a negative control for each candidate; a deny-all system is not a working brake.
5. Preserve null results, surprising effects, omitted paths, misleading test assumptions, and cases that cannot be safely reproduced.
6. Require an independent specialist to propose at least one defeating observation absent from the original plan.
7. Freeze exact specimen SHA, environment, sequence, independently observed effect, first unsupported arrow, and human disposition. No model self-approval.

## Previously easy-to-miss attacks
| ID | Failure surface | Unexpected question | Harmless defeating test |
|---|---|---|---|
| UU-01 | Clock rollback / skew | Can expired MAY become current MAY? | Move sandbox clocks across token expiry |
| UU-02 | Split brain / quorum loss | Can two partitions both authorize the last commit? | Partition fixture resource instances |
| UU-03 | Cross-store crash window | Can witness and resource disagree after a crash? | Crash between independent DB commits |
| UU-04 | Backup restoration | Can a stale backup resurrect a revoked identity? | Restore pre-stop snapshot with same keys |
| UU-05 | Key rotation overlap | Can an old verifier accept retired grants? | Reintroduce old key version |
| UU-06 | Delegation cascade | Can a child survive parent cancellation? | Stop ancestor and commit descendant |
| UU-07 | Retry/idempotency drift | Does retry become a new authorized action? | Reuse logical action with changed token |
| UU-08 | Compensating action | Can rollback itself cause unauthorized consequence? | Simulate compensation without fresh MAY |
| UU-09 | Outbox/event bus | Can already-published work commit after resource stop? | Release queued event after stop |
| UU-10 | Alternate ingress | Is a direct API, batch job, migration or admin console ungated? | Enumerate test endpoints and bypass gate |
| UU-11 | Identity aliasing | Can renamed principal, service account or role inheritance inherit MAY? | Substitute equivalent identities |
| UU-12 | Resource aliasing | Does permission for one name reach another resource? | Resolve symlink, alias, namespace or redirected target |
| UU-13 | Policy/version drift | Can old policy authorize a new consequence? | Change policy after grant issuance |
| UU-14 | TOCTOU on environment | Can location, device, amount or target change after approval? | Mutate bounded context before commit |
| UU-15 | Budget composition | Can individually allowed actions exceed cumulative consequence? | Parallel spend across related tasks |
| UU-16 | Resource exhaustion | Does disk-full, OOM or observer backpressure disable denial? | Fault-inject failures at commit boundary |
| UU-17 | Logging as attack surface | Can logs forge, omit or reorder events? | Compare independent effect oracle to log |
| UU-18 | Test harness privilege | Does test setup itself bypass the brake? | Run fixture under least privilege |
| UU-19 | Human override collusion | Can two nominal roles be one effective principal? | Compare admin roots and shared recovery keys |
| UU-20 | Emergency restoration | Can operator restore service without reauthorization? | Exercise sandbox break-glass replay |
| UU-21 | Physical residual energy | Does software stop leave stored energy or motion? | Specialist-only nonhazardous simulator |
| UU-22 | External irreversible effects | Was action already accepted downstream before stop? | Simulate settlement/acknowledgment ordering |
| UU-23 | Evidence custodian capture | Can one administrator alter effect and witness? | Review shared root credentials |
| UU-24 | Observer loss | Does enforcement continue while evidence disappears? | Disconnect independent observer |
| UU-25 | Supply chain/update | Can deployment change the gate while tests stay green? | Compare signed artifact to tested SHA |
| UU-26 | Recovery deadlock | Does fail-closed make recovery depend on compromised actor? | Test independent quarantine release |
| UU-27 | Semantic drift | Is 'stop' defined as no new admissions rather than no new effects? | Define linearization and downstream cutoff |
| UU-28 | Human social engineering | Can approvals be manufactured by workflow fatigue? | Controlled paper/tabletop authorization challenge |
| UU-29 | Machine-selected scope | Can requester omit the path that would falsify it? | Blind specialist path inventory |
| UU-30 | False positive brake | Can every test pass because no effect ever worked? | Independently observed positive control |
| UU-31 | Evidence/authority collapse | Does verified evidence silently confer release authority? | Submit correct report from unauthorized issuer |
| UU-32 | Cross-tenant confusion | Can a grant for tenant A affect tenant B? | Harmless tenant-isolation fixture |
| UU-33 | Snapshot clone | Can cloned VM identity create two active lease holders? | Duplicate sandbox worker image |
| UU-34 | Cancellation race | Does canceled async work still complete? | Pause effect between check and commit |
| UU-35 | Dependency fail-open | Can an outage cause cached policy to permit? | Cut issuer/witness connectivity |
| UU-36 | Data lifecycle | Can revoked permission persist in exports, search indices or backups? | Query secondary stores after stop |

## Independent omission search
Specialist must identify: (a) a path missing from the architecture, (b) a hidden shared authority, (c) an evidence source controlled by the subject, (d) a case where stop is merely ceremonial, (e) a downstream consequence already past the point of reversibility, and (f) one domain-specific failure absent from this table. A complete table is not a complete universe.

## Reporting
For every test: ID; specimen SHA; exact environment; authority and resource; independent observation; expected vs actual; first unsupported arrow; falsifier; alternative explanation; evidence state SUPPORTED / CONTRADICTED / INDETERMINATE / TEST INVALID / NOT TESTED; repair; regression; external reviewer; human disposition.

## Stop criterion
Only **no observed failure within a declared, independently challenged scope** may be reported. Unknown coverage is INDETERMINATE, not Green. No universal unbreakability, deployment, legal compliance or safety certification. No live third-party or hazardous testing without authority.
