'use client';

import React from 'react';
import { Receipt, DollarSign, TrendingUp, Scale, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function FinancialReportPage() {
  const { salesOrders, purchases, expenses, totalReceivables, totalPayables } = useStockora();

  const totalRevenue = salesOrders.reduce((sum, so) => sum + so.grandTotal, 0);
  const totalPurchaseCost = purchases.reduce((sum, p) => sum + p.grandTotal, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const grossProfit = totalRevenue - totalPurchaseCost;
  const netProfit = grossProfit - totalExpenses;

  const comparisonData = [
    { name: 'Revenue', amount: totalRevenue, fill: '#3157D5' },
    { name: 'Purchases', amount: totalPurchaseCost, fill: '#60A5FA' },
    { name: 'Gross Profit', amount: Math.max(0, grossProfit), fill: '#10B981' },
    { name: 'Expenses', amount: totalExpenses, fill: '#F59E0B' },
    { name: 'Net Profit', amount: Math.max(0, netProfit), fill: '#6366F1' },
    { name: 'Receivables', amount: totalReceivables, fill: '#059669' },
    { name: 'Payables', amount: totalPayables, fill: '#DC2626' },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Financial Health &amp; P&amp;L Statement
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Complete executive ledger showing trading margin, operational overhead, and working capital exposure.
          </p>
        </div>

        {/* 6 Key Financial Pillars */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Total Sales</span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">{formatINR(totalRevenue)}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">Goods Purchased</span>
            <span className="text-xl font-bold text-slate-600 mt-1 block">{formatINR(totalPurchaseCost)}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">Trading Gross</span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">{formatINR(grossProfit)}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">Overheads</span>
            <span className="text-xl font-bold text-amber-600 mt-1 block">{formatINR(totalExpenses)}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">Net Income</span>
            <span className="text-xl font-bold text-[#3157D5] mt-1 block">{formatINR(netProfit)}</span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-purple-600 uppercase tracking-wider block">Net Working Ratio</span>
            <span className="text-xl font-bold text-purple-600 mt-1 block">{(totalReceivables / (totalPayables || 1)).toFixed(2)}x</span>
          </div>
        </div>

        {/* Financial Flow Breakdown Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
            Cashflow &amp; Balance Sheet Pillar Distribution (INR)
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Comparison between outward liabilities, inflows, gross margin, and operating overheads.
          </p>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#64748B' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => formatINR(val)}
                />
                <Bar dataKey="amount" name="Amount" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Working Capital Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600">
              <ArrowDownLeft className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Customer Receivables Asset</h3>
            </div>
            <p className="text-xs text-slate-500">
              Money to be collected from wholesale buyer accounts in Jaipur, Ajmer, and Kota.
            </p>
            <div className="text-2xl font-bold text-emerald-600 pt-2">
              {formatINR(totalReceivables)}
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-amber-600">
              <ArrowUpRight className="w-5 h-5" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Supplier Payables Liability</h3>
            </div>
            <p className="text-xs text-slate-500">
              Liabilities owed to FMCG principal companies and authorized distributor depots.
            </p>
            <div className="text-2xl font-bold text-amber-600 pt-2">
              {formatINR(totalPayables)}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
