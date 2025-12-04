import React, { useEffect, useState } from 'react';
import { Scenario } from '../entities/scenario/model/types';
import { useStore } from '../app/store';
import { Clock, GraduationCap, BookOpen, CheckCircle, HelpCircle } from 'lucide-react';

export const LessonPlanView = ({ scenario }: { scenario: Scenario }) => {
    const { t, language } = useStore();
    const isRTL = language === 'he' || language === 'ar';

    // Helper functions for translation
    const getGradeLabel = (g: string) => {
        if (!g) return '';
        const parts = g.split(' ');
        if (parts.length < 2) return g;
        const key = `grade_${parts[1]}`;
        return t ? (t(key as any) || g) : g;
    };

    const getDisciplineLabel = (d: string) => {
        if (!d) return '';
        // Try to find a translation for the key constructed from the English name
        // If 'd' is already Hebrew (e.g. "פיזיקה"), we might need a reverse lookup or just return it if no key matches.
        // However, the best practice is to ensure 'd' is always the English key (e.g. "Physics").
        // If 'd' is "Physics", key becomes "discipline_physics".
        // If 'd' is "פיזיקה", key becomes "discipline_פיזיקה", which might not exist.

        const safeKey = d.toLowerCase().replace(/ /g, '_');
        const key = `discipline_${safeKey}`;

        // If translation exists, return it. 
        // If not, and the input looks like a raw key (English), try to return it.
        // If the input is already localized (e.g. Hebrew), returning it is fine as a fallback.
        return t ? (t(key as any) || d) : d;
    };

    // Adapter for legacy scenarios
    const displayTasks = scenario.tasks && scenario.tasks.length > 0 ? scenario.tasks : [
        {
            id: 'legacy_task',
            discipline: scenario.category ? scenario.category.split('/')[0].trim() : (t('disciplines') || 'General'),
            description: [
                scenario.problem?.text,
                scenario.problem?.context,
                scenario.data?.description
            ].filter(Boolean).join('\n\n'),
            solution: scenario.solutions?.options?.find(o => o.correct)?.text ||
                scenario.solutions?.options?.map(o => o.text).join('\n') ||
                t('no_solution'),
            coverImage: scenario.opening?.imageUrl
        }
    ];

    const displayDisciplines = scenario.disciplines && scenario.disciplines.length > 0
        ? scenario.disciplines
        : (scenario.category ? scenario.category.split('/').map(d => d.trim()) : []);

    const [activeTaskIndex, setActiveTaskIndex] = useState(0);

    useEffect(() => {
        if (activeTaskIndex >= displayTasks.length) {
            setActiveTaskIndex(Math.max(displayTasks.length - 1, 0));
        }
    }, [displayTasks.length, activeTaskIndex]);

    const activeTask = displayTasks[activeTaskIndex] || displayTasks[0];

    return (
        <div className="max-w-5xl mx-auto pb-20 animate-fade-in">
            {/* Header */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-surface-200 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>

                <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-surface-900 mb-4 leading-tight">
                                {scenario.topic || scenario.title}
                            </h1>
                            <div className="flex flex-wrap gap-3 text-surface-600">
                                <div className="flex items-center gap-2 bg-surface-100 px-4 py-2 rounded-xl text-sm font-bold">
                                    <GraduationCap size={18} className="text-primary-600" />
                                    <span>{getGradeLabel(scenario.grade || (t('grade') + ' 9'))}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-surface-100 px-4 py-2 rounded-xl text-sm font-bold">
                                    <Clock size={18} className="text-primary-600" />
                                    <span>{scenario.duration} {t('minutes')}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-surface-100 px-4 py-2 rounded-xl text-sm font-bold">
                                    <BookOpen size={18} className="text-primary-600" />
                                    <span>{displayDisciplines.length} {t('disciplines')}</span>
                                </div>
                            </div>
                        </div>

                        {/* Placeholder for future "Start" action if needed, or just visual balance */}
                        <div className="hidden md:block">
                            <div className="w-16 h-16 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600">
                                <BookOpen size={32} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 text-blue-900">
                        <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                            <CheckCircle size={20} className="text-blue-600" />
                            {t('teacher_guide_mode')}
                        </h3>
                        <p className="opacity-90 leading-relaxed">
                            {t('teacher_guide_desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tasks Grid */}
            <div className="space-y-6">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl font-bold text-surface-900 px-2">{t('task_generation')}</h2>
                    <div className="flex flex-wrap gap-3 bg-white rounded-3xl border border-surface-200 p-4 overflow-x-auto">
                        {displayTasks.map((task, index) => {
                            const isActive = index === activeTaskIndex;
                            return (
                                <button
                                    key={task.id || index}
                                    onClick={() => setActiveTaskIndex(index)}
                                    className={`px-4 py-2 rounded-2xl border transition-all text-left min-w-[140px] ${isActive
                                        ? 'bg-surface-900 text-white border-surface-900 shadow-lg shadow-surface-400'
                                        : 'bg-surface-50 text-surface-600 border-surface-200 hover:border-primary-200'}`}
                                >
                                    <span className="block text-[11px] uppercase tracking-wider font-bold text-surface-400">
                                        {(t('task_generation') || 'Task')} #{index + 1}
                                    </span>
                                    <span className="text-base font-semibold">{getDisciplineLabel(task.discipline)}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {activeTask && (
                    <div className="bg-white rounded-3xl shadow-sm border border-surface-200 overflow-hidden transition-all hover:shadow-md group">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/3 min-h-[250px] bg-surface-100 relative overflow-hidden">
                                {activeTask.coverImage ? (
                                    <img
                                        src={activeTask.coverImage}
                                        alt={activeTask.discipline}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-surface-300 bg-surface-50">
                                        <BookOpen size={64} className="opacity-20" />
                                    </div>
                                )}
                                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm font-bold text-surface-900 text-sm border border-surface-100/50">
                                    {getDisciplineLabel(activeTask.discipline)}
                                </div>
                            </div>

                            <div className="flex-1 p-8 flex flex-col gap-8">
                                <div>
                                    <div className="flex items-center gap-3 text-surface-900 font-bold text-xl mb-4">
                                        <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                                            <HelpCircle size={20} />
                                        </div>
                                        {t('task_problem')}
                                    </div>
                                    <div className="text-surface-700 leading-relaxed text-lg whitespace-pre-line">
                                        {activeTask.description || t('no_description') || "No description provided."}
                                    </div>
                                </div>

                                <div className="h-px bg-surface-100 w-full"></div>

                                <div>
                                    <div className="flex items-center gap-3 text-green-700 font-bold text-xl mb-4">
                                        <div className="bg-green-100 p-2 rounded-xl text-green-600">
                                            <CheckCircle size={20} />
                                        </div>
                                        {t('solution')}
                                        <span className="text-sm font-medium bg-green-100 px-2 py-0.5 rounded-md text-green-700">
                                            {t('teacher_only')}
                                        </span>
                                    </div>
                                    <div className="text-surface-700 leading-relaxed bg-green-50/50 p-6 rounded-2xl border border-green-100/50 text-lg whitespace-pre-line">
                                        {activeTask.solution || t('no_solution') || "No solution provided."}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
