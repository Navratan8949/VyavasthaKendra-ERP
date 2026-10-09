'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeftRight, Filter, Download } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useStockora } from '@/context/StockoraContext';

export default function StockMovementPage() {
  const { stockMovements, products } = useStockora();
  const [selectedProduct, setSelectedProduct] = useState('All');

  const filteredMovements = selectedProduct === 'All'
    ? stockMovements
    : stockMovements.filter((m) => m.productId === selectedProduct);

  const columns = [
    {
      header: 'Timestamp',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500 font-medium">{row.date}</span>,
    },
    {
      header: 'Product SKU',
      accessor: 'productName',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white block">
          {row.productName}
        </span>
      ),
    },
    {
      header: 'Movement Type',
      accessor: 'type',
      sortable: true,
      cell: (row) => {
        const isPositive = row.quantity > 0;
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
            isPositive
              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400'
              : 'bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400'
          }`}>
            {row.type}
          </span>
        );
      },
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.warehouse}</span>,
    },
    {
      header: 'Quantity In / Out',
      accessor: 'quantity',
      sortable: true,
      cell: (row) => {
        const isPositive = row.quantity > 0;
        return (
          <span className={`text-xs font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isPositive ? `+${row.quantity}` : row.quantity}
          </span>
        );
      },
    },
    {
      header: 'Audit Reference',
      accessor: 'reference',
      cell: (row) => (
        <span className="text-xs font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
          {row.reference}
        </span>
      ),
    },
    {
      header: 'Authorized By',
      accessor: 'user',
      cell: (row) => <span className="text-xs text-slate-500">{row.user}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Stock Movement Audit Ledger
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Immutable chronological record of every addition, sale dispatch, transfer, and return.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Filter SKU:</span>
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 focus:outline-none"
            >
              <option value="All">All Products</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={filteredMovements}
          searchKey="productName"
          searchPlaceholder="Search movement by product, reference, or depot..."
          emptyTitle="No stock movements recorded"
        />
      </div>
    </AdminLayout>
  );
}
