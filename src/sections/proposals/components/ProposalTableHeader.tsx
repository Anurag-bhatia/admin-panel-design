import { useState } from 'react'
import { Search, Filter, Download, X } from 'lucide-react'
import type { TeamMember } from '@/../product/sections/proposals/types'

type SortOption = 'newest' | 'oldest' | 'amount_high' | 'amount_low' | 'qty_high' | 'qty_low'

export interface ProposalFilters {
  assignedTo?: string
  sortBy?: SortOption
  dateFrom?: string
  dateTo?: string
}

interface ProposalTableHeaderProps {
  searchQuery: string
  teamMembers: TeamMember[]
  onSearchChange?: (query: string) => void
  onFilter?: (filters: ProposalFilters) => void
  onExport?: () => void
}

export function ProposalTableHeader({
  searchQuery,
  teamMembers,
  onSearchChange,
  onFilter,
  onExport,
}: ProposalTableHeaderProps) {
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<ProposalFilters>({})

  const handleFilterChange = (key: keyof ProposalFilters, value: any) => {
    const newFilters = { ...filters, [key]: value || undefined }
    setFilters(newFilters)
    onFilter?.(newFilters)
  }

  const clearFilters = () => {
    setFilters({})
    onFilter?.({})
  }

  const hasActiveFilters = Object.values(filters).some(
    (v) => v !== undefined && v !== ''
  )

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== ''
  ).length

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
      {/* Main Header Row */}
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by ID, customer, company, or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
            }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500 text-white text-xs">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Export */}
          <button
            onClick={onExport}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filter Row */}
      {showFilters && (
        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Assigned To */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Assigned To
              </label>
              <select
                value={filters.assignedTo || ''}
                onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white min-w-[160px]"
              >
                <option value="">All Assignees</option>
                <option value="unassigned">Unassigned</option>
                {teamMembers.map((tm) => (
                  <option key={tm.id} value={tm.id}>
                    {tm.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Sort By
              </label>
              <select
                value={filters.sortBy || ''}
                onChange={(e) => handleFilterChange('sortBy', e.target.value as SortOption)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white min-w-[160px]"
              >
                <option value="">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount_high">Amount: High → Low</option>
                <option value="amount_low">Amount: Low → High</option>
                <option value="qty_high">Qty: High → Low</option>
                <option value="qty_low">Qty: Low → High</option>
              </select>
            </div>

            {/* Date From */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                From Date
              </label>
              <input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Date To */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                To Date
              </label>
              <input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="px-3 py-1.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="self-end inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
              >
                <X className="h-3.5 w-3.5" />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
