import { useState } from 'react'
import { Search, Plus, Filter } from 'lucide-react'
import type { LawyersProps } from '@/../product/sections/lawyers/types'
import { LawyerRow } from './LawyerRow'

// Design tokens: cyan (primary), zinc (secondary), slate (neutral)
// Typography: Geist for heading and body, Geist Mono for mono

export function LawyerList({
  lawyers,
  onView,
  onEdit,
  onDeactivate,
  onReactivate,
  onAdd,
  onViewDocument,
  onSearch,
  onFilterByActivity,
  onFilterByKYC,
}: LawyersProps) {
  const [activeTab, setActiveTab] = useState<'Active' | 'Inactive'>('Active')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    state: '',
    category: '',
  })

  // Filter lawyers based on tab
  const filteredByTab = lawyers.filter((lawyer) =>
    activeTab === 'Active' ? lawyer.activityState === 'Active' : lawyer.activityState === 'Inactive'
  )

  // Further filter by search query
  const filteredBySearch = searchQuery
    ? filteredByTab.filter(
        (lawyer) =>
          lawyer.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.lawyerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lawyer.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredByTab

  // Further filter by state and category
  let finalFiltered = filteredBySearch
  if (filters.state) {
    finalFiltered = finalFiltered.filter((lawyer) =>
      lawyer.currentAddress.state.toLowerCase().includes(filters.state.toLowerCase())
    )
  }
  if (filters.category) {
    finalFiltered = finalFiltered.filter((lawyer) => lawyer.category === filters.category)
  }

  const activeLawyers = lawyers.filter((l) => l.activityState === 'Active')
  const inactiveLawyers = lawyers.filter((l) => l.activityState === 'Inactive')

  // Get unique states and categories for filter dropdowns
  const uniqueStates = Array.from(new Set(lawyers.map((l) => l.currentAddress.state))).sort()
  const uniqueCategories = Array.from(new Set(lawyers.map((l) => l.category))).sort()

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    onSearch?.(query)
  }

  const handleTabChange = (tab: 'Active' | 'Inactive') => {
    setActiveTab(tab)
    onFilterByActivity?.(tab)
  }

  const hasActiveFilters = filters.state !== '' || filters.category !== ''

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50/30 to-slate-50 dark:from-slate-950 dark:via-cyan-950/10 dark:to-slate-950">
      {/* Header Section */}
      <div className="border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
                Legal Network
              </h1>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Manage your external legal professionals with full credential verification
              </p>
            </div>
            <button
              onClick={() => onAdd?.()}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              Add Lawyer
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              onClick={() => handleTabChange('Active')}
              className={`relative overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 ${
                activeTab === 'Active'
                  ? 'border-cyan-500 bg-gradient-to-br from-cyan-50 to-cyan-100/50 dark:from-cyan-950/40 dark:to-cyan-900/20 shadow-lg shadow-cyan-500/10'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="relative z-10">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Active Lawyers
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">
                  {activeLawyers.length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Ready for assignments
                </div>
              </div>
              {activeTab === 'Active' && (
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
              )}
            </button>

            <button
              onClick={() => handleTabChange('Inactive')}
              className={`relative overflow-hidden p-6 rounded-xl border-2 transition-all duration-300 ${
                activeTab === 'Inactive'
                  ? 'border-zinc-500 bg-gradient-to-br from-zinc-50 to-zinc-100/50 dark:from-zinc-950/40 dark:to-zinc-900/20 shadow-lg shadow-zinc-500/10'
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="relative z-10">
                <div className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                  Past Lawyers
                </div>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">
                  {inactiveLawyers.length}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Historical records
                </div>
              </div>
              {activeTab === 'Inactive' && (
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-500/5 to-transparent" />
              )}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, ID, or category..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                showFilters
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    State
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All States</option>
                    {uniqueStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Categories</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ state: '', category: '' })}
                  className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                >
                  Clear all filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lawyer Table */}
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl overflow-hidden">
          {/* Table Header */}
          <div className="hidden lg:grid lg:grid-cols-[80px_120px_1fr_200px_140px_140px_140px_100px_60px] gap-4 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Photo
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Lawyer ID
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Name & Contact
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Category
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Onboarding
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              KYC Status
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Activity
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Source
            </div>
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Actions
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {finalFiltered.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 mb-4">
                  <Search className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No lawyers found
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  {searchQuery
                    ? 'Try adjusting your search or filters'
                    : activeTab === 'Active'
                    ? 'No active lawyers in the system yet'
                    : 'No inactive lawyers in the system'}
                </p>
              </div>
            ) : (
              finalFiltered.map((lawyer) => (
                <LawyerRow
                  key={lawyer.id}
                  lawyer={lawyer}
                  onView={() => onView?.(lawyer.id)}
                  onEdit={() => onEdit?.(lawyer.id)}
                  onDeactivate={() => onDeactivate?.(lawyer.id)}
                  onReactivate={() => onReactivate?.(lawyer.id)}
                  onViewDocument={(docType) => onViewDocument?.(lawyer.id, docType)}
                />
              ))
            )}
          </div>
        </div>

        {/* Results Count */}
        {finalFiltered.length > 0 && (
          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            Showing {finalFiltered.length} of {filteredByTab.length}{' '}
            {activeTab.toLowerCase()} lawyers
          </div>
        )}
      </div>
    </div>
  )
}
