import React from 'react';
import { useStore } from '../../../../app/store';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Tooltip } from '../../../../shared/ui/Tooltip';

export const StepHeader = ({ title, step, subtitle, helpText }: { title: string; step: number; subtitle?: string; helpText?: string }) => {
    const { t } = useStore();
    return (
        <div className="flex flex-col gap-2 mb-8 animate-fade-in-up">
            <div className="flex items-center gap-3 text-primary-600 font-bold tracking-wider text-xs uppercase rtl:flex-row-reverse">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary-100 text-primary-700">
                    {step}
                </span>
                <span>{t('step')} {step} {t('of')} 6</span>
            </div>
            <div className="flex items-center gap-2">
                <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{title}</h2>
                {helpText && <Tooltip content={helpText} />}
            </div>
            {subtitle && <p className="text-surface-500 max-w-2xl">{subtitle}</p>}
        </div>
    );
};

export const NavButtons = ({ onNext, onPrev, disabled = false, nextLabel }: { onNext: () => void; onPrev: () => void; disabled?: boolean; nextLabel?: string }) => {
    const { t, language } = useStore();
    const isRTL = language === 'he';

    return (
        <div className="flex justify-between items-center pt-8 border-t border-surface-100 mt-10">
            <button
                onClick={onPrev}
                className="flex items-center text-surface-500 hover:text-surface-800 px-4 py-2 font-medium transition-colors text-sm gap-2"
            >
                {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
                {t('back')}
            </button>
            <button
                onClick={onNext}
                disabled={disabled}
                className={`flex items-center bg-surface-900 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-surface-200 gap-2 ${disabled ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:bg-primary-600 hover:shadow-primary-200 hover:-translate-y-1'}`}
            >
                {nextLabel || t('continue')}
                {isRTL ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
            </button>
        </div>
    );
};
