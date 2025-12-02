import React from 'react';
import { useStore } from '../../../../app/store';
import { Lightbulb } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';

export const ProblemStep = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const { activeScenario, t } = useStore();
    if (!activeScenario) return null;

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            <StepHeader
                title={t('mission_brief')}
                step={1}
                helpText={t('understand_problem')}
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                    <div className="bg-white p-8 rounded-3xl border border-surface-100 shadow-xl shadow-surface-200/50 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-primary-500"></div>
                        <h3 className="text-2xl font-extrabold text-surface-900 mb-4">{t('core_problem')}</h3>
                        <p className="text-lg text-surface-600 leading-relaxed">{activeScenario.problem.text}</p>
                    </div>

                    <div className="bg-secondary-50 p-8 rounded-3xl border border-secondary-100 flex gap-5 items-start shadow-sm">
                        <div className="bg-white p-3 rounded-2xl text-secondary-500 shrink-0 shadow-sm border border-secondary-100">
                            <Lightbulb size={28} />
                        </div>
                        <div>
                            <h4 className="font-bold text-secondary-900 mb-2 text-lg">{t('contextual_info')}</h4>
                            <p className="text-secondary-800/80 leading-relaxed">{activeScenario.problem.context}</p>
                        </div>
                    </div>
                </div>

                <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl border-8 border-white ring-1 ring-surface-900/5 rotate-1 hover:rotate-0 transition-all duration-500">
                    <img
                        src={activeScenario.problem.imageUrl || "./placeholder.svg"}
                        className="absolute inset-0 w-full h-full object-cover"
                        alt="Problem Context"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
            </div>

            <NavButtons onNext={onNext} onPrev={onPrev} />
        </div>
    );
};
