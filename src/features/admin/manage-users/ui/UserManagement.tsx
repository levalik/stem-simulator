import React, { useState } from 'react';
import { Search, Shield, Users, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../../../../app/store';

export const UserManagement = () => {
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
