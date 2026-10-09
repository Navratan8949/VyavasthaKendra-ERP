'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  ShoppingBag,
  ArrowDownLeft,
  ArrowUpRight,
  Package,
  AlertTriangle,
  Plus,
  ArrowRightLeft,
  CreditCard,
  UserPlus,
  CheckCircle2,
  ChevronRight,
  Clock,
  Warehouse,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import StatCard from '@/components/admin/StatCard';
import StatusBadge from '@/components/admin/StatusBadge';
import { useStockora } from '@/context/StockoraContext';
import { formatINR } from '@/lib/utils';

export default function DashboardPage() {
  const router = useRouter();
  const {
    user,
    salesOrders,
    purchases,
    products,
    customers,
    suppliers,
    totalReceivables,
    totalPayables,
    totalInventoryValue,
    lowStockProducts,
  } = useStockora();

  const [revenueRange, setRevenueRange] = useState('30 Days');

  // Revenue overview chart dataset
  const revenueChartData = [
    { date: 'Oct 01', revenue: 78500, orders: 38 },
    { date: 'Oct 02', revenue: 92400, orders: 44 },
    { date: 'Oct 03', revenue: 64100, orders: 31 },
    { date: 'Oct 04', revenue: 86900, orders: 42 },
    { date: 'Oct 05', revenue: 104500, orders: 51 },
    { date: 'Oct 06', revenue: 91200, orders: 45 },
    { date: 'Oct 07', revenue: 118400, orders: 58 },
    { date: 'Oct 08', revenue: 125600, orders: 62 },
    { date: 'Oct 09', revenue: 142650, orders: 68 },
  ];

  // Sales vs Purchase dataset
  const salesVsPurchaseData = [
    { day: 'Mon', sales: 420000, purchase: 210000 },
    { day: 'Tue', sales: 380000, purchase: 195000 },
    { day: 'Wed', sales: 490000, purchase: 320000 },
    { day: 'Thu', sales: 460000, purchase: 180000 },
    { day: 'Fri', sales: 520000, purchase: 240000 },
    { day: 'Sat', sales: 482650, purchase: 235400 },
  ];

  // Sales by Category Donut dataset
  const categoryData = [
    { name: 'Grocery & Staples', value: 42, color: '#3157D5' },
    { name: 'Beverages', value: 24, color: '#2563EB' },
    { name: 'Personal Care', value: 16, color: '#0EA5E9' },
    { name: 'Packaged Food', value: 12, color: '#6366F1' },
    { name: 'Home & Cleaning', value: 6, color: '#8B5CF6' },
  ];

  // Top Performing Products
  const topProducts = [
    { name: 'Aashirvaad Shudh Chakki Atta 5kg', units: 1240, revenue: 316200, margin: '15.8%', stock: 12 },
    { name: 'Fortune Sunlite Sunflower Oil 5L', units: 480, revenue: 1286400, margin: '14.0%', stock: 8 },
    { name: 'Tata Salt Vacuum Evaporated 1kg', units: 950, revenue: 532000, margin: '16.6%', stock: 15 },
    { name: 'Parle-G 800g Super Saver', units: 1100, revenue: 1584000, margin: '14.2%', stock: 180 },
    { name: 'Coca-Cola PET 750ml Case', units: 640, revenue: 582400, margin: '19.7%', stock: 240 },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Top Greeting & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Good morning, {user.name || 'Admin'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Here&apos;s what&apos;s happening with your distribution business today in Jaipur.
            </p>
          </div>

          {/* Quick Actions Dropdown / Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/admin/sales-orders/new"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] rounded-xl shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Sales Order</span>
            </Link>

            <Link
              href="/admin/purchase-orders/new"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#3157D5]" />
              <span>New Purchase</span>
            </Link>

            <Link
              href="/admin/customer-payments"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              <span>Receive Payment</span>
            </Link>

            <Link
              href="/admin/inventory/transfer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-2xs"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-amber-600" />
              <span>Transfer Stock</span>
            </Link>
          </div>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard
            title="Today's Sales"
            value="₹4,82,650"
            comparison="+18.6%"
            isPositive={true}
            icon={ShoppingCart}
            iconColor="text-blue-600"
            iconBg="bg-blue-50 dark:bg-blue-950/60"
            sparklineData={[30, 45, 52, 60, 58, 75, 88]}
          />
          <StatCard
            title="Today's Purchases"
            value="₹2,35,400"
            comparison="+12.4%"
            isPositive={true}
            icon={ShoppingBag}
            iconColor="text-purple-600"
            iconBg="bg-purple-50 dark:bg-purple-950/60"
            sparklineData={[25, 40, 35, 50, 48, 65, 70]}
          />
          <StatCard
            title="Receivables"
            value={formatINR(totalReceivables)}
            comparison="-4.2%"
            isPositive={true}
            icon={ArrowDownLeft}
            iconColor="text-emerald-600"
            iconBg="bg-emerald-50 dark:bg-emerald-950/60"
            sparklineData={[80, 75, 70, 68, 62, 59, 55]}
          />
          <StatCard
            title="Payables"
            value={formatINR(totalPayables)}
            comparison="+2.8%"
            isPositive={false}
            icon={ArrowUpRight}
            iconColor="text-amber-600"
            iconBg="bg-amber-50 dark:bg-amber-950/60"
            sparklineData={[40, 45, 50, 55, 58, 62, 65]}
          />
          <StatCard
            title="Inventory Value"
            value={formatINR(totalInventoryValue)}
            comparison="+8.1%"
            isPositive={true}
            icon={Package}
            iconColor="text-indigo-600"
            iconBg="bg-indigo-50 dark:bg-indigo-950/60"
            sparklineData={[50, 55, 60, 68, 70, 75, 82]}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockProducts.length.toString()}
            comparison="+3 items"
            isPositive={false}
            icon={AlertTriangle}
            iconColor="text-rose-600"
            iconBg="bg-rose-50 dark:bg-rose-950/60"
            sparklineData={[10, 12, 14, 15, 16, 17, 18]}
          />
        </div>

        {/* Charts Row: Revenue Trend (Left) & Sales vs Purchase (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Overview (2 Cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Revenue Overview
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Daily dispatched billing totals &amp; fulfilled order volume
                </p>
              </div>

              {/* Range Selector */}
              <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
                {['Today', '7 Days', '30 Days', '3 Months', '6 Months', '1 Year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setRevenueRange(range)}
                    className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                      revenueRange === range
                        ? 'bg-white dark:bg-slate-900 text-[#3157D5] shadow-xs'
                        : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3157D5" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3157D5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: '#94A3B8' }}
                    tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val, name) => [
                      name === 'revenue' ? `₹${Number(val).toLocaleString('en-IN')}` : val,
                      name === 'revenue' ? 'Revenue' : 'Orders',
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3157D5"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#revenueGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales vs Purchase Bar Chart (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sales vs Purchases
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Weekly outflow vs inflow ratio
              </p>
            </div>

            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesVsPurchaseData} margin={{ top: 10, right: 0, left: -15, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: '#94A3B8' }}
                    tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '12px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val) => `₹${(Number(val) / 100000).toFixed(2)} Lakh`}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Bar dataKey="sales" name="Sales" fill="#3157D5" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="purchase" name="Purchase" fill="#93C5FD" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span>Avg Daily Margin: <strong className="text-emerald-600">48.2%</strong></span>
              <Link href="/admin/profitability" className="text-[#3157D5] hover:underline font-semibold">
                View P&amp;L →
              </Link>
            </div>
          </div>
        </div>

        {/* Donut Chart + Low Stock + Outstanding Payments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales by Category Donut */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Sales by Category
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Current month revenue distribution
              </p>
            </div>

            <div className="h-52 w-full my-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1E293B',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                    formatter={(val) => `${val}% share`}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
              {categoryData.map((cat) => (
                <div key={cat.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className="text-slate-600 dark:text-slate-300 truncate max-w-[150px]">
                      {cat.name}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {cat.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Low Stock Items Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> Low Stock Alerts
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Items below safety minimum threshold
                </p>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                {lowStockProducts.length} items
              </span>
            </div>

            <div className="space-y-2.5 my-2 flex-1 overflow-y-auto max-h-56">
              {lowStockProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/60 rounded-xl flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {p.name}
                    </p>
                    <p className="text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                      Only <strong className="text-rose-600 font-black">{p.currentStock} {p.unit}</strong> left (Min: {p.minStock})
                    </p>
                  </div>
                  <Link
                    href="/admin/purchase-orders/new"
                    className="shrink-0 text-[11px] font-semibold text-white bg-[#3157D5] hover:bg-[#2444AE] px-2.5 py-1 rounded-lg transition-colors"
                  >
                    Create PO
                  </Link>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link
                href="/admin/inventory"
                className="w-full inline-flex items-center justify-center gap-1 text-xs font-semibold text-[#3157D5] hover:underline"
              >
                <span>View Full Inventory Dashboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Outstanding Payments Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Outstanding Balances
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Receivables due vs Supplier Payables
              </p>
            </div>

            <div className="space-y-3 my-3">
              {/* Receivables summary */}
              <div className="p-3.5 bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/70 dark:border-emerald-800/60 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-emerald-800 dark:text-emerald-300">
                    Customer Receivables
                  </span>
                  <Link href="/admin/receivables" className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                    Manage →
                  </Link>
                </div>
                <div className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                  {formatINR(totalReceivables)}
                </div>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                  Overdue from 4 major wholesale accounts
                </p>
              </div>

              {/* Payables summary */}
              <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/60 rounded-xl">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-amber-800 dark:text-amber-300">
                    Supplier Payables
                  </span>
                  <Link href="/admin/payables" className="text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline">
                    Manage →
                  </Link>
                </div>
                <div className="text-xl font-bold text-amber-900 dark:text-amber-100">
                  {formatINR(totalPayables)}
                </div>
                <p className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">
                  3 payments due in next 7 days
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <Link href="/admin/customer-payments" className="text-[#3157D5] font-semibold hover:underline">
                Collect Payment
              </Link>
              <Link href="/admin/supplier-payments" className="text-slate-600 dark:text-slate-400 font-semibold hover:underline">
                Pay Supplier
              </Link>
            </div>
          </div>
        </div>

        {/* Top Products & Recent Sales Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Products Table (1 Col) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Top Fast-Moving SKUs
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Best performing FMCG products
                </p>
              </div>
              <Link
                href="/admin/products"
                className="text-xs font-semibold text-[#3157D5] hover:underline"
              >
                All Products
              </Link>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {topProducts.map((tp, idx) => (
                <div key={tp.name} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {idx + 1}. {tp.name}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {tp.units.toLocaleString()} units sold • Margin {tp.margin}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      ₹{tp.revenue.toLocaleString('en-IN')}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      Stock: {tp.stock}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Sales Orders Table (2 Cols) */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Recent Sales Dispatches
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Latest wholesale buyer orders and delivery statuses
                </p>
              </div>
              <Link
                href="/admin/sales-orders"
                className="text-xs font-semibold text-[#3157D5] hover:underline"
              >
                View All Orders
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="pb-3">Order ID</th>
                    <th className="pb-3">Customer</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Payment</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {salesOrders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 font-semibold text-[#3157D5]">
                        <Link href={`/admin/invoices/${order.invoiceId || 'INV-2026-1098'}`} className="hover:underline">
                          {order.id}
                        </Link>
                      </td>
                      <td className="py-3">
                        <p className="font-semibold text-slate-800 dark:text-slate-100 truncate max-w-[160px]">
                          {order.customerName}
                        </p>
                        <span className="text-[10px] text-slate-400">
                          {order.orderDate}
                        </span>
                      </td>
                      <td className="py-3 font-bold text-slate-900 dark:text-white">
                        ₹{order.grandTotal.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3">
                        <StatusBadge status={order.paymentStatus} />
                      </td>
                      <td className="py-3">
                        <StatusBadge status={order.orderStatus} />
                      </td>
                      <td className="py-3 text-right">
                        <Link
                          href={`/admin/invoices/${order.invoiceId || 'INV-2026-1098'}`}
                          className="px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        >
                          Invoice
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
