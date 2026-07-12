# 18 — Deployment, Recovery, and Revocation

## Environments

Local
- no external consequence
- synthetic data
- no production credentials

Development
- isolated services
- test identities
- no production release path

Staging
- production-like controls
- simulated external actions
- stop-path tests

Production
- separate credentials
- named operators
- formal release and revocation
- monitored audit ledger

## Deployment authority

Build success does not authorize deployment.
Deployment requires a human release decision and environment-specific permission.

## Recovery

Recovery must preserve:
- audit records;
- incident state;
- revocation state;
- owner assignments;
- evidence references.

Recovery must not silently restore:
- expired approvals;
- consumed release tokens;
- revoked permissions;
- prior execution authority.

## Revocation

Revocation targets may include:
- approval;
- permission;
- release token;
- credential;
- session;
- tool;
- job;
- network route;
- deployment.

The external stop controller must remain operable even when the application is unhealthy.
