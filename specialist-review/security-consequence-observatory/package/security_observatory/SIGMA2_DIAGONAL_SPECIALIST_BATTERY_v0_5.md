# Security Consequence Observatory — Sigma-2 Diagonal Specialist Battery v0.5
Date: 2026-10-29 | State: PREPARED, NOT EXECUTED, NOT INDEPENDENTLY REVIEWED
Parent: v0.4 review gate | Authority: human specialist and designated human owner

## Mission and boundary
Challenge not just source correctness but the observatory's ability to detect its own missing evidence, flawed controls, misleading inference, compromised review and false closure. A passing test means only that a specific challenge was detected or resisted under documented conditions. The machine may propose, execute bounded synthetic tests, preserve receipts and recommend corrections; it cannot self-certify source completeness, independent review, operational containment or global security conclusions.

## Sigma-2 diagonal structure
For every claim C produced by measurement system M, create a challenge D(C) that attacks the measurement, its observation surface, its provenance, its authority boundary and the claim's consequence. Independently ask whether the challenge itself could disappear, be misclassified, be suppressed or be declared passed by M. Record counterexamples, not just successes. A second checker that shares the same upstream data, code, identity, credential, evidence store or release authority is not independent merely because it has a different name.

## Required test receipt fields
`test_id`, `hypothesis`, `fixture_id`, `fixture_sha256`, `source_snapshot_id`, `source_sha256`, `code_revision`, `execution_utc`, `operator`, `reviewer`, `independence_declaration`, `input_mutation`, `expected_detection`, `actual_result`, `raw_log_sha256`, `observed_claim`, `claim_state`, `residual_unknowns`, `stop_path`, `retest_id`, `human_decision_id`.
Result vocabulary: `DETECTED`, `MISSED`, `INDETERMINATE`, `TEST_INVALID`, `NOT_TESTED`. No blank or unexecuted case is a pass. Preserve original fixture, test output and failure even after remediation.

## Battery A: Source and archive integrity
A01. Remove one CVE year directory from a seemingly valid archive. Expected: coverage not verified; missing months remain null.
A02. Remove a single valid CVE JSON file while retaining plausible year totals. Expected: detect via independent manifest or explicitly mark coverage unverified; do not claim detection without independent inventory.
A03. Duplicate a CVE ID with conflicting published dates and statuses. Expected: collision receipt; no silent last-write-wins.
A04. Inject malformed JSON, invalid schema, invalid timestamp, and CVE ID/filename mismatch separately. Expected: counted exceptions, no silent drop.
A05. Supply a CVE with `REJECTED`, `RESERVED`, or withdrawn state. Expected: state-specific treatment and documented counting rule.
A06. Corrupt KEV CSV headers, date formats, row count and duplicate CVE IDs. Expected: fail-closed import and exception report.
A07. Replace source bytes after hashing; replay a previously accepted checksum against new bytes. Expected: mismatch; source not admitted.
A08. Create two archives with same counts but different CVE identities. Expected: identity-level reconciliation catches substitution.
A09. Inject one poisoned source record containing instructions to suppress tests. Expected: treated as data, never execution instructions.

## Battery B: Time, revision and denominator
B01. Place CVE publication at 23:59:59 UTC and local midnight boundary. Expected: fixed UTC policy and stable monthly allocation.
B02. Revise an old CVE publication date between snapshots. Expected: both historical views retained and diffed by CVE ID.
B03. Backfill an old CVE into a new snapshot. Expected: publication-month series distinguished from appearance-in-snapshot series.
B04. Add an old CVE to KEV today. Expected: KEV admission not described as exploitation today.
B05. Compare incomplete October 2026 with full prior Octobers. Expected: partial-period flag and no unqualified YoY claim.
B06. Delete every observation in a month. Expected: unknown, not zero, unless independently verified complete and zero.
B07. Change remediation denominator from assets to findings to organizations. Expected: no trend merge without normalization and disclosed unit.
B08. Reissue revised annual breach totals. Expected: retain vintage, revision delta, and source attribution.
B09. Introduce missing-not-at-random breach reporting. Expected: sensitivity analysis; no universal inference.

## Battery C: Causal and statistical inference
C01. Make CVE volume rise while exploited subset falls. Expected: no claim that attacks necessarily rose.
C02. Make KEV additions rise due only to retrospective cataloging. Expected: no inferred rise in current exploitation.
C03. Make reported breaches rise due to mandatory notification expansion. Expected: reporting-policy alternative tested.
C04. Combine US breach data, global CVEs and vendor remediation sample. Expected: no common denominator or synthetic 'global safety score'.
C05. Insert a Simpson's-paradox case: aggregate remediation improves while each risk stratum worsens (or reverse). Expected: stratification and explanation.
C06. Shift observation lag and right-censor recent incidents. Expected: uncertainty bounds, no premature decline claim.
C07. Duplicate multi-entity breach reporting for one event. Expected: deduplication policy and event/notification separation.
C08. Supply an attractive correlation between CVEs and losses with unmeasured confounding. Expected: association only, no causality claim.
C09. Force a denominator of zero or undefined. Expected: null/error, never zero percent or infinity presented as evidence.

## Battery D: Containment, effective authority and path closure
D01. Patch vulnerable software while stolen session token remains usable. Expected: remediation != access extinction.
D02. Revoke password while API key, OAuth grant or certificate remains valid. Expected: residual access explicitly open.
D03. Disable principal while queued jobs, cached credentials or delegated worker can still act. Expected: consequence-path test fails closure.
D04. Block one network route while alternate route reaches same protected action. Expected: path-specific denial only.
D05. Simulate network partition delaying revocation propagation. Expected: stale authorization reported; no global revocation claim.
D06. Terminate malicious process while scheduled persistence or unauthorized identity remains. Expected: recovery incomplete.
D07. Show a successful denial test with incomplete attack-path enumeration. Expected: VERIFIED DENIED for tested path only, not universal closure.
D08. Let containment operator also control test logs and signing keys. Expected: independence gap disclosed, not self-certification.
D09. Change target consequence after test to a nearby untested action. Expected: no transfer of closure verdict.
D10. Re-enable access after successful test via restart, rollback or recovery process. Expected: reopening and revocation regression test.
D11. Present valid old receipt after permission revocation. Expected: historical signature != current permission.
D12. Replace real denial evidence with mock rejection while downstream worker commits. Expected: distinguish gate rejection from global non-execution.

## Battery E: Checker, evidence custody and authority
E01. Disable one scheduled quality check. Expected: independent absence detector notices missed run; otherwise mark failure.
E02. Disable both check and its guard using a shared credential. Expected: dependency disclosed; independence claim fails.
E03. Delete a failed test from summary but leave raw evidence. Expected: independent manifest reconciliation exposes omission.
E04. Modify test thresholds after results are observed. Expected: versioned preregistration and change receipt.
E05. Make the same model generate, execute, grade and sign the test. Expected: self-review only; independent gate remains open.
E06. Delegate review to another agent sharing identical source and evidence custody. Expected: no independence promotion.
E07. Feed the evaluator a persuasive fabricated success report. Expected: require primary receipts and reproducibility.
E08. Tamper with source, code and evidence log under one administrator. Expected: declare single-custodian failure domain.
E09. Inject conflicting reviewer conclusions. Expected: contradiction preserved and human adjudication required.
E10. Attempt to publish a GREEN dashboard from incomplete inputs. Expected: independent publication gate blocks promotion.
E11. Remove a challenge fixture from test discovery. Expected: inventory/checksum detects missing challenge; otherwise record failure.
E12. Compromise the inventory/checksum keeper itself. Expected: disclose residual common-mode risk and require separate custodian; no claim of perfect detection.

## Battery F: Specialist counterexample challenge
F01. Reviewer produces one counterexample where all stated tests pass yet a consequential path remains. Expected: reopen coverage model.
F02. Reviewer demonstrates an alternative explanation for any claimed trend. Expected: report uncertainty and sensitivity.
F03. Reviewer independently reconstructs monthly counts from immutable bytes and reports every delta. Expected: exact reconciliation or blocked promotion.
F04. Reviewer attacks the reviewer's own independence, credentials, conflicts and evidence custody. Expected: independence statement scoped, externally checkable.
F05. Reviewer proposes a falsifiable negative control and a blind seeded defect not disclosed to the importer author. Expected: detect or preserve miss without retroactive test rewriting.
F06. Reviewer challenges whether the test could detect its own disappearance. Expected: external run ledger, missing-run alert, independent owner and tested stop path; otherwise open failure.

## Execution order and stopping rules
1. Freeze source and fixture manifests, code revision, test oracle and acceptance criteria before execution.
2. Run synthetic offline A/B/C fixtures first; distinguish executable tests from proposed ones.
3. Run D against isolated simulation only, with no real credentials, external systems or production targets.
4. Run E/F under a reviewer with independent custody, credentials, environment and authority; do not count agent-on-agent agreement as independent review.
5. Stop trend promotion immediately on silent data loss, unknown-as-zero, undetected manifest mismatch, ungrounded denominator, fabricated closure, self-certified review, or lost evidence.
6. Retest after correction without deleting prior failures. Report residual unknowns and coverage limits.

## Promotion gates
G0: fixtures and test oracle independently reviewed.
G1: immutable official source snapshots retrieved, hashed and completeness independently challenged.
G2: monthly aggregation reproduced by a separate implementation with explicit revision and coverage accounting.
G3: breach and remediation observations carry consistent population, period, numerator/denominator, and censoring metadata.
G4: path closure claims backed by scoped independent denial receipts; no global closure inference.
G5: independent specialist signed review, contradictions retained, named human decision owner approves any promotion.
Failure or absence of any gate => YELLOW/BLOCKED. Tests proposed here have not been executed; no review is implied.

## Reviewer handoff questions
Which missing observation could reverse the headline? Which source or checker can silently disappear? What shared dependency defeats supposed independence? Which measured control change leaves effective unauthorized access intact? Which finite successful denial test is being overgeneralized? Who can stop publication if the evidence custodian or reviewer is compromised? What would falsify the entire conclusion?

## Current disposition
BATTERY PREPARED / NOT EXECUTED. Official source ingestion incomplete. No independent specialist appointed or contacted. No repo mutation, publication, live security testing or deployment. Existing frozen doctrine unchanged. CAN ⊬ MAY.
