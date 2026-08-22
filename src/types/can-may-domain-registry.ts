import type { AuthorityStage, ClaimStage, ConsequenceDomain } from './can-may-kernel-contracts';

export interface CanMayDomainAdapter {
  id: string;
  name: string;
  domain: ConsequenceDomain;
  capability: ClaimStage;
  requested_authority: AuthorityStage;
  first_unsupported_arrow: string;
  consequence_surface: string;
  affected_party_required: true;
  consequence_owner_required: true;
  external_stop_required: true;
  specialist_role: string;
  status: 'MAPPED_PREPARATION_ONLY';
}

export interface CanMayDomainRegistry {
  registry_id: string;
  scope_statement: string;
  exhaustive: false;
  adapters: CanMayDomainAdapter[];
}
