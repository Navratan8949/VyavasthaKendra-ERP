'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Package, Users, Truck, ShoppingCart, FileText, ArrowRight } from 'lucide-react';
import { useStockora } from '@/context/StockoraContext';

export default function GlobalSearch() {
  const { isSearchOpen, setIsSearchOpen, products, customers, suppliers, salesOrders, invoices } = useStockora();
  const [query, setQuery] = useState('');
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  // Search matches
  const matchedProducts = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.barcode.includes(q) ||
          p.brand.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedCustomers = q
    ? customers.filter(
        (c) =>
          c.businessName.toLowerCase().includes(q) ||
          c.ownerName.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.gstin.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedSuppliers = q
    ? suppliers.filter(
        (s) =>
          s.companyName.toLowerCase().includes(q) ||
          s.contactPerson.toLowerCase().includes(q) ||
          s.phone.includes(q)
      ).slice(0, 3)
    : [];

  const matchedOrders = q
    ? salesOrders.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customerName.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const matchedInvoices = q
    ? invoices.filter(
        (i) =>
          i.id.toLowerCase().includes(q) ||
          i.customerName.toLowerCase().includes(q)
      ).slice(0, 4)
    : [];

  const hasResults =
    matchedProducts.length > 0 ||
    matchedCustomers.length > 0 ||
    matchedSuppliers.length > 0 ||
    matchedOrders.length > 0 ||
    matchedInvoices.length > 0;

  const handleNavigate = (path) => {
    setIsSearchOpen(false);
    router.push(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 pb-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, orders, invoices, customers, suppliers..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 text-sm focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-semibold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
            ESC
          </kbd>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800/60">
          {!query && (
            <div className="p-6 text-center text-xs text-slate-400 dark:text-slate-500">
              Type to search across stock, orders, customers, invoices, and suppliers...
            </div>
          )}

          {query && !hasResults && (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No matching results found
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for &quot;Atta&quot;, &quot;Tata&quot;, &quot;Ganesh&quot;, &quot;SO-2026&quot;, or &quot;INV&quot;
              </p>
            </div>
          )}

          {/* Products Group */}
          {matchedProducts.length > 0 && (
            <div className="py-2.5">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5" /> Products
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedProducts.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleNavigate(`/admin/products/${p.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#3157D5]">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        SKU: {p.sku} • Stock: {p.currentStock} {p.unit} • ₹{p.sellingPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#3157D5] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Customers Group */}
          {matchedCustomers.length > 0 && (
            <div className="py-2.5">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" /> Customers
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedCustomers.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleNavigate(`/admin/customers/${c.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#3157D5]">
                        {c.businessName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {c.ownerName} • {c.area} • Outstanding: ₹{c.outstanding.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#3157D5] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sales Orders Group */}
          {matchedOrders.length > 0 && (
            <div className="py-2.5">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShoppingCart className="w-3.5 h-3.5" /> Sales Orders
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedOrders.map((o) => (
                  <button
                    key={o.id}
                    onClick={() => handleNavigate('/admin/sales-orders')}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#3157D5]">
                        {o.id} — {o.customerName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {o.orderDate} • ₹{o.grandTotal.toLocaleString('en-IN')} • {o.orderStatus}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#3157D5] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Invoices Group */}
          {matchedInvoices.length > 0 && (
            <div className="py-2.5">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Invoices
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedInvoices.map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => handleNavigate(`/admin/invoices/${inv.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#3157D5]">
                        {inv.id} — {inv.customerName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        Due: {inv.dueDate} • Balance: ₹{inv.balanceDue.toLocaleString('en-IN')} • {inv.status}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#3157D5] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Suppliers Group */}
          {matchedSuppliers.length > 0 && (
            <div className="py-2.5">
              <div className="px-3 py-1 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5" /> Suppliers
              </div>
              <div className="mt-1 space-y-0.5">
                {matchedSuppliers.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleNavigate(`/admin/suppliers/${s.id}`)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                  >
                    <div>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 group-hover:text-[#3157D5]">
                        {s.companyName}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {s.contactPerson} • Outstanding: ₹{s.outstanding.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:text-[#3157D5] transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
