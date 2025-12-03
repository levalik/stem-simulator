import React, { useState } from 'react';
import { useStore } from '../app/store';
import { Plus, Users, Settings, LayoutDashboard, BarChart3 } from 'lucide-react';
import { Scenario } from '../entities/scenario';
import { ScenarioList } from '../features/admin/manage-scenarios/ui/ScenarioList';
import { CreateScenarioForm } from '../features/admin/create-scenario/ui/CreateScenarioForm';
import { UserManagement } from '../features/admin/manage-users/ui/UserManagement';
import { AnalyticsDashboard } from '../features/admin/view-analytics/ui/AnalyticsDashboard';
import { SystemSettings } from '../features/admin/system-settings/ui/SystemSettings';

const SidebarItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-surface-900 text-white shadow-lg shadow-surface-200' : 'text-surface-500 hover:bg-surface-50 hover:text-surface-900'}`}
    >
        <Icon size={20} />
        <span className="font-bold text-sm">{label}</span>
    </button>
);

export const AdminPanel = () => {
    const { scenarios, addScenario, updateScenario, deleteScenario, t } = useStore();
    const [view, setView] = useState<'list' | 'create' | 'analytics' | 'users' | 'settings'>('list');
    const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);

    const handleSaveScenario = (scenario: Scenario) => {
        if (editingScenario) {
            updateScenario(scenario);
        } else {
            addScenario(scenario);
        }
        setEditingScenario(null);
        setView('list');
    };

    const handleEditScenario = (scenario: Scenario) => {
        setEditingScenario(scenario);
        setView('create');
    };

    const handleDeleteScenario = (id: string) => {
        if (confirm(t('tooltip_delete_scenario'))) {
            deleteScenario(id);
        }
    };

    const renderContent = () => {
        switch (view) {
            case 'create': return <CreateScenarioForm initialData={editingScenario} onSave={handleSaveScenario} onCancel={() => { setEditingScenario(null); setView('list'); }} />;
            case 'analytics': return <AnalyticsDashboard />;
            case 'users': return <UserManagement />;
            case 'settings': return <SystemSettings />;
            default: return <ScenarioList onViewCreate={() => { setEditingScenario(null); setView('create'); }} onEdit={handleEditScenario} onDelete={handleDeleteScenario} />;
        }
    };

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
                <div className="bg-white rounded-2xl border border-surface-200 p-4 h-fit sticky top-24 shadow-sm">
                    <div className="space-y-1">
                        <SidebarItem
                            icon={LayoutDashboard}
                            label={t('dashboard')}
                            active={view === 'list'}
                            onClick={() => setView('list')}
                        />
                        <SidebarItem
                            icon={BarChart3}
                            label={t('analytics')}
                            active={view === 'analytics'}
                            onClick={() => setView('analytics')}
                        />
                        <SidebarItem
                            icon={Plus}
                            label={t('new_scenario')}
                            active={view === 'create'}
                            onClick={() => setView('create')}
                        />
                        <div className="h-px bg-surface-100 my-2"></div>
                        <SidebarItem
                            icon={Users}
                            label={t('users')}
                            active={view === 'users'}
                            onClick={() => setView('users')}
                        />
                        <SidebarItem
                            icon={Settings}
                            label={t('settings')}
                            active={view === 'settings'}
                            onClick={() => setView('settings')}
                        />
                    </div>

                    <div className="mt-8 pt-8 border-t border-surface-100 px-2 hidden md:block">
                        <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl p-5 text-white shadow-lg shadow-primary-200">
                            <p className="text-xs font-medium text-primary-200 mb-1 uppercase tracking-wider">{t('total_scenarios')}</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold">{scenarios.length}</p>
                                <span className="text-xs text-primary-200">{t('active_modules')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="col-span-12 md:col-span-9">
                {renderContent()}
            </div>
        </div>
    );
};
