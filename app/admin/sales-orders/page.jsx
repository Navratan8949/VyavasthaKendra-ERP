'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Plus, Eye, Truck, CheckCircle2 } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function SalesOrdersPage() {
  const router = useRouter();
  const { salesOrders, updateSalesOrderStatus } = useStockora();
  const [statusModalOrder, setStatusModalOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('Delivered');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const handleUpdateStatus = (e) => {
    e.preventDefault();
    if (!statusModalOrder) return;
    updateSalesOrderStatus(statusModalOrder.id, newStatus);
    setStatusModalOrder(null);
  };

  const filteredOrders = salesOrders.filter((o) => {
    if (selectedStatus !== 'All' && o.orderStatus !== selectedStatus) return false;
    return true;
  });

  const columns = [
    {
      header: 'SO Number',
      accessor: 'id',
      sortable: true,
      cell: (row) => (
        <span className="font-bold text-[#3157D5]">
          {row.id}
        </span>
      ),
    },
    {
      header: 'Customer Business',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-100 block">
            {row.customerName}
          </span>
          <span className="text-[11px] text-slate-400">Salesman: {row.salesman}</span>
        </div>
      ),
    },
    {
      header: 'Order Date',
      accessor: 'orderDate',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{row.orderDate}</span>,
    },
    {
      header: 'Line Items',
      accessor: 'itemsCount',
      cell: (row) => <span className="text-xs text-slate-600">{row.items?.length || 0} items</span>,
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
      header: 'Payment Status',
      accessor: 'paymentStatus',
      cell: (row) => <StatusBadge status={row.paymentStatus} />,
    },
    {
      header: 'Fulfillment Status',
      accessor: 'orderStatus',
      sortable: true,
      cell: (row) => <StatusBadge status={row.orderStatus} />,
    },
    {
      header: 'Action',
      accessor: 'action',
      cellClassName: 'text-right',
      cell: (row) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => {
              setStatusModalOrder(row);
              setNewStatus(row.orderStatus);
            }}
            className="px-2.5 py-1 text-[11px] font-semibold text-[#3157D5] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
          >
            Update Status
          </button>
          <Link
            href={`/admin/invoices/${row.invoiceId || 'INV-2026-1098'}`}
            className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Invoice
          </Link>
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
              Wholesale Sales Orders
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sales order dispatch tracking, credit terms, packing stages, and customer invoices.
            </p>
          </div>

          <Link
            href="/admin/sales-orders/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Sales Order</span>
          </Link>
        </div>

        <DataTable
          columns={columns}
          data={filteredOrders}
          searchKey="customerName"
          searchPlaceholder="Search sales order by customer or number..."
          filterOptions={[
            { label: 'All Orders', value: 'All' },
            { label: 'Delivered', value: 'Delivered' },
            { label: 'Dispatched', value: 'Dispatched' },
          ]}
          activeFilter={selectedStatus}
          onFilterChange={setSelectedStatus}
          emptyTitle="No sales orders found"
        />

        {/* Update Status Modal */}
        <Modal
          isOpen={!!statusModalOrder}
          onClose={() => setStatusModalOrder(null)}
          title={`Update Status — ${statusModalOrder?.id}`}
          subtitle={`Current status: ${statusModalOrder?.orderStatus} for ${statusModalOrder?.customerName}`}
        >
          {statusModalOrder && (
            <form onSubmit={handleUpdateStatus} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select New Order Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Processing">Processing</option>
                  <option value="Packed">Packed</option>
                  <option value="Dispatched">Dispatched (Out for Delivery)</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setStatusModalOrder(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs"
                >
                  Save Status
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
