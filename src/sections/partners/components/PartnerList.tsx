import { useState } from 'react'
import { MoreVertical, Search, Filter, ChevronLeft, ChevronRight, X, UserPlus, ArrowUpDown } from 'lucide-react'
import type { PartnerListProps } from '@/../product/sections/partners/types'

interface ExtendedPartnerListProps extends PartnerListProps {
  partnerType?: 'challanPay' | 'lots247'
  onBulkAssign?: (partnerIds: string[]) => void
}

export function PartnerList({
  partners,
  onView,
  onToggleStatus,
  partnerType,
  onBulkAssign,
}: ExtendedPartnerListProps) {
  const isChallanPay = partnerType === 'challanPay'
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [stateFilter, setStateFilter] = useState<string>('')
  const [assignedToFilter, setAssignedToFilter] = useState<string>('')
  const [utmSourceFilter, setUtmSourceFilter] = useState<string>('')
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>('')
  const [showFilters, setShowFilters] = useState(false)
  const [showSortMenu, setShowSortMenu] = useState(false)
  const [sortField, setSortField] = useState<string>('')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const itemsPerPage = 10

  // Derive unique values for filter dropdowns
  const uniqueStates = [...new Set(partners.map(p => p.state))].sort()
  const uniqueAssignees = [...new Set(partners.map(p => p.assignedTo).filter(Boolean) as string[])].sort()
  const uniqueUtmSources = [...new Set(partners.map(p => p.utmSource).filter(Boolean) as string[])].sort()

  const activeFilterCount = [statusFilter, stateFilter, assignedToFilter, utmSourceFilter, activeStatusFilter].filter(Boolean).length

  // Filter partners based on search and all filters
  let filtered = partners.filter(partner => {
    const matchesSearch = partner.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStage = !statusFilter || (isChallanPay ? partner.stage === statusFilter : partner.status === statusFilter)
    const matchesState = !stateFilter || partner.state === stateFilter
    const matchesAssignedTo = !assignedToFilter || (assignedToFilter === 'unassigned' ? !partner.assignedTo : partner.assignedTo === assignedToFilter)
    const matchesUtmSource = !utmSourceFilter || partner.utmSource === utmSourceFilter
    const matchesActiveStatus = !activeStatusFilter || partner.status === activeStatusFilter
    return matchesSearch && matchesStage && matchesState && matchesAssignedTo && matchesUtmSource && matchesActiveStatus
  })

  // Sort
  if (sortField) {
    filtered.sort((a, b) => {
      let aVal: string | number = ''
      let bVal: string | number = ''
      switch (sortField) {
        case 'name': aVal = a.companyName.toLowerCase(); bVal = b.companyName.toLowerCase(); break
        case 'date': aVal = new Date(a.dateOnboarded).getTime(); bVal = new Date(b.dateOnboarded).getTime(); break
        case 'customers': aVal = a.linkedSubscribers?.length || 0; bVal = b.linkedSubscribers?.length || 0; break
        case 'outlets': aVal = a.outlets || 0; bVal = b.outlets || 0; break
        case 'visitors': aVal = a.registeredVisitorsCount || 0; bVal = b.registeredVisitorsCount || 0; break
      }
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
      return 0
    })
  }

  // Pagination
  const totalItems = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))
  const safeCurrentPage = Math.min(currentPage, totalPages)
  const startIndex = (safeCurrentPage - 1) * itemsPerPage
  const paginatedPartners = filtered.slice(startIndex, startIndex + itemsPerPage)
  const startItem = totalItems === 0 ? 0 : startIndex + 1
  const endItem = Math.min(startIndex + itemsPerPage, totalItems)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Selection helpers (challanPay only)
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    const pageIds = paginatedPartners.map(p => p.id)
    const allSelected = pageIds.every(id => selectedIds.has(id))
    setSelectedIds(prev => {
      const next = new Set(prev)
      if (allSelected) {
        pageIds.forEach(id => next.delete(id))
      } else {
        pageIds.forEach(id => next.add(id))
      }
      return next
    })
  }

  const clearSelection = () => setSelectedIds(new Set())

  const pageAllSelected = paginatedPartners.length > 0 && paginatedPartners.every(p => selectedIds.has(p.id))
  const pageSomeSelected = paginatedPartners.some(p => selectedIds.has(p.id)) && !pageAllSelected

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 5
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (safeCurrentPage > 3) pages.push('ellipsis')
      const start = Math.max(2, safeCurrentPage - 1)
      const end = Math.min(totalPages - 1, safeCurrentPage + 1)
      for (let i = start; i <= end; i++) pages.push(i)
      if (safeCurrentPage < totalPages - 2) pages.push('ellipsis')
      if (totalPages > 1) pages.push(totalPages)
    }
    return pages
  }

  const StatusBadge = ({ status }: { status: 'active' | 'inactive' }) => {
    const isActive = status === 'active'
    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        isActive
          ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
      }`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isActive ? 'bg-cyan-500' : 'bg-slate-400'}`} />
        {isActive ? 'Active' : 'Inactive'}
      </div>
    )
  }

  const StageBadge = ({ stage }: { stage: 'onboarding' | 'activation' | 'training' | 'mobilisation' }) => {
    const styles = {
      onboarding: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
      activation: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
      training: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
      mobilisation: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    }
    const dots = {
      onboarding: 'bg-amber-500',
      activation: 'bg-blue-500',
      training: 'bg-violet-500',
      mobilisation: 'bg-emerald-500',
    }
    const labels = {
      onboarding: 'Onboarding',
      activation: 'Activation',
      training: 'Training',
      mobilisation: 'Mobilisation',
    }
    return (
      <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${styles[stage]}`}>
        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dots[stage]}`} />
        {labels[stage]}
      </div>
    )
  }

  if (filtered.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center">
        <div className="max-w-sm mx-auto">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2">No partners found</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Try adjusting your search or filters.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, company, or contact..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1) }}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-600"
            />
          </div>

          {/* Sort Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                sortField
                  ? 'bg-cyan-600 text-white'
                  : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Sort</span>
            </button>
            {showSortMenu && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-30 py-1">
                {([
                  { key: 'name', label: 'Partner Name (A to Z)', defaultDir: 'asc' as const },
                  { key: 'date', label: 'Date Onboarded', defaultDir: 'asc' as const },
                  { key: 'customers', label: 'Customers (High to Low)', defaultDir: 'desc' as const },
                  { key: 'outlets', label: 'Outlets (High to Low)', defaultDir: 'desc' as const },
                  { key: 'visitors', label: 'Registered Visitors (High to Low)', defaultDir: 'desc' as const },
                ] as const).map((option) => (
                  <button
                    key={option.key}
                    onClick={() => {
                      if (sortField === option.key) {
                        if (sortDirection === option.defaultDir) setSortDirection(option.defaultDir === 'asc' ? 'desc' : 'asc')
                        else { setSortField(''); setSortDirection('asc') }
                      } else {
                        setSortField(option.key)
                        setSortDirection(option.defaultDir)
                      }
                      setShowSortMenu(false)
                      setCurrentPage(1)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm transition-colors flex items-center justify-between ${
                      sortField === option.key
                        ? 'bg-cyan-50 dark:bg-cyan-950/30 text-cyan-700 dark:text-cyan-300'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {option.label}
                    {sortField === option.key && (
                      <span className="text-xs text-cyan-500">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </button>
                ))}
                {sortField && (
                  <>
                    <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                    <button
                      onClick={() => { setSortField(''); setSortDirection('asc'); setShowSortMenu(false) }}
                      className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      Clear Sort
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              showFilters
                ? 'bg-cyan-600 text-white'
                : 'bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 flex items-center justify-center bg-cyan-100 dark:bg-cyan-800 text-cyan-700 dark:text-cyan-200 rounded-full text-xs font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Stage / Status */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{isChallanPay ? 'Stage' : 'Status'}</label>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  {isChallanPay ? (
                    <>
                      <option value="">All Stages</option>
                      <option value="onboarding">Onboarding</option>
                      <option value="activation">Activation</option>
                      <option value="training">Training</option>
                      <option value="mobilisation">Mobilisation</option>
                    </>
                  ) : (
                    <>
                      <option value="">All Status</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </>
                  )}
                </select>
              </div>

              {/* State */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">State</label>
                <select
                  value={stateFilter}
                  onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="">All States</option>
                  {uniqueStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>

              {/* Assigned To (ChallanPay only) */}
              {isChallanPay && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Assigned To</label>
                  <select
                    value={assignedToFilter}
                    onChange={(e) => { setAssignedToFilter(e.target.value); setCurrentPage(1) }}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Agents</option>
                    <option value="unassigned">Unassigned</option>
                    {uniqueAssignees.map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* UTM Source */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">UTM Source</label>
                <select
                  value={utmSourceFilter}
                  onChange={(e) => { setUtmSourceFilter(e.target.value); setCurrentPage(1) }}
                  className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                >
                  <option value="">All Sources</option>
                  {uniqueUtmSources.map(source => (
                    <option key={source} value={source}>{source}</option>
                  ))}
                </select>
              </div>

              {/* Active Status (when ChallanPay — stage is primary, this is secondary) */}
              {isChallanPay && (
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Status</label>
                  <select
                    value={activeStatusFilter}
                    onChange={(e) => { setActiveStatusFilter(e.target.value); setCurrentPage(1) }}
                    className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
                  >
                    <option value="">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              )}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setStatusFilter('')
                  setStateFilter('')
                  setAssignedToFilter('')
                  setUtmSourceFilter('')
                  setActiveStatusFilter('')
                  setCurrentPage(1)
                }}
                className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              {isChallanPay && (
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={pageAllSelected}
                    ref={el => { if (el) el.indeterminate = pageSomeSelected }}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Onboarding Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Partner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Partner ID</th>
              {isChallanPay && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Assigned To</th>}
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isChallanPay ? 'Stage' : 'Status'}</th>
              {isChallanPay && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Activity</th>}
              {isChallanPay && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Registered Visitors</th>}
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">{isChallanPay ? 'Customers' : 'Subscribers'}</th>
              {isChallanPay && <th className="px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Outlets</th>}
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {paginatedPartners.map((partner) => (
              <tr
                key={partner.id}
                className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${isChallanPay && selectedIds.has(partner.id) ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`}
              >
                {isChallanPay && (
                  <td className="w-12 px-4 py-4" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedIds.has(partner.id)}
                      onChange={() => toggleSelect(partner.id)}
                      className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer"
                    />
                  </td>
                )}
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <p className="text-sm text-slate-900 dark:text-white">
                    {new Date(partner.dateOnboarded).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                </td>
                <td
                  className="px-6 py-4 cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{partner.companyName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{partner.utmSource || '—'}</p>
                  </div>
                </td>
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400">{partner.partnerId}</p>
                </td>
                {isChallanPay && (
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onView?.(partner.id)}
                  >
                    {partner.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300 flex items-center justify-center text-xs font-medium">
                          {partner.assignedTo.charAt(0)}
                        </div>
                        <span className="text-sm text-slate-900 dark:text-white">{partner.assignedTo}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400 dark:text-slate-500">Unassigned</span>
                    )}
                  </td>
                )}
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  {isChallanPay && partner.stage ? <StageBadge stage={partner.stage} /> : <StatusBadge status={partner.status} />}
                </td>
                {isChallanPay && (
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onView?.(partner.id)}
                  >
                    <p className="text-sm text-slate-900 dark:text-white">
                      {partner.stage === 'onboarding' && partner.onboardingActivity
                        ? { registration: 'Registration', qrCreation: 'QR Creation', profileVerification: 'Profile Verification' }[partner.onboardingActivity]
                        : partner.stage === 'activation' && partner.activationActivity
                        ? { assigned: 'Assigned', trained: 'Trained' }[partner.activationActivity]
                        : partner.stage === 'mobilisation' && partner.mobilisationActivity
                        ? { posterCreated: 'Poster Created', welcomeLetterCreated: 'Welcome Letter', keychainCreated: 'Keychain Created', dispatch: 'Dispatch', delivered: 'Delivered' }[partner.mobilisationActivity]
                        : '—'}
                    </p>
                  </td>
                )}
                {isChallanPay && (
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onView?.(partner.id)}
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{partner.registeredVisitorsCount ?? '—'}</p>
                  </td>
                )}
                <td
                  className="px-6 py-4 whitespace-nowrap cursor-pointer"
                  onClick={() => onView?.(partner.id)}
                >
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{partner.linkedSubscribers.length}</p>
                </td>
                {isChallanPay && (
                  <td
                    className="px-6 py-4 whitespace-nowrap cursor-pointer"
                    onClick={() => onView?.(partner.id)}
                  >
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{partner.outlets ?? '—'}</p>
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-right" onClick={e => e.stopPropagation()}>
                  <div className="relative inline-block">
                    <button
                      onClick={() => setOpenActionMenu(openActionMenu === partner.id ? null : partner.id)}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
                    >
                      <MoreVertical className="w-5 h-5 text-slate-400" />
                    </button>

                    {openActionMenu === partner.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10">
                        <div className="py-1">
                          <button
                            onClick={() => {
                              onView?.(partner.id)
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            View/Edit Details
                          </button>
                          <button
                            onClick={() => {
                              onToggleStatus?.(partner.id, partner.status === 'active' ? 'inactive' : 'active')
                              setOpenActionMenu(null)
                            }}
                            className="w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2"
                          >
                            {partner.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-slate-200 dark:divide-slate-800">
        {paginatedPartners.map(partner => (
          <div
            key={partner.id}
            className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${isChallanPay && selectedIds.has(partner.id) ? 'bg-cyan-50/50 dark:bg-cyan-900/10' : ''}`}
          >
            <div className="flex items-start gap-3">
              {isChallanPay && (
                <input
                  type="checkbox"
                  checked={selectedIds.has(partner.id)}
                  onChange={() => toggleSelect(partner.id)}
                  className="mt-1 w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer shrink-0"
                />
              )}
              <div className="flex-1 min-w-0" onClick={() => onView?.(partner.id)}>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                      {new Date(partner.dateOnboarded).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">{partner.companyName}</div>
                    <div className="text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400">{partner.partnerId}</div>
                  </div>
                  {isChallanPay && partner.stage ? <StageBadge stage={partner.stage} /> : <StatusBadge status={partner.status} />}
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  {isChallanPay && (
                    <div className="text-slate-600 dark:text-slate-400">
                      {partner.assignedTo || 'Unassigned'}
                    </div>
                  )}
                  {isChallanPay && (
                    <div className="text-slate-600 dark:text-slate-400">
                      {partner.stage === 'onboarding' && partner.onboardingActivity
                        ? { registration: 'Registration', qrCreation: 'QR Creation', profileVerification: 'Profile Verification' }[partner.onboardingActivity]
                        : partner.stage === 'activation' && partner.activationActivity
                        ? { assigned: 'Assigned', trained: 'Trained' }[partner.activationActivity]
                        : partner.stage === 'mobilisation' && partner.mobilisationActivity
                        ? { posterCreated: 'Poster Created', welcomeLetterCreated: 'Welcome Letter', keychainCreated: 'Keychain Created', dispatch: 'Dispatch', delivered: 'Delivered' }[partner.mobilisationActivity]
                        : '—'}
                    </div>
                  )}
                  <div className="flex flex-wrap gap-4 text-slate-600 dark:text-slate-400">
                    {isChallanPay && <span>{partner.registeredVisitorsCount ?? 0} visitors</span>}
                    <span>{partner.linkedSubscribers.length} {isChallanPay ? 'customers' : 'subscribers'}</span>
                    {isChallanPay && <span>{partner.outlets ?? 0} outlets</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalItems > 0 && (
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Showing{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">{startItem}</span>
            {' '}to{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">{endItem}</span>
            {' '}of{' '}
            <span className="font-medium text-slate-700 dark:text-slate-300">{totalItems}</span>
            {' '}results
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                safeCurrentPage === 1
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {getPageNumbers().map((page, index) =>
              page === 'ellipsis' ? (
                <span
                  key={`ellipsis-${index}`}
                  className="w-8 h-8 flex items-center justify-center text-slate-400"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${
                    page === safeCurrentPage
                      ? 'bg-cyan-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {page}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(safeCurrentPage + 1)}
              disabled={safeCurrentPage === totalPages}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${
                safeCurrentPage === totalPages
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      </div>

      {/* Bulk Actions Bar */}
      {isChallanPay && selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
            <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
              <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold">
                {selectedIds.size}
              </span>
              <span className="text-sm text-slate-300">selected</span>
              <button
                onClick={clearSelection}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                <X className="h-4 w-4 text-slate-400" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onBulkAssign?.(Array.from(selectedIds))}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Assign</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
