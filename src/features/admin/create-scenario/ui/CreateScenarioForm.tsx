import React, { useState, useEffect } from 'react';
import { Wand2, Save, ArrowRight, ArrowLeft, Image as ImageIcon, Loader2, Trash2, Check } from 'lucide-react';
import { useStore } from '../../../../app/store';
import { generateTaskContent, generateTaskSolution, generateImagePrompt } from '../../../../shared/api/geminiService';
import { Scenario, Discipline, GradeLevel, Task } from '../../../../entities/scenario/model/types';
import { Button, Input, TextArea } from '../../../../shared/ui/DesignSystem';
import { generateId } from '../../../../shared/utils/id';

const GRADES: GradeLevel[] = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6',
    'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'
];

const DISCIPLINES: Discipline[] = [
    'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering',
    'Ecology', 'Environmental Science', 'Geography', 'Economics', 'Medicine',
    'Kinematics', 'Operations Research', 'Urban Planning', 'Financial Education',
    'Arithmetic', 'Fractions', 'Technology in Education', 'Renewable Energy', 'Management'
];

const DURATIONS = [30, 45, 60, 90];

export const CreateScenarioForm = ({ onSave, onCancel, initialData }: { onSave: (s: Scenario) => void; onCancel: () => void; initialData?: Scenario | null }) => {
    const { t, language } = useStore();
    const isRTL = language === 'he' || language === 'ar';
    const [step, setStep] = useState(1);

    // Helper functions for translation
    const getGradeLabel = (g: GradeLevel) => {
        if (!g) return '';
        // 'Grade 1' -> 'grade_1'
        const parts = g.split(' ');
        if (parts.length < 2) return g;
        const key = `grade_${parts[1]}`;
        return t ? (t(key as any) || g) : g;
    };

    const getDisciplineLabel = (d: Discipline) => {
        if (!d) return '';
        // 'Computer Science' -> 'discipline_computer_science'
        const key = `discipline_${d.toLowerCase().replace(/ /g, '_')}`;
        return t ? (t(key as any) || d) : d;
    };

    // State
    const [topic, setTopic] = useState(initialData?.topic || initialData?.title || '');
    const [grade, setGrade] = useState<GradeLevel>(initialData?.grade || 'Grade 9');
    const [duration, setDuration] = useState<number>(initialData?.duration ? Number(initialData.duration) : 45);
    const [selectedDisciplines, setSelectedDisciplines] = useState<Discipline[]>(initialData?.disciplines || []);
    const [tasks, setTasks] = useState<Task[]>(initialData?.tasks || []);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(initialData?.tasks?.[0]?.id || null);

    // Loading states
    const [generatingTaskFor, setGeneratingTaskFor] = useState<string | null>(null); // discipline
    const [solvingTaskFor, setSolvingTaskFor] = useState<string | null>(null); // discipline
    const [generatingImageFor, setGeneratingImageFor] = useState<string | null>(null); // discipline

    useEffect(() => {
        if (tasks.length === 0) {
            setActiveTaskId(null);
            return;
        }

        if (!activeTaskId || !tasks.some(task => task.id === activeTaskId)) {
            setActiveTaskId(tasks[0].id);
        }
    }, [tasks, activeTaskId]);

    // Initialize tasks when disciplines change (only if adding)
    useEffect(() => {
        if (step === 1) {
            // We don't update tasks automatically here to avoid overwriting user data if they go back and forth
            // But we will sync them when moving to step 2
        }
    }, [selectedDisciplines]);

    const handleNext = () => {
        if (step === 1) {
            if (!topic || selectedDisciplines.length === 0) {
                alert(t('please_fill_required') || "Please fill all required fields");
                return;
            }

            // Sync tasks with disciplines
            const newTasks = [...tasks];
            // Remove tasks for deselected disciplines
            const validTasks = newTasks.filter(t => selectedDisciplines.includes(t.discipline));

            // Add new tasks for newly selected disciplines
            selectedDisciplines.forEach(d => {
                if (!validTasks.find(t => t.discipline === d)) {
                    validTasks.push({
                        id: generateId(),
                        discipline: d,
                        description: '',
                        solution: '',
                        coverImage: ''
                    });
                }
            });

            setTasks(validTasks);
            setStep(2);
        }
    };

    const handleGenerateTask = async (taskIndex: number) => {
        if (taskIndex < 0 || taskIndex >= tasks.length) return;
        const task = tasks[taskIndex];
        setGeneratingTaskFor(task.discipline);
        try {
            const result = await generateTaskContent(topic, grade, task.discipline);
            if (result) {
                setTasks(prev => {
                    if (taskIndex < 0 || taskIndex >= prev.length) return prev;
                    const updated = [...prev];
                    updated[taskIndex] = {
                        ...updated[taskIndex],
                        description: result.description,
                        solution: result.solution
                    };
                    return updated;
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setGeneratingTaskFor(null);
        }
    };

    const handleSolveTask = async (taskIndex: number) => {
        if (taskIndex < 0 || taskIndex >= tasks.length) return;
        const task = tasks[taskIndex];
        if (!task.description) return;

        setSolvingTaskFor(task.discipline);
        try {
            const solution = await generateTaskSolution(topic, grade, task.discipline, task.description);
            if (solution) {
                setTasks(prev => {
                    if (taskIndex < 0 || taskIndex >= prev.length) return prev;
                    const updated = [...prev];
                    updated[taskIndex] = { ...updated[taskIndex], solution };
                    return updated;
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSolvingTaskFor(null);
        }
    };

    const handleGenerateImage = async (taskIndex: number) => {
        if (taskIndex < 0 || taskIndex >= tasks.length) return;
        const task = tasks[taskIndex];
        if (!task.description) return;

        setGeneratingImageFor(task.discipline);
        try {
            // In a real app, this would call an image generation API and return a URL.
            // Here we will generate a prompt and maybe use a placeholder service with the prompt keywords.
            const prompt = await generateImagePrompt(topic, task.discipline, task.description);
            if (prompt) {
                // Using a placeholder service for now as we don't have a real image gen API connected to the frontend
                // In a real scenario, you'd send this prompt to DALL-E / Midjourney API
                const encodedPrompt = encodeURIComponent(prompt.substring(0, 50)); // Truncate for URL
                const imageUrl = `https://placehold.co/600x400?text=${encodedPrompt}`;

                setTasks(prev => {
                    if (taskIndex < 0 || taskIndex >= prev.length) return prev;
                    const updated = [...prev];
                    updated[taskIndex] = { ...updated[taskIndex], coverImage: imageUrl };
                    return updated;
                });
            }
        } catch (e) {
            console.error(e);
        } finally {
            setGeneratingImageFor(null);
        }
    };

    const handleSave = () => {
        const scenario: Scenario = {
            id: initialData?.id || generateId(),
            topic,
            grade,
            duration,
            disciplines: selectedDisciplines,
            tasks,
            // Legacy fields - keep them empty or minimal to satisfy type if needed, 
            // but we marked them optional so it should be fine.
        };
        onSave(scenario);
    };

    const toggleDiscipline = (d: Discipline) => {
        if (selectedDisciplines.includes(d)) {
            setSelectedDisciplines(selectedDisciplines.filter(item => item !== d));
        } else {
            setSelectedDisciplines([...selectedDisciplines, d]);
        }
    };

    const activeTaskIndex = activeTaskId ? tasks.findIndex(task => task.id === activeTaskId) : (tasks.length ? 0 : -1);
    const activeTask = activeTaskIndex >= 0 ? tasks[activeTaskIndex] : null;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden flex flex-col min-h-[600px]">
            {/* Header */}
            <div className="p-8 border-b border-surface-100 bg-surface-50/50 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-extrabold text-surface-900">
                        {initialData ? t('edit_scenario') : t('create_new_scenario')}
                    </h2>
                    <p className="text-surface-500 text-sm">
                        {step === 1 ? t('scenario_initialization') : t('task_generation')}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full transition-colors ${step >= 1 ? 'bg-primary-600' : 'bg-surface-200'}`} />
                    <div className={`w-8 h-1 rounded-full transition-colors ${step >= 2 ? 'bg-primary-600' : 'bg-surface-200'}`} />
                    <div className={`w-3 h-3 rounded-full transition-colors ${step >= 2 ? 'bg-primary-600' : 'bg-surface-200'}`} />
                </div>
            </div>

            {/* Content */}
            <div className="p-8 flex-1 overflow-y-auto">
                {step === 1 && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Topic */}
                        <div>
                            <label className="block text-sm font-bold text-surface-700 mb-2">
                                {t('topic')} <span className="text-red-500">*</span>
                            </label>
                            <Input
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder={t('enter_topic_placeholder') || "e.g., Sustainable Energy in Smart Cities"}
                                className="text-lg"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Grade */}
                            <div>
                                <label className="block text-sm font-bold text-surface-700 mb-2">
                                    {t('grade')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={grade}
                                    onChange={(e) => setGrade(e.target.value as GradeLevel)}
                                    className={`w-full p-3 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                                >
                                    {GRADES.map(g => (
                                        <option key={g} value={g}>{getGradeLabel(g)}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Duration */}
                            <div>
                                <label className="block text-sm font-bold text-surface-700 mb-2">
                                    {t('duration')} <span className="text-red-500">*</span>
                                </label>
                                <select
                                    value={duration}
                                    onChange={(e) => setDuration(Number(e.target.value))}
                                    className={`w-full p-3 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none ${isRTL ? 'text-right' : 'text-left'}`}
                                >
                                    {DURATIONS.map(d => (
                                        <option key={d} value={d}>{d} {t('minutes')}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Disciplines */}
                        <div>
                            <label className="block text-sm font-bold text-surface-700 mb-3">
                                {t('disciplines')} <span className="text-red-500">*</span>
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {DISCIPLINES.map(d => (
                                    <button
                                        key={d}
                                        onClick={() => toggleDiscipline(d)}
                                        className={`p-3 rounded-xl border transition-all text-left flex items-center justify-between group ${selectedDisciplines.includes(d)
                                            ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                                            : 'border-surface-200 bg-white text-surface-600 hover:border-primary-200 hover:bg-surface-50'
                                            }`}
                                    >
                                        <span className="font-medium">{getDisciplineLabel(d)}</span>
                                        {selectedDisciplines.includes(d) && (
                                            <Check size={16} className="text-primary-600" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        {tasks.length > 0 ? (
                            <>
                                <div className="flex flex-wrap gap-3 border border-surface-200 rounded-2xl p-3 bg-surface-50 overflow-x-auto">
                                    {tasks.map(task => {
                                        const isActive = task.id === activeTaskId;
                                        return (
                                            <button
                                                key={task.id}
                                                onClick={() => setActiveTaskId(task.id)}
                                                className={`flex-1 min-w-[150px] px-4 py-2 rounded-xl border text-left transition-all ${isActive
                                                    ? 'bg-surface-900 text-white border-surface-900 shadow-md shadow-surface-400'
                                                    : 'bg-white text-surface-600 border-surface-200 hover:border-surface-300'}
                                                `}
                                            >
                                                <p className="text-[11px] uppercase tracking-wider font-bold text-surface-400 mb-1">
                                                    {(t('task_generation') || 'Task')} #{tasks.indexOf(task) + 1}
                                                </p>
                                                <p className="text-base font-semibold">{getDisciplineLabel(task.discipline)}</p>
                                            </button>
                                        );
                                    })}
                                </div>

                                {activeTask && (
                                    <div className="bg-white border border-surface-200 rounded-2xl shadow-sm overflow-hidden transition-all hover:shadow-md">
                                        <div className="bg-surface-50 px-6 py-4 border-b border-surface-100 flex flex-wrap justify-between items-center gap-4">
                                            <h3 className="font-bold text-lg text-surface-800 flex items-center gap-2">
                                                <span className="w-2 h-8 bg-primary-500 rounded-full"></span>
                                                {getDisciplineLabel(activeTask.discipline)}
                                            </h3>
                                            <div className="flex gap-2 flex-wrap">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleGenerateTask(activeTaskIndex)}
                                                    isLoading={generatingTaskFor === activeTask.discipline}
                                                    leftIcon={<Wand2 size={14} />}
                                                    className="text-purple-600 hover:bg-purple-50"
                                                    disabled={activeTaskIndex < 0}
                                                >
                                                    {t('ai_fill_task')}
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => handleSolveTask(activeTaskIndex)}
                                                    isLoading={solvingTaskFor === activeTask.discipline}
                                                    disabled={activeTaskIndex < 0 || !activeTask.description}
                                                    leftIcon={<Wand2 size={14} />}
                                                    className="text-purple-600 hover:bg-purple-50"
                                                >
                                                    {t('ai_solve')}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-6 grid gap-6">
                                            <div>
                                                <label className="block text-sm font-semibold text-surface-700 mb-2">
                                                    {t('task_problem')}
                                                </label>
                                                <TextArea
                                                    value={activeTask.description}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setTasks(prev => {
                                                            if (activeTaskIndex < 0 || activeTaskIndex >= prev.length) return prev;
                                                            const updated = [...prev];
                                                            updated[activeTaskIndex] = { ...updated[activeTaskIndex], description: value };
                                                            return updated;
                                                        });
                                                    }}
                                                    rows={4}
                                                    placeholder={t('task_description_placeholder') || "Describe the task..."}
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-semibold text-surface-700">
                                                        {t('solution')} <span className="text-xs font-normal text-surface-400">({t('teacher_only')})</span>
                                                    </label>
                                                </div>
                                                <TextArea
                                                    value={activeTask.solution}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        setTasks(prev => {
                                                            if (activeTaskIndex < 0 || activeTaskIndex >= prev.length) return prev;
                                                            const updated = [...prev];
                                                            updated[activeTaskIndex] = { ...updated[activeTaskIndex], solution: value };
                                                            return updated;
                                                        });
                                                    }}
                                                    rows={3}
                                                    className="bg-yellow-50/50 border-yellow-200 focus:border-yellow-400 focus:ring-yellow-400/20"
                                                    placeholder={t('solution_placeholder') || "The expected solution..."}
                                                />
                                            </div>

                                            <div>
                                                <div className="flex justify-between items-center mb-2">
                                                    <label className="block text-sm font-semibold text-surface-700">
                                                        {t('cover_image')}
                                                    </label>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => alert("Upload feature coming soon")}
                                                            leftIcon={<ImageIcon size={14} />}
                                                            className="text-surface-600 hover:bg-surface-50 h-8"
                                                        >
                                                            {t('upload') || "Upload"}
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={() => handleGenerateImage(activeTaskIndex)}
                                                            isLoading={generatingImageFor === activeTask.discipline}
                                                            disabled={activeTaskIndex < 0 || !activeTask.description}
                                                            leftIcon={<Wand2 size={14} />}
                                                            className="text-blue-600 hover:bg-blue-50 h-8"
                                                        >
                                                            {t('generate_image')}
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div className="flex gap-4 items-start">
                                                    <div className="flex-1">
                                                        <Input
                                                            value={activeTask.coverImage || ''}
                                                            onChange={(e) => {
                                                                const value = e.target.value;
                                                                setTasks(prev => {
                                                                    if (activeTaskIndex < 0 || activeTaskIndex >= prev.length) return prev;
                                                                    const updated = [...prev];
                                                                    updated[activeTaskIndex] = { ...updated[activeTaskIndex], coverImage: value };
                                                                    return updated;
                                                                });
                                                            }}
                                                            placeholder={t('image_url_placeholder') || "Enter image URL..."}
                                                        />
                                                    </div>
                                                    {activeTask.coverImage && (
                                                        <div className="w-24 h-24 rounded-lg border border-surface-200 overflow-hidden bg-surface-50 shrink-0">
                                                            <img src={activeTask.coverImage} alt="Cover" className="w-full h-full object-cover" />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white border border-dashed border-surface-300 rounded-3xl p-10 text-center">
                                <p className="text-surface-500 font-medium">
                                    {'No tasks available. Please select at least one discipline in Step 1.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-surface-100 bg-surface-50 flex justify-between items-center">
                <Button
                    variant="ghost"
                    onClick={() => step === 1 ? onCancel() : setStep(1)}
                    leftIcon={step === 1 ? undefined : (isRTL ? <ArrowRight size={18} /> : <ArrowLeft size={18} />)}
                >
                    {step === 1 ? t('cancel') : t('back')}
                </Button>

                {step === 1 ? (
                    <Button
                        onClick={handleNext}
                        rightIcon={isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                        disabled={!topic || selectedDisciplines.length === 0}
                    >
                        {t('next_step')}
                    </Button>
                ) : (
                    <Button
                        onClick={handleSave}
                        variant="secondary"
                        leftIcon={<Save size={18} />}
                    >
                        {t('save_scenario')}
                    </Button>
                )}
            </div>
        </div>
    );
};
