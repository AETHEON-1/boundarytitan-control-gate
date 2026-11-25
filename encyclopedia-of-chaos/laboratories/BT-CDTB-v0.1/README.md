# BT-CDTB | Cross-Disciplinary Test Battery v0.1

2026-11-24 (America/Chicago) | YELLOW / candidate local synthetic specimen | Specialist handoff PREPARED, NOT SENT.

## Purpose
Determine whether capability, composition, evidence quality, and reproducibility can be examined without merging their proof obligations or treating machine-authored results as authority. Human independence is a separate evaluation dimension. No universal claim, novelty, certification, canonical admission, publication, or live execution is implied.

## Run and inspect
Python 3.10+ standard library only. No packages, network, credentials, or external system actions. Review source before execution. In a disposable local directory:

```
python run_battery.py --output reproduced.json
python -m json.tool reproduced.json
```

Compare `reproduced.json` with `machine-receipt.json` byte-for-byte or by SHA-256. The committed receipt is deterministic for the declared inputs; environment metadata is separately recorded in `execution-note.md`. Verify `SHA256SUMS` before comparing. The receipt preserves each fixture, expected state, calculated state and observations. An exit code of zero means only that the machine-authored expectations matched. This does not establish independent reproduction, a valid oracle, coverage or correctness in another domain.

## Contents
- `battery-specification.md`: frozen-for-review candidate claims, controls, falsifiers, routing and review protocol.
- `fixtures.json`: 31 synthetic fixtures, including 10 positive, 10 negative, 10 incomplete-evidence and one invalid specimen.
- `run_battery.py`: deterministic toy models and machine-generated classifications.
- `machine-receipt.json`: exact local run output.
- `execution-note.md`: environment, repeatability, limitations and authority receipt.
- `specialist-response-template.md`: one-arrow handoff and evidence return.
- `SHA256SUMS`: package digests (not a signature or independent custody).

## Continuity
Read-only source snapshot: Git tree f15f4d15597f76878a8059d81d8c358bd1d22358, AETHEON-1/boundarytitan-control-gate. Historical BT-CTC-001: 19 modeled cases, 12 violations, seven no modeled violation observed; not reexecuted or counted in this battery. Reuse its recovery/revocation experiments instead of replacing them. Candidate CD identifiers are local to this package, not canonical. Full cross-branch duplicate reconciliation pending.

## Stop boundary
No live systems, personal data, hazardous experiments, external contacts, repository writes or credentials. Human owner controls any transfer, further execution against external systems, disposition and publication. Stop the review if a requested operation requires new access or consequential action. No machine certification; unresolved, contradictory and invalid outcomes remain visible.
