'use client';

import React from 'react';
import { useStockora } from '@/context/StockoraContext';
import { RotateCcw } from 'lucide-react';
import Modal from './Modal';

export default function ResetDemoModal({ isOpen, onClose }) {
  const { resetDemoData } = useStockora();

  const handleReset = () => {
    resetDemoData();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-2">
        <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4">
          <RotateCcw className="w-6 h-6 stroke-[2]" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Reset Demo Data?
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          This will restore the original demo products, inventory levels, invoices, customers, and mock transactions from Shree Ganesh Distribution (Jaipur).
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl transition-all shadow-sm"
          >
            Reset Demo
          </button>
        </div>
      </div>
    </Modal>
  );
}
