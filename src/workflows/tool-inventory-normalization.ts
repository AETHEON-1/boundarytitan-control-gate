import { TOOLBOX_PRIMITIVES } from '../types/tool-inventory-normalization-contracts';
import type { InventoryFinding, ToolInventoryNormalizationResult } from '../types/tool-inventory-normalization-contracts';

const primitives = new Set<string>(TOOLBOX_PRIMITIVES);
const kinds = new Set(['PRIMITIVE', 'TOOL', 'WORKFLOW', 'APPLICATION', 'RESEARCH_OBJECT', 'UNKNOWN']);
const fields = ['candidate_id', 'original_name', 'source_ref', 'purpose', 'lane_id', 'kind'] as const;
const nonblank = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;

/** Compare caller-supplied JSON-like declarations. No I/O, mutation, or execution. */
export function inspectToolInventory(input: unknown): ToolInventoryNormalizationResult {
  const records: readonly unknown[] = Array.isArray(input) ? Array.from(input) : [input];
  const findings: InventoryFinding[] = [];
  const ids = new Map<string, number[]>();
  const signatures = new Map<string, number[]>();
  let compared = 0;
  const add = (code: InventoryFinding['code'], record_indices: number[], detail: string): void => {
    findings.push({ code, record_indices, detail });
  };
  const remember = (map: Map<string, number[]>, key: string, index: number): void => {
    const group = map.get(key);
    if (group) group.push(index);
    else map.set(key, [index]);
  };
  if (!Array.isArray(input) || records.length === 0) {
    add('INVALID_INVENTORY', [], 'Expected a nonempty array; no coverage or admission follows.');
  } else {
    records.forEach((raw, index) => {
      if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) {
        add('INVALID_RECORD', [index], 'Expected a candidate declaration object.');
        return;
      }
      const row = raw as Record<string, unknown>;
      if (nonblank(row.candidate_id)) remember(ids, row.candidate_id.trim(), index);
      const missing = fields.filter((field) => !Object.prototype.hasOwnProperty.call(row, field) || !nonblank(row[field]));
      if (missing.length || !Array.isArray(row.declared_primitives) || !kinds.has(String(row.kind))) {
        add('INVALID_RECORD', [index], 'Required nonblank identity, provenance, purpose, lane, kind or primitive array is invalid.');
        return;
      }
      if (row.kind === 'UNKNOWN') add('UNKNOWN_KIND', [index], 'Object class requires human review.');
      const declared: unknown[] = Array.from(row.declared_primitives);
      if (!declared.length) {
        add('UNMAPPED', [index], 'No primitive mapping supplied; absence is not equivalence.');
        return;
      }
      if (declared.some((value) => typeof value !== 'string' || !primitives.has(value))) {
        add('UNKNOWN_PRIMITIVE', [index], 'At least one declared primitive is outside the frozen candidate vocabulary.');
        return;
      }
      const signature = JSON.stringify(Array.from(new Set(declared as string[])).sort());
      remember(signatures, signature, index);
      compared++;
    });
    for (const [id, indices] of ids) {
      if (indices.length > 1) add('DUPLICATE_ID', indices, `Repeated candidate identifier: ${id}`);
    }
    for (const indices of signatures.values()) {
      if (indices.length > 1) add('SHARED_PRIMITIVE_SET', indices, 'Possible computational reuse only; purpose, domain, evidence, permissions and consequence remain separate.');
    }
  }
  return {
    original_records: records,
    findings,
    compared_records: compared,
    scope: 'SUPPLIED_DECLARATIONS_ONLY',
    first_unsupported_arrow: 'Shared declared primitives do not establish semantic equivalence or shared permission.',
    inventory_completeness_established: false,
    semantic_equivalence_established: false,
    identities_merged: false,
    permissions_combined: false,
    human_review_required: true,
    machine_authority: false,
    machine_certification: false,
    machine_closure: false,
  };
}
