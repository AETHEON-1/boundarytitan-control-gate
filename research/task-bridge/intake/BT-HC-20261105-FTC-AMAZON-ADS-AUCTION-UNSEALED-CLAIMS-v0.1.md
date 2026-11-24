# BT-HC-20261105-FTC-AMAZON-ADS-AUCTION-UNSEALED-CLAIMS-v0.1
Status: YELLOW / CANDIDATE / REVIEW ONLY. Human disposition PENDING; specialist review PENDING; executionAuthorized:false; publicationOutsideRepoAuthorized:false; archiveAdmissionAuthorized:false.
Lane: Human Consequence / digital market price formation. Secondary: Open-World / algorithmic control paths. Not a tokenized-securities arrow-map finding.
Observation: 2026-11-08. FTC case timeline event: 2026-11-05 (unsealed details made public). Underlying amended complaint document 113 marked filed 2026-10-28. Original suit filed 2026-08-31. Conduct alleged from 2018/2019 onward, including 2021–2023 examples. Distinguish these clocks.

## Root primary sources
- FTC case timeline (Nov 5): https://www.ftc.gov/legal-library/browse/cases-proceedings/amazon-timeline-item-2026-11-05
- FTC press release (Nov 5): https://www.ftc.gov/news-events/news/press-releases/2026/11/new-details-emerge-amazon-ads-auction-rigging-case
- Updated complaint, court identifier 2:26-cv-03097-JHC, document 113, filed Oct 28 (FTC-hosted PDF): https://www.ftc.gov/system/files/ftc_gov/pdf/Amazon-RedactedComplaint.pdf
- Defendant's direct response to original suit (Aug 31): https://www.aboutamazon.com/company-news/amazon-ftc-sponsored-ads-lawsuit-response
- Existing repo lane: research/task-bridge/intake/BT-HC-20261028-CAISO-FILI-DISCONNECT-COST-SHIFT-v0.1.md (comparison of consequence accounting only, NOT same mechanism); specialist protocol: challenges/SPECIALIST-HANDOFF-PROTOCOL.md; draft PR #66.

## Material evidence-state change and precise allegation
The Nov 5 public unsealing adds quantified allegations and described internal communications to an already pending August 31 lawsuit. FTC and 22 states allege Amazon overrode second-price auction outcomes with undisclosed soft-reserve charges. FTC release alleges charges as much as 50% above auction result on ordinary days and 250% on major shopping days; 2021 holiday average CPC +20% with some advertisers +200%; 2022 holiday additional $87 million worldwide; alleged misleading explanations to advertisers. These are plaintiff allegations, not adjudicated findings, independently audited price reconstruction, or proven consumer pass-through. Do not conflate maximum increases above auction result with increase above advertiser's bid.

Amazon disputes the allegations. Its Aug 31 response describes reserve prices as common, claims no advertiser pays above its submitted bid, inflation-adjusted CPC was flat 2019–2024, and disputes advertiser and consumer harm. Both a charge above second-price auction outcome and a charge at/below maximum bid could coexist. Defendant's counterclaims are likewise not independent verification.

## Challenged arrow
**Advertiser sees 'second-price auction' representation and a charged CPC → charged CPC was actually determined by disclosed competitive auction terms.**
Further unsupported arrow: alleged hidden markup → proven loss to each advertiser or retail consumer. A bid cap does not independently establish disclosed auction pricing or advertiser consent to the actual mechanism.

Observed: FTC published updated pleadings and specific allegations; Amazon published denial. INDETERMINATE: internal auction ledger, advertiser-specific counterfactual, materiality of disclosures, harm distribution, any judicial finding, actual refunds or durable control change.
Evidence: SUPPORTED UNDER STATED CONDITIONS for existence/content/date of public legal filings and response; INDETERMINATE for alleged underlying conduct and damage; NOT TESTED for independent reconstruction.

## Human-consequence and authority trace
Exposed: advertisers, including smaller merchants; potential indirect shoppers (pass-through disputed).
Decision owner: platform auction designer/operator; advertiser chooses bid ceiling but does not necessarily control price calculation. Legal adjudication and remedies rest with competent court and regulators under governing law, not this research.
Mechanism backward: invoice/CPC ← ad-price calculation ← auction outcome plus any reserve/pricing rule ← platform code and policies ← internal authority to set prices ← representations/contracts and law.
Authority forward: platform design discretion → pricing rules → charges → advertiser accounts → potential consumer prices; whether any legal consent or notice covers the change is disputed. A later policy change would not automatically reverse past charges.
Potential remedies: injunction, monetary relief or state-law remedies sought in complaint; no established refund program or awarded remedy in these retrieved sources.
External stop: judicial injunction or independently enforceable contract/regulatory remedy are potential controls, not observed operative stops here. Advertiser budget/bid limits bound spending but do not independently audit auction computation.
Reversibility: future auction rules may be changeable; historical economic harm and any downstream consumer pass-through require separate quantification and remedy.

## Independent specialist handoff, NOT SENT
Competence: auction mechanism design, advertising market economics, forensic billing/accounting, consumer-protection law.
Question: Which independently reproducible auction/billing traces, disclosed terms, and advertiser-specific counterfactuals would distinguish a legitimate disclosed reserve from an undisclosed post-auction price override, and what observable test establishes material harm without conflating bid ceilings, auction prices and pass-through?

Review-only test specification, NOT EXECUTED:
- Positive: independently reconcile contemporaneous disclosed pricing rules, bid, candidate ranking, auction result, reserve application, charged CPC, and customer-visible representation for matched events; identify authorized rule changes and exact timestamps.
- Negative: records lack auction intermediate states or customer-facing historical terms; classify INDETERMINATE, not innocence or wrongdoing.
- Defeating: independent transaction records show charges and disclosures consistent with an agreed reserve rule for relevant transactions, or show a hidden override contrary to the represented mechanism. Test both rival hypotheses.
- Controls: selection bias, ad relevance and bid changes, contemporaneous reserve policies, auction format differences, advertiser cohorts, peak-day seasonality, time-varying exchange rates, missing ledger entries, and retroactive document edits.
- No live account probing, client data collection, enforcement, contacts, or held tests authorized.

Omissions: exact independent auction trace denominator; court disposition; advertiser-specific losses; direct retail pass-through; actual legal remedy; enforceable revocation/stop receipts; independent specialist review.
Reopen on: court findings, independently auditable transaction-level data, legally operative stop/remedy, new verified contradictory evidence, or attributable specialist counterexample.
Custody source task definition: 6ae2b9d15f8481919d0cdff95cf9f06a. Unique scheduled execution ID: null (not available to this writer).
Sigma: A bid ceiling proves the maximum an advertiser offered. It does not prove the pricing rule the platform used. CAN ⊬ MAY.
