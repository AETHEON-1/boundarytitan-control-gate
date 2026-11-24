# BT-OW-20261029-SYMANTEC-AI-RELAY-CONFIG-OVERRIDE-v0.1 | Genuine CLI, displaced endpoint control

**HTK:** Authentic AI coding software does not guarantee its security settings, destination, or credential authority remain authentic after a separate setup script changes them.

**Lane:** OPEN-WORLD SIGNALS / agent runtime, endpoint configuration, credential provenance, execution boundary.
**State:** NONCANONICAL SPECIALIST INTAKE; SUPPORTED UNDER STATED CONDITIONS for researcher-observed configuration; actual malicious use and independent end-to-end reproduction NOT TESTED.
**Handoff:** PREPARED, not SENT, ACKNOWLEDGED or independently reviewed.
**Source task definition:** 6ae2b9d15f8481919d0cdff95cf9f06a. **Unique execution ID:** null (not exposed).
**Clocks:** Underlying installations observed since early 2026 (individual event dates not published); primary disclosure 2026-10-29; source observed 2026-11-02. No verified disclosure-to-incident equivalence.
**Authorization state:** custodyAuthorized:true; mergeAuthorized:false; executionAuthorized:false; publicationOutsideRepoAuthorized:false; specialistReview:PENDING; humanDisposition:RESERVED.

## LOOK AT THIS | primary evidence
- Symantec / Broadcom Threat Hunter Team, 2026-10-29: https://www.security.com/blog-post/openai-claude-unauthorized-relays
- The original investigator reports genuine Codex and Claude Code CLIs installed in approximately twelve organizations, then modified by a separate script to use a third-party relay, replace API credentials, disable telemetry/error reporting, set broad local execution permissions and persist user-level environment settings.
- Researcher says delivery appears user-initiated; no automated exploitation was observed. The source of the user's one-line installation instruction was not recovered.
- On one host, the script removed prior authentication state; frequency across deployments UNKNOWN. Infrastructure rotated among several domains, but rotation is not itself proof of data theft.
- The investigator explicitly says **not a vulnerability in the coding-agent binaries** and **no observed malicious exploitation of relay access**. The exposure is a configuration/control-plane risk; motive and actual exfiltration remain UNKNOWN.
- Do not copy executable setup commands, third-party endpoint addresses, sensitive tokens or private host data into this intake.

## Claim, missing bridge and rival explanations
**Claim under test:** a genuine CLI and a nominal sandbox provide effective host and information-flow containment after configuration and endpoint delegation.
**First unsupported arrow:** authentic vendor binary -> authentic endpoint and approved runtime policy -> independently enforced sandbox -> contained consequence.
**Observed break:** the genuine binary can run with a third-party endpoint and permissive local sandbox selected through configuration. Effective execution is downstream of the configuration, not of the binary's provenance alone.
**Rival explanations:** employees knowingly selected an unapproved regional reseller to obtain service; this does not by itself prove malicious intent. A legitimate organization could explicitly authorize an internal proxy with compensating controls, unlike the observed unapproved relay. The source did not independently establish downstream exploitation, data loss, or provider-side credential compromise.
**Assumptions to test:** endpoint configuration is writable by the installer; the host user can launch the CLI with the altered policy; external egress is not independently blocked; resource-side authorization may differ across hosts.

## Consequence and authority trace
Backward: potential sensitive-data exposure or unintended command -> CLI output/tool execution -> locally permissive sandbox and external endpoint -> persistent user-scope environment and config edits -> user-run setup script -> relay/reseller claim of service -> organizational approval/permission NOT ESTABLISHED.
Forward: changed endpoint and environment may persist across restarts, be inherited by unrelated processes, and allow subsequent tool use beyond the original installation. Persistence and actual harm must be evidenced separately.
**Affected:** workers, operators, enterprise source repositories and potentially customers; no victim identification or attributable misuse asserted.
**Consequence owner:** each organization's accountable system owner; vendors own their respective binaries, not an unapproved relay's installation.
**Authority source:** documented organizational endpoint/credential policy and the local account's granted privileges; user initiation does not establish organizational approval.
**Who may deny/revoke:** authorized endpoint administrators, network/security operators, credential issuers and system owners; independent egress controls and revocation are proposed external brakes, NOT TESTED in affected deployments.
**Appeal/recovery:** legitimate user/owner may request sanctioned access; re-establish approved endpoint, rotate affected credentials if warranted, review logs, verify restored policy and downstream artifacts. No direct victim remedy was observed.
**Reversibility:** local settings generally reversible; information disclosure and executed commands may be irreversible.

## Bounded specialist falsification specification | NOT EXECUTED
**Discipline:** endpoint security, identity/credential lifecycle, supply-chain and AI agent execution controls. Trail of Bits is an appropriate security/enforcement specification reviewer category; no contact, receipt or endorsement is claimed.
**Existing packages:** https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM-01/AM-02/AM-05); https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml . This is not BT-S2-NO-001 and does not modify it.
**Scope:** review source-described configuration evidence, documented endpoint policy and (only under separate future authorization) an isolated mock endpoint with dummy credentials; no live relay, untrusted script execution or field probing.
**Observables:** installer provenance; effective config/precedence; environment inheritance; approved versus observed endpoint; sandbox enforcement at OS/tool layer; egress deny/allow logs; credential revocation and recovery receipts.
**Positive supporting outcome:** independently controlled endpoint and egress policy refuses unauthorized destination and tool transitions even when a local CLI config requests full access; denial receipt and no downstream execution observed within declared scope.
**Negative outcome:** local configuration silently supersedes claimed organizational gate or routes data to a non-approved endpoint without independent denial.
**Defeating/invalid outcome:** no trusted baseline, no host policy records, synthetic-only logs or mismatched versions; then TEST INVALID/INDETERMINATE, not a clean pass.
**Residual risk:** trusted user misuse, unmanaged endpoints, inherited environment, queued actions and irreversible disclosure; absence of telemetry may defeat complete observation.
**Specialist question:** Which independent, inspectable control prevents a genuine but reconfigured agent from transferring data or executing commands outside the organization's authorized endpoint and sandbox boundary?
**Reopen on:** independently reproduced containment, documented exploitation, contradicted telemetry, effective policy enforcement evidence or a new configuration bypass.
**No proof of completeness, certification, specialist acceptance, deployment or authority. CAN ⊬ MAY.**
