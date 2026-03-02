import { Calendar, MapPin, Briefcase, Filter } from 'lucide-react'
import type { FilterOptions, ReportFilters } from '../types'

interface FilterBarProps {
  filterOptions: FilterOptions
  currentFilters: ReportFilters
  onFilterChange?: (filters: ReportFilters) => void
}

export function FilterBar({ filterOptions, currentFilters, onFilterChange }: FilterBarProps) {
  const handleDateRangeChange = (value: string) => {
    onFilterChange?.({ ...currentFilters, dateRange: value })
  }

  const handleStateChange = (value: string) => {
    onFilterChange?.({ ...currentFilters, state: value })
  }

  const handleServiceTypeChange = (value: string) => {
    onFilterChange?.({ ...currentFilters, serviceType: value })
  }

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Filter label */}
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
          <Filter className="w-4 h-4" />
          <span>Filters</span>
        </div>

        {/* Date range filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={currentFilters.dateRange || '30d'}
            onChange={(e) => handleDateRangeChange(e.target.value)}
            className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]"
          >
            {filterOptions.dateRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* State filter */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={currentFilters.state || 'All States'}
            onChange={(e) => handleStateChange(e.target.value)}
            className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]"
          >
            {filterOptions.states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Service type filter */}
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <select
            value={currentFilters.serviceType || 'All Services'}
            onChange={(e) => handleServiceTypeChange(e.target.value)}
            className="appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-9 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[180px]"
          >
            {filterOptions.serviceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
