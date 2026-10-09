'use client';

import React from 'react';
import { useStockora } from '@/context/StockoraContext';
import { ShieldCheck, UserCheck, Calculator, Warehouse, Briefcase } from 'lucide-react';
import Modal from './Modal';
import { cn } from '@/lib/utils';

export default function RoleSwitcherModal({ isOpen, onClose }) {
  const { user, switchRole } = useStockora();

  const roles = [
    {
      name: 'Super Admin',
      icon: ShieldCheck,
      description: 'Unrestricted access to all modules, financial metrics, and company settings.',
      color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 dark:text-indigo-400',
    },
    {
      name: 'Manager',
      icon: UserCheck,
      description: 'Full business operational access across sales, purchases, and analytics.',
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-400',
    },
    {
      name: 'Accountant',
      icon: Calculator,
      description: 'Dedicated focus on Billing, Invoices, Customer & Supplier Payments, Receivables & Payables.',
      color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400',
    },
    {
      name: 'Warehouse Manager',
      icon: Warehouse,
      description: 'Inventory control, stock transfers, goods receipts, and delivery dispatching.',
      color: 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400',
    },
    {
      name: 'Salesman',
      icon: Briefcase,
      description: 'Customer ordering, field visits, sales orders entry, and personal target dashboard.',
      color: 'text-purple-600 bg-purple-50 dark:bg-purple-950/60 dark:text-purple-400',
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Role Simulation (Demo Mode)"
      subtitle="Select a role to dynamically preview access permissions and role-tailored sidebar visibility."
      maxWidth="max-w-lg"
    >
      <div className="space-y-2.5">
        {roles.map((r) => {
          const Icon = r.icon;
          const isSelected = user.role === r.name;

          return (
            <button
              key={r.name}
              type="button"
              onClick={() => {
                switchRole(r.name);
                onClose();
              }}
              className={cn(
                'w-full flex items-start gap-3.5 p-3.5 rounded-xl border text-left transition-all',
                isSelected
                  ? 'border-[#3157D5] bg-[#3157D5]/5 dark:bg-[#3157D5]/10 ring-2 ring-[#3157D5]/20'
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
              )}
            >
              <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5', r.color)}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {r.name}
                  </h4>
                  {isSelected && (
                    <span className="text-[10px] font-semibold text-[#3157D5] bg-[#3157D5]/10 px-2 py-0.5 rounded-full">
                      Active Role
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                  {r.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Modal>
  );
}
