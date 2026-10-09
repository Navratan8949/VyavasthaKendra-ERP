'use client';

import React from 'react';
import { TrendingUp, ShoppingBag } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function PurchaseReportPage() {
  const { purchases, suppliers } = useStockora();

  const columns = [
    {
      header: 'Purchase GRN',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-purple-600">{row.id}</span>,
    },
    {
      header: 'Vendor Principal',
      accessor: 'supplierName',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{row.supplierName}</span>,
    },
    {
      header: 'Vendor Invoice Ref',
      accessor: 'supplierInvoiceNo',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.supplierInvoiceNo}</span>,
    },
    {
      header: 'Inward Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.date}</span>,
    },
    {
      header: 'Items Count',
      accessor: 'id',
      cell: (row) => <span className="text-xs">{row.items?.length || 0} items</span>,
    },
    {
      header: 'Purchase Total',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.grandTotal)}</span>,
    },
    {
      header: 'Settled Paid',
      accessor: 'paidAmount',
      cell: (row) => <span className="text-xs text-emerald-600">{formatINR(row.paidAmount)}</span>,
    },
    {
      header: 'Payable Balance',
      accessor: 'balanceDue',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-amber-600">{formatINR(row.balanceDue)}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Procurement &amp; Purchase Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Historical supplier purchase volume, inward delivery costs, and vendor liabilities.
          </p>
        </div>

        <DataTable
          columns={columns}
          data={purchases}
          searchKey="supplierName"
          searchPlaceholder="Search purchases by supplier..."
          emptyTitle="No purchases found"
        />
      </div>
    </AdminLayout>
  );
}
