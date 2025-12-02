import React, { useState } from 'react';
import { useStore } from '../../../../app/store';
import { useNavigate } from '@tanstack/react-router';
import { FileText, Clock, MessageSquare, Lightbulb, CheckCircle, AlertTriangle, Award, Download, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import { StepHeader } from './StepComponents';

export const ReflectionStep = () => {
    const { activeScenario, activeSession, updateSessionResponse, resetSimulation, scenarios, t, language } = useStore();
    const navigate = useNavigate();
    const [downloaded, setDownloaded] = useState(false);
    const isRTL = language === 'he';

    if (!activeScenario || !activeSession) return null;

    // Find next scenario
    const currentIndex = scenarios.findIndex(s => s.id === activeScenario.id);
    const nextScenario = scenarios[currentIndex + 1];

    const handleReturnToDashboard = () => {
        resetSimulation();
        navigate({ to: '/dashboard' });
    };

    const handleNextScenario = () => {
        if (nextScenario) {
            navigate({ to: '/simulation/$scenarioId', params: { scenarioId: nextScenario.id } as any });
        }
    };

    // Calculate time spent
    const timeSpent = Math.round((Date.now() - activeSession.startedAt) / 60000);

    // Get the selected solution
    const selectedOption = activeScenario.solutions.options.find(o => o.id === activeSession.responses.solutionId);
    const result = selectedOption ? activeScenario.simulation.results[selectedOption.resultId] : null;

    const handleDownload = () => {
        const report = `
═══════════════════════════════════════════════════════════════
                    STEM SIMULATION REPORT
═══════════════════════════════════════════════════════════════

📋 SCENARIO DETAILS
───────────────────────────────────────────────────────────────
Title: ${activeScenario.title}
Category: ${activeScenario.category}
Duration: ${activeScenario.duration}
Date: ${new Date(activeSession.startedAt).toLocaleDateString()}
Time Spent: ${timeSpent} minutes
Session ID: ${activeSession.id.slice(0, 8)}

📝 PROBLEM STATEMENT
───────────────────────────────────────────────────────────────
${activeScenario.problem.text}

Context: ${activeScenario.problem.context}

📊 YOUR ANALYSIS
───────────────────────────────────────────────────────────────
${activeScenario.analysis.questions.map((q, i) => `
Q${i + 1}: ${q}
A${i + 1}: ${activeSession.responses.analysis[i] || 'Not answered'}
`).join('\n')}

AI Feedback: ${activeSession.responses.analysisFeedback || 'N/A'}

💡 YOUR SOLUTION
───────────────────────────────────────────────────────────────
Selected: ${selectedOption?.text || 'N/A'}
Justification: ${activeSession.responses.solutionJustification || 'N/A'}

Result: ${result?.summary || 'N/A'}
${result?.detail || ''}

AI Feedback: ${activeSession.responses.solutionFeedback || 'N/A'}

🔄 REFLECTION
───────────────────────────────────────────────────────────────
${activeScenario.reflection.questions.map((q, i) => `
Q${i + 1}: ${q}
A${i + 1}: ${activeSession.responses.reflection[i] || 'Not answered'}
`).join('\n')}

═══════════════════════════════════════════════════════════════
                    Powered by STEM Simulator
═══════════════════════════════════════════════════════════════
        `;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `simulation-report-${activeScenario.title.replace(/\s+/g, '-')}-${activeSession.id.slice(0, 8)}.txt`;
        a.click();
        setDownloaded(true);
    };

    return (
        <div className="max-w-5xl mx-auto">
            <StepHeader title={t('reflection')} step={6} />

            <div className="space-y-8 mb-16">
                {activeScenario.reflection.questions.map((q, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl border border-surface-100 shadow-lg shadow-surface-200/50 transition-all focus-within:ring-4 focus-within:ring-primary-100 focus-within:border-primary-300">
                        <label className="block text-lg font-bold text-surface-800 mb-4">{q}</label>
                        <textarea
                            className="w-full bg-surface-50 border border-surface-200 rounded-2xl p-5 focus:bg-white focus:ring-0 transition-all min-h-[120px] text-base resize-y"
                            placeholder={t('type_answer_help')}
                            value={activeSession.responses.reflection[idx] || ''}
                            onChange={(e) => updateSessionResponse('reflection', { [idx]: e.target.value })}
                        />
                    </div>
                ))}
            </div>

            {/* Session Summary Card */}
            <div className="bg-white rounded-3xl p-10 border border-surface-100 shadow-xl shadow-surface-200/50 mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-50 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                
                <h3 className="text-2xl font-bold text-surface-900 mb-8 flex items-center gap-3 relative z-10">
                    <div className="bg-primary-100 p-2 rounded-lg text-primary-600">
                        <FileText size={24} />
                    </div>
                    {t('session_summary')}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                    <div className="text-center p-6 bg-surface-50 rounded-2xl border border-surface-100 hover:shadow-md transition-all">
                        <Clock size={28} className="mx-auto text-primary-500 mb-3" />
                        <p className="text-3xl font-extrabold text-surface-900 mb-1">{timeSpent}</p>
                        <p className="text-sm font-medium text-surface-500 uppercase tracking-wide">{t('mins')}</p>
                    </div>
                    <div className="text-center p-6 bg-surface-50 rounded-2xl border border-surface-100 hover:shadow-md transition-all">
                        <MessageSquare size={28} className="mx-auto text-primary-500 mb-3" />
                        <p className="text-3xl font-extrabold text-surface-900 mb-1">{Object.keys(activeSession.responses.analysis).length}</p>
                        <p className="text-sm font-medium text-surface-500 uppercase tracking-wide">{t('questions_answered')}</p>
                    </div>
                    <div className="text-center p-6 bg-surface-50 rounded-2xl border border-surface-100 hover:shadow-md transition-all">
                        <Lightbulb size={28} className="mx-auto text-amber-500 mb-3" />
                        <p className="text-xl font-bold text-surface-900 truncate mb-1">{selectedOption?.text.slice(0, 15)}...</p>
                        <p className="text-sm font-medium text-surface-500 uppercase tracking-wide">{t('solution_selected')}</p>
                    </div>
                    <div className="text-center p-6 bg-surface-50 rounded-2xl border border-surface-100 hover:shadow-md transition-all">
                        {result?.outcomeType === 'success' ? (
                            <CheckCircle size={28} className="mx-auto text-secondary-500 mb-3" />
                        ) : result?.outcomeType === 'neutral' ? (
                            <AlertTriangle size={28} className="mx-auto text-amber-500 mb-3" />
                        ) : (
                            <AlertTriangle size={28} className="mx-auto text-accent-500 mb-3" />
                        )}
                        <p className="text-xl font-bold text-surface-900 mb-1">{result?.summary}</p>
                        <p className="text-sm font-medium text-surface-500 uppercase tracking-wide">{t('outcome')}</p>
                    </div>
                </div>
            </div>

            <div className="bg-surface-900 text-white p-12 rounded-[2.5rem] text-center space-y-8 shadow-2xl shadow-surface-900/20 relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-500/20 rounded-full -ml-24 -mb-24 blur-3xl"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary-400 to-secondary-500 rounded-3xl rotate-3 flex items-center justify-center shadow-lg shadow-secondary-900/20">
                        <Award size={48} className="text-white -rotate-3" />
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4 tracking-tight">{result?.outcomeType === 'success' ? t('congratulations') : t('good_job')}</h2>
                    <p className="text-surface-400 max-w-lg mx-auto text-xl leading-relaxed">{t('completed_module')}</p>

                    <div className="flex flex-col sm:flex-row justify-center gap-5 pt-10">
                        <button
                            onClick={handleDownload}
                            className={`px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg ${downloaded
                                ? 'bg-secondary-500 text-white hover:bg-secondary-600 shadow-lg shadow-secondary-900/20'
                                : 'bg-white text-surface-900 hover:bg-surface-100 shadow-lg shadow-white/10'
                                }`}
                        >
                            {downloaded ? <CheckCircle size={20} /> : <Download size={20} />}
                            {downloaded ? t('report_saved') : t('download_report')}
                        </button>

                        {nextScenario && (
                            <button
                                onClick={handleNextScenario}
                                className="px-8 py-4 rounded-2xl font-bold bg-primary-600 hover:bg-primary-700 text-white transition-all flex items-center justify-center gap-3 text-lg shadow-lg shadow-primary-900/20"
                            >
                                {t('next_scenario')} {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                            </button>
                        )}

                        <button
                            onClick={handleReturnToDashboard}
                            className="px-8 py-4 rounded-2xl font-bold border border-surface-700 hover:bg-surface-800 text-surface-300 hover:text-white transition-all flex items-center justify-center gap-3 text-lg"
                        >
                            <RotateCcw size={20} /> {t('return_dashboard')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
