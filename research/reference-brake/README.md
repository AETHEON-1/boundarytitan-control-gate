# Simulation-only Reference Brake
State: DEVELOPMENT EXPERIMENT / YELLOW. No independent process or operator boundary.
Run from this directory: python3 -m unittest -v test_brake.py

Local execution 2026-10-17: seven unit tests PASS. Environment: isolated local Python process. No network, credentials, production resources, or independent external witness.

Threat model covered: request mutation, forged token string, duplicate nonce replay, revocation before queued commit, requester restart replay, stale epoch.
Threat model NOT covered: authority compromise, shared-process compromise, memory tampering, key extraction, concurrency races, independent administration, observer integrity, alternate consequence paths, actual persistent queue, deployment.
The HMAC key is a hard-coded fixture: NEVER use this implementation for production authorization. Requester and authority exist in the same process; class separation is not a security boundary.
Observed resource state is returned by the resource itself; it is not an independently administered witness.
Result: PASS WITHIN FIXTURE ONLY. External brake: NOT ESTABLISHED.
