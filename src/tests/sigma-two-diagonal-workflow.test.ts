import { runSigmaTwoDiagonal } from '../workflows/sigma-two-diagonal';

const complete = { diagonal_id: 'sigma-2-1', system_name: 'bounded review system', capability_claim: 'The system can prepare a bounded assessment.', evidence_claim: 'The assessment carries inspectable evidence.', authority_claim: 'A human may decide whether to proceed.', consequence_claim: 'Proceeding may affect a person or physical system.', evidence_owner_id: 'evidence-owner', consequence_owner_id: 'consequence-owner', decision_owner_id: 'decision-owner', external_stop_authority_id: 'external-stop', denial_path_id: 'deny', revocation_path_id: 'revoke', reversible: true, independent_verifier_id: 'verifier', ledger_event_id: 'ledger', can_self_certify: false, can_self_close: false, uncertainty: [] };

test('passes the diagonal when all authority remains external', () => {
  const result = runSigmaTwoDiagonal(complete);
  expect(result.disposition).toBe('GREEN_FOR_BOUNDED_REVIEW');
  expect(result.who_can_still_say_no).toBe('external-stop');
  expect(result.specialist_handoff.machine_authority).toBe(false);
});

test('holds when the system can certify or close itself', () => {
  const result = runSigmaTwoDiagonal({ ...complete, can_self_certify: true, can_self_close: true });
  expect(result.disposition).toBe('RED_HOLD');
  expect(result.unsupported_arrows).toEqual(expect.arrayContaining(['system output → system certification', 'system output → system closure']));
  expect(result.specialist_handoff.machine_certification).toBe(false);
  expect(result.specialist_handoff.machine_closure).toBe(false);
});

test('routes missing owner, denial, revocation, and stop controls to repair', () => {
  const result = runSigmaTwoDiagonal({ ...complete, consequence_owner_id: undefined, decision_owner_id: undefined, external_stop_authority_id: undefined, denial_path_id: undefined, revocation_path_id: undefined });
  expect(result.disposition).toBe('YELLOW_REQUIRES_REPAIR');
  expect(result.required_repairs).toEqual(expect.arrayContaining(['Name the consequence owner.', 'Name the decision owner.', 'Identify an external stop authority.']));
});

test('holds an irreversible transition without a declared harm window', () => {
  const result = runSigmaTwoDiagonal({ ...complete, reversible: false, harm_window_ms: undefined });
  expect(result.disposition).toBe('RED_HOLD');
  expect(result.unsupported_arrows).toContain('irreversible action → controllable consequence');
});
