# EOC-20261017-01 — Cross-domain specialist falsification integration

Status: OPEN / YELLOW. Evidence custody record; no claims of test success.

## Verified observations
- Enumerated complete Git tree of main via GitHub Git Trees API: 311 entries; truncated=false.
- Canonical existing encyclopedia directory: `encyclopedia-of-chaos/`, with `reality-benchmarks/RB-001-51-50-failures-contradictions-v0.1.md`. This entry extends that directory; it does not replace the existing record.
- `AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md` contains AM-01..AM-24.
- `BT-BCS-CAN-MAY-001-FINAL-TEST-BATTERY.md` already contains human denial, conflict, appeals, emergency, and policy-engine converse scenarios.
- `SIGMA-TWO-DIAGONAL-WORKFLOW-v0.1.md` and `src/tests/sigma-two-diagonal-workflow.test.ts` already contain owner/denial/revocation/external-stop questions and structural checks.
- Cross-domain delta documentation and README pointer added in draft PR #95; no tests executed in this integration.

## Failures, contradictions, unresolved claims
EOC-F01: Prior handoff claimed encyclopedia path unresolved. CORRECTED: canonical directory `encyclopedia-of-chaos/` verified from complete Git tree. Preserve prior incorrect assumption as a provenance correction.
EOC-F02: New CD-10 initially overlapped existing AM-20 brake dependency. CORRECTED: narrowed to conflicting independent human reviewer dispositions. Earlier wording remains in commit history.
EOC-F03: Cross-domain human prompts overlap concepts already in Sigma-2 workflow and BT-BCS test battery. NOT FULLY RESOLVED: questions are scenario seeds, not independent new findings or validated survey items. Reuse existing question identifiers before adding any scored questionnaire.
EOC-F04: No new runtime or human study executed. NOT TESTED. Do not infer pass from documentation.
EOC-F05: Repository-state manifest may drift after added tracked files. NOT VERIFIED; do not claim green CI or update manifest without custody review.
EOC-F06: Independent brake, physical stop, and third-party reproduction remain NOT ESTABLISHED.

## Next maintainer / specialist with a hammer
1. Run `npm ci && npm run typecheck && npm test -- --coverage=false && npm run test:python && npm run verify:state` in an isolated checkout; capture raw logs and commit SHA.
2. If manifest fails, preserve failure and reconcile the ledger under its existing rules. Never suppress the failing check.
3. For each CD-01..CD-10, search existing case IDs and mark LINKED-EXISTING when the mechanism and expected observation match. Do not multiply counts.
4. Run seeded-defect controls against the evaluator before trusting a clean result.
5. Ask specialists to submit a countermodel with frozen definitions, an independent oracle, alternative explanations and first unsupported inference. Permit explicit rejection of the framework's premises.
6. Append observed failures and corrections to `encyclopedia-of-chaos/`, keeping separate case records with traceable provenance.
7. No merge, publication, deployment, or certification follows from this record.

CAN ⊬ MAY. Freeze the evidence; never freeze the search.
