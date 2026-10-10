'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStockora } from '@/context/StockoraContext';
import {
  Boxes,
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
} from 'lucide-react';

export default function LandingNav() {
  const { theme, toggleTheme } = useStockora();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Capabilities', href: '#capabilities' },
    { name: 'Live Simulator', href: '#simulator' },
    { name: 'ROI Calculator', href: '#roi-calculator' },
    { name: 'Why VyavasthaKendra', href: '#comparison' },
    { name: 'Architecture', href: '#roles-security' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-2.5 sm:py-3'
          : 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sm:bg-transparent py-3 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="VyavasthaKendra Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-slate-900 dark:text-white">
                  VyavasthaKendra
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-1 sm:px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                  ERP OS
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium hidden md:block">
                FMCG Wholesale & Distribution
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 dark:bg-slate-900/80 backdrop-blur-md p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold px-3.5 py-1.5 rounded-full text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-xs"
              title={mounted && theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700" />
                )
              ) : (
                <span className="w-4 h-4 block" />
              )}
            </button>

            {/* Live ERP CTA (Compact on mobile) */}
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-md shadow-blue-600/30 active:scale-95 transition-all border border-blue-500/30"
            >
              <span className="hidden xs:inline">Launch Live ERP</span>
              <span className="xs:hidden">Live ERP</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-sm font-medium rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 active:bg-slate-200 dark:active:bg-slate-700 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-600/30 text-center"
              >
                <span>Launch Live ERP Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
