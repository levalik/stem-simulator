import React, { Suspense } from 'react';
import { useStore } from '../../../../app/store';
import { Activity, Lightbulb } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';
import { Card } from '../../../../shared/ui/DesignSystem';

// Lazy load the chart component
const LazyChart = React.lazy(() => import('../../../../shared/ui/LazyChart'));

export const DataStep = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const { activeScenario, t, language } = useStore();
    if (!activeScenario) return null;

    return (
        <div className="max-w-6xl mx-auto">
            <StepHeader title={t('data_analysis')} step={2} helpText={t('analyze_data_help')} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Card */}
                <Card className="lg:col-span-2 p-8 shadow-xl shadow-surface-200/50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-surface-900 flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                                <Activity size={20} />
                            </div>
                            {activeScenario.data.description}
                        </h3>
                    </div>

                    <div className="h-[400px] w-full">
                        <Suspense fallback={
                            <div className="h-full w-full flex items-center justify-center bg-surface-50 rounded-xl">
                                <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent"></div>
                            </div>
                        }>
                            <LazyChart
                                type={activeScenario.data.chartType}
                                data={activeScenario.data.chartData}
                            />
                        </Suspense>
                    </div>
                </Card>

                {/* Key Facts Sidebar */}
                <div className="space-y-6">
                    <Card className="!bg-surface-900 text-white shadow-xl">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Lightbulb size={20} className="text-secondary-400" />
                            {t('key_facts')}
                        </h4>
                        <ul className="space-y-4">
                            {activeScenario.data.facts ? activeScenario.data.facts.map((fact, idx) => (
                                <li key={idx} className="flex gap-3 text-sm leading-relaxed text-surface-300">
                                    <span className="text-primary-400 font-bold mt-0.5">•</span>
                                    {fact}
                                </li>
                            )) : (
                                <li className="text-surface-400 italic text-sm">{t('no_facts')}</li>
                            )}
                        </ul>
                    </Card>

                    <Card className="shadow-lg">
                        <h4 className="font-bold text-surface-900 mb-3 text-sm uppercase tracking-wider">{t('analysis_tip')}</h4>
                        <p className="text-sm text-surface-500 leading-relaxed">
                            {t('analysis_tip_content')}
                        </p>
                    </Card>
                </div>
            </div>

            <NavButtons onNext={onNext} onPrev={onPrev} />
        </div>
    );
};

