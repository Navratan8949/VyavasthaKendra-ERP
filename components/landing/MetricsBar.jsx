'use client';

import React from 'react';
import { useStockora } from '@/context/StockoraContext';
import {
  ShieldCheck,
  TrendingDown,
  Clock,
  TrendingUp,
} from 'lucide-react';

export default function MetricsBar() {
  const { warehouses } = useStockora();

  const metrics = [
    {
      label: 'Expiry Loss Reduction',
      value: '99.4%',
      subtext: 'Zero write-offs with FEFO batch picking',
      icon: TrendingDown,
      badge: '₹4.2L Saved / Qtr',
      color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
    },
    {
      label: 'Morning Dispatch Velocity',
      value: '18 Mins',
      subtext: 'Down from 2.5 hours route manifest preparation',
      icon: Clock,
      badge: '5.2x Faster',
      color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
    },
    {
      label: 'Overdue DSO Recovery',
      value: '-38%',
      subtext: 'Automated retailer credit ceilings & reminders',
      icon: ShieldCheck,
      badge: '12 Days Avg DSO',
      color: 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/20',
    },
    {
      label: 'Inventory Turnover',
      value: '14.8x',
      subtext: 'Multi-godown stock sync & reorder triggers',
      icon: TrendingUp,
      badge: `${warehouses?.length || 3} Godowns Active`,
      color: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20',
    },
  ];

  return (
    <section className="border-y border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 backdrop-blur-md py-12 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-xl border ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-200/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-300 dark:border-slate-700">
                    {m.badge}
                  </span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  {m.value}
                </div>
                <div className="mt-1 font-bold text-sm text-slate-800 dark:text-slate-200">
                  {m.label}
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                  {m.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
