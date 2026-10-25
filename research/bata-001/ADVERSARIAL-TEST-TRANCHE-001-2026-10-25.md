# BATA-001 | Adversarial testing tranche 001
Date: 2026-10-25. Status: YELLOW / PARTIAL EXECUTION / CONFIRMED MANIFEST DEFECT. No live field testing, CI execution or security certification.

## Exact observed tests
M01 Read branch CURRENT-REPOSITORY-MANIFEST.json: parsed as JSON. PASS.
M02 Unique manifest paths: 286 entries, zero duplicate path keys. PASS.
M03 Lexicographic ordering of manifest paths: PASS.
M04 Expected specialist handoff path in manifest: FAIL, absent.
M05 Expected cross-repository review path in manifest: FAIL, absent.
Paths: research/bata-001/CITIZENS-ASSESSMENT-SPECIALIST-HANDOFF-v0.1.md and research/bata-001/REPOSITORY-CROSS-REVIEW-2026-10-25-v0.1.md.
M06 Current manifest covers complete branch tree: NOT TESTED; no complete tree enumeration obtained.
M07 SHA-256 and byte-size match for all entries: NOT TESTED.
M08 npm typecheck/Jest/Python test: NOT EXECUTED.
M09 npm audit and advisory reachability: NOT EXECUTED.
M10 runtime independent stop, bypass, revocation latency: NOT EXECUTED.
M11 Citizens live policyholder dispute: NOT AUTHORIZED / NOT EXECUTED.

## Root cause hypothesis
Files were committed without regenerating CURRENT-REPOSITORY-MANIFEST.json. This is consistent with prior recorded manifest omissions, but not independently proven as the unique root cause. The verifier's currentEntries() uses git ls-files including tracked and nonignored untracked paths; missing committed files should be reported. Actual verifier invocation on this branch NOT PERFORMED. Do not mislabel M04/M05 as observed CI failure.

## Repair protocol (not yet performed)
1. Obtain full branch tree with byte-level access.
2. Run node scripts/verify-repository-state.js and preserve failing exit code/output.
3. Run node scripts/verify-repository-state.js --write in isolated branch working tree; preserve pre-repair manifest.
4. Confirm both new files and every tracked path present, compare size and SHA-256 against actual bytes, and run readback.
5. Run verify:state again and preserve result.
6. Run typecheck, Jest, Python and advisory capture with pinned tool versions; preserve negative results.
7. Only human owner determines whether to merge or claim integrity repair. Never rewrite historical failure.

## Countertest battery for future execution
B01 deletion/addition of a tracked fixture must fail verifier until manifest updated.
B02 same-size byte mutation must fail digest comparison.
B03 untracked nonignored fixture must be included by verifier's currentEntries() and fail when absent from manifest.
B04 ignored fixture must not spuriously appear.
B05 duplicated manifest path must be explicitly rejected; existing verifier maps duplicate paths, so duplicates can be masked if one matches expected entry. Hypothesis pending isolated reproduction.
B06 manifest with malformed files field or malformed JSON must fail cleanly; inspect crash vs actionable diagnostic.
B07 race: file changes between manifest generation and verify must be detected or explicitly bounded.
B08 file path symlink escape, missing file and unreadable file must not be reported as successful integrity verification.
B09 compare verifier results against independent script to detect shared-oracle errors.
B10 repository integrity pass must not be promoted to signature/custody/approval or runtime security assurance.

## Encyclopedia of Chaos additions
EOC-BATA-009 CONFIRMED: two committed files absent from current branch manifest. Evidence: direct manifest read and path membership checks.
EOC-BATA-010 OPEN: verifier silently accepts duplicate paths in manifest due to Map overwrite; source inspection suggests weakness, independent reproduction pending.
EOC-BATA-011 OPEN: --write mode could overwrite evidence of drift if executed without preserving before-state; preserve old manifest and command transcript.
EOC-BATA-012 OPEN: repository-wide tests remain unexecuted; never substitute test design for test outcome.

## Stopping rule
Testing exhausted only to the limit of available inspected surfaces, NOT full repository or independent security coverage. Continue once full tree and executable test environment are available. No auto-upgrade from a corrected manifest to trustworthy custody.
