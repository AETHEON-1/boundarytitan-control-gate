# Specialist access | Final preparation and acceptance checklist

**State:** YELLOW, public inspection candidate. **Candidate commit tested:** `ba016641bd86d21c22692ed81c0c97ea869df864`
**PR:** https://github.com/AETHEON-1/boundarytitan-control-gate/pull/80
**CI evidence:** https://github.com/AETHEON-1/boundarytitan-control-gate/actions/runs/38760539296
**Scope:** read-only specialist landing page and reproducible software checks. No deployment or physical test authorization.

## Verified against the pinned candidate
- TypeScript PASS; 36 Jest suites / 112 tests PASS; three Python handoff tests PASS.
- Static specialist entry PASS: 15 local file links, six in-page anchors, five navigation sections, required test commands and basic accessibility markers.
- Repository integrity PASS: 276 tracked entries represented in current-tree ledger.
- Static test deliberately does **not** assert WCAG compliance or browser usability.
- Historic intermediate CI failures are preserved in workflow history; later successful results do not erase them.

## Human acceptance tasks (unexecuted)
1. Open `visual/specialists.html` in an actual browser served from the repository root or a read-only preview. Test desktop and narrow mobile viewport; inspect layout and navigation.
2. Complete keyboard-only navigation (Tab, Shift+Tab, Enter), visible focus, skip link, reading order and link labels. Use a screen reader. Record browser, device, assistive technology, version, and findings.
3. Run a recognized accessibility checker and manually review WCAG 2.2 AA criteria. Do not call the page compliant until findings are resolved and reviewed.
4. Recruit at least one unfamiliar specialist. Give them only the public entry link and the prompt below. Do not coach. Record time, misnavigation, failures and independent reproduction evidence.
5. Validate hosting strategy. A GitHub blob URL displays source, not necessarily the rendered page. GitHub Pages or another static host requires a separate human publishing decision and a correct base-path/link test.
6. Confirm security/privacy: no secrets, credentials, live authority, execution endpoints or telemetry added to the public workbench.
7. Human owner reviews PR diff and determines merge/publication separately. Do not merge, publish, or promote operational status automatically.

## Blind newcomer exercise
**Task given to participant:** “Starting only from the public specialist landing page, choose a claim in your discipline. Identify what the project claims, what evidence supports it, and what would falsify it. Reproduce the repository's baseline software verification on a pinned commit. Locate a submission route for a counterexample. Report any step you cannot complete without help.”

**Record:** participant role (not identifying details); start/end times; exact commit SHA; operating system; Node/npm/Python versions; test commands; terminal exit codes; claim ID; evidence URL; falsifier; submission route; blockers; observed versus expected outcome; whether help was needed.

**Success criterion:** no coaching, reproducible commands, traceable claim/evidence, usable challenge route, limitations understood. Failure is preserved as a finding, not silently corrected in the record.

## Disposition
- **SUPPORTED (bounded):** declared static CI checks on the pinned candidate.
- **NOT TESTED:** browser behavior, assistive technology, real newcomer journey, deployment, physical stop.
- **YELLOW:** human review, acceptance and publication remain external.

**Only GREEN proceeds. No owner, no brake. No ledger, no trust. CAN ⊬ MAY.**
