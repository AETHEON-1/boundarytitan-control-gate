# BT-RSI-007 | Resource custody outside the evidence ledger

State: YELLOW / development-only synthetic evidence.

This narrow fixture tests two separate boundaries: a Linux filesystem resource owned by the privileged custodian, and an exact human-authority metadata receipt authenticated by a registry-held test secret. The unprivileged worker subprocess runs as the `nobody` UID. Its direct write attempt must fail, and the protected resource must remain byte-identical. A changed owner, changed task, or missing stop owner must invalidate the registry receipt.

**These are not independently validated production controls.** The runner's root administrator can rewrite the protected file and read or replace the fixture signing key. The registry is a local signing function, not a real human identity, jurisdiction, or legal-authority verifier. A cryptographic signature proves only that the specified test key signed bytes; it does not establish the owner's legitimacy or informed consent. The test does not enforce a real resource custodian API, stop queued external effects, or survive a compromised host. Root-required test skips are TEST INVALID, not success.

Next falsification: split credential custody from host administration, require resource-side commit-time checks for revocation and completion, exercise adversarial restarts, asynchronous external effects, and owner impersonation with independently verifiable institutional records.

The ledger remains evidence, not the lock. Lanes intersect through receipts, not inherited permission. CAN ⊬ MAY.
