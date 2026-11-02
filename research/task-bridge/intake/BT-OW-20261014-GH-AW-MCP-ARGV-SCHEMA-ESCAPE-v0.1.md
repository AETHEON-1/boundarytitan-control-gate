# BT-OW-20261014-GH-AW-MCP-ARGV-SCHEMA-ESCAPE-v0.1 | MCP tool schema versus child-command authority

**HTK:** A constrained tool schema is not a constraint if its untrusted positional inputs can become command flags after crossing into another parser.

**Status:** NONCANONICAL SPECIALIST INTAKE; SUPPORTED UNDER STATED CONDITIONS for published GHSL advisory and maintainer correction; independent end-to-end enforcement NOT TESTED. Historical October disclosure newly retrieved November 2, NOT a new November incident.
**Lane:** OPEN-WORLD SIGNALS / agentic tooling, MCP, repository authority, CI security.
**Source task definition:** 6ae2b9d15f8481919d0cdff95cf9f06a. **Unique scheduler execution ID:** null (not exposed).
**Clocks:** GHSL tested vulnerable commit `846c520` (first vulnerable release unknown); corrective PRs merged 2026-10-13; advisories and patched v0.91.12 published 2026-10-14; observation/retrieval 2026-11-02 (per-page retrieval clock not instrumented).
**custodyAuthorized:** true. **mergeAuthorized:** false. **executionAuthorized:** false. **publicationOutsideRepoAuthorized:** false. **specialistReview:** PENDING. **humanDisposition:** RESERVED.

## LOOK AT THIS | Primary source roots and retrieval
1. GHSL/maintainer advisory GHSL-2026-180, published Oct 14, retrieved: https://github.com/github/gh-aw/security/advisories/GHSA-f7r8-5pqp-q5p4 . Reports client-supplied positional arguments parsed as hidden CLI flags; affected versions <v0.91.12.
2. Related GHSL-2026-188 (overlapping flag-injection class) and GHSL-2026-189 (distinct destination traversal), published Oct 14, retrieved: https://github.com/github/gh-aw/security/advisories/GHSA-62c8-mmw9-rq5w . Shared research provenance is NOT independent reproduction.
3. Maintainer corrective PR #68541, merged Oct 13, GitHub API retrieved: https://github.com/github/gh-aw/pull/68541 . Shared validator rejects leading-hyphen client positionals before subprocess invocation. Focused race-enabled tests reported passing; repository-wide validation remained blocked by pre-existing custom lint and formatter dependencies.
4. Maintainer corrective PR #68547, merged Oct 13, GitHub API retrieved: https://github.com/github/gh-aw/pull/68547 . Adds workflow-destination validation and MCP argument controls; focused tests reported passing, unrelated custom lint still blocked.
5. Release v0.91.12, Oct 14, retrieved: https://github.com/github/gh-aw/releases/tag/v0.91.12 . Explicitly links both fixes; release existence is not independent field verification.
6. Existing BoundaryTitan challenge anchors: https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/AUTHORIZATION-MACHINERY-ADVERSARIAL-BATTERY-v0.1.md and https://github.com/AETHEON-1/boundarytitan-control-gate/blob/main/challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml .

## Precise claim / observation versus inference
**Observed in advisory:** `gh aw mcp-server` handlers forwarded client-supplied workflow/run strings into argv without rejecting option-like positionals; Cobra/pflag parsed them as CLI flags. Reported reachable options include `--disable-security-scanner`, `--approve`, `--dir`, `--repo`, and `--create-pull-request`. GHSL reports bounded parser reproduction, not observed production exploitation.
**Observed in correction:** merged PRs and release v0.91.12 with maintainer-reported tests, NOT an independent replay.
**Preconditions:** lower-trust client already connected to local/loopback MCP interface or reachable exposed port, vulnerable version, and sufficient operator credentials for downstream effects. NOT unauthenticated internet-wide RCE. This is option injection, NOT shell injection.
**Distinct issue:** GHSL-2026-189 path traversal has a separate mechanism and cannot be treated as a second independent flag-injection confirmation.
**Unknown:** prevalence, victim, production exploitation, all patched handler/alias coverage, deployed credential scopes, resource-side denial, CI effects, and whether BoundaryTitan deploys gh-aw (NOT ESTABLISHED).
**Rival explanations:** legitimate operator-specified flags or other authorized GitHub automation may explain a workflow change; require exact origin, argv and credential receipts before attribution. A blocked call could be rejected by schema, child validator or GitHub permissions, which are distinct brakes.
**Source independence:** GHSL advisories, fix PRs and release are overlapping maintainer ecosystem, not three independent runtime validations.

## FIRST UNSUPPORTED ARROW / consequence tracing
**Restricted MCP JSON schema -> client positionals remain positionals in child CLI -> security scanner and manifest gates cannot be bypassed -> credential-backed GitHub operations remain authorized.**
First unsupported arrow in affected versions: *schema-constrained positional -> child-option isolation*.
**Backward:** potential unintended workflow/repo write <- CLI subprocess <- operator credentials <- hidden option parsed <- lower-trust MCP positional <- untrusted client content.
**Forward:** operator exposes limited tool parameters -> child CLI interprets hidden flags -> scanner/manifest control altered -> repository write if external permissions allow -> possible CI execution/downstream user effect. Later arrows are conditional, not an observed incident.

## Consequence receipt
**Lane:** OPEN-WORLD SIGNALS. **Owner:** gh-aw deployment operator and repo security administrator; maintainer owns patch. **Evidence:** GHSL advisories, merged PRs, release. **Affected surface:** MCP handler, CLI argv, workflows and credentials. **Affected humans:** maintainers/collaborators/downstream users, no observed victim. **Consequence:** potential unauthorized workflow alteration and credential-backed repo actions. **Reversibility:** future calls may be denied and commits sometimes reverted, but prior CI execution/secret disclosure may be irreversible. **External stop:** independently configured token scopes, rulesets, branch protections, credential revocation; effectiveness NOT TESTED. **Approval:** humanDisposition RESERVED. **Who can say no:** operator/repository admin with effective resource-side denial; human owner controls this custody.

## Bounded specialist falsification specification | NOT EXECUTED
**Specialties:** Go/Cobra parsing, MCP security, GitHub Actions credentials/branch enforcement. Trail of Bits is a selected potential security-review discipline, NOT a contacted/participating party.
**Existing challenge mapping:** authorization battery AM-01, AM-02, AM-04, AM-06 and BT-HC-004. BT-S2-NO-001 denial semantics and BT-PW-TSA-01 are separate test objects; manifest hash correctness is NOT effective merge denial.
**Fixture:** isolated owned in-memory harness with inert subprocess factory; compare pinned vulnerable `846c520` to v0.91.12; pass harmless option-shaped strings as positional values; capture exact argv before child invocation; NO GitHub credentials, real repository writes or workflow execution.
**Positive control:** valid workflow path/URL accepted with intended named options unchanged.
**Negative control:** option-shaped positional values, aliases, mixed order and path traversal rejected before child execution; no hidden flag, unintended file path or downstream call.
**Defeating result:** any patched handler forwards a client positional as executable flag or writes outside declared destination. If GitHub resource permissions deny a resulting write, record that separately, not as proof parser is safe.
**Required observation:** pinned source, handler/input, child invocation count, parsed flags, intended/actual path/repo and separate resource-side denial receipt.
**Not executed:** synthetic battery, live exploit, CI, field deployment, credential scope or independent containment test.

## Dedup, residual risk and reopening
Read-only main code search for `gh-aw` found no matches; current draft PR #66 intake path list contained no matching root/claim/arrow record on 2026-11-02. Bounded dedup only, no complete novelty claim. Prior Copilot/AWS MCP findings are thematic parallels, NOT equivalent mechanisms. PR #136 and held CI history unchanged.
**Residual risk:** patched handler correctness does not establish resource-side permissions, future tools or downstream CI denial.
**Reopen:** independent regression evidence, upstream correction, affected deployment, patched alias bypass or separate permission path.
**Bounded specialist question:** Can any lower-trust MCP positional become an undeclared CLI option after patch, and which independently enforceable resource-side gate still refuses its consequence if the parser fails?

CAN ⊬ MAY. Freeze the evidence. Never freeze the search.
