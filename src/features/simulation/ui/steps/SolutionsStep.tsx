import React, { useState } from 'react';
import { useStore } from '../../../../app/store';
import { CheckCircle, MessageSquare } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';

export const SolutionsStep = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const { activeScenario, activeSession, updateSessionResponse, t } = useStore();
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
        <div className="max-w-6xl mx-auto">
            <StepHeader title={t('proposed_solution')} step={4} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {activeScenario.solutions.options.map((opt, idx) => (
                    <div
                        key={opt.id}
                        onClick={() => handleSelect(opt.id)}
                        className={`cursor-pointer group relative p-8 rounded-3xl border-2 transition-all duration-300 h-full flex flex-col justify-between ${selectedId === opt.id
                            ? 'border-primary-600 bg-primary-50/30 shadow-2xl shadow-primary-200/50 scale-[1.02]'
                            : 'border-surface-100 bg-white hover:border-primary-200 hover:shadow-xl hover:shadow-surface-200/50 hover:-translate-y-1'
                            }`}
                    >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl text-lg font-bold transition-colors ${selectedId === opt.id ? 'bg-primary-600 text-white shadow-lg shadow-primary-300' : 'bg-surface-100 text-surface-500 group-hover:bg-primary-100 group-hover:text-primary-600'}`}>
                                    {String.fromCharCode(65 + idx)}
                                </span>
                                {selectedId === opt.id && (
                                    <div className="text-primary-600 animate-scale-in">
                                        <CheckCircle size={28} fill="currentColor" className="text-white" />
                                    </div>
                                )}
                            </div>
                            <h4 className={`font-bold text-xl mb-4 transition-colors ${selectedId === opt.id ? 'text-primary-900' : 'text-surface-900'}`}>{t('option')} {idx + 1}</h4>
                            <p className="text-surface-600 leading-relaxed">{opt.text}</p>
                        </div>
                        
                        <div className={`mt-6 pt-6 border-t border-dashed transition-colors ${selectedId === opt.id ? 'border-primary-200' : 'border-surface-100'}`}>
                            <span className={`text-xs font-bold uppercase tracking-wider ${selectedId === opt.id ? 'text-primary-600' : 'text-surface-400'}`}>
                                {selectedId === opt.id ? t('selected') : t('click_to_select')}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {selectedId && (
                <div className="animate-fade-in-up">
                    <div className="bg-white p-8 rounded-3xl border border-surface-100 shadow-xl shadow-surface-200/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="bg-primary-100 p-3 rounded-2xl text-primary-600">
                                <MessageSquare size={24} />
                            </div>
                            <div>
                                <label className="text-xl font-bold text-surface-900 block">{t('justify_choice')}</label>
                                <p className="text-surface-500 text-sm">{t('justify_choice_help')}</p>
                            </div>
                        </div>
                        <textarea
                            className="w-full bg-surface-50 border border-surface-200 rounded-2xl p-5 focus:bg-white focus:ring-4 focus:ring-primary-100 focus:border-primary-400 transition-all min-h-[150px] text-base resize-y"
                            placeholder="..."
                            value={justification}
                            onChange={handleJustificationChange}
                        />
                    </div>
                </div>
            )}

            <NavButtons onNext={onNext} onPrev={onPrev} disabled={!selectedId || !justification} nextLabel={t('run_simulation')} />
        </div>
    );
};
