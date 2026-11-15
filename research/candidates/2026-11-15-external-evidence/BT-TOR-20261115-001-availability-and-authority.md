# BT-TOR-20261115-001 | Tor availability, cryptographic authority and enforcement

Recorded: 2026-11-15. Version: v0.1.
State: YELLOW / EXTERNAL EVIDENCE CANDIDATE / HUMAN ADMISSION PENDING.
Source class: Level 4 case evidence under 02-CANONICAL-SOURCE-HIERARCHY.md.
Origin: United Systems of America investigation; proposed receiving lanes: Cybersecurity / Reality Benchmarks; secondary Cryptography and distributed revocation. This cross-reference does not transfer authority or change any lane constitution.
Human owner and evidence-admission authority: Michael J. Cates / human BoundaryTitan owner. Repository review staging authorized by the human instruction of 2026-11-15; acceptance and merge remain separate decisions.
ExecutionAuthorized: false. PublicationAuthorized: false (outside this expressly requested repository review surface). Independent reproduction: NOT PERFORMED. Machine certification: false. Archive admission: PENDING HUMAN REVIEW.

## 1. Source ledger and chronology

Primary publisher statements retrieved 2026-11-15 through web text retrieval. Publisher assertions are not independent incident telemetry or judicial findings. Source URLs are pointers, not immutable snapshots; raw publisher bytes, independent custody and source hashes are not established.

| ID | Date | Source and bounded claim |
|---|---|---|
| S1 | 2026-10-28 | [Tor 0.4.9.15 announcement and changelog](https://lists.torproject.org/mailman3/hyperkitty/list/tor-announce%40lists.torproject.org/message/WXHTSV43NO5UZQ7Q634S5NS5MIRL5JSJ/): additional defenses against high-volume directory requests; primary release text retrieved. |
| S2 | 2026-10-29 | [Relay mailing-list thread](https://lists.torproject.org/mailman3/hyperkitty/list/tor-relays%40lists.torproject.org/thread/UNO52SLLWY6E3OM2P56DCB656NSIDAEZ/?sort=date): operator reports earlier flood observations. First-party operator testimony, not independently replayed measurements. |
| S3 | 2026-11-12 | [DOJ Operation TorNado release](https://www.justice.gov/opa/pr/international-law-enforcement-operation-targeting-opioid-and-fentanyl-traffickers-dark-web): JCODE/Europol announcement of coordinated investigations during May 2025–October 2026; DOJ reports 354 arrests, 132 in the US, more than $234 million seized, approximately 5.7 metric tons of drugs and 209 firearms. An arrest or charge is not conviction. |
| S4 | 2026-11-12 | [DOJ court-document index](https://www.justice.gov/opa/documents-operation-tornado-2026): index retrieved; individual filings and underlying legal authority not adjudicated or reviewed here. |
| S5 | 2026-11-13 | [Tor security release 0.4.9.17](https://forum.torproject.org/t/security-release-0-4-9-17/22454): publisher reports ongoing DDoS affecting most relay operators, high circuit load and additional defenses under consideration. |
| S6 | 2026-11-13 | [Tor announcement mailing list changelog](https://lists.torproject.org/mailman3/hyperkitty/list/tor-announce%40lists.torproject.org/latest), entry David Goulet, release 0.4.9.17: changes IPv6 accounting to /64 prefixes; removes Bastet directory-authority keys because of a potential compromise, with possible reinstatement using replacement keys. This list URL is mutable. |

Earlier DoS-related evidence precedes the public November 12 announcement; it does not date the onset of the specific current circuit flood or establish separation from the earlier multi-month investigations. Source S3 does not say that law enforcement conducted a network-wide DDoS. S5 and S6 do not attribute the attack to law enforcement. Same-release inclusion of two fixes does not establish a causal relationship.

## 2. Three distinct records

- A / Enforcement: SUPPORTED as a DOJ-reported coordinated criminal investigation and seizure/arrest announcement. Individual guilt, authorization of specific operations, methods, collateral effects and court findings NOT ESTABLISHED in this review.
- B / Availability: SUPPORTED as a Tor Project report of an ongoing DDoS and emergency mitigation. Independent effect measurement, exact onset, traffic admissibility at each enforcement point, root cause, attacker identity, cumulative budget adequacy, and actual outage extent INDETERMINATE.
- C / Cryptographic authority: SUPPORTED as a changelog report of Bastet key removal due to possible compromise. Actual compromise, key misuse, consensus corruption, network-wide revocation completion, and residual effective authority INDETERMINATE.
- Causal link A→B, B→C, A→C or common actor: INDETERMINATE / no affirmative connecting evidence located. AI involvement, deanonymization and connection to any unverified November 17 cyberattack rumor are not established. No attribution or accusation admitted.

## 3. First unsupported arrows and bounded model

Availability hypothesis, not reproduced incident mechanism:

Reachable request → protocol handling → resource allocation → aggregate contention → reduced service → affected user.

First unsupported arrow A1: local protocol admission or successful request handling → preservation of aggregate availability. Local protocol validity is not legal permission; the sources do not establish that every observed request was valid, authorized, or admitted. Abuse can include invalid requests and existing defensive checks. An aggregate budget may exist and still be exhausted or misconfigured.

Cryptographic hypothesis:

Key custody → trusted identity → directory-authority participation → key removal → dissemination and adoption → effective denial → scoped recovery.

A2: upstream key removal → timely network-wide extinction of affected signing/consensus influence. A removed key may be irrelevant to particular actors, versions or consensus thresholds; no surviving authority is asserted. Determine exact trust-root and quorum behavior before inferring effects.

Enforcement hypothesis:

Investigative capability → valid jurisdiction and legal authorization → scoped action → observed outcome → consequence ownership and available remedies.

A3: technical reach or reported enforcement success → authority to disrupt unrelated shared infrastructure. No evidence connects this operation to such disruption.

Defensive hypothesis:

Mitigation policy → local resource restriction → aggregate availability improvement → legitimate-user access and privacy outcomes.

A4: local mitigation effectiveness → acceptable system-wide collateral effects. Shared-prefix accounting could have tradeoffs; actual false-positive impact not measured here.

## 4. Authority, consequence and external stop

Tor upstream maintainers publish software; individual operators administer their relays; directory authorities contribute to consensus under protocol trust rules. Effective role allocation, keys, quorum, update adoption and emergency/recovery authority are not fully audited. Operators can control their own infrastructure to the extent their actual permissions allow; no global independent stop is demonstrated or claimed absent. Do not confuse upstream recommendation with operational enforcement.

Government actors' authority is case- and jurisdiction-specific. The DOJ announcement identifies participants, not a blanket right to interfere with Tor. Court records would need separate review. The human owner has repository disposition authority only, not authority over Tor, users, investigators or third-party infrastructure.

Potential consequence bearers: relay operators (service and resource burden), legitimate users including people relying on private communication, and communities affected by illicit drug distribution. These are affected classes, not identified victims or measured harms in this incident. Actual legal liability and accountable incident-specific owners are unestablished. Availability impact may be reversible after recovery; missed time-sensitive communication may not be. No affected individual is identified or investigated.

External stop for this documentation: human repository owner may decline, close or withhold merge/admission. Platform enforcement is not independently tested. For any future isolated experiment: a separately authorized human test owner controlling an externally administered fixture shutdown, with independent observation and abort on scope/custody failure; exact mechanism and owner to be established before execution.

## 5. Published BoundaryTitan continuity (not independent evidence)

All five linked articles retrieved in this review. They identify pre-existing research questions, not proof of the incident mechanism or independent corroboration.

- [How Do Hackers Win? Shining a Light on the Cockroach Layer, Aug 30](https://boundarytitan.wordpress.com/2026/08/30/how-do-hackers-win-cockroach-layer/): reachable consequential capability after understanding, ownership or control decays. Relevance is conditional: persistent neglected capability has not been established in this Tor incident.
- [From the Sigma-2 Diagonal to CAN ⊬ MAY, Sep 13](https://boundarytitan.wordpress.com/2026/09/13/from-sigma-2-diagonal-to-can-may-minimum-boundary/): separate capability, authorization, stopping and extinction of effective authority.
- [Revocation Is Not Deletion, Oct 19](https://boundarytitan.wordpress.com/2026/10/19/revocation-is-not-deletion-when-the-gate-works-but-authority-survives/): prior synthetic inquiry into persistent authorization and consequence after revocation. Not Tor-specific evidence.
- [Authority Lifecycle Atlas, Oct 27](https://boundarytitan.wordpress.com/2026/10/27/think-like-the-adversary-protect-like-the-engineer-authority-lifecycle-atlas/): trace credential lifecycle, cross-domain responsibility and actual consequences.
- [The Brake That Could Not Prove Its Authority, Nov 13](https://boundarytitan.wordpress.com/2026/11/13/the-brake-that-could-not-prove-its-authority/): component-level permissions do not settle composition or legitimate intervention authority. Contemporary publication date does not establish anticipatory discovery of the Tor incident.

Prior discussion references The Cockroach Layer III: The Justice Tornado, June Cockroach Layer article, November 4 release 0.4.9.16, and November 14 adaptive-behavior testimony. Exact original text or discrete source record for these specific claims not retrieved in this pass; retained as unresolved pointers rather than promoted evidence. Standalone White House TorNado release not located by targeted search; verified announcement is DOJ, not White House. Non-retrieval is not proof of nonexistence. User-supplied screenshots initiated investigation; raw images are not included or authenticated in this repository record.

## 6. Reuse existing research, do not mint new doctrine

Pinned baseline: d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75.
- [CONTRIBUTING.md](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75/CONTRIBUTING.md)
- [01-PROJECT-CONSTITUTION.md](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75/01-PROJECT-CONSTITUTION.md)
- [02-CANONICAL-SOURCE-HIERARCHY.md](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75/02-CANONICAL-SOURCE-HIERARCHY.md)
- [CRYPTOGRAPHY-LANE-v0.1.md](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75/CRYPTOGRAPHY-LANE-v0.1.md)
- [BT-HC-004](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/d4e66b6262f79e2b0f8478a8c1118c8bd9a9ca75/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml): existing consequence-path dominance challenge, developed for agentic/consequence-bearing execution; cross-domain analogy proposed, not scope expansion.
- [Issue #127](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/127) and [Issue #146](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/146): independent enforcement, distributed revocation and evidence custody handoffs.
- Related unmerged review proposals: [#132](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/132), [#135](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/135), [#154](https://github.com/AETHEON-1/boundarytitan-control-gate/pull/154). Not modified and not represented as executed.

Bounded duplicate screening: pinned main recursive tree (not truncated), targeted issue search for TorNado/Bastet/Tor network, and returned open PR titles/descriptions reviewed; no matching dedicated case located. Unmerged branch contents not exhaustively searched. Existing controls and frozen records remain untouched. This is new incident intake, not a new canonical benchmark or independent finding.

## 7. Specialist falsification and omissions

Read-only review first: distributed systems/SRE and Tor protocol specialists should reconcile release notes with actual load, admission/rejection rates, resource accounting, version population and effect measurements; cryptographers should establish trust-root handling, quorum, propagation and recovery semantics; independent legal specialists should establish scope from actual public authority documents; privacy and human-rights specialists should examine defensive collateral effects.

Proposed negative controls, design only, NOT TESTED:
- Availability: in an isolated, synthetic resource-allocation model, distinguish rejected requests, lawful ordinary demand, locally accepted load and global depletion. If independently observed aggregate limits contain the declared overload without forbidden service loss under the declared envelope, the specific missing-aggregate-control hypothesis is weakened or defeated for that model. If depletion occurs, distinguish exhaustion under acknowledged finite capacity from an absent or bypassed control; neither proves unauthorized real-world execution.
- Revocation: in a non-networked toy trust-state model, compare updated and stale versions, unaffected roots, quorum behavior and explicitly bounded expiry. Falsifier of a residual-authority claim is independently observed rejection by the relevant population throughout the claimed interval. No real keys, real consensus manipulation or live testing.
- Causality: independently corroborated incident timeline, source attribution and lawful investigative records could establish or contradict proposed links; temporal proximity alone cannot. Earlier related floods are a competing explanation; separate attack actors, unrelated maintenance, ordinary demand, regression and defensive false positives remain candidates where evidence permits.
- Defensive authority: compare service availability with privacy-preserving access and false-positive effects in a synthetic fixture. Recovery metrics alone cannot establish acceptable collateral impact.

Required receipts: version and time window, defined denominator, precise claim, original publisher snapshots and hashes when available, independent effect observation, rival explanations, negative evidence, accountable owners and independent stop authority. Do not collect user identities, credentials, traffic captures containing sensitive information or operational attack targeting information.

No tests or production probing performed. No new executable control, configuration change, exploit procedure, or specialist contact authorized. Reopen upon primary-source correction, independently measured impact, established key misuse or effective revocation evidence, causal evidence, credible counterexample, or human-owner direction. Closure requires independent source and specialist review and explicit human disposition; no automatic closure.

## 8. Break-pass and disposition

Evidence gap: source text retrieved, not immutable source custody. Mechanism gaps: request admissibility, aggregate boundary, effective key authority, collateral impact, and event attribution unknown. Scope: documentation only. Named repository owner is not the incident owner. Reversibility: review branch can be rejected; public GitHub staging is itself externally visible and not represented as confidential or guaranteed erasable. No self-certification, no promotion of article analogy into case proof, no enforcement or deployment inference.

Repository integrity: this candidate requires tracked-tree manifest reconciliation and exact verification receipt before any approved merge. No CI result asserted in this record; hosted checks may run automatically on staging. No prior failure ledger overwritten.

HTK: A network can provide legitimate service and still be overwhelmed. Removing a trusted key and proving that it can no longer exercise influence are different questions. Neither fact identifies the attacker.

Final research state: YELLOW / CANDIDATE ONLY / HUMAN DISPOSITION PENDING. Execution NOT AUTHORIZED. Independent validation NOT PERFORMED. No doctrine changed. Freeze the evidence. Never freeze the search. CAN ⊬ MAY.
