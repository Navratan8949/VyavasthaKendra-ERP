'use client';

import React from 'react';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rameshwar Singhania',
      role: 'Managing Director',
      company: 'Singhania FMCG Super-Stockist (Jaipur & Ajmer)',
      quote:
        'Before VyavasthaKendra, we were writing off ₹3-4 Lakhs every quarter in expired biscuits and dairy products. The FEFO batch tracking alone saved our business more than 5x the cost of the software in our first 90 days.',
      metrics: '78% Reduction in Expiry Waste',
      brands: 'Distributes Britannia, Parle, ITC, Fortune',
    },
    {
      name: 'Rajesh Kulkarni',
      role: 'Head of Operations & Fleet',
      company: 'Sahyadri Beverage & Staples Hub (Pune)',
      quote:
        'Generating van route manifests and dispatch sheets used to take our supervisors 2.5 hours every morning. With VyavasthaKendra, morning dispatch is done in 20 minutes flat. Driver route tracking is rock solid.',
      metrics: '2.5 hrs saved daily in dispatch',
      brands: 'Distributes Fortune, Tata Consumer, Amul',
    },
    {
      name: 'Pradeep Gupta',
      role: 'Chief Executive Officer',
      company: 'Gupta Wholesale Trading Co. (Indore Mandi)',
      quote:
        'The credit limit radar is a lifesaver. Our field salesmen can no longer book ₹50,000 orders for retailers who haven’t cleared their 15-day overdue balance. Our working capital has never been healthier.',
      metrics: '19-day reduction in DSO',
      brands: 'Distributes Nestlé, Cadbury, Dabur, Haldiram\'s',
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white relative overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Proven In Indian Godowns</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
            Trusted by the Titans of FMCG Distribution.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400">
            Real super-stockists running high-throughput warehouses, hundreds of van routes, and crores in monthly turnover.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-950/80 rounded-3xl p-7 sm:p-8 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 flex flex-col justify-between shadow-lg dark:shadow-xl transition-all relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300 dark:text-slate-700 group-hover:text-slate-400 dark:group-hover:text-slate-500 transition-colors" />
                </div>
                
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200 dark:border-slate-800/80">
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-bold mb-3 font-mono">
                  {t.metrics}
                </div>
                <div className="font-extrabold text-slate-900 dark:text-white text-base">
                  {t.name}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {t.role} • {t.company}
                </div>
                <div className="text-[11px] text-blue-600 dark:text-blue-400 font-semibold mt-2">
                  {t.brands}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
