import { runOmissionsPass } from '../workflows/omissions-pass';

test('finds missing control surfaces without inventing evidence', () => {
  const result = runOmissionsPass({ pass_id: 'omissions-1', proposed_action: 'release', claims_without_sources: ['claim-unsupported'], declared_assumptions: ['operator will notice the alert'], surfaces: [{ surface_id: 'surface-1', name: 'automated eligibility decision', inspected: false, dependencies: [], affected_party_ids: [], evidence_ids: [], independent_measurement_ids: [], reversible: false, accessibility_reviewed: false, uncertainty: ['proxy feature not inspected'] }] });
  expect(result.state).toBe('OMISSIONS_FOUND');
  expect(result.uninspected_surfaces).toContain('surface-1');
  expect(result.unsupported_claim_ids).toContain('claim-unsupported');
  expect(result.findings.some((finding) => finding.category === 'OWNER')).toBe(true);
  expect(result.findings.some((finding) => finding.category === 'STOP_PATH')).toBe(true);
  expect(result.machine_authority).toBe(false);
  expect(result.closure).toBe(false);
});

test('can report no omissions only when every declared requirement is supplied', () => {
  const result = runOmissionsPass({ pass_id: 'omissions-2', claims_without_sources: [], declared_assumptions: [], surfaces: [{ surface_id: 'surface-2', name: 'bounded review', inspected: true, dependencies: ['ledger'], affected_party_ids: ['person-1'], consequence_owner_id: 'owner-1', decision_owner_id: 'decision-1', authority_basis_id: 'basis-1', external_stop_path_id: 'stop-1', evidence_ids: ['evidence-1'], independent_measurement_ids: ['measurement-1'], reversible: true, appeal_path_id: 'appeal-1', ledger_event_id: 'ledger-1', specialist_role: 'specialist', accessibility_reviewed: true, uncertainty: [] }] });
  expect(result.state).toBe('NO_OMISSIONS_IN_SUPPLIED_SURFACES');
  expect(result.findings).toHaveLength(0);
});
