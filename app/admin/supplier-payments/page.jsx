'use client';

import React, { useState } from 'react';
import { Banknote, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SupplierPaymentsPage() {
  const { supplierPayments, suppliers, recordSupplierPayment } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    supplierId: suppliers[0]?.id || '',
    purchaseInvoiceNo: 'PUR-2026-1008',
    amount: '',
    paymentMode: 'Bank Transfer',
    referenceNo: '',
    notes: 'Advance part payment for edible oil consignment',
  });

  const selectedSupplier = suppliers.find((s) => s.id === formData.supplierId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert('Please enter a valid disbursement amount');
      return;
    }

    recordSupplierPayment(formData);
    setFormData({
      supplierId: suppliers[0]?.id || '',
      purchaseInvoiceNo: '',
      amount: '',
      paymentMode: 'Bank Transfer',
      referenceNo: '',
      notes: '',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Voucher ID',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-[#3157D5]">{row.id}</span>,
    },
    {
      header: 'Supplier Principal',
      accessor: 'supplierName',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{row.supplierName}</span>,
    },
    {
      header: 'Purchase Invoice Ref',
      accessor: 'purchaseInvoiceNo',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.purchaseInvoiceNo}</span>,
    },
    {
      header: 'Payment Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.date}</span>,
    },
    {
      header: 'Amount Disbursed',
      accessor: 'amount',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.amount)}</span>,
    },
    {
      header: 'Payment Mode',
      accessor: 'paymentMode',
      cell: (row) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
          {row.paymentMode}
        </span>
      ),
    },
    {
      header: 'Bank RTGS Ref #',
      accessor: 'referenceNo',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.referenceNo}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Supplier Payments Disbursed
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Outward settlement vouchers disbursed to manufacturer vendors and FMCG distributors.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Supplier Payment</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={supplierPayments}
          searchKey="supplierName"
          searchPlaceholder="Search disbursement by supplier..."
          emptyTitle="No supplier payments recorded"
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Disburse Vendor Payment"
          subtitle="Record outward bank transfer, RTGS, or cheque issued to supplier."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Supplier *
              </label>
              <select
                value={formData.supplierId}
                onChange={(e) => setFormData({ ...formData, supplierId: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.companyName} (Payable: {formatINR(s.outstanding)})
                  </option>
                ))}
              </select>
            </div>

            {selectedSupplier && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs flex justify-between">
                <span className="text-slate-500">Current Outstanding Payable:</span>
                <span className="font-bold text-amber-600">{formatINR(selectedSupplier.outstanding)}</span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Amount to Pay (INR) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 54200"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Payment Mode *
                </label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Bank Transfer">Bank Transfer (RTGS/NEFT)</option>
                  <option value="Cheque">Company Cheque</option>
                  <option value="UPI">Company UPI</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Purchase Invoice / Bill No
                </label>
                <input
                  type="text"
                  value={formData.purchaseInvoiceNo}
                  onChange={(e) => setFormData({ ...formData, purchaseInvoiceNo: e.target.value })}
                  placeholder="e.g. PUR-2026-1008"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Bank Reference / UTR No.
                </label>
                <input
                  type="text"
                  value={formData.referenceNo}
                  onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                  placeholder="e.g. RTGS-ICIC-0091823"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
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
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
              >
                Confirm Disbursement
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
