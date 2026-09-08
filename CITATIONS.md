# Citations and Attribution

This file records public sources consulted for the Action Authority Evidence Packet. BoundaryTitan does not claim authorship of the cited standards, projects, APIs, or implementation patterns.

## Delego

Delego-Dev, “delego: Intent-bound action authorization for AI agents,” GitHub repository, https://github.com/Delego-Dev/delego

Pattern used: bind approval to the original instruction and exact action; prevent approval redirection and replay; preserve an audit receipt.

BoundaryTitan does not claim Delego validates BoundaryTitan or that a signed receipt proves the underlying real-world state.

## SPIFFE

SPIFFE, “SPIFFE Concepts,” https://spiffe.io/docs/latest/spiffe/concepts/

SPIFFE, “Working with SVIDs,” https://spiffe.io/docs/latest/deploying/svids/

Pattern used: a workload presents a short-lived SVID as an identity document.

BoundaryTitan preserves the distinction: identity evidence does not by itself establish permission, authority, or legitimate consequence ownership.

## Cedar

Cedar Policy Language, “What is Cedar?” https://docs.cedarpolicy.com/

Cedar Policy Language, “Terms and concepts,” https://docs.cedarpolicy.com/overview/terminology.html

Pattern used: separate policy authoring and authorization decision evaluation from application enforcement.

BoundaryTitan does not treat a Cedar Allow decision, or any other policy result, as self-proving authority.

## The Update Framework

The Update Framework, “TUF Specification,” https://github.com/theupdateframework/specification/blob/master/tuf-spec.md

Patterns used: signed metadata, threshold roles, rollback detection, freeze detection, consistent snapshots, and root-key migration.

BoundaryTitan applies these only as provenance and trust-root design references. TUF's software-update threat model is not identical to an agent-consequence system.

## Temporal

Temporal Technologies, “Human-in-the-loop AI agent,” https://docs.temporal.io/ai/cookbook/human-in-the-loop-python

Patterns used: durable waits, external approval signals, timeouts, and persisted workflow decisions.

BoundaryTitan treats Temporal as an execution/durability substrate, not as the final authority over approval legitimacy or consequence disposition.

## BoundaryTitan synthesis

The following are BoundaryTitan's own synthesis and are not attributed to the projects above:

- CAN does not entail MAY.
- Evidence does not automatically become authority.
- Execution does not automatically prove state change.
- A signed receipt does not automatically prove truth.
- Machine output cannot authorize, certify, or close itself.
- The consequence owner and external stop authority remain outside the machine.

## License and reuse note

No source code is copied by this declaration-only artifact. Future implementation reuse must inspect each source repository's current license, notices, dependencies, and security terms before incorporation.

## Authorization-machinery adversarial battery sources

Model Context Protocol, “Authorization — Security Best Practices,” specification revision 2026-07-28:
https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization/security_best_practices

Relevant patterns: token audience binding, confused-deputy resistance, authorization-code protection, redirect security, and resource-server validation.

National Security Agency, *Cybersecurity Information: Model Context Protocol Security*, May/June 2026:
https://media.defense.gov/2026/Jun/02/2003943289/-1/-1/0/CSI_MCP_SECURITY.PDF

Relevant patterns: tool/semantic poisoning, downstream automation manipulation, multi-agent propagation, and MCP implementation attack surface.

OWASP AI Security Verification Standard research, “Prompt Injection Defense,” MCP-specific attack vectors:
https://github.com/OWASP/AISVS/blob/main/1.0/research/chapters/C02-User-Input-Validation/C02-01-Prompt-Injection-Defense.md

Relevant patterns: tool poisoning, tool shadowing, rug-pull redefinitions, command/configuration injection, authentication gaps, and execution-layer controls.

Huang, C.; Huang, X.; Tran, N. P.; Milani Fard, A., *Model Context Protocol Threat Modeling and Analyzing Vulnerabilities to Prompt Injection with Tool Poisoning*, arXiv:2603.22489:
https://arxiv.org/abs/2603.22489

Relevant patterns: STRIDE/DREAD threat modeling across MCP components and empirical tool-poisoning analysis.

These sources inform defensive challenge construction. They do not validate BoundaryTitan, establish complete coverage, or grant authority to any machine-generated disposition.
