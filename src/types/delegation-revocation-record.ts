/** Declaration-only delegation and revocation contracts. */
export interface DelegationRevocationRecord {
  delegation_id: string;
  issuer_id: string;
  recipient_id: string;
  parent_delegation_id?: string;
  scope: string[];
  attenuation_rule: 'MONOTONICALLY_NARROWING';
  authority_basis: string;
  issued_at: string;
  expires_at: string;
  revoked: boolean;
  revoked_at?: string;
  revocation_source?: string;
  descendants: string[];
  consequence_owner_id: string;
  evidence_references: string[];
}
