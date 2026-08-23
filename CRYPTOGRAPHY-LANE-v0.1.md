# Cryptography Lane v0.1

**State:** PREPARED — REVIEWABLE
**Boundary:** Cryptographic integrity, identity binding, provenance, delegation, custody, revocation, and evidence continuity.
**Constitutional test:** `CAN ⊬ MAY`

## Core proposition

> Cryptography can bind a key to bytes. It cannot, by itself, bind authority, informed human intent, lawful permission, or safe consequence.

Cryptography is an enforcement and evidence technology. It is not a substitute for authority, independent judgment, or an external stop path.

## What cryptography can establish

| Claim | Possible cryptographic basis | Remaining question |
|---|---|---|
| Integrity | Hash or authenticated digest | Were the original bytes correct? |
| Authenticity of key use | Digital signature | Who controlled the key, and under what authority? |
| Identity binding | Certificate, hardware key, or attestation | Does the identity have authority for this action? |
| Provenance | Signed, timestamped custody record | Is the source itself reliable? |
| Delegation | Signed authority transition | Was delegation valid, scoped, and current? |
| Non-repudiation evidence | Protected signing event | Was the signer informed and acting voluntarily? |
| Confidentiality | Encryption and access control | Was access lawfully authorized? |
| Freshness | Nonce, sequence, timestamp, or expiry | Is the action still permitted now? |
| Revocation status | Revocation list, status service, or short-lived credential | Does revocation reach enforcement before harm? |
| Reproducibility | Content-addressed artifacts and manifests | Does reproduction imply correctness? |

## What cryptography cannot establish alone

- A valid signature is not informed human approval.
- A verified key is not lawful authority.
- A certificate is not consequence ownership.
- An immutable record is not a true record.
- A timestamp is not permission.
- A hardware security module is not independent judgment.
- A signed policy is not runtime enforcement.
- A chain of custody is not proof that the underlying claim is true.
- A revoked credential is not harmless if enforcement is delayed.
- A cryptographic proof is not a safety proof.

## Required authority chain

Principal → identity binding → key custody → signed decision → scoped authority → credential release → enforcement point → target action → consequence owner → revocation and external stop

Every transition must preserve:

- principal and identity;
- key identifier and algorithm;
- exact bytes or canonical representation;
- action and target binding;
- scope and jurisdiction;
- issuer and delegation chain;
- issuance time, expiry, and revocation state;
- independent evidence custody;
- human disposition where consequence is material;
- external stop authority.

## Key custody rules

Private keys that can authorize consequential actions must be:

- held outside the decision-generating model;
- protected against export where practical;
- bound to a named custodian or controlled service;
- separated from ordinary execution credentials;
- scoped by action, target, and duration;
- rotated and revocable;
- auditable without exposing secret material;
- tested for compromise and recovery;
- subject to emergency disablement outside the agent loop.

Key custody does not eliminate the need to verify that the signer had authority to sign the exact action.

## Signature interpretation

Safe interpretation:

> The holder of key K signed canonical bytes B at or around time T, subject to the custody and verification assumptions recorded in the ledger.

Unsafe interpretation:

> A human approved the meaning, consequences, legality, safety, or deployment of B.

Required pre-action binding:

Signature → canonical action packet → named authority → scoped credential release → independently enforced execution

## Fail-closed conditions

Hold the action if:

- the key identity cannot be bound to a responsible principal;
- private-key custody is unknown or compromised;
- the signed bytes are not canonical or action-specific;
- the signature covers a summary but not the executable action;
- delegation is missing, expired, or broader than the action;
- the signer lacks authority for the target or jurisdiction;
- revocation status is unknown;
- clock or freshness assumptions are outside bounds;
- the verifier and enforcement point disagree;
- the record cannot be preserved independently;
- the machine generated and approved the same authority record;
- no external stop path remains available.

## Cryptographic roles

| Role | Can establish | Cannot silently establish |
|---|---|---|
| Key custodian | Controlled key possession and use | Human intent or permission |
| Certificate authority | Credential binding under its policy | Truth of the subject’s claims |
| Signer | Signature over defined bytes | Authority beyond granted scope |
| Verifier | Signature validity under specified rules | Safety or legality |
| Timestamp authority | Time evidence for a record | Permission at that time |
| HSM or secure enclave | Protected key operations | Independent judgment |
| Evidence custodian | Record continuity and custody | Truth of the underlying event |
| Revocation authority | Withdrawal of future validity | Instant cessation everywhere |
| Policy authority | Rule publication | Runtime compliance without enforcement |

## External brake requirement

Cryptographic control must not be the only stop path. The final brake must remain outside:

- the agent loop;
- the signing process;
- the verifier;
- the credential broker;
- the system being evaluated;
- the ledger that records its own success.

## Test boundary

The evaluated system may generate candidate signatures, manifests, and verification tests. It may not control:

- key admission;
- trusted-root selection;
- signing authority assignment;
- evidence custody;
- revocation decisions;
- hidden test cases;
- interpretation of signature meaning;
- final authorization or closure.

## Status

This lane is a development specification only. It does not establish cryptographic implementation, key security, identity assurance, independent review, field validation, certification, or deployment readiness.

**The signature proves what was signed. The authority must prove why it may act.**

**No owner, no brake. No ledger, no trust.**