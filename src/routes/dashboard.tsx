import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useStore } from '../app/store';
import { useMemo, useState } from 'react';
import { Layout } from '../app/layouts/Layout';
import {
  PlayCircle, Clock, Tag, ArrowRight, ArrowLeft, Filter,
  BookOpen, Trophy, TrendingUp, CheckCircle2, Zap, Plus
} from 'lucide-react';

const TeacherDashboard = () => {
  const { scenarios, t, language, currentUser } = useStore();
  const navigate = useNavigate();
  const isRTL = language === 'he';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(scenarios.map(s => s.category))];
    return ['all', ...cats];
  }, [scenarios]);

  // Filter scenarios
  const filteredScenarios = useMemo(() => {
    return scenarios.filter(s => {
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.opening.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [scenarios, selectedCategory, searchTerm]);

  // Mock progress data (in real app would come from store/API)
  const mockProgress = {
    completed: 2,
    inProgress: 1,
    total: scenarios.length,
  };

  const handleStartSimulation = (scenarioId: string) => {
    navigate({ to: '/simulation/$scenarioId', params: { scenarioId } } as any);
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
                <p className="text-surface-500">{t('select_training_module')}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-3">

            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-xl text-sm font-bold flex items-center gap-2">
              <BookOpen size={16} /> {scenarios.length} {t('active_modules')}
            </span>
          </div>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <div className="bg-surface-50 p-6 rounded-2xl border border-surface-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-emerald-100 text-emerald-600">
                <Trophy size={20} />
              </div>
              <span className="text-sm font-medium text-surface-500">{t('completed_scenarios')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-surface-900">{mockProgress.completed}</span>
              <span className="text-surface-400">/ {mockProgress.total}</span>
            </div>
          </div>

          <div className="bg-surface-50 p-6 rounded-2xl border border-surface-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-amber-100 text-amber-600">
                <Zap size={20} />
              </div>
              <span className="text-sm font-medium text-surface-500">{t('in_progress')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-surface-900">{mockProgress.inProgress}</span>
              <span className="text-surface-400">{t('active_modules')}</span>
            </div>
          </div>

          <div className="bg-surface-50 p-6 rounded-2xl border border-surface-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-secondary-100 text-secondary-600">
                <TrendingUp size={20} />
              </div>
              <span className="text-sm font-medium text-surface-500">{t('success_rate')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-surface-900">87%</span>
              <span className="text-emerald-500 text-sm font-medium">+5%</span>
            </div>
          </div>

          <div className="bg-surface-50 p-6 rounded-2xl border border-surface-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary-100 text-primary-600">
                <Clock size={20} />
              </div>
              <span className="text-sm font-medium text-surface-500">{t('avg_time')}</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-surface-900">18</span>
              <span className="text-surface-400">{t('mins')}</span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-surface-50 p-2 rounded-2xl border border-surface-100 shadow-sm animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="flex gap-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-surface-900 text-white' : 'text-surface-600 hover:bg-white hover:shadow-sm'}`}
              >
                {cat === 'all' ? t('all_categories') : cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder={t('search_scenarios')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
            />
            <Filter size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400" />
          </div>
        </div>

        {/* Scenarios Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario, index) => {
            // Mock status for each scenario
            const status = index < 2 ? 'completed' : index === 2 ? 'in_progress' : 'not_started';

            return (
              <div
                key={scenario.id}
                onClick={() => handleStartSimulation(scenario.id)}
                className="group bg-surface-50 rounded-3xl border border-surface-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all duration-300 overflow-hidden flex flex-col h-full animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={scenario.opening.imageUrl || "./placeholder.svg"}
                    alt={scenario.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 rtl:right-auto rtl:left-4">
                    {status === 'completed' && (
                      <span className="flex items-center gap-1 bg-emerald-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                        <CheckCircle2 size={12} /> {t('completed')}
                      </span>
                    )}
                    {status === 'in_progress' && (
                      <span className="flex items-center gap-1 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-lg">
                        <Zap size={12} /> {t('in_progress')}
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white/90 backdrop-blur-sm text-surface-600 shadow-sm">
                      <Tag size={12} className="text-primary-500" /> {scenario.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-surface-900 mb-2 group-hover:text-primary-600 transition-colors">{scenario.title}</h3>
                  <p className="text-surface-500 text-sm line-clamp-2 mb-4 flex-grow">{scenario.opening.description}</p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface-200">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-white text-surface-600 border border-surface-200">
                      <Clock size={14} /> {scenario.duration}
                    </span>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-900 text-white text-sm font-bold transition-all shadow-lg shadow-surface-200 group-hover:bg-primary-600"
                      title={t('tooltip_start_scenario')}
                    >
                      {status === 'completed' ? t('try_again') : status === 'in_progress' ? t('continue') : t('start')} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
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
