'use client';

import React from 'react';
import { Boxes, Package, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function InventoryReportPage() {
  const { products, warehouses, totalInventoryValue } = useStockora();

  const columns = [
    {
      header: 'Product Name',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.name}</span>
          <span className="text-[11px] text-slate-400">SKU: {row.sku} • {row.brand}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600">{row.category}</span>,
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{row.warehouse}</span>,
    },
    {
      header: 'Available Stock',
      accessor: 'currentStock',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {row.currentStock} {row.unit}
        </span>
      ),
    },
    {
      header: 'Unit Valuation',
      accessor: 'purchasePrice',
      sortable: true,
      cell: (row) => <span className="text-xs">{formatINR(row.purchasePrice)}</span>,
    },
    {
      header: 'Holding Valuation',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-[#3157D5]">
          {formatINR(row.currentStock * row.purchasePrice)}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <StatusBadge
          status={row.currentStock === 0 ? 'Out of Stock' : row.currentStock <= row.minStock ? 'Low Stock' : 'In Stock'}
        />
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Inventory Valuation &amp; Stock Holding Report
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time stock valuation based on FIFO procurement cost across all regional depots.
          </p>
        </div>

        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-400 font-medium uppercase tracking-wider block">Total Warehouse Inventory Value</span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">{formatINR(totalInventoryValue)}</span>
          </div>
          <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-full">
            Audited Real-time
          </span>
        </div>

        <DataTable
          columns={columns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search inventory valuation report..."
          emptyTitle="No inventory items found"
        />
      </div>
    </AdminLayout>
  );
}
