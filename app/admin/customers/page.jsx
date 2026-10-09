'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Users, Plus, Eye, Phone, MapPin, Building, CreditCard } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function CustomersPage() {
  const router = useRouter();
  const { customers, addCustomer, totalReceivables } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    gstin: '',
    billingAddress: '',
    shippingAddress: '',
    area: 'Jaipur Central',
    creditLimit: '250000',
    paymentTerms: '15 Days',
    salesman: 'Rahul Kumar',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.businessName) return;
    addCustomer(formData);
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Customer Business',
      accessor: 'businessName',
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            href={`/admin/customers/${row.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] block"
          >
            {row.businessName}
          </Link>
          <span className="text-[11px] text-slate-400">GSTIN: {row.gstin}</span>
        </div>
      ),
    },
    {
      header: 'Proprietor / Contact',
      accessor: 'ownerName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-100 block">
            {row.ownerName}
          </span>
          <span className="text-[11px] text-slate-400">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Territory Area',
      accessor: 'area',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.area}</span>,
    },
    {
      header: 'Credit Limit',
      accessor: 'creditLimit',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.creditLimit)}</span>,
    },
    {
      header: 'Outstanding Balance',
      accessor: 'outstanding',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs font-bold ${row.outstanding > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {formatINR(row.outstanding)}
        </span>
      ),
    },
    {
      header: 'Total Orders',
      accessor: 'totalPurchases',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-900 dark:text-white">
          {formatINR(row.totalPurchases)}
        </span>
      ),
    },
    {
      header: 'Route Salesman',
      accessor: 'salesman',
      cell: (row) => <span className="text-xs text-slate-500">{row.salesman}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <Link
          href={`/admin/customers/${row.id}`}
          className="p-1.5 text-slate-400 hover:text-[#3157D5] inline-flex"
        >
          <Eye className="w-4 h-4" />
        </Link>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Customer Accounts (B2B Retailers)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              General stores, retail marts, supermarkets, and wholesale kirana accounts.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </button>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Registered Retailers
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {customers.length} Accounts
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Total Accounts Receivable
            </span>
            <span className="text-2xl font-bold text-emerald-600 mt-1 block">
              {formatINR(totalReceivables)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Cumulative Business Volume
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(customers.reduce((acc, c) => acc + c.totalPurchases, 0))}
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={customers}
          searchKey="businessName"
          searchPlaceholder="Search customer by name, area, phone, or GSTIN..."
          onRowClick={(row) => router.push(`/admin/customers/${row.id}`)}
          emptyTitle="No customer accounts found"
        />

        {/* Add Customer Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add Retailer Customer Account"
          subtitle="Register a new retail store, kirana trader, or supermarket chain in customer directory."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Business / Store Trade Name *
              </label>
              <input
                type="text"
                required
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="e.g. Shree Ganesh General Store"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Proprietor / Owner Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                  placeholder="e.g. Gajendra Sharma"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98280 44551"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  GSTIN Number
                </label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  placeholder="08AAGCS1245P1Z4"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Market Territory Area
                </label>
                <input
                  type="text"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  placeholder="e.g. Malviya Nagar, Jaipur"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Credit Limit (INR)
                </label>
                <input
                  type="number"
                  value={formData.creditLimit}
                  onChange={(e) => setFormData({ ...formData, creditLimit: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Assigned Route Salesman
                </label>
                <input
                  type="text"
                  value={formData.salesman}
                  onChange={(e) => setFormData({ ...formData, salesman: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Delivery / Billing Address
              </label>
              <textarea
                rows={2}
                value={formData.billingAddress}
                onChange={(e) => setFormData({ ...formData, billingAddress: e.target.value, shippingAddress: e.target.value })}
                placeholder="Shop No., Market road, City..."
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
                Save Customer
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
