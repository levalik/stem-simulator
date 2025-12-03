import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useStore } from '../../../../app/store';
import { ScenarioCard } from '../../../../entities/scenario';
import { Scenario } from '../../../../entities/scenario';

interface ScenarioListProps {
    onViewCreate: () => void;
    onEdit: (s: Scenario) => void;
    onDelete: (id: string) => void;
}

export const ScenarioList: React.FC<ScenarioListProps> = ({ onViewCreate, onEdit, onDelete }) => {
    const { scenarios, t } = useStore();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredScenarios = scenarios.filter(s =>
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <div>
                    <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('scenario_library')}</h2>
                    <p className="text-surface-500 text-sm mt-1">{t('manage_scenarios_desc') || 'Manage and organize your training modules'}</p>
                </div>
                <button onClick={onViewCreate} className="w-full md:w-auto bg-surface-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-surface-800 transition-colors shadow-lg shadow-surface-200 flex items-center justify-center gap-2">
                    <Plus size={18} /> {t('create_new')}
                </button>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white p-4 rounded-2xl border border-surface-200 shadow-sm flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 rtl:left-auto rtl:right-3" size={20} />
                    <input
                        type="text"
                        placeholder={t('search_scenarios') || "Search scenarios..."}
                        className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-2.5 bg-surface-50 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* Add filter dropdowns here if needed */}
            </div>

            <div className="grid gap-4">
                {filteredScenarios.length > 0 ? (
                    filteredScenarios.map(s => (
                        <ScenarioCard 
                            key={s.id} 
                            scenario={s} 
                            onEdit={onEdit} 
                            onDelete={onDelete} 
                            t={t} 
                        />
                    ))
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-surface-300">
                        <div className="w-16 h-16 bg-surface-50 rounded-full flex items-center justify-center mx-auto mb-4 text-surface-400">
                            <Search size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-surface-900">{t('no_scenarios_found')}</h3>
                        <p className="text-surface-500">{t('try_adjusting_search')}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
