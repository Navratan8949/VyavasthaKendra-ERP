'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Package,
  Plus,
  Eye,
  Edit,
  Copy,
  Trash2,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Boxes,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import ConfirmModal from '@/components/admin/ConfirmModal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function ProductsPage() {
  const router = useRouter();
  const {
    products,
    categories,
    brands,
    warehouses,
    deleteProduct,
    duplicateProduct,
    totalInventoryValue,
    lowStockProducts,
    outOfStockProducts,
  } = useStockora();

  const [deleteId, setDeleteId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStockStatus, setSelectedStockStatus] = useState('All');

  // Filtered dataset
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
    if (selectedStockStatus === 'Low' && p.currentStock > p.minStock) return false;
    if (selectedStockStatus === 'Out' && p.currentStock > 0) return false;
    if (selectedStockStatus === 'InStock' && p.currentStock <= p.minStock) return false;
    return true;
  });

  const columns = [
    {
      header: 'Product Name',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div className="min-w-[200px]">
          <Link
            href={`/admin/products/${row.id}`}
            className="font-bold text-slate-900 dark:text-white hover:text-[#3157D5] dark:hover:text-blue-400 block transition-colors"
          >
            {row.name}
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
            <span>SKU: {row.sku}</span>
            <span>•</span>
            <span>{row.brand}</span>
          </div>
        </div>
      ),
    },
    {
      header: 'Category',
      accessor: 'category',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">
          {row.category}
        </span>
      ),
    },
    {
      header: 'Purchase Rate',
      accessor: 'purchasePrice',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-500 font-medium">
          {formatINR(row.purchasePrice)}
        </span>
      ),
    },
    {
      header: 'Selling Price',
      accessor: 'sellingPrice',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">
            {formatINR(row.sellingPrice)}
          </span>
          <span className="text-[10px] text-slate-400">
            MRP: {formatINR(row.mrp)} (GST {row.gstRate}%)
          </span>
        </div>
      ),
    },
    {
      header: 'Stock Level',
      accessor: 'currentStock',
      sortable: true,
      cell: (row) => {
        const isLow = row.currentStock <= row.minStock && row.currentStock > 0;
        const isOut = row.currentStock === 0;

        return (
          <div>
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <span className={isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-emerald-600'}>
                {row.currentStock} {row.unit}
              </span>
              {isLow && (
                <span className="text-[9px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950/60 dark:text-amber-400 px-1 py-0.2 rounded">
                  LOW
                </span>
              )}
              {isOut && (
                <span className="text-[9px] font-bold text-rose-700 bg-rose-100 dark:bg-rose-950/60 dark:text-rose-400 px-1 py-0.2 rounded">
                  OUT
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">
              Min: {row.minStock} {row.unit}
            </span>
          </div>
        );
      },
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      sortable: true,
      cell: (row) => (
        <span className="text-xs text-slate-600 dark:text-slate-400 truncate max-w-[140px] block">
          {row.warehouse}
        </span>
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      sortable: true,
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
          <Link
            href={`/admin/products/${row.id}`}
            className="p-1.5 text-slate-400 hover:text-[#3157D5] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <Link
            href={`/admin/products/${row.id}/edit`}
            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Edit Product"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            onClick={() => duplicateProduct(row.id)}
            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Duplicate SKU"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => setDeleteId(row.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
            title="Delete Product"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Title & CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Product Master Catalog
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              FMCG product catalogue, wholesale price tiers, barcode, and depot inventory levels.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Product</span>
            </Link>
          </div>
        </div>

        {/* Stats Summary Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Total SKUs
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {products.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Active SKUs
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {products.filter((p) => p.status === 'Active').length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-amber-600 uppercase tracking-wider block">
              Low Stock Alert
            </span>
            <span className="text-xl font-bold text-amber-600 mt-1 block">
              {lowStockProducts.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wider block">
              Out of Stock
            </span>
            <span className="text-xl font-bold text-rose-600 mt-1 block">
              {outOfStockProducts.length}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Stock Valuation
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalInventoryValue)}
            </span>
          </div>
        </div>

        {/* Filter Quick Badges */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 mr-1">Filter Category:</span>
          {['All', ...categories.map((c) => c.name)].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#3157D5] text-white shadow-2xs font-semibold'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products DataTable */}
        <DataTable
          columns={columns}
          data={filteredProducts}
          searchKey="name"
          searchPlaceholder="Search product by name, SKU, brand..."
          filterOptions={[
            { label: 'All Stock', value: 'All' },
            { label: 'In Stock', value: 'InStock' },
            { label: 'Low Stock', value: 'Low' },
            { label: 'Out of Stock', value: 'Out' },
          ]}
          activeFilter={selectedStockStatus}
          onFilterChange={setSelectedStockStatus}
          onRowClick={(row) => router.push(`/admin/products/${row.id}`)}
          emptyTitle="No products match your filter"
          emptyDescription="Try selecting a different category or clear the search query."
        />

        {/* Delete Confirmation Modal */}
        <ConfirmModal
          isOpen={!!deleteId}
          onClose={() => setDeleteId(null)}
          onConfirm={() => {
            if (deleteId) deleteProduct(deleteId);
          }}
          title="Delete Product SKU?"
          message="Are you sure you want to delete this product? Historical invoices and purchase logs will retain record, but the SKU will be removed from future ordering."
          confirmText="Delete SKU"
          danger={true}
        />
      </div>
    </AdminLayout>
  );
}
