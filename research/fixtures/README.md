# Workshop v0.2 reproduction and custody instructions

**Current reproducibility limitation:** the tested `workshop.py`, `authority.py`, and `fixtures/agent-revocation.json` are in a separate offline candidate package, not this GitHub repository. The accompanying `test_adversarial_v02.py` cannot run from a clean clone today. This is a blocking custody and portability gap, not a passing test.

## Required successor sequence
1. Obtain the exact v0.2 archive from the owner, record file size and SHA-256, custody transfer and extraction tool versions.
2. Independently inspect archive contents and any claims of authenticity. Do not infer authenticity from the digest alone.
3. In an isolated offline environment, locate `workshop.py`, `authority.py`, `fixtures/agent-revocation.json`.
4. Copy this folder's `test_adversarial_v02.py` beside those files. Run `python3 -m unittest -v test_adversarial_v02.py`.
5. Record Python version, exit code, stdout/stderr, and all deviations. These tests are expected to be RED for the recorded candidate; a passing result requires analysis, not automatic promotion.
6. On any discrepancy, mark evidence INDETERMINATE until reconciled. Preserve original logs, the failed case, and a new repair candidate separately.

Never perform live system actions or credential tests to reproduce these cases. A Python return flag is not a real external stop.
