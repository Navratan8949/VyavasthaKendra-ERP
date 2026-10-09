'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StatCard({
  title,
  value,
  comparison,
  isPositive = true,
  icon: Icon,
  iconColor = 'text-[#3157D5]',
  iconBg = 'bg-[#3157D5]/10',
  className,
  sparklineData = [35, 45, 40, 55, 50, 70, 65, 85],
}) {
  const points = sparklineData
    .map((v, i) => `${(i / (sparklineData.length - 1)) * 90},${40 - (v / 100) * 35}`)
    .join(' ');

  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1.5">
            {value}
          </h3>
        </div>
        {Icon && (
          <div
            className={cn(
              'w-11 h-11 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105',
              iconBg
            )}
          >
            <Icon className={cn('w-5 h-5', iconColor)} />
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {comparison ? (
          <div className="flex items-center gap-1.5 text-xs font-medium">
            <span
              className={cn(
                'inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-semibold',
                isPositive
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'
              )}
            >
              {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {comparison}
            </span>
            <span className="text-slate-400 dark:text-slate-500 text-[11px]">vs last period</span>
          </div>
        ) : (
          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">Real-time sync</span>
        )}

        {/* Mini SVG Sparkline */}
        <div className="w-20 h-6">
          <svg viewBox="0 0 90 40" className="w-full h-full overflow-visible">
            <polyline
              fill="none"
              stroke={isPositive ? '#16A34A' : '#DC2626'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
