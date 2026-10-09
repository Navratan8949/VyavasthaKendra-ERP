'use client';

import React from 'react';
import { PackageOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EmptyState({
  icon: Icon = PackageOpen,
  title = 'No records found',
  description = 'There is currently no data available for this view.',
  action = null,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 max-w-sm mx-auto',
        className
      )}
    >
      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 mb-3.5">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>
      <h4 className="text-base font-semibold text-slate-800 dark:text-slate-100 mb-1">
        {title}
      </h4>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-5 leading-relaxed">
        {description}
      </p>
      {action}
    </div>
  );
}
