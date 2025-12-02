import React, { useState } from 'react';
import { useStore } from '../../../../app/store';
import { BrainCircuit } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';
import { analyzeAnalysisResponse } from '../../../../shared/api/geminiService';

export const AnalysisStep = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const { activeScenario, activeSession, updateSessionResponse, t } = useStore();
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
            <StepHeader title={t('critical_analysis')} step={3} helpText={t('answer_questions_help')} />

            <div className="grid gap-8">
                <div className="space-y-6">
                    {activeScenario.analysis.questions.map((q, idx) => (
                        <div key={idx} className="bg-white p-8 rounded-3xl border border-surface-100 shadow-lg shadow-surface-200/50 transition-all focus-within:ring-4 focus-within:ring-primary-100 focus-within:border-primary-300">
                            <label className="block text-lg font-bold text-surface-800 mb-4 flex gap-3">
                                <span className="bg-surface-100 text-surface-500 w-8 h-8 flex items-center justify-center rounded-lg text-sm shrink-0 font-mono">{idx + 1}</span>
                                {q}
                            </label>
                            <textarea
                                className="w-full bg-surface-50 border border-surface-200 rounded-2xl p-5 text-surface-700 placeholder:text-surface-400 focus:outline-none focus:bg-white focus:ring-0 transition-all min-h-[140px] resize-y text-base leading-relaxed"
                                placeholder={t('type_answer_help')}
                                value={activeSession.responses.analysis[idx] || ''}
                                onChange={(e) => updateSessionResponse('analysis', { [idx]: e.target.value })}
                                onBlur={() => handleBlur(idx, q)}
                            />
                        </div>
                    ))}
                </div>

                <div className="min-h-[120px]">
                    {isAnalyzing && (
                        <div className="flex items-center gap-4 text-primary-600 animate-pulse bg-primary-50/80 backdrop-blur-sm p-5 rounded-2xl w-fit border border-primary-100">
                            <div className="relative">
                                <BrainCircuit size={24} />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary-500 rounded-full animate-ping"></div>
                            </div>
                            <span className="font-bold tracking-wide text-sm uppercase">{t('analyzing')}</span>
                        </div>
                    )}

                    {feedback && (
                        <div className="bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 p-8 rounded-3xl flex gap-5 animate-fade-in shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-10 -mt-10 blur-2xl"></div>
                            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit text-primary-600 shrink-0 relative z-10">
                                <BrainCircuit size={28} />
                            </div>
                            <div className="relative z-10">
                                <h4 className="font-bold text-primary-900 mb-2 text-lg">{t('ai_feedback')}</h4>
                                <p className="text-primary-800/90 leading-relaxed text-base">{feedback}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <NavButtons onNext={onNext} onPrev={onPrev} disabled={Object.keys(activeSession.responses.analysis).length === 0} />
        </div>
    );
};
