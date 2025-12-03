import React from 'react';
import { Download, Activity, TrendingUp, Trophy, Users, Clock, BarChart3, PieChart as PieChartIcon, FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { useStore } from '../../../../app/store';

export const AnalyticsDashboard = () => {
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
