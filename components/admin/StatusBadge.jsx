'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function StatusBadge({ status, className }) {
  if (!status) return null;

  const s = String(status).toLowerCase();

  // Green / Success: Paid, Delivered, In Stock, Approved, Active, Completed, Received, Available
  if (['paid', 'delivered', 'in stock', 'approved', 'active', 'completed', 'received', 'available'].includes(s)) {
    return (
      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        {status}
      </span>
    );
  }

  // Orange / Warning: Pending, Low Stock, Due Soon, Partially Paid, Partially Received, Draft
  if (['pending', 'low stock', 'due soon', 'partially paid', 'partially received', 'sent', 'packed'].includes(s)) {
    return (
      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200/80 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
        {status}
      </span>
    );
  }

  // Red / Danger: Overdue, Cancelled, Out of Stock, Inactive
  if (['overdue', 'cancelled', 'out of stock', 'inactive'].includes(s)) {
    return (
      <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-700 border border-rose-200/80 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800', className)}>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
        {status}
      </span>
    );
  }

  // Blue / Info: Processing, Shipped, Confirmed, Dispatched, Out for Delivery, In Transit, On Duty
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/80 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800', className)}>
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
      {status}
    </span>
  );
}
