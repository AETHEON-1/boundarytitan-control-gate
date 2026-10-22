# eMudhra rejection matrix — specialist handoff
State: PRE-EXECUTION / YELLOW. No client-validation experiments executed.
Primary sources:
- https://bugzilla.mozilla.org/show_bug.cgi?id=2083449
- https://bugzilla.mozilla.org/show_bug.cgi?id=2084101
- https://blog.mozilla.org/security/2026/10/20/protecting-firefox-users-following-the-compromise-of-emudhra-intermediate-certificates/

## Source calibration
Mozilla reports October 17 receipt at 20:06 UTC and OneCRL distribution completion for standard Firefox configurations at 22:59 UTC. Its October 20 release and NSS update provide additional delivery paths. The root-removal task is RESOLVED FIXED.
Sectigo's participant statement in comment 13 says affected cross-sign revocation completed and CRL/OCSP responses were propagating.
The later OneCRL question has a Mozilla response in comment 25: the questioned issuer is absent from Mozilla's trusted roots, so those chains are not trusted there. Preserve the allegation AND answer. This review did not independently test that rejection or infer equivalent Apple/Microsoft coverage.
Do not describe root removal as a patch to elliptic-curve mathematics or infer fraudulent leaf issuance from key compromise. Subscriber migration is distinct from malicious issuance.

## Artifact and method
emudhra-matrix.json declares eight bounded profile families and required evidence. Every row is NOT TESTED. Specialists must expand each family into exact client/version/chain/cache cases before freezing expected outcomes.
Public certificates, signed revocation data and trust-store snapshots are inputs; do not recover/use compromised keys, mint fraudulent leaves, contact affected sites or probe external systems. If a suitable lawful fixture is unavailable, record NOT TESTED rather than fabricate one.
Offline fixture preparation and actual execution remain separate. Require a named test owner, independent evidence custodian, authorized disposable environment and stop path before execution. No credentials or live service connected by this proposal.
Pin DER fingerprints, subject/key identifiers, native and cross-signed alternatives, chosen chain and purpose. An intermediate with the same key but different issuer/serial is a separate certificate path.
Freeze evaluation time; isolate revocation, expiry, hostname and trust-anchor failure. Known-good unrelated chains must still succeed so a verifier rejecting everything cannot masquerade as a successful brake.
A TLS verdict does not establish code-signing behavior, timestamp validity or platform execution blocking.
Measure source publication, client receipt, cache refresh and actual rejection as separate clocks. Capture thisUpdate/nextUpdate, signed-list digests and connectivity.
Falsifier is row-specific: a client accepts the affected path under the exact configuration claimed to reject it. A finite all-reject matrix cannot establish universal authority extinction.

## Unresolved
Independent client measurements, legacy/custom trust paths, actual update adoption, Apple/Microsoft final coverage, final CA root cause, abuse review and subscriber recovery remain open.
External source statements are evidence; they do not sign the test result or own downstream acceptance.
