export type Role = 'teacher' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
}

export interface Scenario {
  id: string;
  title: string;
  category: string;
  duration: string; // e.g. "15 mins"
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
}

export interface SimulationSession {
  id: string;
  scenarioId: string;
  userId: string;
  startedAt: number;
  completedAt?: number;
  responses: {
    analysis: Record<string, string>; // questionIndex -> answer
    analysisFeedback?: string;
    solutionId?: string;
    solutionJustification?: string;
    solutionFeedback?: string;
    reflection: Record<string, string>;
  };
}
