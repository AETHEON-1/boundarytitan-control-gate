# Security Consequence Observatory | Preliminary baseline v0.1

**As of:** 2026-10-29. **State:** PARTIAL / NOT VALIDATED. **Coverage:** January 2021 to October 2026, with future months explicitly excluded.

## Observed result

The ITRC's 2025 annual report identifies **3,202** U.S. data compromises in 2023, **3,152** in 2024, and **3,322** in 2025. Thus 2024 was approximately **1.6% below** 2023, while 2025 was approximately **5.4% above** 2024 and **3.7% above** 2023. These are *reported U.S. compromises*, not all cyber incidents and not a monthly series. Source: https://www.idtheftcenter.org/post/2025-annual-data-breach-report-record-number-compromises/

The same ITRC source reports missing attack information in **45%** of 2023 notices, **65%** of 2024 notices, and **70%** of 2025 notices. These are transparency measures, not verified containment rates.

## Not yet established

- Monthly CVE counts: missing pending ingestion of the official CVE JSON 5 publication-date records. CVE ID year must **not** be treated as publication year. Source: https://github.com/CVEProject/cvelistV5
- Monthly CISA KEV additions: missing pending ingestion of the official KEV CSV. `python build.py --kev-csv path/to/known_exploited_vulnerabilities.csv` computes distinct CVEs by `dateAdded`; this does **not** measure the date exploitation began.
- Monthly breach totals: not transcribed or independently verified for 2021–2026. Annual counts are **not** allocated across months.
- Remediation: no longitudinal comparable denominator assembled; vendor-specific findings cannot be generalized to all organizations.
- Independently verified consequence-path closure: **NOT TESTED**, and no comprehensive public numerator/denominator has been identified.

## Preliminary assessment

The ITRC annual series is not monotonic, and disclosure coverage is incomplete. It is therefore **indeterminate** whether real-world attacks are accelerating faster than detection or whether defenders are keeping pace. A rise in CVE publications alone would not resolve the question. The missing endpoint is reproducible, independently challenged denial of previously consequential paths, scoped to known routes and observation windows.

## Reproducibility and evidence rules

Run `python build.py` using Python standard library. To populate KEV additions, download the official CISA CSV and pass `--kev-csv`. Source datasets must be snapshotted with download time and checksum before publication. The script currently has no CVE ingestion or automated source fetching. Preserve missing values as blanks with explicit status fields. Never interpret a missing observation as zero. Future months are `NOT_APPLICABLE_FUTURE`. Do not aggregate these heterogeneous measurements into a security score.

## Next validation gates

1. Snapshot official CVE records and implement a published-date parser with rejection and duplicate handling.
2. Snapshot CISA KEV and record hash, date, and backfill revisions.
3. Reconcile ITRC monthly/annual totals without inventing monthly values.
4. Define a bounded denominator for patching and independently tested path denial.
5. Obtain independent method review before any claim of verified recovery or global security deterioration.

No repository write, WordPress publication, live testing, deployment, or certification performed.
