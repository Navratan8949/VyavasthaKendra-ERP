'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  Warehouse,
  Truck,
  ArrowRight,
  Layers,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
} from 'lucide-react';

export default function FeatureShowcase() {
  const [selectedPersona, setSelectedPersona] = useState('stockist');

  const personas = [
    { id: 'stockist', name: 'Super-Stockist', desc: 'Managing ₹50L+ multi-brand inventory & godown hubs' },
    { id: 'vansales', name: 'Van Route Fleet', desc: 'Running 5-20 route vans with spot billing & cash collections' },
    { id: 'accountant', name: 'Wholesale Accountant', desc: 'Handling GST tax invoices, retailer ledgers & DSO aging' },
  ];

  return (
    <section id="capabilities" className="py-24 md:py-32 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Core Wholesale Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Designed for the Hard Realities of High-Volume FMCG Distribution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Generic accounting software fails when your godown handles perishable expiry dates, route van cash collections, and mandi credit limits. VyavasthaKendra is built specifically for Indian distributors.
          </p>

          {/* Interactive Persona Filter */}
          <div className="mt-8 inline-flex p-1 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            {personas.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedPersona(p.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  selectedPersona === p.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Card 1: Large Bento Feature (FEFO Expiry Lock) */}
          <div className="md:col-span-2 lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md group relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 inline-block">
                  <Boxes className="w-6 h-6" />
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                  Zero-Waste FEFO
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Automated FEFO Batch Lock Engine
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                When a sales order is booked, the system automatically reserves stock from the batch closest to its expiration date. Warehouse pickers see the exact rack bin and lot number on their tablet, completely stopping expired stock returns.
              </p>

              {/* Visual Micro-Widget */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-800 dark:text-slate-300 font-semibold">Lot #PARLE-2026-A4 (18 Days Left)</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% AUTO-DISPATCHED</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[95%]" />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Batch Exp: 27 Oct 2026</span>
                  <span>140 Cases Picked • Bin A-12</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Prevents ₹3L-₹5L quarterly expiry write-offs</span>
              <Link href="/admin/inventory" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Explore Batch Control <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Van Fleet & Spot Billing */}
          <div className="md:col-span-1 lg:col-span-2 p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-500/15 border border-blue-200 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 inline-block">
                  <Truck className="w-6 h-6" />
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                  Mobile POS & Route
                </span>
              </div>

              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Van Route Billing & Driver Telemetry
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Generate morning delivery manifests in 15 minutes. Van salesmen can check retailer outstanding balance, print 3-inch thermal receipts via Bluetooth, and record cash/UPI collections on the spot.
              </p>

              {/* Visual Micro-Widget */}
              <div className="mt-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Morning Loading Sheet:</span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Route #04 (Tonk Road • 28 Outlets)</span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">₹3.85L Invoiced</span>
                  <span className="text-[10px] text-slate-500">22 Delivered</span>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Supports all 80mm thermal printers</span>
              <Link href="/admin/deliveries" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View Fleet Routes <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: Dynamic Retailer Credit Ceiling */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-rose-100 dark:bg-rose-500/15 border border-rose-200 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 inline-block mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                B2B Credit Radar & Auto-Hold
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Enforce custom credit ceilings (₹2L, ₹5L) and Net terms. If a retailer is overdue past grace days, the system blocks sales order dispatch until dues are settled.
              </p>

              <div className="mt-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Limit Status:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">Overdue Block</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Grace Days:</span>
                  <span className="text-slate-800 dark:text-slate-200">15 Days Expired</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Link href="/admin/receivables" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Open Credit Radar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: Multi-Godown Hub Sync */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 inline-block mb-4">
                <Warehouse className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Multi-Godown Inter-Hub Transit
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Transfer inventory between Central Godowns and Regional Depots. Automatically marks stock as &quot;In Transit&quot; until physical gate pass verification and GRN acknowledgment.
              </p>

              <div className="mt-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Transfer Note:</span>
                  <span className="font-mono text-indigo-600 dark:text-indigo-300">TR-2026-081</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Status:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-semibold">In Transit (NH-8)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Link href="/admin/inventory/transfer" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View Stock Transfers <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 5: Real-Time Gross Margin & SKU Profitability */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-amber-100 dark:bg-amber-500/15 border border-amber-200 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 inline-block mb-4">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Live Brand & SKU Margin Audit
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Distributor schemes and freight overheads often hide negative margins. See live gross profit percentage per SKU, brand, and salesman before confirming the sale.
              </p>

              <div className="mt-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Parle Biscuits:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">14.8% Margin</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Fortune Edible Oil:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">6.2% Margin</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Link href="/admin/profitability" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Audit Profitability <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 6: 1-Click GST & E-Way Bill */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-700 transition-all shadow-md flex flex-col justify-between">
            <div>
              <div className="p-3 rounded-2xl bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-200 dark:border-cyan-500/30 text-cyan-700 dark:text-cyan-400 inline-block mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                1-Click GST Bilti & Invoicing
              </h3>
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Auto-splits CGST, SGST, IGST with exact HSN summaries. Instant WhatsApp sharing of PDF invoices to retail shopkeepers with dynamic UPI payment QR codes.
              </p>

              <div className="mt-6 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Tax Breakdown:</span>
                  <span className="text-cyan-700 dark:text-cyan-300 font-semibold">HSN Auto-Calculated</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Format:</span>
                  <span className="text-slate-700 dark:text-slate-200">A4 + 3-inch Thermal</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80">
              <Link href="/admin/invoices" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                View Tax Invoices <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
