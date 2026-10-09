'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Users, Phone, MapPin, Plus, CreditCard, ShoppingCart, FileText } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function CustomerDetailPage({ params }) {
  const unwrappedParams = use(params);
  const customerId = unwrappedParams.id;

  const { customers, salesOrders, invoices, customerPayments } = useStockora();
  const [activeTab, setActiveTab] = useState('Overview');

  const customer = customers.find((c) => c.id === customerId);

  if (!customer) {
    return (
      <AdminLayout>
        <div className="p-8 text-center">Customer account not found</div>
      </AdminLayout>
    );
  }

  const relatedOrders = salesOrders.filter((o) => o.customerId === customer.id);
  const relatedInvoices = invoices.filter((inv) => inv.customerId === customer.id);
  const relatedPayments = customerPayments.filter((p) => p.customerId === customer.id);

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/customers"
              className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {customer.businessName}
                </h1>
                <StatusBadge status={customer.status} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                GSTIN: {customer.gstin} • Proprietor: {customer.ownerName} ({customer.phone})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/customer-payments"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Collect Payment</span>
            </Link>

            <Link
              href="/admin/sales-orders/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Sales Order</span>
            </Link>
          </div>
        </div>

        {/* Customer Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total Purchases
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(customer.totalPurchases)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Current Outstanding Due
            </span>
            <span className="text-xl font-bold text-amber-600 mt-1 block">
              {formatINR(customer.outstanding)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Credit Limit
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(customer.creditLimit)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Assigned Route Salesman
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block truncate">
              {customer.salesman || 'Rahul Kumar'}
            </span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800">
          {['Overview', 'Sales Orders', 'Invoices', 'Payment Collections'].map((tab) => (
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
              Account Master Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Billing &amp; Delivery Address</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{customer.billingAddress}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Market Territory Area</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{customer.area}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Standard Payment Terms</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100 mt-1 block">{customer.paymentTerms}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Credit Exposure Ratio</span>
                <span className="font-semibold text-[#3157D5] mt-1 block">
                  {((customer.outstanding / customer.creditLimit) * 100).toFixed(1)}% of ₹{(customer.creditLimit / 100000).toFixed(1)} Lakhs limit
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'Sales Orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Sales Orders Placed by {customer.businessName}
            </h3>
            {relatedOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Items</th>
                      <th className="pb-3">Total Amount</th>
                      <th className="pb-3">Payment</th>
                      <th className="pb-3">Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {relatedOrders.map((so) => (
                      <tr key={so.id}>
                        <td className="py-3 font-semibold text-[#3157D5]">{so.id}</td>
                        <td className="py-3 text-slate-400">{so.orderDate}</td>
                        <td className="py-3">{so.items?.length || 0} line items</td>
                        <td className="py-3 font-bold">{formatINR(so.grandTotal)}</td>
                        <td className="py-3"><StatusBadge status={so.paymentStatus} /></td>
                        <td className="py-3"><StatusBadge status={so.orderStatus} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No sales orders found.</p>
            )}
          </div>
        )}

        {activeTab === 'Invoices' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Tax Invoices Issued
            </h3>
            {relatedInvoices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Invoice No</th>
                      <th className="pb-3">Invoice Date</th>
                      <th className="pb-3">Due Date</th>
                      <th className="pb-3">Total</th>
                      <th className="pb-3">Balance Due</th>
                      <th className="pb-3">Status</th>
                      <th className="pb-3 text-right">View</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {relatedInvoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="py-3 font-semibold text-[#3157D5]">{inv.id}</td>
                        <td className="py-3 text-slate-400">{inv.invoiceDate}</td>
                        <td className="py-3 text-slate-400">{inv.dueDate}</td>
                        <td className="py-3 font-bold">{formatINR(inv.grandTotal)}</td>
                        <td className="py-3 font-bold text-amber-600">{formatINR(inv.balanceDue)}</td>
                        <td className="py-3"><StatusBadge status={inv.status} /></td>
                        <td className="py-3 text-right">
                          <Link href={`/admin/invoices/${inv.id}`} className="text-[#3157D5] font-semibold hover:underline">
                            Open →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No invoices generated yet.</p>
            )}
          </div>
        )}

        {activeTab === 'Payment Collections' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Receipts Collected
            </h3>
            {relatedPayments.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Receipt ID</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Amount</th>
                      <th className="pb-3">Payment Mode</th>
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
              <p className="text-xs text-slate-400">No payments recorded yet.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
