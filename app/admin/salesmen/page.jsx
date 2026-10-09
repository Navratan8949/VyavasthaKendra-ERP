'use client';

import React from 'react';
import { Briefcase, Target, Trophy, TrendingUp, Phone, Mail, MapPin } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SalesmenPage() {
  const { salesmen } = useStockora();

  const totalTarget = salesmen.reduce((acc, s) => acc + s.monthlyTarget, 0);
  const totalAchieved = salesmen.reduce((acc, s) => acc + s.achieved, 0);
  const avgAchievement = ((totalAchieved / totalTarget) * 100).toFixed(1);

  // Sorted leaderboard
  const leaderboard = [...salesmen].sort((a, b) => b.achieved - a.achieved);

  const chartData = leaderboard.map((s) => ({
    name: s.name.split(' ')[0],
    target: s.monthlyTarget / 100000,
    achieved: s.achieved / 100000,
  }));

  const columns = [
    {
      header: 'Sales Officer',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.name}</span>
          <span className="text-[11px] text-slate-400">{row.email} • {row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Territory',
      accessor: 'assignedArea',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.assignedArea}</span>,
    },
    {
      header: 'Monthly Target',
      accessor: 'monthlyTarget',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.monthlyTarget)}</span>,
    },
    {
      header: 'Sales Achieved',
      accessor: 'achieved',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.achieved)}</span>,
    },
    {
      header: 'Orders Placed',
      accessor: 'orders',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold">{row.orders} orders</span>,
    },
    {
      header: 'Achievement %',
      accessor: 'achieved',
      sortable: true,
      cell: (row) => {
        const pct = ((row.achieved / row.monthlyTarget) * 100).toFixed(1);
        return (
          <div className="w-28">
            <div className="flex justify-between text-[11px] font-bold mb-1">
              <span>{pct}%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${Number(pct) >= 80 ? 'bg-emerald-500' : 'bg-[#3157D5]'}`}
                style={{ width: `${Math.min(100, pct)}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Route Salesmen &amp; Field Force
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Field sales officers, retail store coverage, monthly quotas, and commission tracking.
            </p>
          </div>
        </div>

        {/* Target KPI Header Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Cumulative Quota
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalTarget)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Total Sales Closed
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">
              {formatINR(totalAchieved)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Quota Achieved %
            </span>
            <span className="text-xl font-bold text-[#3157D5] mt-1 block">
              {avgAchievement}%
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-purple-600 uppercase tracking-wider block">
              Active Field Force
            </span>
            <span className="text-xl font-bold text-purple-600 mt-1 block">
              {salesmen.length} Officers
            </span>
          </div>
        </div>

        {/* Leaderboard & Bar Chart Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard Card (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Top Sales Leaderboard
                </h3>
              </div>

              <div className="space-y-3">
                {leaderboard.map((s, idx) => (
                  <div key={s.id} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        idx === 0 ? 'bg-amber-400 text-slate-900' : idx === 1 ? 'bg-slate-300 text-slate-900' : 'bg-amber-700/40 text-slate-900'
                      }`}>
                        {idx + 1}
                      </span>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">{s.name}</span>
                        <span className="text-[10px] text-slate-400">{s.assignedArea}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#3157D5]">
                      {formatINR(s.achieved)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 text-center">
              Target incentives disbursed on 1st of each month
            </div>
          </div>

          {/* Performance Chart (2 Cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
                Target vs Actual Sales (Lakhs INR)
              </h3>
              <p className="text-xs text-slate-400">
                Performance benchmark across assigned Rajasthan routes
              </p>
            </div>

            <div className="h-64 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `₹${v}L`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                    formatter={(val) => `₹${Number(val).toFixed(2)} Lakhs`}
                  />
                  <Bar dataKey="target" name="Monthly Target" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="achieved" name="Sales Closed" fill="#3157D5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
              <span>Overall Team Efficiency: <strong className="text-emerald-600">88.4%</strong></span>
              <span>Total Route Invoices: <strong className="text-slate-900 dark:text-white">194 Orders</strong></span>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={salesmen}
          searchKey="name"
          searchPlaceholder="Search salesman by name or area..."
          emptyTitle="No salesmen found"
        />
      </div>
    </AdminLayout>
  );
}
