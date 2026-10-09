'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Modal from './Modal';

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  danger = true,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="max-w-md">
      <div className="flex flex-col items-center text-center p-2">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
            danger
              ? 'bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400'
              : 'bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
          }`}
        >
          <AlertTriangle className="w-6 h-6 stroke-[2]" />
        </div>
        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {title}
        </h4>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
          {message}
        </p>

        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all shadow-sm ${
              danger
                ? 'bg-rose-600 hover:bg-rose-700'
                : 'bg-[#3157D5] hover:bg-[#2444AE]'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
