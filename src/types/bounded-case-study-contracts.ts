export type BoundedCaseStudyState = 'GREEN' | 'YELLOW' | 'RED' | 'NOT_ADMISSIBLE';

export interface BoundedCaseStudyInput {
  case_id: string;
  title: string;
  trigger: string;
  verified_facts: Array<{ fact_id: string; statement: string; source_ids: string[]; evidence_ids: string[] }>;
  bounded_inferences: string[];
  open_questions: string[];
  control_gap: string;
  consequence_path: string[];
  consequence_owner_id?: string;
  external_stop_path_id?: string;
  reversibility?: 'REVERSIBLE' | 'PARTIALLY_REVERSIBLE' | 'IRREVERSIBLE' | 'UNKNOWN';
  harm_window_ms?: number;
  specialist_role?: string;
  sigma_line: string;
}

export interface BoundedCaseStudyResult {
  case_id: string;
  state: BoundedCaseStudyState;
  trigger: string;
  verified_facts: BoundedCaseStudyInput['verified_facts'];
  bounded_inferences: string[];
  open_questions: string[];
  control_gap: string;
  consequence_path: string[];
  first_unsupported_arrow?: string;
  required_human_decisions: string[];
  specialist_handoff: {
    recipient_role: string;
    questions: string[];
    non_claims: string[];
    machine_authority: false;
    closure: false;
  };
  sigma_line: string;
}
