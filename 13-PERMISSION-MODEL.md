# 13 — Permission Model

## Principle

Access, capability, approval, permission, release, and execution are distinct.

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
