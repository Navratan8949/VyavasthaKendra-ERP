"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { useStockora } from "@/context/StockoraContext";
import {
  Boxes,
  Warehouse,
  ArrowRight,
  Truck,
  Printer,
  RotateCcw,
  AlertTriangle,
  Zap,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

const FMCG_BRANDS = [
  "Parle Products",
  "Britannia Industries",
  "ITC Sunfeast & Aashirvaad",
  "Fortune (Adani Wilmar)",
  "Amul Dairy",
  "Tata Consumer Products",
  "Haldiram's Snacks",
  "Nestlé India",
  "Dabur India",
  "MDH Spices",
  "Marico Saffola",
  "Godrej Consumer",
];

export default function HeroSection() {
  const { products, warehouses, customers, salesOrders, totalInventoryValue } =
    useStockora();

  const [activeTab, setActiveTab] = useState("twin");
  const [fefoSimulated, setFefoSimulated] = useState(false);
  const [thermalPrinted, setThermalPrinted] = useState(false);
  const [creditAlertTriggered, setCreditAlertTriggered] = useState(false);

  return (
    <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden bg-gradient-to-b from-blue-50/50 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-white transition-colors duration-200">
      {/* Smooth Ambient Light Accents (NO grid lines, NO row-column patterns) */}
      {/* <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-emerald-500/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-600/5 blur-3xl pointer-events-none rounded-full" />
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-600/5 blur-3xl pointer-events-none rounded-full" /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-xs font-semibold mb-6 backdrop-blur-md"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-slate-800 dark:text-slate-200 font-medium">
              🇮🇳 भारत का सबसे भरोसेमंद FMCG Wholesale ERP
            </span>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
              v2.4 Live
            </span>
          </motion.div>

          {/* Main Hero Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-slate-900 dark:text-white"
          >
            गोदाम से काउंटर तक,{" "}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 dark:from-blue-400 dark:via-indigo-300 dark:to-emerald-400">
              हर बैच, हर बिल्टी, हर रुपये
            </span>{" "}
            का लाइव हिसाब।
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal max-w-3xl mx-auto"
          >
            The high-throughput ERP operating system engineered specifically for
            FMCG Distributors, Super-Stockists & Godown Hubs. Stop expiry loss
            with automated FEFO batch allocation, dispatch route vans with
            thermal receipts, and lock bad debts with strict retailer credit
            radar.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4"
          >
            <Link
              href="/admin"
              className="px-7 py-4 rounded-xl text-sm sm:text-base font-bold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-blue-600/30 active:scale-95 transition-all inline-flex items-center gap-2.5 group border border-blue-400/30"
            >
              <span>Launch Live ERP Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>

            <a
              href="#simulator"
              className="px-6 py-4 rounded-xl text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 shadow-sm transition-all inline-flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Try Live Order Sandbox</span>
            </a>
          </motion.div>

          {/* Quick Demo Credential Pill */}
          <div className="mt-4 text-[12px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>
              Super Admin preloaded • No password or sign-up needed • Live Data
            </span>
          </div>
        </div>

        {/* Real FMCG Brands Marquee */}
        <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800/80">
          <p className="text-center text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-4">
            Powers Super-Stockists & Depots Distributing Leading FMCG Brands
          </p>
          <div className="relative overflow-hidden w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="animate-marquee gap-8 py-2">
              {[...FMCG_BRANDS, ...FMCG_BRANDS].map((brand, idx) => (
                <div
                  key={idx}
                  className="px-4 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-xs whitespace-nowrap flex items-center gap-2 shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Live ERP Command Center */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-12 lg:mt-16"
        >
          <div className="mx-auto max-w-5xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
            {/* Window Header */}
            <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="ml-2 text-xs font-mono font-semibold text-slate-600 dark:text-slate-400">
                  vyavasthakendra.app/live-command-center
                </span>
              </div>

              {/* Interactive Tabs inside Mockup */}
              <div className="flex items-center gap-1 bg-slate-200/90 dark:bg-slate-900 p-1 rounded-xl border border-slate-300 dark:border-slate-800 overflow-x-auto max-w-full">
                <button
                  onClick={() => setActiveTab("twin")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "twin"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Warehouse className="w-3.5 h-3.5 text-amber-300" />
                  <span>Live Godown Twin</span>
                </button>
                <button
                  onClick={() => setActiveTab("fefo")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "fefo"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Boxes className="w-3.5 h-3.5" />
                  <span>FEFO Expiry Shield</span>
                </button>
                <button
                  onClick={() => setActiveTab("van")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "van"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Van Route Dispatch</span>
                </button>
                <button
                  onClick={() => setActiveTab("credit")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "credit"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <ShieldAlert className="w-3.5 h-3.5" />
                  <span>Credit Radar</span>
                </button>
                <button
                  onClick={() => setActiveTab("invoice")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === "invoice"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Thermal GST Slip</span>
                </button>
              </div>
            </div>

            {/* Mockup Dynamic Content */}
            <div className="bg-slate-50 dark:bg-slate-900/90">
              {/* TAB 0: Live Godown Twin (Real High-Res Warehouse Photography) */}
              {activeTab === "twin" && (
                <div className="relative w-full h-[460px] sm:h-[500px] overflow-hidden group animate-in fade-in duration-300">
                  {/* High Definition Crystal Clear Warehouse Photo */}
                  <Image
                    src="/hero-warehouse.jpg"
                    alt="VyavasthaKendra FMCG Warehouse Hub and Automated Distribution Center"
                    fill
                    priority
                    className="object-cover object-center scale-100 group-hover:scale-[1.02] transition-transform duration-700"
                  />

                  {/* Subtle edge vignette for UI contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

                  {/* Top Live Bar */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/80 border border-slate-700/80 backdrop-blur-md text-xs font-semibold shadow-lg">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>
                        LIVE GODOWN DIGITAL TWIN • JAIPUR CENTRAL HUB (BAY 23)
                      </span>
                    </div>
                    <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-950/80 border border-blue-500/40 backdrop-blur-md text-xs text-blue-300 font-semibold shadow-lg">
                      <span>Automated FEFO Picking Active</span>
                    </div>
                  </div>

                  {/* Floating Holographic Telemetry Cards placed on Warehouse Areas */}
                  {/* 1. Pallet Racks HUD Pin (Right) */}
                  <div className="absolute top-20 right-4 sm:right-8 max-w-[270px] bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3.5 text-white shadow-2xl backdrop-blur-md z-10">
                    <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-1">
                      <span>Aisle 41 • Bay 23 (FMCG)</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        FEFO LOCK
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Lot #PARLE-2026-B1 (18 Days Left). System locked for first
                      dispatch, preventing expiry loss.
                    </p>
                  </div>

                  {/* 2. Dispatch Floor HUD Pin (Bottom Left) */}
                  <div className="absolute bottom-20 left-4 sm:left-8 max-w-[270px] bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3.5 text-white shadow-2xl backdrop-blur-md z-10">
                    <div className="flex items-center justify-between text-xs font-bold text-emerald-400 mb-1">
                      <span>Dispatch Lane 02</span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        VAN RJ-14
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      142 Cases loaded for 28 retail drops. Spot billing & route
                      collection: ₹3,84,500.
                    </p>
                  </div>

                  {/* Bottom Live Metrics Bar inside Image */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-slate-950/90 border border-slate-800/90 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs text-white z-10">
                    <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Live Inventory Value
                        </span>
                        <span className="text-sm font-black text-emerald-400 font-mono">
                          ₹1,42,80,000
                        </span>
                      </div>
                      <div className="hidden sm:block border-l border-slate-800 pl-4">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Monitored Lots
                        </span>
                        <span className="text-sm font-bold text-white font-mono">
                          84 Active Batches
                        </span>
                      </div>
                      <div className="hidden md:block border-l border-slate-800 pl-4">
                        <span className="text-[10px] text-slate-400 block font-medium">
                          Fleet in Transit
                        </span>
                        <span className="text-sm font-bold text-blue-400 font-mono">
                          3 Vans Dispatched
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveTab("fefo")}
                        className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md"
                      >
                        <span>Simulate FEFO Order</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 1: FEFO Expiry Radar */}
              {activeTab === "fefo" && (
                <div className="p-5 sm:p-7 space-y-5 animate-in fade-in duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                          FEFO AUTOMATION ENGINE
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Jaipur Central Godown
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        Zero Expiry Waste: Nearest-to-expire lots auto-allocated
                        first
                      </h3>
                    </div>
                    <button
                      onClick={() => setFefoSimulated(!fefoSimulated)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all inline-flex items-center gap-2 self-start sm:self-auto shrink-0 shadow-sm"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>
                        {fefoSimulated
                          ? "Reset Allocation"
                          : "Simulate Sales Picking"}
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    {/* Batch 1: Expiring Soonest */}
                    <div
                      className={`p-4 rounded-2xl border transition-all ${
                        fefoSimulated
                          ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-400 dark:border-emerald-500/50 shadow-md"
                          : "bg-white dark:bg-slate-950/80 border-slate-200 dark:border-slate-800 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                          Lot #PARLE-2026-B1
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                          18 Days Left
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        Parle-G Glucose 250g (Carton)
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Bin: A-12 • Stock: 140 Cases
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">
                          FEFO Rank:
                        </span>
                        <span
                          className={`font-bold ${fefoSimulated ? "text-emerald-600 dark:text-emerald-400 font-mono" : "text-amber-600 dark:text-amber-400"}`}
                        >
                          {fefoSimulated
                            ? "✔ PICKED FOR ORDER"
                            : "#1 Highest Priority"}
                        </span>
                      </div>
                    </div>

                    {/* Batch 2: Medium Expiry */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                          Lot #FORT-2026-F9
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-500/30">
                          94 Days Left
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        Fortune Kachi Ghani Oil 1L
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Bin: C-04 • Stock: 220 Cartons
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">
                          FEFO Rank:
                        </span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          #2 In Queue
                        </span>
                      </div>
                    </div>

                    {/* Batch 3: Fresh Stock */}
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 shadow-xs">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold">
                          Lot #TATA-2026-T2
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                          240 Days Left
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                        Tata Salt 1kg Pouch
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Bin: E-02 • Stock: 450 Bags
                      </p>
                      <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400">
                          FEFO Rank:
                        </span>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">
                          #3 Reserved (Fresh)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-xl flex items-center justify-between text-xs text-blue-900 dark:text-blue-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <span>
                        Distributor Saved: ₹3,40,000 in expired returns last
                        quarter using automated FEFO locks.
                      </span>
                    </div>
                    <Link
                      href="/admin/inventory"
                      className="text-blue-600 dark:text-blue-400 hover:underline font-bold text-[11px]"
                    >
                      View Full Inventory Batches →
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 2: Van Route Dispatch */}
              {activeTab === "van" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="bg-white dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30">
                          VAN SALES TELEMETRY
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Route: Tonk Road & Malviya Nagar
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        Vehicle RJ-14-GA-9021 • Driver: Ramesh Singh
                      </h3>
                    </div>
                    <div className="sm:text-right">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        Today&apos;s Route Collection
                      </span>
                      <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        ₹3,84,500
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Drop Points Completed
                      </span>
                      <div className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                        22 / 28 Shops
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full w-[78%]" />
                      </div>
                    </div>
                    <div className="p-3.5 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Van Stock Value
                      </span>
                      <div className="mt-1 text-xl font-black text-slate-900 dark:text-white">
                        ₹5,20,000
                      </div>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        142 Cases Dispatched
                      </span>
                    </div>
                    <div className="p-3.5 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                        Spot Cash + UPI
                      </span>
                      <div className="mt-1 text-xl font-black text-emerald-600 dark:text-emerald-400">
                        ₹2,10,000 Collected
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">
                        ₹1,74,500 On Credit (Signed)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3.5 bg-white dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
                        POS
                      </div>
                      <div>
                        <span className="font-bold text-slate-900 dark:text-white block">
                          Spot Billing Ready (Bluetooth 80mm Printer)
                        </span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">
                          Van salesman can generate GST tax slip directly on
                          mobile
                        </span>
                      </div>
                    </div>
                    <Link
                      href="/admin/deliveries"
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xs"
                    >
                      Inspect Fleet Dispatch
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 3: Retailer Credit Radar */}
              {activeTab === "credit" && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="bg-white dark:bg-slate-950/70 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-500/30">
                          B2B CREDIT RISK ENGINE
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          Retailer Master Check
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        Sharma General Store (Bapu Nagar) • GSTIN:
                        08AALPS9021K1Z2
                      </h3>
                    </div>
                    <button
                      onClick={() =>
                        setCreditAlertTriggered(!creditAlertTriggered)
                      }
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-500 text-white transition-all inline-flex items-center gap-2 self-start sm:self-auto shadow-sm"
                    >
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>
                        {creditAlertTriggered
                          ? "Clear Simulation"
                          : "Simulate Order Exceeding Limit"}
                      </span>
                    </button>
                  </div>

                  <div className="p-4 bg-white dark:bg-slate-950/90 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        Assigned Credit Limit:
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        ₹4,00,000 (Net 15 Days)
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="text-slate-500 dark:text-slate-400">
                          Current Outstanding:
                        </span>
                        <span
                          className={`font-bold ${creditAlertTriggered ? "text-rose-600 dark:text-rose-400" : "text-amber-600 dark:text-amber-400"}`}
                        >
                          {creditAlertTriggered
                            ? "₹4,45,000 (111% BREACH)"
                            : "₹3,20,000 (80% Utilized)"}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            creditAlertTriggered
                              ? "bg-rose-500 w-[100%]"
                              : "bg-amber-500 w-[80%]"
                          }`}
                        />
                      </div>
                    </div>

                    {creditAlertTriggered && (
                      <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 rounded-xl flex items-center gap-2.5 text-xs text-rose-800 dark:text-rose-200">
                        <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                        <span>
                          <strong>Dispatch Blocked!</strong> Order #SO-2026-99
                          breaches credit limit by ₹45,000. Super Admin approval
                          required before godown picking.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Average DSO (Days Sales Outstanding): 12.4 Days</span>
                    <Link
                      href="/admin/receivables"
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline"
                    >
                      Open Receivables Aging Report →
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 4: Thermal GST Slip */}
              {activeTab === "invoice" && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
                    <div className="space-y-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30">
                        INSTANT GST BILLING
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                        Standard A4 Invoices & 3-Inch Counter Slips
                      </h3>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        Automatic CGST/SGST calculation, HSN code summary, QR
                        code for UPI payments, and 1-click WhatsApp PDF sharing
                        directly to retail shopkeeper.
                      </p>

                      <div className="pt-2 flex items-center gap-3">
                        <button
                          onClick={() => setThermalPrinted(!thermalPrinted)}
                          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>
                            {thermalPrinted
                              ? "Hide Thermal Slip"
                              : "Generate Thermal Receipt Preview"}
                          </span>
                        </button>
                        <Link
                          href="/admin/invoices"
                          className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:underline"
                        >
                          View Invoices Dashboard →
                        </Link>
                      </div>
                    </div>

                    {/* Thermal Receipt Visual Preview */}
                    <div className="bg-white text-slate-900 p-5 rounded-2xl shadow-xl font-mono text-[11px] leading-tight border border-slate-300 max-w-sm mx-auto">
                      <div className="text-center pb-2 border-b border-dashed border-slate-400 flex flex-col items-center">
                        <Image
                          src="/logo.png"
                          alt="VyavasthaKendra Logo"
                          width={32}
                          height={32}
                          className="w-8 h-8 object-contain mb-1"
                        />
                        <p className="font-black text-sm uppercase">
                          VYAVASTHAKENDRA DISTRIBUTION
                        </p>
                        <p className="text-[10px] text-slate-600">
                          VKIA Plot 42, Jaipur, Rajasthan
                        </p>
                        <p className="text-[10px] text-slate-600">
                          GSTIN: 08AAGCS9982Q1Z4
                        </p>
                      </div>

                      <div className="py-2 border-b border-dashed border-slate-400 flex justify-between text-[10px]">
                        <span>Bill: INV-2026-1044</span>
                        <span>09-Oct-2026 11:30 AM</span>
                      </div>

                      <div className="py-2 border-b border-dashed border-slate-400 space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>ITEM</span>
                          <span>QTY x RATE</span>
                          <span>NET</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Parle-G 250g (Ctn)</span>
                          <span>10 x ₹720</span>
                          <span>₹7,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fortune Oil 1L (Ctn)</span>
                          <span>15 x ₹1,420</span>
                          <span>₹21,300</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tata Salt 1kg (Bag)</span>
                          <span>20 x ₹550</span>
                          <span>₹11,000</span>
                        </div>
                      </div>

                      <div className="pt-2 space-y-1">
                        <div className="flex justify-between text-[10px]">
                          <span>Subtotal:</span>
                          <span>₹39,500.00</span>
                        </div>
                        <div className="flex justify-between text-[10px]">
                          <span>GST (CGST 2.5% + SGST 2.5%):</span>
                          <span>₹1,975.00</span>
                        </div>
                        <div className="flex justify-between font-black text-xs pt-1 border-t border-slate-400">
                          <span>TOTAL AMOUNT:</span>
                          <span>₹41,475.00</span>
                        </div>
                        <p className="text-center text-[9px] text-slate-500 pt-2 font-sans font-medium">
                          Thank you for your business! E-Way Bill Generated.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
