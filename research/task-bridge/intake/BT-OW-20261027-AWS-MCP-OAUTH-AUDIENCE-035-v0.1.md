# BT-OW-20261027-AWS-MCP-OAUTH-AUDIENCE-035 | MCP token audience versus host authority

Status: NONCANONICAL SPECIALIST INTAKE · SUPPORTED UNDER STATED CONDITIONS (vendor disclosure) · INDEPENDENT RUNTIME TEST NOT EXECUTED
Lane: OPEN-WORLD SIGNALS
Source task definition: 6ae2b9d15f8481919d0cdff95cf9f06a
Unique scheduler execution ID: null (not exposed)
Observation date: 2026-11-02, during scheduled-cycle investigation; per-page retrieval timestamp not instrumented.
Event date: exact first vulnerable release / first exploitation unknown; affected versions 1.3.0 to <1.6.0.
Disclosure date: 2026-10-27, AWS bulletin 2026-152-AWS (11:00 AM PDT) and maintainer GHSA.
CustodyAuthorized: true
MergeAuthorized: false
ExecutionAuthorized: false
PublicationOutsideRepoAuthorized: false
SpecialistReview: PENDING
HumanDisposition: RESERVED

## HTK / look at this
An authentication token signed by a trusted provider may be intended for a different application. AWS reported that the AWS API MCP Server accepted such tokens when configured with streamable-http and OAuth authentication. It validated signature, issuer and expiry, but not the application audience. A caller with another same-tenant app token could access the MCP server and request AWS CLI operations under the host's configured AWS credentials. This is a local-access/preconditioned vulnerability, not an assertion of internet-wide unauthenticated exploitation.

## Root evidence, retrieval and source independence
1. AWS primary security bulletin, 2026-10-27: https://aws.amazon.com/security/security-bulletins/2026-152-aws/ (retrieved successfully 2026-11-02).
2. Maintainer GitHub security advisory, published 2026-10-27: https://github.com/awslabs/mcp/security/advisories/GHSA-4prq-p2x5-w9fh (retrieved successfully 2026-11-02).
3. PyPI version root: https://pypi.org/project/awslabs.aws-api-mcp-server/1.6.0/ (referenced in advisory; direct release metadata NOT independently retrieved).
AWS bulletin and maintainer GHSA represent overlapping vendor authority, NOT independent exploit reproductions.

## Exact control and evidence state
- Observed in vendor records: CVE-2026-115413, GHSA-4prq-p2x5-w9fh; affected >=1.3.0 and <1.6.0 only with streamable-http OAuth; default stdio transport outside reported exposure; patch 1.6.0.
- Observed remediation: 1.6.0 requires AUTH_AUDIENCE, or AUTH_CLIENT_ID when provider tokens lack an audience claim (e.g. Amazon Cognito). Vendor advises fork/derivative audit and stdio workaround.
- Inferred: if a cross-application token reaches an affected MCP server, resulting AWS calls inherit the server host's configured IAM credential permissions, not the presenting application's intended permission. Actual impact depends on IAM scope and reachable tools.
- Not verified: actual exploitation, victim identities, installed population, fix correctness under all identity providers, deployed configuration, resource-side denial, patch regression, and credential rotation needs.
- Counterevidence / scope limit: AWS and maintainer explicitly restrict affected transport/auth combination; local caller must possess a token from the nominated identity provider; AWS operations remain bounded by host credential permissions.
- Rival explanation for an observed AWS API action: legitimate authorized app token or operator-invoked tool; correlate expected client ID, issuer, audit logs and host IAM principal before attribution.

## First unsupported arrow / consequence receipt
Signature valid + issuer valid + unexpired token -> token authorized for this MCP resource -> caller authorized to use host AWS credentials -> downstream AWS state change authorized.
The first unsupported arrow is token authenticity -> resource-specific authorization.
Backward: possible unintended AWS operation <- MCP tool execution <- bearer token accepted <- missing audience/client-ID check <- shared-tenant identity provider <- app-level grant unrelated to MCP.
Forward: host credentials configured -> MCP server reachable -> wrong-audience token accepted -> AWS CLI call -> potential cloud data read/write/delete or spend, depending on IAM and tool permissions -> possible durable effects after token rejection.
Affected humans: cloud-account operators, data subjects, users of affected services; no observed victim.
Consequence owner: MCP deployment operator and AWS resource owner. Authority source: intended OAuth client/audience binding and AWS IAM resource permissions, separately.
Who may deny/revoke/appeal: IdP admin can revoke issued tokens; MCP operator can disable HTTP OAuth endpoint or change transport; IAM admin can deny/revoke host credentials; human owner decides response. Formal user appeal is not established.
External stop: independently enforced IAM deny/credential revocation and network isolation, NOT proven by MCP-side token rejection alone.
Reversibility: token acceptance can be stopped prospectively; already executed AWS changes may not be reversible.
Residual risk: patched server still has host IAM authority; configuration and fork coverage are unknown.

## Bounded specialist falsification specification (NOT EXECUTED)
Specialty: OAuth/OIDC security, MCP runtime authorization, AWS IAM, independent cloud-security verification.
Existing challenges: challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml and AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM authorization/cross-identity boundaries). Distinct from held BT-S2-NO-001 and from prior finding 032's credential-to-wrong-issuer leak.
Set up owned isolated mock IdP and mock AWS executor, with dummy credentials and no real cloud writes. Pin vulnerable and patched versions and log accepted/denied tokens plus any downstream executor invocation.
Positive control: correct-issuer, correct-audience token with allowed client ID accepted for an authorized harmless mock operation.
Negative control: correct-issuer, wrong-audience / wrong-client token denied before mock executor; expired, wrong issuer and invalid signature also denied.
Defeating result: a mismatched-audience token triggers any mock AWS operation in a configuration claimed protected, or a fork retains vulnerable path.
Compare patched AUTH_AUDIENCE and Cognito-style AUTH_CLIENT_ID cases, transport stdio case, and least-privilege host IAM. Inspect per-call denial receipts; a denied HTTP response is not evidence that downstream queued operations were canceled.
No test execution, live probing, credential use, package installation, or operational authorization.

## Reopening / specialist question
Can an independent reviewer reproduce audience binding and demonstrate that no cross-client bearer token can invoke a consequence through any declared MCP entry path, including forks and legacy configuration, without confusing valid signature with resource authorization?
Reopen on patch diff/test evidence, independent negative test, production configuration receipt, confirmed incident, or vendor correction.
Dedup: no matching source-root/claim file in main code search or current draft intake directory on 2026-11-02; novelty beyond those checked surfaces INDETERMINATE. No modification of earlier frozen findings.
CAN ⊬ MAY.
