'use client';

import React from 'react';
import { Car, User, Navigation } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';

export default function VehiclesPage() {
  const { vehicles } = useStockora();

  const columns = [
    {
      header: 'Vehicle Number',
      accessor: 'vehicleNumber',
      sortable: true,
      cell: (row) => (
        <span className="font-mono font-bold text-slate-900 dark:text-white">
          {row.vehicleNumber}
        </span>
      ),
    },
    {
      header: 'Model / Type',
      accessor: 'type',
      sortable: true,
      cell: (row) => <span className="text-xs font-medium text-slate-800 dark:text-slate-200">{row.type}</span>,
    },
    {
      header: 'Primary Driver',
      accessor: 'driver',
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.driver}</span>,
    },
    {
      header: 'Payload Capacity',
      accessor: 'capacity',
      cell: (row) => <span className="text-xs font-semibold">{row.capacity}</span>,
    },
    {
      header: 'Trips Completed',
      accessor: 'totalDeliveries',
      sortable: true,
      cell: (row) => <span className="text-xs">{row.totalDeliveries} trips</span>,
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Distribution Fleet Vehicles
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Delivery mini-trucks, vans, payload capacity, and road fitness records.
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={vehicles}
          searchKey="vehicleNumber"
          searchPlaceholder="Search vehicle by registration..."
          emptyTitle="No vehicles found"
        />
      </div>
    </AdminLayout>
  );
}
