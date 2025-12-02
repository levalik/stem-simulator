import React from 'react';
import { useStore } from '../../../../app/store';
import { Activity, Clock, ArrowLeft, ArrowRight, LineChart as ChartIcon, CheckCircle, BrainCircuit, Lightbulb, MessageSquare } from 'lucide-react';

export const OpeningStep = ({ onNext }: { onNext: () => void }) => {
    const { activeScenario, t, language } = useStore();
    const isRTL = language === 'he';
    if (!activeScenario) return null;

    return (
        <div className="max-w-5xl mx-auto animate-fade-in pb-10">
            {/* Main Card - Side by Side Layout */}
            <div className="bg-white rounded-3xl shadow-xl shadow-surface-200/50 overflow-hidden border border-surface-100 mb-8">
                <div className="flex flex-col md:flex-row items-stretch">
                    {/* Image Section */}
                    <div className="w-full md:w-2/5 relative min-h-[300px] md:min-h-full">
                        <img
                            src={activeScenario.opening.imageUrl || "./placeholder.svg"}
                            alt="Scenario"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5"></div>
                    </div>

                    {/* Content Section */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 flex flex-col justify-center bg-white">
                        <div className="flex flex-wrap gap-3 mb-6">
                             <span className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-100">
                                <Activity size={12} /> {activeScenario.category}
                            </span>
                            <span className="inline-flex items-center gap-1.5 bg-surface-50 text-surface-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-surface-100">
                                <Clock size={12} /> {activeScenario.duration}
                            </span>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-extrabold text-surface-900 mb-4 leading-tight tracking-tight">
                            {activeScenario.title}
                        </h1>
                        
                        <p className="text-lg text-surface-600 leading-relaxed mb-8">
                            {activeScenario.opening.description}
                        </p>

                        <button 
                            onClick={onNext} 
                            className="w-fit bg-surface-900 text-white px-8 py-3.5 rounded-xl font-bold text-base hover:bg-primary-600 transition-all flex items-center gap-2 shadow-lg shadow-surface-200 hover:shadow-primary-200 hover:-translate-y-0.5"
                        >
                            {t('start_simulation')} {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Secondary Info - Simplified Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Learning Goals Card */}
                <div className="bg-white rounded-2xl p-6 border border-surface-100 shadow-sm h-full">
                    <h4 className="font-bold text-surface-900 flex items-center gap-2 mb-4 text-sm uppercase tracking-wider">
                        <ChartIcon size={16} className="text-primary-600" /> {t('learning_goals')}
                    </h4>
                    <ul className="space-y-3">
                        <li className="flex gap-3 items-start">
                            <div className="mt-0.5 text-secondary-500 shrink-0"><CheckCircle size={16} /></div>
                            <span className="text-sm text-surface-600 font-medium">{t('data_analysis')}</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-0.5 text-secondary-500 shrink-0"><CheckCircle size={16} /></div>
                            <span className="text-sm text-surface-600 font-medium">{t('critical_analysis')}</span>
                        </li>
                        <li className="flex gap-3 items-start">
                            <div className="mt-0.5 text-secondary-500 shrink-0"><CheckCircle size={16} /></div>
                            <span className="text-sm text-surface-600 font-medium">{t('decide')}</span>
                        </li>
                    </ul>
                </div>

                {/* Process Steps - Simplified Flow */}
                <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-surface-100 shadow-sm h-full flex flex-col justify-center">
                     <h4 className="font-bold text-surface-900 flex items-center gap-2 mb-5 text-sm uppercase tracking-wider">
                        <BrainCircuit size={16} className="text-primary-600" /> {t('simulation_process')}
                    </h4>
                    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 w-full sm:w-auto flex-1 border border-surface-100">
                            <div className="w-10 h-10 rounded-lg bg-white text-primary-600 flex items-center justify-center shrink-0 shadow-sm border border-surface-100">
                                <Activity size={18} />
                            </div>
                            <div>
                                <h5 className="font-bold text-surface-900 text-sm">{t('analyze')}</h5>
                                <p className="text-xs text-surface-500">{t('identify_trends')}</p>
                            </div>
                        </div>
                        
                        <div className="hidden sm:flex text-surface-300">
                            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                        </div>
                        
                        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 w-full sm:w-auto flex-1 border border-surface-100">
                            <div className="w-10 h-10 rounded-lg bg-white text-secondary-600 flex items-center justify-center shrink-0 shadow-sm border border-surface-100">
                                <Lightbulb size={18} />
                            </div>
                            <div>
                                <h5 className="font-bold text-surface-900 text-sm">{t('decide')}</h5>
                                <p className="text-xs text-surface-500">{t('evidence_based')}</p>
                            </div>
                        </div>

                        <div className="hidden sm:flex text-surface-300">
                            {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 w-full sm:w-auto flex-1 border border-surface-100">
                            <div className="w-10 h-10 rounded-lg bg-white text-accent-600 flex items-center justify-center shrink-0 shadow-sm border border-surface-100">
                                <MessageSquare size={18} />
                            </div>
                            <div>
                                <h5 className="font-bold text-surface-900 text-sm">{t('reflection')}</h5>
                                <p className="text-xs text-surface-500">{t('improvement')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
