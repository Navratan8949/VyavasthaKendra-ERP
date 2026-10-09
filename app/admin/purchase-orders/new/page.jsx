'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Save, ShoppingBag } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const { suppliers, warehouses, products, createPurchaseOrder } = useStockora();

  const [supplierId, setSupplierId] = useState(suppliers[0]?.id || '');
  const [warehouse, setWarehouse] = useState(warehouses[0]?.name || 'Jaipur Main Warehouse');
  const [expectedDate, setExpectedDate] = useState(() =>
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [notes, setNotes] = useState('');
  const [discount, setDiscount] = useState('0');

  // Dynamic items list
  const [items, setItems] = useState([
    {
      productId: products[0]?.id || '',
      name: products[0]?.name || '',
      qty: 25,
      rate: products[0]?.purchasePrice || 220,
    },
  ]);

  const handleProductChange = (index, prodId) => {
    const selected = products.find((p) => p.id === prodId);
    if (!selected) return;
    const newItems = [...items];
    newItems[index] = {
      productId: selected.id,
      name: selected.name,
      qty: newItems[index].qty || 10,
      rate: selected.purchasePrice,
    };
    setItems(newItems);
  };

  const handleQtyChange = (index, val) => {
    const newItems = [...items];
    newItems[index].qty = Math.max(1, Number(val));
    setItems(newItems);
  };

  const handleRateChange = (index, val) => {
    const newItems = [...items];
    newItems[index].rate = Math.max(0, Number(val));
    setItems(newItems);
  };

  const handleAddItem = () => {
    const nextProd = products[items.length % products.length] || products[0];
    setItems([
      ...items,
      {
        productId: nextProd.id,
        name: nextProd.name,
        qty: 15,
        rate: nextProd.purchasePrice,
      },
    ]);
  };

  const handleRemoveItem = (index) => {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  const discountAmount = Number(discount) || 0;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.09); // Approx 9% average GST
  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sup = suppliers.find((s) => s.id === supplierId);

    const created = createPurchaseOrder({
      supplierId,
      supplierName: sup?.companyName || 'Supplier',
      warehouse,
      expectedDate,
      items: items.map((it) => ({
        ...it,
        amount: it.qty * it.rate,
      })),
      subtotal,
      discount: discountAmount,
      gstAmount,
      grandTotal,
      notes,
    });

    router.push('/admin/purchase-orders');
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/purchase-orders"
            className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Create Purchase Order
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Issue an official procurement order to supplier principal for inventory restocking.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header Details */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              1. Supplier &amp; Depot Destination
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Supplier Vendor *
                </label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.companyName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Destination Warehouse *
                </label>
                <select
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                2. Order Line Items
              </h2>
              <button
                type="button"
                onClick={handleAddItem}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#3157D5] bg-blue-50 dark:bg-blue-950/40 rounded-lg hover:bg-blue-100 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item Line</span>
              </button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {items.map((item, index) => {
                const lineTotal = item.qty * item.rate;
                return (
                  <div key={index} className="py-3 flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full sm:flex-1">
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Product SKU
                      </label>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      >
                        {products.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="w-full sm:w-28">
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => handleQtyChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>

                    <div className="w-full sm:w-32">
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Purchase Rate (₹)
                      </label>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleRateChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>

                    <div className="w-full sm:w-32 text-right">
                      <span className="text-[10px] text-slate-400 font-medium block mb-1">
                        Line Total
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {formatINR(lineTotal)}
                      </span>
                    </div>

                    <div className="sm:pt-5">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        disabled={items.length <= 1}
                        className="p-1.5 text-slate-400 hover:text-rose-600 disabled:opacity-30 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Summary & Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Purchase Order Terms &amp; Instructions
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Transport carrier details, delivery time window, unloading instructions..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatINR(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Special Supplier Discount (₹):</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 px-2 py-1 text-right text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Estimated Input GST Tax:</span>
                <span className="font-semibold">{formatINR(gstAmount)}</span>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Grand Total:</span>
                <span className="text-base text-[#3157D5]">{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/purchase-orders"
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border rounded-xl"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Issue Purchase Order</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
