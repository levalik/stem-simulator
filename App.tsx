import React from 'react';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { TeacherFlow } from './components/TeacherFlow';
import { AdminPanel } from './components/AdminPanel';
import { Logo } from './components/Logo';
import { PlayCircle, ShieldCheck, Clock, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

const LoginView = () => {
  const { login, language, setLanguage, t } = useStore();
  const isRTL = language === 'he';
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  // Ensure direction is set even before layout loads
  React.useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (email === 'demo' && password === 'demo') {
      login({ id: 'u1', name: 'Demo Teacher', role: 'teacher', email: 'demo@edu.com' });
    } else if (email === 'admin' && password === 'admin') {
      login({ id: 'a1', name: 'Admin User', role: 'admin', email: 'admin@edu.com' });
    } else {
      setError(t('invalid_credentials'));
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="login-card glass animate-fade-in-up">
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setLanguage('en')}
            className={`text-xs font-bold px-2 py-1 rounded ${language === 'en' ? 'bg-zinc-200' : 'text-zinc-400'}`}
          >EN</button>
          <button
            onClick={() => setLanguage('he')}
            className={`text-xs font-bold px-2 py-1 rounded ${language === 'he' ? 'bg-zinc-200' : 'text-zinc-400'}`}
          >עב</button>
        </div>

        <div className="login-header">
          <div className="logo-container animate-float">
            <Logo className="w-12 h-12" />
          </div>
          <h1 className="app-title">STEM Simulator</h1>
          <p className="app-subtitle">AI-Enhanced Training for Modern Educators</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="form-group">
            <label className="form-label">{t('email') || 'Username/Email'}</label>
            <input
              type="text"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demo"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t('password')}</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="demo"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary">
            {t('login')} <ArrowRight size={20} />
          </button>

          <div className="text-center text-xs text-zinc-400 mt-4 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
            {t('login_hint')}
          </div>
        </form>

        <div className="text-center space-y-2 pt-6">
          <p className="text-xs text-zinc-400 font-medium">{t('version')} 1.0.0 • <a href="https://www.siema.co.il/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">{t('powered_by_siema')}</a></p>
          <p className="text-[10px] text-zinc-300 uppercase tracking-widest">{t('demo_mode_warning')}</p>
        </div>
      </div>
    </div>
  );
};

const TeacherDashboard = () => {
  const { scenarios, startSimulation, t, language } = useStore();
  const isRTL = language === 'he';

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 pb-8">
        <div className="space-y-2 animate-fade-in-up">
          <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">{t('dashboard')}</h2>
          <p className="text-lg text-zinc-500">{t('welcome')}, {t('select_training_module')}</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-wide">
            {scenarios.length} {t('active_modules')}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {scenarios.map((scenario, index) => (
          <div key={scenario.id} className="scenario-card group animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            <div className="card-image-container">
              <img
                src={scenario.opening.imageUrl || "/placeholder.svg"}
                alt={scenario.title}
                className="card-image"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>
              <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                <span className="tag shadow-sm">
                  <Tag size={12} className="text-violet-500" /> {scenario.category}
                </span>
              </div>
            </div>
            <div className="card-content">
              <h3 className="card-title group-hover:text-violet-600 transition-colors">{scenario.title}</h3>
              <p className="card-desc">{scenario.opening.description}</p>

              <div className="card-footer">
                <span className="tag">
                  <Clock size={14} /> {scenario.duration}
                </span>
                <button
                  onClick={() => startSimulation(scenario.id)}
                  className="btn-start group-hover:bg-violet-600 group-hover:text-white"
                  title={t('tooltip_start_scenario')}
                >
                  {t('start')} {isRTL ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function App() {
  const { currentView } = useStore();

  if (currentView === 'login') {
    return <LoginView />;
  }

  return (
    <Layout>
      {currentView === 'teacher_dashboard' && <TeacherDashboard />}
      {currentView === 'teacher_simulation' && <TeacherFlow />}
      {currentView === 'admin_dashboard' && <AdminPanel />}
      {currentView === 'admin_editor' && <AdminPanel />}
    </Layout>
  );
}

export default App;