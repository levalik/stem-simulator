export interface SolutionOption {
  id: string;
  text: string;
  correct: boolean;
  resultId: string;
}

export interface SimulationResult {
  summary: string;
  detail: string;
  outcomeType: 'success' | 'failure' | 'neutral';
  outcomeImageUrl?: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  duration: string;
  opening: {
    description: string;
    imageUrl?: string;
  };
  problem: {
    text: string;
    context: string;
    imageUrl?: string;
  };
  data: {
    chartType: 'line' | 'bar' | 'pie';
    chartData: Array<{ name: string; value: number; [key: string]: any }>;
    description: string;
    facts?: string[];
  };
  analysis: {
    questions: string[];
    keyTerms: string[];
  };
  solutions: {
    options: SolutionOption[];
  };
  simulation: {
    results: Record<string, SimulationResult>;
  };
  reflection: {
    questions: string[];
  };
}
