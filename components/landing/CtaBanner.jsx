'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap } from 'lucide-react';

export default function CtaBanner() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="relative rounded-3xl bg-gradient-to-tr from-blue-700 via-indigo-700 to-sky-600 p-8 sm:p-14 lg:p-16 text-white shadow-2xl overflow-hidden border border-blue-400/30">
          {/* Subtle decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-indigo-400/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white text-xs font-bold mb-6">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>Instant Access • Preloaded Indian FMCG Demo Data</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              Ready to Modernize Your Wholesale & FMCG Distribution?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-blue-100 font-normal leading-relaxed">
              No endless sales demos. No complicated server setups. Jump straight into the fully functioning VyavasthaKendra ERP dashboard and experience live wholesale billing, batch rotation, and fleet route dispatch right now.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/admin"
                className="px-7 py-4 rounded-xl font-bold text-sm sm:text-base text-blue-900 bg-white hover:bg-blue-50 shadow-xl shadow-black/20 active:scale-95 transition-all inline-flex items-center gap-2 group"
              >
                <span>Launch Live ERP Dashboard</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </Link>

              <Link
                href="/admin/inventory"
                className="px-6 py-4 rounded-xl font-semibold text-sm sm:text-base text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all inline-flex items-center gap-2"
              >
                <span>Inspect Godown Batches</span>
              </Link>
            </div>

            <div className="mt-10 pt-8 border-t border-white/20 flex flex-wrap items-center gap-x-8 gap-y-3 text-xs text-blue-100 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Zero Installation Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Pre-Configured FMCG Brands & SKUs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Real-Time FEFO Batch Allocation</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
