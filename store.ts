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
    login: "Login",
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
    select_training_module: "select a training module.",
    password: "Password",
    invalid_credentials: "Invalid credentials. Try user:demo / pass:demo",
    version: "Version",
    powered_by: "Powered by",
    overview_scenario: "Overview of the scenario and your role.",
    understand_problem: "Understand the core problem you need to solve.",
    analyze_data_help: "Analyze the data to identify trends and patterns.",
    answer_questions_help: "Answer the questions based on your data analysis.",
    type_answer_help: "Type your detailed answer here. AI will provide feedback.",
    justify_choice_help: "Why is this the optimal solution given the constraints? (Required)",
    completed_module: "You've successfully completed the module. Great work.",
    report_saved: "Report Saved",
    total_sessions: "Total Sessions",
    avg_score: "Avg. Score",
    active_teachers: "Active Teachers",
    weekly_activity: "Weekly Activity",
    completion_rate: "Completion Rate",
    completed: "Completed",
    dropped: "Dropped",
    search_users: "Search users...",
    add_user: "Add User",
    email_notifications: "Email Notifications",
    receive_reports: "Receive weekly reports on usage.",
    ai_model_config: "AI Model Configuration",
    current_model: "Currently using Gemini 2.5 Flash.",
    change: "Change",
    data_export: "Data Export",
    download_logs: "Download all simulation logs as CSV.",
    export: "Export",
    ready_to_create: "Ready to Create?",
    review_scenario: "Review your scenario details before saving.",
    vs_last_week: "vs last week",
    powered_by_siema: "Powered by Siema",
    demo_mode_warning: "This is a demo simulation using mock data.",
    tooltip_dashboard: "Overview of your activities and scenarios.",
    tooltip_analytics: "View detailed performance metrics.",
    tooltip_new_scenario: "Create a new training scenario.",
    tooltip_users: "Manage system users.",
    tooltip_settings: "Configure system preferences.",
    tooltip_start_scenario: "Begin this training module.",
    tooltip_edit_scenario: "Edit this scenario.",
    tooltip_delete_scenario: "Delete this scenario.",
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
    login: "כניסה",
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
    delete: "מחק",
    login_hint: "הדגמה: demo/demo | מנהל: admin/admin",
    select_training_module: "בחר מודול אימון.",
    password: "סיסמה",
    invalid_credentials: "פרטי התחברות שגויים. נסה user:demo / pass:demo",
    version: "גרסה",
    powered_by: "מופעל על ידי",
    overview_scenario: "סקירה כללית של התרחיש והתפקיד שלך.",
    understand_problem: "הבן את הבעיה המרכזית שעליך לפתור.",
    analyze_data_help: "נתח את הנתונים כדי לזהות מגמות ודפוסים.",
    answer_questions_help: "ענה על השאלות בהתבסס על ניתוח הנתונים שלך.",
    type_answer_help: "הקלד את תשובתך המפורטת כאן. AI יספק משוב.",
    justify_choice_help: "מדוע זהו הפתרון האופטימלי בהתחשב באילוצים? (חובה)",
    completed_module: "השלמת את המודול בהצלחה. עבודה מצוינת.",
    report_saved: "הדוח נשמר",
    total_sessions: "סה״כ סשנים",
    avg_score: "ציון ממוצע",
    active_teachers: "מורים פעילים",
    weekly_activity: "פעילות שבועית",
    completion_rate: "שיעור השלמה",
    completed: "הושלם",
    dropped: "נשרו",
    search_users: "חפש משתמשים...",
    add_user: "הוסף משתמש",
    email_notifications: "התראות אימייל",
    receive_reports: "קבל דוחות שבועיים על השימוש.",
    ai_model_config: "תצורת מודל AI",
    current_model: "משתמש כעת ב-Gemini 2.5 Flash.",
    change: "שנה",
    data_export: "ייצוא נתונים",
    download_logs: "הורד את כל יומני הסימולציה כ-CSV.",
    export: "ייצוא",
    ready_to_create: "מוכן ליצור?",
    review_scenario: "סקור את פרטי התרחיש שלך לפני השמירה.",
    vs_last_week: "לעומת שבוע שעבר",
    step_1_opening: "שלב 1: פתיחה",
    step_2_problem: "שלב 2: בעיה",
    step_3_data: "שלב 3: נתונים",
    step_4_analysis: "שלב 4: ניתוח",
    step_5_solutions: "שלב 5: פתרונות",
    step_6_simulation: "שלב 6: סימולציה",
    step_7_reflection: "שלב 7: רפלקציה",
    powered_by_siema: "מופעל על ידי Siema",
    demo_mode_warning: "זוהי סימולציית הדגמה המשתמשת בנתונים מדומה.",
    tooltip_dashboard: "סקירה כללית של הפעילויות והתרחישים שלך.",
    tooltip_analytics: "צפה במדדי ביצועים מפורטים.",
    tooltip_new_scenario: "צור תרחיש אימון חדש.",
    tooltip_users: "ניהול משתמשים במערכת.",
    tooltip_settings: "הגדרת העדפות מערכת.",
    tooltip_start_scenario: "התחל את מודול האימון הזה.",
    tooltip_edit_scenario: "ערוך תרחיש זה.",
    tooltip_delete_scenario: "מחק תרחיש זה.",
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
  updateScenario: (scenario: Scenario) => void;
  deleteScenario: (id: string) => void;
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

  updateScenario: (updatedScenario) => set((state) => ({
    scenarios: state.scenarios.map(s => s.id === updatedScenario.id ? updatedScenario : s)
  })),

  deleteScenario: (id) => set((state) => ({
    scenarios: state.scenarios.filter(s => s.id !== id)
  })),

  resetSimulation: () => set({ activeScenario: null, activeSession: null, currentView: 'teacher_dashboard', currentStep: 0 }),

  setLanguage: (lang) => set({ language: lang }),

  t: (key) => {
    const lang = get().language;
    return TRANSLATIONS[lang][key] || key;
  }
}));