import React, { useState } from 'react';
import { useStore } from '../store';
import { Plus, Users, Settings, Wand2, Save, FileText, Trash2, Edit2, LayoutDashboard, BarChart3, Search, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import { generateScenarioFromTopic } from '../services/geminiService';
import { Scenario } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AdminPanel = () => {
    const { scenarios, addScenario, t } = useStore();
    const [view, setView] = useState<'list' | 'create' | 'analytics' | 'users' | 'settings'>('list');
    
    const SidebarItem = ({ icon: Icon, label, active, onClick }: any) => (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
                active 
                ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-200' 
                : 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
            }`}
        >
            <Icon size={20} className={active ? "text-violet-300" : ""} /> {label}
        </button>
    );

    const renderContent = () => {
        switch(view) {
            case 'create': return <CreateScenarioForm onSave={(s) => { addScenario(s); setView('list'); }} />;
            case 'analytics': return <AnalyticsDashboard />;
            case 'users': return <UserManagement />;
            case 'settings': return <SystemSettings />;
            default: return <ScenarioList onViewCreate={() => setView('create')} />;
        }
    };

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Sidebar */}
            <div className="col-span-12 md:col-span-3">
                <div className="bg-white rounded-2xl border border-zinc-200 p-4 h-fit sticky top-24 shadow-sm">
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
                        <div className="h-px bg-zinc-100 my-2"></div>
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

                    <div className="mt-8 pt-8 border-t border-zinc-100 px-2 hidden md:block">
                        <div className="bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl p-5 text-white shadow-lg shadow-violet-200">
                            <p className="text-xs font-medium text-violet-200 mb-1 uppercase tracking-wider">{t('total_scenarios')}</p>
                            <div className="flex items-baseline gap-2">
                                <p className="text-3xl font-bold">{scenarios.length}</p>
                                <span className="text-xs text-violet-200">{t('active_modules')}</span>
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

const ScenarioList = ({ onViewCreate }: { onViewCreate: () => void }) => {
    const { scenarios, t } = useStore();
    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{t('scenario_library')}</h2>
                <button onClick={onViewCreate} className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors">
                    + {t('create_new')}
                </button>
            </div>
            <div className="grid gap-4">
                {scenarios.map(s => (
                    <div key={s.id} className="group bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all duration-300 flex justify-between items-center">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-zinc-100 rounded-lg flex items-center justify-center text-zinc-400 group-hover:bg-violet-100 group-hover:text-violet-600 transition-colors shrink-0">
                                <FileText size={24} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 group-hover:text-violet-600 transition-colors">{s.title}</h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-xs font-semibold px-2 py-0.5 bg-zinc-100 text-zinc-600 rounded-md">{s.category}</span>
                                    <span className="text-zinc-400 text-xs">• {s.duration}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity md:translate-x-2 md:group-hover:translate-x-0 rtl:md:-translate-x-2 rtl:md:group-hover:translate-x-0">
                            <button className="p-2 text-zinc-400 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-colors"><Edit2 size={18}/></button>
                            <button className="p-2 text-zinc-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 size={18}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const AnalyticsDashboard = () => {
    const { t } = useStore();
    // Mock Data
    const usageData = [
        { name: 'Mon', runs: 12 }, { name: 'Tue', runs: 19 }, { name: 'Wed', runs: 15 },
        { name: 'Thu', runs: 22 }, { name: 'Fri', runs: 28 }, { name: 'Sat', runs: 8 }, { name: 'Sun', runs: 5 }
    ];
    const completionData = [
        { name: 'Completed', value: 85 },
        { name: 'Dropped', value: 15 },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
             <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{t('analytics')}</h2>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                     <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-2">Total Sessions</p>
                     <p className="text-4xl font-extrabold text-zinc-900">1,248</p>
                     <div className="mt-2 text-emerald-600 text-sm font-medium flex items-center gap-1">
                         <span>▲ 12%</span> <span className="text-zinc-400">vs last week</span>
                     </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                     <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-2">Avg. Score</p>
                     <p className="text-4xl font-extrabold text-zinc-900">88%</p>
                     <div className="mt-2 text-emerald-600 text-sm font-medium flex items-center gap-1">
                         <span>▲ 4%</span> <span className="text-zinc-400">vs last week</span>
                     </div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
                     <p className="text-zinc-500 text-sm font-medium uppercase tracking-wider mb-2">Active Teachers</p>
                     <p className="text-4xl font-extrabold text-zinc-900">342</p>
                     <div className="mt-2 text-zinc-400 text-sm font-medium flex items-center gap-1">
                         <span>- 0%</span> <span className="text-zinc-400">vs last week</span>
                     </div>
                 </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-[350px]">
                     <h3 className="font-bold text-zinc-800 mb-6">Weekly Activity</h3>
                     <ResponsiveContainer width="100%" height="85%">
                        <BarChart data={usageData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa'}} />
                            <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa'}} />
                            <Tooltip cursor={{fill: '#f4f4f5'}} contentStyle={{borderRadius: '8px', border: 'none'}} />
                            <Bar dataKey="runs" fill="#8b5cf6" radius={[4,4,0,0]} barSize={32} />
                        </BarChart>
                     </ResponsiveContainer>
                 </div>
                 <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm h-[350px]">
                     <h3 className="font-bold text-zinc-800 mb-6">Completion Rate</h3>
                     <ResponsiveContainer width="100%" height="85%">
                        <PieChart>
                            <Pie
                                data={completionData}
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                            >
                                <Cell fill="#10b981" />
                                <Cell fill="#f43f5e" />
                            </Pie>
                            <Tooltip />
                        </PieChart>
                     </ResponsiveContainer>
                     <div className="flex justify-center gap-6 text-sm">
                         <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Completed</div>
                         <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500"></span> Dropped</div>
                     </div>
                 </div>
             </div>
        </div>
    );
};

const UserManagement = () => {
    const { t } = useStore();
    // Mock Users
    const users = [
        { id: 1, name: "Alex Johnson", email: "alex@edu.com", role: "Teacher", status: "Active" },
        { id: 2, name: "Sarah Connor", email: "sarah@admin.com", role: "Admin", status: "Active" },
        { id: 3, name: "Mike Ross", email: "mike@law.com", role: "Teacher", status: "Inactive" },
        { id: 4, name: "Jessica P.", email: "jess@edu.com", role: "Teacher", status: "Active" },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
             <div className="flex justify-between items-center mb-2">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{t('user_management')}</h2>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 rtl:left-auto rtl:right-3" size={16} />
                        <input type="text" placeholder="Search users..." className="pl-9 pr-4 rtl:pr-9 rtl:pl-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 outline-none" />
                    </div>
                    <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-800 transition-colors">
                        + Add User
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
                <table className="w-full text-left rtl:text-right text-sm text-zinc-600">
                    <thead className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-900">
                        <tr>
                            <th className="px-6 py-4">{t('name')}</th>
                            <th className="px-6 py-4">{t('role')}</th>
                            <th className="px-6 py-4">{t('status')}</th>
                            <th className="px-6 py-4 text-right rtl:text-left">{t('actions')}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-100">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-medium text-zinc-900">{user.name}</p>
                                            <p className="text-xs text-zinc-400">{user.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${user.role === 'Admin' ? 'bg-indigo-50 text-indigo-700 border-indigo-100' : 'bg-slate-50 text-slate-600 border-slate-100'}`}>
                                        {user.role === 'Admin' ? <Shield size={10} /> : <Users size={10} />}
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-zinc-100 text-zinc-500'}`}>
                                        {user.status === 'Active' ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                        {user.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right rtl:text-left">
                                    <button className="text-zinc-400 hover:text-violet-600 font-medium text-xs px-2">{t('edit')}</button>
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
    return (
        <div className="max-w-2xl space-y-8 animate-fade-in">
             <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{t('system_settings')}</h2>
             
             <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm divide-y divide-zinc-100">
                 <div className="p-6 flex items-center justify-between">
                     <div>
                         <h4 className="font-bold text-zinc-900">Email Notifications</h4>
                         <p className="text-sm text-zinc-500">Receive weekly reports on usage.</p>
                     </div>
                     <div className="w-11 h-6 bg-violet-600 rounded-full relative cursor-pointer">
                         <div className="absolute right-1 rtl:right-auto rtl:left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                     </div>
                 </div>
                 <div className="p-6 flex items-center justify-between">
                     <div>
                         <h4 className="font-bold text-zinc-900">AI Model Configuration</h4>
                         <p className="text-sm text-zinc-500">Currently using Gemini 2.5 Flash.</p>
                     </div>
                     <button className="text-sm font-bold text-violet-600 hover:underline">Change</button>
                 </div>
                 <div className="p-6 flex items-center justify-between">
                     <div>
                         <h4 className="font-bold text-zinc-900">Data Export</h4>
                         <p className="text-sm text-zinc-500">Download all simulation logs as CSV.</p>
                     </div>
                     <button className="bg-white border border-zinc-200 text-zinc-700 px-3 py-1.5 rounded-lg text-sm font-bold hover:bg-zinc-50">Export</button>
                 </div>
             </div>
        </div>
    );
}

const CreateScenarioForm = ({ onSave }: { onSave: (s: Scenario) => void }) => {
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const [generatedScenario, setGeneratedScenario] = useState<Partial<Scenario> | null>(null);
    const { t } = useStore();

    const handleGenerate = async () => {
        if (!topic) return;
        setLoading(true);
        const result = await generateScenarioFromTopic(topic);
        if (result) {
            setGeneratedScenario({ ...result, id: crypto.randomUUID() });
        }
        setLoading(false);
    };

    return (
        <div className="space-y-8 animate-fade-in">
             <div className="flex items-center justify-between">
                <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">{t('create_new')}</h2>
             </div>
             
             {!generatedScenario ? (
                 <div className="bg-white p-12 rounded-3xl border border-zinc-200 shadow-sm text-center space-y-8 relative overflow-hidden">
                     {/* Background blob */}
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-violet-50 rounded-full blur-3xl -z-10"></div>

                     <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-xl shadow-violet-200">
                         <Wand2 size={40} />
                     </div>
                     <div>
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2">{t('ai_generator')}</h3>
                        <p className="text-zinc-500 max-w-md mx-auto text-lg">Describe the STEM topic. We'll generate the full learning path, data sets, and logic.</p>
                     </div>
                     
                     <div className="max-w-xl mx-auto flex gap-3 p-2 bg-white rounded-2xl shadow-lg border border-zinc-100">
                         <input 
                            type="text" 
                            className="flex-1 bg-transparent border-none rounded-xl px-4 py-3 text-lg focus:ring-0 placeholder:text-zinc-300 outline-none"
                            placeholder="e.g. Urban Water Conservation..."
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                         />
                         <button 
                            onClick={handleGenerate}
                            disabled={loading || !topic}
                            className="bg-zinc-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-violet-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md shrink-0"
                        >
                            {loading ? t('analyzing') : <><Wand2 size={18}/> {t('generate')}</>}
                        </button>
                     </div>
                 </div>
             ) : (
                 <div className="bg-white p-8 rounded-3xl border border-zinc-200 shadow-xl space-y-8 animate-fade-in-up">
                     <div className="flex justify-between items-start pb-6 border-b border-zinc-100">
                         <div>
                             <span className="text-xs font-bold text-violet-600 uppercase tracking-wide mb-1 block">{t('preview_draft')}</span>
                             <h3 className="text-2xl font-bold text-zinc-900">{generatedScenario.title}</h3>
                         </div>
                         <div className="flex gap-3">
                             <button onClick={() => setGeneratedScenario(null)} className="px-4 py-2.5 text-zinc-500 hover:text-zinc-900 font-medium">{t('discard')}</button>
                             <button 
                                onClick={() => onSave(generatedScenario as Scenario)}
                                className="bg-emerald-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-emerald-600 shadow-lg shadow-emerald-200 flex items-center gap-2 transition-all"
                            >
                                <Save size={18} /> {t('save_library')}
                            </button>
                         </div>
                     </div>
                     
                     <div className="space-y-6">
                         <div className="grid grid-cols-2 gap-6">
                             <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                 <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t('category')}</span>
                                 <p className="font-semibold text-zinc-900 mt-1">{generatedScenario.category}</p>
                             </div>
                             <div className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100">
                                 <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{t('duration')}</span>
                                 <p className="font-semibold text-zinc-900 mt-1">{generatedScenario.duration}</p>
                             </div>
                         </div>
                         
                         <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                             <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Problem Statement</span>
                             <p className="text-zinc-700 mt-2 leading-relaxed">{generatedScenario.problem?.text}</p>
                         </div>

                         <div className="p-6 bg-zinc-50 rounded-2xl border border-zinc-100">
                             <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Generated Solutions</span>
                             <ul className="mt-4 space-y-3">
                                 {generatedScenario.solutions?.options.map((opt: any) => (
                                     <li key={opt.id} className="flex gap-3 items-center bg-white p-3 rounded-xl border border-zinc-100 shadow-sm">
                                         <span className={`w-3 h-3 rounded-full shrink-0 ${opt.correct ? 'bg-emerald-500' : 'bg-rose-400'}`}></span>
                                         <span className="text-zinc-700 font-medium">{opt.text}</span>
                                     </li>
                                 ))}
                             </ul>
                         </div>
                         
                         <div className="bg-amber-50 text-amber-900 p-4 rounded-xl text-sm flex items-center gap-3 border border-amber-100">
                             <FileText size={18} className="text-amber-600"/>
                             <span>Full Scenario JSON data generated and ready for deployment.</span>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
};