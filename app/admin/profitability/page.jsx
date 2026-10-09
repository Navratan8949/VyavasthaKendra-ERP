'use client';

import React from 'react';
import {
  TrendingUp,
  DollarSign,
  PieChart,
  Percent,
  Receipt,
  Scale,
} from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function ProfitabilityPage() {
  const { products, salesOrders, expenses } = useStockora();

  // Financial figures
  const totalSalesRevenue = salesOrders.reduce((sum, so) => sum + so.grandTotal, 0);
  const estimatedCostOfGoods = Math.round(totalSalesRevenue * 0.78);
  const grossProfit = totalSalesRevenue - estimatedCostOfGoods;
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = grossProfit - totalExpenses;
  const grossMarginPct = ((grossProfit / totalSalesRevenue) * 100).toFixed(1);
  const netMarginPct = ((netProfit / totalSalesRevenue) * 100).toFixed(1);

  // Product profitability breakdown
  const productProfitability = products.map((p) => {
    const cost = p.purchasePrice;
    const revenue = p.sellingPrice;
    const profit = revenue - cost;
    const margin = ((profit / revenue) * 100).toFixed(1);
    return {
      id: p.id,
      name: p.name,
      category: p.category,
      brand: p.brand,
      purchaseCost: cost,
      sellingPrice: revenue,
      grossProfit: profit,
      margin: margin,
    };
  });

  const columns = [
    {
      header: 'Product SKU',
      accessor: 'name',
      sortable: true,
      cell: (row) => (
        <div>
          <span className="font-bold text-slate-900 dark:text-white block">{row.name}</span>
          <span className="text-[11px] text-slate-400">{row.brand} • {row.category}</span>
        </div>
      ),
    },
    {
      header: 'Procurement Cost',
      accessor: 'purchaseCost',
      sortable: true,
      cell: (row) => <span className="text-xs text-slate-500">{formatINR(row.purchaseCost)}</span>,
    },
    {
      header: 'Wholesale Price',
      accessor: 'sellingPrice',
      sortable: true,
      cell: (row) => <span className="text-xs font-semibold">{formatINR(row.sellingPrice)}</span>,
    },
    {
      header: 'Unit Gross Profit',
      accessor: 'grossProfit',
      sortable: true,
      cell: (row) => <span className="text-xs font-bold text-emerald-600">+{formatINR(row.grossProfit)}</span>,
    },
    {
      header: 'Margin %',
      accessor: 'margin',
      sortable: true,
      cell: (row) => (
        <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
          {row.margin}%
        </span>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Profitability &amp; Commercial Margins (P&amp;L)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time Gross Profit Margin, Net Operating Income, and product-line yield analytics.
          </p>
        </div>

        {/* Financial KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Sales Revenue
            </span>
            <span className="text-xl font-bold text-slate-900 dark:text-white mt-1 block">
              {formatINR(totalSalesRevenue)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider block">
              Cost of Goods (COGS)
            </span>
            <span className="text-xl font-bold text-slate-600 mt-1 block">
              {formatINR(estimatedCostOfGoods)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-emerald-600 uppercase tracking-wider block">
              Gross Profit
            </span>
            <span className="text-xl font-bold text-emerald-600 mt-1 block">
              {formatINR(grossProfit)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-rose-600 uppercase tracking-wider block">
              Overhead Expenses
            </span>
            <span className="text-xl font-bold text-rose-600 mt-1 block">
              {formatINR(totalExpenses)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-blue-600 uppercase tracking-wider block">
              Net Profit
            </span>
            <span className="text-xl font-bold text-[#3157D5] mt-1 block">
              {formatINR(netProfit)}
            </span>
          </div>

          <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800">
            <span className="text-[11px] font-medium text-purple-600 uppercase tracking-wider block">
              Gross Margin %
            </span>
            <span className="text-xl font-bold text-purple-600 mt-1 block">
              {grossMarginPct}%
            </span>
          </div>
        </div>

        {/* Product Profitability Table */}
        <DataTable
          columns={columns}
          data={productProfitability}
          searchKey="name"
          searchPlaceholder="Search product margin..."
          emptyTitle="No product profitability data"
        />
      </div>
    </AdminLayout>
  );
}
