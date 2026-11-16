# AGAT final maintenance and handoff — 2026-10-17

State: YELLOW / DRAFT / NO DEPLOYMENT / NO CERTIFICATION.
Scope: experimental branch only. No merge or external consequence authorized.

## Last verified workflow results

- [AGAT run 39067558753](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067558753): SUCCESS. The earlier repaired STOP suite passed 12/12 in [run 39067355698](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067355698).
- [Bounded verification run 39067558746](https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/39067558746): FAILED at `npm run verify:state`. Typecheck, Jest and Python handoff steps passed.
- Root cause of current repository-state failure: `CURRENT-REPOSITORY-MANIFEST.json` lacks 11 tracked files: `.github/workflows/agat-lab.yml`, `.github/workflows/interaction-sensor.yml`, `docs/INTERACTION-SENSOR.md`, `encyclopedia-of-chaos/agat-stop-authority-failures-and-specialist-handoff-2026-10-17.md`, `encyclopedia-of-chaos/reality-benchmarks/RB-001-51-50-failures-contradictions-v0.1.md`, `experiments/agat/README.md`, `experiments/agat/STOP-AUTHORITY-EVIDENCE.md`, `experiments/agat/test_process_lab.py`, `experiments/agat/test_reference_lab.py`, `scripts/interaction_sensor.py`, `tests/test_interaction_sensor.py`.

## Required deterministic manifest repair

On the experimental branch, in a clean checkout with the exact intended tracked files:

```sh
git status --short
node scripts/verify-repository-state.js --write
git diff -- CURRENT-REPOSITORY-MANIFEST.json
npm run verify:state
python -m unittest discover -s experiments/agat -p 'test_*.py' -v
```

Review generated file paths, SHA-256 digests, and byte sizes against the tracked checkout; verify the historical release-candidate metadata remains untouched. Commit only the reviewed manifest on the experimental branch, then require BOTH workflows to pass on the resulting commit. Preserve prior failed runs. Do not edit verifier logic, suppress integrity checks, or claim a PASS before execution.

## Specialist disposition

See [Encyclopedia AGAT STOP failure ledger](../encyclopedia-of-chaos/agat-stop-authority-failures-and-specialist-handoff-2026-10-17.md) and [review issue #94](https://github.com/AETHEON-1/boundarytitan-control-gate/issues/94). Independent requester/STOP/sink isolation, compromised requester bypass testing, race ordering, and independent evidence custody remain unverified. Known-bad fixture detection is not proof of an independent brake.

## Custody and next-person handoff

The experimental branch and draft PR #93 are retained for review. No merge, deployment, release, doctrinal revision, or claim of complete repository verification is authorized by this document. Human owner controls admission. CAN ⊬ MAY. No owner, no brake. No ledger, no trust.
