# Cross-domain CAN ⊬ MAY falsification: specialist entrypoint v0.1
Status: PROPOSED / YELLOW / NOT TESTED. 2026-10-17. No certification, deployment, doctrine change, or specialist endorsement.

## Read this before adding any tests
This is a **delta index**, not a replacement battery. Reuse existing tests and challenge IDs. Do not copy the 24-case `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md`, the existing AGAT PR #93 tests, or the existing specialist challenge #83. PR #93 is a draft and its synthetic claims must not be promoted to independent enforcement. The existing consequence-path challenge `challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml` remains open. Specialist review is requested in issue #94. Verify the current repository tree before claiming absence of coverage; code search can be incomplete.

## Claims must be separated before attack
- L1 LOGICAL: CAN does not *by itself* entail MAY. Investigate whether this is analytical, premise-dependent, or informative.
- N1 NORMATIVE: capability alone is insufficient moral justification. Challenge with self-regarding autonomy, rights, emergency necessity, collective legitimacy.
- I1 INSTITUTIONAL: claimed authorizations require identifiable rules and legitimacy analysis; a recorded approval is not necessarily a justified one.
- E1 ENGINEERING: for a declared threat model, no unauthorized reachable consequence path bypasses an independent brake. Falsify with a single real counterexample.
A failure of E1 is not automatically a counterexample to L1. A defense of L1 cannot erase a failure of E1. Freeze definitions and admissibility conditions before receiving attacks. No retroactive narrowing without versioned change record.

## New delta challenges (do not duplicate existing attack fixtures)
CD-01 | MEANINGFUL REFUSAL | A nominally permitted refusal has punitive or coercive consequences. Measure effective choice and documented alternatives. Human subjects require consent and appropriate ethics oversight; use vignettes first.
CD-02 | AUTHORITY BY OMISSION | No actor affirmatively approves, yet defaults, delay, automatic renewal or ignored alerts produce a consequential change. Identify rule setter, override owner, and observed result.
CD-03 | LEGITIMACY REGRESS | Trace who authorized the authority source, including rights, collective practice, constitutional foundations and contested origins. Do not treat a missing single issuer as proof of invalidity.
CD-04 | COMPETING LEGITIMATE CLAIMS | Two rights or authorities conflict; require multiple defensible dispositions, independent legal/ethical review, and an explicit underdetermined result where appropriate.
CD-05 | INFORMED CONSENT FAILURE | Authorization was genuine but the decision-maker's evidence was materially misleading or incomplete. Vary the representation while keeping permissions fixed.
CD-06 | SUCCESSFUL UNAUTHORIZED ACTION | A prohibited action benefits the affected party. Test whether outcome bias retroactively changes classification of prior authority.
CD-07 | FRAMEWORK COUNTERMODEL | Challenger defines MAY in a credible rival model and identifies any hidden premises. Record the strongest case even if the original kernel survives in a narrower form.
CD-08 | REVIEWER CAPTURE | Evaluator has reputational or institutional incentives to reject a counterexample. Compare blinded evidence review with declared conflict-of-interest review.
CD-09 | NEGATIVE-SPACE AUDIT | Find cases the taxonomy cannot classify without inventing new categories; retain unresolved cases and alternate explanations.
CD-10 | INDEPENDENT ORACLE CAPTURE | Evidence source and claimed verifier share an operator, update channel, credentials, or recovery path. Compare the result against a separately controlled observation. Existing evidence-tamper tests cover log mutation; this case targets shared *institutional and infrastructure* control.

## Minimal demonstration protocol
1. Freeze exact claim, version, meaning of CAN/MAY, threat model, protected consequence, jurisdiction where relevant, and what would falsify it.
2. Inventory existing fixtures by ID and reject duplicates **by mechanism and expected observation**, not just title.
3. Supply a permitted positive control, prohibited negative control, and seeded-defect control when applicable.
4. Specify an independent oracle and who controls it; record its own failure modes.
5. Execute only on owned isolated fixtures, or provide a bounded primary-source case study. No third-party exploitation, real coercion, or hazardous physical experiments.
6. Capture raw inputs, environment, timestamps, commit SHA, expected and observed consequence, contradictory traces, and alternate explanations.
7. Separate code reproduction, experiment reproduction, and independent validation.
8. Use SUPPORTED / CONTRADICTED / INDETERMINATE / TEST INVALID / NOT TESTED; never treat no observed bypass as proof of complete mediation.
9. Append a failure record to the canonical Encyclopedia of Chaos **after confirming its actual location**. Do not create a parallel encyclopedia. Preserve failed runs, invalid tests, and contradictions without laundering them into successes.
10. Human owner controls publication, merge, deployment, and disposition. Reviewers may challenge that owner's legitimacy; owner control of repository changes is not proof of moral legitimacy.

## Human Sigma-2 diagonal: unique prompts for new scenarios
H-CD-01: What does your right to refuse cost you in practice?
H-CD-02: Who decided what happens if nobody acts?
H-CD-03: Who can challenge the institution that granted your authority?
H-CD-04: Can two justified claims conflict without either being fraudulent?
H-CD-05: What material fact was missing when you gave consent?
H-CD-06: Would you call the same act authorized if it failed instead of succeeded?
H-CD-07: What right do you possess without asking an institution first?
H-CD-08: Which belief about your own authority could evidence overturn?
H-CD-09: Can you name a case your preferred framework cannot classify?
H-CD-10: Who independently checks the person who checks you?
These prompts are **scenario seeds**, not a validated survey or scored test. Participants may answer UNKNOWN, CONTEXT DEPENDENT, or REJECT PREMISE. No participant is scored for agreeing with CAN ⊬ MAY.

## Specialist handoff
Choose one CD ID, identify the strongest counterexample and first unsupported inference, construct a reproducible scenario or cite primary historical/legal evidence, state an independent oracle, disclose scope and competing interpretations, and return an evidence-state label. Submit genuinely novel cases through existing issue #83 or review AGAT through #94. Do not ask a specialist to certify the whole system.

## Remaining evidence and blockers
- CD-01 through CD-10: NOT TESTED; these are new proposed test specifications.
- Questionnaire validity, reliability, inter-rater agreement, and human-study ethics review: NOT TESTED.
- Independent process brake, revocation persistence, actual consequence observation, physical stop, and independent evidence custody: NOT ESTABLISHED by this document.
- Complete repo-wide deduplication: NOT VERIFIED. This index is a targeted delta against identified existing batteries; future maintainers must reconcile against the complete repository tree before implementation.
- No counterexample has been accepted or rejected by this document.

CAN ⊬ MAY. Maximize CAN; keep MAY outside. Freeze evidence; never freeze the search.
