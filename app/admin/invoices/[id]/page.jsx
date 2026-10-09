'use client';

import React, { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Printer,
  Download,
  Share2,
  Mail,
  CheckCircle2,
  CreditCard,
  Building,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function InvoiceDetailPage({ params }) {
  const unwrappedParams = use(params);
  const invoiceId = unwrappedParams.id;
  const router = useRouter();

  const { invoices, settings, addToast } = useStockora();
  const invoice = invoices.find((inv) => inv.id === invoiceId) || invoices[0];

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleDownloadPDF = () => {
    addToast('PDF Invoice generated and downloaded to device', 'success');
  };

  const handleSendInvoice = () => {
    addToast(`Invoice ${invoice.id} emailed and sent via WhatsApp to ${invoice.customerName}`, 'info');
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Action bar (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/invoices"
              className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  Invoice {invoice.id}
                </h1>
                <StatusBadge status={invoice.status} />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Billing Date: {invoice.invoiceDate} • Due Date: {invoice.dueDate}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>

            <button
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>

            <button
              onClick={handleSendInvoice}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Send to Buyer</span>
            </button>

            {invoice.balanceDue > 0 && (
              <Link
                href="/admin/customer-payments"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Collect Balance</span>
              </Link>
            )}
          </div>
        </div>

        {/* Printable Tax Invoice Document */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm text-slate-900 font-sans print:shadow-none print:border-none print:p-0">
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 pb-8 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 p-1 flex items-center justify-center">
                  <Image
                    src="/logo.png"
                    alt="VyavasthaKendra Logo"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  VYAVASTHAKENDRA DISTRIBUTION
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-wider">
                {settings.businessName || 'Shree Ganesh Distribution'}
              </p>
              <p className="text-xs text-slate-500 max-w-xs mt-1">
                {settings.address || 'Plot 42, Vishwakarma Industrial Area (VKIA), Road No. 9, Jaipur, Rajasthan 302013'}
              </p>
              <p className="text-xs text-slate-600 mt-1">
                <strong>GSTIN:</strong> {settings.gstin || '08AAGCS9982Q1Z4'} • <strong>Phone:</strong> {settings.phone || '+91 141 289 9000'}
              </p>
            </div>

            <div className="sm:text-right">
              <div className="inline-block px-3 py-1 rounded-lg bg-slate-100 text-[#3157D5] font-black text-sm uppercase tracking-wider mb-2">
                TAX INVOICE
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {invoice.id}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Date: <strong>{invoice.invoiceDate}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Payment Due Date: <strong className="text-rose-600">{invoice.dueDate}</strong>
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Order Ref: {invoice.orderId || 'SO-2026-1045'}
              </p>
            </div>
          </div>

          {/* Bill To & Ship To */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-6 border-b border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Billed To (Customer):
              </span>
              <h3 className="text-sm font-bold text-slate-900">
                {invoice.customerName}
              </h3>
              <p className="text-slate-600 mt-1">
                {invoice.billingAddress || 'Johari Bazar, Jaipur, Rajasthan 302003'}
              </p>
              <p className="text-slate-700 mt-1">
                <strong>Buyer GSTIN:</strong> {invoice.gstin || '08AAGCS1245P1Z4'}
              </p>
              <p className="text-slate-500 mt-0.5">State Code: 08 (Rajasthan - Intra-State)</p>
            </div>

            <div className="sm:text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Dispatched From &amp; Shipped To:
              </span>
              <p className="text-slate-700 font-semibold">
                Jaipur Main Warehouse (VKIA Hub)
              </p>
              <p className="text-slate-600 mt-1">
                Delivery Location: {invoice.shippingAddress || invoice.billingAddress}
              </p>
              <p className="text-slate-500 mt-1">
                Carrier: Tata Ace Gold (RJ-14-GB-4512)
              </p>
            </div>
          </div>

          {/* Products Table */}
          <div className="py-6 overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-2.5">#</th>
                  <th className="py-2.5">Product Description</th>
                  <th className="py-2.5">HSN Code</th>
                  <th className="py-2.5 text-right">Quantity</th>
                  <th className="py-2.5 text-right">Unit Rate</th>
                  <th className="py-2.5 text-right">GST Rate</th>
                  <th className="py-2.5 text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoice.items?.map((it, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50">
                    <td className="py-3 font-semibold text-slate-400">{idx + 1}</td>
                    <td className="py-3 font-bold text-slate-900 max-w-xs">{it.product}</td>
                    <td className="py-3 font-mono text-slate-500">{it.hsn || '19053100'}</td>
                    <td className="py-3 text-right font-semibold">{it.qty}</td>
                    <td className="py-3 text-right">{formatINR(it.rate)}</td>
                    <td className="py-3 text-right font-medium">{it.gst || 18}%</td>
                    <td className="py-3 text-right font-bold text-slate-900">{formatINR(it.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Financial Summary Breakdown */}
          <div className="pt-6 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs">
            <div>
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px] block mb-1">
                Declaration &amp; Terms:
              </span>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-sm">
                {settings.invoiceFooterNotes || 'Subject to Jaipur Jurisdiction. Goods once sold will be replaced only under manufacturer defect terms. Certified that particulars given above are true and correct.'}
              </p>

              <div className="mt-8 pt-4 border-t border-slate-200 max-w-xs">
                <p className="text-[11px] font-bold text-slate-700">For Shree Ganesh Distribution</p>
                <div className="h-10"></div>
                <p className="text-[10px] text-slate-400 font-medium uppercase">Authorized Signatory</p>
              </div>
            </div>

            <div className="space-y-2 text-right">
              <div className="flex justify-between text-slate-600">
                <span>Taxable Subtotal:</span>
                <span className="font-semibold text-slate-900">{formatINR(invoice.subtotal)}</span>
              </div>

              {invoice.discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Special Trade Discount:</span>
                  <span className="font-semibold">-{formatINR(invoice.discount)}</span>
                </div>
              )}

              <div className="flex justify-between text-slate-600">
                <span>Central GST (CGST):</span>
                <span className="font-semibold">{formatINR(invoice.cgst || (invoice.grandTotal - invoice.subtotal) / 2)}</span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>State GST (SGST):</span>
                <span className="font-semibold">{formatINR(invoice.sgst || (invoice.grandTotal - invoice.subtotal) / 2)}</span>
              </div>

              <div className="pt-2 border-t border-slate-900 flex justify-between text-base font-bold text-slate-900">
                <span>Grand Total:</span>
                <span className="text-[#3157D5] font-black">{formatINR(invoice.grandTotal)}</span>
              </div>

              <div className="flex justify-between text-emerald-700 font-semibold pt-1">
                <span>Paid to Date:</span>
                <span>{formatINR(invoice.paidAmount)}</span>
              </div>

              <div className="flex justify-between text-rose-600 font-black text-sm pt-1">
                <span>Balance Due:</span>
                <span>{formatINR(invoice.balanceDue)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
