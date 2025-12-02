import React, { useState, useEffect } from 'react';
import { useStore } from '../../../../app/store';
import { Activity, CheckCircle, AlertTriangle, BrainCircuit, ArrowLeft, ArrowRight } from 'lucide-react';
import { StepHeader } from './StepComponents';
import { analyzeJustification } from '../../../../shared/api/geminiService';

export const SimulationStep = ({ onNext }: { onNext: () => void }) => {
    const { activeScenario, activeSession, updateSessionResponse, t, language } = useStore();
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
            <div className="flex flex-col items-center justify-center h-[600px] space-y-8 animate-fade-in">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-4 border-surface-100 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-primary-600 rounded-full border-t-transparent animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Activity className="text-primary-600 animate-pulse" size={32} />
                    </div>
                </div>
                <div className="text-center space-y-3">
                    <h3 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('run_simulation')}</h3>
                    <p className="text-surface-500 text-lg">{t('analyzing')}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-12">
            <StepHeader title={t('simulation_results')} step={5} />

            {result && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    <div className={`overflow-hidden rounded-3xl border-2 transition-all duration-500 shadow-2xl flex flex-col justify-center p-10 relative ${result.outcomeType === 'success' ? 'bg-secondary-50/50 border-secondary-200' :
                        result.outcomeType === 'neutral' ? 'bg-amber-50/50 border-amber-200' :
                            'bg-accent-50/50 border-accent-200'
                        }`}>
                        
                        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full -mr-16 -mt-16 blur-3xl opacity-50 ${
                             result.outcomeType === 'success' ? 'bg-secondary-200' :
                             result.outcomeType === 'neutral' ? 'bg-amber-200' :
                             'bg-accent-200'
                        }`}></div>

                        <div className={`relative z-10 text-center ${result.outcomeType === 'success' ? 'text-secondary-900' :
                            result.outcomeType === 'neutral' ? 'text-amber-900' :
                                'text-accent-900'
                            }`}>
                            <div className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 shadow-sm ${result.outcomeType === 'success' ? 'bg-secondary-100 text-secondary-600' :
                                result.outcomeType === 'neutral' ? 'bg-amber-100 text-amber-600' :
                                    'bg-accent-100 text-accent-600'
                                }`}>
                                {result.outcomeType === 'success' ? <CheckCircle size={48} /> : <AlertTriangle size={48} />}
                            </div>
                            <h2 className="text-4xl font-extrabold mb-6 tracking-tight">{result.summary}</h2>
                            <p className="text-xl opacity-90 leading-relaxed">{result.detail}</p>
                        </div>
                    </div>

                    <div className="relative h-full min-h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white ring-1 ring-surface-900/5">
                         <img
                            src={result.outcomeImageUrl || activeScenario.problem.imageUrl || "./placeholder.svg"}
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Simulation Outcome"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                        <div className="absolute bottom-6 left-6 right-6 text-white">
                            <div className="inline-flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold border border-white/10">
                                <Activity size={16} />
                                {t('visual_outcome')}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {aiAnalysis && (
                <div className="relative group animate-fade-in-up">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-600 to-primary-600 rounded-3xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
                    <div className="relative bg-white p-8 rounded-3xl border border-surface-100 shadow-xl flex flex-col md:flex-row gap-8 items-start">
                        <div className="bg-primary-50 p-4 rounded-2xl text-primary-600 shrink-0 border border-primary-100">
                            <BrainCircuit size={32} />
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-xl font-bold text-surface-900">{t('ai_feedback')}</h4>
                            <p className="text-surface-600 leading-relaxed text-lg">{aiAnalysis}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex justify-end pt-8">
                <button
                    onClick={onNext}
                    className="bg-surface-900 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-200 hover:-translate-y-1 transition-all flex items-center shadow-lg shadow-surface-200 gap-3"
                >
                    {t('reflection')} {isRTL ? <ArrowLeft size={22} /> : <ArrowRight size={22} />}
                </button>
            </div>
        </div>
    );
};
