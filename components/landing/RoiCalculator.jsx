'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ArrowRight,
} from 'lucide-react';

export default function RoiCalculator() {
  const [monthlyTurnover, setMonthlyTurnover] = useState(6000000); // 60 Lakhs
  const [vanCount, setVanCount] = useState(8);

  // FMCG Calculations
  const expirySavedMonthly = Math.round(monthlyTurnover * 0.018 * 0.75); // 1.8% typical loss, 75% eliminated
  const stockoutRecoveredMonthly = Math.round(monthlyTurnover * 0.025 * 0.5);
  const laborHoursSavedMonthly = vanCount * 42; // ~42 hrs saved per van/month
  const netAnnualBenefit = (expirySavedMonthly + stockoutRecoveredMonthly) * 12;

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section id="roi-calculator" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>Distributor Working Capital Calculator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Calculate Your Expiry & Working Capital Expansion.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Slide your turnover and van fleet size below to see exact estimated profit recovery with automated FEFO batch allocation and route dispatch.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white dark:bg-slate-900/90 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Sliders Input Column */}
            <div className="lg:col-span-6 space-y-7">
              {/* Turnover slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Monthly Wholesale Turnover
                  </label>
                  <span className="text-base font-black text-blue-600 dark:text-blue-400 font-mono">
                    {formatCurrency(monthlyTurnover)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000000"
                  max="50000000"
                  step="500000"
                  value={monthlyTurnover}
                  onChange={(e) => setMonthlyTurnover(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                  <span>₹10 Lakhs</span>
                  <span>₹5 Crores</span>
                </div>
              </div>

              {/* Van Count slider */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Active Delivery Vans & Route Fleet
                  </label>
                  <span className="text-base font-black text-indigo-600 dark:text-indigo-400 font-mono">
                    {vanCount} Route Vehicles
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={vanCount}
                  onChange={(e) => setVanCount(Number(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 mt-1 font-mono">
                  <span>1 Van</span>
                  <span>30 Vans</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200">
                <span className="font-bold text-blue-950 dark:text-white">Distributor Metric:</span> VyavasthaKendra&apos;s automated FEFO batch allocation typically pays for itself within the first 14 days of live deployment by halting expired SKU returns.
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-6 bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
                  Estimated Annual Working Capital Added
                </span>
                <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight mt-1.5 font-mono">
                  {formatCurrency(netAnnualBenefit)}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Net annual profit retention from eliminated expiry returns and stockouts.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Monthly Expiry Saved</span>
                  <span className="text-lg font-black text-white font-mono mt-0.5 block">
                    {formatCurrency(expirySavedMonthly)}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800">
                  <span className="text-[11px] text-slate-400 block font-medium">Monthly Dispatch Time</span>
                  <span className="text-lg font-black text-indigo-300 font-mono mt-0.5 block">
                    {laborHoursSavedMonthly} hrs saved
                  </span>
                </div>
              </div>

              <Link
                href="/admin"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Launch Live ERP to Unlock Margin Recovery</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
