# Independent-in-method checker challenge and repair
Date: 2026-10-29 | PR #122 | State: AUTHOR-OPERATED ADVERSARIAL CHALLENGE, NOT INDEPENDENT HUMAN REVIEW

## Challenge method
A separate Python test module uses isolated temporary Git repositories and targeted corruptions. Ten cases probe absent/invalid manifest, missing metadata structure, unmanifested files, ghost files, path traversal, symlink substitution, missing required check entry, absent Git inventory, and authority-metadata tampering.

## Counterexample and repair
Original sentinel checked file bytes but not manifest claims of machine certification or deployment authority. An adversarial fixture set these fields to true while retaining valid file hashes. **Original code would not flag this semantic tampering.** The sentinel was corrected to emit `AUTHORITY_METADATA_INVALID` and the challenge was promoted from expected failure to a required test. The existing Node verifier also checks these fields; defense in depth is useful but not independent authority.

## Remaining challenge gaps
- Checker and workflow may be changed together by the same committer; no independently controlled enforcement demonstrated.
- GitHub required-check protection, missed-run detection, artifact delivery, and external evidence custody remain NOT TESTED.
- Fixtures do not prove the absence of unmodeled bypasses. The adversarial challenge is assistant-authored and does not satisfy external specialist review.
- CI results must be captured against the final manifest-reconciled head, not earlier revisions.

## Acceptance
Only the final branch's GitHub Actions receipts, verified manifest coverage, and independent human review can support promotion. No self-certification or merge.
