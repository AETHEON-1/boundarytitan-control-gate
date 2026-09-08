# Current Repository State v0.2

Recorded: 2026-09-08
Repository: `AETHEON-1/boundarytitan-control-gate`
Baseline reviewed: `f9ad71c2f4f409c4d4f60928c724b2ab8970364a`
Repair scope: local read-only prototype and evidence-state integrity

## Plain-language translation

The repository is a working prototype. Its local checks pass, but the older
release notes and hash package described a different tree. The repair makes
the current state explicit, rejects malformed or expired time-bound records,
binds approvals to all authorization-relevant action fields, and makes the
specialist handoff runnable from any checkout.

## Verified current state

- TypeScript typecheck: PASS.
- Jest: 33 suites / 105 tests PASS.
- Python handoff tests: 3 PASS.
- Python handoff execution: PASS with a caller-selected output path.
- Current tracked-tree manifest: verified by `npm run verify:state`.
- Dependency audit: 0 known vulnerabilities after the lockfile repair.
- Independent verification, field validation, publication, merge, and
  deployment: NOT ESTABLISHED.

## Repairs applied

- Receipt completeness rejects blank owners, stop paths, evidence references,
  invalid expiry timestamps, and expired receipts.
- Switchboard requests hold on invalid or expired request expiry timestamps.
- Robotics brake validity requires valid tested-at and valid-until timestamps,
  with the validity window active at the decision time.
- Agentic handoff action digests include consequence, irreversibility,
  required permissions, and indirectness; mutated approvals cannot reuse a
  digest.
- Agentic handoff output no longer depends on `/mnt/data`; `--output` is
  portable and defaults to a local filename.
- Derived composition findings are recorded as modeled events instead of being
  hidden only inside aggregate metrics.
- A current tracked-tree hash manifest and read-only verifier are present.

## Known unresolved state

- `RELEASE_CANDIDATE_MANIFEST.json` and `SHA256SUMS.txt` remain historical RC1
  custody artifacts. They are not the current-tree ledger.
- The repository has no operational runtime authority, deployment authority,
  independent specialist validation, protected-branch enforcement, or
  CODEOWNERS-based external brake established by this repair.
- The open specialist handoff remains an attack surface, not an endorsement.

## BoundaryTitan translation

The code can produce evidence and route review. It cannot authorize itself,
certify its own safety, or close the human review. The current tree ledger is
now explicit; the human owner and independent reviewers remain the parties who
can still say no.
