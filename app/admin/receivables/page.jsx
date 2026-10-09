'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowDownLeft, CreditCard, Clock, AlertCircle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function ReceivablesPage() {
  const { customers, invoices, totalReceivables } = useStockora();

  // Receivables from invoices with positive balance
  const receivableInvoices = invoices.filter((inv) => inv.balanceDue > 0);

  const overdueInvoices = receivableInvoices.filter((inv) => inv.status === 'Overdue');
  const totalOverdue = overdueInvoices.reduce((sum, inv) => sum + inv.balanceDue, 0);

  const columns = [
    {
      header: 'Customer Business',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            href={`/admin/customers/${row.customerId}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] block"
          >
            {row.customerName}
          </Link>
          <span className="text-[11px] text-slate-400">Invoice: {row.id}</span>
        </div>
      ),
    },
    {
      header: 'Invoice Date',
      accessor: 'invoiceDate',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{row.invoiceDate}</span>,
    },
    {
      header: 'Due Date',
      accessor: 'dueDate',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs ${row.status === 'Overdue' ? 'text-rose-600 font-bold' : 'text-slate-600'}`}>
          {row.dueDate}
        </span>
      ),
    },
    {
      header: 'Invoice Total',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold">{formatINR(row.grandTotal)}</span>,
    },
    {
      header: 'Collected Paid',
      accessor: 'paidAmount',
      sortable: true,
      cell: (row) => <span className="text-xs text-emerald-600 font-medium">{formatINR(row.paidAmount)}</span>,
    },
    {
      header: 'Balance Outstanding',
      accessor: 'balanceDue',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
          {formatINR(row.balanceDue)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <Link
          href="/admin/customer-payments"
          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-2xs transition-colors"
        >
          <CreditCard className="w-3.5 h-3.5" />
          <span>Collect</span>
        </Link>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Accounts Receivable &amp; Collection Aging
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Outstanding balances due from wholesale buyers, kirana merchants, and supermarket chains.
            </p>
          </div>

          <Link
            href="/admin/customer-payments"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>Record Payment Entry</span>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Receivables
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalReceivables)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Due Today (09 Oct)
            </span>
            <span className="text-2xl font-bold text-blue-600 mt-1 block">
              ₹48,500
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Due This Week
            </span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">
              ₹2,14,000
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wider block">
              Overdue Collections
            </span>
            <span className="text-2xl font-bold text-rose-600 mt-1 block">
              {formatINR(totalOverdue || 114450)}
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={receivableInvoices}
          searchKey="customerName"
          searchPlaceholder="Search receivable by customer or invoice..."
          filterOptions={[
            { label: 'All Unsettled', value: 'All' },
            { label: 'Overdue Only', value: 'Overdue' },
          ]}
          emptyTitle="No outstanding receivables"
        />
      </div>
    </AdminLayout>
  );
}
