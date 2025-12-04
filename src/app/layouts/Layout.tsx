import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { useNavigate, useLocation } from '@tanstack/react-router';
import { LogOut, Menu, X, Home, Settings, BookOpen, Calendar, BarChart2, Search, Bell } from 'lucide-react';
import { Logo } from "../../shared/ui/Logo";

import { Tooltip } from "../../shared/ui/Tooltip";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser, logout, language, setLanguage, t, resetSimulation } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dir = (language === 'he' || language === 'ar') ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const handleLogout = () => {
    logout();
    resetSimulation();
    navigate({ to: '/' });
  };

  const isAdmin = currentUser?.role === 'admin';
  const isDashboard = location.pathname.includes('/dashboard');
  const isAdminPage = location.pathname.includes('/admin');

  const handleNavigateHome = () => {
    if (isAdmin) {
      navigate({ to: '/admin' });
    } else {
      navigate({ to: '/dashboard' });
    }
  };

  const NavItem = ({ icon: Icon, label, active, onClick, tooltip }: { icon: any, label: string, active?: boolean, onClick: () => void, tooltip?: string }) => {
    const button = (
      <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group ${active
          ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30'
          : 'text-surface-500 hover:bg-white hover:text-primary-600 hover:shadow-sm'
          }`}
      >
        <Icon size={20} className={active ? 'text-white' : 'text-surface-400 group-hover:text-primary-600'} />
        <span className={`font-medium ${active ? 'font-bold' : ''}`}>{label}</span>
      </button>
    );

    if (tooltip) {
      return <Tooltip content={tooltip}>{button}</Tooltip>;
    }

    return button;
  };

  return (
    <div className={`flex h-screen bg-surface-50 font-sans ${(language === 'he' || language === 'ar') ? 'rtl' : 'ltr'} overflow-hidden`} dir={(language === 'he' || language === 'ar') ? 'rtl' : 'ltr'}>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-72 flex-col bg-surface-50/50 ltr:border-r rtl:border-l border-surface-200/60 backdrop-blur-xl">
        {/* Logo Area */}
        <div className="h-24 flex items-center px-8">
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={handleNavigateHome}
          >
            <div className="bg-white p-2.5 rounded-2xl shadow-sm border border-surface-100 transition-transform group-hover:scale-105 duration-300">
              <Logo className="w-8 h-8" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-surface-900 group-hover:text-primary-600 transition-colors">STEM Sim</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-6 space-y-2 overflow-y-auto py-6">
          <div className="mb-8">
            <p className="px-4 text-xs font-bold text-surface-400 uppercase tracking-wider mb-4">{t('menu') || 'MENU'}</p>
            <div className="space-y-2">
              {!isAdmin && (
                <NavItem
                  icon={Home}
                  label={t('dashboard')}
                  active={isDashboard}
                  onClick={() => navigate({ to: '/dashboard' })}
                  tooltip={t('tooltip_dashboard')}
                />
              )}
              {isAdmin && (
                <NavItem
                  icon={BarChart2}
                  label={t('admin_panel') || 'Admin Panel'}
                  active={isAdminPage}
                  onClick={() => navigate({ to: '/admin' })}
                  tooltip={t('admin_panel')}
                />
              )}
            </div>
          </div>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-surface-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group"
            >
              <LogOut size={20} className="text-surface-400 group-hover:text-red-600" />
              <span className="font-medium">{t('sign_out')}</span>
            </button>
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="p-6 border-t border-surface-200/60">
          {/* Empty for now or add Help/Support later */}
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0 relative">

        {/* Header */}
        <header className="h-16 md:h-20 flex items-center gap-4 px-4 md:px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-surface-200/60 z-20 w-full">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-surface-600 hover:bg-surface-50 rounded-xl transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Search Bar - Full width */}
          <div className="flex-1 relative group">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pr-3 rtl:pl-0 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-9 rtl:pr-9 rtl:pl-3 pr-3 py-2.5 border border-surface-200 rounded-xl bg-surface-50 text-sm text-surface-900 placeholder-surface-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 focus:bg-white transition-all"
              placeholder={t('search_scenarios') || "Search..."}
              dir="auto"
            />
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 md:gap-3 shrink-0">
            {/* Language Switcher - Compact on mobile */}
            <div className="flex items-center bg-surface-100 rounded-lg p-0.5 border border-surface-200">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${language === 'en' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('he')}
                className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${language === 'he' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
              >
                עב
              </button>
              <button
                onClick={() => setLanguage('ar')}
                className={`px-2 md:px-3 py-1.5 rounded-md text-xs font-bold transition-all ${language === 'ar' ? 'bg-white text-surface-900 shadow-sm' : 'text-surface-500 hover:text-surface-700'}`}
              >
                عربي
              </button>
            </div>

            {currentUser && (
              <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-3 rtl:pl-0 rtl:pr-2 md:rtl:pr-3 ltr:border-l rtl:border-r border-surface-200">
                <Tooltip content={t('tooltip_notifications')}>
                  <button className="hidden md:flex relative p-2 bg-surface-50 rounded-lg text-surface-400 hover:text-primary-600 hover:bg-primary-50 border border-surface-200 transition-all">
                    <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                    <Bell size={18} />
                  </button>
                </Tooltip>

                <Tooltip content={t('tooltip_user_profile')}>
                  <div className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative">
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shadow-md ring-2 ring-white group-hover:ring-primary-100 transition-all">
                        {currentUser.name?.charAt(0) || 'U'}
                      </div>
                      <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-white"></div>
                    </div>
                    <div className="hidden lg:flex flex-col items-start">
                      <span className="text-sm font-bold text-surface-900 leading-tight group-hover:text-primary-600 transition-colors">{currentUser.name?.split(' ')[0]}</span>
                      <span className="text-[10px] font-bold text-surface-400 uppercase tracking-wider">{isAdmin ? 'Admin' : 'Teacher'}</span>
                    </div>
                  </div>
                </Tooltip>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden p-4 sm:p-6 lg:p-8 pt-0">
          <div className="h-full bg-white/80 backdrop-blur-sm rounded-[2.5rem] shadow-sm border border-surface-200/60 overflow-y-auto relative">
            {/* Decorative Gradient Background inside the card */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary-100/40 to-secondary-100/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

            <div className="relative z-10 p-6 sm:p-8 lg:p-10 min-h-full">
              {children}
            </div>
          </div>
        </main>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-surface-900/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
            <div className="absolute inset-y-0 left-0 w-72 bg-white shadow-2xl p-6 flex flex-col animate-fade-in">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="bg-primary-50 p-2 rounded-xl">
                    <Logo className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-lg text-surface-900">STEM Sim</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-surface-400 hover:bg-surface-50 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <nav className="space-y-2 flex-1">
                {!isAdmin && (
                  <NavItem
                    icon={Home}
                    label={t('dashboard')}
                    active={isDashboard}
                    onClick={() => { navigate({ to: '/dashboard' }); setMobileMenuOpen(false); }}
                  />
                )}
                {isAdmin && (
                  <NavItem
                    icon={BarChart2}
                    label={t('admin_panel') || 'Admin Panel'}
                    active={isAdminPage}
                    onClick={() => { navigate({ to: '/admin' }); setMobileMenuOpen(false); }}
                  />
                )}
              </nav>

              <div className="pt-6 border-t border-surface-100">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-600 hover:bg-red-50 font-medium transition-colors"
                >
                  <LogOut size={20} />
                  <span>{t('sign_out')}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
