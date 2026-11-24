# BT-HC-20261029-FTC-TOAST-EXIT-LOAN-v0.1 | Contested service cancellation and linked loan default

**HTK:** A customer can ask to stop one service but allegedly incur a second financial consequence for leaving. A cancellation request, effective cancellation, billing cessation, and loan status are distinct states.

**State:** NONCANONICAL SPECIALIST INTAKE; FTC CIVIL ALLEGATIONS CONTESTED; NO JUDICIAL FINDING; TEST NOT EXECUTED.
**Lane:** HUMAN CONSEQUENCE / Consumer finance, commercial contracts, small-business autonomy.
**Source task definition ID:** 6ae2b9d15f8481919d0cdff95cf9f06a; **unique execution ID:** null (not provided).
**Observation:** 2026-11-02 America/Chicago; precise individual retrieval timestamps not instrumented.
**Stable identity:** Case 3:26-cv-12705, complaint filed 2026-10-29, alleged software cancellation -> loan default/continued charges arrow.

## Primary source roots / chronology
1. FTC and state plaintiffs' filed complaint, Case 3:26-cv-12705, Doc 1, **filed 2026-10-29**, https://www.ftc.gov/system/files/ftc_gov/pdf/Toast-Redacted-Complaint-Filed.pdf . Paras 89-110 describe cancellation, including 107-109 on provider change and Toast Capital loan default; paras 1-2 state asserted statutory claims and requested relief. Retrieved 2026-11-02. **Plaintiff allegations, not adjudicated facts.**
2. FTC case timeline/status, **2026-10-29**, https://www.ftc.gov/legal-library/browse/cases-proceedings/toast-inc-timeline-item-2026-10-29 . Retrieved 2026-11-02. Case remains pending in retrieved record.
3. FTC press release, **2026-10-29**, https://www.ftc.gov/news-events/news/press-releases/2026/10/ftc-states-take-action-against-toast-inc-over-hidden-unauthorized-fees-deceptive-subscription . Retrieved 2026-11-02. **Same plaintiff source lineage as complaint; not independent corroboration.**
4. Toast's primary company response, **2026-10-29**, https://pos.toasttab.com/vi-us/news/toast-responds-ftc-lawsuit . Retrieved 2026-11-02. Toast denies the allegations, argues ROSCA should not govern negotiated B2B contracts, and says customers negotiate terms.
5. BoundaryTitan existing public lane: https://boundarytitan.wordpress.com/2026/10/18/sigma-2-money-who-controls-your-money/ ; published 2026-10-18, visible category Financial Systems / Consumer Protection; tags include Financial Control Receipt and Consumer Rights. Prior method only, not case evidence.
6. Repo specialist protocol: https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/SPECIALIST-HANDOFF-PROTOCOL.md ; BT-HC-004 https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml is **structural analogy only**, not an assertion that financial contracts use the same runtime mechanism as agents.

## LOOK AT THIS / claim and source distinction
- **Observed:** FTC and seven state AGs plus California local government plaintiffs filed a civil action. The complaint alleges a difficult cancellation path, continued subscription charges, and a loan covenant making provider change without advance permission an event of default. Toast publicly disputes the claims and the ROSCA interpretation. The docket entry is pending.
- **Not independently verified:** actual loan acceleration, unauthorized charges, prevalence, contractual enforceability, refunds, individual harms, or a defective live cancellation stop.
- **Inference:** an attempted software exit can be coupled to a separately administered debt consequence; one state change does not automatically terminate all downstream obligations.
- **Contradiction preserved:** plaintiff claims undisclosed/unlawful barriers; defendant says contracts are negotiated and challenges federal law's applicability. Neither party's assertion is a court finding.
- **Missing:** historical contract cohort versions, loan covenants, disclosed consent/notice, actual cancellation/billing/default ledger, complaint representativeness, adjudication and delivered remedy.

## FIRST UNSUPPORTED ARROW
`Cancellation intent -> effective contractual termination -> billing stops -> no linked loan default -> usable customer remedy`.
The first contested transition is whether an otherwise effective service exit legally or operationally triggers an independent loan-default condition.

## Full consequence receipt
- **Affected surfaces:** restaurant POS subscriptions, processing, payroll add-ons, financing and bank payments.
- **Affected humans:** restaurant owners and operators, with possible downstream employees/customers; no private victim identities retained.
- **Backward:** alleged charges/acceleration <- billing/default decision <- service and loan agreements <- notice and provider-change event <- claimed contract/statute authority <- proof of disclosure and assent.
- **Forward:** contractual permission to require advance consent to change provider -> default classification -> acceleration/collection -> potential business cash-flow pressure -> potential employee/customer effects. Downstream outcomes NOT OBSERVED.
- **Decision/consequence owner:** service provider and lender for operational acts; merchant for exit request; courts and regulators for legal remedies. Authority source is contested contract and federal/state consumer law.
- **Denial/revocation/appeal:** merchant may dispute or give notice; provider may waive or correct; court may grant relief. Effective independent pre-charge/pre-default stop NOT ESTABLISHED.
- **Reversibility:** fees may be refunded and agreements reformed; credit/default and operational interruption may be costly or not fully reversible. No actual remedy established.

## Rival explanations / negatives
1. An appropriately disclosed, negotiated provider-continuity covenant may be lawful financing security.
2. A request may not satisfy valid notice conditions; failed notice is not necessarily deception.
3. A specific operational error does not establish a universal company policy.
4. ROSCA B2B applicability is disputed; separate state-law claims remain distinct.
5. Some customers may have successful exits; unknown denominator.
6. An effective remedy may exist outside accessible public records; absence of evidence is not proof of absence.

## Bounded specialist test specification | NOT EXECUTED
**Question:** Under contemporaneous, lawfully obtained merchant/loan contracts, can an otherwise valid subscription exit cause continued unauthorized billing or a loan default solely from switching POS providers?

**Inputs for independently authorized later review:** versioned contracts, disclosure/consent screens, redacted notice receipts, deactivation timestamps, bank/billing entries, loan default letters, court decisions and remedy receipts. No personal data, credentials, real accounts, probing or field tests in this task.

**Observable:** date of valid notice, termination effective date, last subscription debit, contractual default condition, lender notice, funds actually collected or returned.

**Positive case:** valid termination followed by traceable continuing unauthorized charges or an ungrounded loan-default consequence.

**Negative control:** timely cancellation, reconciled cessation of charges and continuing good-standing loan consistent with disclosed terms.

**Defeating case:** contemporaneous enforceable and properly disclosed covenants, valid notice processing, correct payment ledger and lawful default action demonstrate no unsupported arrow for a defined specimen. Does not determine other claims.

**Failure criteria:** missing custody, mixed contract cohorts, uncertain notice receipt, plaintiff-only records, or inability to link default to exit => INDETERMINATE/TEST INVALID, not confirmation. Sampling cannot establish prevalence. Test execution: **NOT EXECUTED**.

## Routing, dedup, human decision
**Specialist discipline:** commercial-contract and consumer-finance counsel, payments/fintech operations, accounting evidence custody. No outreach, assignment or review request.
**Bounded specialist question:** Which dated contracts, disclosures, termination receipts and financing ledgers distinguish a lawful linked loan covenant from an undisclosed or improperly enforced cancellation trap?
**Existing framework:** BoundaryTitan Sigma-2 Money financial authority map; repository specialist handoff protocol. BT-HC-004 comparison is conceptual, not mechanism equivalence.
**Dedup:** prior known open-world findings 001-033 and main indexed source searches do not identify this case; draft PR #66 intake directory was absent at initial head. This is scoped, not exhaustive. Findings 028-033 and PR #136 stay untouched.
**Reopen:** court order, injunction, settlement, actual contract/ledger evidence, enforceability ruling or documented counterexample.
**Residual risks:** litigant-only sources, incomplete cohort denominator, legal ambiguity, unknown actual remediation.
**Exact remaining human decision:** admit or reject later specialist review of the contested arrow. No publication or implementation authorization follows from custody.

custodyAuthorized: true
mergeAuthorized: false
executionAuthorized: false
publicationOutsideRepoAuthorized: false
publicationAuthorized: false
specialistReview: PENDING
humanDisposition: RESERVED
Encyclopedia of Chaos: candidate contradiction only; no automatic admission.

CAN ⊬ MAY. Freeze the evidence, never freeze the search.
