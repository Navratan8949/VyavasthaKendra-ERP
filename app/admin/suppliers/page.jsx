'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Truck, Plus, Eye, Phone, Mail, Building, MapPin } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SuppliersPage() {
  const router = useRouter();
  const { suppliers, addSupplier, totalPayables } = useStockora();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    email: '',
    gstin: '',
    address: '',
    creditLimit: '500000',
    paymentTerms: '21 Days',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName) return;
    addSupplier(formData);
    setIsModalOpen(false);
  };

  const columns = [
    {
      header: 'Supplier Company',
      accessor: 'companyName',
      sortable: true,
      cell: (row) => (
        <div>
          <Link
            href={`/admin/suppliers/${row.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] block"
          >
            {row.companyName}
          </Link>
          <span className="text-[11px] text-slate-400">GSTIN: {row.gstin}</span>
        </div>
      ),
    },
    {
      header: 'Contact Person',
      accessor: 'contactPerson',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">
            {row.contactPerson}
          </span>
          <span className="text-[11px] text-slate-400">{row.phone}</span>
        </div>
      ),
    },
    {
      header: 'Credit Limit',
      accessor: 'creditLimit',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.creditLimit)}</span>,
    },
    {
      header: 'Payment Terms',
      accessor: 'paymentTerms',
      cell: (row) => <span className="text-xs text-slate-600">{row.paymentTerms}</span>,
    },
    {
      header: 'Outstanding Payable',
      accessor: 'outstanding',
      sortable: true,
      cell: (row) => (
        <span className={`text-xs font-bold ${row.outstanding > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
          {formatINR(row.outstanding)}
        </span>
      ),
    },
    {
      header: 'Total Purchases',
      accessor: 'totalPurchases',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-900 dark:text-white">
          {formatINR(row.totalPurchases)}
        </span>
      ),
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
          href={`/admin/suppliers/${row.id}`}
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
              Suppliers &amp; FMCG Vendors
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Direct brand distributors, national depots, and procurement vendor ledgers.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Supplier</span>
          </button>
        </div>

        {/* Top Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Active Suppliers
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {suppliers.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Total Payables Outstanding
            </span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">
              {formatINR(totalPayables)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Cumulative Purchases
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(suppliers.reduce((acc, s) => acc + s.totalPurchases, 0))}
            </span>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={suppliers}
          searchKey="companyName"
          searchPlaceholder="Search supplier by name, GSTIN, contact..."
          onRowClick={(row) => router.push(`/admin/suppliers/${row.id}`)}
          emptyTitle="No suppliers found"
        />

        {/* Add Supplier Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Add New Vendor / Supplier"
          subtitle="Register an authorized manufacturer or FMCG master distributor."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Company / Trade Name *
              </label>
              <input
                type="text"
                required
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Balaji FMCG Distributors"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Mahesh Balaji"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
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
                  placeholder="+91 98290 88776"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  GSTIN
                </label>
                <input
                  type="text"
                  value={formData.gstin}
                  onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  placeholder="08AAAFB1234M1Z2"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="orders@balajifmcg.com"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Address / Warehouse Depot
              </label>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="VKIA Road 5, Jaipur"
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-700 bg-white dark:bg-slate-800 border border-slate-200 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
              >
                Save Supplier
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
}
