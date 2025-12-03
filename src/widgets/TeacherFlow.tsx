import React from 'react';
import { useStore } from '../app/store';
import { OpeningStep } from '../features/simulation/ui/steps/OpeningStep';
import { ProblemStep } from '../features/simulation/ui/steps/ProblemStep';
import { DataStep } from '../features/simulation/ui/steps/DataStep';
import { AnalysisStep } from '../features/simulation/ui/steps/AnalysisStep';
import { SolutionsStep } from '../features/simulation/ui/steps/SolutionsStep';
import { SimulationStep } from '../features/simulation/ui/steps/SimulationStep';
import { ReflectionStep } from '../features/simulation/ui/steps/ReflectionStep';

export const TeacherFlow = ({ currentStep, onStepChange }: { currentStep: number; onStepChange: (step: number) => void }) => {
    const { t, language } = useStore();
    const isRTL = language === 'he';

    const handleNext = () => {
        onStepChange(Math.min(currentStep + 1, 6));
    };

    const handlePrev = () => {
        onStepChange(Math.max(currentStep - 1, 0));
    };

    // Progress Bar
    const progress = (currentStep / 6) * 100;

    return (
        <div className="pb-20 relative">
            {/* Sticky Progress Header */}
            <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm py-6 mb-8 border-b border-surface-200/50 -mx-6 sm:-mx-8 lg:-mx-10 px-6 sm:px-8 lg:px-10 transition-all">
                <div className="max-w-5xl mx-auto">
                    <div className="flex justify-between text-xs font-bold text-surface-400 uppercase tracking-widest mb-2">
                        <span className={currentStep >= 0 ? "text-primary-600" : ""}>{t('start')}</span>
                        <span className={currentStep >= 2 ? "text-primary-600" : ""}>{t('analyze')}</span>
                        <span className={currentStep >= 4 ? "text-primary-600" : ""}>{t('decide')}</span>
                        <span className={currentStep >= 6 ? "text-primary-600" : ""}>{t('finish')}</span>
                    </div>
                    <div className="h-2.5 w-full bg-surface-200 rounded-full overflow-hidden" dir="ltr">
                        <div
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 shadow-lg shadow-primary-500/50 transition-all duration-700 ease-out relative"
                            style={{ width: `${Math.max(5, progress)}%`, marginLeft: isRTL ? 'auto' : 0, marginRight: isRTL ? 0 : 'auto' }}
                        >
                            <div className="absolute right-0 top-0 h-full w-full bg-white/20 animate-pulse-soft"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-h-[600px] max-w-7xl mx-auto">
                {currentStep === 0 && <OpeningStep onNext={handleNext} />}
                {currentStep === 1 && <ProblemStep onNext={handleNext} onPrev={handlePrev} />}
                {currentStep === 2 && <DataStep onNext={handleNext} onPrev={handlePrev} />}
                {currentStep === 3 && <AnalysisStep onNext={handleNext} onPrev={handlePrev} />}
                {currentStep === 4 && <SolutionsStep onNext={handleNext} onPrev={handlePrev} />}
                {currentStep === 5 && <SimulationStep onNext={handleNext} />}
                {currentStep === 6 && <ReflectionStep />}
            </div>
        </div>
    );
};
