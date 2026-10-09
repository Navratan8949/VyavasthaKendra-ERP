'use client';

import React from 'react';
import Link from 'next/link';
import {
  UserCheck,
  Lock,
  History,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react';

export default function RolesAndSecurity() {
  const roles = [
    {
      title: 'Godown Owner / Super Admin',
      desc: 'Complete business oversight, live net margins, price tier controls, and company GST settings.',
      badge: 'Full Master Control',
      color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
    {
      title: 'Warehouse & Godown In-Charge',
      desc: 'Goods Received (GRN), batch lot scanning, FEFO picking manifests, and physical stock cycle audits.',
      badge: 'Inventory & Godown Scope',
      color: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30',
    },
    {
      title: 'Route Van & Field Salesman',
      desc: 'Spot retail order booking, customer credit limits, outstanding ledger collection, and thermal slips.',
      badge: 'Order-to-Cash Mobile Scope',
      color: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      title: 'Logistics Fleet Dispatcher',
      desc: 'Vehicle payload allocation, driver route manifests, gate pass generation, and POD verification.',
      badge: 'Fleet & Transit Scope',
      color: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    },
    {
      title: 'Wholesale Auditor & Accountant',
      desc: 'Receivables DSO aging, supplier payment vouchers, GST input-output tax ledgers, and expense journals.',
      badge: 'Financial Ledger Scope',
      color: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    },
  ];

  return (
    <section id="roles-security" className="py-24 md:py-32 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            <span>Role-Based Governance & Security</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Role-Based Access for Every Team Member.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Keep sensitive distributor margins private from salesmen while giving warehouse pickers and route drivers the exact tools they need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roles.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm dark:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border ${r.color}`}>
                    {r.badge}
                  </span>
                  <Shield className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {r.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {r.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span>Immutable audit logs</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Active in Demo</span>
              </div>
            </div>
          ))}

          {/* Quick Role Simulator Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-900 to-indigo-950 border border-blue-700/80 shadow-lg text-white flex flex-col justify-between">
            <div>
              <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-200 border border-blue-400/30 inline-block mb-4">
                Interactive Switcher
              </span>
              <h3 className="text-lg font-bold text-white mb-2">
                Test Roles in Real-Time
              </h3>
              <p className="text-xs text-blue-100/90 leading-relaxed">
                Click role switcher in the live dashboard header to instantly view the app from the perspective of an Accountant, Warehouse Manager, or Van Salesman.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-800/60">
              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold text-xs text-white flex items-center justify-center gap-1.5 transition-all shadow-md"
              >
                <span>Launch Role Test Lab</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
