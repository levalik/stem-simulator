import { create } from 'zustand';
import { Scenario, User, SimulationSession } from './types';

export const TRANSLATIONS = {
  en: {
    start: "Start",
    analyze: "Analyze",
    decide: "Decide",
    finish: "Finish",
    step: "Step",
    of: "of",
    continue: "Continue",
    back: "Back",
    login_teacher: "Continue as Teacher",
    login_admin: "Login as Admin",
    sign_out: "Sign Out",
    dashboard: "Dashboard",
    scenarios: "Scenarios",
    users: "Users",
    settings: "Settings",
    analytics: "Analytics",
    new_scenario: "New Scenario",
    learning_goals: "Learning Goals",
    start_simulation: "Start Simulation",
    estimated_duration: "Estimated Duration",
    mission_brief: "The Mission Brief",
    core_problem: "Core Problem",
    contextual_info: "Contextual Information",
    data_analysis: "Data Analysis",
    critical_analysis: "Critical Analysis",
    proposed_solution: "Proposed Solution",
    justify_choice: "Justify your choice",
    run_simulation: "Run Simulation",
    simulation_results: "Simulation Results",
    reflection: "Reflection",
    download_report: "Download Report",
    return_dashboard: "Return to Dashboard",
    ai_feedback: "AI Feedback",
    analyzing: "Analyzing...",
    admin_panel: "Admin Panel",
    total_scenarios: "Total Scenarios",
    active_modules: "active modules",
    create_new: "Create New",
    scenario_library: "Scenario Library",
    ai_generator: "AI Scenario Generator",
    generate: "Generate",
    save_library: "Save to Library",
    preview_draft: "Preview Draft",
    discard: "Discard",
    title: "Title",
    category: "Category",
    duration: "Duration",
    welcome: "Welcome",
    select_language: "Language",
    view_analytics: "View Analytics",
    user_management: "User Management",
    system_settings: "System Settings",
    save_changes: "Save Changes",
    description: "Description",
    option: "Option",
    correct: "Correct",
    incorrect: "Incorrect",
    actions: "Actions",
    role: "Role",
    name: "Name",
    email: "Email",
    status: "Status",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    delete: "Delete",
    // Admin Panel
    login_hint: "Demo: demo/demo | Admin: admin/admin",

    // Creator
    scenario_title: "Scenario Title",
    scenario_description: "Description",
    image_url: "Image URL",
    problem_statement: "Problem Statement",
    context: "Context",
    chart_type: "Chart Type",
    data_points: "Data Points",
    analysis_questions: "Analysis Questions",
    solution_options: "Solution Options",
    results: "Results",
    reflection_questions: "Reflection Questions",
    add_option: "Add Option",
    add_question: "Add Question",
    is_correct: "Correct?",
    result_summary: "Result Summary",
    result_detail: "Result Detail",
    step_1_opening: "Step 1: Opening",
    step_2_problem: "Step 2: Problem",
    step_3_data: "Step 3: Data",
    step_4_analysis: "Step 4: Analysis",
    step_5_solutions: "Step 5: Solutions",
    step_6_simulation: "Step 6: Simulation",
    step_7_reflection: "Step 7: Reflection",
  },
  he: {
    start: "התחלה",
    analyze: "ניתוח",
    decide: "החלטה",
    finish: "סיום",
    step: "שלב",
    of: "מתוך",
    continue: "המשך",
    back: "חזור",
    login_teacher: "המשך כמורה",
    login_admin: "כניסת מנהל מערכת",
    sign_out: "התנתק",
    dashboard: "לוח בקרה",
    scenarios: "תרחישים",
    users: "משתמשים",
    settings: "הגדרות",
    analytics: "נתונים",
    new_scenario: "תרחיש חדש",
    learning_goals: "מטרות למידה",
    start_simulation: "התחל סימולציה",
    estimated_duration: "משך משוער",
    mission_brief: "תיאור המשימה",
    core_problem: "הבעיה המרכזית",
    contextual_info: "מידע הקשרי",
    data_analysis: "ניתוח נתונים",
    critical_analysis: "חשיבה ביקורתית",
    proposed_solution: "פתרון מוצע",
    justify_choice: "נמק את בחירתך",
    run_simulation: "הרץ סימולציה",
    simulation_results: "תוצאות הסימולציה",
    reflection: "רפלקציה",
    download_report: "הורד דוח",
    return_dashboard: "חזור ללוח הבקרה",
    ai_feedback: "משוב AI",
    analyzing: "מנתח...",
    admin_panel: "פאנל ניהול",
    total_scenarios: "סה״כ תרחישים",
    active_modules: "מודולים פעילים",
    create_new: "צור חדש",
    scenario_library: "ספריית תרחישים",
    ai_generator: "מחולל תרחישים (AI)",
    generate: "צור",
    save_library: "שמור לספרייה",
    preview_draft: "תצוגה מקדימה",
    discard: "בטל",
    title: "כותרת",
    category: "קטגוריה",
    duration: "משך",
    welcome: "ברוכים הבאים",
    select_language: "שפה",
    view_analytics: "צפה בנתונים",
    user_management: "ניהול משתמשים",
    system_settings: "הגדרות מערכת",
    save_changes: "שמור שינויים",
    description: "תיאור",
    option: "אפשרות",
    correct: "נכון",
    incorrect: "שגוי",
    actions: "פעולות",
    role: "תפקיד",
    name: "שם",
    email: "אימייל",
    status: "סטטוס",
    active: "פעיל",
    inactive: "לא פעיל",
    edit: "ערוך",
    delete: "מחק"
  }
};

interface AppState {
  currentUser: User | null;
  currentView: 'login' | 'teacher_dashboard' | 'teacher_simulation' | 'admin_dashboard' | 'admin_editor';
  scenarios: Scenario[];
  activeScenario: Scenario | null;
  activeSession: SimulationSession | null;
  currentStep: number; // 0-6 for the 7 steps
  language: 'en' | 'he';

  // Actions
  login: (user: User) => void;
  logout: () => void;
  setView: (view: AppState['currentView']) => void;
  startSimulation: (scenarioId: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateSessionResponse: (section: keyof SimulationSession['responses'], data: any) => void;
  addScenario: (scenario: Scenario) => void;
  resetSimulation: () => void;
  setLanguage: (lang: 'en' | 'he') => void;
  t: (key: keyof typeof TRANSLATIONS['en']) => string;
}

import { HEBREW_MOCK_SCENARIOS } from './mockData';

const MOCK_SCENARIOS: Scenario[] = HEBREW_MOCK_SCENARIOS;

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  currentView: 'login',
  scenarios: MOCK_SCENARIOS,
  activeScenario: null,
  activeSession: null,
  currentStep: 0,
  language: 'he', // Default Hebrew

  login: (user) => set({ currentUser: user, currentView: user.role === 'admin' ? 'admin_dashboard' : 'teacher_dashboard' }),
  logout: () => set({ currentUser: null, currentView: 'login', activeScenario: null, activeSession: null }),
  setView: (view) => set({ currentView: view }),

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

    set({ activeScenario: scenario, activeSession: newSession, currentView: 'teacher_simulation', currentStep: 0 });
  },

  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 6) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),

  updateSessionResponse: (section, data) => set((state) => {
    if (!state.activeSession) return {};
    const updatedSession = { ...state.activeSession };

    if (section === 'analysis') {
      updatedSession.responses.analysis = { ...updatedSession.responses.analysis, ...data };
    } else if (section === 'reflection') {
      updatedSession.responses.reflection = { ...updatedSession.responses.reflection, ...data };
    } else {
      // @ts-ignore
      updatedSession.responses[section] = data;
    }
    return { activeSession: updatedSession };
  }),

  addScenario: (scenario) => set((state) => ({ scenarios: [...state.scenarios, scenario] })),

  resetSimulation: () => set({ activeScenario: null, activeSession: null, currentView: 'teacher_dashboard', currentStep: 0 }),

  setLanguage: (lang) => set({ language: lang }),

  t: (key) => {
    const lang = get().language;
    return TRANSLATIONS[lang][key] || key;
  }
}));