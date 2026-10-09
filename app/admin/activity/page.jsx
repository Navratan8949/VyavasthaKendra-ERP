'use client';

import React from 'react';
import { History, ShieldCheck, Clock, User } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useStockora } from '@/context/StockoraContext';

export default function ActivityLogPage() {
  const { activityLogs } = useStockora();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            System Activity &amp; Audit Trail
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-evident audit timeline recording product edits, payments, stock movements, and invoices.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
            {activityLogs.map((log) => (
              <div key={log.id} className="relative flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-[#3157D5]/10 border-2 border-white dark:border-slate-900 flex items-center justify-center text-[#3157D5] shrink-0 z-10">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 text-xs">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      {log.user}
                    </span>
                    <span className="text-[11px] text-slate-400">{log.timestamp}</span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-medium">
                    {log.action}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
