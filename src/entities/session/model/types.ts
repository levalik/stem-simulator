export interface SimulationSession {
  id: string;
  scenarioId: string;
  userId: string;
  startedAt: number;
  completedAt?: number;
  responses: {
    analysis: Record<string, string>;
    analysisFeedback?: string;
    solutionId?: string;
    solutionJustification?: string;
    solutionFeedback?: string;
    reflection: Record<string, string>;
  };
}
