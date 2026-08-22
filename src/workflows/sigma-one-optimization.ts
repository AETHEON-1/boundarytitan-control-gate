import type { SigmaOneOptimizationInput, SigmaOneOptimizationResult, SigmaOneWorkItem } from '../types/sigma-one-optimization-contracts';

const priority = (item: SigmaOneWorkItem): number => {
  const evidenceGap = 1 / (item.evidence_count + 1);
  const uncertainty = item.unresolved_count;
  const consequence = item.consequence_weight;
  const controlGap = Number(!item.owner_present) + Number(!item.external_stop_present);
  const cost = Math.max(item.estimated_cost, 1);
  return (consequence * 3) + (uncertainty * 2) + (evidenceGap * 4) + (controlGap * 5) - (cost * 0.1);
};

export function optimizeSigmaOne(input: SigmaOneOptimizationInput): SigmaOneOptimizationResult {
  const ordered = [...input.items].sort((a, b) => priority(b) - priority(a));
  const held = ordered.filter((item) => !item.owner_present || !item.external_stop_present);
  return {
    optimization_id: input.optimization_id,
    ordered_item_ids: ordered.map((item) => item.id),
    rationale: ordered.map((item) => `${item.id}: prioritize evidence gap, uncertainty, consequence weight, and control gaps; objective=${input.objective}`),
    held_item_ids: held.map((item) => item.id),
    authority_transferred: false,
    permission_granted: false,
    release_issued: false,
    human_disposition_required: true,
  };
}
