# BT-OW-20261027-LITELLM-ENTERPRISE-EXFIL-034-v0.1 | Enterprise AI gateway rejection-path exfiltration

**HTK:** A rejected request can still produce a consequential side effect. If the rejection log accepts caller-controlled destinations or credentials, a failed request can leak the very secrets needed to take control of the gateway.

**Status:** NONCANONICAL SPECIALIST INTAKE; MAINTAINER-DOCUMENTED VULNERABILITY; LIVE EXPLOIT/PRODUCTION ENFORCEMENT NOT TESTED.  
**Lane:** OPEN-WORLD SIGNALS / AI gateway security and credential custody.  
**Source task definition ID:** `6ae2b9d15f8481919d0cdff95cf9f06a`; **unique execution ID:** null (not supplied).  
**Event clock:** vulnerable code introduced at unknown date; security repair merged and four stable releases issued 2026-10-27.  
**Disclosure clock:** maintainer GHSA published 2026-10-27; PR #48599 merged 2026-10-27.  
**Observation clock:** 2026-11-02 America/Chicago; exact per-root retrieval times not instrumented.  
**Source-root/claim/arrow identity:** `GHSA-w4c7-34wj-hqm8 | Enterprise-licensed proxy rejected-request logging can leak local secrets via caller-controlled callback/GCS routing | denial -> no side effect`.

## LOOK AT THIS / primary source roots and retrieval
1. Maintainer security advisory, 2026-10-27: https://github.com/BerriAI/litellm/security/advisories/GHSA-w4c7-34wj-hqm8 . **RETRIEVED**. Vendor reports unauthenticated requests to Enterprise-licensed LiteLLM LLM routes could cause local-file read and attacker-chosen exfiltration; examples include environment-held master key and provider credentials. Open-source deployments **without Enterprise license** are expressly excluded.
2. Maintainer corrective PR #48599, merged 2026-10-27: https://github.com/BerriAI/litellm/pull/48599 . **RETRIEVED**. PR documents that rejected requests previously built failure logs from raw request bodies, permitting caller-specified logging destinations and GCS credentials; fix uses an allowlist and configured GCS identity. Its PR narrative reports 1663 tests passing and 2 infrastructure-related failures in one test set, plus no live before/after proof. This is maintainer-reported test evidence, not independently rerun here.
3. Official release v1.106.5, issued 2026-10-27 19:58 as shown on GitHub: https://github.com/BerriAI/litellm/releases/tag/v1.106.5 . **RETRIEVED**. Official release lists backport #48605 and hardened failure logs/GCS configuration. Advisory lists fixed versions 1.103.10, 1.104.8, 1.105.6 and 1.106.5; confirm the deployed **lineage** and actual binary rather than assuming any arbitrary higher semver is safe.
4. Related but distinct earlier vulnerability: https://github.com/BerriAI/litellm/security/advisories/GHSA-7hp6-4w63-5g45 (published 2026-09-30). **RETRIEVED**. Internal-user privilege escalation via reuse of salt key, not the unauthenticated failure-log exfiltration mechanism. Do not combine.
5. BoundaryTitan prior challenge: https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM-01 bypass, AM-02 confused deputy, token/credential authority); https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml . **RETRIEVED**. These are specialist routing references, not independent evidence of this vulnerability.

## Precise claim, evidence state and scope
**SUPPORTED UNDER STATED CONDITIONS:** Vendor reports that an Enterprise-licensed LiteLLM proxy on affected versions can process an unauthenticated rejected request in a manner that reads a local file and sends its contents to an attacker-selected endpoint. Vendor also reports that some configurations allow subsequent host-level command execution. The reported flaw involves the rejection/logging path, not a model deciding to call a tool.

**Observed in primary records:** security advisory, patch PR narrative, merged backports and release tags. Two credited discoverers are described by vendor, but their independent test data was not retrieved or reproduced. No affected customer, exploitation campaign, compromise, live endpoint, installed version, or effective remediation was verified.

**Important negative:** Open-source installations without an Enterprise license do not load the affected codepath, per vendor. A proxy isolated from untrusted requests or with effective egress allowlisting may block the stated attack. Those are scope conditions, not blanket assurance.

**Version caution:** The vendor's advisory lists four supported stable-line fixes. A release's generic 'No action needed to upgrade' text is not a security certification and does not override the advisory's explicit upgrade recommendation.

## FIRST UNSUPPORTED ARROW / consequence-first graph
`Unauthenticated request rejected -> no side effects -> no file read -> no outbound secret disclosure -> no successor administrative authority`.

The first unsupported arrow is **rejection -> harmless termination**: failure handling can still invoke logging integrations with caller-controlled fields.

**Backward trace:** possible stolen provider credential or master key -> attacker-controlled egress -> callback/logging side effect -> rejected LLM request body -> unauthenticated caller -> proxy configured with Enterprise license and relevant integrations -> deployment owner's configuration/authority.

**Forward trace:** application owner authorizes gateway deployment -> unauthenticated request reaches gateway -> rejection occurs -> failure logging may invoke integrations -> local secret may leave the host -> administrative/provider credentials may survive until revoked -> possible downstream account, billing, data or host consequences. No actual human victim or downstream execution observed.

## Contradictions, regression warning, alternatives
- The corrective PR explicitly flags a **possible regression**: some team/key-specific failure callbacks may miss rate-limit rejections on rerank, image, moderation, audio, file upload, realtime and pass-through routes when a logger is not initialized. This is a maintainer-documented risk; no live verification here. A security fix could improve secret containment while reducing rejection observability for some integrations.
- Vendor PR's test narrative: 1663 passed, 2 failed for infrastructure setup also reportedly failing on baseline; a separate comparison reports 17 additional failures plus one collection error on prior source. Treat as maintainer observations, not independent patch validation.
- Rival explanations: a gateway may be OSS-only; an ingress may authenticate or strip malicious fields; network egress may prevent exfiltration; secrets may be stored outside process environment; deployment may already use patched build. Each must be evidenced for a specific deployment.
- **Omissions:** no installed-version inventory, Enterprise license status, outbound network receipts, compromised-secret evidence, token rotation receipts, callback regression measurement, or independent before/after replay.
- **Reopening:** independently reproduced negative control; actual affected production deployment; post-patch regression; newly published corrected scope; proof of credential revocation and downstream denial.

## Consequence receipt and external stop
- **Affected surface:** Enterprise-licensed LiteLLM gateway's rejected-request failure logging and configured callback/GCS integration.
- **People exposed:** gateway operators, application users and customers of downstream AI services; potential secret disclosure, account abuse, resource consumption, service interruption or unauthorized data access. No actual individual harm established.
- **Claimed authority:** application administrator configures gateway, provider accounts and integrations; an unauthenticated request has no legitimate authority to choose secret file reads or exfiltration destinations.
- **Consequence owner:** gateway deployer for integration/credential configuration; upstream provider and resource administrators for credential and resource-side denial; vendor for upstream software fix.
- **Who can deny/revoke:** independently administered ingress filtering, egress allowlist, secrets management, API-key and master-key rotation, provider-side token/key revocation and resource-level policy. Which is effective in any deployed instance remains **NOT TESTED**.
- **Reversibility:** stopping future egress is potentially reversible; once secret material leaves custody, disclosure itself cannot be undone. Rotating keys does not retroactively erase copies.
- **Residual risk:** patch does not prove previously disclosed credentials invalidated; egress deny does not itself establish that every downstream resource denies copied keys.

## Bounded specialist falsification specification (NOT EXECUTED)
**Specialty:** application security, API gateway authN/authZ, secret custody, observability and egress control. **Selected potential security reviewer:** Trail of Bits; **sent/acknowledged:** NOT ESTABLISHED. Do not contact or tag.

**Hypothesis:** On the fixed release and declared Enterprise configuration, no rejected unauthenticated request can influence callback destination, GCS service-account path, or other outbound exfiltration target; existing configured failure callbacks still behave as documented.

**Test environment (proposed only):** owned offline/isolated lab, pinned vulnerable and patched release builds, fake master key and provider tokens, mock logging endpoint, mock GCS provider, deny-by-default egress capture, separate service-level key revocation simulator. No live credentials or third-party probing.

**Observable:** ingress request/auth outcome; logger creation time; exact outbound destination and sanitized payload; file-open attempts; callback invocation; key attribution; ability to use synthetic credential after simulated revocation.

**Positive controls:** authorized failure logs reach configured owner sink; authenticated route correctly attributes team and key; explicitly permitted provider egress succeeds.

**Negative controls:** unauthenticated request with untrusted callback/GCS fields; rate-limit rejection across rerank/image/moderation/audio/files/realtime/pass-through; request with malicious metadata and nested callbacks; external destination blocked by egress.

**Defeating outcomes:** any fake secret leaves to untrusted sink after patch; any request-controlled file path read; any previously revoked fake key still authorizes consequential access; or advertised team/key failure callback silently disappears on an in-scope route contrary to declared guarantees.

**Test status:** NOT EXECUTED. No synthetic experiment, field test, exploit or CI run performed for this record.

**One bounded specialist question:** Does the patched rejection path prevent all caller-controlled file/egress effects while preserving the intended observability and credential-revocation boundary across the declared route matrix?

## Deduplication, custody and authority
Prior BoundaryTitan findings 028-033 remain outside PR #136 and are **not** admitted by this note. This candidate is distinct from the MCP OAuth issuer-binding finding (032), Strands consent and masking (029-030), and the LiteLLM salt-key privilege escalation advisory. No change to the frozen kernel or existing specialist package.

**Existing challenge link:** BT-HC-004 and Authorization Machinery Adversarial Battery. A log side-effect bypass is a concrete possible path, but one vendor advisory does not establish complete cross-domain mechanism equivalence or universal gate failure.

**custodyAuthorized:** true  
**mergeAuthorized:** false  
**executionAuthorized:** false  
**publicationOutsideRepoAuthorized:** false  
**specialistReview:** PENDING  
**humanDisposition:** RESERVED  
**independentValidation:** NOT TESTED  
**projectRouting:** NOT ESTABLISHED

Freeze the evidence, never freeze the search. CAN ⊬ MAY. ⚒️
