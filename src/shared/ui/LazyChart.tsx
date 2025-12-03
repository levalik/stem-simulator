import React, { Suspense } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend, LineChart, CartesianGrid, XAxis, YAxis, Line, BarChart, Bar } from 'recharts';

const colors = ['#8b5cf6', '#14b8a6', '#f43f5e', '#f59e0b'];

export const LazyChart = ({ type, data }: { type: string, data: any[] }) => {
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
                        {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                    </Pie>
                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
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
        );
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
                    {data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default LazyChart;
