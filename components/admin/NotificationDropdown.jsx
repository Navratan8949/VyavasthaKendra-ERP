'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Bell, Check, AlertTriangle, AlertCircle, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { useStockora } from '@/context/StockoraContext';
import { cn } from '@/lib/utils';

export default function NotificationDropdown() {
  const { notifications } = useStockora();
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState(() => new Set());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const items = notifications.map((n) => ({
    ...n,
    read: n.read || readIds.has(n.id),
  }));

  const unreadCount = items.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setReadIds(new Set(notifications.map((item) => item.id)));
  };

  const markAsRead = (id) => {
    setReadIds((prev) => new Set([...prev, id]));
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Notifications
              </span>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                  {unreadCount} new
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-[11px] font-medium text-[#3157D5] hover:underline flex items-center gap-1"
              >
                <Check className="w-3 h-3" /> Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
            {items.length > 0 ? (
              items.map((item) => {
                return (
                  <Link
                    key={item.id}
                    href={item.link || '#'}
                    onClick={() => {
                      markAsRead(item.id);
                      setIsOpen(false);
                    }}
                    className={cn(
                      'p-3.5 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors block',
                      !item.read ? 'bg-[#3157D5]/5 dark:bg-[#3157D5]/10' : ''
                    )}
                  >
                    <div className="shrink-0 mt-0.5">
                      {item.type === 'danger' && (
                        <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4" />
                        </div>
                      )}
                      {item.type === 'warning' && (
                        <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4" />
                        </div>
                      )}
                      {item.type === 'success' && (
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                      )}
                      {item.type === 'info' && (
                        <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                          <ShoppingCart className="w-4 h-4" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                          {item.title}
                        </p>
                        <span className="text-[10px] text-slate-400 shrink-0">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                        {item.message}
                      </p>
                    </div>

                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#3157D5] shrink-0 mt-1.5" />
                    )}
                  </Link>
                );
              })
            ) : (
              <div className="p-8 text-center text-xs text-slate-400">
                No active notifications
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
