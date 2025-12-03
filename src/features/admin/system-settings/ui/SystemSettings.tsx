import React, { useState } from 'react';
import { useStore } from '../../../../app/store';

export const SystemSettings = () => {
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
