# Official history import | v0.2 development-only

**State:** SOURCE INGESTION NOT EXECUTED ON FULL OFFICIAL DATA. The runtime cannot currently retrieve the source archives. Import code is prepared and synthetic-fixture-tested; it is not independently validated.

1. Download an official CVE JSON 5 daily baseline ZIP from https://github.com/CVEProject/cvelistV5/releases (or clone https://github.com/CVEProject/cvelistV5). Preserve the exact release tag and file hash.
2. Download the official CISA KEV CSV from https://www.cisa.gov/sites/default/files/csv/known_exploited_vulnerabilities.csv and preserve the source snapshot.
3. Run `python import_official.py --cve /path/to/official_cve_baseline.zip --kev /path/to/known_exploited_vulnerabilities.csv` in this folder. This updates the monthly CSV and writes `import_manifest.json`.
4. Compare each annual sum against the source's own year-by-year published-date counts, inspect rejected records, and independently review source versions before promoting any result.

CVE counts use `cveMetadata.datePublished`, not the CVE identifier year. KEV counts use `dateAdded`, not date of first exploitation. Only PUBLISHED CVEs are counted. The current snapshot can retrospectively alter earlier periods. Missing inputs stay missing. A supplied complete snapshot permits observed zero for months without qualifying records, but an incomplete archive would misleadingly produce zeros: verify snapshot completeness before use. The importer does not infer monthly breach, remediation, or verified-closure counts. Existing ITRC annual data remains separate.

**Open defects:** No verification of complete archive coverage; no handling of withdrawn-then-republished historical state beyond current published status; source-level historical revisions require separate snapshot diffing; ZIP input trust and resource limits require hardening before unattended execution. No GitHub write or publication authorized.
