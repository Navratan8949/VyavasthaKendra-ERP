'use client';

import React, { useState } from 'react';
import { Settings, Save, Shield, CheckCircle2, RotateCcw } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';

export default function SettingsPage() {
  const { settings, updateSettings, warehouses } = useStockora();
  const [formData, setFormData] = useState(settings);
  const [activeSection, setActiveSection] = useState('Business');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
  };

  return (
    <AdminLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Distributor &amp; ERP System Configuration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure Shree Ganesh Distribution master trade settings, tax rates, GST billing format, and depots.
          </p>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {['Business', 'Tax & GST', 'Invoice Numbering', 'Inventory Control', 'Notifications'].map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`pb-3 px-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap ${
                activeSection === sec
                  ? 'border-[#3157D5] text-[#3157D5]'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Section */}
          {activeSection === 'Business' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Company &amp; Registered Business Entity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Legal Business Trade Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Goods &amp; Services Tax Identification (GSTIN)
                  </label>
                  <input
                    type="text"
                    name="gstin"
                    value={formData.gstin || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Business Contact Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Operations Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Registered Warehouse &amp; Head Office Address
                  </label>
                  <textarea
                    rows={2}
                    name="address"
                    value={formData.address || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tax & GST Section */}
          {activeSection === 'Tax & GST' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                GST Tax Slabs &amp; State Rules
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block">Intra-State Rajasthan Trade:</span>
                  <p className="text-slate-500">
                    50% CGST (Central Goods and Services Tax) + 50% SGST (State Goods and Services Tax) applied on intra-state wholesale billing.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-2">
                  <span className="font-bold text-slate-900 dark:text-white block">Inter-State Consignments:</span>
                  <p className="text-slate-500">
                    100% Integrated GST (IGST) for deliveries to neighboring states (Haryana, Delhi, Punjab, Gujarat).
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Invoice Numbering Section */}
          {activeSection === 'Invoice Numbering' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Invoice Series &amp; Footer Notes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Invoice Prefix
                  </label>
                  <input
                    type="text"
                    name="invoicePrefix"
                    value={formData.invoicePrefix || 'INV-2026-'}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Sales Order Prefix
                  </label>
                  <input
                    type="text"
                    name="orderPrefix"
                    value={formData.orderPrefix || 'SO-2026-'}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Financial Year
                  </label>
                  <input
                    type="text"
                    name="financialYear"
                    value={formData.financialYear || '2026-2027'}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Invoice Terms &amp; Conditions Footer
                  </label>
                  <textarea
                    rows={2}
                    name="invoiceFooterNotes"
                    value={formData.invoiceFooterNotes || ''}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Inventory Control Section */}
          {activeSection === 'Inventory Control' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                Stock Safety &amp; Warehouse Defaults
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Default Low Stock Threshold Quantity
                  </label>
                  <input
                    type="number"
                    name="lowStockThreshold"
                    value={formData.lowStockThreshold || 20}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                    Default Dispatch Warehouse
                  </label>
                  <select
                    name="defaultWarehouse"
                    value={formData.defaultWarehouse || 'Jaipur Main Warehouse'}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                  >
                    {warehouses.map((w) => (
                      <option key={w.id} value={w.name}>{w.name}</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="preventNegativeStock"
                      checked={formData.preventNegativeStock}
                      onChange={handleChange}
                      className="rounded text-[#3157D5] w-4 h-4"
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      Strict Negative Stock Prevention (Block sales order creation if available stock is insufficient)
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'Notifications' && (
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
                System Alerts &amp; Notifications
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#3157D5] w-4 h-4"
                  />
                  <span>Show instant alert when product stock drops below minimum safety threshold</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#3157D5] w-4 h-4"
                  />
                  <span>Alert accountant when customer invoices exceed payment credit terms (&gt; 15 days)</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded text-[#3157D5] w-4 h-4"
                  />
                  <span>Notify warehouse manager on arrival of supplier Goods Received consignments</span>
                </label>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
