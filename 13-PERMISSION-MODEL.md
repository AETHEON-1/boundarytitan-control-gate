# 13 — Permission Model

## Principle

Access, capability, approval, permission, release, and execution are distinct.

Capability is not itself restricted by this model. The control surface governs access to capability, authority to invoke it, execution, and consequence-bearing transitions.

```text
Capability may remain available
→ access is scoped
→ invocation is permitted
→ execution is controlled
→ consequence is owned
```

## Permission dimensions

- subject
- action
- object
- destination
- scope
- time
- volume
- consequence class
- evidence basis
- approval reference
- revocation path
- stop-path requirement

## Permission grant requirements

A PermissionGrant requires:
- valid human approval;
- named accountable owner;
- bounded scope;
- sufficient evidence;
- visible approval record;
- external stop path;
- inspectable ledger;
- non-expired authority basis.

## Deny-by-default

Missing or ambiguous dimensions default to no permission.

This is deny-by-default for access and execution, not a claim that the underlying capability must be erased, hidden, or destroyed.

## Inheritance

Permissions do not automatically inherit across:
- lanes;
- tools;
- repositories;
- tenants;
- sessions;
- restarts;
- deployments;
- action classes.

## Delegation

Delegation must identify:
- delegator;
- delegate;
- scope;
- duration;
- revocation authority;
- non-delegable powers;
- audit record.
