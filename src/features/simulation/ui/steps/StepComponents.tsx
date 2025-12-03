import React from 'react';
import { useStore } from '../../../../app/store';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Tooltip } from '../../../../shared/ui/Tooltip';
import { Button } from '../../../../shared/ui/DesignSystem';

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
            <Button
                variant="ghost"
                onClick={onPrev}
                icon={isRTL ? ArrowRight : ArrowLeft}
                iconPosition="left"
            >
                {t('back')}
            </Button>
            <Button
                variant="primary"
                onClick={onNext}
                disabled={disabled}
                icon={isRTL ? ArrowLeft : ArrowRight}
                iconPosition="right"
                className="px-8 py-3 text-base"
            >
                {nextLabel || t('continue')}
            </Button>
        </div>
    );
};
