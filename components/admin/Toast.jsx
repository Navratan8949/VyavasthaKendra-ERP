'use client';

import React from 'react';
import { useStockora } from '@/context/StockoraContext';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Toast() {
  const { toasts, removeToast } = useStockora();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5',
              isSuccess && 'bg-white/95 dark:bg-slate-900/95 border-emerald-300/80 dark:border-emerald-800 text-slate-800 dark:text-slate-100',
              isError && 'bg-white/95 dark:bg-slate-900/95 border-rose-300/80 dark:border-rose-800 text-slate-800 dark:text-slate-100',
              isWarning && 'bg-white/95 dark:bg-slate-900/95 border-amber-300/80 dark:border-amber-800 text-slate-800 dark:text-slate-100',
              !isSuccess && !isError && !isWarning && 'bg-white/95 dark:bg-slate-900/95 border-blue-300/80 dark:border-blue-800 text-slate-800 dark:text-slate-100'
            )}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isError && <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {!isSuccess && !isError && !isWarning && <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
            </div>

            <div className="flex-1 text-xs font-medium leading-relaxed">
              {toast.message}
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
