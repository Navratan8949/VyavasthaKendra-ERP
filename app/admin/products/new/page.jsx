'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Sparkles } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';

export default function NewProductPage() {
  const router = useRouter();
  const { categories, brands, warehouses, addProduct } = useStockora();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    category: categories[0]?.name || 'Grocery & Staples',
    brand: brands[0]?.name || 'ITC Aashirvaad',
    unit: 'CASE',
    packSize: '1 x 10 units',
    purchasePrice: '',
    sellingPrice: '',
    mrp: '',
    gstRate: '18',
    hsnCode: '19053100',
    openingStock: '',
    minStock: '20',
    warehouse: warehouses[0]?.name || 'Jaipur Main Warehouse',
    description: '',
    status: 'Active',
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleGenerateSKU = () => {
    if (!formData.name) return;
    const prefix = formData.name.slice(0, 4).toUpperCase();
    const random = Math.floor(100 + Math.random() * 900);
    const generatedSku = `${prefix}-${formData.unit}-${random}`;
    const generatedBarcode = '890' + Math.floor(1000000000 + Math.random() * 9000000000);
    setFormData((prev) => ({
      ...prev,
      sku: generatedSku,
      barcode: String(generatedBarcode),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.purchasePrice || !formData.sellingPrice) {
      alert('Please fill all mandatory fields (Name, Purchase Price, Selling Price)');
      return;
    }

    const created = addProduct({
      ...formData,
      currentStock: Number(formData.openingStock || 0),
      openingStock: Number(formData.openingStock || 0),
      purchasePrice: Number(formData.purchasePrice),
      sellingPrice: Number(formData.sellingPrice),
      mrp: Number(formData.mrp || formData.sellingPrice * 1.15),
      minStock: Number(formData.minStock || 10),
      gstRate: Number(formData.gstRate),
    });

    router.push(`/admin/products/${created.id}`);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back navigation & Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                Add New Product SKU
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Register FMCG product master record, wholesale margins, and initial stock.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Basic Information */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
              1. Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Aashirvaad Shudh Chakki Atta 5kg"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    SKU Code *
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateSKU}
                    className="text-[11px] text-[#3157D5] hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" /> Auto-generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  placeholder="e.g. AASH-ATTA-5KG"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Barcode (EAN-13 / GTIN)
                </label>
                <input
                  type="text"
                  name="barcode"
                  value={formData.barcode}
                  onChange={handleChange}
                  placeholder="e.g. 8901725131012"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Brand *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                >
                  {brands.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Packaging Unit *
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                >
                  {['PCS', 'BOX', 'CASE', 'PACK', 'KG', 'GRAM', 'TON', 'LITRE', 'DOZEN', 'BAG'].map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Pack Size Specification
                </label>
                <input
                  type="text"
                  name="packSize"
                  value={formData.packSize}
                  onChange={handleChange}
                  placeholder="e.g. 24 x 1kg or 4 x 5L"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Taxation */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              2. Pricing &amp; GST Rates
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Purchase Price (INR) *
                </label>
                <input
                  type="number"
                  required
                  name="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={handleChange}
                  placeholder="e.g. 220"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Wholesale Selling Price *
                </label>
                <input
                  type="number"
                  required
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={handleChange}
                  placeholder="e.g. 255"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Retail MRP
                </label>
                <input
                  type="number"
                  name="mrp"
                  value={formData.mrp}
                  onChange={handleChange}
                  placeholder="e.g. 285"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  GST Rate Slab
                </label>
                <select
                  name="gstRate"
                  value={formData.gstRate}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                >
                  <option value="0">0% (Nil / Exempt)</option>
                  <option value="5">5% (Essential Staples)</option>
                  <option value="12">12% (Processed Dairy)</option>
                  <option value="18">18% (Standard FMCG)</option>
                  <option value="28">28% (Beverages / Luxury)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 3: Inventory & Warehouse Location */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              3. Inventory &amp; Warehouse
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Opening Stock Quantity
                </label>
                <input
                  type="number"
                  name="openingStock"
                  value={formData.openingStock}
                  onChange={handleChange}
                  placeholder="e.g. 100"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Safety Minimum Stock (Threshold)
                </label>
                <input
                  type="number"
                  name="minStock"
                  value={formData.minStock}
                  onChange={handleChange}
                  placeholder="e.g. 20"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Default Warehouse Depot
                </label>
                <select
                  name="warehouse"
                  value={formData.warehouse}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#3157D5]"
                >
                  {warehouses.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Buttons Bottom Bar */}
          <div className="flex items-center justify-end gap-3 pt-3">
            <Link
              href="/admin/products"
              className="px-5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Product SKU</span>
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
