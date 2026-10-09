'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  INITIAL_CATEGORIES,
  INITIAL_BRANDS,
  INITIAL_WAREHOUSES,
  INITIAL_CUSTOMERS,
  INITIAL_SUPPLIERS,
  INITIAL_SALES_ORDERS,
  INITIAL_INVOICES,
  INITIAL_PURCHASE_ORDERS,
  INITIAL_PURCHASES,
  INITIAL_CUSTOMER_PAYMENTS,
  INITIAL_SUPPLIER_PAYMENTS,
  INITIAL_STOCK_MOVEMENTS,
  INITIAL_STOCK_TRANSFERS,
  INITIAL_EXPENSES,
  INITIAL_SALESMEN,
  INITIAL_DELIVERIES,
  INITIAL_DRIVERS,
  INITIAL_VEHICLES,
  INITIAL_SALES_RETURNS,
  INITIAL_PURCHASE_RETURNS,
  INITIAL_ACTIVITY_LOGS,
  INITIAL_SETTINGS,
} from '@/data/initialData';

const VyavasthaKendraContext = createContext(null);
export const StockoraContext = VyavasthaKendraContext;

const STORAGE_KEY = 'vyavasthakendra_erp_v1_data';
const LEGACY_STORAGE_KEY = 'stockora_erp_v1_data';
const AUTH_KEY = 'vyavasthakendra_erp_v1_auth';
const LEGACY_AUTH_KEY = 'stockora_erp_v1_auth';
const THEME_KEY = 'vyavasthakendra_erp_v1_theme';
const LEGACY_THEME_KEY = 'stockora_erp_v1_theme';

function getInitialData(key, fallback) {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed[key] !== undefined) return parsed[key];
      }
    } catch (e) {
      console.error(e);
    }
  }
  return fallback;
}

export function VyavasthaKendraProvider({ children }) {
  // Authentication & Role Simulation
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedAuth = localStorage.getItem(AUTH_KEY) || localStorage.getItem(LEGACY_AUTH_KEY);
        if (savedAuth) return JSON.parse(savedAuth);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      name: 'Super Admin',
      email: 'admin@vyavasthakendra.com',
      role: 'Super Admin',
      phone: '+91 98290 12345',
      avatar: 'A',
      isAuthenticated: true,
    };
  });

  // Theme state
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    }
    return 'light';
  });

  // Business state
  const [products, setProducts] = useState(() => getInitialData('products', INITIAL_PRODUCTS));
  const [categories, setCategories] = useState(() => getInitialData('categories', INITIAL_CATEGORIES));
  const [brands, setBrands] = useState(() => getInitialData('brands', INITIAL_BRANDS));
  const [warehouses, setWarehouses] = useState(() => getInitialData('warehouses', INITIAL_WAREHOUSES));
  const [customers, setCustomers] = useState(() => getInitialData('customers', INITIAL_CUSTOMERS));
  const [suppliers, setSuppliers] = useState(() => getInitialData('suppliers', INITIAL_SUPPLIERS));
  const [salesOrders, setSalesOrders] = useState(() => getInitialData('salesOrders', INITIAL_SALES_ORDERS));
  const [invoices, setInvoices] = useState(() => getInitialData('invoices', INITIAL_INVOICES));
  const [purchaseOrders, setPurchaseOrders] = useState(() => getInitialData('purchaseOrders', INITIAL_PURCHASE_ORDERS));
  const [purchases, setPurchases] = useState(() => getInitialData('purchases', INITIAL_PURCHASES));
  const [customerPayments, setCustomerPayments] = useState(() => getInitialData('customerPayments', INITIAL_CUSTOMER_PAYMENTS));
  const [supplierPayments, setSupplierPayments] = useState(() => getInitialData('supplierPayments', INITIAL_SUPPLIER_PAYMENTS));
  const [stockMovements, setStockMovements] = useState(() => getInitialData('stockMovements', INITIAL_STOCK_MOVEMENTS));
  const [stockTransfers, setStockTransfers] = useState(() => getInitialData('stockTransfers', INITIAL_STOCK_TRANSFERS));
  const [expenses, setExpenses] = useState(() => getInitialData('expenses', INITIAL_EXPENSES));
  const [salesmen, setSalesmen] = useState(() => getInitialData('salesmen', INITIAL_SALESMEN));
  const [deliveries, setDeliveries] = useState(() => getInitialData('deliveries', INITIAL_DELIVERIES));
  const [drivers, setDrivers] = useState(() => getInitialData('drivers', INITIAL_DRIVERS));
  const [vehicles, setVehicles] = useState(() => getInitialData('vehicles', INITIAL_VEHICLES));
  const [salesReturns, setSalesReturns] = useState(() => getInitialData('salesReturns', INITIAL_SALES_RETURNS));
  const [purchaseReturns, setPurchaseReturns] = useState(() => getInitialData('purchaseReturns', INITIAL_PURCHASE_RETURNS));
  const [activityLogs, setActivityLogs] = useState(() => getInitialData('activityLogs', INITIAL_ACTIVITY_LOGS));
  const [settings, setSettings] = useState(() => getInitialData('settings', INITIAL_SETTINGS));

  // UI States
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Save to LocalStorage whenever business data updates
  useEffect(() => {
    try {
      const payload = {
        products,
        categories,
        brands,
        warehouses,
        customers,
        suppliers,
        salesOrders,
        invoices,
        purchaseOrders,
        purchases,
        customerPayments,
        supplierPayments,
        stockMovements,
        stockTransfers,
        expenses,
        salesmen,
        deliveries,
        drivers,
        vehicles,
        salesReturns,
        purchaseReturns,
        activityLogs,
        settings,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [
    products,
    categories,
    brands,
    warehouses,
    customers,
    suppliers,
    salesOrders,
    invoices,
    purchaseOrders,
    purchases,
    customerPayments,
    supplierPayments,
    stockMovements,
    stockTransfers,
    expenses,
    salesmen,
    deliveries,
    drivers,
    vehicles,
    salesReturns,
    purchaseReturns,
    activityLogs,
    settings,
  ]);

  // Handle Theme
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(THEME_KEY, theme);
      const root = document.documentElement;
      if (theme === 'dark') {
        root.classList.add('dark');
        root.style.colorScheme = 'dark';
      } else {
        root.classList.remove('dark');
        root.style.colorScheme = 'light';
      }
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  // Toast Helpers
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Activity logger
  const logActivity = (action) => {
    const now = new Date();
    const timeStr = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) + ', ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newLog = {
      id: 'act-' + Date.now(),
      timestamp: timeStr,
      user: user.name || 'Admin',
      action,
    };
    setActivityLogs((prev) => [newLog, ...prev]);
  };

  // Authentication Handlers
  const login = (email, password) => {
    // Demo login accepts any or admin123
    const newUser = {
      name: 'Admin User',
      email: email || 'admin@vyavasthakendra.com',
      role: 'Super Admin',
      phone: '+91 98290 12345',
      avatar: 'A',
      isAuthenticated: true,
    };
    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    }
    addToast('Signed in successfully as ' + newUser.name);
    return true;
  };

  const logout = () => {
    const defaultUser = {
      name: '',
      email: '',
      role: 'Super Admin',
      phone: '',
      avatar: 'A',
      isAuthenticated: false,
    };
    setUser(defaultUser);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
    }
    addToast('You have been signed out', 'info');
  };

  const switchRole = (newRole) => {
    setUser((prev) => {
      const updated = { ...prev, role: newRole };
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      }
      return updated;
    });
    addToast(`Switched active view role to "${newRole}"`, 'info');
  };

  // Reset Demo Data
  const resetDemoData = () => {
    setProducts(INITIAL_PRODUCTS);
    setCategories(INITIAL_CATEGORIES);
    setBrands(INITIAL_BRANDS);
    setWarehouses(INITIAL_WAREHOUSES);
    setCustomers(INITIAL_CUSTOMERS);
    setSuppliers(INITIAL_SUPPLIERS);
    setSalesOrders(INITIAL_SALES_ORDERS);
    setInvoices(INITIAL_INVOICES);
    setPurchaseOrders(INITIAL_PURCHASE_ORDERS);
    setPurchases(INITIAL_PURCHASES);
    setCustomerPayments(INITIAL_CUSTOMER_PAYMENTS);
    setSupplierPayments(INITIAL_SUPPLIER_PAYMENTS);
    setStockMovements(INITIAL_STOCK_MOVEMENTS);
    setStockTransfers(INITIAL_STOCK_TRANSFERS);
    setExpenses(INITIAL_EXPENSES);
    setSalesmen(INITIAL_SALESMEN);
    setDeliveries(INITIAL_DELIVERIES);
    setDrivers(INITIAL_DRIVERS);
    setVehicles(INITIAL_VEHICLES);
    setSalesReturns(INITIAL_SALES_RETURNS);
    setPurchaseReturns(INITIAL_PURCHASE_RETURNS);
    setActivityLogs(INITIAL_ACTIVITY_LOGS);
    setSettings(INITIAL_SETTINGS);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
    addToast('All demo datasets restored to initial state!', 'success');
  };

  // PRODUCT ACTIONS
  const addProduct = (productData) => {
    const id = 'prd-' + (Date.now().toString().slice(-4));
    const newProduct = {
      ...productData,
      id,
      currentStock: Number(productData.currentStock || productData.openingStock || 0),
      openingStock: Number(productData.openingStock || 0),
      purchasePrice: Number(productData.purchasePrice || 0),
      sellingPrice: Number(productData.sellingPrice || 0),
      mrp: Number(productData.mrp || 0),
      minStock: Number(productData.minStock || 10),
      gstRate: Number(productData.gstRate || 18),
      status: productData.status || 'Active',
    };
    setProducts((prev) => [newProduct, ...prev]);
    logActivity(`Added new product: ${newProduct.name} (${newProduct.sku})`);
    addToast(`Product "${newProduct.name}" created successfully!`);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedFields } : item))
    );
    logActivity(`Updated product details for ID ${id}`);
    addToast('Product updated successfully!');
  };

  const deleteProduct = (id) => {
    const target = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
    logActivity(`Deleted product: ${target?.name || id}`);
    addToast('Product deleted successfully', 'warning');
  };

  const duplicateProduct = (id) => {
    const item = products.find((p) => p.id === id);
    if (!item) return;
    const newId = 'prd-' + (Date.now().toString().slice(-4));
    const duplicate = {
      ...item,
      id: newId,
      name: `${item.name} (Copy)`,
      sku: `${item.sku}-COPY`,
      barcode: `${item.barcode}9`,
    };
    setProducts((prev) => [duplicate, ...prev]);
    logActivity(`Duplicated product: ${item.name}`);
    addToast(`Duplicated product created: ${duplicate.name}`);
  };

  // STOCK TRANSFERS & ADJUSTMENT
  const createStockTransfer = ({ fromWarehouse, toWarehouse, productId, quantity, notes }) => {
    const qty = Number(quantity);
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    if (prod.currentStock < qty) {
      addToast('Insufficient stock available for transfer!', 'error');
      return false;
    }

    const transferId = 'TRF-2026-' + Math.floor(100 + Math.random() * 900);
    const newTransfer = {
      id: transferId,
      date: new Date().toISOString().split('T')[0],
      fromWarehouse,
      toWarehouse,
      productId,
      productName: prod.name,
      quantity: qty,
      unit: prod.unit,
      status: 'Completed',
      notes: notes || 'Direct transfer',
      transferredBy: user.name || 'Admin',
    };

    setStockTransfers((prev) => [newTransfer, ...prev]);

    // Record Stock Movement Out and In
    const timeNow = new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const moveOut = {
      id: 'SM-' + Date.now(),
      date: timeNow,
      productId: prod.id,
      productName: prod.name,
      warehouse: fromWarehouse,
      type: 'Transfer Out',
      quantity: -qty,
      reference: transferId,
      user: user.name || 'Admin',
    };
    const moveIn = {
      id: 'SM-' + (Date.now() + 1),
      date: timeNow,
      productId: prod.id,
      productName: prod.name,
      warehouse: toWarehouse,
      type: 'Transfer In',
      quantity: +qty,
      reference: transferId,
      user: user.name || 'Admin',
    };

    setStockMovements((prev) => [moveIn, moveOut, ...prev]);
    logActivity(`Transferred ${qty} ${prod.unit} of ${prod.name} from ${fromWarehouse} to ${toWarehouse}`);
    addToast(`Stock transfer of ${qty} ${prod.unit} completed successfully!`);
    return true;
  };

  const adjustStock = ({ productId, warehouse, adjustmentType, quantity, reason }) => {
    const qty = Number(quantity);
    const prod = products.find((p) => p.id === productId);
    if (!prod) return;

    const delta = adjustmentType === 'add' ? qty : -qty;
    const newCurrent = Math.max(0, prod.currentStock + delta);

    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, currentStock: newCurrent } : p))
    );

    const timeNow = new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const movement = {
      id: 'SM-' + Date.now(),
      date: timeNow,
      productId: prod.id,
      productName: prod.name,
      warehouse: warehouse || prod.warehouse,
      type: adjustmentType === 'add' ? 'Stock Addition' : 'Damage / Loss',
      quantity: delta,
      reference: reason || 'Manual adjustment',
      user: user.name || 'Admin',
    };
    setStockMovements((prev) => [movement, ...prev]);
    logActivity(`Adjusted stock for ${prod.name}: ${delta > 0 ? '+' : ''}${delta} units (${reason})`);
    addToast(`Stock adjusted successfully. New stock: ${newCurrent}`);
  };

  // SALES ORDER & INVOICING WORKFLOW
  const createSalesOrder = (orderData) => {
    const id = 'SO-2026-' + Math.floor(1050 + Math.random() * 900);
    const invId = 'INV-2026-' + Math.floor(1100 + Math.random() * 900);

    // Validate and deduct stock
    for (const item of orderData.items) {
      const prod = products.find((p) => p.id === item.productId);
      if (prod && prod.currentStock < item.qty) {
        addToast(`Insufficient stock for "${prod.name}" (Available: ${prod.currentStock})`, 'error');
        return null;
      }
    }

    // Deduct stock
    setProducts((prev) =>
      prev.map((prod) => {
        const orderItem = orderData.items.find((i) => i.productId === prod.id);
        if (orderItem) {
          return {
            ...prod,
            currentStock: Math.max(0, prod.currentStock - orderItem.qty),
          };
        }
        return prod;
      })
    );

    const newOrder = {
      id,
      invoiceId: invId,
      customerId: orderData.customerId,
      customerName: orderData.customerName,
      orderDate: orderData.orderDate || new Date().toISOString().split('T')[0],
      expectedDelivery: orderData.expectedDelivery || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      salesman: orderData.salesman || 'Rahul Kumar',
      warehouse: orderData.warehouse || 'Jaipur Main Warehouse',
      items: orderData.items,
      subtotal: Number(orderData.subtotal),
      discount: Number(orderData.discount || 0),
      gstAmount: Number(orderData.gstAmount || 0),
      shippingCharges: Number(orderData.shippingCharges || 0),
      grandTotal: Number(orderData.grandTotal),
      paymentMethod: orderData.paymentMethod || 'Credit',
      paymentStatus: orderData.paymentStatus || 'Unpaid',
      orderStatus: 'Confirmed',
      notes: orderData.notes || '',
    };

    setSalesOrders((prev) => [newOrder, ...prev]);

    // Create corresponding Invoice
    const customer = customers.find((c) => c.id === orderData.customerId);
    const halfGst = Math.round(Number(orderData.gstAmount || 0) / 2);
    const newInvoice = {
      id: invId,
      orderId: id,
      customerId: orderData.customerId,
      customerName: orderData.customerName,
      gstin: customer?.gstin || '08AAGCS1245P1Z4',
      invoiceDate: newOrder.orderDate,
      dueDate: new Date(Date.now() + 86400000 * 15).toISOString().split('T')[0],
      billingAddress: customer?.billingAddress || 'Jaipur, Rajasthan',
      shippingAddress: customer?.shippingAddress || 'Jaipur, Rajasthan',
      subtotal: newOrder.subtotal,
      discount: newOrder.discount,
      cgst: halfGst,
      sgst: halfGst,
      igst: 0,
      grandTotal: newOrder.grandTotal,
      paidAmount: orderData.paymentStatus === 'Paid' ? newOrder.grandTotal : 0,
      balanceDue: orderData.paymentStatus === 'Paid' ? 0 : newOrder.grandTotal,
      status: orderData.paymentStatus === 'Paid' ? 'Paid' : 'Unpaid',
      items: orderData.items.map((it) => ({
        product: it.name,
        hsn: '19053100',
        qty: it.qty,
        rate: it.rate,
        gst: it.gstRate || 18,
        discount: 0,
        amount: it.amount,
      })),
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    // Update customer outstanding & total purchases
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === orderData.customerId) {
          const addedOutstanding = orderData.paymentStatus === 'Paid' ? 0 : newOrder.grandTotal;
          return {
            ...c,
            outstanding: c.outstanding + addedOutstanding,
            totalPurchases: c.totalPurchases + newOrder.grandTotal,
          };
        }
        return c;
      })
    );

    // Create delivery queue entry
    const newDelivery = {
      id: 'DEL-2026-' + Math.floor(410 + Math.random() * 800),
      orderId: id,
      customerName: orderData.customerName,
      driverName: 'Mukesh Gurjar',
      driverPhone: '+91 94140 33991',
      vehicleNumber: 'RJ-14-GB-4512 (Tata Ace)',
      address: customer?.shippingAddress || 'Jaipur',
      itemsCount: orderData.items.reduce((acc, curr) => acc + curr.qty, 0),
      status: 'Packed',
      expectedDate: newOrder.expectedDelivery,
    };
    setDeliveries((prev) => [newDelivery, ...prev]);

    // Log stock movements for each item
    const timeNow = new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const movements = orderData.items.map((item, idx) => ({
      id: 'SM-' + (Date.now() + idx),
      date: timeNow,
      productId: item.productId,
      productName: item.name,
      warehouse: orderData.warehouse || 'Jaipur Main Warehouse',
      type: 'Sales Order',
      quantity: -item.qty,
      reference: id,
      user: user.name || 'Admin',
    }));
    setStockMovements((prev) => [...movements, ...prev]);

    logActivity(`Created Sales Order ${id} for ${orderData.customerName} (₹${newOrder.grandTotal.toLocaleString('en-IN')})`);
    addToast(`Sales Order ${id} created & Invoice ${invId} generated!`);
    return newOrder;
  };

  const updateSalesOrderStatus = (id, newStatus) => {
    setSalesOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, orderStatus: newStatus } : order))
    );
    // Also update delivery status if applicable
    if (newStatus === 'Dispatched') {
      setDeliveries((prev) =>
        prev.map((d) => (d.orderId === id ? { ...d, status: 'Out for Delivery' } : d))
      );
    } else if (newStatus === 'Delivered') {
      setDeliveries((prev) =>
        prev.map((d) => (d.orderId === id ? { ...d, status: 'Delivered' } : d))
      );
    }
    logActivity(`Updated Sales Order ${id} status to ${newStatus}`);
    addToast(`Order ${id} is now ${newStatus}`);
  };

  // CUSTOMER PAYMENTS
  const recordCustomerPayment = ({ customerId, invoiceId, amount, paymentMode, referenceNo, notes }) => {
    const amt = Number(amount);
    const cust = customers.find((c) => c.id === customerId);
    const payId = 'PAY-CUST-' + Math.floor(820 + Math.random() * 800);

    const paymentEntry = {
      id: payId,
      customerId,
      customerName: cust?.businessName || 'Customer',
      invoiceId: invoiceId || 'Multiple',
      amount: amt,
      paymentMode,
      referenceNo: referenceNo || 'CASH-REC-' + Date.now().toString().slice(-4),
      date: new Date().toISOString().split('T')[0],
      notes: notes || '',
    };

    setCustomerPayments((prev) => [paymentEntry, ...prev]);

    // Update customer outstanding
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, outstanding: Math.max(0, c.outstanding - amt) } : c))
    );

    // Update invoice balance if an invoice was specified
    if (invoiceId && invoiceId !== 'Multiple') {
      setInvoices((prev) =>
        prev.map((inv) => {
          if (inv.id === invoiceId) {
            const newPaid = inv.paidAmount + amt;
            const newBalance = Math.max(0, inv.grandTotal - newPaid);
            const status = newBalance === 0 ? 'Paid' : newPaid > 0 ? 'Partially Paid' : 'Unpaid';
            return {
              ...inv,
              paidAmount: newPaid,
              balanceDue: newBalance,
              status,
            };
          }
          return inv;
        })
      );
    }

    logActivity(`Collected payment ₹${amt.toLocaleString('en-IN')} from ${cust?.businessName} (${paymentMode})`);
    addToast(`Payment of ₹${amt.toLocaleString('en-IN')} recorded successfully!`);
    return true;
  };

  // PURCHASE ORDERS & GOODS RECEIVED WORKFLOW
  const createPurchaseOrder = (poData) => {
    const poId = 'PO-2026-' + Math.floor(220 + Math.random() * 800);
    const newPO = {
      id: poId,
      supplierId: poData.supplierId,
      supplierName: poData.supplierName,
      orderDate: poData.orderDate || new Date().toISOString().split('T')[0],
      expectedDate: poData.expectedDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      warehouse: poData.warehouse || 'Jaipur Main Warehouse',
      subtotal: Number(poData.subtotal),
      discount: Number(poData.discount || 0),
      gstAmount: Number(poData.gstAmount || 0),
      grandTotal: Number(poData.grandTotal),
      status: poData.status || 'Sent',
      items: poData.items,
      notes: poData.notes || '',
    };

    setPurchaseOrders((prev) => [newPO, ...prev]);
    logActivity(`Created Purchase Order ${poId} for ${poData.supplierName} (₹${newPO.grandTotal.toLocaleString('en-IN')})`);
    addToast(`Purchase Order ${poId} created successfully!`);
    return newPO;
  };

  const receivePurchaseGoods = (poId, supplierInvoiceNo) => {
    const po = purchaseOrders.find((p) => p.id === poId);
    if (!po) return;

    const purId = 'PUR-2026-' + Math.floor(1010 + Math.random() * 800);
    const newPurchase = {
      id: purId,
      poNumber: po.id,
      supplierId: po.supplierId,
      supplierName: po.supplierName,
      supplierInvoiceNo: supplierInvoiceNo || 'SUP-INV-' + Date.now().toString().slice(-4),
      date: new Date().toISOString().split('T')[0],
      warehouse: po.warehouse,
      subtotal: po.subtotal,
      discount: po.discount,
      gstAmount: po.gstAmount,
      grandTotal: po.grandTotal,
      paidAmount: 0,
      balanceDue: po.grandTotal,
      status: 'Received',
      items: po.items,
    };

    setPurchases((prev) => [newPurchase, ...prev]);

    // Mark PO as Received
    setPurchaseOrders((prev) =>
      prev.map((p) => (p.id === poId ? { ...p, status: 'Received' } : p))
    );

    // Increase stock of items
    setProducts((prev) =>
      prev.map((prod) => {
        const matched = po.items.find((i) => i.productId === prod.id);
        if (matched) {
          return {
            ...prod,
            currentStock: prod.currentStock + matched.qty,
          };
        }
        return prod;
      })
    );

    // Update supplier outstanding & total purchases
    setSuppliers((prev) =>
      prev.map((s) => {
        if (s.id === po.supplierId) {
          return {
            ...s,
            outstanding: s.outstanding + po.grandTotal,
            totalPurchases: s.totalPurchases + po.grandTotal,
            lastPurchaseDate: newPurchase.date,
          };
        }
        return s;
      })
    );

    // Record Stock Movement In
    const timeNow = new Date().toLocaleDateString('en-IN') + ' ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    const movements = po.items.map((item, idx) => ({
      id: 'SM-' + (Date.now() + idx),
      date: timeNow,
      productId: item.productId,
      productName: item.name,
      warehouse: po.warehouse,
      type: 'Purchase',
      quantity: +item.qty,
      reference: purId,
      user: user.name || 'Admin',
    }));
    setStockMovements((prev) => [...movements, ...prev]);

    logActivity(`Received goods for PO ${po.id} from ${po.supplierName} (Total ₹${po.grandTotal.toLocaleString('en-IN')})`);
    addToast(`Goods received! Inventory updated & Supplier payable recorded.`);
  };

  // SUPPLIER PAYMENTS
  const recordSupplierPayment = ({ supplierId, purchaseInvoiceNo, amount, paymentMode, referenceNo, notes }) => {
    const amt = Number(amount);
    const sup = suppliers.find((s) => s.id === supplierId);
    const payId = 'PAY-SUP-' + Math.floor(610 + Math.random() * 800);

    const paymentEntry = {
      id: payId,
      supplierId,
      supplierName: sup?.companyName || 'Supplier',
      purchaseInvoiceNo: purchaseInvoiceNo || 'General Settlement',
      amount: amt,
      paymentMode,
      referenceNo: referenceNo || 'RTGS-' + Date.now().toString().slice(-4),
      date: new Date().toISOString().split('T')[0],
      notes: notes || '',
    };

    setSupplierPayments((prev) => [paymentEntry, ...prev]);

    // Reduce supplier outstanding
    setSuppliers((prev) =>
      prev.map((s) => (s.id === supplierId ? { ...s, outstanding: Math.max(0, s.outstanding - amt) } : s))
    );

    // If purchase invoice matched, update its balance
    if (purchaseInvoiceNo) {
      setPurchases((prev) =>
        prev.map((pur) => {
          if (pur.id === purchaseInvoiceNo || pur.supplierInvoiceNo === purchaseInvoiceNo) {
            const newPaid = pur.paidAmount + amt;
            const newBalance = Math.max(0, pur.grandTotal - newPaid);
            return {
              ...pur,
              paidAmount: newPaid,
              balanceDue: newBalance,
            };
          }
          return pur;
        })
      );
    }

    logActivity(`Issued payment ₹${amt.toLocaleString('en-IN')} to ${sup?.companyName} (${paymentMode})`);
    addToast(`Payment of ₹${amt.toLocaleString('en-IN')} issued to supplier successfully!`);
  };

  // CUSTOMERS & SUPPLIERS CRUD
  const addCustomer = (data) => {
    const newCust = {
      ...data,
      id: 'cust-' + (customers.length + 1),
      creditLimit: Number(data.creditLimit || 200000),
      outstanding: 0,
      totalPurchases: 0,
      status: 'Active',
    };
    setCustomers((prev) => [newCust, ...prev]);
    logActivity(`Added customer: ${newCust.businessName}`);
    addToast(`Customer "${newCust.businessName}" added successfully!`);
    return newCust;
  };

  const updateCustomer = (id, data) => {
    setCustomers((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
    logActivity(`Updated customer ID ${id}`);
    addToast('Customer details updated');
  };

  const addSupplier = (data) => {
    const newSup = {
      ...data,
      id: 'sup-' + (suppliers.length + 1),
      creditLimit: Number(data.creditLimit || 500000),
      outstanding: 0,
      totalPurchases: 0,
      lastPurchaseDate: '-',
      status: 'Active',
    };
    setSuppliers((prev) => [newSup, ...prev]);
    logActivity(`Added supplier: ${newSup.companyName}`);
    addToast(`Supplier "${newSup.companyName}" added successfully!`);
    return newSup;
  };

  const updateSupplier = (id, data) => {
    setSuppliers((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
    logActivity(`Updated supplier ID ${id}`);
    addToast('Supplier details updated');
  };

  // EXPENSES
  const addExpense = (data) => {
    const newExp = {
      id: 'EXP-' + (expenses.length + 107),
      title: data.title,
      category: data.category,
      amount: Number(data.amount),
      date: data.date || new Date().toISOString().split('T')[0],
      paymentMode: data.paymentMode || 'Cash',
      description: data.description || '',
    };
    setExpenses((prev) => [newExp, ...prev]);
    logActivity(`Recorded expense: ${newExp.title} (₹${newExp.amount.toLocaleString('en-IN')})`);
    addToast('Expense recorded successfully');
  };

  // SALES RETURN & PURCHASE RETURN
  const addSalesReturn = (data) => {
    const returnId = 'SR-2026-0' + (salesReturns.length + 5);
    const newSR = {
      id: returnId,
      ...data,
      amount: Number(data.amount),
      quantity: Number(data.quantity),
      date: new Date().toISOString().split('T')[0],
      action: 'Credit Note Issued',
    };
    setSalesReturns((prev) => [newSR, ...prev]);

    // Restore stock
    setProducts((prev) =>
      prev.map((p) => (p.id === data.productId ? { ...p, currentStock: p.currentStock + Number(data.quantity) } : p))
    );

    // Reduce customer outstanding
    setCustomers((prev) =>
      prev.map((c) => (c.id === data.customerId ? { ...c, outstanding: Math.max(0, c.outstanding - Number(data.amount)) } : c))
    );

    logActivity(`Processed Sales Return ${returnId} for ${data.customerName}`);
    addToast('Sales return recorded & stock restored');
  };

  const addPurchaseReturn = (data) => {
    const returnId = 'PR-2026-0' + (purchaseReturns.length + 3);
    const newPR = {
      id: returnId,
      ...data,
      amount: Number(data.amount),
      quantity: Number(data.quantity),
      date: new Date().toISOString().split('T')[0],
      status: 'Processed',
    };
    setPurchaseReturns((prev) => [newPR, ...prev]);

    // Reduce stock
    setProducts((prev) =>
      prev.map((p) => (p.id === data.productId ? { ...p, currentStock: Math.max(0, p.currentStock - Number(data.quantity)) } : p))
    );

    // Reduce supplier outstanding
    setSuppliers((prev) =>
      prev.map((s) => (s.id === data.supplierId ? { ...s, outstanding: Math.max(0, s.outstanding - Number(data.amount)) } : s))
    );

    logActivity(`Processed Purchase Return ${returnId} for ${data.supplierName}`);
    addToast('Purchase return logged & supplier balance adjusted');
  };

  // CATEGORIES & BRANDS CRUD
  const addCategory = (cat) => {
    const newCat = {
      id: 'cat-' + (categories.length + 1),
      ...cat,
      status: 'Active',
    };
    setCategories((prev) => [...prev, newCat]);
    addToast(`Category "${newCat.name}" added`);
  };

  const addBrand = (br) => {
    const newBr = {
      id: 'br-' + (brands.length + 1),
      ...br,
      status: 'Active',
    };
    setBrands((prev) => [...prev, newBr]);
    addToast(`Brand "${newBr.name}" added`);
  };

  // Update Settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    logActivity('Updated business & system settings');
    addToast('Settings saved successfully');
  };

  // System dynamic calculations
  const totalReceivables = customers.reduce((sum, c) => sum + (c.outstanding || 0), 0);
  const totalPayables = suppliers.reduce((sum, s) => sum + (s.outstanding || 0), 0);
  const totalInventoryValue = products.reduce((sum, p) => sum + (p.currentStock * p.purchasePrice), 0);
  const lowStockProducts = products.filter((p) => p.currentStock <= p.minStock);
  const outOfStockProducts = products.filter((p) => p.currentStock === 0);

  // Dynamic notifications
  const notifications = [
    ...lowStockProducts.map((p) => ({
      id: 'notif-low-' + p.id,
      title: 'Low stock alert',
      message: `${p.name} has only ${p.currentStock} units left (Min: ${p.minStock}).`,
      type: 'warning',
      time: 'Just now',
      read: false,
      link: `/admin/products/${p.id}`,
    })),
    ...customers.filter((c) => c.outstanding > 50000).map((c) => ({
      id: 'notif-due-' + c.id,
      title: 'Payment balance overdue',
      message: `${c.businessName} has ₹${c.outstanding.toLocaleString('en-IN')} outstanding.`,
      type: 'danger',
      time: 'Today',
      read: false,
      link: `/admin/customers/${c.id}`,
    })),
    {
      id: 'notif-order-latest',
      title: 'New sales order',
      message: `${salesOrders[0]?.id || 'SO-2026-1045'} received from ${salesOrders[0]?.customerName}.`,
      type: 'info',
      time: 'Today',
      read: true,
      link: '/admin/sales-orders',
    },
    {
      id: 'notif-pur-latest',
      title: 'Purchase received',
      message: 'PO-2026-208 completed and stocked in Jaipur Main Warehouse.',
      type: 'success',
      time: 'Yesterday',
      read: true,
      link: '/admin/purchases',
    },
  ];

  const updateDeliveryStatus = (deliveryId, newStatus) => {
    setDeliveries((prev) =>
      prev.map((d) => (d.id === deliveryId ? { ...d, status: newStatus } : d))
    );
    addToast(`Delivery status updated to ${newStatus}`);
  };

  const updateUserProfile = (profileData) => {
    setUser((prev) => {
      const updated = { ...prev, ...profileData };
      if (typeof window !== 'undefined') {
        localStorage.setItem(AUTH_KEY, JSON.stringify(updated));
      }
      return updated;
    });
    addToast('Admin profile updated successfully');
  };

  return (
    <VyavasthaKendraContext.Provider
      value={{
        // Auth & Role
        user,
        login,
        logout,
        switchRole,
        updateUserProfile,
        // Theme
        theme,
        setTheme,
        toggleTheme,
        // Layout UI
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isSearchOpen,
        setIsSearchOpen,
        toasts,
        addToast,
        removeToast,
        // Demo Reset
        resetDemoData,
        // Business data
        products,
        categories,
        brands,
        warehouses,
        customers,
        suppliers,
        salesOrders,
        invoices,
        purchaseOrders,
        purchases,
        customerPayments,
        supplierPayments,
        stockMovements,
        stockTransfers,
        expenses,
        salesmen,
        deliveries,
        drivers,
        vehicles,
        salesReturns,
        purchaseReturns,
        activityLogs,
        settings,
        notifications,
        // Calculated Metrics
        totalReceivables,
        totalPayables,
        totalInventoryValue,
        lowStockProducts,
        outOfStockProducts,
        // Actions
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        createStockTransfer,
        adjustStock,
        createSalesOrder,
        updateSalesOrderStatus,
        recordCustomerPayment,
        createPurchaseOrder,
        receivePurchaseGoods,
        recordSupplierPayment,
        addCustomer,
        updateCustomer,
        addSupplier,
        updateSupplier,
        addExpense,
        addSalesReturn,
        addPurchaseReturn,
        addCategory,
        addBrand,
        updateDeliveryStatus,
        updateSettings,
        logActivity,
      }}
    >
      {children}
    </VyavasthaKendraContext.Provider>
  );
}

export const StockoraProvider = VyavasthaKendraProvider;

export function useVyavasthaKendra() {
  const context = useContext(VyavasthaKendraContext);
  if (!context) {
    throw new Error('useVyavasthaKendra must be used within a VyavasthaKendraProvider');
  }
  return context;
}

export const useStockora = useVyavasthaKendra;
