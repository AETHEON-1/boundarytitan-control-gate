# BT-RSI-006 | Full Consequence-Path Adversarial Battery
State: YELLOW / CONTRADICTED for synthetic non-bypassability claims.

Five deliberately modeled bypasses:
1. Direct write to the SQLite effects table after closure.
2. Stolen or replayed valid task signature accepted while task remains open.
3. Administrator resets a completion tombstone, then uses a valid credential.
4. Queue accepts before closure and unprotected external consumer applies after closure.
5. Plausible but fabricated human owner/jurisdiction metadata accepted as complete.

These are **negative controls**. Their test assertions intentionally expect bypass success. A green CI test means the harness *observed* the failure, not that the security boundary resisted it. Direct database and administrator cases execute against a temporary local SQLite file. The asynchronous effect is an abstract queue simulation, not a real broker or external service. No credential theft from a live system is performed. No real person's identity or jurisdiction is tested.

Sigma-2 mapping: source evidence -> established fact (evidentiary standard); rule -> jurisdiction (external legal/institutional source); owner -> authority (identity and standing); authorization -> resource effect (complete execution-path mediation); closure -> extinction (all queued, restarted, and delegated paths). Each arrow is independently challengeable.

Next engineering requirements: remove direct write paths via separated trust domain and resource enforcement; independent key custody and binding to an authenticated principal; administrator/custodian separation; external consumer commit-time closure check; independently verifiable owner/jurisdiction registry. These are candidate requirements, not implemented guarantees.

No publication, merge, production, certification, or field authorization. CAN ⊬ MAY.
