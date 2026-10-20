# OS-separated synthetic consequence custody | development-only

A custodian service owns a private 0700 directory and writes effects only after its own gate decision. An unprivileged worker process runs as `nobody` and cannot directly write the private consequence file. The worker can contact the custodian over a Unix socket. The test intentionally attempts direct bypass and expects EACCES/EPERM.

`sudo python3 -m unittest -v test_custodian.py` (Linux, isolated disposable runner only). On non-root runs the test is SKIPPED: treat this as TEST INVALID for the isolation claim, not a passing control. No actual model or real-world consequences.

Limits: custodian and gate share an administrative domain; root can rewrite state; socket has no authenticated actor binding; receipt file and policy remain custodian-owned; no independent evidence custody; no restart/revocation-race testing; no container escape testing. This is a bounded OS-permission fixture, not production assurance.

Preserve raw failures. Never promote synthetic denial to authorization, deployment, or certification.
