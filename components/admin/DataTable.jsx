'use client';

import React, { useState, useMemo } from 'react';
import { Search, ChevronDown, ChevronUp, ChevronsUpDown, ChevronLeft, ChevronRight, Download, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import EmptyState from './EmptyState';

export default function DataTable({
  columns = [],
  data = [],
  searchKey,
  searchPlaceholder = 'Search records...',
  filterOptions = null,
  activeFilter = null,
  onFilterChange = null,
  actions = null,
  onRowClick = null,
  selectable = false,
  emptyTitle = 'No records found',
  emptyDescription = 'There are no items matching your criteria.',
  emptyAction = null,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedIds, setSelectedIds] = useState([]);
  const [internalFilter, setInternalFilter] = useState(activeFilter || filterOptions?.[0]?.value || 'All');

  const currentFilter = activeFilter !== null && activeFilter !== undefined ? activeFilter : internalFilter;

  // Filtering
  const filteredData = useMemo(() => {
    let result = [...data];

    // Global Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((row) => {
        if (searchKey) {
          const val = row[searchKey];
          return String(val || '').toLowerCase().includes(q);
        }
        return Object.values(row).some((val) =>
          typeof val === 'string' || typeof val === 'number'
            ? String(val).toLowerCase().includes(q)
            : false
        );
      });
    }

    // Uncontrolled Filter handling if onFilterChange was not provided
    if (filterOptions && currentFilter && currentFilter !== 'All' && typeof onFilterChange !== 'function') {
      result = result.filter((row) => {
        const statusVal = row.status || row.orderStatus || row.paymentStatus;
        if (statusVal) {
          if (currentFilter === 'InStock') return row.currentStock > (row.minStock || 0);
          if (currentFilter === 'Low') return row.currentStock <= (row.minStock || 0) && row.currentStock > 0;
          if (currentFilter === 'Out') return row.currentStock === 0;
          return String(statusVal).toLowerCase() === String(currentFilter).toLowerCase();
        }
        return Object.values(row).some(
          (v) => String(v).toLowerCase() === String(currentFilter).toLowerCase()
        );
      });
    }

    // Sort
    if (sortColumn) {
      result.sort((a, b) => {
        const valA = a[sortColumn];
        const valB = b[sortColumn];

        if (typeof valA === 'number' && typeof valB === 'number') {
          return sortDirection === 'asc' ? valA - valB : valB - valA;
        }

        const strA = String(valA || '').toLowerCase();
        const strB = String(valB || '').toLowerCase();
        if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
        if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, searchKey, sortColumn, sortDirection, filterOptions, currentFilter, onFilterChange]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(paginatedData.map((row) => row.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id, e) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleExportCSV = () => {
    if (!filteredData.length) return;
    const headers = columns.map((col) => col.header).join(',');
    const rows = filteredData.map((row) =>
      columns
        .map((col) => {
          const val = row[col.accessor];
          return `"${String(val !== undefined ? val : '').replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Table Toolbar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#3157D5] focus:border-transparent transition-colors"
            />
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {filterOptions && (
            <div className="flex items-center gap-1 bg-slate-50 dark:bg-slate-800 p-1 rounded-lg border border-slate-200 dark:border-slate-700">
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    if (typeof onFilterChange === 'function') {
                      onFilterChange(opt.value);
                    } else {
                      setInternalFilter(opt.value);
                    }
                    setCurrentPage(1);
                  }}
                  className={cn(
                    'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                    currentFilter === opt.value
                      ? 'bg-white dark:bg-slate-900 text-[#3157D5] font-semibold shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  )}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/80 transition-colors shadow-2xs"
            title="Export CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {actions}
        </div>
      </div>

      {/* Selected Items Bulk Bar */}
      {selectable && selectedIds.length > 0 && (
        <div className="bg-[#3157D5]/10 dark:bg-[#3157D5]/20 px-4 py-2 border-b border-[#3157D5]/20 flex items-center justify-between text-xs text-[#3157D5] font-medium">
          <span>{selectedIds.length} row(s) selected</span>
          <button
            onClick={() => setSelectedIds([])}
            className="hover:underline font-semibold"
          >
            Clear selection
          </button>
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {selectable && (
                <th className="py-3 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((row) => selectedIds.includes(row.id))
                    }
                    onChange={handleSelectAll}
                    className="rounded border-slate-300 text-[#3157D5] focus:ring-[#3157D5]"
                  />
                </th>
              )}
              {columns.map((col, colIndex) => {
                const colKey = col.id || (col.header ? `col-th-${col.header}` : `col-th-${col.accessor || 'col'}-${colIndex}`);
                return (
                  <th
                    key={colKey}
                    onClick={() => col.sortable && handleSort(col.accessor)}
                    className={cn(
                      'py-3 px-4 select-none',
                      col.sortable ? 'cursor-pointer hover:text-slate-900 dark:hover:text-white' : '',
                      col.className
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {sortColumn === col.accessor ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="w-3.5 h-3.5 text-[#3157D5]" />
                            ) : (
                              <ChevronDown className="w-3.5 h-3.5 text-[#3157D5]" />
                            )
                          ) : (
                            <ChevronsUpDown className="w-3.5 h-3.5 opacity-50" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id ? `row-${row.id}` : `row-${index}`}
                    onClick={() => onRowClick && onRowClick(row)}
                    className={cn(
                      'transition-colors',
                      onRowClick ? 'cursor-pointer hover:bg-slate-50/80 dark:hover:bg-slate-800/50' : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/30',
                      isSelected ? 'bg-[#3157D5]/5 dark:bg-[#3157D5]/10' : ''
                    )}
                  >
                    {selectable && (
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(row.id, e)}
                          className="rounded border-slate-300 text-[#3157D5] focus:ring-[#3157D5]"
                        />
                      </td>
                    )}
                    {columns.map((col, colIndex) => {
                      const colKey = col.id || (col.header ? `col-td-${col.header}` : `col-td-${col.accessor || 'col'}-${colIndex}`);
                      return (
                        <td
                          key={colKey}
                          className={cn('py-3 px-4 text-slate-700 dark:text-slate-300', col.cellClassName)}
                        >
                          {col.cell ? col.cell(row) : row[col.accessor]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} className="py-12">
                  <EmptyState
                    title={emptyTitle}
                    description={emptyDescription}
                    action={emptyAction}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {filteredData.length > 0 && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded px-2 py-1 text-slate-900 dark:text-white focus:outline-none"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span className="ml-2">
              Showing {(currentPage - 1) * pageSize + 1} to{' '}
              {Math.min(currentPage * pageSize, filteredData.length)} of{' '}
              {filteredData.length} records
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-slate-700 dark:text-slate-300">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
