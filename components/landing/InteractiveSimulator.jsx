'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStockora } from '@/context/StockoraContext';
import {
  FileText,
  Plus,
  Minus,
  Sparkles,
  Warehouse,
  CheckCircle2,
  Zap,
} from 'lucide-react';

export default function InteractiveSimulator() {
  const { products, customers, warehouses, addToast } = useStockora();

  const sampleCustomers = customers?.length > 0 ? customers.slice(0, 4) : [
    { id: 'c1', name: 'Sharma General Store (Jaipur)', creditLimit: 400000, currentBalance: 120000, priceTier: 'Tier 1 Super Stockist' },
    { id: 'c2', name: 'Gupta Daily Needs & Kirana', creditLimit: 250000, currentBalance: 85000, priceTier: 'Tier 2 Wholesaler' },
    { id: 'c3', name: 'Metro Cash & Carry Hub', creditLimit: 800000, currentBalance: 310000, priceTier: 'Tier 1 Super Stockist' },
    { id: 'c4', name: 'Aggarwal Provision Store', creditLimit: 150000, currentBalance: 22000, priceTier: 'Tier 3 Semi-Wholesaler' },
  ];

  const sampleProducts = products?.length > 0 ? products.slice(0, 4) : [
    { id: 'p1', name: 'Parle-G Gluco Biscuits 250g (Carton)', sku: 'PARLE-G-250', sellingPrice: 720, costPrice: 620, unit: 'Carton (48 pkts)' },
    { id: 'p2', name: 'Fortune Sunlite Refined Oil 1L (Box)', sku: 'FORT-OIL-1L', sellingPrice: 1420, costPrice: 1280, unit: 'Box (12 pkts)' },
    { id: 'p3', name: 'Tata Salt Vacuum Evaporated 1kg (Bag)', sku: 'TATA-SALT-1K', sellingPrice: 550, costPrice: 480, unit: 'Bag (25 pkts)' },
    { id: 'p4', name: 'Britannia Good Day Butter 100g (Carton)', sku: 'BRIT-GD-100', sellingPrice: 1350, costPrice: 1180, unit: 'Carton (48 pkts)' },
  ];

  const sampleWarehouses = warehouses?.length > 0
    ? warehouses.map(w => w.name)
    : ['Jaipur Main Warehouse', 'Sanganer Distribution Hub', 'Ajmer Regional Depot'];

  const [selectedCustomer, setSelectedCustomer] = useState(sampleCustomers[0] || {});
  const [selectedWarehouse, setSelectedWarehouse] = useState(sampleWarehouses[0] || 'Jaipur Main Warehouse');
  const [orderItems, setOrderItems] = useState([
    { product: sampleProducts[0], quantity: 15 },
    { product: sampleProducts[1], quantity: 10 },
  ]);
  const [dispatched, setDispatched] = useState(false);

  const updateQuantity = (index, delta) => {
    setDispatched(false);
    setOrderItems((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const addProductToCart = (prod) => {
    setDispatched(false);
    const exists = orderItems.find((i) => i.product.id === prod.id);
    if (exists) {
      updateQuantity(
        orderItems.findIndex((i) => i.product.id === prod.id),
        1
      );
    } else {
      setOrderItems([...orderItems, { product: prod, quantity: 5 }]);
    }
  };

  const removeProductFromCart = (index) => {
    setDispatched(false);
    setOrderItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  const subtotal = orderItems.reduce(
    (sum, item) => sum + (item.product.sellingPrice || 1000) * item.quantity,
    0
  );
  const costTotal = orderItems.reduce(
    (sum, item) => sum + (item.product.costPrice || 850) * item.quantity,
    0
  );
  const gstAmount = Math.round(subtotal * 0.05); // 5% FMCG GST
  const grandTotal = subtotal + gstAmount;
  const grossProfit = subtotal - costTotal;
  const marginPercent = subtotal > 0 ? ((grossProfit / subtotal) * 100).toFixed(1) : 0;

  const handleSimulateDispatch = () => {
    setDispatched(true);
    if (addToast) {
      addToast(`Order SO-2026-LIVE dispatched from ${selectedWarehouse}!`);
    }
  };

  return (
    <section id="simulator" className="py-16 sm:py-24 md:py-32 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Try 60-Second Wholesale Order & Billing.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Configure a real FMCG wholesale order below. Experience how automatic FEFO batch locks, B2B credit ceiling checks, GST billing, and live gross margins update instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Order Configuration Panel */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950/80 p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl space-y-5 sm:space-y-6">
            
            {/* Step 1: Retailer */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center">1</span>
                  Select Retailer / Mandi Trader
                </label>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  Credit Limit Guard: Active
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleCustomers.map((cust) => {
                  const isSelected = selectedCustomer?.id === cust.id;
                  return (
                    <button
                      key={cust.id}
                      type="button"
                      onClick={() => { setSelectedCustomer(cust); setDispatched(false); }}
                      className={`p-3.5 text-left rounded-2xl border text-xs transition-all ${
                        isSelected
                          ? 'bg-blue-50 dark:bg-blue-600/15 border-blue-500 text-slate-900 dark:text-white font-semibold ring-1 ring-blue-500 shadow-xs'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="font-bold truncate">{cust.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex justify-between">
                        <span>Limit: ₹{(cust.creditLimit || 300000).toLocaleString('en-IN')}</span>
                        <span className="text-slate-400 dark:text-slate-500">{cust.priceTier}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Warehouse */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center">2</span>
                Dispatch Godown Location
              </label>
              <div className="flex flex-wrap gap-2">
                {sampleWarehouses.map((hub) => (
                  <button
                    key={hub}
                    type="button"
                    onClick={() => { setSelectedWarehouse(hub); setDispatched(false); }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all ${
                      selectedWarehouse === hub
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <Warehouse className="w-3.5 h-3.5" />
                    <span>{hub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Quick Add SKUs */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5 mb-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[11px] font-black flex items-center justify-center">3</span>
                Quick Add High-Turnover FMCG SKUs
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {sampleProducts.map((prod) => (
                  <button
                    key={prod.id}
                    type="button"
                    onClick={() => addProductToCart(prod)}
                    className="p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 text-left flex items-center justify-between text-xs group transition-all shadow-xs"
                  >
                    <div className="truncate pr-2">
                      <div className="font-bold text-slate-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {prod.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        ₹{prod.sellingPrice?.toLocaleString('en-IN')} / {prod.unit?.split(' ')[0]}
                      </div>
                    </div>
                    <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Cart Line Items */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Cart Order Items ({orderItems.length})
                </span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                  FEFO Allocation: Auto Batch 2026-B
                </span>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-h-56 overflow-y-auto">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div className="truncate pr-2">
                      <div className="font-bold text-slate-900 dark:text-white truncate">
                        {item.product.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        ₹{item.product.sellingPrice} × {item.quantity} Cases = ₹
                        {(item.product.sellingPrice * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(idx, -1)}
                          className="px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 py-1 font-bold text-slate-900 dark:text-white min-w-[28px] text-center font-mono">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(idx, 1)}
                          className="px-2 py-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeProductFromCart(idx)}
                        className="text-slate-400 hover:text-rose-500 text-sm px-1 font-bold"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Real-Time B2B Wholesale Invoice Terminal (Dark High Contrast for Realism) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-950 to-slate-900 text-white p-4 sm:p-8 rounded-2xl sm:rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="text-sm font-bold tracking-tight">
                  Live GST Tax Invoice Terminal
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                GST Ready
              </span>
            </div>

            <div className="mt-4 text-xs space-y-2.5 font-mono">
              <div className="flex justify-between text-slate-400">
                <span>Party Name:</span>
                <span className="text-white font-semibold truncate max-w-[140px] sm:max-w-[180px]">
                  {selectedCustomer?.name || 'Cash Retailer'}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Godown Hub:</span>
                <span className="text-slate-200">{selectedWarehouse}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Invoice Series:</span>
                <span className="text-blue-400">INV-2026-LIVE-891</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>FEFO Lot Assigned:</span>
                <span className="text-emerald-400 font-bold">LOT-PARLE-B04 (18 Days Left)</span>
              </div>
            </div>

            {/* Calculations */}
            <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Taxable Amount:</span>
                <span className="font-mono text-white">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST (CGST 2.5% + SGST 2.5%):</span>
                <span className="font-mono text-white">₹{gstAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-white pt-2.5 border-t border-slate-800">
                <span>Total Payable:</span>
                <span className="text-emerald-400 font-mono text-lg">
                  ₹{grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Gross Profit Callout */}
            <div className="mt-6 p-4 rounded-2xl bg-blue-950/40 border border-blue-800/60">
              <div className="flex items-center justify-between text-xs">
                <span className="text-blue-300 font-medium">Net Gross Profit:</span>
                <span className="text-emerald-400 font-bold font-mono">
                  +₹{grossProfit.toLocaleString('en-IN')} ({marginPercent}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2.5 overflow-hidden">
                <div
                  className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(10, marginPercent * 4))}%` }}
                />
              </div>
            </div>

            {/* Interactive Dispatch Button */}
            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleSimulateDispatch}
                className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all ${
                  dispatched
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 ring-2 ring-emerald-400'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-600/30 active:scale-98'
                }`}
              >
                {dispatched ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-white animate-bounce" />
                    <span>Order Dispatched & Bilti Generated!</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 text-amber-300" />
                    <span>Simulate 1-Click Order Dispatch</span>
                  </>
                )}
              </button>

              {dispatched && (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl text-xs text-emerald-300 animate-in fade-in duration-200">
                  <p className="font-bold">✔ Success: Inventory reserved from {selectedWarehouse}.</p>
                  <p className="text-[11px] text-emerald-400/90 mt-0.5">
                    Party outstanding balance updated. E-Way Bill ready for van dispatch.
                  </p>
                </div>
              )}

              <Link
                href="/admin"
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 font-semibold text-xs text-slate-300 flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>Open Full Admin ERP Command Suite →</span>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
