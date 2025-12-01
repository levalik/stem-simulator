import React from 'react';
import { useStore } from './store';
import { Layout } from './components/Layout';
import { TeacherFlow } from './components/TeacherFlow';
import { AdminPanel } from './components/AdminPanel';
import { PlayCircle, ShieldCheck, Sparkles, Clock, Tag, ArrowRight, ArrowLeft } from 'lucide-react';

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
      setError('Invalid credentials. Try user:demo / pass:demo');
    }
  };

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div className="bg-blob blob-1"></div>
      <div className="bg-blob blob-2"></div>

      <div className="login-card">
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
          <div className="logo-container">
            <Sparkles className="text-white w-10 h-10" />
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
            <label className="form-label">Password</label>
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
            {t('login_teacher')} <ArrowRight size={20} />
          </button>

          <div className="text-center text-xs text-zinc-400 mt-4 bg-zinc-50 p-2 rounded-lg border border-zinc-100">
            {t('login_hint')}
          </div>
        </form>

        <p className="text-xs text-zinc-400 font-medium pt-6 text-center">Version 1.0.0 • Powered by Google Gemini</p>
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
        <div className="space-y-2">
          <h2 className="text-4xl font-extrabold text-zinc-900 tracking-tight">{t('dashboard')}</h2>
          <p className="text-lg text-zinc-500">{t('welcome')}, select a training module.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-bold uppercase tracking-wide">
            {scenarios.length} {t('active_modules')}
          </span>
        </div>
      </div>

      <div className="dashboard-grid">
        {scenarios.map((scenario) => (
          <div key={scenario.id} className="scenario-card group">
            <div className="card-image-container">
              <img
                src={scenario.opening.imageUrl || "https://picsum.photos/400/200"}
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
                  className="btn-start"
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