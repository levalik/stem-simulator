import { createFileRoute, useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { useStore } from '../app/store';
import { Logo } from '../shared/ui/Logo';
import { ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const { login, language, setLanguage, t } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'demo' && password === 'demo') {
      login({ id: 'u1', name: 'Demo Teacher', role: 'teacher', email: 'demo@edu.com' });
      navigate({ to: '/dashboard' });
    } else if (email === 'admin' && password === 'admin') {
      login({ id: 'a1', name: 'Admin User', role: 'admin', email: 'admin@edu.com' });
      navigate({ to: '/admin' });
    } else {
      setError(t('invalid_credentials'));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary-200/30 blur-3xl animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary-200/30 blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl relative z-10 glass animate-fade-in-up">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'en' ? 'bg-surface-200 text-surface-900' : 'text-surface-400 hover:text-surface-600'}`}
          >EN</button>
          <button
            onClick={() => setLanguage('he')}
            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'he' ? 'bg-surface-200 text-surface-900' : 'text-surface-400 hover:text-surface-600'}`}
          >עב</button>
          <button
            onClick={() => setLanguage('ar')}
            className={`text-xs font-bold px-2 py-1 rounded transition-colors ${language === 'ar' ? 'bg-surface-200 text-surface-900' : 'text-surface-400 hover:text-surface-600'}`}
          >عربي</button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-block mb-4 animate-float">
            <Logo className="w-16 h-16" classNamePath="fill-primary-600" spin={true} />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 mb-2">STEM Simulator</h1>
          <p className="text-surface-500">AI-Enhanced Training for Modern Educators</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">{t('email') || 'Username/Email'}</label>
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-surface-700">{t('password')}</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo"
            />
          </div>

          {error && <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100">{error}</div>}

          <button type="submit" className="btn-primary">
            {t('login')} <ArrowRight size={20} />
          </button>

          <div className="text-center text-xs text-surface-400 mt-4 bg-surface-50 p-2 rounded-lg border border-surface-100">
            {t('login_hint')}
          </div>
        </form>

        <div className="text-center space-y-2 pt-6">
          <p className="text-xs text-surface-400 font-medium">{t('version')} {__APP_VERSION__} • <a href="https://www.siema.co.il/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{t('powered_by_siema')}</a></p>
          <p className="text-[10px] text-surface-300 uppercase tracking-widest">{t('demo_mode_warning')}</p>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: LoginPage,
});
