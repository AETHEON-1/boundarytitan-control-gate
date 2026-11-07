# BT-OW-20261101-BETA9-TENANT-WORKER-BOUNDARY-v0.1 | Tenant sandbox to privileged worker

**HTK:** A sandbox label does not mean the sandbox's file, mount and build paths are isolated from the machine hosting it. Three separately reported defects in one runtime crossed that boundary in different ways.

**State:** NONCANONICAL SPECIALIST INTAKE. SUPPORTED UNDER STATED CONDITIONS for researcher disclosures, merged fix and release. Independent runtime reproduction and deployed enforcement NOT TESTED.
**Lane:** OPEN-WORLD SIGNALS, AI agent execution infrastructure / multi-tenant container security.
**Source task definition:** 6ae2b9d15f8481919d0cdff95cf9f06a. **Unique execution ID:** null (not exposed). **Observation:** 2026-11-02 America/Chicago; precise per-root retrieval times not instrumented.
**Identity:** CVE-2026-120306 / -120307 / -120308 | Beta9 tenant workspace token -> privileged worker/other tenants through build isolation, file API or volume mount | sandbox boundary -> host containment.

## LOOK AT THIS / root evidence and clocks
- **Researcher/CNA primary, RETRIEVED:** JFrog CVE-2026-120306 (build isolation): https://research.jfrog.com/vulnerabilities/beta9-is-vulnerable-to-a-build-worker-sandbox-escape-via-chroot-only-buildah-isolation-cve-2026-120306/ . Disclosed 2026-11-01; worker <0.1.756.
- **Researcher/CNA primary, RETRIEVED:** JFrog CVE-2026-120307 (sandbox file API): https://research.jfrog.com/vulnerabilities/beta9-is-vulnerable-to-a-container-escape-via-unvalidated-sandbox-file-paths-cve-2026-120307/ . Disclosed 2026-11-01; worker <0.1.756.
- **Researcher/CNA primary, RETRIEVED:** JFrog CVE-2026-120308 (volume mount): https://research.jfrog.com/vulnerabilities/beta9-is-vulnerable-to-host-filesystem-exposure-via-volume-path-traversal-cve-2026-120308/ . Disclosed 2026-11-01; gateway <0.1.776 AND worker <0.1.756 are the affected deployment pair identified by researcher; mixed-version remediation needs BOTH components updated.
- **Maintainer primary, RETRIEVED:** https://github.com/beam-cloud/beta9/pull/1897 . Opened 2026-09-14, merged 2026-09-15. Four commits cover distinct paths; PR reports targeted regression, race and Linux worker tests passing. Maintainer-reported tests were NOT independently rerun here.
- **Maintainer releases, RETRIEVED:** https://github.com/beam-cloud/beta9/releases/tag/worker-0.1.756 and https://github.com/beam-cloud/beta9/releases/tag/gateway-0.1.776 . Both released 2026-09-15, prior to Nov 1 public CVE disclosure. Source commit a28bf12cf0007c792a25d8ed282b4e8bf6f30393.
- **Database secondary to CNA, RETRIEVED:** https://github.com/advisories/GHSA-6h4h-qffc-3gfp and https://github.com/advisories/GHSA-92w2-g272-fr77 . GitHub database labels unreviewed; not independent exploit confirmation.
- **Existing specialist anchors, RETRIEVED:** https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml and https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md (AM-01, AM-02, AM-15, AM-20). These are challenge objects, not validation.
- **Bounded published baseline, RETRIEVED:** https://boundarytitan.wordpress.com/2026/10/24/the-missing-consequence-when-every-record-agrees/ (published 2026-10-24; exact update date not verified). Distinguishes observed from missing consequences; not proof about Beta9.

## Three distinct mechanisms, not one attack
1. **CVE-2026-120306 / build:** tenant-controlled image RUN command used Buildah chroot-only isolation with worker PID/network/IPC/user namespaces and elevated capabilities. Researcher observed worker namespace/binary visibility in a controlled read-only probe; did NOT establish production compromise. Fix switches RUN/WORKDIR steps to OCI isolation with private namespaces and confines tenant ARG values to build container.
2. **CVE-2026-120307 / file API:** worker resolved tenant paths against worker host filesystem after mount-prefix checks; symlinks and path normalization could cross root. Researcher reports a read-only proof accessing the worker service-account token, whose shipped remote-node manifests granted cluster-admin. This is a controlled proof, not evidence of real victim or stolen production token. Fix uses scoped os.OpenRoot and read-only-mount/symlink protections.
3. **CVE-2026-120308 / volume mount:** tenant-supplied volume ID lacked ownership and path validation; a mount could expose worker root read-write by default. Researcher tested gateway 0.1.769 / worker 0.1.745 and observed host files in an isolated setup, **not** a live multi-tenant cluster. Fix adds gateway workspace-ownership checks, gateway+worker path validation and revalidation of previously saved stubs on launch. Both gateway and worker need upgrade.

## FIRST UNSUPPORTED ARROWS
- **Pre-fix CONTRADICTED under research conditions:** valid tenant workspace token -> isolated file/build/mount capability -> worker and other-tenant files inaccessible.
- **Post-fix INDETERMINATE in real deployments:** release tag exists -> every worker AND gateway upgraded -> saved stubs revalidated -> every tenant-to-host path denied -> pre-existing credentials invalidated and downstream consequence prevented.
- A patch PR's green tests are evidence about tested code, not independent proof of all deployment paths. The three CVEs share a repair PR but have different causes and test oracles.

## CONSEQUENCE-FIRST trace and human exposure
**Backward:** possible cross-tenant data theft or worker control -> host file access/mount or build namespace inheritance -> worker-root execution with elevated privileges -> tenant-supplied workspace token and API/build parameters -> deployment operator's chosen multi-tenant trust boundary.
**Forward:** operator grants tenant sandbox/build access -> tenant reaches privileged worker through one of three distinct paths on affected versions -> potential access to service-account credentials, other tenants' data and host files -> potential cluster privilege/availability and billing/data consequences. No actual incident, victim, exploit campaign, installed deployment, or cluster compromise independently established.
**Affected people:** tenants sharing infrastructure, operators, downstream customers. **Authority source:** operator's workspace admission and Kubernetes RBAC; possession of workspace token is not authority over worker or peer tenants. **Consequence owner:** platform operator for deployment/isolation and IAM; tenant for authorized use of workspace; provider for upstream fix. Legal allocation unknown.
**Who can deny/revoke:** platform owner may restrict tenant admission and disable vulnerable file/build/mount routes; cluster administrator may constrain service-account RBAC, worker privileges and egress, rotate/revoke credentials and quarantine workers independently of the sandbox. None of these external stops was measured in a live deployment.
**Reversibility:** patch/permission changes can prevent future access, but prior disclosure cannot be undone; stolen credentials require separate revocation and downstream denial. **Residual risk:** mixed gateway/worker versions, saved stubs, privileged worker service accounts, unknown previously exposed credentials and incomplete inventory.

## Contradictions, alternatives, omissions and reopening
- The fix was merged/released **2026-09-15**, whereas public CVE disclosures occurred **2026-11-01**; not evidence that all deployments upgraded before disclosure.
- Researcher-reported CVSS 9.9 is severity scoring, not proof of exploitation prevalence.
- An operator with patched versions, restricted Kubernetes service accounts and no untrusted tenant inputs may be outside the described consequence path; each requires deployment evidence.
- JFrog's three reports derive from one research team and one repair PR; citation count is not independent replication.
- No production asset/version inventory, tenant isolation topology, cluster role binding audit, independent before/after test, service-account rotation or cross-tenant victim evidence. Absence of those records does not establish absent controls.
- **Reopen on:** verified mixed-version deployment, independent patch bypass, affected-customer report, test logs demonstrating host-file denial, or evidence of effective credential revocation.

## Bounded specialist test specification | NOT EXECUTED
**Discipline:** container/Kubernetes security, runtime isolation, IAM, filesystem path resolution, race testing and platform SRE. Trail of Bits is a selected possible specification reviewer, NOT contacted or acknowledged.
**One question:** For a pinned Beta9 gateway/worker pair, can a tenant workspace token reach any worker or peer-tenant resource through image build, sandbox file API or volume mount, including saved-stub and restart paths, and can an external operator make denial stick?
**Environment proposed only:** isolated, owner-controlled offline testbed, synthetic tenant IDs, dummy files/tokens and mock Kubernetes RBAC; pinned affected/fixed gateway-worker matrix, never a live service.
**Observables:** source/target identity; API outcome; canonical opened path and mount root; build PID/network/IPC namespace identity; scoped file operations; gateway/worker version pair; legacy stub validation; operator-side deny and downstream dummy-token authorization.
**Positive controls:** authorized tenant file operations and owned-volume mounts succeed within the intended root; permitted build runs in the intended container.
**Negative controls:** unowned volume, malformed volume ID, path traversal, symlink/root escape, symlink-swap race, read-only mount write, tenant ARG altering build isolation, old persisted stub, mixed-version gateway/worker.
**Defeating outcomes:** fixed pair accesses host/peer file, worker namespace inherited by tenant build, legacy stub bypasses revalidation, operator revocation leaves token able to authorize outside declared window, or supposedly protected route remains unobserved.
**Test execution:** NOT EXECUTED. No exploit, synthetic experiment, installation, live probing, CI or field validation authorized.

## Full consequence receipt and custody
Lane: OPEN-WORLD SIGNALS. Owner: deployment platform owner and independent IAM administrator. Evidence: three JFrog disclosures + one maintainer fix PR + two release tags. Affected surface: sandbox file/build/volume APIs, worker host and cluster credentials. Consequence: possible cross-tenant/cluster unauthorized access. Reversibility: prospective containment possible, historic disclosure irreversible. Stop: independent platform/Kubernetes deny, credential revocation, scoped-root and isolation controls. Approval: research-only intake; no field test. Who can still say no: human platform operator, independent IAM administrator and BoundaryTitan human owner.
**Dedup:** no Beta9/CVE-2026-120307 match in accessible repo issue/PR/code search and intake listing as observed 2026-11-02; search coverage not a complete archive. Separate from prior LiteLLM 034 and MCP issuer 032; structural parallels only, no mechanism equivalence.
**custodyAuthorized:true; mergeAuthorized:false; executionAuthorized:false; publicationOutsideRepoAuthorized:false; specialistReview:PENDING; humanDisposition:RESERVED; projectRouting:NOT ESTABLISHED.**
Freeze evidence, not search. CAN ⊬ MAY. ⚒️
