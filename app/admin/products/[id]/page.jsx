'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Edit,
  Package,
  Layers,
  Award,
  Warehouse,
  History,
  TrendingUp,
  AlertTriangle,
  ShoppingCart,
  Boxes,
  ArrowRightLeft,
  Plus,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function ProductDetailPage({ params }) {
  const unwrappedParams = use(params);
  const productId = unwrappedParams.id;
  const router = useRouter();

  const { products, salesOrders, purchases, stockMovements, warehouses } = useStockora();
  const [activeTab, setActiveTab] = useState('Overview');

  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <AdminLayout>
        <div className="p-12 text-center">
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">
            Product Not Found
          </h2>
          <p className="text-xs text-slate-400 mt-1 mb-4">
            The product with ID {productId} does not exist in master records.
          </p>
          <Link
            href="/admin/products"
            className="px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] rounded-xl"
          >
            Return to Products Catalog
          </Link>
        </div>
      </AdminLayout>
    );
  }

  // Related Sales Orders containing this product
  const relatedSales = salesOrders.filter((o) =>
    o.items?.some((it) => it.productId === product.id)
  );

  // Related Purchases
  const relatedPurchases = purchases.filter((p) =>
    p.items?.some((it) => it.productId === product.id)
  );

  // Related Stock Movements
  const relatedMovements = stockMovements.filter((m) => m.productId === product.id);

  // Profit calculation
  const unitMargin = product.sellingPrice - product.purchasePrice;
  const marginPercentage = ((unitMargin / product.sellingPrice) * 100).toFixed(1);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Header & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/products"
              className="p-2 text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  {product.name}
                </h1>
                <StatusBadge status={product.status} />
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                <span>SKU: {product.sku}</span>
                <span>•</span>
                <span>Barcode: {product.barcode}</span>
                <span>•</span>
                <span>{product.brand}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href={`/admin/products/${product.id}/edit`}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <Edit className="w-3.5 h-3.5" />
              <span>Edit SKU</span>
            </Link>

            <Link
              href="/admin/inventory/transfer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Transfer Stock</span>
            </Link>
          </div>
        </div>

        {/* Quick KPI Bar for this product */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Current Available Stock
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {product.currentStock}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {product.unit}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              Min Safety: {product.minStock} {product.unit}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Wholesale Selling Price
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(product.sellingPrice)}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              MRP: {formatINR(product.mrp)} (GST {product.gstRate}%)
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Unit Gross Margin
            </span>
            <span className="text-2xl font-bold text-emerald-600 mt-1 block">
              {formatINR(unitMargin)}
            </span>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5 block">
              {marginPercentage}% Margin on Selling Price
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Total Stock Valuation
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(product.currentStock * product.purchasePrice)}
            </span>
            <span className="text-[10px] text-slate-400 mt-0.5 block">
              At Purchase Cost {formatINR(product.purchasePrice)}
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {['Overview', 'Inventory & Depots', 'Sales Orders', 'Purchase Receipts', 'Stock Movement'].map((tab) => (
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

        {/* Tab 1: Overview */}
        {activeTab === 'Overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
                Master Specification Details
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Product Category</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {product.category}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block">Brand Principal</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {product.brand}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block">HSN / SAC Code</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {product.hsnCode || '19053100'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block">Standard Unit</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {product.unit} ({product.packSize || 'Standard pack'})
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block">Purchase Cost</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {formatINR(product.purchasePrice)}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block">Primary Supplier</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-100 mt-0.5 block">
                    {product.supplier || 'Rajasthan Consumer Products'}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 text-xs block mb-1">
                  Product Description &amp; Handling Notes
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {product.description || 'Standard FMCG packaged goods with fast inventory turnover.'}
                </p>
              </div>
            </div>

            {/* Warehouse Allocation Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider text-slate-400">
                Primary Storage Hub
              </h3>

              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                  <Warehouse className="w-4 h-4 text-[#3157D5]" />
                  <span>{product.warehouse}</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  VKIA Industrial Area, Jaipur Main Depository
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between">
                  <span className="text-slate-500">Stock in this Hub:</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {product.currentStock} {product.unit}
                  </span>
                </div>
              </div>

              {product.currentStock <= product.minStock && (
                <div className="p-3 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-800 dark:text-amber-400">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    Stock level is below threshold. Create a purchase order to prevent out-of-stock orders.
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Inventory & Depots */}
        {activeTab === 'Inventory & Depots' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Warehouse Distribution Allocation
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                    <th className="pb-3">Warehouse Depot</th>
                    <th className="pb-3">Manager</th>
                    <th className="pb-3">On-Hand Stock</th>
                    <th className="pb-3">Valuation</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {warehouses.map((wh) => (
                    <tr key={wh.id} className="hover:bg-slate-50/50">
                      <td className="py-3 font-semibold text-slate-800 dark:text-slate-100">
                        {wh.name}
                      </td>
                      <td className="py-3 text-slate-500">{wh.manager}</td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">
                        {wh.name === product.warehouse ? product.currentStock : 0} {product.unit}
                      </td>
                      <td className="py-3 text-slate-600 dark:text-slate-400">
                        {formatINR((wh.name === product.warehouse ? product.currentStock : 0) * product.purchasePrice)}
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href="/admin/inventory/transfer"
                          className="px-2.5 py-1 text-[11px] font-semibold text-[#3157D5] hover:underline"
                        >
                          Transfer →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Sales Orders */}
        {activeTab === 'Sales Orders' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Customer Purchase Orders for this SKU
            </h3>
            {relatedSales.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Order ID</th>
                      <th className="pb-3">Customer</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Qty Sold</th>
                      <th className="pb-3">Rate</th>
                      <th className="pb-3">Order Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedSales.map((so) => {
                      const item = so.items.find((i) => i.productId === product.id);
                      return (
                        <tr key={so.id}>
                          <td className="py-3 font-semibold text-[#3157D5]">{so.id}</td>
                          <td className="py-3 font-medium text-slate-800 dark:text-slate-100">{so.customerName}</td>
                          <td className="py-3 text-slate-400">{so.orderDate}</td>
                          <td className="py-3 font-bold text-slate-900 dark:text-white">{item?.qty} {product.unit}</td>
                          <td className="py-3">{formatINR(item?.rate)}</td>
                          <td className="py-3"><StatusBadge status={so.orderStatus} /></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No sales orders found for this SKU yet.</p>
            )}
          </div>
        )}

        {/* Tab 4: Purchase Receipts */}
        {activeTab === 'Purchase Receipts' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Supplier Inward Goods Receipts
            </h3>
            {relatedPurchases.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Receipt No</th>
                      <th className="pb-3">Supplier</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Qty Inward</th>
                      <th className="pb-3">Rate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedPurchases.map((pur) => {
                      const item = pur.items.find((i) => i.productId === product.id);
                      return (
                        <tr key={pur.id}>
                          <td className="py-3 font-semibold text-purple-600">{pur.id}</td>
                          <td className="py-3 font-medium text-slate-800 dark:text-slate-100">{pur.supplierName}</td>
                          <td className="py-3 text-slate-400">{pur.date}</td>
                          <td className="py-3 font-bold text-emerald-600">+{item?.qty} {product.unit}</td>
                          <td className="py-3">{formatINR(item?.rate)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No goods receipts registered for this product yet.</p>
            )}
          </div>
        )}

        {/* Tab 5: Stock Movement */}
        {activeTab === 'Stock Movement' && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Complete Stock Movement Ledger
            </h3>
            {relatedMovements.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-semibold uppercase">
                      <th className="pb-3">Timestamp</th>
                      <th className="pb-3">Movement Type</th>
                      <th className="pb-3">Depot</th>
                      <th className="pb-3">Qty Delta</th>
                      <th className="pb-3">Reference</th>
                      <th className="pb-3">User</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {relatedMovements.map((m) => (
                      <tr key={m.id}>
                        <td className="py-3 text-slate-400">{m.date}</td>
                        <td className="py-3 font-medium">{m.type}</td>
                        <td className="py-3 text-slate-500">{m.warehouse}</td>
                        <td className={`py-3 font-bold ${m.quantity > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {m.quantity > 0 ? `+${m.quantity}` : m.quantity} {product.unit}
                        </td>
                        <td className="py-3 text-slate-500">{m.reference}</td>
                        <td className="py-3 text-slate-400">{m.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-xs text-slate-400">No stock movements recorded yet.</p>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
