/** Candidate comparison contracts; no admission or permission semantics. */
export const TOOLBOX_PRIMITIVES = [
  'EXTRACT', 'SOURCE', 'COMPARE', 'CLASSIFY STATE', 'DETECT CHANGE',
  'DETECT CONTRADICTION', 'PRESERVE EVIDENCE', 'PRESERVE UNCERTAINTY',
  'FIND OBLIGATION', 'FIND PERMISSION', 'FIND CONSEQUENCE', 'FIND OWNER',
  'FIND DEPENDENCY', 'FIND REVERSIBILITY', 'CLARIFY MEANING',
  'ROUTE HANDOFF', 'IDENTIFY REMAINING STOP', 'TEST BOUNDARY',
] as const;

export type ToolboxPrimitive = typeof TOOLBOX_PRIMITIVES[number];
export type CandidateKind = 'PRIMITIVE' | 'TOOL' | 'WORKFLOW' | 'APPLICATION' | 'RESEARCH_OBJECT' | 'UNKNOWN';

export interface ToolInventoryCandidate {
  candidate_id: string;
  original_name: string;
  source_ref: string;
  purpose: string;
  lane_id: string;
  kind: CandidateKind;
  declared_primitives: readonly string[];
}

export interface InventoryFinding {
  code: 'INVALID_RECORD' | 'DUPLICATE_ID' | 'UNKNOWN_PRIMITIVE' | 'UNMAPPED' | 'UNKNOWN_KIND' | 'SHARED_PRIMITIVE_SET' | 'INVALID_INVENTORY';
  record_indices: number[];
  detail: string;
}

export interface ToolInventoryNormalizationResult {
  /** Every supplied array entry, in its original order. Not evidence authentication. */
  original_records: readonly unknown[];
  findings: InventoryFinding[];
  compared_records: number;
  scope: 'SUPPLIED_DECLARATIONS_ONLY';
  first_unsupported_arrow: string;
  inventory_completeness_established: false;
  semantic_equivalence_established: false;
  identities_merged: false;
  permissions_combined: false;
  human_review_required: true;
  machine_authority: false;
  machine_certification: false;
  machine_closure: false;
}
