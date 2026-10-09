'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, Phone, Mail, MapPin, Plus, CreditCard, Banknote } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SupplierDetailPage({ params }) {
  const unwrappedParams = use(params);
  const supplierId = unwrappedParams.id;

  const { suppliers, purchases, supplierPayments, products } = useStockora();
  const [activeTab, setActiveTab] = useState('Overview');

  const supplier = suppliers.find((s) => s.id === supplierId);

  if (!supplier) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">Supplier not found</div>
      </AdminLayout>
    );
  }

  const relatedPurchases = purchases.filter((p) => p.supplierId === supplier.id);
  const relatedPayments = supplierPayments.filter((pay) => pay.supplierId === supplier.id);
  const relatedProducts = products.filter((prd) => prd.supplier === supplier.companyName);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/suppliers"
              className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {supplier.companyName}
                </h1>
                <StatusBadge status={supplier.status} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                GSTIN: {supplier.gstin} • Contact: {supplier.contactPerson} ({supplier.phone})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/supplier-payments"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs transition-colors"
            >
              <Banknote className="w-3.5 h-3.5" />
              <span>Record Supplier Payment</span>
            </Link>

            <Link
              href="/admin/purchase-orders/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Purchase Order</span>
            </Link>
          </div>
        </div>

        {/* Supplier KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Purchases
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(supplier.totalPurchases)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Outstanding Payable
            </span>
            <span className="text-xl font-bold text-amber-600 mt-1 block">
              {formatINR(supplier.outstanding)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Credit Limit
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(supplier.creditLimit)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Payment Terms
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {supplier.paymentTerms}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          {['Overview', 'Purchases & Inward', 'Payment Ledger', 'Supplied SKUs'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'border-[#3157D5] text-[#3157D5]'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'Overview' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Vendor Profile &amp; Banking
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Registered Address</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{supplier.address}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Email Address</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{supplier.email}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Last Purchase Date</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{supplier.lastPurchaseDate}</span>
              </div>
              <div>
                <span className="text-slate-400 block">State GST Compliance</span>
                <span className="font-semibold text-emerald-600 mt-1 block">Verified Active GSTIN</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Purchases & Inward' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Inward Goods Received (GRN)
            </h3>
            {relatedPurchases.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Purchase ID</th>
                      <th className="pb-3">Invoice No</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Grand Total</th>
                      <th className="pb-3">Balance Due</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {relatedPurchases.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 font-semibold text-purple-600">{p.id}</td>
                        <td className="py-3 font-mono text-slate-600">{p.supplierInvoiceNo}</td>
                        <td className="py-3 text-slate-400">{p.date}</td>
                        <td className="py-3 font-bold">{formatINR(p.grandTotal)}</td>
                        <td className="py-3 text-amber-600 font-bold">{formatINR(p.balanceDue)}</td>
                        <td className="py-3"><StatusBadge status={p.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No goods receipts registered yet.</p>
            )}
          </div>
        )}

        {activeTab === 'Payment Ledger' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Payments Disbursed to Supplier
            </h3>
            {relatedPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Payment ID</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Mode</th>
                      <th className="pb-3">Reference No</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {relatedPayments.map((pay) => (
                      <tr key={pay.id}>
                        <td className="py-3 font-semibold text-emerald-600">{pay.id}</td>
                        <td className="py-3 text-slate-400">{pay.date}</td>
                        <td className="py-3 font-bold text-slate-900">{formatINR(pay.amount)}</td>
                        <td className="py-3">{pay.paymentMode}</td>
                        <td className="py-3 font-mono text-slate-500">{pay.referenceNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No payment records found.</p>
            )}
          </div>
        )}

        {activeTab === 'Supplied SKUs' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Procured Product Catalog
            </h3>
            <div className="divide-y divide-slate-100">
              {relatedProducts.map((p) => (
                <div key={p.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span>
                    <span className="text-[11px] text-slate-400 block">SKU: {p.sku} • Stock: {p.currentStock} {p.unit}</span>
                  </div>
                  <span className="font-bold text-slate-900">{formatINR(p.purchasePrice)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
