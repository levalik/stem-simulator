import React, { useState, useEffect } from 'react';
import { useStore } from '../store';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from 'recharts';
import { ArrowRight, ArrowLeft, CheckCircle, AlertTriangle, Play, BrainCircuit, Activity, LineChart as ChartIcon, MessageSquare, Lightbulb, Download, RotateCcw, HelpCircle } from 'lucide-react';
import { analyzeAnalysisResponse, analyzeJustification } from '../services/geminiService';
import { Tooltip } from './Tooltip';

// --- Shared Components ---

const StepHeader = ({ title, step, subtitle, helpText }: { title: string; step: number; subtitle?: string; helpText?: string }) => {
    const { t, language } = useStore();
    return (
        <div className="flex flex-col gap-2 mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 text-violet-600 font-bold tracking-wider text-xs uppercase rtl:flex-row-reverse">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-violet-100 text-violet-700">
                    {step}
                </span>
                <span>{t('step')} {step} {t('of')} 6</span>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{title}</h2>
                {helpText && <Tooltip content={helpText} />}
            </div>
            {subtitle && <p className="text-zinc-500 max-w-2xl">{subtitle}</p>}
        </div>
    );
};

const NavButtons = ({ onNext, onPrev, disabled = false, nextLabel }: { onNext: () => void; onPrev: () => void; disabled?: boolean; nextLabel?: string }) => {
    const { t, language } = useStore();
    const isRTL = language === 'he';

    return (
        <div className="flex justify-between items-center pt-8 border-t border-zinc-100 mt-10">
            <button
                onClick={onPrev}
                className="flex items-center text-zinc-500 hover:text-zinc-800 px-4 py-2 font-medium transition-colors text-sm gap-2"
            >
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {t('back')}
            </button>
            <button
                onClick={onNext}
                disabled={disabled}
                className={`flex items-center bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-zinc-200 gap-2 ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:bg-violet-600 hover:shadow-violet-200 hover:-translate-y-0.5'}`}
            >
                {nextLabel || t('continue')}
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
        </div>
    );
};

const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`bg-white rounded-2xl border border-zinc-100 shadow-sm ${className}`}>
        {children}
    </div>
);

// --- Steps ---

// Step 0: Opening
const OpeningStep = () => {
    const { activeScenario, nextStep, t } = useStore();
    if (!activeScenario) return null;

    return (
        <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="relative h-[400px] w-full rounded-3xl overflow-hidden shadow-2xl mb-10 group">
                <img
                    src={activeScenario.opening.imageUrl || "https://picsum.photos/800/400"}
                    alt="Scenario"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent flex flex-col justify-end p-10">
                    <div className="space-y-4">
                        <span className="inline-flex items-center gap-1.5 bg-violet-500/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            <Activity size={12} /> {activeScenario.category}
                        </span>
                        <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl">{activeScenario.title}</h1>
                        <div className="flex items-center text-zinc-300 text-sm font-medium">
                            <Activity size={16} className="mx-2 text-violet-400" /> {t('estimated_duration')}: {activeScenario.duration}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="prose prose-lg text-zinc-600">
                        <h3 className="text-zinc-900 font-bold mb-2 text-lg flex items-center gap-2">
                            {t('mission_brief')}
                            <Tooltip content="Overview of the scenario and your role." />
                        </h3>
                        <p className="leading-relaxed">{activeScenario.opening.description}</p>
                    </div>
                </div>
                <div className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100 h-fit">
                    <h4 className="font-bold text-zinc-900 mb-4 flex items-center gap-2">
                        <ChartIcon size={18} className="text-violet-600" /> {t('learning_goals')}
                    </h4>
                    <ul className="space-y-3 text-sm text-zinc-600">
                        <li className="flex gap-2">
                            <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" /> {t('data_analysis')}
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" /> {t('critical_analysis')}
                        </li>
                        <li className="flex gap-2">
                            <CheckCircle size={16} className="text-teal-500 shrink-0 mt-0.5" /> {t('decide')}
                        </li>
                    </ul>

                    <button onClick={nextStep} className="w-full mt-8 bg-violet-600 text-white px-6 py-3.5 rounded-xl font-bold shadow-lg shadow-violet-200 hover:bg-violet-700 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                        {t('start_simulation')} <Play size={18} fill="currentColor" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// Step 1: Problem
const ProblemStep = () => {
    const { activeScenario, nextStep, prevStep, t } = useStore();
    if (!activeScenario) return null;

    return (
        <div className="max-w-5xl mx-auto">
            <StepHeader
                title={t('mission_brief')}
                step={1}
                helpText="Understand the core problem you need to solve."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <Card className="p-8 border-s-4 border-s-violet-500">
                        <h3 className="text-2xl font-bold text-zinc-800 mb-4">{t('core_problem')}</h3>
                        <p className="text-lg text-zinc-600 leading-relaxed">{activeScenario.problem.text}</p>
                    </Card>

                    <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 flex gap-4">
                        <div className="bg-amber-100 p-2 rounded-lg h-fit text-amber-600 shrink-0">
                            <Lightbulb size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-amber-800 mb-1">{t('contextual_info')}</h4>
                            <p className="text-amber-900/80 text-sm leading-relaxed">{activeScenario.problem.context}</p>
                        </div>
                    </div>
                </div>

                <div className="h-full min-h-[300px] relative rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src={activeScenario.problem.imageUrl || "https://picsum.photos/600/600"}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Problem Context"
                    />
                </div>
            </div>

            <NavButtons onNext={nextStep} onPrev={prevStep} />
        </div>
    );
};

// Step 2: Data
const DataStep = () => {
    const { activeScenario, nextStep, prevStep, t } = useStore();
    if (!activeScenario) return null;

    const renderChart = () => {
        const type = activeScenario.data.chartType;
        const data = activeScenario.data.chartData;

        if (type === 'pie') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={['#8b5cf6', '#06b6d4', '#ec4899', '#f59e0b'][index % 4]} />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '12px' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )
        }

        if (type === 'line') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e4e7" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#71717a' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px' }} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            )
        }

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} maxBarSize={60}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#8b5cf6', '#6366f1', '#ec4899', '#14b8a6'][index % 4]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <StepHeader title={t('data_analysis')} step={2} helpText="Analyze the data to identify trends and patterns." />

            <Card className="p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-zinc-800 flex items-center gap-2">
                        <Activity className="text-violet-500" />
                        {activeScenario.data.description}
                    </h3>
                </div>

                <div className="h-[400px] w-full bg-zinc-50/50 rounded-xl p-4 border border-zinc-100">
                    {renderChart()}
                </div>
            </Card>

            <NavButtons onNext={nextStep} onPrev={prevStep} />
        </div>
    );
};

// Step 3: Analysis
const AnalysisStep = () => {
    const { activeScenario, activeSession, updateSessionResponse, nextStep, prevStep, t } = useStore();
    const [feedback, setFeedback] = useState<string | null>(activeSession?.responses.analysisFeedback || null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    if (!activeScenario || !activeSession) return null;

    const handleBlur = async (idx: number, question: string) => {
        const answer = activeSession.responses.analysis[idx];
        if (answer && answer.length > 10 && !feedback) {
            setIsAnalyzing(true);
            const aiFeedback = await analyzeAnalysisResponse(question, answer, activeScenario.analysis.keyTerms);
            setFeedback(aiFeedback);
            updateSessionResponse('analysisFeedback', aiFeedback);
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <StepHeader title={t('critical_analysis')} step={3} helpText="Answer the questions based on your data analysis." />

            <div className="grid gap-8">
                <div className="space-y-6">
                    {activeScenario.analysis.questions.map((q, idx) => (
                        <Card key={idx} className="p-8 transition-all focus-within:ring-2 focus-within:ring-violet-100 focus-within:border-violet-300">
                            <label className="block text-lg font-bold text-zinc-800 mb-4 flex gap-3">
                                <span className="bg-zinc-100 text-zinc-500 w-8 h-8 flex items-center justify-center rounded-lg text-sm shrink-0">{idx + 1}</span>
                                {q}
                                <Tooltip content="Type your detailed answer here. AI will provide feedback." />
                            </label>
                            <textarea
                                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 text-zinc-700 placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all min-h-[140px] resize-y"
                                placeholder="..."
                                value={activeSession.responses.analysis[idx] || ''}
                                onChange={(e) => updateSessionResponse('analysis', { [idx]: e.target.value })}
                                onBlur={() => handleBlur(idx, q)}
                            />
                        </Card>
                    ))}
                </div>

                <div className="min-h-[120px]">
                    {isAnalyzing && (
                        <div className="flex items-center gap-3 text-violet-600 animate-pulse bg-violet-50 p-4 rounded-xl w-fit">
                            <BrainCircuit size={20} />
                            <span className="font-medium">{t('analyzing')}</span>
                        </div>
                    )}

                    {feedback && (
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100 p-6 rounded-2xl flex gap-4 animate-fade-in shadow-sm">
                            <div className="bg-white p-2.5 rounded-xl shadow-sm h-fit text-violet-600 shrink-0">
                                <BrainCircuit size={24} />
                            </div>
                            <div>
                                <h4 className="font-bold text-violet-900 mb-1">{t('ai_feedback')}</h4>
                                <p className="text-violet-800/90 leading-relaxed">{feedback}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <NavButtons onNext={nextStep} onPrev={prevStep} disabled={Object.keys(activeSession.responses.analysis).length === 0} />
        </div>
    );
};

// Step 4: Solutions
const SolutionsStep = () => {
    const { activeScenario, activeSession, updateSessionResponse, nextStep, prevStep, t, language } = useStore();
    const [justification, setJustification] = useState(activeSession?.responses.solutionJustification || '');
    const [selectedId, setSelectedId] = useState<string | null>(activeSession?.responses.solutionId || null);

    if (!activeScenario) return null;

    const handleSelect = (id: string) => {
        setSelectedId(id);
        updateSessionResponse('solutionId', id);
    };

    const handleJustificationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setJustification(e.target.value);
        updateSessionResponse('solutionJustification', e.target.value);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <StepHeader title={t('proposed_solution')} step={4} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {activeScenario.solutions.options.map((opt, idx) => (
                    <div
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`cursor-pointer group relative p-6 rounded-2xl border-2 transition-all duration-300 h-full flex flex-col ${selectedId === opt.id
                                ? 'border-violet-600 bg-violet-50/50 shadow-xl shadow-violet-100'
                                : 'border-zinc-100 bg-white hover:border-violet-300 hover:shadow-lg hover:-translate-y-1'
                            }`}
                    >
                        <div className="mb-4">
                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${selectedId === opt.id ? 'bg-violet-600 text-white' : 'bg-zinc-100 text-zinc-500 group-hover:bg-violet-100 group-hover:text-violet-600'}`}>
                                {String.fromCharCode(65 + idx)}
                            </span>
                        </div>
                        <h4 className="font-bold text-zinc-900 mb-2 text-lg">{t('option')} {idx + 1}</h4>
                        <p className="text-sm text-zinc-600 leading-relaxed">{opt.text}</p>

                        {selectedId === opt.id && (
                            <div className={`absolute top-4 text-violet-600 ${language === 'he' ? 'left-4' : 'right-4'}`}>
                                <CheckCircle size={24} fill="currentColor" className="text-white" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {selectedId && (
                <div className="animate-fade-in-up">
                    <Card className="p-8 border-violet-100">
                        <div className="flex items-center gap-3 mb-4">
                            <MessageSquare className="text-violet-500" size={24} />
                            <label className="text-xl font-bold text-zinc-800">{t('justify_choice')}</label>
                        </div>
                        <p className="text-zinc-500 text-sm mb-4">Why is this the optimal solution given the constraints? (Required)</p>
                        <textarea
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all min-h-[150px]"
                            placeholder="..."
                            value={justification}
                            onChange={handleJustificationChange}
                        />
                    </Card>
                </div>
            )}

            <NavButtons onNext={nextStep} onPrev={prevStep} disabled={!selectedId || !justification} nextLabel={t('run_simulation')} />
        </div>
    );
};

// Step 5: Simulation
const SimulationStep = () => {
    const { activeScenario, activeSession, updateSessionResponse, nextStep, t, language } = useStore();
    const [loading, setLoading] = useState(true);
    const [aiAnalysis, setAiAnalysis] = useState<string | null>(activeSession?.responses.solutionFeedback || null);
    const isRTL = language === 'he';

    if (!activeScenario || !activeSession) return null;

    const selectedOption = activeScenario.solutions.options.find(o => o.id === activeSession.responses.solutionId);
    const result = selectedOption ? activeScenario.simulation.results[selectedOption.resultId] : null;

    useEffect(() => {
        const runSimulation = async () => {
            if (!activeSession.responses.solutionFeedback && selectedOption) {
                await new Promise(r => setTimeout(r, 2000)); // Increased delay for dramatic effect

                const feedback = await analyzeJustification(
                    selectedOption.text,
                    activeSession.responses.solutionJustification || '',
                    activeScenario.problem.context
                );
                setAiAnalysis(feedback);
                updateSessionResponse('solutionFeedback', feedback);
            }
            setLoading(false);
        };
        runSimulation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] space-y-8 animate-fade-in">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-violet-600 rounded-full border-t-transparent animate-spin"></div>
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold text-zinc-900">{t('run_simulation')}</h3>
                    <p className="text-zinc-500">{t('analyzing')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-10">
            <StepHeader title={t('simulation_results')} step={5} />

            {result && (
                <div className={`overflow-hidden rounded-3xl border-2 transition-all duration-500 shadow-2xl ${result.outcomeType === 'success' ? 'bg-emerald-50/50 border-emerald-200' :
                        result.outcomeType === 'neutral' ? 'bg-amber-50/50 border-amber-200' :
                            'bg-rose-50/50 border-rose-200'
                    }`}>
                    <div className={`p-10 text-center ${result.outcomeType === 'success' ? 'text-emerald-900' :
                            result.outcomeType === 'neutral' ? 'text-amber-900' :
                                'text-rose-900'
                        }`}>
                        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-sm ${result.outcomeType === 'success' ? 'bg-emerald-100 text-emerald-600' :
                                result.outcomeType === 'neutral' ? 'bg-amber-100 text-amber-600' :
                                    'bg-rose-100 text-rose-600'
                            }`}>
                            {result.outcomeType === 'success' ? <CheckCircle size={40} /> : <AlertTriangle size={40} />}
                        </div>
                        <h2 className="text-4xl font-extrabold mb-4">{result.summary}</h2>
                        <p className="text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">{result.detail}</p>
                    </div>
                </div>
            )}

            {aiAnalysis && (
                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
                    <Card className="relative p-8 flex gap-6 items-start">
                        <div className="bg-violet-100 p-3 rounded-xl text-violet-600 shrink-0">
                            <BrainCircuit size={32} />
                        </div>
                        <div className="space-y-2">
                            <h4 className="text-lg font-bold text-zinc-900">{t('ai_feedback')}</h4>
                            <p className="text-zinc-600 leading-relaxed">{aiAnalysis}</p>
                        </div>
                    </Card>
                </div>
            )}

            <div className="flex justify-end pt-8">
                <button
                    onClick={nextStep}
                    className="bg-zinc-900 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-600 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center shadow-lg gap-2"
                >
                    {t('reflection')} {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                </button>
            </div>
        </div>
    );
};

// Step 6: Reflection & Report
const ReflectionStep = () => {
    const { activeScenario, activeSession, updateSessionResponse, resetSimulation, t } = useStore();
    const [downloaded, setDownloaded] = useState(false);

    if (!activeScenario || !activeSession) return null;

    const handleDownload = () => {
        const report = `
STEM SIMULATION REPORT
----------------------
Scenario: ${activeScenario.title}
Date: ${new Date(activeSession.startedAt).toLocaleDateString()}
User: ${activeSession.userId}

PROBLEM: 
${activeScenario.problem.text}

YOUR ANALYSIS:
${Object.values(activeSession.responses.analysis).join('\n')}
(AI Feedback: ${activeSession.responses.analysisFeedback})

YOUR SOLUTION:
${activeSession.responses.solutionJustification}
(AI Feedback: ${activeSession.responses.solutionFeedback})

REFLECTION:
${Object.values(activeSession.responses.reflection).join('\n')}
        `;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `simulation-report-${activeSession.id.slice(0, 8)}.txt`;
        a.click();
        setDownloaded(true);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <StepHeader title={t('reflection')} step={6} />

            <div className="space-y-8 mb-12">
                {activeScenario.reflection.questions.map((q, idx) => (
                    <Card key={idx} className="p-8">
                        <label className="block text-lg font-bold text-zinc-800 mb-4">{q}</label>
                        <textarea
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-xl p-4 focus:bg-white focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all min-h-[120px]"
                            placeholder="..."
                            value={activeSession.responses.reflection[idx] || ''}
                            onChange={(e) => updateSessionResponse('reflection', { [idx]: e.target.value })}
                        />
                    </Card>
                ))}
            </div>

            <div className="bg-gradient-to-br from-zinc-900 to-zinc-800 text-white p-10 rounded-3xl text-center space-y-6 shadow-2xl relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-500/20 rounded-full -ml-16 -mb-16 blur-3xl"></div>

                <div className="relative z-10">
                    <h2 className="text-3xl font-extrabold mb-2">{t('finish')}!</h2>
                    <p className="text-zinc-400 max-w-lg mx-auto text-lg">You've successfully completed the module. Great work.</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
                        <button
                            onClick={handleDownload}
                            className={`px-8 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${downloaded
                                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                                    : 'bg-white text-zinc-900 hover:bg-zinc-100'
                                }`}
                        >
                            {downloaded ? <CheckCircle size={18} /> : <Download size={18} />}
                            {downloaded ? 'Report Saved' : t('download_report')}
                        </button>
                        <button
                            onClick={resetSimulation}
                            className="px-8 py-3.5 rounded-xl font-bold border border-zinc-700 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> {t('return_dashboard')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main View Component ---

export const TeacherFlow = () => {
    const { currentStep, t, language } = useStore();
    const isRTL = language === 'he';

    // Progress Bar
    const progress = (currentStep / 6) * 100;

    return (
        <div className="pb-20 relative">
            {/* Sticky Progress Header */}
            <div className="sticky top-16 z-40 bg-zinc-50/95 backdrop-blur-sm py-6 mb-8 border-b border-zinc-200/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 transition-all">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
                        <span className={currentStep >= 0 ? "text-violet-600" : ""}>{t('start')}</span>
                        <span className={currentStep >= 2 ? "text-violet-600" : ""}>{t('analyze')}</span>
                        <span className={currentStep >= 4 ? "text-violet-600" : ""}>{t('decide')}</span>
                        <span className={currentStep >= 6 ? "text-violet-600" : ""}>{t('finish')}</span>
                    </div>
                    <div className="h-2.5 w-full bg-zinc-200 rounded-full overflow-hidden" dir="ltr">
                        <div
                            className="h-full bg-gradient-to-r from-violet-500 to-indigo-600 shadow-[0_0_10px_rgba(139,92,246,0.5)] transition-all duration-700 ease-out relative"
                            style={{ width: `${Math.max(5, progress)}%`, marginLeft: isRTL ? 'auto' : 0, marginRight: isRTL ? 0 : 'auto' }}
                        >
                            <div className="absolute right-0 top-0 h-full w-full bg-white/20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-[600px] max-w-7xl mx-auto">
                {currentStep === 0 && <OpeningStep />}
                {currentStep === 1 && <ProblemStep />}
                {currentStep === 2 && <DataStep />}
                {currentStep === 3 && <AnalysisStep />}
                {currentStep === 4 && <SolutionsStep />}
                {currentStep === 5 && <SimulationStep />}
                {currentStep === 6 && <ReflectionStep />}
            </div>
        </div>
    );
};