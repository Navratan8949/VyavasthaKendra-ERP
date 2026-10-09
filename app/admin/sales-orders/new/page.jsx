'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Trash2, Save, ShoppingCart, AlertTriangle } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function NewSalesOrderPage() {
  const router = useRouter();
  const { customers, warehouses, salesmen, products, createSalesOrder } = useStockora();

  const [customerId, setCustomerId] = useState(customers[0]?.id || '');
  const [warehouse, setWarehouse] = useState(warehouses[0]?.name || 'Jaipur Main Warehouse');
  const [salesman, setSalesman] = useState(salesmen[0]?.name || 'Rahul Kumar');
  const [deliveryDate, setDeliveryDate] = useState(() =>
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [paymentMethod, setPaymentMethod] = useState('Credit');
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [shippingCharges, setShippingCharges] = useState('0');
  const [discount, setDiscount] = useState('500');
  const [notes, setNotes] = useState('');

  // Line items
  const [items, setItems] = useState([
    {
      productId: products[1]?.id || products[0]?.id || '',
      name: products[1]?.name || products[0]?.name || '',
      qty: 10,
      rate: products[1]?.sellingPrice || products[0]?.sellingPrice || 255,
      gstRate: products[1]?.gstRate || 5,
    },
  ]);

  const handleProductChange = (index, prodId) => {
    const selected = products.find((p) => p.id === prodId);
    if (!selected) return;
    const newItems = [...items];
    newItems[index] = {
      productId: selected.id,
      name: selected.name,
      qty: 5,
      rate: selected.sellingPrice,
      gstRate: selected.gstRate,
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
    const nextProd = products.find((p) => !items.some((i) => i.productId === p.id)) || products[0];
    setItems([
      ...items,
      {
        productId: nextProd.id,
        name: nextProd.name,
        qty: 10,
        rate: nextProd.sellingPrice,
        gstRate: nextProd.gstRate,
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
  const shippingAmount = Number(shippingCharges) || 0;

  // Exact GST per item calculation
  const gstAmount = Math.round(
    items.reduce((sum, item) => {
      const lineTotal = item.qty * item.rate;
      return sum + (lineTotal * (item.gstRate / 100));
    }, 0)
  );

  const grandTotal = Math.max(0, subtotal - discountAmount + gstAmount + shippingAmount);

  // Stock check validation
  const stockErrors = items.map((item) => {
    const p = products.find((prod) => prod.id === item.productId);
    if (p && item.qty > p.currentStock) {
      return `Insufficient stock for "${p.name}". Available: ${p.currentStock} ${p.unit}.`;
    }
    return null;
  }).filter(Boolean);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockErrors.length > 0) {
      alert(stockErrors.join('\n'));
      return;
    }

    const cust = customers.find((c) => c.id === customerId);

    const created = createSalesOrder({
      customerId,
      customerName: cust?.businessName || 'Retailer',
      warehouse,
      salesman,
      expectedDelivery: deliveryDate,
      paymentMethod,
      paymentStatus,
      items: items.map((it) => ({
        ...it,
        amount: it.qty * it.rate,
      })),
      subtotal,
      discount: discountAmount,
      gstAmount,
      shippingCharges: shippingAmount,
      grandTotal,
      notes,
    });

    if (created) {
      router.push(`/admin/invoices/${created.invoiceId}`);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/sales-orders"
            className="p-2 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              Create Wholesale Sales Order
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Draft customer dispatch order with instant stock validation, GST calculation, and invoice generation.
            </p>
          </div>
        </div>

        {stockErrors.length > 0 && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-2xl flex items-start gap-3 text-xs text-rose-800 dark:text-rose-300">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold">Stock Availability Alert:</span>
              {stockErrors.map((err, i) => (
                <p key={i}>{err}</p>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Customer & Logistics */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              1. Customer &amp; Delivery Logistics
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Retailer Account *
                </label>
                <select
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.businessName} (Outstanding: {formatINR(c.outstanding)})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Fulfillment Depot *
                </label>
                <select
                  value={warehouse}
                  onChange={(e) => setWarehouse(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.name}>{w.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Assigned Route Salesman
                </label>
                <select
                  value={salesman}
                  onChange={(e) => setSalesman(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  {salesmen.map((sm) => (
                    <option key={sm.id} value={sm.name}>{sm.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Expected Delivery Date
                </label>
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Payment Mode
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Credit">Credit (Standard Term)</option>
                  <option value="Bank Transfer">Bank Transfer (NEFT/RTGS)</option>
                  <option value="UPI">UPI Instant</option>
                  <option value="Cash">Cash on Delivery</option>
                  <option value="Cheque">PDC Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Initial Payment Status
                </label>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Unpaid">Unpaid (Add to Outstanding)</option>
                  <option value="Paid">Immediate Settlement (Paid)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Order Items */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                2. Ordered FMCG SKUs
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
                const p = products.find((prod) => prod.id === item.productId);
                const isOutOfStock = p && item.qty > p.currentStock;
                const lineTotal = item.qty * item.rate;

                return (
                  <div key={index} className="py-3 flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-full sm:flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-[10px] text-slate-400 font-medium">
                          Product SKU
                        </label>
                        {p && (
                          <span className={`text-[10px] font-bold ${isOutOfStock ? 'text-rose-600' : 'text-slate-500'}`}>
                            Stock: {p.currentStock} {p.unit}
                          </span>
                        )}
                      </div>
                      <select
                        value={item.productId}
                        onChange={(e) => handleProductChange(index, e.target.value)}
                        className={`w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg ${
                          isOutOfStock ? 'border-rose-400 text-rose-700' : ''
                        }`}
                      >
                        {products.map((prod) => (
                          <option key={prod.id} value={prod.id}>
                            {prod.name} (Stock: {prod.currentStock} {prod.unit})
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
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg"
                      />
                    </div>

                    <div className="w-full sm:w-28">
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        Rate (₹)
                      </label>
                      <input
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleRateChange(index, e.target.value)}
                        className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg"
                      />
                    </div>

                    <div className="w-full sm:w-24">
                      <label className="text-[10px] text-slate-400 font-medium block mb-1">
                        GST Slab
                      </label>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 block py-1.5">
                        {item.gstRate}%
                      </span>
                    </div>

                    <div className="w-full sm:w-28 text-right">
                      <span className="text-[10px] text-slate-400 font-medium block mb-1">
                        Line Amount
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

          {/* Bottom Live Financial Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Delivery Instructions &amp; Remarks
              </label>
              <textarea
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Market store delivery instructions, preferred unloading gate..."
                className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({items.length} items):</span>
                <span className="font-semibold text-slate-900 dark:text-white">{formatINR(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Trade Discount (₹):</span>
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-24 px-2 py-1 text-right text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Total GST (CGST + SGST):</span>
                <span className="font-semibold">{formatINR(gstAmount)}</span>
              </div>

              <div className="flex items-center justify-between text-slate-600">
                <span>Freight / Delivery Charge (₹):</span>
                <input
                  type="number"
                  value={shippingCharges}
                  onChange={(e) => setShippingCharges(e.target.value)}
                  className="w-24 px-2 py-1 text-right text-xs bg-slate-50 dark:bg-slate-800 border rounded-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-bold text-slate-900 dark:text-white">
                <span>Invoice Grand Total:</span>
                <span className="text-base text-[#3157D5]">{formatINR(grandTotal)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/admin/sales-orders"
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border rounded-xl"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={stockErrors.length > 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Confirm Order &amp; Generate Invoice</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
