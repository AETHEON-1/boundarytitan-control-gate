import type { TransparencyChainInput, TransparencyChainResult, TransparencyEvent, TransparencyGap } from '../types/end-to-end-transparency-contracts';
const makeGap = (n: number, description: string, severity: TransparencyGap['severity'], stage?: TransparencyGap['stage'], unsupported_arrow?: string): TransparencyGap => ({ gap_id: `transparency-gap-${n + 1}`, description, severity, ...(stage ? { stage } : {}), ...(unsupported_arrow ? { unsupported_arrow } : {}) });
export function inspectTransparencyChain(input: TransparencyChainInput): TransparencyChainResult {
  const gaps: TransparencyGap[] = [];
  const events = [...input.events].sort((a, b) => a.occurred_at.localeCompare(b.occurred_at));
  const seenStages = new Set(events.map((event) => event.stage));
  input.required_stages.forEach((stage) => { if (!seenStages.has(stage)) gaps.push(makeGap(gaps.length, `Missing required stage: ${stage}`, 'HIGH', stage, `event chain -> ${stage}`)); });
  events.forEach((event: TransparencyEvent, index) => {
    if (!event.actor_id) gaps.push(makeGap(gaps.length, `Event ${event.event_id} has no actor.`, 'HIGH', event.stage, 'event -> accountable actor'));
    if (!event.evidence_refs.length && ['EVIDENCE', 'ANALYSIS', 'AUTHORITY', 'CONSEQUENCE'].includes(event.stage)) gaps.push(makeGap(gaps.length, `Event ${event.event_id} has no evidence reference.`, 'HIGH', event.stage, 'event -> evidence'));
    if (index > 0 && !event.input_refs.includes(events[index - 1].event_id)) gaps.push(makeGap(gaps.length, `Event ${event.event_id} does not link to its prior event.`, 'MEDIUM', event.stage, 'prior state -> current state'));
  });
  if (!input.consequence_owner_id) gaps.push(makeGap(gaps.length, 'No named consequence owner.', 'HIGH', 'CONSEQUENCE', 'analysis -> consequence ownership'));
  if (!input.external_stop_authority_id) gaps.push(makeGap(gaps.length, 'No external stop authority.', 'HIGH', 'AUTHORITY', 'system output -> permission'));
  if (!input.human_disposition_owner_id) gaps.push(makeGap(gaps.length, 'No human disposition owner.', 'HIGH', 'HUMAN_DISPOSITION', 'machine result -> closure'));
  if (!input.independent_evidence_custodian_id) gaps.push(makeGap(gaps.length, 'Evidence is not independently custodized.', 'MEDIUM', 'EVIDENCE', 'recorded evidence -> trusted evidence'));
  const authorityActors = new Set(events.filter((event) => event.stage === 'AUTHORITY').map((event) => event.actor_id));
  const dispositionActors = new Set(events.filter((event) => event.stage === 'HUMAN_DISPOSITION').map((event) => event.actor_id));
  const authoritySeparated = authorityActors.size > 0 && dispositionActors.size > 0 && [...authorityActors].some((actor) => !dispositionActors.has(actor));
  return { chain_id: input.chain_id, ordered_event_ids: events.map((event) => event.event_id), gaps, ...(gaps[0]?.unsupported_arrow ? { first_unsupported_arrow: gaps[0].unsupported_arrow } : {}), continuity: gaps.some((item) => item.severity === 'HIGH') ? 'BROKEN' : gaps.length ? 'INDETERMINATE' : 'CONTINUOUS_WITHIN_TESTED_BOUNDARY', authority_separated: authoritySeparated, human_disposition_required: true, machine_certification: false, machine_closure: false };
}