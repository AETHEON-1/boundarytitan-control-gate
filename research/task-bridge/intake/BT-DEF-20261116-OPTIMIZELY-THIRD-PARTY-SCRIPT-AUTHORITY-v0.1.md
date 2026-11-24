# BT-DEF-20261116-OPTIMIZELY-THIRD-PARTY-SCRIPT-AUTHORITY-v0.1
**Status:** CANDIDATE / PREPARED / NOT SENT / NOT INDEPENDENTLY VALIDATED. **Observation:** 2026-11-24 UTC. **Source briefing:** November 23 weekly Defense and Operations Brief; source task definition ID `6ae2b9d59dc08191af8196a28264f4d7`; authentic scheduled execution ID: null (not independently recovered for this interactive deposit). This is an interactive repository custody action, not an attested scheduled-run delivery.

**Lane:** Practical Defense / Human Consequence; existing authorization and Consequence-Path Dominance challenges are cross-references, not equivalent mechanisms. **Candidate identity:** Optimizely Web Experimentation / Nov 16 2026 unauthorized Project JavaScript modification / trusted delivery to consequential browser execution.

## Source roots and clocks
- Vendor primary: https://support.optimizely.com/hc/en-us/articles/50521849710605-Security-Advisory-Web-Experimentation-Security-Incident-Updated-November-19-2026 ; event November 16, vendor update November 19, observed November 24.
- Independent original research by Scott Helme / Report URI, first published November 16 and updated November 17: https://blog.report-uri.com/worlds-largest-brands-infected-with-malware-via-optimizely/ ; observation November 24.
- Independent vendor-specific technical documentation / forensic capture-method discussion published November 19: https://blog.report-uri.com/get-the-evidence-before-the-attack-just-give-us-30-seconds/ . A vendor describing its own monitoring capabilities is not an independent efficacy test of that product.
- Vendor incident report November 17: https://pages.optimizely.com/rs/947-RKE-048/images/Security%20Incident%20Report%20-%20Optimizely%20Web%20Experimentation%20-%20Nov%2017%202026.pdf ; not independently audited here.
- Established repository challenge: challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml, main-branch blob `9af848bb7a4492a6c2184f1cd244905bc17871f1`; specialist process: challenges/SPECIALIST-HANDOFF-PROTOCOL.md, blob `79fd359f43bcd22c7d48f81857085a234d57799f`. Compare AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (not executed); BT-S2-NO-001 (different normative-authority challenge); BT-PW-TSA-01 (different receipt/scope context). No packages modified or duplicated.
- Draft PR #66 before deposit head `ff1c328ce61e039c663e384ea351d12c38849276`. Compared complete tracked path names across main and PR head, including existing intake and Chaos entries. No Optimizely-named intake identified in accessible branch-tree enumeration. Repository code search returned zero results with `incomplete_results:true`; absence of duplicate text in unseen records is NOT established. Prior briefing reported an existing `BT-SMB-SCRIPT-RECEIPT-001` candidate, but its canonical repository path and provenance were not recovered. This note therefore isolates an incident-specific evidence delta without claiming novelty or replacement.

## Exactly bounded claim and evidence
**Claim:** On November 16, an attacker used an Optimizely signup-flow flaw to impersonate targeted project users and add malicious Project JavaScript; legitimate third-party snippet delivery could thereby execute unauthorized behavior in visitor browsers.
**SUPPORTED UNDER STATED CONDITIONS:** Optimizely's advisory acknowledges the account/signup flaw and unauthorized script modification. Report URI independently reports retrieval of 1,611 distinct snippets, of which 188 associated with 178 organizations contained malicious code. The researchers retain observed response headers, hashes, samples and fetch times. They report a multi-purpose payload capable of wallet swapping, payment-card skimming, reading browser-accessible cookies, making screenshots and attempting iOS exploitation; their reported on-chain transfers support bounded evidence of cryptocurrency receipts, not complete attribution or all harms.
**Vendor claim, not independently validated:** Optimizely states it blocked malicious delivery and corrected the flaw within three hours of detection; fewer than 5% of customers were affected. Different denominator (all Optimizely customers) from sampled snippet count; do not interchange percentages.
**Independent research limitations:** Report URI's 1,611 snippets were found largely through its own crawl population and are not a complete customer denominator. Sampled deliveries and malware capability do not show every visitor executed the full payload, every payment was stolen, or every exploitation attempt succeeded. Report URI is also a monitoring vendor with a product interest; its independently collected incident artifacts do not constitute an independent blinded evaluation of its own protective controls.
**Contrary/qualifying evidence:** Researchers report all observed infected snippets clean by Nov 16 23:11 UTC and domains being taken down thereafter; this supports bounded cleanup observations but not irreversible erasure of stolen data or downstream action cessation. Hosted card-payment iframes were outside the described skimmer's field access. Browser CSP / separate-origin policies and payment architecture can change exposure; no claim universal victim compromise.

## Disputed arrows and required observations
**First unsupported arrow:** Approved third-party vendor/script URL -> authorized script behavior in the visitor's browser.
**Additional unsupported claims:** Vendor reports cleanup -> all historical affected visitors identified; malicious script no longer served -> exfiltrated information recovered; domain taken down -> queued/alternate consequences extinguished; content digest changed -> maliciousness established; monitoring alert -> effective prevention; observed partial path -> complete consequence path coverage.
**Trace backward:** Potential card/wallet/customer consequence <- visitor-side code execution <- payload included in site-loaded project snippet <- Optimizely Project JavaScript edit <- compromised project authorization path <- account-signup flaw <- vendor-asserted fix. The business's choice to include an externally controlled script does not authorize arbitrary later edits.
**Trace authority forward:** Website owner authorizes a vendor script for a bounded purpose -> browser runs code subject to browser origin and CSP controls -> injected code may access page context and make further network requests -> third-party payments/accounts/visitors may experience consequences. Removal of script or CSP denial does not revoke already stolen payment data, cookies or accepted transactions. Orphaned effects must be separately checked.

## Consequence receipt
- **People/surface:** Website visitors, account holders and small businesses; browser DOM, form data, client-side cookies, payment flows and downstream financial accounts.
- **Who decides:** Business/site operator decides authorized integrations and removal; vendor controls its account systems and hosted snippet remediation; browser/client and CSP policy enforce only configured limits; financial/credential issuers independently control transaction reversal and credential revocation.
- **Standing/permission:** Legitimate site-integration contract is not permission for unauthorized Project JavaScript edits. Visitor browser access can be implicit in an already-trusted script, with no new dialog. Applicable privacy duties depend on jurisdiction and data.
- **Who may deny/revoke/appeal:** Website operator can remove integration or change browser policy; vendor can revoke unauthorized project access and disable delivery; credential issuers can expire exposed access; affected persons can use provider/card dispute and reporting processes subject to applicable rules. Effective coverage NOT TESTED here.
- **External stop:** Website-owner-controlled integration removal and separately administered CSP or browser enforcement, plus issuer-side credential/payment blocks where available; no evidence that these dominate all paths or preclude historical consequences.
- **Reversibility:** This proposed document is additive and reviewable; unauthorized data exfiltration and spent funds may be irreversible. Operational mitigations would require human authorization.
- **Residuals:** Browser cache, past visitors, undeclared third-party dependencies, request races, alternate domains, device exploitation, incomplete telemetry, unsupported customer denominator and legal/institutional remedy gaps.

## Bounded falsification specification (NOT EXECUTED)
**Specialist disciplines:** Client-side web/app security, browser CSP/security headers, digital forensics, incident response, payment fraud; security/enforcement specification route selected: Trail of Bits as a potential discipline-appropriate reviewer, NOT CONTACTED, NOT A PARTICIPANT.
**Question:** For a specified site, did independently retained header/script-content evidence prove which unauthorized bytes were actually served and executed, and did independently controlled browser or network rules prevent the declared harmful request before its consequence boundary, including fallback/inline payload and stale/cache paths?
**Prerequisites:** Explicitly authorized disposable example, benign fixture that cannot reach real users, independently held timestamps and response bodies, CSP policy snapshot, evidence custody and separate stop owner. Held battery is NOT authorized here; specification only.
**Positive observable:** Independent browser/network traces show that the defined unauthorized request was denied before off-origin transmission under the specified configuration, tied to site/script version and visit time.
**Negative observable:** A changed hash or vendor remediation statement without independently observed enforcement; classify protection INDETERMINATE, not failed or successful.
**Defeating observable:** A reproducible prohibited data egress under the stated enforced configuration, or evidence that supposed pre-consequence blocking occurred after an irreversible request/commit.
**Stop criterion:** Incomplete independent capture, privacy violation risk, permission gap or inadequate consequence owner -> HOLD; no synthetic or live probes.
**Reopen on:** New sample hashes/headers, contrary site records, independent CSP tests, quantified exposures, cleanup bypass, effective external revocation records or a duplicate prior package.

**Disposition:** No assertion of complete coverage, safe operation, efficacy validation or specialist approval. No new tool recommended by this intake; user briefing's one bounded method remains an unadmitted human-review proposal.

custodyAuthorized: true
mergeAuthorized: false
executionAuthorized: false
publicationAuthorized: false
publicationOutsideRepoAuthorized: false
specialistReview: PENDING
humanDisposition: PENDING

**Σ₂:** Legitimate delivery infrastructure is not permission for every action its code can perform. CAN ⊬ MAY.
