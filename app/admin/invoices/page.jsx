'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FileText, Eye, Printer, CreditCard } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function InvoicesPage() {
  const router = useRouter();
  const { invoices } = useStockora();
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredInvoices = invoices.filter((inv) => {
    if (selectedStatus !== 'All' && inv.status !== selectedStatus) return false;
    return true;
  });

  const columns = [
    {
      header: 'Invoice Number',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <Link
          href={`/admin/invoices/${row.id}`}
          className="font-bold text-[#3157D5] hover:underline"
        >
          {row.id}
        </Link>
      ),
    },
    {
      header: 'Customer Store',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
            {row.customerName}
          </span>
          <span className="text-[11px] text-slate-400">GSTIN: {row.gstin}</span>
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
      header: 'Payment Due Date',
      accessor: 'dueDate',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs ${row.status === 'Overdue' ? 'text-rose-600 font-bold' : 'text-slate-500'}`}>
          {row.dueDate}
        </span>
      ),
    },
    {
      header: 'Invoice Amount',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {formatINR(row.grandTotal)}
        </span>
      ),
    },
    {
      header: 'Paid Amount',
      accessor: 'paidAmount',
      sortable: true,
      cell: (row) => <span className="text-xs text-emerald-600 font-medium">{formatINR(row.paidAmount)}</span>,
    },
    {
      header: 'Balance Due',
      accessor: 'balanceDue',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs font-bold ${row.balanceDue > 0 ? 'text-amber-600' : 'text-slate-400'}`}>
          {formatINR(row.balanceDue)}
        </span>
      ),
    },
    {
      header: 'Payment Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: 'action',
      cellClassName: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/admin/invoices/${row.id}`}
            className="p-1.5 text-slate-400 hover:text-[#3157D5] rounded-lg hover:bg-slate-100 transition-colors"
            title="View Invoice"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href="/admin/customer-payments"
            className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg hover:bg-slate-100 transition-colors"
            title="Record Payment"
          >
            <CreditCard className="w-4 h-4" />
          </Link>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              GST Tax Invoices &amp; Billing
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Official wholesale invoices compliant with Rajasthan GST requirements.
            </p>
          </div>

          <Link
            href="/admin/sales-orders/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate New Invoice</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={filteredInvoices}
          searchKey="customerName"
          searchPlaceholder="Search invoices by customer name or invoice #..."
          filterOptions={[
            { label: 'All Invoices', value: 'All' },
            { label: 'Unpaid', value: 'Unpaid' },
            { label: 'Paid', value: 'Paid' },
            { label: 'Overdue', value: 'Overdue' },
          ]}
          activeFilter={selectedStatus}
          onFilterChange={setSelectedStatus}
          onRowClick={(row) => router.push(`/admin/invoices/${row.id}`)}
          emptyTitle="No invoices found"
        />
      </div>
    </AdminLayout>
  );
}
