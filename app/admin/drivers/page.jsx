'use client';

import React from 'react';
import { User, Phone, Car, Plus } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';

export default function DriversPage() {
  const { drivers } = useStockora();

  const columns = [
    {
      header: 'Driver Name',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.name}</span>
          <span className="text-[11px] text-slate-400">License: {row.licenseNumber}</span>
        </div>
      ),
    },
    {
      header: 'Phone Contact',
      accessor: 'phone',
      cell: (row) => <span className="text-xs text-slate-600 dark:text-slate-300">{row.phone}</span>,
    },
    {
      header: 'Assigned Vehicle',
      accessor: 'vehicle',
      cell: (row) => (
        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300">
          {row.vehicle}
        </span>
      ),
    },
    {
      header: 'Active Deliveries',
      accessor: 'assignedDeliveries',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold">{row.assignedDeliveries} trips today</span>,
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
              Distribution Drivers &amp; Logistics Crew
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Commercial driving licenses, vehicle pairings, and live route assignments.
            </p>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={drivers}
          searchKey="name"
          searchPlaceholder="Search driver by name or vehicle..."
          emptyTitle="No drivers found"
        />
      </div>
    </AdminLayout>
  );
}
