import React from 'react';
import { useStore } from '../../../../app/store';
import { Lightbulb, Info } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';
import { Card } from '../../../../shared/ui/DesignSystem';
import { Tooltip } from '../../../../shared/ui/Tooltip';

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
                    <Card className="shadow-xl shadow-surface-200/50 relative overflow-hidden group border-l-8 border-l-blue-500">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-2xl font-extrabold text-surface-900">{t('core_problem')}</h3>
                            <Tooltip content={t('ai_hint') || "Read the problem statement carefully."}>
                                <Info size={20} className="text-surface-400 hover:text-primary-500 transition-colors cursor-help" />
                            </Tooltip>
                        </div>
                        <p className="text-lg text-surface-600 leading-relaxed">{activeScenario.problem.text}</p>
                    </Card>

                    <Card className="!bg-purple-50 !border-purple-100 shadow-sm">
                        <div className="flex gap-5 items-start">
                            <div className="bg-white p-3 rounded-2xl text-purple-500 shrink-0 shadow-sm border border-purple-100">
                                <Lightbulb size={28} />
                            </div>
                            <div>
                                <h4 className="font-bold text-purple-900 mb-2 text-lg">{t('contextual_info')}</h4>
                                <p className="text-purple-800/80 leading-relaxed">{activeScenario.problem.context}</p>
                            </div>
                        </div>
                    </Card>
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
