'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQS = [
  {
    q: 'Can we import our existing customer list, products, and opening stock from Excel or Tally?',
    a: 'Yes. VyavasthaKendra includes 1-click CSV/Excel import templates for opening stock, warehouse locations, customer master lists with credit limits, and supplier catalogues. Migration typically takes less than 30 minutes.',
  },
  {
    q: 'How does automated FEFO (First-Expired, First-Out) work during sales picking?',
    a: 'When an order is created, VyavasthaKendra automatically reserves inventory from the batch closest to its expiration date. Warehouse staff see the exact lot number and bin location on their picking manifest, virtually eliminating accidental dispatch of newer stock while older inventory languishes.',
  },
  {
    q: 'Can our route salesmen and van drivers use VyavasthaKendra on mobile devices or tablets?',
    a: 'VyavasthaKendra is fully responsive and optimized for mobile, tablet, and touch screens. Van salesmen can book spot orders, check outstanding customer balance, generate digital receipts, and collect payments directly from their phones.',
  },
  {
    q: 'What hardware is supported for barcode scanning and invoice printing?',
    a: 'VyavasthaKendra works with standard USB and Bluetooth 1D/2D barcode scanners without requiring proprietary drivers. For billing, it outputs standard A4 tax invoices as well as 3-inch (80mm) thermal roll slips for quick counter and van receipts.',
  },
  {
    q: 'How does the customer credit limit and overdue payment control work?',
    a: 'Each retail customer can be assigned a custom credit ceiling (e.g. ₹2,00,000) and payment terms (e.g. Net 15 days). If an invoice remains unpaid past the grace period or if a new order breaches their credit limit, the system alerts the salesman and requires admin override to dispatch.',
  },
  {
    q: 'Does VyavasthaKendra support inter-warehouse transfers and transit tracking?',
    a: 'Yes. VyavasthaKendra provides a dedicated Inter-Warehouse Stock Transfer module. When goods leave Central Hub for Regional Godown, the inventory status switches to "In Transit" until the receiving godown manager inspects and acknowledges the transfer note.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 md:py-32 bg-white dark:bg-slate-950 text-slate-900 dark:text-white border-t border-slate-200 dark:border-slate-800 relative overflow-hidden transition-colors">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Everything You Need to Know About VyavasthaKendra.
          </h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-400">
            Common questions about deploying VyavasthaKendra across your godowns, van routes, and accounting ledgers.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900/90 rounded-xl sm:rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs dark:shadow-md transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 focus:outline-none"
                >
                  <span className="font-extrabold text-xs sm:text-base text-slate-900 dark:text-white leading-snug">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800 pt-3 sm:pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
