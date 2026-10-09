'use client';

import React from 'react';
import Link from 'next/link';
import { Warehouse, Phone, Mail, MapPin, Boxes, ArrowRightLeft } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function WarehousesPage() {
  const { warehouses, products } = useStockora();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Warehouse &amp; Depot Network
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Multi-location fulfillment centres in Jaipur and Ajmer regional territories.
            </p>
          </div>

          <Link
            href="/admin/inventory/transfer"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Transfer Between Warehouses</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {warehouses.map((wh) => {
            const whProducts = products.filter((p) => p.warehouse === wh.name);
            const totalUnits = whProducts.reduce((sum, p) => sum + p.currentStock, 0);
            const totalValuation = whProducts.reduce((sum, p) => sum + (p.currentStock * p.purchasePrice), 0);

            return (
              <div
                key={wh.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#3157D5] flex items-center justify-center">
                      <Warehouse className="w-5 h-5" />
                    </div>
                    <StatusBadge status={wh.status} />
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {wh.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400 block mt-0.5">
                    Depot Code: {wh.code}
                  </span>

                  <div className="mt-4 space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-700 dark:text-slate-200">Manager:</span>
                      <span>{wh.manager}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{wh.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{wh.address}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Total Stocked SKUs:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{whProducts.length} Products</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Inventory Units:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{totalUnits.toLocaleString()} units</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Stock Valuation:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">{formatINR(totalValuation)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}
