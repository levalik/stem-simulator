import React, { useState, useMemo } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import { useStore } from '../../../../app/store';
import { ScenarioCard } from '../../../../entities/scenario';
import { Scenario } from '../../../../entities/scenario';
import { useNavigate } from '@tanstack/react-router';

interface ScenarioListProps {
    onEdit: (s: Scenario) => void;
    onDelete: (id: string) => void;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ onEdit, onDelete }) => {
    const { scenarios, t } = useStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDisciplines, setSelectedDisciplines] = useState<string[]>([]);
    const [isFilterOpen, setIsFilterOpen] = useState(true);
    const navigate = useNavigate({ from: '/admin' });

    const handleCreateClick = () => {
        navigate({ to: '/admin/scenarios/create' });
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
        const englishName = hebrewToEnglish[d] || d;
        const safeKey = englishName.toLowerCase().replace(/ /g, '_');
        const key = `discipline_${safeKey}`;
        const translated = t ? t(key as any) : null;
        return translated && !translated.startsWith('discipline_') ? translated : (hebrewToEnglish[d] ? d : englishName);
    };

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

    const filteredScenarios = scenarios.filter(s => {
        const matchesSearch = (
            (s.title || s.topic || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (s.opening?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
        );

        const scenarioDisciplines = s.disciplines || (s.category ? s.category.split('/').map(c => c.trim()) : []);
        const matchesDiscipline = selectedDisciplines.length === 0 ||
            selectedDisciplines.some(d => scenarioDisciplines.includes(d));

        return matchesSearch && matchesDiscipline;
    });

    const toggleDiscipline = (discipline: string) => {
        setSelectedDisciplines(prev =>
            prev.includes(discipline)
                ? prev.filter(d => d !== discipline)
                : [...prev, discipline]
        );
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('scenario_library')}</h2>
                    <p className="text-surface-500 text-sm mt-1">{t('manage_scenarios_desc') || 'Manage and organize your training modules'}</p>
                </div>
                <button onClick={handleCreateClick} className="w-full md:w-auto bg-surface-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-800 transition-colors shadow-lg shadow-surface-200 flex items-center justify-center gap-2">
                    <Plus size={18} /> {t('create_new')}
                </button>
            </div>

            {/* Smart Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-sm space-y-4">
                <div className="flex gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 rtl:left-auto rtl:right-3" size={20} />
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
                        className={`px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 font-medium ${isFilterOpen || selectedDisciplines.length > 0
                            ? 'bg-primary-50 border-primary-200 text-primary-700'
                            : 'bg-surface-50 border-surface-200 text-surface-600 hover:bg-surface-100'
                            }`}
                    >
                        <Filter size={18} />
                        <span className="hidden sm:inline">{t('filter')}</span>
                        {selectedDisciplines.length > 0 && (
                            <span className="bg-primary-600 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[1.25rem] text-center">
                                {selectedDisciplines.length}
                            </span>
                        )}
                    </button>
                </div>

                {/* Discipline Multi-Select Tags */}
                {(isFilterOpen || selectedDisciplines.length > 0) && (
                    <div className="pt-2 border-t border-surface-100 animate-slide-down">
                        <div className="flex flex-wrap gap-2">
                            {allDisciplines.map(discipline => (
                                <button
                                    key={discipline}
                                    onClick={() => toggleDiscipline(discipline)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${selectedDisciplines.includes(discipline)
                                        ? 'bg-primary-600 text-white border-primary-600 shadow-sm'
                                        : 'bg-white text-surface-600 border-surface-200 hover:border-surface-300 hover:bg-surface-50'
                                        }`}
                                >
                                    {getDisciplineLabel(discipline)}
                                </button>
                            ))}
                            {selectedDisciplines.length > 0 && (
                                <button
                                    onClick={() => setSelectedDisciplines([])}
                                    className="px-3 py-1.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0"
                                >
                                    <X size={14} /> {t('clear_all')}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="grid gap-4">
                {filteredScenarios.length > 0 ? (
                    filteredScenarios.map(s => (
                        <ScenarioCard
                            key={s.id}
                            scenario={s}
                            onEdit={onEdit}
                            onDelete={onDelete}
                            t={t}
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-surface-300">
                        <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4 text-surface-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-surface-900">{t('no_scenarios_found')}</h3>
                        <p className="text-surface-500">{t('try_adjusting_search')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
