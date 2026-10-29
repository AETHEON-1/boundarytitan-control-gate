# Specialist adversarial challenge contract
State: prepared challenge, execution by independent specialist NOT PERFORMED.

## Target proposition
For the specified local checked-out tree, unauthorized file drift, omitted manifest entries, altered protected workflow/check files and tested malformed states produce explicit nonzero failure. Does this remain true under adversarial inputs and realistic repository privileges?

## Reproduction
1. Clone exact PR head and record `git rev-parse HEAD`, `git status --porcelain`, runtime versions.
2. Run `python3 -B -m unittest discover -s maintenance/tests -p 'test_*.py' -v`.
3. Run `python3 -B maintenance/integrity_sentinel.py --root .`.
4. Run `npm ci && npm run typecheck && npm test && npm run test:python && npm run verify:state`.
5. Compare the manifest with `git ls-files` and independently calculated SHA-256, including Unicode, newline, and symlink edge cases.
6. Preserve outputs, exit codes and exact source SHA; do not auto-regenerate manifest during verification.

## Attack matrix
A. Remove a required check file; B. alter it and update only manifest; C. remove check and edit both workflow and manifest; D. add ignored/untracked files; E. replace a tracked file with a symlink or path traversal; F. malformed/duplicate manifest entries; G. authority metadata true, null, or wrong type; H. rename/disable the workflow while keeping a green historical check; I. create stale PR check evidence after a new commit; J. mutate runner environment or Git index; K. omit a scheduled run entirely; L. compromise the single custodian of workflow and checker; M. add unmodeled execution path.

For each: precondition, adversary permissions, exact mutation, expected fail, observed result, recovery, evidence custody and remaining uncertainty. **Do not claim C, H, I, K, L or M are covered by the local checker.** Provider-side policy and independent custody need separate evidence.

## Sigma-2 diagonal
Who can suppress the check, alter the manifest, or supply a passing receipt while retaining the ability to merge? If the same principal controls the check, its evidence and the merge, what external authority actually blocks the transition?

## Stop and review
Use disposable fixtures and review branches only. No production mutations, credential extraction, deployment, merge or publication. Report suspected vulnerabilities privately through repository-authorized channels; no secrets in issue comments. Review cannot certify itself.

## Decision gate
Independent reproducibility + reviewed counterexamples + external enforcement evidence + named human decision are distinct. Reviewer recommendation is not merge authorization.
