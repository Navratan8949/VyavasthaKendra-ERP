'use client';

import React, { useState } from 'react';
import { Receipt, Plus, DollarSign, Calendar, TrendingDown } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function ExpensesPage() {
  const { expenses, addExpense } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Fuel',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    paymentMode: 'Company Card',
    description: '',
  });

  const totalExpenseAmount = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.amount) return;
    addExpense(formData);
    setFormData({
      title: '',
      category: 'Fuel',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      paymentMode: 'Cash',
      description: '',
    });
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Expense Voucher',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-[#3157D5]">{row.id}</span>,
    },
    {
      header: 'Title / Purpose',
      accessor: 'title',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.title}</span>
          <span className="text-[11px] text-slate-400">{row.description}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: true,
      cell: (row) => (
        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Expense Date',
      accessor: 'date',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.date}</span>,
    },
    {
      header: 'Amount Paid',
      accessor: 'amount',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-slate-900 dark:text-white">{formatINR(row.amount)}</span>,
    },
    {
      header: 'Payment Mode',
      accessor: 'paymentMode',
      cell: (row) => <span className="text-xs text-slate-600">{row.paymentMode}</span>,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Operational Expense Management
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Track warehouse lease, logistics diesel, packaging supplies, utility bills, and fleet servicing.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Record Expense</span>
          </button>
        </div>

        {/* Expense KPI Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Expenses Recorded
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalExpenseAmount)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              This Month (October)
            </span>
            <span className="text-2xl font-bold text-blue-600 mt-1 block">
              {formatINR(totalExpenseAmount)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Top Expense Category
            </span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">
              Warehouse Rent (58%)
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={expenses}
          searchKey="title"
          searchPlaceholder="Search expense by title or category..."
          emptyTitle="No expenses recorded"
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Record Operating Expense"
          subtitle="Log overhead, warehouse utility, diesel, or equipment maintenance cost."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Expense Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. Diesel for Jaipur-Ajmer Delivery Truck"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Fuel">Fuel (Diesel / Petrol)</option>
                  <option value="Transport">Transport Freight</option>
                  <option value="Warehouse Rent">Warehouse Rent</option>
                  <option value="Electricity">Electricity &amp; Utilities</option>
                  <option value="Packaging">Packaging Material</option>
                  <option value="Maintenance">Vehicle / Machine Maintenance</option>
                  <option value="Salary">Staff Wages</option>
                  <option value="Office">Office &amp; Pantry</option>
                  <option value="Other">Other Miscellaneous</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Amount (INR) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g. 18500"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Expense Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Payment Mode
                </label>
                <select
                  value={formData.paymentMode}
                  onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Company Card">Company Card</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Description / Memo
              </label>
              <textarea
                rows={2}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Bill number, vendor, details..."
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
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
              >
                Save Expense
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
