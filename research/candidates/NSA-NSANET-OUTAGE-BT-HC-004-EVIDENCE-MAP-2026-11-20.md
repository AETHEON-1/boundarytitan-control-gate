# NSA NSANet outage — BT-HC-004 read-only evidence mapping v0.1

Prepared: 2026-11-20  
Record type: external incident / candidate analytical mapping  
Lane: Cybersecurity / Agent Authority Boundary  
Cross-reference: Reality Benchmarks; Authorization Machinery  
Evidence state: YELLOW — OPEN / INCOMPLETE  
BT-HC-004 test state: NOT TESTED  
Human authorization: placement of this analytical record approved; no doctrine change, certification, field testing, or deployment authorized.

## Scope and caution

This record applies existing BoundaryTitan test questions to public reporting about the NSA NSANet disruption on 2026-11-17 and reported impacts at NSA Georgia on 2026-11-18. It does **not** assert that an AI agent executed the patch, that an authorization control failed, or that intelligence collection stopped. A reported outage does not identify the failed control. The BT-HC-004 agentic control architecture is used here as a cross-domain analytical lens, **not** as proof that NSA deployed that architecture.

## Public evidence register

| ID | Attributable source / statement | Evidence class | Limits |
| --- | --- | --- | --- |
| E01 | NSA statement reported by AP and CNN: temporary degradation during scheduled routine maintenance, some internal systems affected | Official assertion, reported | Does not specify affected components, exact cause, or failure mechanism |
| E02 | NSA statement: mission-critical capabilities remained operational, citing redundant infrastructure | Official assertion, reported | Independent performance measurements not available |
| E03 | CNN Nov 18: four sources described effects at NSA Georgia, including inability to use NSANet to communicate with regional colleagues | Source-based reporting | Identities and technical logs not public |
| E04 | CNN Nov 18: workarounds and backup systems enabled information sharing | Source-based reporting | Availability, latency, completeness, and security equivalence unmeasured |
| E05 | DNI Jay Clayton, quoted by CNN and CBS: patching following software vulnerabilities caused systems not to return as expected | Attributed official causal explanation | Precise artifact, root-cause analysis, and change trace absent |
| E06 | CNN/CBS: AI-assisted vulnerability discovery or exploitation research contributed to patching pressure | Reporting about upstream research | **No evidence here of AI approval, deployment, or autonomous operational authority** |
| E07 | CNN/AP: no evidence of cyberattack reported at that time | Preliminary source/official assessment | Not an independent final forensic finding |
| E08 | CNN Nov 18: senior official said recovery slower than expected | Attributed source reporting | No measured RTO/RPO or final recovery certification |
| E09 | CBS Nov 18: two sources said NSANet was back up, with staggered arrivals continuing | Source-based status report | Does not establish full normal service or resolve all reported restrictions |

Sources (retrieved/consulted 2026-11-20):
- CNN Nov 18 syndication: https://krdo.com/politics/cnn-us-politics/2026/11/18/nsa-outage-disrupts-key-intel-hub-that-supports-middle-east-intelligence-and-operations-sources-say/
- CNN Nov 17 syndication: https://keyt.com/politics/cnn-us-politics/2026/11/17/exclusive-highly-classified-us-national-security-communications-network-goes-down-sources-say/
- Associated Press: https://apnews.com/article/22dc6be1bf1d1f5f86a7167f016e9526
- CBS Nov 18: https://www.cbsnews.com/news/national-security-agency-network-outage-software-vulnerability/
- Reuters Nov 17: https://www.reuters.com/business/aerospace-defense/trump-shrugs-off-spate-us-outages-says-things-like-that-happen-2026-11-17/

Source independence: syndicated CNN copies are **one reporting lineage**, not independent corroboration. Multiple outlets quoting the same NSA or DNI statement do not independently validate its technical contents. No original change tickets, approval records, system logs, incident report, or independently audited recovery metrics were obtained.

## Candidate consequence chain (not an observed execution trace)

AI-assisted vulnerability research [reported upstream]
→ vulnerability assessment [records absent]
→ patch/change proposal [records absent]
→ independent change review [unknown]
→ authorization [unknown]
→ release and deployment [specific trace absent]
→ NSANet disruption [reported]
→ fallback and recovery [reported; effectiveness not independently measured]
→ post-recovery validation [unknown].

**First unsupported causal/authority arrow:** reported patching → specifically identified, authorized and executed change → demonstrated technical cause of the disruption. Do not infer unauthorized action from missing public records.

## BT-HC-004 mapping

Existing challenge: [BT-HC-004](../../challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml). Its falsification criteria require a reproducible bypass, revocation failure before commit, or brake dependency capture. **None has been demonstrated for this incident.**

| Control claim / requirement | Incident-specific question | Needed evidence | Assessment |
| --- | --- | --- | --- |
| Complete consequence-path mediation | Did all maintenance execution routes cross the declared change gate? | Scope inventory; action-time approval and execution traces | UNKNOWN |
| Independent authorization | Who could approve, deny, or hold this specific change? | Named decision/release owners; signed authorization; scope | UNKNOWN |
| Revocation dominates commit | Could a stop request interrupt deployment before consequential state transition? | Commit boundary; stop request/acknowledgment; worst-case latency | UNKNOWN |
| Independent brake | Did the stop mechanism share dependencies with the failing system? | Stop architecture; independent exercise evidence | UNKNOWN |
| Recovery does not bypass authority | Were fallback/break-glass paths separately bounded, logged, expired? | Recovery authorizations and closure records | UNKNOWN |
| Owner continuity | Who accepted the risk and retained accountability? | Accountable-owner and change-risk records | UNKNOWN |

Existing challenge state **NOT_TESTED / UNESTABLISHED / OPEN remains unchanged**. No pass/fail inference.

## Authorization Machinery Adversarial Battery v0.1 mapping

Reference: [Authorization Machinery Adversarial Battery](../../AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md).

| Test | Narrow inquiry | Required record | Status |
| --- | --- | --- | --- |
| AM-01 consequence-path bypass | Alternate maintenance paths? | Surface inventory and gate traces | UNKNOWN |
| AM-04 approval replay | Approval bound to exact target/version/window? | Approval identifier, action hash, expiry | UNKNOWN |
| AM-06 revocation race | Stop before disruptive commit? | Commit timestamps and stop latency | UNKNOWN |
| AM-07 TOCTOU mutation | Reviewed artifact identical to deployed artifact? | Version/hash and dependency binding | UNKNOWN |
| AM-10 tool redefinition | Changed tool/dependency inherited old approval? | Version pinning and re-review records | UNKNOWN |
| AM-14 output-to-execution laundering | Did AI research output become executable authority? | Research-to-change provenance and authorization | NOT ESTABLISHED |
| AM-16 fail-open outage | Did degraded controls grant unintended access? | Fail-closed and degraded-mode traces | UNKNOWN |
| AM-19 ownerless consequence | Named consequence and decision owners? | Attributable role records | UNKNOWN |
| AM-20 brake dependency capture | Brake independently operable? | Dependency graph and exercise | UNKNOWN |
| AM-21 ledger omission | Complete event continuity? | Append-only records and gap detection | UNKNOWN |
| AM-22 policy-version drift | Policy at execution matched approved policy? | Version-bound policy records | UNKNOWN |
| AM-24 recovery-path bypass | Recovery permission bounded and retired? | Break-glass, expiry, closure evidence | UNKNOWN |

UNKNOWN means **not assessed**, not failure. Remaining battery tests are not excluded; relevance requires further evidence.

## Authority roles (unassigned pending records)

Use [07 Authority Role Model](../../07-AUTHORITY-ROLE-MODEL.md): accountable owner, decision owner, reviewer, operator, release authority, revocation authority, emergency-stop authority, evidence custodian, system custodian, and affected parties must be distinguished. No person or organization is assigned an operational role from inference. A nominal stop owner unable to act before consequence does not satisfy the availability requirement.

## Adversarial alternatives

Potential explanations requiring discrimination: (1) authorized change with unforeseen compatibility failure; (2) out-of-scope deployment; (3) independent infrastructure fault; (4) interaction of multiple maintenance actions; (5) stop operating as designed but after irreversible effects; (6) effective continuity despite loss of a normal channel; (7) malicious action despite preliminary reporting. These are hypotheses, **not equally supported findings**.

## Evidence acquisition / independent review obligations

Seek only lawfully releasable or appropriately reviewed evidence: approved change ticket; patch and configuration hashes; dependency and compatibility tests; deployment and failure timeline; risk acceptance; stop-path and rollback records; backup service-level measurements; restoration validation; provenance and custody. Public unavailability is not proof that internal controls or records did not exist. Do not solicit classified technical details, credentials, or live operational access.

Use [12 Consequence Receipt Specification](../../12-CONSEQUENCE-RECEIPT-SPEC.md) as a **field checklist**, not a permission artifact. No execution, decision, or closure receipt is claimed.

## Disposition and boundary

- Incident occurrence: REPORTED, with NSA acknowledgment.
- Detailed patch/root-cause trace: NOT INDEPENDENTLY VERIFIED.
- AI operational decision or autonomous deployment: NOT ESTABLISHED.
- Authorization failure, bypass, or brake failure: NOT ESTABLISHED.
- Recovery equivalence and full service restoration: NOT INDEPENDENTLY VERIFIED.
- BT-HC-004: NOT TESTED; authorization battery: NOT EXECUTED.
- Evidence: YELLOW / OPEN. No certification or incident closure.
- External stop / final disposition authority for BoundaryTitan record: Human BoundaryTitan owner.
- This record is **analytical evidence mapping only**; not a change to frozen doctrine or to the state of existing test objects.

**The ONE:** At the transition from approved maintenance to consequential infrastructure change, who held enforceable stop authority, by what independent mechanism, and what evidence demonstrates it could act before consequence?

CAN ⊬ MAY. No ledger, no trust.
