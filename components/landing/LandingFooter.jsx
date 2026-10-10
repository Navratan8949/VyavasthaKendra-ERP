'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingFooter() {
  return (
    <footer className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Col */}
          <div className="col-span-1 sm:col-span-2 md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1 flex items-center justify-center shadow-md">
                <Image
                  src="/logo.png"
                  alt="VyavasthaKendra Logo"
                  width={36}
                  height={36}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-black text-lg tracking-tight text-slate-900 dark:text-white">
                VyavasthaKendra
              </span>
            </Link>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Enterprise-grade Wholesale & FMCG Distribution ERP. Built for high-throughput multi-warehouse godowns, route van billing, automated FEFO expiry rotation, and real-time ledger accounting.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-slate-700 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>All Cloud ERP Services Operational (99.99%)</span>
            </div>
          </div>

          {/* Module Links: Inventory & Logistics */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Warehousing & Fleet
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/inventory" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Stock & Batch Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin/warehouses" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Multi-Godown Hubs
                </Link>
              </li>
              <li>
                <Link href="/admin/deliveries" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Route Delivery Manifests
                </Link>
              </li>
              <li>
                <Link href="/admin/vehicles" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Delivery Fleet
                </Link>
              </li>
              <li>
                <Link href="/admin/drivers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Driver Directory
                </Link>
              </li>
            </ul>
          </div>

          {/* Module Links: Sales & Procurement */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Order-to-Cash
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/sales-orders" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  B2B Sales Orders
                </Link>
              </li>
              <li>
                <Link href="/admin/invoices" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  GST Invoices & Printing
                </Link>
              </li>
              <li>
                <Link href="/admin/purchase-orders" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Purchase Replenishment
                </Link>
              </li>
              <li>
                <Link href="/admin/customers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Retailer Directory
                </Link>
              </li>
              <li>
                <Link href="/admin/suppliers" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Supplier Master
                </Link>
              </li>
            </ul>
          </div>

          {/* Module Links: Financials & Analytics */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wider text-[11px] mb-3">
              Financials & Profit
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/admin/profitability" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  SKU Margin Intelligence
                </Link>
              </li>
              <li>
                <Link href="/admin/receivables" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Aging Receivables (DSO)
                </Link>
              </li>
              <li>
                <Link href="/admin/payables" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Supplier Payables
                </Link>
              </li>
              <li>
                <Link href="/admin/reports" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Audit Reports
                </Link>
              </li>
              <li>
                <Link href="/admin/settings" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  Company Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-2 gap-y-1 text-center sm:text-left">
            <span>
              © {new Date().getFullYear()} VyavasthaKendra Systems. Enterprise Wholesale & FMCG Distribution OS.
            </span>
            <span className="hidden sm:inline text-slate-400 dark:text-slate-600">•</span>
            <span>
              Designed by{' '}
              <a
                href="https://www.codepecharcha.in"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 underline underline-offset-2 transition-colors"
              >
                Code Pe Charcha
              </a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">
              Launch Live ERP Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
