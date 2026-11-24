# EC-GFA-20261124 | Global failure and authority candidate intake

Version: v0.1 | Date: 2026-11-24 (America/Chicago)
State: YELLOW / HUMAN-APPROVED REPOSITORY PLACEMENT / CANDIDATES / INDEPENDENT REVIEW PENDING

## Scope, authority and provenance

The human owner explicitly approved placement of the six-candidate intake presented in this conversation. This file preserves that intake with source pointers and required record fields. Placement is not canonical admission, independent validation, authority to test external systems, deployment, or doctrine revision. Michael J. Cates / BoundaryTitan human owner retains admission, correction, rejection and withdrawal authority.

Crosswalk: [EC-MIKA-001](../2026-11-24-mechanism-indexed-knowledge-architecture-v0.1.md). Its FM identifiers remain proposed classifications. This is a separate append-only intake; no existing records, executable candidate index or taxonomy are changed.

Sources were retrieved during the preceding November 24 scan. This placement carries those observations forward without a new external-source refresh. URLs are pointers, not archived source snapshots. No external source hashes, independent custody, runtime tests or comprehensive coverage are claimed. Titles are mnemonic questions, not findings beyond the stated evidence.

## EC-GFA-20261124-01 | The Door Was Closed. The Keys Still Worked.

- **Original domain:** Network appliance security / cloud remote management.
- **Source:** [GL.iNet security notice](https://www.gl-inet.com/en-us/blogs/blog/glinet-security-notice-2026-11-20), issued Nov 20, updated Nov 23; retrieved Nov 24. Vendor primary statement; independent forensic review absent.
- **Original proposition:** Blocking the incident entry path could establish recovery.
- **Rejected assumption:** Cloud-side repair alone extinguishes all earlier device access and copied credentials. Challenged by the vendor's explicit separation of those recovery steps.
- **Failure mechanism:** FM-003 Authority leakage, REPORTED: unauthorized service access enabled device malware installation. FM-004 Revocation propagation failure, HYPOTHESIS: copied credentials could preserve another access path; actual subsequent use not established.
- **Failure conditions:** Some GoodCloud-connected routers/KVMs were accessed; connection alone does not establish compromise. Necessary/sufficient conditions across all models UNKNOWN.
- **Observed consequence:** Vendor reports unauthorized access and malware installation on some devices.
- **Remaining useful information:** Entry repair, device cleanup, credential replacement and downstream checks require separate receipts.
- **Uncertainty:** Full affected population, copied secrets, downstream computer compromise and complete recovery UNKNOWN.
- **Counterevidence:** Vendor reports blocked attack path and firmware cleanup of identified malware. These are useful scoped mitigations.
- **Transfer applications:** Agent credential revocation, delegated access, incident recovery.
- **Transfer limitations:** Device compromise does not establish an agent bypass or a proven surviving permission. The title's second sentence is a hypothesis, not an observed credential replay.
- **Reopening conditions:** Independent access logs, credential replay evidence, corrected advisory, bounded recovery verification or contrary evidence.
- **Independent review:** PENDING; no reviewer assigned or acceptance established.
- **Authority state:** CANDIDATE; approved for placement only.

## EC-GFA-20261124-02 | The Recovery Room Was Inside the Failure.

- **Original domain:** Enterprise cloud service operations.
- **Source:** [Reuters, Nov 24](https://www.reuters.com/business/microsoft-declares-code-red-after-historic-outage-internal-memos-show-2026-11-24/), retrieved Nov 24; reporting from internal memos, not independently held operational traces. Existing lane: [BT-USA-INFRA-001 / #189](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/189).
- **Original proposition:** An operator's recovery organization can restore service under a major outage.
- **Rejected assumption:** Dependence on a provider establishes access to provider-independent recovery. Challenged, not empirically defeated for every dependent organization.
- **Failure mechanism:** FM-015 Hidden dependency and FM-001 Common-mode dependency failure, HYPOTHESES. Fragmented diagnostics and decision tracking are reported; dependency of all recovery paths on the failed component is not established.
- **Failure conditions:** November 12–13 Microsoft outage; associated recovery coordination difficulties. Necessary/sufficient causal conditions UNKNOWN.
- **Observed consequence:** Widespread service disruption and reported recovery weaknesses.
- **Remaining useful information:** Map diagnostics, communications, identity, decision tracking and restoration dependencies separately.
- **Uncertainty:** Full internal topology, independent alternatives and effectiveness of proposed changes UNKNOWN.
- **Counterevidence:** Service was restored. A proposed one-hour recovery target is future intent, not measured capability. Microsoft says the incident was unrelated to cyber activity or AI agents.
- **Transfer applications:** Emergency response, agent stop paths, shared-provider resilience.
- **Transfer limitations:** Coordination fragmentation does not prove total control loss or a common cause across other outages.
- **Reopening conditions:** Operator postmortem, independent recovery exercises, trace evidence or demonstrated disjoint alternatives.
- **Independent review:** PENDING.
- **Authority state:** CANDIDATE; placement only.

## EC-GFA-20261124-03 | The Brake Worked Against the Public.

- **Original domain:** Telecommunications / public authority.
- **Source:** [Cloudflare Q3 disruption summary, Oct 27](https://blog.cloudflare.com/q3-2026-internet-disruption-summary/), retrieved Nov 24. Network-observer measurements and contextual reporting; underlying orders and court records not examined.
- **Original proposition:** Authorities can interrupt communications to pursue a stated objective.
- **Rejected assumption:** Technical power to interrupt establishes legitimate, proportionate authority over everyone affected. This implication is rejected analytically; case-specific legal findings are not supplied.
- **Failure mechanism:** FM-013 Objective-induced boundary violation, CANDIDATE CLASSIFICATION. Government-directed interruption is reported; legal violation and intent require separate examination.
- **Failure conditions:** Q3 government-directed shutdowns, prominently Iraqi exam periods. Conditions are associated; not a universal causal rule.
- **Observed consequence:** Cloudflare reports 19 government-directed disruptions in its 49-event quarterly sample, including 18 exam shutdowns in Iraq. Historical sample, not new November events.
- **Remaining useful information:** Examine who may stop access, for whose objective, with what scope, contestability and remedy.
- **Uncertainty:** Each order's jurisdiction, necessity, proportionality, exemptions and individual losses UNKNOWN here.
- **Counterevidence:** Intentional shutdowns, power failures and disasters have distinct causes. Technical efficacy does not settle legitimacy in either direction.
- **Transfer applications:** Emergency shutdown authority, platform suspension, AI service interruption.
- **Transfer limitations:** Public-law obligations and emergency powers differ by jurisdiction; no blanket legal verdict.
- **Reopening conditions:** Original orders, judicial decisions, operator notices, contrary measurements or remedy records.
- **Independent review:** Legal and measurement review PENDING.
- **Authority state:** CANDIDATE; placement only.

## EC-GFA-20261124-04 | The Record Became the Warrant.

- **Original domain:** Criminal justice information / coercive public action.
- **Source:** [Existing NCIC intake / #195](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/195), reviewed Nov 24, references [AP, Nov 21](https://apnews.com/article/d066cff87a64a564db0a00172c124972). Reported investigation, not independent forensic confirmation.
- **Original proposition:** A database result can inform lawful investigation and confirmation.
- **Rejected assumption:** A database hit alone establishes accurate facts and sufficient legal authority. This is a challenge question, not a finding about a particular detention.
- **Failure mechanism:** FM-003 Authority leakage, HYPOTHESIS: compromised information could influence coercive action.
- **Failure conditions:** Actual intrusion, record modification, downstream reliance and inadequate independent confirmation would each need evidence. None is inferred from the previous stage.
- **Observed consequence:** Investigation reported. Tampering, improper reliance and wrongful detention NOT ESTABLISHED.
- **Remaining useful information:** Trace source record → query → originating-agency confirmation → case-specific lawful basis → action → correction/remedy.
- **Uncertainty:** Access scope, integrity effects, affected decisions and recovery UNKNOWN.
- **Counterevidence:** Correct records, independent lawful grounds and successful confirmation can interrupt the proposed chain.
- **Transfer applications:** Automated benefits, fraud flags, employment screening, institutional data integrity.
- **Transfer limitations:** Legal authority varies by record and jurisdiction. The title is a hypothetical failure description, not evidence that a record became a warrant.
- **Reopening conditions:** Official incident notice, attributable record/version changes, case-level decision receipts or contrary findings.
- **Independent review:** Forensic and legal review PENDING.
- **Authority state:** CANDIDATE; cross-reference only, no upgrade to #195.

## EC-GFA-20261124-05 | Yesterday's Pass Became Today's Assurance.

- **Original domain:** BoundaryTitan software verification / evidence-state integrity.
- **Source:** [Repository state document](https://github.com/AETHEON-1/boundarytitan-control-gate/blob/f1938345e9081819ace9b2e0057efafdb6445a17/CURRENT-REPOSITORY-STATE-v0.2.md), reviewed Nov 24; document records Sept 8 baseline f9ad71c2f4f409c4d4f60928c724b2ab8970364a. Review snapshot: f1938345e9081819ace9b2e0057efafdb6445a17.
- **Original proposition:** Recorded passing checks support conclusions about the tested baseline.
- **Rejected assumption:** Those results establish test status of every subsequent tree. Invalid inference; actual later failures are not established.
- **Failure mechanism:** FM-016 Temporal incompatibility, CANDIDATE evidence-use hazard.
- **Failure conditions:** Reusing old results for changed code without exact version/scope reconciliation.
- **Observed consequence:** Historical results and a newer repository tree coexist. No misleading publication or current test failure is established here.
- **Remaining useful information:** Bind check claims to exact commit, command, environment, execution receipt and scope.
- **Uncertainty:** Current-tree test status and complete intervening verification history NOT AUDITED. No tests executed in this scan.
- **Counterevidence:** The document explicitly dates its baseline, and README distinguishes historical package state.
- **Transfer applications:** Safety cases, clinical models, dependency audits, authorization expiry.
- **Transfer limitations:** An old result can remain useful for its original scope; age alone does not invalidate it.
- **Reopening conditions:** Current pinned execution receipts, changed-code analysis or evidence of incorrect promotion.
- **Independent review:** PENDING.
- **Authority state:** CANDIDATE; internal scrutiny applies equally to BoundaryTitan.

## EC-GFA-20261124-06 | The Investigator Turned a Question into a Finding.

- **Original domain:** Research interpretation / cross-domain transfer.
- **Source:** Preceding November 24 project review and approved six-row candidate intake in this conversation. Conversation is the immediate provenance; no public transcript URL or independent custody receipt supplied.
- **Original proposition:** Failure mechanisms and authority gaps can be investigated using source-bounded hypotheses.
- **Rejected assumption:** Plausibility, a mnemonic title or mechanism resemblance establishes an actual violation or shared cause.
- **Failure mechanism:** FM-012 Premature causal attribution and FM-014 Investigator-induced failure, PREVENTIVE REVIEW HYPOTHESES.
- **Failure conditions:** Dropping qualifiers, promoting allegations, generalizing analogies or treating missing evidence as proof.
- **Observed consequence:** Risk identified and qualifiers preserved. A completed misattribution event is not established by this record.
- **Remaining useful information:** Preserve the first unsupported arrow, alternative causes, null findings, corrections and positive controls.
- **Uncertainty:** Source completeness, classification accuracy and cross-domain transfer effectiveness UNKNOWN.
- **Counterevidence:** Preceding review explicitly withheld a shared-cause claim and separated reported, inferred and unknown states.
- **Transfer applications:** All research lanes, incident attribution and evidence admission.
- **Transfer limitations:** Investigator error is not established merely because a claim remains uncertain.
- **Reopening conditions:** Specific contradiction, missing qualifier, demonstrable false attribution, independent critique or successful correction.
- **Independent review:** PENDING.
- **Authority state:** CANDIDATE; no self-certification.

## Counterevidence and positive controls

- Existing EC-GL-009, “The Brake That Actually Worked,” remains a positive-control candidate in [implementation/candidates.json](../implementation/candidates.json). Its source and transfer status are unchanged; no new aviation validation is claimed.
- [EDPB, Nov 11](https://www.edpb.europa.eu/news/edpb-adopts-statement-on-review-of-the-republic-of-korea-adequacy-processor-bcr_en), retrieved Nov 24, describes Korean refusal/processing rights and a planned 2027 recruitment enforcement action. Legal provisions and planned oversight are counterweights to universal claims that refusal is absent. Practical effectiveness is NOT TESTED here.
- Recovery, lawful confirmation and effective interventions must be retained alongside failures. Absence of a retrieved receipt is UNKNOWN, not proof that no control exists.

## Review gates and preservation

All six classifications: independent review PENDING, transfer NOT TESTED, geographic/sector coverage PARTIAL. No shared cause for the sampled outages is established. No universal failure law, canonical taxonomy admission or comprehensive authority-violation inventory is claimed.

Reopen on primary evidence, source revision, contrary case, misclassification, failed analogy or human direction. Preserve corrections as subsequent versions/addenda with reasons; retain this intake as its historical specimen.

Organize by origin. Retrieve by mechanism. Preserve what contradicts the theory.
Freeze the evidence. Never freeze the search.
CAN ⊬ MAY. ⚒️
