import { useState, useRef, useEffect } from 'react'
import { Search, Plus, Filter, MoreHorizontal, Eye, Pencil, UserX, UserCheck } from 'lucide-react'
import type { Lawyer } from '../types'

interface LawyerTableProps {
  lawyers: Lawyer[]
  onView: (id: string) => void
  onEdit: (id: string) => void
  onAdd: () => void
  onDeactivate: (id: string) => void
  onReactivate: (id: string) => void
}

export function LawyerTable({
  lawyers,
  onView,
  onEdit,
  onAdd,
  onDeactivate,
  onReactivate,
}: LawyerTableProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'inactive'>('active')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    state: '',
    category: '',
  })
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const activeLawyers = lawyers.filter((l) => l.activityState === 'Active')
  const inactiveLawyers = lawyers.filter((l) => l.activityState === 'Inactive')

  const currentLawyers = activeTab === 'active' ? activeLawyers : inactiveLawyers

  // Get unique states and categories for filter dropdowns
  const uniqueStates = Array.from(new Set(lawyers.map((l) => l.currentAddress.state))).sort()
  const uniqueCategories = Array.from(new Set(lawyers.map((l) => l.category))).sort()

  // Apply search filter
  let filteredLawyers = searchQuery
    ? currentLawyers.filter(
        (l) =>
          `${l.firstName} ${l.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.lawyerId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          l.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentLawyers

  // Apply state and category filters
  if (filters.state) {
    filteredLawyers = filteredLawyers.filter((l) =>
      l.currentAddress.state.toLowerCase().includes(filters.state.toLowerCase())
    )
  }
  if (filters.category) {
    filteredLawyers = filteredLawyers.filter((l) => l.category === filters.category)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">Lawyers</h1>
      </div>

      {/* Tabs and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'active'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Active ({activeLawyers.length})
          </button>
          <button
            onClick={() => setActiveTab('inactive')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'inactive'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Inactive ({inactiveLawyers.length})
          </button>
        </div>

        <button
          onClick={onAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Lawyer
        </button>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, ID, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
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
                  className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
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
                  className="w-full pl-3 pr-9 py-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat"
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

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Lawyer
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden md:table-cell">
                  Contact
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide hidden lg:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  State
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  KYC
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredLawyers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center">
                    <p className="text-slate-500 dark:text-slate-400">
                      {searchQuery
                        ? 'No lawyers found matching your search'
                        : `No ${activeTab} lawyers`}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLawyers.map((lawyer) => (
                  <tr
                    key={lawyer.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    {/* Lawyer Info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={lawyer.photo}
                          alt={`${lawyer.firstName} ${lawyer.lastName}`}
                          className="w-10 h-10 rounded-full object-cover bg-slate-100 dark:bg-slate-700"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 dark:text-white truncate">
                            {lawyer.firstName} {lawyer.lastName}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                            {lawyer.lawyerId}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Contact */}
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="min-w-0">
                        <p className="text-sm text-slate-900 dark:text-white truncate max-w-[200px]">
                          {lawyer.email}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {lawyer.mobile}
                        </p>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <p className="text-sm text-slate-900 dark:text-white">{lawyer.category}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-[160px]">
                        {lawyer.subCategory}
                      </p>
                    </td>

                    {/* State */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-slate-900 dark:text-white">
                        {lawyer.currentAddress.state}
                      </span>
                    </td>

                    {/* KYC Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${
                          lawyer.kycStatus === 'Verified'
                            ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                            : lawyer.kycStatus === 'Pending'
                            ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                            : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        }`}
                      >
                        {lawyer.kycStatus}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4 text-right">
                      <div className="relative" ref={openMenuId === lawyer.id ? menuRef : null}>
                        <button
                          onClick={() =>
                            setOpenMenuId(openMenuId === lawyer.id ? null : lawyer.id)
                          }
                          className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                        </button>

                        {openMenuId === lawyer.id && (
                          <div className="absolute right-0 mt-1 w-44 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10 py-1">
                            <button
                              onClick={() => {
                                onView(lawyer.id)
                                setOpenMenuId(null)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                              <Eye className="w-4 h-4" />
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                onEdit(lawyer.id)
                                setOpenMenuId(null)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                            >
                              <Pencil className="w-4 h-4" />
                              Edit
                            </button>
                            <div className="my-1 border-t border-slate-100 dark:border-slate-700" />
                            {lawyer.activityState === 'Active' ? (
                              <button
                                onClick={() => {
                                  onDeactivate(lawyer.id)
                                  setOpenMenuId(null)
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                              >
                                <UserX className="w-4 h-4" />
                                Deactivate
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  onReactivate(lawyer.id)
                                  setOpenMenuId(null)
                                }}
                                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                              >
                                <UserCheck className="w-4 h-4" />
                                Reactivate
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Results count */}
      {filteredLawyers.length > 0 && (
        <p className="mt-4 text-sm text-slate-500 dark:text-slate-400 text-center">
          Showing {filteredLawyers.length} of {currentLawyers.length} {activeTab} lawyers
        </p>
      )}
    </div>
  )
}
