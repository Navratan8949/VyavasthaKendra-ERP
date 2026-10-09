'use client';

import React from 'react';
import Link from 'next/link';
import { Boxes, Plus, Eye, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function PurchasesPage() {
  const { purchases } = useStockora();

  const columns = [
    {
      header: 'Purchase ID',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-purple-600">
          {row.id}
        </span>
      ),
    },
    {
      header: 'Supplier Principal',
      accessor: 'supplierName',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
          {row.supplierName}
        </span>
      ),
    },
    {
      header: 'Supplier Bill No.',
      accessor: 'supplierInvoiceNo',
      cell: (row) => (
        <span className="text-xs font-mono text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          {row.supplierInvoiceNo}
        </span>
      ),
    },
    {
      header: 'Inward Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.date}</span>,
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      cell: (row) => <span className="text-xs text-slate-500">{row.warehouse}</span>,
    },
    {
      header: 'Grand Total',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {formatINR(row.grandTotal)}
        </span>
      ),
    },
    {
      header: 'Balance Payable',
      accessor: 'balanceDue',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs font-bold ${row.balanceDue > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {formatINR(row.balanceDue)}
        </span>
      ),
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
              Purchases / Goods Received (GRN)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Physically verified inward inventory consignments entered into stock ledgers.
            </p>
          </div>

          <Link
            href="/admin/purchase-orders"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Receive Against PO</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={purchases}
          searchKey="supplierName"
          searchPlaceholder="Search purchases by supplier or bill no..."
          emptyTitle="No purchases recorded"
        />
      </div>
    </AdminLayout>
  );
}
