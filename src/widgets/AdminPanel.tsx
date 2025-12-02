import React, { useState } from 'react';
import { useStore } from '../app/store';
import { Plus, Users, Settings, Wand2, Save, FileText, Trash2, Edit2, LayoutDashboard, BarChart3, Search, Mail, Shield, CheckCircle, XCircle, ChevronRight, ChevronLeft, Image as ImageIcon, HelpCircle, Download, Activity, TrendingUp, Clock, Trophy, PieChart as PieChartIcon } from 'lucide-react';
import { generateScenarioFromTopic } from '../shared/api/geminiService';
import { Scenario } from '../src/shared/model/types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

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

const ScenarioList = ({ onViewCreate, onEdit, onDelete }: { onViewCreate: () => void; onEdit: (s: Scenario) => void; onDelete: (id: string) => void }) => {
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
                        <div key={s.id} className="group bg-white p-4 rounded-2xl border border-surface-200 shadow-sm hover:shadow-lg hover:border-primary-200 transition-all duration-300 flex flex-col md:flex-row gap-6 items-center">
                            <div className="w-full md:w-32 h-32 bg-surface-100 rounded-xl overflow-hidden shrink-0 relative">
                                <img
                                    src={s.opening.imageUrl || "./placeholder.svg"}
                                    alt={s.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="flex-1 text-center md:text-start rtl:md:text-right w-full">
                                <div className="flex flex-col md:flex-row gap-2 items-center md:items-start rtl:md:items-start mb-2">
                                    <h3 className="text-xl font-bold text-surface-900 group-hover:text-primary-600 transition-colors">{s.title}</h3>
                                    <span className="px-2.5 py-0.5 bg-primary-50 text-primary-700 text-xs font-bold rounded-full border border-primary-100 uppercase tracking-wide">{s.category}</span>
                                </div>
                                <p className="text-surface-500 text-sm line-clamp-2 mb-3">{s.opening.description}</p>
                                <div className="flex items-center justify-center md:justify-start rtl:md:justify-start gap-4 text-xs text-surface-400 font-medium">
                                    <span className="flex items-center gap-1"><Users size={14} /> 120 {t('users')}</span>
                                    <span className="flex items-center gap-1">•</span>
                                    <span>{s.duration}</span>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full md:w-auto justify-center">
                                <button onClick={() => onEdit(s)} className="p-2.5 text-surface-500 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-colors border border-transparent hover:border-primary-100" title={t('tooltip_edit_scenario')}>
                                    <Edit2 size={20} />
                                </button>
                                <button onClick={() => onDelete(s.id)} className="p-2.5 text-surface-500 hover:text-accent-600 hover:bg-accent-50 rounded-xl transition-colors border border-transparent hover:border-accent-100" title={t('tooltip_delete_scenario')}>
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
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

const AnalyticsDashboard = () => {
    const { t, scenarios, language } = useStore();
    const isRTL = language === 'he';

    // Enhanced Mock Data
    const usageData = [
        { name: isRTL ? 'א' : 'Mon', runs: 12, completed: 10 },
        { name: isRTL ? 'ב' : 'Tue', runs: 19, completed: 16 },
        { name: isRTL ? 'ג' : 'Wed', runs: 15, completed: 13 },
        { name: isRTL ? 'ד' : 'Thu', runs: 22, completed: 20 },
        { name: isRTL ? 'ה' : 'Fri', runs: 28, completed: 24 },
        { name: isRTL ? 'ו' : 'Sat', runs: 8, completed: 7 },
        { name: isRTL ? 'ש' : 'Sun', runs: 5, completed: 4 }
    ];

    const completionData = [
        { name: t('completed'), value: 85 },
        { name: t('dropped'), value: 15 },
    ];

    const scenarioPerformance = scenarios.slice(0, 5).map((s, i) => ({
        name: s.title.length > 20 ? s.title.slice(0, 20) + '...' : s.title,
        sessions: Math.floor(Math.random() * 100) + 50,
        successRate: Math.floor(Math.random() * 30) + 70,
    }));

    const topScores = [
        { name: 'Sarah Cohen', score: 98, scenario: scenarios[0]?.title || 'N/A' },
        { name: 'David Levi', score: 95, scenario: scenarios[1]?.title || 'N/A' },
        { name: 'Rachel Ben', score: 94, scenario: scenarios[0]?.title || 'N/A' },
        { name: 'Moshe Gold', score: 92, scenario: scenarios[2]?.title || 'N/A' },
        { name: 'Yael Katz', score: 91, scenario: scenarios[1]?.title || 'N/A' },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('analytics')}</h2>
                    <p className="text-surface-500 text-sm mt-1">{t('tooltip_analytics')}</p>
                </div>
                <div className="flex gap-2">
                    <select className="px-4 py-2 bg-white border border-surface-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500">
                        <option>{t('this_week')}</option>
                        <option>{t('last_week')}</option>
                        <option>{t('this_month')}</option>
                        <option>{t('last_month')}</option>
                    </select>
                    <button className="px-4 py-2 bg-surface-900 text-white rounded-xl text-sm font-bold hover:bg-surface-800 transition-colors flex items-center gap-2">
                        <Download size={16} /> {t('export')}
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                            <Activity size={20} />
                        </div>
                        <span className="text-sm font-medium text-surface-500">{t('total_sessions')}</span>
                    </div>
                    <p className="text-4xl font-extrabold text-surface-900">1,248</p>
                    <div className="mt-2 text-secondary-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp size={14} /> <span>+12%</span> <span className="text-surface-400">{t('vs_last_week')}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-secondary-100 rounded-lg text-secondary-600">
                            <Trophy size={20} />
                        </div>
                        <span className="text-sm font-medium text-surface-500">{t('avg_score')}</span>
                    </div>
                    <p className="text-4xl font-extrabold text-surface-900">88%</p>
                    <div className="mt-2 text-secondary-600 text-sm font-medium flex items-center gap-1">
                        <TrendingUp size={14} /> <span>+4%</span> <span className="text-surface-400">{t('vs_last_week')}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                            <Users size={20} />
                        </div>
                        <span className="text-sm font-medium text-surface-500">{t('active_teachers')}</span>
                    </div>
                    <p className="text-4xl font-extrabold text-surface-900">342</p>
                    <div className="mt-2 text-surface-400 text-sm font-medium flex items-center gap-1">
                        <span>+0%</span> <span className="text-surface-400">{t('vs_last_week')}</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-accent-100 rounded-lg text-accent-600">
                            <Clock size={20} />
                        </div>
                        <span className="text-sm font-medium text-surface-500">{t('avg_time')}</span>
                    </div>
                    <p className="text-4xl font-extrabold text-surface-900">18<span className="text-lg font-medium text-surface-400 ms-1">{t('mins')}</span></p>
                    <div className="mt-2 text-accent-500 text-sm font-medium flex items-center gap-1">
                        <span>-2</span> <span className="text-surface-400">{t('vs_last_week')}</span>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm h-[400px]">
                    <h3 className="font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary-500" />
                        {t('weekly_activity')}
                    </h3>
                    <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={usageData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#a1a1aa' }} />
                            <Tooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }} />
                            <Legend />
                            <Bar dataKey="runs" name={t('total_sessions')} fill="#8b5cf6" radius={[4, 4, 0, 0]} barSize={24} />
                            <Bar dataKey="completed" name={t('completed')} fill="#10b981" radius={[4, 4, 0, 0]} barSize={24} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm h-[400px]">
                    <h3 className="font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <PieChartIcon size={20} className="text-primary-500" />
                        {t('completion_rate')}
                    </h3>
                    <ResponsiveContainer width="100%" height="75%">
                        <PieChart>
                            <Pie
                                data={completionData}
                                innerRadius={70}
                                outerRadius={100}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                <Cell fill="#10b981" />
                                <Cell fill="#f43f5e" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-secondary-500"></span> {t('completed')} (85%)</div>
                        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-accent-500"></span> {t('dropped')} (15%)</div>
                    </div>
                </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Scenario Performance */}
                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
                    <h3 className="font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <FileText size={20} className="text-primary-500" />
                        {t('scenarios')} Performance
                    </h3>
                    <div className="space-y-4">
                        {scenarioPerformance.map((scenario, idx) => (
                            <div key={idx} className="flex items-center gap-4">
                                <span className="w-6 h-6 rounded-full bg-surface-100 text-surface-500 flex items-center justify-center text-xs font-bold">{idx + 1}</span>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-surface-700">{scenario.name}</span>
                                        <span className="text-xs text-surface-500">{scenario.sessions} {t('sessions_count')}</span>
                                    </div>
                                    <div className="h-2 bg-surface-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500"
                                            style={{ width: `${scenario.successRate}%` }}
                                        ></div>
                                    </div>
                                </div>
                                <span className="text-sm font-bold text-surface-900">{scenario.successRate}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Performers */}
                <div className="bg-white p-6 rounded-2xl border border-surface-200 shadow-sm">
                    <h3 className="font-bold text-surface-800 mb-6 flex items-center gap-2">
                        <Trophy size={20} className="text-accent-500" />
                        Top Performers
                    </h3>
                    <div className="space-y-3">
                        {topScores.map((user, idx) => (
                            <div key={idx} className="flex items-center gap-4 p-3 bg-surface-50 rounded-xl hover:bg-surface-100 transition-colors">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${idx === 0 ? 'bg-accent-100 text-accent-600' :
                                        idx === 1 ? 'bg-surface-200 text-surface-600' :
                                            idx === 2 ? 'bg-accent-50 text-accent-700' :
                                                'bg-surface-100 text-surface-500'
                                    }`}>
                                    {idx + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-surface-900">{user.name}</p>
                                    <p className="text-xs text-surface-500">{user.scenario.slice(0, 30)}...</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-lg font-bold text-surface-900">{user.score}</span>
                                    <span className="text-surface-400 text-sm">%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const UserManagement = () => {
    const { t } = useStore();
    // Mock Users
    const [users, setUsers] = useState([
        { id: 1, name: "Alex Johnson", email: "alex@edu.com", role: "Teacher", status: "Active" },
        { id: 2, name: "Sarah Connor", email: "sarah@admin.com", role: "Admin", status: "Active" },
        { id: 3, name: "Mike Ross", email: "mike@law.com", role: "Teacher", status: "Inactive" },
        { id: 4, name: "Jessica P.", email: "jess@edu.com", role: "Teacher", status: "Active" },
    ]);

    const handleAddUser = () => {
        const newUser = {
            id: users.length + 1,
            name: `New User ${users.length + 1}`,
            email: `user${users.length + 1}@edu.com`,
            role: "Teacher",
            status: "Active"
        };
        setUsers([...users, newUser]);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('user_management')}</h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400 rtl:left-auto rtl:right-3" size={16} />
                        <input type="text" placeholder={t('search_users')} className="pl-9 pr-4 rtl:pr-9 rtl:pl-4 py-2 bg-white border border-surface-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none" />
                    </div>
                    <button onClick={handleAddUser} className="bg-surface-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-surface-800 transition-colors">
                        + {t('add_user')}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden">
                <table className="w-full text-left rtl:text-right text-sm text-surface-600">
                    <thead className="bg-surface-50 border-b border-surface-200 font-semibold text-surface-900">
                        <tr>
                            <th className="px-6 py-4">{t('name')}</th>
                            <th className="px-6 py-4">{t('role')}</th>
                            <th className="px-6 py-4">{t('status')}</th>
                            <th className="px-6 py-4 text-right rtl:text-left">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-surface-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-surface-900">{user.name}</p>
                                            <p className="text-xs text-surface-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'Admin' ? 'bg-primary-50 text-primary-700 border-primary-100' : 'bg-surface-50 text-surface-600 border-surface-100'}`}>
                                        {user.role === 'Admin' ? <Shield size={10} /> : <Users size={10} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-secondary-50 text-secondary-700' : 'bg-surface-100 text-surface-500'}`}>
                                        {user.status === 'Active' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right rtl:text-left">
                                    <button className="text-surface-400 hover:text-primary-600 font-medium text-xs px-2">{t('edit')}</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const SystemSettings = () => {
    const { t } = useStore();
    const [emailNotif, setEmailNotif] = useState(true);
    const [dataExport, setDataExport] = useState(false);

    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
            <h2 className="text-3xl font-extrabold text-surface-900 tracking-tight">{t('system_settings')}</h2>

            <div className="bg-white rounded-2xl border border-surface-200 shadow-sm divide-y divide-surface-100">
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-surface-900">{t('email_notifications')}</h4>
                        <p className="text-sm text-surface-500">{t('receive_reports')}</p>
                    </div>
                    <div
                        className={`w-11 h-6 rounded-full relative cursor-pointer transition-colors ${emailNotif ? 'bg-primary-600' : 'bg-surface-200'}`}
                        onClick={() => setEmailNotif(!emailNotif)}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-all ${emailNotif ? 'right-1 rtl:right-auto rtl:left-1' : 'left-1 rtl:left-auto rtl:right-1'}`}></div>
                    </div>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-surface-900">{t('ai_model_config')}</h4>
                        <p className="text-sm text-surface-500">{t('current_model')}</p>
                    </div>
                    <button className="text-sm font-bold text-primary-600 hover:underline">{t('change')}</button>
                </div>
                <div className="p-6 flex items-center justify-between">
                    <div>
                        <h4 className="font-bold text-surface-900">{t('data_export')}</h4>
                        <p className="text-sm text-surface-500">{t('download_logs')}</p>
                    </div>
                    <button className="bg-white border border-surface-200 text-surface-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-surface-50">{t('export')}</button>
                </div>
            </div>
        </div>
    );
}

// Category options for dropdown
const CATEGORY_OPTIONS = [
    { value: 'פיזיקה / מדעי הסביבה', label: { en: 'Physics / Environmental Science', he: 'פיזיקה / מדעי הסביבה' } },
    { value: 'אקולוגיה / תכנון עירוני', label: { en: 'Ecology / Urban Planning', he: 'אקולוגיה / תכנון עירוני' } },
    { value: 'הנדסה / פיזיקה', label: { en: 'Engineering / Physics', he: 'הנדסה / פיזיקה' } },
    { value: 'מתמטיקה / חקר ביצועים', label: { en: 'Mathematics / Operations Research', he: 'מתמטיקה / חקר ביצועים' } },
    { value: 'ביולוגיה / רפואה', label: { en: 'Biology / Medicine', he: 'ביולוגיה / רפואה' } },
    { value: 'פיזיקה / קינמטיקה', label: { en: 'Physics / Kinematics', he: 'פיזיקה / קינמטיקה' } },
    { value: 'כימיה / איכות סביבה', label: { en: 'Chemistry / Environmental Quality', he: 'כימיה / איכות סביבה' } },
    { value: 'מדעי המחשב / אלגוריתמים', label: { en: 'Computer Science / Algorithms', he: 'מדעי המחשב / אלגוריתמים' } },
    { value: 'גיאוגרפיה / אקלים', label: { en: 'Geography / Climate', he: 'גיאוגרפיה / אקלים' } },
];

// Duration options for dropdown
const DURATION_OPTIONS = [
    { value: '10 דקות', label: { en: '10 minutes', he: '10 דקות' } },
    { value: '15 דקות', label: { en: '15 minutes', he: '15 דקות' } },
    { value: '20 דקות', label: { en: '20 minutes', he: '20 דקות' } },
    { value: '25 דקות', label: { en: '25 minutes', he: '25 דקות' } },
    { value: '30 דקות', label: { en: '30 minutes', he: '30 דקות' } },
    { value: '45 דקות', label: { en: '45 minutes', he: '45 דקות' } },
    { value: '60 דקות', label: { en: '60 minutes', he: '60 דקות' } },
];

// Chart type options
const CHART_TYPE_OPTIONS = [
    { value: 'bar', label: { en: 'Bar Chart', he: 'תרשים עמודות' } },
    { value: 'pie', label: { en: 'Pie Chart', he: 'תרשים עוגה' } },
    { value: 'line', label: { en: 'Line Chart', he: 'תרשים קווי' } },
];

const CreateScenarioForm = ({ onSave, onCancel, initialData }: { onSave: (s: Scenario) => void; onCancel: () => void; initialData?: Scenario | null }) => {
    const { t, language } = useStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<Partial<Scenario>>(initialData || {
        id: crypto.randomUUID(),
        title: '',
        category: '',
        duration: '',
        opening: { description: '', imageUrl: '' },
        problem: { text: '', context: '', imageUrl: '' },
        data: { description: '', chartType: 'bar', chartData: [] },
        analysis: { questions: [], keyTerms: [] },
        solutions: { options: [] },
        simulation: { results: {} },
        reflection: { questions: [] }
    });

    const handleInputChange = (section: keyof Scenario, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section] as any,
                [field]: value
            }
        }));
    };

    const handleRootChange = (field: string, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const renderStep = () => {
        switch (step) {
            case 1: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center text-primary-600">
                            <FileText size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900">{t('step_1_opening')}</h3>
                            <p className="text-sm text-surface-500">Basic scenario information</p>
                        </div>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('scenario_title')} <span className="text-accent-500">*</span></label>
                            <input
                                type="text"
                                className="w-full p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                value={formData.title}
                                onChange={e => handleRootChange('title', e.target.value)}
                                placeholder={language === 'he' ? 'הכנס כותרת לתרחיש...' : t('enter_title')}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-surface-700 mb-2">{t('category')} <span className="text-accent-500">*</span></label>
                                <select
                                    className="w-full p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                                    value={formData.category}
                                    onChange={e => handleRootChange('category', e.target.value)}
                                >
                                    <option value="">{language === 'he' ? 'בחר קטגוריה...' : t('select_category')}</option>
                                    {CATEGORY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {language === 'he' ? opt.label.he : opt.label.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-surface-700 mb-2">{t('duration')} <span className="text-accent-500">*</span></label>
                                <select
                                    className="w-full p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all appearance-none cursor-pointer"
                                    value={formData.duration}
                                    onChange={e => handleRootChange('duration', e.target.value)}
                                >
                                    <option value="">{language === 'he' ? 'בחר משך...' : t('select_duration')}</option>
                                    {DURATION_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>
                                            {language === 'he' ? opt.label.he : opt.label.en}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('scenario_description')} <span className="text-accent-500">*</span></label>
                            <textarea
                                className="w-full p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all h-32 resize-none"
                                value={formData.opening?.description}
                                onChange={e => handleInputChange('opening', 'description', e.target.value)}
                                placeholder={language === 'he' ? 'תאר את התרחיש בקצרה...' : t('brief_description')}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('image_url')}</label>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    className="flex-1 p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                    value={formData.opening?.imageUrl}
                                    onChange={e => handleInputChange('opening', 'imageUrl', e.target.value)}
                                    placeholder="https://images.unsplash.com/..."
                                />
                                <button type="button" className="px-4 py-2 bg-surface-100 text-surface-600 rounded-xl hover:bg-surface-200 transition-colors flex items-center gap-2">
                                    <ImageIcon size={18} />
                                </button>
                            </div>
                            <p className="text-xs text-surface-400 mt-1.5">{language === 'he' ? 'השתמש בתמונה מ-Unsplash או כתובת URL אחרת' : t('use_image_url')}</p>
                        </div>
                    </div>
                </div>
            );
            case 2: return (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-surface-900">{t('step_2_problem')}</h3>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('problem_statement')}</label>
                            <textarea
                                className="w-full p-3 border border-surface-200 rounded-xl h-32"
                                value={formData.problem?.text}
                                onChange={e => handleInputChange('problem', 'text', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('context')}</label>
                            <textarea
                                className="w-full p-3 border border-surface-200 rounded-xl h-24"
                                value={formData.problem?.context}
                                onChange={e => handleInputChange('problem', 'context', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('image_url')}</label>
                            <input
                                type="text"
                                className="w-full p-3 border border-surface-200 rounded-xl"
                                value={formData.problem?.imageUrl}
                                onChange={e => handleInputChange('problem', 'imageUrl', e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            );
            case 3: return (
                <div className="space-y-6 animate-fade-in">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <BarChart3 size={20} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900">{t('data_analysis')}</h3>
                            <p className="text-sm text-surface-500">{language === 'he' ? 'הגדר את הנתונים שיוצגו לתלמידים' : 'Configure data to be shown to students'}</p>
                        </div>
                    </div>
                    <div className="grid gap-5">
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('description')} <span className="text-accent-500">*</span></label>
                            <textarea
                                className="w-full p-3.5 border border-surface-200 rounded-xl bg-surface-50 focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all h-24 resize-none"
                                value={formData.data?.description}
                                onChange={e => handleInputChange('data', 'description', e.target.value)}
                                placeholder={language === 'he' ? 'תאר את הנתונים שיוצגו בתרשים...' : 'Describe the data to be shown in the chart...'}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-surface-700 mb-2">{t('chart_type')} <span className="text-accent-500">*</span></label>
                            <div className="grid grid-cols-3 gap-3">
                                {CHART_TYPE_OPTIONS.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => handleInputChange('data', 'chartType', opt.value)}
                                        className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                                            formData.data?.chartType === opt.value
                                                ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                : 'border-surface-200 bg-white text-surface-600 hover:border-primary-200 hover:bg-primary-50/50'
                                        }`}
                                    >
                                        {opt.value === 'bar' && <BarChart3 size={24} />}
                                        {opt.value === 'pie' && <PieChartIcon size={24} />}
                                        {opt.value === 'line' && <TrendingUp size={24} />}
                                        <span className="text-sm font-medium">{language === 'he' ? opt.label.he : opt.label.en}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="bg-accent-50 border border-accent-100 rounded-xl p-4 flex gap-3">
                            <HelpCircle size={20} className="text-accent-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-accent-800 font-medium">{language === 'he' ? 'טיפ' : 'Tip'}</p>
                                <p className="text-xs text-accent-700">{language === 'he' ? 'נקודות הנתונים יכולות להיערך בשלב מתקדם יותר או מיובאות מקובץ CSV.' : 'Data points can be edited in advanced mode or imported from CSV.'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 4: return (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-surface-900">{t('critical_analysis')}</h3>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('analysis_questions')}</label>
                            <p className="text-xs text-surface-500 mb-2">Separate questions with a new line</p>
                            <textarea
                                className="w-full p-3 border border-surface-200 rounded-xl h-32"
                                value={formData.analysis?.questions.join('\n')}
                                onChange={e => handleInputChange('analysis', 'questions', e.target.value.split('\n'))}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('key_terms')}</label>
                            <p className="text-xs text-surface-500 mb-2">Comma separated</p>
                            <input
                                type="text"
                                className="w-full p-3 border border-surface-200 rounded-xl"
                                value={formData.analysis?.keyTerms.join(', ')}
                                onChange={e => handleInputChange('analysis', 'keyTerms', e.target.value.split(',').map(s => s.trim()))}
                            />
                        </div>
                    </div>
                </div>
            );
            case 5: return (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-surface-900">{t('proposed_solution')}</h3>
                    <div className="grid gap-4">
                        {/* Simplified solution editor for MVP */}
                        <p className="text-sm text-surface-500">Edit solutions in JSON mode for advanced control.</p>
                    </div>
                </div>
            );
            case 6: return (
                <div className="space-y-6 animate-fade-in">
                    <h3 className="text-xl font-bold text-surface-900">{t('reflection')}</h3>
                    <div className="grid gap-4">
                        <div>
                            <label className="block text-sm font-medium text-surface-700 mb-1">{t('reflection_questions')}</label>
                            <textarea
                                className="w-full p-3 border border-surface-200 rounded-xl h-32"
                                value={formData.reflection?.questions.join('\n')}
                                onChange={e => handleInputChange('reflection', 'questions', e.target.value.split('\n'))}
                            />
                        </div>
                    </div>
                </div>
            );
            default: return (
                <div className="text-center py-10">
                    <CheckCircle size={48} className="mx-auto text-secondary-500 mb-4" />
                    <h3 className="text-xl font-bold text-surface-900">{t('ready_to_create')}</h3>
                    <p className="text-surface-500">{t('review_scenario')}</p>
                </div>
            );
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-surface-200 shadow-xl overflow-hidden flex flex-col min-h-[600px]">
            <div className="p-8 border-b border-surface-100 flex justify-between items-center bg-surface-50/50">
                <div>
                    <h2 className="text-2xl font-extrabold text-surface-900">{t('create_new')}</h2>
                    <p className="text-surface-500 text-sm">{t('step')} {step} {t('of')} 7</p>
                </div>
                <div className="flex gap-1">
                    {[1, 2, 3, 4, 5, 6, 7].map(s => (
                        <div key={s} className={`w-2 h-2 rounded-full transition-all ${step >= s ? 'bg-primary-600' : 'bg-surface-200'}`}></div>
                    ))}
                </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto">
                {renderStep()}
            </div>

            <div className="p-6 border-t border-surface-100 bg-surface-50 flex justify-between items-center">
                <button
                    onClick={() => step === 1 ? onCancel() : setStep(s => Math.max(1, s - 1))}
                    className="px-6 py-3 rounded-xl font-bold text-surface-500 hover:bg-surface-200 transition-colors"
                >
                    {t('back')}
                </button>

                {step < 7 ? (
                    <button
                        onClick={() => setStep(s => Math.min(7, s + 1))}
                        className="bg-surface-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-600 transition-colors shadow-lg"
                    >
                        {t('continue')}
                    </button>
                ) : (
                    <button
                        onClick={() => onSave(formData as Scenario)}
                        className="bg-secondary-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-secondary-600 transition-colors shadow-lg flex items-center gap-2"
                    >
                        <Save size={18} /> {t('save_library')}
                    </button>
                )}
            </div>
        </div>
    );
};
