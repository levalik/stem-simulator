import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { LogOut, Menu, X, Home } from 'lucide-react';
import { Logo } from "../../shared/ui/Logo";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, language, setLanguage, t, resetSimulation } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    resetSimulation();
    navigate({ to: '/' });
  };

  const isAdmin = currentUser?.role === 'admin';
  const isDashboard = location.pathname.includes('/dashboard');

  const handleNavigateHome = () => {
    if (isAdmin) {
      navigate({ to: '/admin' });
    } else {
      navigate({ to: '/dashboard' });
    }
  };

  return (
    <div className={`min-h-screen bg-surface-50 flex flex-col font-sans ${language === 'he' ? 'rtl' : 'ltr'}`}>
      <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-surface-200/60 shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleNavigateHome}
          >
            <div className="transition-transform group-hover:scale-110 duration-300">
              <Logo className="w-8 h-8" classNamePath="fill-primary-600" />
            </div>
            <span className="font-bold text-xl tracking-tight text-surface-900 group-hover:text-primary-600 transition-colors">STEM Simulator</span>
          </div>

          {/* Desktop Navigation */}
          {currentUser && !isAdmin && (
            <nav className="hidden md:flex items-center gap-1 mx-6">
              <button
                onClick={() => navigate({ to: '/dashboard' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isDashboard ? 'bg-primary-50 text-primary-700 shadow-sm ring-1 ring-primary-200' : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900'}`}
              >
                <Home size={18} />
                {t('dashboard')}
              </button>
            </nav>
          )}

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-surface-100 rounded-full p-1 border border-surface-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-primary-600 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('he')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${language === 'he' ? 'bg-white text-primary-600 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
              >
                עב
              </button>
            </div>

            {currentUser && (
              <>
                {/* User Menu */}
                <div className="hidden md:flex items-center gap-4 pl-4 border-l border-surface-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xs font-bold shadow-md shadow-primary-200">
                      {currentUser.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex flex-col items-start">
                        <span className="text-sm font-bold text-surface-800 leading-none">{currentUser.name?.split(' ')[0]}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isAdmin ? 'text-accent-600' : 'text-secondary-600'}`}>
                            {isAdmin ? t('admin') : t('teacher')}
                        </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="p-2 text-surface-400 hover:text-accent-600 hover:bg-accent-50 rounded-full transition-all"
                    title={t('sign_out')}
                  >
                    <LogOut size={18} />
                  </button>
                </div>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-surface-600 hover:bg-surface-100 rounded-lg transition-colors"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && currentUser && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white border-b border-surface-200 shadow-lg animate-fade-in">
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-3 p-3 bg-surface-50 rounded-xl mb-4 border border-surface-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white font-bold shadow-sm">
                  {currentUser.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <p className="font-bold text-surface-900">{currentUser.name}</p>
                  <p className="text-xs text-surface-500">{currentUser.email}</p>
                </div>
              </div>

              {!isAdmin && (
                <button
                  onClick={() => { navigate({ to: '/dashboard' }); setMobileMenuOpen(false); }}
                  className="w-full flex items-center gap-3 p-3 rounded-xl text-surface-700 hover:bg-surface-50 transition-colors font-medium"
                >
                  <Home size={20} />
                  {t('dashboard')}
                </button>
              )}

              <button
                onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut size={20} />
                {t('sign_out')}
              </button>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow pt-16">
        {children}
      </main>
    </div>
  );
};
