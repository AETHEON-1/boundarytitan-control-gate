# Security Consequence Observatory v0.5 — Specialist Review Intake

**State:** REVIEW CANDIDATE / NOT VALIDATED. **No production deployment or publication of findings is authorized by this branch.**

## Objective
Measure whether defenders are closing consequential access paths, not merely publishing vulnerability or breach counts.

## Evidence status
- 2021–2026 monthly framework: 72 month slots; missing official monthly CVE and KEV observations are **missing, not zero**.
- Official CVE JSON 5 historical ingestion: **NOT COMPLETED**.
- Official CISA KEV ingestion: **NOT COMPLETED**.
- Annual U.S. compromise baseline: preliminary ITRC series; historical revisions must be retained.
- Monthly breach and remediation datasets: **INCOMPLETE**.
- Independently verified consequence-path closure rate: **NOT MEASURED**.
- External specialist review: **NOT PERFORMED**.

## Review lanes
1. Vulnerability data engineering: official source snapshots, checksums, completeness, CVE publication-date corrections, withdrawn records, KEV dateAdded vs actual exploitation date.
2. Incident response: credential/session/token invalidation, persistence removal, independent denial tests, residual access and re-entry, finite observation windows.
3. Statistics: denominators, reporting lag, selection bias, annual/monthly mismatch, time-series revisions, comparability.

## Sigma-2 diagonal adversarial challenges
- Can partial archives silently become a complete series?
- Can absent data become a zero?
- Can source or timestamp revisions manufacture a trend?
- Can a KEV catalog-entry date be misread as first exploitation?
- Can changed reporting coverage be mistaken for worsening security?
- Can patched CVEs conceal live sessions, stolen tokens, delegated credentials, alternate routes or persistence?
- Can a denial test certify paths it did not exercise?
- Can the evaluator hide its own failures, remove failing tests, or control evidence custody?
- Can an apparently independent reviewer be dependent on the same source or pipeline?
- Can a report promote preparation, successful import, or internal tests into external certification?

For every challenge preserve: test ID, exact fixture or source, expected invariant, observed result, counterexample, failure evidence, reviewer identity, unresolved uncertainty, and disposition.

## Acceptance gates
1. Source snapshots retrieved and cryptographically checksummed.
2. Completeness checked against independently enumerated source records.
3. Historical monthly counts reproduced and revisions reconciled.
4. Remediation observations explicitly define populations, periods, and units.
5. Independent specialists reproduce results and attempt falsification.

**No source or review gate is passed merely because this document exists.**

## Package availability and verification
The full 13-file v0.5 archive has now been extracted to `package/security_observatory/` on this review branch. All 13 Git blob SHA-1 identifiers were compared to the corresponding original uploaded ZIP entries and matched exactly. The original ZIP's SHA-256 inventory is in `PACKAGE_MANIFEST_v0_5.md`.

**This verifies transfer fidelity, not correctness of the research, official source ingestion, or independent validation.** The source completeness, external specialist review, and trend promotion gates remain blocked.

CAN ⊬ MAY. No owner, no brake. No ledger, no trust.
