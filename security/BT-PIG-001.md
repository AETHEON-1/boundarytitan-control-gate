# BT-PIG-001 | Preemptive Prompt-Injection and Consequence Gate
Status: PREPARATION-ONLY / YELLOW. No production enforcement, certification, or deployment.

## Purpose
Untrusted repository text, PR descriptions, issues, web pages, dependency documentation, and tool responses are data, never authority. This package adds a read-only CI test and advisory classifier. It deliberately cannot authorize an action.

## Control boundary
1. Classify provenance before interpretation. Unrecognized sources fail closed.
2. Keep untrusted input out of shell interpolation, privileged prompts, and executable workflow expressions.
3. Grant CI jobs only read permissions; use no secrets for untrusted pull requests.
4. Require repository rulesets and protected environments administered by a human owner for consequential writes. These external settings are NOT VERIFIED and are not established by this PR.
5. Maintain independent receipts for authorization, execution, denial, and revocation. NOT IMPLEMENTED.
6. Pin reviewed third-party actions by immutable SHA; verify upstream provenance before changing pins.
7. Preserve malicious samples and false negatives as evidence, not executable instructions.

## Threats and limitations
The regex-based classifier identifies a few illustrative instruction patterns only. It is bypassable by paraphrase, encoding, indirection, multilingual content, and tool-output laundering. A clean classifier result is NOT a safety claim. A CI check is not a runtime authorization gate. A repository writer may alter this policy unless external rules protect it.

## Human-administered configuration required
- Protect main and require the bounded verification and prompt-injection-gate checks.
- Require code-owner review for changes to workflows, security/, scripts/, and dependency manifests; verify CODEOWNERS rules actually enforce review.
- Block direct pushes and force pushes; prevent bypass by automation identities.
- Restrict GitHub Actions permissions, approved actions, secrets, and environments.
- Separate deployment credentials from pull-request execution and require human environment approval.
- Verify that required checks are bound to expected GitHub Apps and cannot be spoofed by another status writer.

## Adversarial falsifiers
F1: A malicious PR comment leads to a protected write.
F2: A poisoned tool response triggers credential disclosure.
F3: A fork PR obtains secrets or a write token.
F4: A workflow or policy change merges without required independent review.
F5: A denied action commits through retry, queue, delegation, or restart.
F6: An agent alters the evidence or approval record used to justify its own action.

Test only with harmless synthetic payloads and separately authorized scope. Preserve exact results, including failures and NOT TESTED states.

## Article and research provenance
Public article: https://boundarytitan.wordpress.com/2026/10/28/the-hacker-doesnt-need-to-hide-mapping-consequences-human-authority/
Related: challenges/BT-HC-004-CONSEQUENCE-PATH-DOMINANCE.yaml
Governing invariant: CAN ⊬ MAY. The machine cannot be the final judge of the machine.
