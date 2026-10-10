'use client';

import React from 'react';
import {
  CheckCircle2,
  XCircle,
  Boxes,
  Zap,
} from 'lucide-react';

export default function ComparisonTable() {
  const comparisonItems = [
    {
      feature: 'Real-Time Multi-Warehouse Sync',
      desc: 'Instant inventory reconciliation across all godowns without overnight manual batch sync.',
      vyavasthakendra: true,
      legacy: false,
      spreadsheets: false,
    },
    {
      feature: 'Automated FEFO / FIFO Batch Rotation',
      desc: 'System automatically locks & picks oldest manufactured lots to prevent FMCG expiry losses.',
      vyavasthakendra: true,
      legacy: 'Manual Entry',
      spreadsheets: false,
    },
    {
      feature: 'Van Sales & Spot Thermal Billing',
      desc: 'Digital delivery manifests with driver route tracking, spot cash/UPI & 80mm thermal slips.',
      vyavasthakendra: true,
      legacy: false,
      spreadsheets: false,
    },
    {
      feature: 'Dynamic B2B Retailer Credit Radar',
      desc: 'Blocks new sales order dispatch if customer breaches credit ceiling or overdue grace period.',
      vyavasthakendra: true,
      legacy: 'Partial Warning',
      spreadsheets: false,
    },
    {
      feature: 'SKU & Brand Margin Intelligence',
      desc: 'Live gross margin audit per SKU and brand, stopping hidden distribution losses.',
      vyavasthakendra: true,
      legacy: 'Manual Month-End',
      spreadsheets: 'Complex formulas',
    },
    {
      feature: 'Cloud & Touch-Tablet Access',
      desc: 'Zero installation required. Works seamlessly on counter tablets, mobile phones & laptops.',
      vyavasthakendra: true,
      legacy: 'Old Windows .exe Only',
      spreadsheets: true,
    },
    {
      feature: 'Audit Trail & Immutable Role Controls',
      desc: 'Every stock movement, price override, and cash collection is logged with user timestamp.',
      vyavasthakendra: true,
      legacy: 'Basic / Prone to Tampering',
      spreadsheets: false,
    },
  ];

  return (
    <section id="comparison" className="py-16 sm:py-24 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>Built Specifically For Distribution</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Why Distributors Upgrade From 20-Year-Old Software.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Traditional desktop software was built decades ago for basic book-keeping, not rapid physical FMCG distribution. VyavasthaKendra connects your godown floor to your financial ledger in real time.
          </p>
        </div>

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/90 shadow-xl dark:shadow-2xl backdrop-blur-xl">
          <div className="sm:hidden text-center text-[11px] text-slate-500 dark:text-slate-400 py-2 px-3 bg-slate-100/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 font-medium">
            ← Swipe horizontally to compare →
          </div>
          <div className="overflow-x-auto scrollbar-none">
            <table className="w-full min-w-[620px] text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/80">
                  <th className="p-4 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 w-1/2">
                    Core Capability
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 text-center w-1/6 bg-blue-50/80 dark:bg-blue-950/40 border-x border-slate-200 dark:border-slate-800">
                    <span className="flex items-center justify-center gap-1.5">
                      <Boxes className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      VyavasthaKendra
                    </span>
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center w-1/6">
                    Legacy Desktop (.exe)
                  </th>
                  <th className="p-5 sm:p-6 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 text-center w-1/6">
                    Excel Spreadsheets
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/80 text-xs sm:text-sm">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="p-5 sm:p-6">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {item.feature}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {item.desc}
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-center bg-blue-50/40 dark:bg-blue-950/20 border-x border-slate-200 dark:border-slate-800 font-bold">
                      <div className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Included</span>
                      </div>
                    </td>
                    <td className="p-5 sm:p-6 text-center text-slate-600 dark:text-slate-400 font-medium">
                      {typeof item.legacy === 'boolean' ? (
                        item.legacy ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500/80 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{item.legacy}</span>
                      )}
                    </td>
                    <td className="p-5 sm:p-6 text-center text-slate-600 dark:text-slate-400 font-medium">
                      {typeof item.spreadsheets === 'boolean' ? (
                        item.spreadsheets ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mx-auto" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-500/80 mx-auto" />
                        )
                      ) : (
                        <span className="text-xs text-slate-500 font-semibold">{item.spreadsheets}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
