import { create } from 'zustand';
import { Scenario, User, SimulationSession } from '../shared/model/types';
import { TRANSLATIONS, TranslationKey } from '../shared/i18n/translations';
import { HEBREW_MOCK_SCENARIOS, ENGLISH_MOCK_SCENARIOS } from '../shared/model/mockData';

interface AppState {
  // User state
  currentUser: User | null;
  
  // Scenarios state
  scenarios: Scenario[];
  
  // Simulation state
  activeScenario: Scenario | null;
  activeSession: SimulationSession | null;
  currentStep: number; // 0-6 for the 7 steps
  
  // Language state
  language: 'en' | 'he';

  // Actions - Authentication
  login: (user: User) => void;
  logout: () => void;
  
  // Actions - Simulation
  startSimulation: (scenarioId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateSessionResponse: (section: keyof SimulationSession['responses'], data: any) => void;
  resetSimulation: () => void;
  
  // Actions - Scenarios CRUD
  addScenario: (scenario: Scenario) => void;
  updateScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
  
  // Actions - Language
  setLanguage: (lang: 'en' | 'he') => void;
  t: (key: TranslationKey) => string;
}

export const useStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: null,
  scenarios: HEBREW_MOCK_SCENARIOS,
  activeScenario: null,
  activeSession: null,
  currentStep: 0,
  language: 'he', // Default Hebrew

  // Authentication actions
  login: (user) => set({ currentUser: user }),
  logout: () => set({ 
    currentUser: null, 
    activeScenario: null, 
    activeSession: null,
    currentStep: 0 
  }),

  // Simulation actions
  startSimulation: (scenarioId) => {
    const scenario = get().scenarios.find(s => s.id === scenarioId);
    if (!scenario) return;

    const newSession: SimulationSession = {
      id: crypto.randomUUID(),
      scenarioId: scenario.id,
      userId: get().currentUser?.id || 'guest',
      startedAt: Date.now(),
      responses: {
        analysis: {},
        reflection: {}
      }
    };

    set({ 
      activeScenario: scenario, 
      activeSession: newSession, 
      currentStep: 0 
    });
  },

  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, 6) 
  })),
  
  prevStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 0) 
  })),

  updateSessionResponse: (section, data) => set((state) => {
    if (!state.activeSession) return {};
    
    const updatedSession = { ...state.activeSession };

    if (section === 'analysis') {
      updatedSession.responses.analysis = { 
        ...updatedSession.responses.analysis, 
        ...data as Record<string, string>
      };
    } else if (section === 'reflection') {
      updatedSession.responses.reflection = { 
        ...updatedSession.responses.reflection, 
        ...data as Record<string, string>
      };
    } else {
      // Handle other response fields
      (updatedSession.responses as Record<string, unknown>)[section] = data;
    }
    
    return { activeSession: updatedSession };
  }),

  resetSimulation: () => set({ 
    activeScenario: null, 
    activeSession: null, 
    currentStep: 0 
  }),

  // Scenarios CRUD actions
  addScenario: (scenario) => set((state) => ({ 
    scenarios: [...state.scenarios, scenario] 
  })),

  updateScenario: (updatedScenario) => set((state) => ({
    scenarios: state.scenarios.map(s => 
      s.id === updatedScenario.id ? updatedScenario : s
    )
  })),

  deleteScenario: (id) => set((state) => ({
    scenarios: state.scenarios.filter(s => s.id !== id)
  })),

  // Language actions
  setLanguage: (lang) => set({ 
    language: lang,
    scenarios: lang === 'he' ? HEBREW_MOCK_SCENARIOS : ENGLISH_MOCK_SCENARIOS
  }),

  t: (key) => {
    const lang = get().language;
    return TRANSLATIONS[lang][key] || key;
  }
}));
