# BT-RSI-001 cross-process adversarial fixture
Development-only. Run: `python3 -m unittest -v test_cross_process.py`.

The authority gate and worker are different OS processes communicating over a Unix socket. The deliberately faulty worker can directly write its synthetic consequence receipt without contacting the gate. The detector reports this as an unmediated effect, and the subprocess exits 1. This is a **demonstrated architectural counterexample** to the claim that a separate gate alone enforces path dominance.

No production effect, real credential, persistent service, actual model improvement, or independent evidence custody. The worker can write its own receipt, so evidence is not independently trustworthy. This test MUST NOT be treated as a containment success. A real enforcement boundary would have to deny the worker direct access to the consequence resource, including when the gate is bypassed.

Preserve all failures. Do not self-authorize, merge to main, or deploy.
