
import { IdeaEvaluation, MvpBlueprint, PitchDeck, InvestorSummary } from '../types';
import { GoogleGenAI } from "@google/genai";

// This file contains mock services that simulate backend API calls.
// In a real application, these would be replaced with actual HTTP requests.

/**
 * The Council Agent function aggregates votes from individual agents
 * to determine a final verdict based on a simple majority.
 */
const councilAgent = (votes: Record<string, 'PROCEED' | 'REVISE' | 'REJECT'>): { verdict: 'PROCEED' | 'REVISE' | 'REJECT', justification: string, voteCounts: { proceed: number, revise: number, reject: number } } => {
  let proceed = 0;
  let revise = 0;
  let reject = 0;

  for (const vote of Object.values(votes)) {
    if (vote === 'PROCEED') proceed++;
    else if (vote === 'REJECT') reject++;
    else revise++;
  }

  let verdict: 'PROCEED' | 'REVISE' | 'REJECT' = 'REVISE';
  // Simple majority/plurality logic
  if (proceed > revise && proceed > reject) {
    verdict = 'PROCEED';
  } else if (reject > proceed && reject > revise) {
    verdict = 'REJECT';
  }
  
  const justification = `The SlavkoKernel Council has deliberated. With ${proceed} votes to PROCEED, ${revise} to REVISE, and ${reject} to REJECT, the majority consensus is to ${verdict}.`;

  return { verdict, justification, voteCounts: { proceed, revise, reject } };
};


export const mvpStudioService = {
  async evaluateIdea(idea: string): Promise<IdeaEvaluation> {
    console.log('🔍 Evaluating idea:', idea);
    await new Promise(resolve => setTimeout(resolve, 3000));

    const isRejectedIdea = idea.toLowerCase().includes('coffee');

    // 1. Individual agents (analyst, simulator, skeptic, researcher) cast their votes
    const individualVotes: Record<string, 'PROCEED' | 'REVISE' | 'REJECT'> = isRejectedIdea
      ? {
          'ANALYST_AGENT': 'REVISE',
          'SIMULATOR_AGENT': 'REJECT',
          'SKEPTIC_AGENT': 'REJECT',
          'RESEARCHER_AGENT': 'REVISE',
        }
      : {
          'ANALYST_AGENT': 'PROCEED',
          'SIMULATOR_AGENT': 'PROCEED',
          'SKEPTIC_AGENT': 'REVISE',
          'RESEARCHER_AGENT': 'PROCEED',
        };

    // 2. Council agent aggregates votes and determines final verdict
    const { verdict, justification, voteCounts } = councilAgent(individualVotes);

    // 3. Calculate a deterministic score based on votes
    const totalVotes = Object.keys(individualVotes).length;
    const score = (voteCounts.proceed * 10 + voteCounts.revise * 5 + voteCounts.reject * 1) / totalVotes;


    const mockEvaluation: IdeaEvaluation = {
      verdict,
      score,
      summary: justification,
      pattern_analysis: `Recognized pattern: ${idea.toLowerCase().includes('marketplace') ? 'P2P Marketplace' : 'B2B SaaS'}.`,
      risk_assessment: `Main risks: ${isRejectedIdea ? 'Saturated market, low margins.' : 'Technical complexity, scalability.'}`,
      eval_notes: `Detailed analysis shows strong potential in the niche, but requires a focus on UX.`,
      think_recommendation: `Recommendation: Focus on market validation and building a minimal feature set.`,
      council_votes: individualVotes,
      simulation_results: isRejectedIdea
        ? {
            conversion_rate: 2.1,
            top_objections: [
              "Another subscription? I have too many.",
              "I prefer buying from my local coffee shop.",
              "Delivery fees are too high for this to be worthwhile."
            ]
          }
        : {
            conversion_rate: 12.5,
            top_objections: [
              "Pricing seems a bit high for small businesses.",
              "How secure is our financial data on your platform?",
              "Does it integrate with existing accounting software like QuickBooks?"
            ]
          },
      logs: [
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'SlavkoKernel v7 booting...', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'Manifest processed. Kernel parameters updated.', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'Operational mode: Council-governed, multi-agent orchestration.', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'SlavkoFusion module engaged. Prompt replay enabled for reproducibility.', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'Protocols engaged: Risk Assessment, Auditability.', status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'System hardened against optimism bias.', status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'Awaiting directive...', status: 'PROCESSING' },
        { timestamp: new Date().toISOString(), agent: 'SYSTEM', message: 'Directive received. Initializing SlavkoKernel council...', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: '::PROTOCOL:INITIATE:COUNCIL_VOTE', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'ANALYST_AGENT', message: 'Analysis complete. Vote: ' + individualVotes.ANALYST_AGENT, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'SIMULATOR_AGENT', message: 'Simulation complete. Vote: ' + individualVotes.SIMULATOR_AGENT, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'SKEPTIC_AGENT', message: 'Assessment complete. Vote: ' + individualVotes.SKEPTIC_AGENT, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'RESEARCHER_AGENT', message: 'Research complete. Vote: ' + individualVotes.RESEARCHER_AGENT, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: 'SlavkoFusion: Logging agent latency and confidence metrics for heatmap generation.', status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'COUNCIL', message: 'All agents reported. Tallying votes...', status: 'PROCESSING' },
        { timestamp: new Date().toISOString(), agent: 'COUNCIL', message: `Vote counts - Proceed: ${voteCounts.proceed}, Revise: ${voteCounts.revise}, Reject: ${voteCounts.reject}.`, status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: `::SCORE:CALCULATING_FINAL_CONFIDENCE: ${score.toFixed(2)}/10`, status: 'INFO' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: `::BADGE:ASSIGNING:VERDICT_${verdict}`, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'COUNCIL', message: `Final verdict by majority: ${verdict}.`, status: 'SUCCESS' },
        { timestamp: new Date().toISOString(), agent: 'KERNEL', message: `SlavkoFusion: Milestone card generated: 'COUNCIL_DECISION_SEALED'. Audit trail stored.`, status: 'SUCCESS' },
      ],
    };

    if (mockEvaluation.verdict === 'REJECT') {
      mockEvaluation.logs.push({
        timestamp: new Date().toISOString(),
        agent: 'SYSTEM',
        message: 'Idea did not meet the threshold. Revision is required.',
        status: 'ERROR',
      });
    }

    return mockEvaluation;
  },

  async generateMvp(idea: string, evaluation: IdeaEvaluation): Promise<MvpBlueprint> {
    console.log('🏗️ Generating MVP blueprint...');
    await new Promise(resolve => setTimeout(resolve, 4000));

    return {
      project_name: `MVP for ${idea.substring(0, 30)}...`,
      value_proposition: `Rapid idea validation through a functional prototype.`,
      target_users: ['Early Adopters', 'Beta Testers'],
      core_flows: [
        { name: 'User Registration', steps: ['Enter email', 'Confirm password', 'Onboarding tour'] },
        { name: 'Core Functionality', steps: ['Create item', 'Edit item', 'Delete item'] },
      ],
      ui_sections: [
        { id: 'hero', type: 'hero', heading: 'Welcome to your MVP!', copy: 'This is the homepage of your prototype.', cta_text: 'Get Started' },
        { id: 'features', type: 'features', heading: 'Key Features', copy: 'Quickly test the most important functionalities.', cta_text: 'Learn More' },
        { id: 'pricing', type: 'pricing', heading: 'Pricing', copy: 'A simple model for early users.', cta_text: 'Choose a Plan' },
        { id: 'cta', type: 'cta', heading: 'Ready to test?', copy: 'Start using your MVP immediately.', cta_text: 'Register' },
      ],
      tech_stack: ['React', 'Node.js', 'PostgreSQL'],
      estimated_time_weeks: 4,
    };
  },

  async generatePitchDeck(
    idea: string,
    evaluation: IdeaEvaluation,
    mvpBlueprint: MvpBlueprint
  ): Promise<PitchDeck> {
    console.log('📊 Generating pitch deck...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    return {
      slides: [
        { title: 'Problem', bullets: ['The market has problem X', 'Existing solutions are inadequate'] },
        { title: 'Solution', bullets: ['Our MVP offers Y', 'Simple and efficient'] },
        { title: 'Market', bullets: ['Target audience Z', 'Huge growth potential'] },
        { title: 'Team', bullets: ['Experienced team', 'Passionate about innovation'] },
        { title: 'Financials', bullets: ['Seeking 500k EUR', 'For development and marketing'] },
      ],
    };
  },

  async generateInvestorSummary(
    idea: string,
    evaluation: IdeaEvaluation,
    mvpBlueprint: MvpBlueprint,
    pitchDeck: PitchDeck
  ): Promise<InvestorSummary> {
    console.log('💼 Generating investor summary...');
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      problem: 'Existing systems are slow and expensive.',
      solution: 'Our AI-powered MVP Studio automates idea validation and prototype generation.',
      market_size: 'The global market for AI development tools is experiencing exponential growth.',
      competitive_advantage: 'A unique combination of AI evaluation, MVP generation, and a pitch deck in one tool.',
      funding_ask: 'Seeking 500,000 EUR for further platform development and expansion into new markets.',
      use_of_funds: ['Team Development', 'Marketing', 'Infrastructure'],
      email_template: `Dear Investors,\n\nWe present FORMATDISC MVP Studio, a platform that revolutionizes idea validation and prototype development. Our AI platform, SlavkoKernel™, evaluates ideas in 60 seconds and automatically generates functional MVP simulations and pitch decks.\n\nProblem: Existing systems are slow and expensive.\nSolution: Our AI-powered MVP Studio automates idea validation and prototype generation.\n\nWe are seeking 500,000 EUR for further development and expansion.\n\nSincerely,\nMladen Gertner\nFORMATDISC`,
    };
  },
};

export type GeminiHistoryPart = {
  role: 'user' | 'model';
  parts: { text: string }[];
};

export const sendMessageToGemini = async (history: GeminiHistoryPart[], message: string): Promise<string> => {
  try {
     // Ensure API Key exists
    if (!process.env.API_KEY) {
        console.warn("API Key is missing. Returning mock response.");
        return "I can't connect to Gemini right now (API Key missing). I am Lumina, your design assistant.";
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: "You are Lumina, a helpful design assistant specializing in 'Ethereal Cupertino' aesthetics, gradients, and glassmorphism. Keep your answers concise and focused on UI/UX design.",
      }
    });

    const result = await chat.sendMessage({ message });
    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, I'm having trouble connecting to the design mainframe right now.";
  }
}
