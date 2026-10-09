import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatINR(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "₹0";
  const num = Math.round(Number(amount));
  return "₹" + num.toLocaleString("en-IN");
}

export function formatNumber(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return "0";
  return Number(amount).toLocaleString("en-IN");
}

export function formatDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}
