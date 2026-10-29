# Security Consequence Observatory — v0.4 source acceptance and review gate
Date: 2026-10-29. Status: BLOCKED FOR TREND PROMOTION.

## Acquisition and provenance
Official CVE: https://github.com/CVEProject/cvelistV5/releases — select one immutable *all_CVEs_at_midnight.zip* baseline, not an hourly delta. Record release URL, release tag, asset filename, download timestamp (UTC), size, SHA-256, Git commit/tag, and any upstream checksum. Retain original bytes.
Official CISA KEV: https://www.cisa.gov/known-exploited-vulnerabilities-catalog — download full CSV or JSON, record URL, retrieval time, size, SHA-256, row count and catalog metadata. Retain original bytes.

## Fail-closed completeness checks
1. Do not infer completeness from nonempty monthly counts. Require a separately obtained official inventory/manifest or a documented independent comparison against a full release at the same revision.
2. Validate every CVE JSON schema version against its declared schema, all archive entries and duplicate IDs, and enumerate rejected/withdrawn/reserved states. Validate filename-to-CVE-ID mapping and year partition coverage.
3. Validate KEV required columns, unique CVE IDs, date format and parse success for every row. Compare row count and last-updated metadata to independently retrieved catalog summary when available.
4. If completeness cannot be established, status=UNVERIFIED_COVERAGE, not OBSERVED_COMPLETE; blank months remain null, not zero.
5. Treat October 2026 as PARTIAL_AS_OF_2026-10-29; November and December as FUTURE_NOT_OBSERVED.
6. Capture contemporaneous snapshots in subsequent runs to measure retroactive date edits, withdrawals, additions and backfills; never overwrite earlier snapshots.

## Reconciliation
CVE datePublished = publication timestamp in current snapshot, not necessarily contemporaneous appearance. KEV dateAdded = catalog admission, not exploitation occurrence. Record revisions between snapshots by CVE ID and original date. Do not derive attack probabilities by dividing KEV additions by CVE publications.
ITRC annual breach counts remain separate; monthly breach values require observed dated event-level data. Remediation sources require named population, numerator, denominator, period, sampling method and definition of 'fully remediated'. Path closure requires independently reproducible scoped denial receipts.

## Independent review package / acceptance questions
Reviewer must be organizationally independent of importer author and evidence custodian. Provide frozen source bytes, checksums, code commit, execution instructions, logs, exception list, schema validation results, reconciled tables and change log. Reviewer must reproduce counts on independent infrastructure and challenge: incomplete archive, duplicate ID, malformed date, late CVE revision, KEV old-CVE addition, timezone boundary, withdrawn records, partial month, missing monthly breach denominator, and patch-vs-effective-access conflation.
Acceptance: independent signed review with specific tested artifacts, failures, and remaining limits. A self-review or assistant-generated checklist does NOT meet this gate.

## Current execution
Official full archives were not retrieved in this environment (network connection failed). No full monthly official import, independent human review, remediation denominator reconciliation, or verified consequence-path closure testing was performed. No repository or publication changes.
