import React from 'react';
import { Users, Edit2, Trash2 } from 'lucide-react';
import { Scenario } from '../model/types';

interface ScenarioCardProps {
  scenario: Scenario;
  onEdit: (scenario: Scenario) => void;
  onDelete: (id: string) => void;
  t: (key: string) => string;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onEdit, onDelete, t }) => {
  return (
    <div className="group bg-white p-4 rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">
        <div className="w-full md:w-32 h-32 bg-surface-100 rounded-xl overflow-hidden shrink-0 relative">
            <img
                src={scenario.opening.imageUrl || "./placeholder.svg"}
                alt={scenario.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
        </div>

        <div className="flex-1 text-center md:text-start rtl:md:text-right w-full">
            <div className="flex flex-col md:flex-row gap-2 items-center md:items-start rtl:md:items-start mb-2">
                <h3 className="text-xl font-bold text-surface-900 group-hover:text-primary-600 transition-colors">{scenario.title}</h3>
                <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100 uppercase tracking-wide">{scenario.category}</span>
            </div>
            <p className="text-surface-500 text-sm line-clamp-2 mb-3">{scenario.opening.description}</p>
            <div className="flex items-center justify-center md:justify-start rtl:md:justify-start gap-4 text-xs text-surface-400 font-medium">
                <span className="flex items-center gap-1"><Users size={14} /> 120 {t('users')}</span>
                <span className="flex items-center gap-1">•</span>
                <span>{scenario.duration}</span>
            </div>
        </div>

        <div className="flex gap-2 w-full md:w-auto justify-center">
            <button onClick={() => onEdit(scenario)} className="p-2.5 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors border border-transparent hover:border-primary-100" title={t('tooltip_edit_scenario')}>
                <Edit2 size={20} />
            </button>
            <button onClick={() => onDelete(scenario.id)} className="p-2.5 text-surface-500 hover:text-accent-600 hover:bg-accent-50 rounded-xl transition-colors border border-transparent hover:border-accent-100" title={t('tooltip_delete_scenario')}>
                <Trash2 size={20} />
            </button>
        </div>
    </div>
  );
};
