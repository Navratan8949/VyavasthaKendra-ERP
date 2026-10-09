'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  Search,
  Calendar,
  Sun,
  Moon,
  Shield,
  RotateCcw,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { useStockora } from '@/context/StockoraContext';
import NotificationDropdown from './NotificationDropdown';
import RoleSwitcherModal from './RoleSwitcherModal';
import ResetDemoModal from './ResetDemoModal';

export default function Header() {
  const pathname = usePathname();
  const {
    user,
    logout,
    theme,
    toggleTheme,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
  } = useStockora();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const profileRef = useRef(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format breadcrumb title
  const getBreadcrumbs = () => {
    const segments = pathname.replace('/admin', '').split('/').filter(Boolean);
    if (segments.length === 0) return [{ label: 'Dashboard', href: '/admin' }];

    const breadcrumbs = [{ label: 'Dashboard', href: '/admin' }];
    let currentHref = '/admin';

    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      const formatted = seg
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      breadcrumbs.push({
        label: formatted,
        href: currentHref,
        isLast: idx === segments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <>
      <header className="sticky top-0 z-30 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between transition-colors">
        {/* Left: Mobile Toggle & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
            aria-label="Toggle mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={crumb.href}>
                {idx > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
                {crumb.isLast ? (
                  <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[160px] sm:max-w-xs">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-slate-800 dark:hover:text-slate-200 transition-colors hidden sm:inline"
                  >
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>

        {/* Right Action Icons & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200/60 dark:hover:bg-slate-800 rounded-lg border border-slate-200/70 dark:border-slate-700/60 transition-colors shadow-2xs"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Search records...</span>
            <kbd className="hidden lg:inline-flex items-center px-1.5 py-0.2 text-[10px] font-semibold text-slate-400 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* Live System Date Badge */}
          <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/60 dark:border-slate-700/50">
            <Calendar className="w-3.5 h-3.5 text-[#3157D5]" />
            <span>09 Oct 2026</span>
          </div>

          {/* Role Simulation Switcher Button */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#3157D5] bg-[#3157D5]/10 hover:bg-[#3157D5]/15 dark:bg-[#3157D5]/20 dark:hover:bg-[#3157D5]/30 rounded-lg transition-colors"
            title="Switch simulation role"
          >
            <Shield className="w-3.5 h-3.5" />
            <span className="truncate max-w-[100px]">{user.role}</span>
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => setIsResetModalOpen(true)}
            className="p-2 text-slate-500 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset Demo Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Theme Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          {/* Notifications Dropdown */}
          <NotificationDropdown />

          {/* Admin User Profile Dropdown */}
          <div className="relative ml-1" ref={profileRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="flex items-center gap-2 p-1 pl-2 text-xs font-medium text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-[#3157D5] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                {user.avatar || 'A'}
              </div>
              <div className="hidden md:block text-left leading-tight">
                <span className="font-semibold block text-slate-900 dark:text-white truncate max-w-[110px]">
                  {user.name || 'Admin'}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {user.role}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div className="p-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {user.name || 'Admin'}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {user.email || 'admin@vyavasthakendra.com'}
                  </p>
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-400">
                    {user.role}
                  </span>
                </div>

                <div className="p-1 space-y-0.5">
                  <Link
                    href="/admin/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    My Profile
                  </Link>

                  <Link
                    href="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    Store Settings
                  </Link>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsRoleModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/80 rounded-xl transition-colors text-left"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    Switch Role Demo
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      setIsResetModalOpen(true);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-xl transition-colors text-left"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reset Demo Data
                  </button>
                </div>

                <div className="p-1 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Modals triggered from header */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
      <ResetDemoModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
      />
    </>
  );
}
