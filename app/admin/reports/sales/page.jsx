'use client';

import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter } from 'lucide-react';
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
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SalesReportPage() {
  const { salesOrders, customers } = useStockora();
  const [dateFilter, setDateFilter] = useState('This Month');

  const monthlySalesData = [
    { month: 'May 2026', revenue: 1840000 },
    { month: 'Jun 2026', revenue: 2150000 },
    { month: 'Jul 2026', revenue: 1980000 },
    { month: 'Aug 2026', revenue: 2420000 },
    { month: 'Sep 2026', revenue: 2680000 },
    { month: 'Oct 2026 (MTD)', revenue: 482650 },
  ];

  const columns = [
    {
      header: 'Order Reference',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-[#3157D5]">{row.id}</span>,
    },
    {
      header: 'Customer Business',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{row.customerName}</span>,
    },
    {
      header: 'Date',
      accessor: 'orderDate',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.orderDate}</span>,
    },
    {
      header: 'Subtotal',
      accessor: 'subtotal',
      sortable: true,
      cell: (row) => <span className="text-xs">{formatINR(row.subtotal)}</span>,
    },
    {
      header: 'GST Tax',
      accessor: 'gstAmount',
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.gstAmount)}</span>,
    },
    {
      header: 'Invoice Total',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.grandTotal)}</span>,
    },
    {
      header: 'Salesman',
      accessor: 'salesman',
      cell: (row) => <span className="text-xs text-slate-600">{row.salesman}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Comprehensive Sales Analytics &amp; Reports
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Analyze distributor revenues, buyer order volume, salesman performance, and GST taxes.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {['Today', 'This Week', 'This Month', 'This Quarter', 'This Year'].map((f) => (
              <button
                key={f}
                onClick={() => setDateFilter(f)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  dateFilter === f
                    ? 'bg-[#3157D5] text-white shadow-2xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Sales Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider mb-1">
            Historical Revenue Performance (Monthly Lakhs INR)
          </h3>
          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySalesData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `₹${(v / 100000).toFixed(0)}L`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1E293B', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  formatter={(val) => formatINR(val)}
                />
                <Bar dataKey="revenue" name="Sales Revenue" fill="#3157D5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={salesOrders}
          searchKey="customerName"
          searchPlaceholder="Search sales report by customer..."
          emptyTitle="No sales records in selected date range"
        />
      </div>
    </AdminLayout>
  );
}
