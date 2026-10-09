'use client';

import React, { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SalesReturnsPage() {
  const { salesReturns, customers, products, addSalesReturn } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerId: customers[0]?.id || '',
    invoiceId: 'INV-2026-1098',
    productId: products[0]?.id || '',
    quantity: '3',
    reason: 'Damaged packaging during local retail delivery',
    amount: '3800',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === formData.customerId);
    const prod = products.find((p) => p.id === formData.productId);

    addSalesReturn({
      ...formData,
      customerName: cust?.businessName || 'Customer',
      productName: prod?.name || 'Product',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Credit Note #',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-[#3157D5]">{row.id}</span>,
    },
    {
      header: 'Customer Account',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">{row.customerName}</span>,
    },
    {
      header: 'Invoice Reference',
      accessor: 'invoiceId',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.invoiceId}</span>,
    },
    {
      header: 'Returned SKU',
      accessor: 'productName',
      cell: (row) => <span className="text-xs font-medium text-slate-900 dark:text-white">{row.productName}</span>,
    },
    {
      header: 'Quantity Restored',
      accessor: 'quantity',
      cell: (row) => <span className="text-xs font-bold text-emerald-600">+{row.quantity} Units</span>,
    },
    {
      header: 'Credit Note Value',
      accessor: 'amount',
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.amount)}</span>,
    },
    {
      header: 'Return Reason',
      accessor: 'reason',
      cell: (row) => <span className="text-xs text-slate-500">{row.reason}</span>,
    },
    {
      header: 'Action Taken',
      accessor: 'action',
      cell: (row) => (
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
          {row.action}
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Sales Returns (Credit Notes)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Process retailer product returns, restore sellable inventory, and issue credit balance adjustments.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Issue Credit Note / Return</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={salesReturns}
          searchKey="customerName"
          searchPlaceholder="Search credit note by customer..."
          emptyTitle="No sales returns recorded"
        />

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Issue Sales Return (Credit Note)"
          subtitle="Record goods returned by customer. Quantity will be returned to warehouse and customer outstanding reduced."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Customer Retailer *
              </label>
              <select
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>{c.businessName}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Original Tax Invoice #
                </label>
                <input
                  type="text"
                  required
                  value={formData.invoiceId}
                  onChange={(e) => setFormData({ ...formData, invoiceId: e.target.value })}
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
                  Quantity Returned
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
                  Credit Value (INR)
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
                <option value="Wrong item delivered">Wrong item delivered</option>
                <option value="Expired / near expiry batch">Expired / near expiry batch</option>
                <option value="Customer excess order">Customer excess order</option>
                <option value="Packaging seal broken">Packaging seal broken</option>
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
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl"
              >
                Issue Credit Note
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
