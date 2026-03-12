import { useState, useMemo } from 'react'
import { Search, Download, SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import type { SettledChallansProps, SettledChallan, SettledChallansFilters } from '@/../product/sections/settled-challans/types'

const ITEMS_PER_PAGE = 8

export function SettledChallansDashboard({
  settledChallans,
  onSearch,
  onFilter,
  onExport,
  onPageChange,
}: SettledChallansProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<SettledChallansFilters>({})

  // Derive unique values for filter dropdowns
  const subscribers = useMemo(
    () => [...new Set(settledChallans.map((c) => c.subscriber))].sort(),
    [settledChallans]
  )
  const states = useMemo(
    () => [...new Set(settledChallans.map((c) => c.state))].sort(),
    [settledChallans]
  )

  // Client-side filtering for demo
  const filteredChallans = useMemo(() => {
    let result = settledChallans

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.vehicleNo.toLowerCase().includes(q) ||
          c.subscriber.toLowerCase().includes(q) ||
          c.challanNo.toLowerCase().includes(q) ||
          c.offenceName.toLowerCase().includes(q)
      )
    }

    if (filters.subscriber) {
      result = result.filter((c) => c.subscriber === filters.subscriber)
    }
    if (filters.state) {
      result = result.filter((c) => c.state === filters.state)
    }
    if (filters.dateFrom) {
      result = result.filter((c) => c.settledDate >= filters.dateFrom!)
    }
    if (filters.dateTo) {
      result = result.filter((c) => c.settledDate <= filters.dateTo!)
    }
    if (filters.amountMin !== undefined) {
      result = result.filter((c) => c.amount >= filters.amountMin!)
    }
    if (filters.amountMax !== undefined) {
      result = result.filter((c) => c.amount <= filters.amountMax!)
    }

    return result
  }, [settledChallans, searchQuery, filters])

  const totalPages = Math.max(1, Math.ceil(filteredChallans.length / ITEMS_PER_PAGE))
  const paginatedChallans = filteredChallans.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const activeFilterCount = Object.values(filters).filter((v) => v !== undefined && v !== '').length

  function handleSearch(query: string) {
    setSearchQuery(query)
    setCurrentPage(1)
    onSearch?.(query)
  }

  function handleFilterChange(newFilters: SettledChallansFilters) {
    setFilters(newFilters)
    setCurrentPage(1)
    onFilter?.(newFilters)
  }

  function clearFilters() {
    setFilters({})
    setCurrentPage(1)
    onFilter?.({})
  }

  function handlePageChange(page: number) {
    setCurrentPage(page)
    onPageChange?.(page)
  }

  function formatAmount(amount: number) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }


  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="px-4 sm:px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">
            Settled Challans
          </h1>
          <button
            onClick={() => onExport?.()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      {/* Search & Filters Bar */}
      <div className="px-4 sm:px-6 pb-3">
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search by vehicle, subscriber, challan no, offence..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:ring-cyan-400/20 dark:focus:border-cyan-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3.5 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
              showFilters || activeFilterCount > 0
                ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-300'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-3 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Date From */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  From Date
                </label>
                <input
                  type="date"
                  value={filters.dateFrom || ''}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, dateFrom: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Date To */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  To Date
                </label>
                <input
                  type="date"
                  value={filters.dateTo || ''}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, dateTo: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>

              {/* Subscriber */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  Subscriber
                </label>
                <select
                  value={filters.subscriber || ''}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, subscriber: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="">All Subscribers</option>
                  {subscribers.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  State
                </label>
                <select
                  value={filters.state || ''}
                  onChange={(e) =>
                    handleFilterChange({ ...filters, state: e.target.value || undefined })
                  }
                  className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                >
                  <option value="">All States</option>
                  {states.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Amount Range + Clear */}
            <div className="flex items-end gap-4 mt-4">
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Min Amount
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={filters.amountMin ?? ''}
                    onChange={(e) =>
                      handleFilterChange({
                        ...filters,
                        amountMin: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                    Max Amount
                  </label>
                  <input
                    type="number"
                    placeholder="Any"
                    value={filters.amountMax ?? ''}
                    onChange={(e) =>
                      handleFilterChange({
                        ...filters,
                        amountMax: e.target.value ? Number(e.target.value) : undefined,
                      })
                    }
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors whitespace-nowrap"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="flex-1 px-4 sm:px-6 overflow-auto">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid sm:grid-cols-[1.2fr_1.5fr_1.2fr_2fr_1fr] gap-4 px-4 py-3 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Vehicle No
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Subscriber
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Challan No
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Offence Name
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Amount
            </span>
          </div>

          {/* Table Rows */}
          {paginatedChallans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Search className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                No settled challans found
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            paginatedChallans.map((challan, index) => (
              <ChallanRow
                key={challan.id}
                challan={challan}
                formatAmount={formatAmount}
                isLast={index === paginatedChallans.length - 1}
              />
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {filteredChallans.length > ITEMS_PER_PAGE && (
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing{' '}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1}
              </span>
              {' - '}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredChallans.length)}
              </span>
              {' of '}
              <span className="font-medium text-slate-700 dark:text-slate-200">
                {filteredChallans.length}
              </span>
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-cyan-600 text-white'
                      : 'border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// --- Row Sub-component ---

function ChallanRow({
  challan,
  formatAmount,
  isLast,
}: {
  challan: SettledChallan
  formatAmount: (n: number) => string
  isLast: boolean
}) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-[1.2fr_1.5fr_1.2fr_2fr_1fr] gap-1 sm:gap-4 px-4 py-3.5 ${
        !isLast ? 'border-b border-slate-100 dark:border-slate-700/60' : ''
      } hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors`}
    >
      {/* Vehicle No */}
      <div className="flex items-center gap-2 sm:gap-0">
        <span className="text-xs text-slate-400 sm:hidden w-20 shrink-0">Vehicle</span>
        <span className="text-sm font-medium text-slate-900 dark:text-white font-mono tracking-wide">
          {challan.vehicleNo}
        </span>
      </div>

      {/* Subscriber */}
      <div className="flex items-start gap-2 sm:gap-0">
        <span className="text-xs text-slate-400 sm:hidden w-20 shrink-0 mt-0.5">Subscriber</span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {challan.subscriber}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {challan.subscriberEmail}
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500">
            {challan.subscriberPhone}
          </p>
        </div>
      </div>

      {/* Challan No */}
      <div className="flex items-center gap-2 sm:gap-0">
        <span className="text-xs text-slate-400 sm:hidden w-20 shrink-0">Challan</span>
        <span className="text-sm text-slate-600 dark:text-slate-400 font-mono">
          {challan.challanNo}
        </span>
      </div>

      {/* Offence Name */}
      <div className="flex items-center gap-2 sm:gap-0">
        <span className="text-xs text-slate-400 sm:hidden w-20 shrink-0">Offence</span>
        <span className="text-sm text-slate-700 dark:text-slate-300 truncate">
          {challan.offenceName}
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-center gap-2 sm:gap-0">
        <span className="text-xs text-slate-400 sm:hidden w-20 shrink-0">Amount</span>
        <span className="text-sm font-medium text-slate-900 dark:text-white">
          {formatAmount(challan.amount)}
        </span>
      </div>
    </div>
  )
}
