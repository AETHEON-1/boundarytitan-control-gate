# eMudhra specialist addendum — 2026-10-22

State: PREPARATION COMPLETE FOR REVIEW; EXECUTION ADMISSION INCOMPLETE.
Primary lane: Cybersecurity / certificate trust, revocation and recovery.
Baseline: PR106 head 9f1e06af4beb8b8529e6e0bf526273ad9d668591.
This append-only supplement preserves the October 20 handoff, eight-row matrix and all earlier failure receipts. It adds three proposed work packages; it does not change their result states.

## Source ledger
Sources inspected October 22, 2026; publication/report dates below. Summaries are source statements, not reproduced measurements.
- October 21, incident comments 28–29: Mozilla acknowledged Android trouble and reported a startup blocklist fix in 158.0.2. https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c29
- October 21, release notes: 158.0.2 installs the predistributed OneCRL list at startup to reduce the vulnerability window. https://www.firefox.com/en-US/firefox/android/158.0.2/releasenotes/
- October 21 report, inspected October 22: bug 2084517 is public and RESOLVED DUPLICATE of 2084311. Its reporter describes acceptance on Android 13, Firefox 158.0.1 build 2016191351. Earlier retrieval failures remain historical observations, not current status. https://bugzilla.mozilla.org/show_bug.cgi?id=2084517
- October 22 retrieval: implementation bug 2084311 returns Access Denied. Mechanism details unavailable here. https://bugzilla.mozilla.org/show_bug.cgi?id=2084311
- October 21, comment 30: Chrome's root-program account requests migration identifiers, instructions, completion counts and ACME replacement mechanics, and challenges prior incident handling. These are questions, not findings. https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c30
- October 22, comment 34: Zihao Wang reports CRL #11 verification with an OCSP responder public key and provides commands. Cryptographic reproduction NOT PERFORMED. https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c34
- October 22, comment 36: Wayne reports additional wrong-key CRLs and subsequent replacement without disclosure. Scope and corrective-control failure remain unverified here. https://bugzilla.mozilla.org/show_bug.cgi?id=2083449#c36

## Work package A — Android startup and recovery
Question: Does the claimed startup remedy cause rejection in the exact profile, including after restart and restoration?
Inputs to pin before execution: installer/build digest for 158.0.1 and 158.0.2, Android version and security patch, fresh/existing profile snapshots, OneCRL and trust-store bytes/revisions, RemoteSettings state, cache contents, evaluation clock, exact certificate chains and lawful offline fixture.
The reported old build is a retrieval target, not an acquired specimen. Updated build identity remains UNKNOWN. Certificate fingerprints and installer hashes have not been populated.
Proposed comparisons: same profile before/after update; fresh versus existing profile; first startup versus restart; fresh versus stale cache; online-update-enabled versus isolated offline state. Any connected update path requires separate scope approval; never contact affected sites.
Freeze the predicted verdict and permitted startup interval before execution. Record list-install time, verifier-decision time and raw rejection reason. Count neither expiry nor missing anchor alone as revocation enforcement.
Defeating observation: the claimed protected profile accepts the affected chain after the declared protection point. Failure to obtain a suitable chain is NOT TESTED; failure to establish the intended profile is TEST INVALID.
Control: unrelated valid chain must remain accepted; deliberately invalid chain must be rejected. An old-profile acceptance is an observation to reproduce, never an assumed control outcome.

## Work package B — CRL signer and publication control
Question: Which preserved public key verifies each exact signed object, and was it an authorized CRL-signing key?
Retrieve preserved CRL #11 and candidate certificate EMSIGN ROOT TLS CA - G1 OCSP 2026 - 4, plus the actual issuer certificate, from source-linked public archives. Additional CRLs require a complete artifact list from the observer; none is invented here.
For each object record origin, retrieval time, raw-byte SHA256, serial/CRL number, issuer, thisUpdate/nextUpdate, key identifiers, certificate key usage and exact DER boundaries. Preserve predecessor/successor CRLs separately.
Specialist to pin parser/library versions and review extraction offsets against each specimen. Do not blindly reuse fixed byte offsets from comment 34. Verify exact signed bytes with both candidate and intended issuer keys; preserve stdout, stderr and exit status. Include known-good CRL and tampered-copy controls. Do not recover or use private keys.
Cryptographic signature verification and authorized issuer/path validation are separate outputs. A candidate-key match alone does not establish signing logs, root cause, another weak key, client acceptance or the affected population.
Defeating observation: the preserved specimen fails verification with the claimed candidate key under independently checked extraction; report specimen mismatch as a rival explanation.
Then request signing-key mapping, post-signing verification records, publish authorization and incident disclosure history. Those records have not been retrieved. Do not infer a complete failure scope from one object.

## Work package C — migration reconciliation
Question: For a defined affected population and cutoff, what was issued, installed and still served?
Request an authoritative affected-CA list, typed denominator, completed/outstanding counts by issuer and subscriber, replacement chain, ACME action and deployment evidence. Precertificates, final certificates, subscribers and endpoints are different counting units.
Record cutoff, expiry/revocation inclusion rules, deduplication, overlap and source coverage. Reconcile replacements issued separately from replacements installed. Public CT alone does not prove deployment.
This package is record review only. Obtain authorized subscriber-side deployment records rather than probing endpoints. A ledger mismatch challenges completion for its defined scope; missing records leave the claim INDETERMINATE.
No independently reconciled migration result exists in this addendum.

## Custody, authority and stop conditions
Preparation/disposition owner: Michael J. Cates, human BoundaryTitan owner, as identified in the existing handoff. Operational test operator, independent evidence custodian and environment/stop operator remain UNASSIGNED. No execution approval is inherited from approval to prepare this addendum.
Before admission, the human owner must designate those people, approve exact specimens/environment/actions and freeze expected outcomes. Capture immutable input/output digests with an independently controlled copy. Shared GitHub administration alone does not demonstrate independent custody.
The technical stop must be outside the tested client/process and controlled by the designated human: terminate the attributable process tree and disable test connectivity before further action. Demonstrate that stop in the disposable environment before the experiment; effectiveness is presently NOT TESTED.
Abort on unexpected network contact, credentials, private-key material, certificate signing, mutation outside disposable fixtures, scope/configuration drift, missing custody, uncontrolled child execution, or failed stop. Preserve partial evidence; no automatic retry.
Execution, publication of conclusions, merge/admission, deployment and risk acceptance require their own authority. This commit only prepares a reviewable draft.

## Omissions, rivals and reopening
Exact specimens, installer hashes, independent custody, complete CRL population, CA signing records and migration deployment records remain missing. Release publication does not establish installation or measured rejection. A signature match does not establish authorized signing. A replacement certificate does not establish deployed recovery.
Reopen for new preserved artifacts, primary corrections, independently measured contradiction or an explicit human execution decision. The original eight profiles and these three work packages remain NOT TESTED.
CAN ⊬ MAY.
