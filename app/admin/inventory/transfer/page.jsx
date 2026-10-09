'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRightLeft, ArrowLeft, CheckCircle2, History } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';

export default function StockTransferPage() {
  const { warehouses, products, stockTransfers, createStockTransfer } = useStockora();

  const [formData, setFormData] = useState({
    fromWarehouse: warehouses[0]?.name || 'Jaipur Main Warehouse',
    toWarehouse: warehouses[1]?.name || 'Sanganer Distribution Hub',
    productId: products[0]?.id || '',
    quantity: '20',
    notes: 'Inter-branch replenishment for regional demand',
  });

  const selectedProduct = products.find((p) => p.id === formData.productId) || products[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fromWarehouse === formData.toWarehouse) {
      alert('Source and destination warehouse cannot be the same!');
      return;
    }

    const success = createStockTransfer(formData);
    if (success) {
      setFormData((prev) => ({ ...prev, quantity: '10' }));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Inter-Warehouse Stock Transfer
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Transfer goods between Jaipur and regional depots with real-time audit ledger updates.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Transfer Form (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400 mb-4">
              Initiate Transfer
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  From Warehouse (Source) *
                </label>
                <select
                  value={formData.fromWarehouse}
                  onChange={(e) => setFormData({ ...formData, fromWarehouse: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  To Warehouse (Destination) *
                </label>
                <select
                  value={formData.toWarehouse}
                  onChange={(e) => setFormData({ ...formData, toWarehouse: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Product SKU *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (Available: {p.currentStock} {p.unit})
                    </option>
                  ))}
                </select>
                {selectedProduct && (
                  <p className="text-[11px] text-slate-400 mt-1">
                    Current system stock: <strong className="text-slate-700 dark:text-slate-200">{selectedProduct.currentStock} {selectedProduct.unit}</strong>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Transfer Quantity *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={selectedProduct?.currentStock || 1000}
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Transfer Memo / Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Reason for transfer, vehicle dispatched..."
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <ArrowRightLeft className="w-4 h-4" />
                <span>Execute Transfer Order</span>
              </button>
            </form>
          </div>

          {/* Transfer History Table (2 Cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
              Transfer Audit Log
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Transfer ID</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Route</th>
                    <th className="pb-3">Quantity</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {stockTransfers.map((trf) => (
                    <tr key={trf.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-[#3157D5]">{trf.id}</td>
                      <td className="py-3 text-slate-400">{trf.date}</td>
                      <td className="py-3 font-medium text-slate-800 dark:text-slate-100">{trf.productName}</td>
                      <td className="py-3 text-[11px] text-slate-500">
                        <span>{trf.fromWarehouse.split(' ')[0]}</span>
                        <span className="mx-1 text-[#3157D5]">→</span>
                        <span>{trf.toWarehouse.split(' ')[0]}</span>
                      </td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">
                        {trf.quantity} {trf.unit}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={trf.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
