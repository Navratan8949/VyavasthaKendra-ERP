import React from 'react';
import Link from 'next/link';
import { ArrowLeft, PackageOpen } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#F6F7FB] dark:bg-slate-950 flex items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-[#3157D5]/10 text-[#3157D5] flex items-center justify-center mx-auto mb-4">
          <PackageOpen className="w-7 h-7" />
        </div>
        <span className="text-4xl font-black text-slate-900 dark:text-white block mb-1">
          404
        </span>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          This page doesn&apos;t exist
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
          The ERP module or document you are trying to access has moved or is not registered in the system index.
        </p>
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </Link>
      </div>
    </div>
  );
}
