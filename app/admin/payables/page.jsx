'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Banknote } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function PayablesPage() {
  const { suppliers, totalPayables } = useStockora();

  const payableSuppliers = suppliers.filter((s) => s.outstanding > 0);

  const columns = [
    {
      header: 'Supplier Principal',
      accessor: 'companyName',
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            href={`/admin/suppliers/${row.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] block"
          >
            {row.companyName}
          </Link>
          <span className="text-[11px] text-slate-400">GSTIN: {row.gstin}</span>
        </div>
      ),
    },
    {
      header: 'Contact Person',
      accessor: 'contactPerson',
      cell: (row) => <span className="text-xs text-slate-700 dark:text-slate-300">{row.contactPerson}</span>,
    },
    {
      header: 'Outstanding Payable',
      accessor: 'outstanding',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-amber-600">
          {formatINR(row.outstanding)}
        </span>
      ),
    },
    {
      header: 'Credit Limit',
      accessor: 'creditLimit',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.creditLimit)}</span>,
    },
    {
      header: 'Credit Terms',
      accessor: 'paymentTerms',
      cell: (row) => <span className="text-xs text-slate-600">{row.paymentTerms}</span>,
    },
    {
      header: 'Last Purchase Date',
      accessor: 'lastPurchaseDate',
      cell: (row) => <span className="text-xs text-slate-400">{row.lastPurchaseDate}</span>,
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
          href="/admin/supplier-payments"
          className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-lg shadow-2xs transition-colors"
        >
          <Banknote className="w-3.5 h-3.5" />
          <span>Pay Supplier</span>
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
              Accounts Payable (Vendor Liabilities)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Outstanding bills owed to manufacturers and FMCG master depot suppliers.
            </p>
          </div>

          <Link
            href="/admin/supplier-payments"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>Disburse Supplier Payment</span>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Supplier Payables
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalPayables)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Due Today
            </span>
            <span className="text-2xl font-bold text-blue-600 mt-1 block">
              ₹54,200
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Due This Week
            </span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">
              ₹1,42,500
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wider block">
              Overdue Payables
            </span>
            <span className="text-2xl font-bold text-rose-600 mt-1 block">
              ₹0
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={payableSuppliers}
          searchKey="companyName"
          searchPlaceholder="Search payable by supplier..."
          emptyTitle="No supplier payables due"
        />
      </div>
    </AdminLayout>
  );
}
