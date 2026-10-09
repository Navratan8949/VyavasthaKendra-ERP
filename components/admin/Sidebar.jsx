"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  FileText,
  RotateCcw,
  Users,
  ShoppingBag,
  Truck,
  Package,
  Layers,
  Award,
  Boxes,
  ArrowLeftRight,
  Warehouse,
  ArrowRightLeft,
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Banknote,
  Briefcase,
  Navigation,
  Car,
  Receipt,
  TrendingUp,
  BarChart3,
  PieChart,
  Settings,
  User,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  HelpCircle,
} from "lucide-react";
import { useStockora } from "@/context/StockoraContext";
import { cn } from "@/lib/utils";

export default function Sidebar() {
  const pathname = usePathname();
  const {
    user,
    logout,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useStockora();

  // Role visibility checks
  const role = user?.role || "Super Admin";
  const isSuperOrManager = role === "Super Admin" || role === "Manager";
  const isAccountant = role === "Accountant";
  const isWarehouseMgr = role === "Warehouse Manager";
  const isSalesman = role === "Salesman";

  const sections = [
    {
      label: "OVERVIEW",
      visible: true,
      items: [{ label: "Dashboard", href: "/admin", icon: LayoutDashboard }],
    },
    {
      label: "SALES",
      visible: isSuperOrManager || isSalesman || isAccountant,
      items: [
        {
          label: "Sales Orders",
          href: "/admin/sales-orders",
          icon: ShoppingCart,
        },
        { label: "Invoices", href: "/admin/invoices", icon: FileText },
        {
          label: "Sales Returns",
          href: "/admin/sales-returns",
          icon: RotateCcw,
          hideFor: isSalesman,
        },
        { label: "Customers", href: "/admin/customers", icon: Users },
      ].filter((i) => !i.hideFor),
    },
    {
      label: "PURCHASES",
      visible: isSuperOrManager || isAccountant,
      items: [
        {
          label: "Purchase Orders",
          href: "/admin/purchase-orders",
          icon: ShoppingBag,
        },
        { label: "Purchases (GRN)", href: "/admin/purchases", icon: Boxes },
        {
          label: "Purchase Returns",
          href: "/admin/purchase-returns",
          icon: RotateCcw,
        },
        { label: "Suppliers", href: "/admin/suppliers", icon: Truck },
      ],
    },
    {
      label: "INVENTORY",
      visible: isSuperOrManager || isWarehouseMgr,
      items: [
        { label: "Products", href: "/admin/products", icon: Package },
        { label: "Categories", href: "/admin/categories", icon: Layers },
        { label: "Brands", href: "/admin/brands", icon: Award },
        { label: "Stock Overview", href: "/admin/inventory", icon: Boxes },
        {
          label: "Stock Movement",
          href: "/admin/inventory/movement",
          icon: ArrowLeftRight,
        },
        { label: "Warehouses", href: "/admin/warehouses", icon: Warehouse },
        {
          label: "Stock Transfer",
          href: "/admin/inventory/transfer",
          icon: ArrowRightLeft,
        },
      ],
    },
    {
      label: "PAYMENTS",
      visible: isSuperOrManager || isAccountant,
      items: [
        {
          label: "Receivables",
          href: "/admin/receivables",
          icon: ArrowDownLeft,
        },
        { label: "Payables", href: "/admin/payables", icon: ArrowUpRight },
        {
          label: "Customer Payments",
          href: "/admin/customer-payments",
          icon: CreditCard,
        },
        {
          label: "Supplier Payments",
          href: "/admin/supplier-payments",
          icon: Banknote,
        },
      ],
    },
    {
      label: "OPERATIONS",
      visible: isSuperOrManager || isWarehouseMgr || isSalesman,
      items: [
        {
          label: "Salesmen",
          href: "/admin/salesmen",
          icon: Briefcase,
          hideFor: isWarehouseMgr,
        },
        { label: "Deliveries", href: "/admin/deliveries", icon: Navigation },
        {
          label: "Drivers",
          href: "/admin/drivers",
          icon: User,
          hideFor: isSalesman,
        },
        {
          label: "Vehicles",
          href: "/admin/vehicles",
          icon: Car,
          hideFor: isSalesman,
        },
        {
          label: "Expenses",
          href: "/admin/expenses",
          icon: Receipt,
          hideFor: isSalesman || isWarehouseMgr,
        },
      ].filter((i) => !i.hideFor),
    },
    {
      label: "ANALYTICS & REPORTS",
      visible: isSuperOrManager || isAccountant,
      items: [
        {
          label: "Sales Reports",
          href: "/admin/reports/sales",
          icon: BarChart3,
        },
        {
          label: "Purchase Reports",
          href: "/admin/reports/purchases",
          icon: TrendingUp,
        },
        {
          label: "Inventory Reports",
          href: "/admin/reports/inventory",
          icon: Boxes,
        },
        {
          label: "Profitability",
          href: "/admin/profitability",
          icon: PieChart,
        },
        {
          label: "Financial Reports",
          href: "/admin/reports/financial",
          icon: Receipt,
        },
      ],
    },
    {
      label: "SETTINGS",
      visible: isSuperOrManager,
      items: [
        { label: "Store Settings", href: "/admin/settings", icon: Settings },
        { label: "Activity Log", href: "/admin/activity", icon: History },
        { label: "Admin Profile", href: "/admin/profile", icon: User },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200/90 dark:border-slate-800 transition-all duration-300 flex flex-col justify-between",
          isSidebarCollapsed ? "w-[72px]" : "w-64",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand Header */}
        <div
          className={cn(
            "h-16 border-b border-slate-100 dark:border-slate-800 flex items-center transition-all relative",
            isSidebarCollapsed ? "justify-center px-2" : "justify-between px-4",
          )}
        >
          {isSidebarCollapsed ? (
            <>
              <Link
                href="/admin"
                className="flex items-center justify-center p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                title="VyavasthaKendra Dashboard"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shadow-xs border border-slate-200/80 dark:border-slate-700/60 group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="VyavasthaKendra"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
              </Link>

              {/* Edge Floating Toggle Button for expand */}
              <button
                onClick={() => setIsSidebarCollapsed(false)}
                className="hidden lg:flex absolute -right-3 top-5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md items-center justify-center text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-white transition-all z-50 hover:scale-110 cursor-pointer"
                title="Expand sidebar"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <>
              <Link
                href="/admin"
                className="flex items-center gap-2.5 overflow-hidden group"
              >
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 p-1 flex items-center justify-center shrink-0 border border-slate-200/80 dark:border-slate-700/60 shadow-xs group-hover:scale-105 transition-transform">
                  <Image
                    src="/logo.png"
                    alt="VyavasthaKendra"
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-sm tracking-tight text-slate-900 dark:text-white">
                      VyavasthaKendra
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-[#3157D5]/10 text-[#3157D5] dark:text-blue-400 uppercase tracking-wider">
                      OS
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium block">
                    Wholesale ERP
                  </span>
                </div>
              </Link>

              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setIsSidebarCollapsed(true)}
                className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Collapse sidebar"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        {/* Navigation Items (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 scrollbar-thin">
          {sections
            .filter((sec) => sec.visible)
            .map((section) => (
              <div key={section.label} className="space-y-1">
                {!isSidebarCollapsed && (
                  <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {section.label}
                  </div>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        title={isSidebarCollapsed ? item.label : undefined}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all group relative",
                          isActive
                            ? "bg-[#3157D5] text-white shadow-xs font-semibold"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60",
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4 shrink-0 transition-transform group-hover:scale-105",
                            isActive
                              ? "text-white"
                              : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white",
                          )}
                        />
                        {!isSidebarCollapsed && (
                          <span className="truncate">{item.label}</span>
                        )}
                        {/* Active Indicator dot when collapsed */}
                        {isSidebarCollapsed && isActive && (
                          <span className="absolute right-1 w-1.5 h-1.5 bg-white rounded-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Bottom Sidebar Info & Logout */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          {/* Subtle Demo Mode Badge */}
          {!isSidebarCollapsed ? (
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl mb-2 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 font-medium truncate">
                <Shield className="w-3.5 h-3.5 text-[#3157D5] shrink-0" />
                <span className="truncate">{user.role}</span>
              </div>
              <span className="text-[9px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-400 px-1.5 py-0.5 rounded uppercase">
                Demo
              </span>
            </div>
          ) : (
            <div className="flex justify-center mb-2">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500"
                title="System Live"
              />
            </div>
          )}

          <button
            onClick={logout}
            title={isSidebarCollapsed ? "Logout" : undefined}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors",
              isSidebarCollapsed ? "justify-center" : "",
            )}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
