import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useStore } from '../app/store';
import { useMemo, useState } from 'react';
import { Layout } from '../app/layouts/Layout';
import {
  PlayCircle, Clock, Tag, ArrowRight, ArrowLeft, Filter,
  BookOpen, Trophy, TrendingUp, CheckCircle2, Zap, Plus, X
} from 'lucide-react';

const TeacherDashboard = () => {
  const { scenarios, t, language, currentUser } = useStore();
  const navigate = useNavigate();
  const isRTL = language === 'he';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(true);

  // Extract all unique disciplines from scenarios
  const allDisciplines = useMemo(() => {
    const disciplines = new Set<string>();
    scenarios.forEach(s => {
      if (s.disciplines) {
        s.disciplines.forEach(d => disciplines.add(d));
      } else if (s.category) {
        s.category.split('/').forEach(c => disciplines.add(c.trim()));
      }
    });
    return Array.from(disciplines).sort();
  }, [scenarios]);

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter(s => {
      const matchesSearch = (
        (s.title || s.topic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (s.opening?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
      );

      const scenarioDisciplines = s.disciplines || (s.category ? s.category.split('/').map(c => c.trim()) : []);
      const matchesDiscipline = selectedDisciplines.length === 0 ||
        selectedDisciplines.some(d => scenarioDisciplines.includes(d));

      return matchesSearch && matchesDiscipline;
    });
  }, [scenarios, searchTerm, selectedDisciplines]);

  const toggleDiscipline = (discipline: string) => {
    setSelectedDisciplines(prev =>
      prev.includes(discipline)
        ? prev.filter(d => d !== discipline)
        : [...prev, discipline]
    );
  };

  const handleStartSimulation = (scenarioId: string) => {
    navigate({ to: '/simulation/$scenarioId', params: { scenarioId } } as any);
  };

  // Map Hebrew discipline names to English keys for translation
  const hebrewToEnglish: Record<string, string> = {
    'מתמטיקה': 'Mathematics',
    'פיזיקה': 'Physics',
    'כימיה': 'Chemistry',
    'ביולוגיה': 'Biology',
    'גיאוגרפיה': 'Geography',
    'הנדסה': 'Engineering',
    'אקולוגיה': 'Ecology',
    'תכנון עירוני': 'Urban Planning',
    'רפואה': 'Medicine',
    'קינמטיקה': 'Kinematics',
    'חקר ביצועים': 'Operations Research',
    'כלכלה': 'Economics',
    'ניהול': 'Management',
    'חינוך פיננסי': 'Financial Education',
    'מדעי הסביבה': 'Environmental Science',
    'איכות הסביבה': 'Environmental Quality',
    'חשבון': 'Arithmetic',
    'שברים': 'Fractions',
  };

  const getDisciplineLabel = (d: string) => {
    if (!d) return '';
    // If it's Hebrew, map to English first
    const englishName = hebrewToEnglish[d] || d;
    const safeKey = englishName.toLowerCase().replace(/ /g, '_');
    const key = `discipline_${safeKey}`;
    const translated = t ? t(key as any) : null;
    // Return translation if found, otherwise return original
    return translated && !translated.startsWith('discipline_') ? translated : (hebrewToEnglish[d] ? d : englishName);
  };

  const getGradeLabel = (grade?: string) => {
    if (!grade) return t('general') || 'General';
    // Handle "Grade X" format
    const gradeMatch = grade.match(/Grade\s*(\d+)/i);
    if (gradeMatch) {
      const gradeNum = gradeMatch[1];
      return `${t('grade') || 'Grade'} ${gradeNum}`;
    }
    // Handle Hebrew grade format
    const hebrewGradeMatch = grade.match(/כיתה\s*(\d+)/i);
    if (hebrewGradeMatch) {
      const gradeNum = hebrewGradeMatch[1];
      return `${t('grade') || 'Grade'} ${gradeNum}`;
    }
    return grade;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header with Welcome */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-surface-200/50">
          <div className="space-y-2 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-primary-200">
                {currentUser?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('welcome')}, {currentUser?.name?.split(' ')[0] || t('teacher')}</h2>
                <p className="text-surface-500">{t('manage_scenarios_desc') || "Manage and organize your lesson scenarios"}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate({ to: '/admin' })}
              className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
            >
              <Plus size={18} /> {t('create_new_scenario')}
            </button>
          </div>
        </div>

        {/* Smart Filter Bar */}
        <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-sm space-y-4 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 rtl:left-auto rtl:right-3" />
              <input
                type="text"
                placeholder={t('search_scenarios') || "Search scenarios..."}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`px-4 py-2.5 rounded-xl transition-all flex items-center gap-2 font-bold text-sm shadow-sm ${isFilterOpen || selectedDisciplines.length > 0
                ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white border border-primary-500'
                : 'bg-surface-100 border border-surface-200 text-surface-700 hover:bg-surface-200'
                }`}
            >
              <Filter size={16} />
              <span>{t('filter')}</span>
              {selectedDisciplines.length > 0 && (
                <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                  {selectedDisciplines.length}
                </span>
              )}
            </button>
          </div>

          {/* Discipline Multi-Select Tags */}
          {(isFilterOpen || selectedDisciplines.length > 0) && (
            <div className="pt-3 border-t border-surface-100 animate-slide-down">
              <div className="flex flex-wrap gap-2">
                {allDisciplines.map(discipline => (
                  <button
                    key={discipline}
                    onClick={() => toggleDiscipline(discipline)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${selectedDisciplines.includes(discipline)
                      ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                      : 'bg-surface-100 text-surface-600 hover:bg-surface-200 border border-surface-200'
                      }`}
                  >
                    {getDisciplineLabel(discipline)}
                  </button>
                ))}
                {selectedDisciplines.length > 0 && (
                  <button
                    onClick={() => setSelectedDisciplines([])}
                    className="px-3 py-1.5 rounded-full text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-all flex items-center gap-1 border border-red-200 ml-auto rtl:mr-auto rtl:ml-0"
                  >
                    <X size={14} /> {t('clear_all')}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario, index) => {
            const coverImage = scenario.tasks?.[0]?.coverImage || scenario.opening?.imageUrl;
            return (
              <div
                key={scenario.id}
                onClick={() => handleStartSimulation(scenario.id)}
                className="group bg-surface-50 rounded-3xl border border-surface-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden flex flex-col h-full animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${(index + 1) * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden bg-surface-200">
                  {/* Use first task image or placeholder */}
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={scenario.topic || scenario.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-surface-400">
                      <BookOpen size={48} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-sm text-surface-600 shadow-sm">
                      <Tag size={12} className="text-primary-500" /> {getGradeLabel(scenario.grade)}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {scenario.topic || scenario.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {scenario.disciplines?.slice(0, 3).map(d => (
                      <span key={d} className="text-xs bg-surface-100 text-surface-600 px-2 py-1 rounded-md border border-surface-200">
                        {getDisciplineLabel(d)}
                      </span>
                    ))}
                    {(scenario.disciplines?.length || 0) > 3 && (
                      <span className="text-xs bg-surface-100 text-surface-600 px-2 py-1 rounded-md border border-surface-200">
                        +{scenario.disciplines!.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-200">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-surface-600 border border-surface-200">
                      <Clock size={14} /> {scenario.duration} {t('minutes')}
                    </span>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-900 text-white text-sm font-bold transition-all shadow-lg shadow-surface-200 group-hover:bg-primary-600"
                    >
                      {t('view_plan') || "View Plan"} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredScenarios.length === 0 && (
          <div className="text-center py-20 bg-surface-50 rounded-3xl border border-dashed border-surface-300 animate-fade-in">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 text-surface-400 shadow-sm">
              <BookOpen size={32} />
            </div>
            <h3 className="text-lg font-bold text-surface-900">{t('no_scenarios_found')}</h3>
            <p className="text-surface-500">{t('try_adjusting_search')}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    // We'll check authentication in the component since we use Zustand
  },
  component: TeacherDashboard,
});
