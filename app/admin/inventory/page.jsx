'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Boxes,
  ArrowRightLeft,
  SlidersHorizontal,
  Plus,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function InventoryOverviewPage() {
  const {
    products,
    warehouses,
    adjustStock,
    totalInventoryValue,
    lowStockProducts,
    outOfStockProducts,
  } = useStockora();

  const [isAdjustModalOpen, setIsAdjustModalOpen] = useState(false);
  const [adjustData, setAdjustData] = useState({
    productId: products[0]?.id || '',
    warehouse: warehouses[0]?.name || '',
    adjustmentType: 'add',
    quantity: '10',
    reason: 'Inventory count reconciliation',
  });

  const totalStockUnits = products.reduce((acc, p) => acc + p.currentStock, 0);

  const handleAdjustSubmit = (e) => {
    e.preventDefault();
    adjustStock(adjustData);
    setIsAdjustModalOpen(false);
  };

  const columns = [
    {
      header: 'Product SKU',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            href={`/admin/products/${row.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] block"
          >
            {row.name}
          </Link>
          <span className="text-[11px] text-slate-400">SKU: {row.sku}</span>
        </div>
      ),
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.warehouse}</span>,
    },
    {
      header: 'Opening',
      accessor: 'openingStock',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{row.openingStock} {row.unit}</span>,
    },
    {
      header: 'Current Available',
      accessor: 'currentStock',
      sortable: true,
      cell: (row) => {
        const isLow = row.currentStock <= row.minStock && row.currentStock > 0;
        const isOut = row.currentStock === 0;
        return (
          <div className="flex items-center gap-1.5 font-bold text-xs">
            <span className={isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-emerald-600'}>
              {row.currentStock} {row.unit}
            </span>
            {isLow && (
              <span className="text-[9px] px-1 py-0.2 rounded bg-amber-100 text-amber-700">
                LOW
              </span>
            )}
            {isOut && (
              <span className="text-[9px] px-1 py-0.2 rounded bg-rose-100 text-rose-700">
                OUT
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Min Safety',
      accessor: 'minStock',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.minStock} {row.unit}</span>,
    },
    {
      header: 'Unit Valuation',
      accessor: 'purchasePrice',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600">{formatINR(row.purchasePrice)}</span>,
    },
    {
      header: 'Total Value',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white">
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
    {
      header: 'Actions',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <button
          onClick={() => {
            setAdjustData({
              productId: row.id,
              warehouse: row.warehouse,
              adjustmentType: 'add',
              quantity: '5',
              reason: 'Audit adjustment',
            });
            setIsAdjustModalOpen(true);
          }}
          className="px-2.5 py-1 text-[11px] font-semibold text-[#3157D5] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
        >
          Adjust Stock
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Warehouse Inventory Dashboard
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-depot inventory tracking, valuation, minimum threshold surveillance, and adjustments.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/inventory/transfer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>Inter-Depot Transfer</span>
            </Link>

            <button
              onClick={() => setIsAdjustModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Manual Stock Adjustment</span>
            </button>
          </div>
        </div>

        {/* Inventory KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Units
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {totalStockUnits.toLocaleString()}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Total Value
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalInventoryValue)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Sufficient Stock
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">
              {products.length - lowStockProducts.length - outOfStockProducts.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Low Stock Items
            </span>
            <span className="text-xl font-bold text-amber-600 mt-1 block">
              {lowStockProducts.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wider block">
              Out of Stock
            </span>
            <span className="text-xl font-bold text-rose-600 mt-1 block">
              {outOfStockProducts.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-purple-600 uppercase tracking-wider block">
              Warehouses
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {warehouses.length}
            </span>
          </div>
        </div>

        {/* DataTable */}
        <DataTable
          columns={columns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search inventory by product or SKU..."
          filterOptions={[
            { label: 'All SKUs', value: 'All' },
            { label: 'Low Stock Only', value: 'Low' },
          ]}
          emptyTitle="No stock entries"
        />

        {/* Manual Stock Adjustment Modal */}
        <Modal
          isOpen={isAdjustModalOpen}
          onClose={() => setIsAdjustModalOpen(false)}
          title="Manual Stock Adjustment"
          subtitle="Record physical stock reconciliation count, breakage, or inventory audit adjustments."
        >
          <form onSubmit={handleAdjustSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Product SKU *
              </label>
              <select
                value={adjustData.productId}
                onChange={(e) => setAdjustData({ ...adjustData, productId: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              >
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} (Current: {p.currentStock} {p.unit})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Adjustment Type
                </label>
                <select
                  value={adjustData.adjustmentType}
                  onChange={(e) => setAdjustData({ ...adjustData, adjustmentType: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  <option value="add">+ Addition (Excess / Return)</option>
                  <option value="deduct">- Deduction (Damage / Loss / Audit)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={adjustData.quantity}
                  onChange={(e) => setAdjustData({ ...adjustData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Reason / Audit Reference *
              </label>
              <input
                type="text"
                required
                value={adjustData.reason}
                onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                placeholder="e.g. Physical inventory count discrepancy"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsAdjustModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white dark:bg-slate-800 border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
              >
                Apply Adjustment
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
