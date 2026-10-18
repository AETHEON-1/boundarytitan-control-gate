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

## CI evidence addendum: latest verified branch run
Workflow: https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39085701369
Commit: b0596e048afcdd2cac38fd7e692fce2517850037
Job: 117551679822. Overall: FAILURE.
- npm ci: completed; npm audit reported **35 vulnerabilities (3 moderate, 31 high, 1 critical)**. This is an install-time advisory report, not proof of exploitability. Earlier repository-state notes claiming zero known vulnerabilities are historical and contradicted by this run.
- TypeScript typecheck: PASS.
- Jest: **36 suites / 112 tests PASS**. These are existing tests, not executions of CD-01..CD-10.
- Python handoff: **3 tests PASS**.
- `npm run verify:state`: FAIL (exit 1). Raw verifier listed README.md hash drift and eight missing tracked files: `.github/workflows/interaction-sensor.yml`, `docs/INTERACTION-SENSOR.md`, `docs/research/CROSS-DOMAIN-FALSIFICATION-SPECIALIST-ENTRYPOINT-v0.1.md`, `docs/research/SPECIALIST-HANDOFF-AND-FAILURE-TRANSFER-20261017.md`, `encyclopedia-of-chaos/EOC-20261017-01-cross-domain-falsification-integration.md`, `encyclopedia-of-chaos/reality-benchmarks/RB-001-51-50-failures-contradictions-v0.1.md`, `scripts/interaction_sensor.py`, `tests/test_interaction_sensor.py`.
- GitHub Actions warned that Node.js 20 is deprecated and checkout/setup-node v4 were forced to Node 24. Record for future action upgrades; not the direct failure in this run.
Disposition: CI RED; manifest custody unresolved; dependency audit needs triage. No manifest auto-repair performed. No deployment or merge authorized.

## Superseding evidence and security triage checkpoint (2026-10-17)
The earlier CI RED block is preserved as a historical result at `b0596e048afcdd2cac38fd7e692fce2517850037`. The manifest repair at `5ea7ad42618688bd07baf76ebe85eeb16f8a5f6b` was subsequently verified GREEN by [PR workflow 39085924168](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39085924168) and [push workflow 39085920700](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39085920700). EOC-F01 is RESOLVED (canonical path `encyclopedia-of-chaos/`); EOC-F05 is RESOLVED **at the repair commit**, not automatically at future commits.

Dependency inventory: seven direct development dependencies in `package.json`; 287 non-root lockfile package records all marked `dev: true`. The historical 35 npm advisories remain OPEN for package-level triage. CI executes development dependencies, so dev-only is not a security clearance. The workflow now captures `npm audit --json` as a **nonblocking diagnostic artifact**, not a security PASS. The report must be examined for advisory IDs, affected versions, dependency paths, fixed ranges, CI execution paths, and residual risk before closure.

GitHub API reported PR #95 open and non-draft at this checkpoint. Human MERGE HOLD remains binding regardless of GitHub UI readiness. No merge or deployment authorized. New CD challenges remain NOT TESTED, external brake unverified. This documentation commit requires fresh CI evidence; do not infer PASS from historical runs.

## CI failure and containment correction: audit artifact vs tree verifier (2026-10-18)
At commit `cc98cab6701b0baec7c94f655fa921eaf2e32aa7`, [push run 39086462846](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39086462846) failed **only at repository-state verification**: `current manifest is missing tracked file: npm-audit-report.json`. The audit collection, artifact upload, typecheck, 36 Jest suites / 112 tests, and 3 Python tests succeeded. Root cause: transient audit JSON was still present in the working tree when the verifier checked for untracked files. This is a valid verifier finding, not evidence of corrupted manifest or a new tracked source file. Corrective action: preserve the audit as a GitHub Actions artifact, then remove the transient file before verification. No verifier suppression, manifest exemption, or forced audit dependency upgrade. The failed run remains preserved; verify the corrective commit separately.

Full npm audit JSON was retrieved from run 39086462846 artifact `npm-audit-cc98cab6701b0baec7c94f655fa921eaf2e32aa7` (artifact ID 12120449385). Report metadata: 35 affected package entries, 3 moderate / 31 high / 1 critical; 287 dev dependencies, 1 root/prod metadata entry, 2 optional. The critical package is transitive `handlebars`, vulnerable range `3.0.0 - 4.7.9`, with an npm-reported fix available. Many high entries are Jest-related; npm suggests Jest `30.5.2` (semver-major), so upgrade requires compatibility testing rather than automatic force. Advisory inventory and exploitability assessment remain open. The artifact is the evidence source; this note is not a security clearance.
