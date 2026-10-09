'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useStockora } from '@/context/StockoraContext';
import { Shield, ArrowRight, CheckCircle2, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useStockora();
  const [email, setEmail] = useState('admin@vyavasthakendra.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email, password);
      router.push('/admin');
    }, 400);
  };

  const handleFillDemo = () => {
    setEmail('admin@vyavasthakendra.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen w-full flex bg-[#F6F7FB] dark:bg-slate-950 font-sans">
      {/* Left Column: Brand & Feature Presentation */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1E3A8A] via-[#2444AE] to-[#3157D5] p-12 text-white flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-white/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-indigo-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-lg">
              <Image
                src="/logo.png"
                alt="VyavasthaKendra Logo"
                width={44}
                height={44}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight">VyavasthaKendra</h1>
              <p className="text-xs text-blue-200 font-medium">Wholesale OS</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg my-auto py-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-100 mb-6 border border-white/15">
            <Shield className="w-3.5 h-3.5 text-blue-300" />
            Commercial FMCG Distribution ERP
          </div>

          <h2 className="text-4xl font-extrabold tracking-tight leading-tight text-white mb-4">
            Wholesale &amp; Distribution, Simplified.
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed mb-8">
            Manage your entire wholesale business — from supplier purchase orders and multi-depot inventory to sales, GST invoices, customer payments, receivables, and real-time profitability — all in one unified platform.
          </p>

          <div className="space-y-3.5 text-xs text-blue-50">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-Warehouse stock control &amp; inter-depot transfers</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated GST billing, credit tracking, and collection aging</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Goods Received (GRN) workflow &amp; supplier payables ledger</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Salesmen routes, delivery vehicle dispatch, and performance KPI</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-blue-200">
          <span>Shree Ganesh Distribution • Jaipur, Rajasthan</span>
          <span>Version 2.4 Enterprise</span>
        </div>
      </div>

      {/* Right Column: Sign In Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10">
          {/* Mobile brand header */}
          <div className="lg:hidden flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-sm">
              <Image
                src="/logo.png"
                alt="VyavasthaKendra Logo"
                width={36}
                height={36}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-extrabold text-lg text-slate-900 dark:text-white">
              VyavasthaKendra
            </span>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Welcome back
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Sign in to manage your wholesale operations.
            </p>
          </div>

          {/* Demo Credentials Quick-Fill Banner */}
          <div className="mb-6 p-3.5 bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl flex items-center justify-between">
            <div className="text-xs">
              <p className="font-semibold text-blue-900 dark:text-blue-300">
                Demo Credentials:
              </p>
              <p className="text-blue-700 dark:text-blue-400 text-[11px] mt-0.5">
                admin@vyavasthakendra.com • admin123
              </p>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] font-semibold text-[#3157D5] dark:text-blue-300 hover:underline px-2.5 py-1 bg-white dark:bg-slate-800 rounded-lg shadow-2xs border border-blue-200 dark:border-slate-700"
            >
              Autofill
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@vyavasthakendra.com"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5] transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-slate-400">Demo: admin123</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5] transition-all"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#3157D5] focus:ring-[#3157D5] w-3.5 h-3.5"
                />
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>

              <span className="text-xs text-[#3157D5] font-medium hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-2.5 px-4 bg-[#3157D5] hover:bg-[#2444AE] text-white text-xs font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Demo Instance: Local browser storage state simulation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
