'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useStockora } from '@/context/StockoraContext';
import Sidebar from './Sidebar';
import Header from './Header';
import GlobalSearch from './GlobalSearch';
import Toast from './Toast';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }) {
  const { user, isSidebarCollapsed } = useStockora();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not authenticated and not on login page, redirect
    if (user && !user.isAuthenticated && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, pathname, router]);

  // If login page, don't show admin chrome
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#F6F7FB] dark:bg-slate-950 text-[#171A21] dark:text-slate-100 transition-colors">
      <Sidebar />
      <div
        className={cn(
          'flex flex-col min-h-screen transition-all duration-300',
          isSidebarCollapsed ? 'lg:pl-[72px]' : 'lg:pl-64'
        )}
      >
        <Header />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          {children}
        </main>
      </div>

      <GlobalSearch />
      <Toast />
    </div>
  );
}
