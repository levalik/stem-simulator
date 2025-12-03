import React from 'react';
import { useStore } from '../../../../app/store';
import { Activity, Lightbulb } from 'lucide-react';
import { StepHeader, NavButtons } from './StepComponents';
import { Card } from '../../../../shared/ui/DesignSystem';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell, PieChart, Pie, LineChart, Line } from 'recharts';

export const DataStep = ({ onNext, onPrev }: { onNext: () => void; onPrev: () => void }) => {
    const { activeScenario, t, language } = useStore();
    if (!activeScenario) return null;

    const renderChart = () => {
        const type = activeScenario.data.chartType;
        const data = activeScenario.data.chartData;
        
        // Theme colors
        const colors = ['#8b5cf6', '#14b8a6', '#f43f5e', '#f59e0b']; // Primary, Secondary, Accent, Amber

        if (type === 'pie') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )
        }

        if (type === 'line') {
            return (
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} tick={{ fill: '#71717a' }} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#71717a' }} />
                        <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                        <Legend />
                        <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={4} dot={{ r: 6, fill: '#fff', strokeWidth: 3 }} activeDot={{ r: 8 }} />
                    </LineChart>
                </ResponsiveContainer>
            )
        }

        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{ fill: '#71717a', fontSize: 12 }} axisLine={false} tickLine={false} />
                    <RechartsTooltip cursor={{ fill: '#f4f4f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar dataKey="value" fill="#8b5cf6" radius={[8, 8, 0, 0]} maxBarSize={60}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <StepHeader title={t('data_analysis')} step={2} helpText={t('analyze_data_help')} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Card */}
                <Card className="lg:col-span-2 p-8 shadow-xl shadow-surface-200/50">
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold text-surface-900 flex items-center gap-3">
                            <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                                <Activity size={20} />
                            </div>
                            {activeScenario.data.description}
                        </h3>
                    </div>

                    <div className="h-[400px] w-full">
                        {renderChart()}
                    </div>
                </Card>

                {/* Key Facts Sidebar */}
                <div className="space-y-6">
                    <Card className="!bg-surface-900 text-white shadow-xl">
                        <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Lightbulb size={20} className="text-secondary-400" />
                            {t('key_facts')}
                        </h4>
                        <ul className="space-y-4">
                            {activeScenario.data.facts ? activeScenario.data.facts.map((fact, idx) => (
                                <li key={idx} className="flex gap-3 text-sm leading-relaxed text-surface-300">
                                    <span className="text-primary-400 font-bold mt-0.5">•</span>
                                    {fact}
                                </li>
                            )) : (
                                <li className="text-surface-400 italic text-sm">{t('no_facts')}</li>
                            )}
                        </ul>
                    </Card>

                    <Card className="shadow-lg">
                        <h4 className="font-bold text-surface-900 mb-3 text-sm uppercase tracking-wider">{t('analysis_tip')}</h4>
                        <p className="text-sm text-surface-500 leading-relaxed">
                            {t('analysis_tip_content')}
                        </p>
                    </Card>
                </div>
            </div>

            <NavButtons onNext={onNext} onPrev={onPrev} />
        </div>
    );
};
