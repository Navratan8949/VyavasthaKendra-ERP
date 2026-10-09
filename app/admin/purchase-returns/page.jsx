'use client';

import React, { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function PurchaseReturnsPage() {
  const { purchaseReturns, suppliers, products, addPurchaseReturn } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    supplierId: suppliers[0]?.id || '',
    purchaseInvoice: 'BFMCG-INV-8912',
    productId: products[0]?.id || '',
    quantity: '2',
    reason: 'Damaged packaging during depot unloading',
    amount: '4500',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === formData.supplierId);
    const prod = products.find((p) => p.id === formData.productId);

    addPurchaseReturn({
      ...formData,
      supplierName: sup?.companyName || 'Supplier',
      productName: prod?.name || 'Product',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Return Debit Note',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-rose-600">{row.id}</span>,
    },
    {
      header: 'Supplier Principal',
      accessor: 'supplierName',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{row.supplierName}</span>,
    },
    {
      header: 'Invoice Reference',
      accessor: 'purchaseInvoice',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.purchaseInvoice}</span>,
    },
    {
      header: 'Product SKU',
      accessor: 'productName',
      cell: (row) => <span className="text-xs font-medium text-slate-900 dark:text-white">{row.productName}</span>,
    },
    {
      header: 'Qty Returned',
      accessor: 'quantity',
      cell: (row) => <span className="text-xs font-bold text-rose-600">-{row.quantity} Units</span>,
    },
    {
      header: 'Debit Amount (₹)',
      accessor: 'amount',
      cell: (row) => <span className="text-xs font-bold">{formatINR(row.amount)}</span>,
    },
    {
      header: 'Return Reason',
      accessor: 'reason',
      cell: (row) => <span className="text-xs text-slate-500">{row.reason}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Purchase Returns (Debit Notes)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Process vendor stock rejections, transit damage debit notes, and inventory adjustments.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Purchase Return</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={purchaseReturns}
          searchKey="supplierName"
          searchPlaceholder="Search debit note by supplier..."
          emptyTitle="No purchase returns recorded"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Create Purchase Return / Debit Note"
          subtitle="Record goods returned to vendor. Corresponding stock will be deducted and vendor payable reduced."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Supplier Vendor *
              </label>
              <select
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>{s.companyName}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Original Purchase Invoice
                </label>
                <input
                  type="text"
                  required
                  value={formData.purchaseInvoice}
                  onChange={(e) => setFormData({ ...formData, purchaseInvoice: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Product SKU *
                </label>
                <select
                  value={formData.productId}
                  onChange={(e) => setFormData({ ...formData, productId: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Return Quantity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Debit Note Value (INR)
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Reason for Return
              </label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                <option value="Damaged in transit">Damaged in transit</option>
                <option value="Near expiry product">Near expiry product</option>
                <option value="Wrong product supplied">Wrong product supplied</option>
                <option value="Excess quantity delivered">Excess quantity delivered</option>
                <option value="Factory packaging defect">Factory packaging defect</option>
              </select>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Issue Debit Note
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
