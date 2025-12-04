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

export type GradeLevel = 'Grade 1' | 'Grade 2' | 'Grade 3' | 'Grade 4' | 'Grade 5' | 'Grade 6' | 'Grade 7' | 'Grade 8' | 'Grade 9' | 'Grade 10' | 'Grade 11' | 'Grade 12';

export type Discipline = 'Mathematics' | 'Physics' | 'Chemistry' | 'Biology' | 'History' | 'Geography' | 'Literature' | 'Computer Science' | 'Art' | 'Environmental Science' | 'Ecology' | 'Urban Planning' | 'Engineering' | 'Operations Research' | 'Medicine' | 'Kinematics' | 'Environmental Quality' | 'Economics' | 'Management' | 'Financial Education' | 'Technology in Education' | 'Renewable Energy' | 'Arithmetic' | 'Fractions';

export interface Task {
  id: string;
  discipline: Discipline;
  description: string;
  solution: string;
  coverImage?: string;
}

export interface Scenario {
  id: string;
  topic?: string;
  grade?: GradeLevel;
  duration: number | string;
  disciplines?: Discipline[];
  tasks?: Task[];

  // Legacy fields (to be removed)
  title?: string;
  category?: string;
  opening?: {
    description: string;
    imageUrl?: string;
  };
  problem?: {
    text: string;
    context: string;
    imageUrl?: string;
  };
  data?: {
    chartType: 'line' | 'bar' | 'pie';
    chartData: Array<{ name: string; value: number;[key: string]: any }>;
    description: string;
    facts?: string[];
  };
  analysis?: {
    questions: string[];
    keyTerms: string[];
  };
  solutions?: {
    options: SolutionOption[];
  };
  simulation?: {
    results: Record<string, SimulationResult>;
  };
  reflection?: {
    questions: string[];
  };
}
