'use client';

import React, { useState } from 'react';
import { Navigation, Truck, User, CheckCircle2, Clock } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import Modal from '@/components/admin/Modal';
import { useStockora } from '@/context/StockoraContext';

export default function DeliveriesPage() {
  const { deliveries, drivers, vehicles, updateDeliveryStatus } = useStockora();
  const [activeModalDelivery, setActiveModalDelivery] = useState(null);
  const [newStatus, setNewStatus] = useState('Delivered');

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!activeModalDelivery) return;
    updateDeliveryStatus(activeModalDelivery.id, newStatus);
    setActiveModalDelivery(null);
  };

  const columns = [
    {
      header: 'Delivery ID',
      accessor: 'id',
      sortable: true,
      cell: (row) => <span className="font-bold text-[#3157D5]">{row.id}</span>,
    },
    {
      header: 'Sales Order Ref',
      accessor: 'orderId',
      cell: (row) => <span className="text-xs font-mono text-slate-500">{row.orderId}</span>,
    },
    {
      header: 'Customer Destination',
      accessor: 'customerName',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="text-xs font-bold text-slate-900 dark:text-white block">{row.customerName}</span>
          <span className="text-[11px] text-slate-400 truncate max-w-xs block">{row.address}</span>
        </div>
      ),
    },
    {
      header: 'Assigned Driver',
      accessor: 'driverName',
      cell: (row) => (
        <div>
          <span className="text-xs font-medium text-slate-800 dark:text-slate-200 block">{row.driverName}</span>
          <span className="text-[10px] text-slate-400">{row.driverPhone}</span>
        </div>
      ),
    },
    {
      header: 'Transport Vehicle',
      accessor: 'vehicleNumber',
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.vehicleNumber}</span>,
    },
    {
      header: 'Total Units',
      accessor: 'itemsCount',
      cell: (row) => <span className="text-xs font-semibold">{row.itemsCount} units</span>,
    },
    {
      header: 'Target Date',
      accessor: 'expectedDate',
      cell: (row) => <span className="text-xs text-slate-400">{row.expectedDate}</span>,
    },
    {
      header: 'Dispatch Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Action',
      accessor: 'id',
      cellClassName: 'text-right',
      cell: (row) => (
        <button
          onClick={() => {
            setActiveModalDelivery(row);
            setNewStatus(row.status);
          }}
          className="px-2.5 py-1 text-[11px] font-semibold text-[#3157D5] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition-colors"
        >
          Update Stage
        </button>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Delivery Logistics &amp; Dispatch Fleet
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Packing verification, route delivery challans, driver assignment, and handover confirmation.
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={deliveries}
          searchKey="customerName"
          searchPlaceholder="Search delivery by customer or ID..."
          emptyTitle="No deliveries currently active"
        />

        <Modal
          isOpen={!!activeModalDelivery}
          onClose={() => setActiveModalDelivery(null)}
          title={`Update Delivery Stage — ${activeModalDelivery?.id}`}
          subtitle={`Customer: ${activeModalDelivery?.customerName}`}
        >
          {activeModalDelivery && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Select Dispatch Stage
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border rounded-xl"
                >
                  <option value="Packed">Packed (Ready at Warehouse Dock)</option>
                  <option value="Dispatched">Dispatched (Vehicle Loaded)</option>
                  <option value="Out for Delivery">Out for Delivery (On Route)</option>
                  <option value="Delivered">Delivered (Handover Signed)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveModalDelivery(null)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 bg-white border rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl"
                >
                  Update Stage
                </button>
              </div>
            </form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  );
}
