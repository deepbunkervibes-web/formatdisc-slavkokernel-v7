
export type MvpStudioPhase =
  | 'IDEA_INPUT'
  | 'EVALUATING'
  | 'MVP_BUILDING'
  | 'RESULT';

export type EvaluationLog = {
  timestamp: string;
  agent: string;
  message: string;
  status: 'INFO' | 'SUCCESS' | 'ERROR' | 'PROCESSING';
};

export interface SimulationResults {
  conversion_rate: number;
  top_objections: string[];
}

export interface IdeaEvaluation {
  verdict: 'PROCEED' | 'REVISE' | 'REJECT';
  score: number;
  summary: string;
  pattern_analysis: string;
  risk_assessment: string;
  eval_notes: string;
  think_recommendation: string;
  council_votes: Record<string, 'PROCEED' | 'REVISE' | 'REJECT'>;
  simulation_results: SimulationResults;
  logs: EvaluationLog[];
}

export interface MvpBlueprint {
  project_name: string;
  value_proposition: string;
  target_users: string[];
  core_flows: Array<{
    name: string;
    steps: string[];
  }>;
  ui_sections: Array<{
    id: string;
    type: 'hero' | 'features' | 'pricing' | 'cta' | 'testimonials' | 'about';
    heading: string;
    copy: string;
    cta_text?: string;
  }>;
  tech_stack?: string[];
  estimated_time_weeks?: number;
}

export interface PitchDeck {
  slides: Array<{
    title: string;
    bullets: string[];
    notes?: string;
  }>;
}

export interface InvestorSummary {
  problem: string;
  solution: string;
  market_size: string;
  competitive_advantage: string;
  funding_ask: string;
  use_of_funds: string[];
  email_template: string;
}

export interface MvpStudioState {
  phase: MvpStudioPhase;
  idea: string;
  evaluation: IdeaEvaluation | null;
  mvpBlueprint: MvpBlueprint | null;
  pitchDeck: PitchDeck | null;
  investorSummary: InvestorSummary | null;
  error: string | null;
}

export enum Sender {
  USER = 'USER',
  BOT = 'BOT'
}

export interface Message {
  id: string;
  text: string;
  sender: Sender;
  timestamp: Date;
}
