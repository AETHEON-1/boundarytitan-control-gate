# BT-DEF-20261028-GITHUB-AI-PUSH-SECRET-CONTROL-v0.1 | AI-detected push protection, billed preview
Status: NONCANONICAL CANDIDATE; NOT EXECUTED; INDEPENDENT PROTECTION NOT VERIFIED.
Lane: Defense and Operations Brief / credential custody / software supply-chain control.
Source task definition ID: 6ae2b9d59dc08191af8196a28264f4d7.
Observed scheduled execution ID: b45f0aaf-04cc-832d-80bf-19681c449250 (automation metadata, in_progress at inspection; not cryptographic attestation).
Observation date: 2026-11-02 America/Chicago; exact source fetch seconds not independently recorded.
Identity: GitHub 2026-10-28 AI-detected secrets push protection public preview | vendor claims context-sensitive pre-push blocking | detected/blocking -> all credential leakage prevented.

## HTK / LOOK AT THIS
GitHub added an optional, metered AI classifier to block unstructured credentials at push time. A model identifying a suspected secret does not prove every real secret will be found, every push blocked, or an already leaked credential revoked.

## Primary source roots and clocks
1. GitHub Changelog, 2026-10-28, retrieved 2026-11-02: https://github.blog/changelog/2026-10-28-push-protection-beyond-predefined-secret-patterns/ . Vendor documents public preview, off-by-default enablement, prerequisites, supported push/UI/upload surfaces, continued bypass/delegated-bypass routes, early >2x blocked-push finding and user-reported precision comparison. No independent denominator or raw benchmark provided in retrieved article.
2. GitHub Docs, retrieved 2026-11-02: https://docs.github.com/en/enterprise-cloud@latest/code-security/how-tos/secure-your-secrets/prevent-future-leaks/enable-ai-push-protection . Repository/organization owner or admin enables; requires GHSP/GHAS, push protection, AI-detected alerts.
3. GitHub billing documentation, retrieved 2026-11-02: https://docs.github.com/en/billing/concepts/product-billing/github-advanced-security . Secret Protection AI credits consumed proportional to content scanned; billed to repository-owning organization.
4. GitHub price page, retrieved 2026-11-02: https://github.com/security/plans . GHSP advertised at USD 19 per active committer per month; GitHub public-repository pattern push protection is separately advertised as free. Exact AI-preview per-push consumption and user-specific quota not verified. GitHub AI credit pricing page https://github.com/features/copilot/plans advertises USD 0.01 per credit; whether a particular organization has included credits requires account-side inspection.
5. Independent older empirical comparison, 2023: https://bradreaves.net/publication/bcrw23/ ; original paper evaluates nine older secret scanners and reports substantial false-positive/false-negative tradeoffs. NOT a test of GitHub's 2026 classifier.
6. Independent methodological study, 2026-09-02: https://arxiv.org/abs/2609.02983 ; evaluates boundary-mutation failures of other pattern scanners, NOT the 2026 GitHub preview.

## Exact claim / evidence / omissions
SUPPORTED UNDER STATED CONDITIONS: Vendor documents an available opt-in control for qualifying organizations, able to reject pushes when its classifier flags unstructured secrets. Vendor-reported >2x improvement is NOT independently verified. No demonstration that all secret classes, all clients, historical commits, direct external channels or bypass-exempt actors are covered. Preview behavior may change.
NOT TESTED: actual preview in this repository; no activation, spend, sample pushes, credentials, or security-control changes occurred.
Contrary evidence and rival explanations: Increased blocks may reflect previously missed secrets, false positives, cohort changes or changed scan volume. Older benchmark studies do not validate the new model. Bypass/delegated-bypass mechanisms and role/team/app exemptions exist; exact effective local configuration unknown.

## FIRST UNSUPPORTED ARROW / consequence receipt
Observed candidate secret -> classifier alert -> rejected push -> no secret exposure -> credential unusable.
First unsupported arrow: vendor-reported classification/block counts -> independently measured effective prevention across the relevant push and bypass surfaces.
Backward: possible stolen key -> repository history or public upload -> commit/push action -> GitHub classifier/pattern rules -> repository/org configuration -> admin authority and paid plan.
Forward: organization owner enables preview -> source content scanned and AI credits charged -> alerts/blocks or bypass -> possible exposure -> external provider may accept token until separately revoked.
Affected humans: builders, customers, small-business owners and downstream credential/data owners. Actual victim/financial loss: NOT OBSERVED.
Consequence owner: repository-owning organization for configuration, billing and code publication; credential issuer for key revocation; human operators for decisions.
Authority source: repository/org security administrators; delegated bypass authority may vary.
External stop: admin disablement of preview/billing; push-block policy and independent credential revocation at issuer; no effective non-bypass guarantee observed.
Reversibility: preview setting reversible; a leaked secret may require rotation and downstream remediation. Reversing the push does not undo exposure.

## Bounded specialist handoff / NOT EXECUTED
Discipline: application security / secret-detection evaluation / GitHub organization governance. Trail of Bits is a selected possible security-review channel, NOT contacted or engaged.
Existing challenges: AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM-01 bypass, AM-05 revocation, AM-07 TOCTOU); challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml. These are related control questions, not equivalent tests or proof.
Question: For an opt-in billed classifier, what independently measured detection/false-positive coverage and effective bypass/credential-revocation controls justify enabling it over free pattern-based protection?
Proposed isolated review: independently curate dummy structured and unstructured secrets plus hard negatives; blind labels; document each path (git push, web edit, upload, exempt actor, delegated bypass); compare enabled/disabled only in an owned disposable repo after separate authorization. Observe classification, actual rejection, override receipts, costs and issuer-side revocation. Positive: intended blocks with attributable receipts. Negative: hard negatives accepted. Defeating: a covered push exposes a labeled secret or authorized bypass escapes required independent approval. No execution here.
Residuals: false negatives, false positives, scan cost/quota unknown, provider-side revocation absent, historic exposures, non-GitHub distribution paths, privacy and governance tradeoffs.
Human decision: RESERVED. humanDisposition:PENDING; custodyAuthorized:true; mergeAuthorized:false; executionAuthorized:false; publicationOutsideRepoAuthorized:false; specialistReview:PENDING.
Reopen on independently reproduced benchmark, verified cost/quota, material scope correction, or observed bypass. This note is evidence custody, not specialist delivery or endorsement.
CAN ⊬ MAY.
