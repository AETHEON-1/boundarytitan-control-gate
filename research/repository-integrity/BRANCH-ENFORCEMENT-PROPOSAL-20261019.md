# Branch-enforcement proposal — review only (2026-10-19)
State: PROPOSED / NOT APPLIED / NOT A VERIFIED BRAKE.
Owner and consequence owner: Michael J. Cates / human BoundaryTitan repository owner.
Dependency: manifest repair PR #98; this proposal is stacked on its review branch. Neither merge is implied.

## Evidence and scope
Inspected main 035f631d579446ad57f9eea9a29c05aa3204f963 reports protected=false and required-status enforcement off. Run 39266576760 failed after the push became current. This is detection, not denial at the branch transition.
Source: https://api.github.com/repos/AETHEON-1/boundarytitan-control-gate/branches/main
Provider documentation: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
GitHub documents protected branches, required checks, strict up-to-date checks, administrator bypass controls and expected check producers. It warns against duplicate job names. Provider documentation is not evidence that our configuration enforces any of those controls.

## Proposed owner decisions before implementation
1. Target only main initially. Require a pull request, current-base checks and no direct update path for ordinary writers. Disable force-push/deletion.
2. Select a unique required result covering typecheck, current tests AND inventory verification. Current job name verify must be assessed for collisions before naming a required context. Bind the expected producer where supported.
3. Include administrators in ordinary restrictions. Enumerate app/token/bypass actors from effective settings; do not assume a missing UI checkbox closes them all.
4. Name an eligible human reviewer before requiring an approval threshold. The author cannot provide independent self-approval. If no distinct reviewer exists, record that limitation rather than inventing independence or enabling an unusable approval rule.
5. Owner retains emergency configuration/recovery authority. A rule the same owner can rewrite is not an independently administered brake. Document each exceptional transition and residual effect; do not create routine machine bypass credentials.
6. No automatic merge. A check's success does not authorize publication, deployment, archive admission or downstream actions.

## Bounded denial test specification — not executed
Use a disposable branch and inert marker; no production resource or destructive history operation.
Freeze actor classes (ordinary writer, intended app, administrator), initial head, protected paths and exact expected check producer/context. Record effective rule before testing.
- Attempt direct update without a PR: expect refusal and unchanged target head.
- Attempt merge with missing, pending and deliberately failing inventory result: expect refusal; preserve API response and target head.
- Alter PR head or base after a successful check: verify stale checks/approvals cannot silently authorize new contents.
- Test a same-name result from an unintended producer and the documented skipped/neutral-success edge; the ordinary required-check predicate may accept more than genuine verifier execution. Do not claim closure until this distinction is resolved.
- Attempt each declared bypass class on the disposable branch; record any accepted update as a boundary failure.
- Complete a valid PR to test that a legitimate path remains usable.
Observe target ref through a separate read-only surface; retain rejected and accepted attempts, effective policy, job conclusion, timestamps, actor identity and exact commit lineage. Shared GitHub custody remains a limitation.
Falsifier: a forbidden target update succeeds, or the only evidence of denial is a status label while the ref changes.
Unknown actor or unenumerated path -> NOT ESTABLISHED, not passed.

## Outage and recovery
Absent/delayed checks must not be replaced by a dispatch or approval that pretends they ran. Preserve denied work and inspect later receipts against exact heads. Owner decides whether to wait or explicitly accept a named exception under a separate decision.
Inventory failure predates the October 19 platform incident; causal attribution is not transferred between them.

## Implementation and stop boundary
Next permitted transition is human review of this proposal. Applying settings, issuing credentials, running protected-branch attack attempts or changing bypass permissions requires separate explicit authorization.
The owner may reject/close this proposal before any policy change. Recovery plan is owner-controlled configuration restoration with recorded prior settings; do not weaken controls merely to obtain a green test.
No independent stop authority, complete path mediation, reliable scheduling or deployment containment is established.
CAN ⊬ MAY.
