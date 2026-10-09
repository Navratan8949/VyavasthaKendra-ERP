'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Plus, Eye, CheckCircle2, Boxes } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function PurchaseOrdersPage() {
  const router = useRouter();
  const { purchaseOrders, receivePurchaseGoods } = useStockora();
  const [receiveModalPO, setReceiveModalPO] = useState(null);
  const [invoiceNo, setInvoiceNo] = useState('');

  const handleReceiveGoods = (e) => {
    e.preventDefault();
    if (!receiveModalPO) return;
    receivePurchaseGoods(receiveModalPO.id, invoiceNo);
    setReceiveModalPO(null);
    setInvoiceNo('');
  };

  const columns = [
    {
      header: 'PO Number',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-[#3157D5]">
          {row.id}
        </span>
      ),
    },
    {
      header: 'Supplier Principal',
      accessor: 'supplierName',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-semibold text-slate-800 dark:text-slate-100">
          {row.supplierName}
        </span>
      ),
    },
    {
      header: 'Order Date',
      accessor: 'orderDate',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-400">{row.orderDate}</span>,
    },
    {
      header: 'Items Count',
      accessor: 'id',
      cell: (row) => (
        <span className="text-xs text-slate-600">
          {row.items?.length || 0} line items
        </span>
      ),
    },
    {
      header: 'Grand Total',
      accessor: 'grandTotal',
      sortable: true,
      cell: (row) => (
        <span className="text-xs font-bold text-slate-900 dark:text-white">
          {formatINR(row.grandTotal)}
        </span>
      ),
    },
    {
      header: 'Depot Warehouse',
      accessor: 'warehouse',
      cell: (row) => <span className="text-xs text-slate-500">{row.warehouse}</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          {row.status !== 'Received' && (
            <button
              onClick={() => {
                setReceiveModalPO(row);
                setInvoiceNo(`INV-${row.supplierName.slice(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 rounded-lg transition-colors border border-emerald-200 dark:border-emerald-800"
            >
              <Boxes className="w-3.5 h-3.5" />
              <span>Receive Goods</span>
            </button>
          )}
          {row.status === 'Received' && (
            <span className="text-[11px] font-medium text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Stocked
            </span>
          )}
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Purchase Orders (Procurement)
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage purchase orders issued to manufacturer depots and track incoming consignments.
            </p>
          </div>

          <Link
            href="/admin/purchase-orders/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Purchase Order</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={purchaseOrders}
          searchKey="supplierName"
          searchPlaceholder="Search PO by supplier or number..."
          filterOptions={[
            { label: 'All Orders', value: 'All' },
            { label: 'Sent', value: 'Sent' },
            { label: 'Received', value: 'Received' },
          ]}
          emptyTitle="No purchase orders"
        />

        {/* Goods Receiving Modal */}
        <Modal
          isOpen={!!receiveModalPO}
          onClose={() => setReceiveModalPO(null)}
          title={`Receive Goods (GRN) — ${receiveModalPO?.id}`}
          subtitle="Confirm inward delivery of physical goods to update inventory stock and supplier payable ledger."
        >
          {receiveModalPO && (
            <form onSubmit={handleReceiveGoods} className="space-y-4">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-xl space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Supplier:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{receiveModalPO.supplierName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Warehouse Depot:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{receiveModalPO.warehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">PO Grand Total:</span>
                  <span className="font-bold text-[#3157D5]">{formatINR(receiveModalPO.grandTotal)}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Supplier Delivery Bill / Invoice No. *
                </label>
                <input
                  type="text"
                  required
                  value={invoiceNo}
                  onChange={(e) => setInvoiceNo(e.target.value)}
                  placeholder="e.g. BFMCG-INV-9921"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 block">
                  Items to be Inward Stocked:
                </span>
                <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-40 overflow-y-auto">
                  {receiveModalPO.items?.map((it, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{it.name}</span>
                      <span className="font-bold text-emerald-600">+{it.qty} Units</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setReceiveModalPO(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white dark:bg-slate-800 border border-slate-200 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Confirm Inward &amp; Update Stock
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
