'use client';

import React, { useState } from 'react';
import { CreditCard, Plus, ArrowDownLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function CustomerPaymentsPage() {
  const { customerPayments, customers, invoices, recordCustomerPayment } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    customerId: customers[0]?.id || '',
    invoiceId: '',
    amount: '',
    paymentMode: 'Bank Transfer',
    referenceNo: '',
    notes: 'Payment received against wholesale invoice',
  });

  const selectedCustomer = customers.find((c) => c.id === formData.customerId);
  const customerUnpaidInvoices = invoices.filter(
    (inv) => inv.customerId === formData.customerId && inv.balanceDue > 0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || Number(formData.amount) <= 0) {
      alert('Please enter a valid payment amount');
      return;
    }

    recordCustomerPayment(formData);
    setFormData({
      customerId: customers[0]?.id || '',
      invoiceId: '',
      amount: '',
      paymentMode: 'Bank Transfer',
      referenceNo: '',
      notes: '',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Receipt ID',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-emerald-600">{row.id}</span>,
    },
    {
      header: 'Customer Store',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{row.customerName}</span>,
    },
    {
      header: 'Invoice Applied',
      accessor: 'invoiceId',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.invoiceId || 'Multiple'}</span>,
    },
    {
      header: 'Payment Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.date}</span>,
    },
    {
      header: 'Amount Collected',
      accessor: 'amount',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.amount)}</span>,
    },
    {
      header: 'Payment Mode',
      accessor: 'paymentMode',
      cell: (row) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
          {row.paymentMode}
        </span>
      ),
    },
    {
      header: 'Bank / UPI Ref #',
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
              Customer Payment Collections
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Record payments collected from retail stores via NEFT, RTGS, UPI, Cash, and Cheques.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Customer Payment</span>
          </button>
        </div>

        <DataTable
          columns={columns}
          data={customerPayments}
          searchKey="customerName"
          searchPlaceholder="Search payment by customer or reference..."
          emptyTitle="No payment records found"
        />

        {/* Record Payment Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Record Customer Payment Receipt"
          subtitle="Apply funds to customer invoice balance and automatically decrease outstanding receivables."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Select Customer Account *
              </label>
              <select
                value={formData.customerId}
                onChange={(e) => setFormData({ ...formData, customerId: e.target.value, invoiceId: '' })}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                {customers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.businessName} (Due: {formatINR(c.outstanding)})
                  </option>
                ))}
              </select>
            </div>

            {selectedCustomer && (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-xs flex justify-between">
                <span className="text-slate-500">Total Outstanding Balance:</span>
                <span className="font-bold text-amber-600">{formatINR(selectedCustomer.outstanding)}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Apply Against Specific Tax Invoice (Optional)
              </label>
              <select
                value={formData.invoiceId}
                onChange={(e) => {
                  const inv = invoices.find((i) => i.id === e.target.value);
                  setFormData({
                    ...formData,
                    invoiceId: e.target.value,
                    amount: inv ? String(inv.balanceDue) : formData.amount,
                  });
                }}
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              >
                <option value="">General Account Settlement (FIFO)</option>
                {customerUnpaidInvoices.map((inv) => (
                  <option key={inv.id} value={inv.id}>
                    {inv.id} — Due: {formatINR(inv.balanceDue)} ({inv.invoiceDate})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Amount Received (INR) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 48500"
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
                  <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                  <option value="UPI">UPI (GooglePay / PhonePe / Paytm)</option>
                  <option value="Cash">Cash Receipt</option>
                  <option value="Cheque">Bank Cheque</option>
                  <option value="Card">Debit / Credit Card</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Bank / UPI Transaction Reference Number
              </label>
              <input
                type="text"
                value={formData.referenceNo}
                onChange={(e) => setFormData({ ...formData, referenceNo: e.target.value })}
                placeholder="e.g. NEFT-HDFC-9912048 or UPI/881203"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
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
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
              >
                Record Payment
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
