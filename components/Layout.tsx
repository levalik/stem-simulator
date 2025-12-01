import React, { useEffect } from 'react';
import { useStore } from '../store';
import { LogOut, User as UserIcon, Sparkles, Globe } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, language, setLanguage, t } = useStore();

  useEffect(() => {
    // Set direction on the html tag for proper RTL support throughout the app
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`min-h-screen bg-zinc-50 flex flex-col font-sans ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/20 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Sparkles className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 tracking-tight">STEM Simulator</span>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Language Switcher */}
             <div className="flex items-center bg-zinc-100 rounded-lg p-1 border border-zinc-200">
                <button 
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-violet-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLanguage('he')}
                  className={`px-3 py-1 rounded-md text-xs font-bold transition-all ${language === 'he' ? 'bg-white text-violet-700 shadow-sm' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  עב
                </button>
             </div>

            {currentUser && (
              <div className="flex items-center gap-6 rtl:space-x-reverse">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-zinc-100/50 rounded-full border border-zinc-200/50 rtl:flex-row-reverse">
                   <span className="text-sm font-medium text-zinc-600 pl-1">{currentUser.name} <span className="text-zinc-400">|</span> <span className="capitalize">{currentUser.role}</span></span>
                   <div className="bg-white p-1 rounded-full shadow-sm text-zinc-600">
                      <UserIcon size={14} />
                   </div>
                </div>
                <button 
                  onClick={logout}
                  className="text-sm font-semibold text-rose-500 hover:text-rose-600 hover:bg-rose-50 px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 rtl:flex-row-reverse"
                >
                  <LogOut size={16} />
                  {t('sign_out')}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-20 animate-fade-in-up">
        {children}
      </main>

      <footer className="bg-white border-t border-zinc-100 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center space-y-2">
          <p className="text-zinc-400 text-sm font-medium">
            © {new Date().getFullYear()} STEM Simulator.
          </p>
          <p className="text-xs text-zinc-300">Powered by Google Gemini</p>
        </div>
      </footer>
    </div>
  );
};