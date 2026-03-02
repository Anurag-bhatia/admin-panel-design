import { useState, useMemo } from 'react'
import { X, CheckCircle, XCircle, MapPin, Filter, ChevronDown, Search } from 'lucide-react'
import type { ScreeningResultsProps, ScreeningResult } from '@/../product/sections/incidents/types'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

interface Filters {
  state: string
  virtualStatus: string
  disposed: string
  documentImpound: string
  vehicleImpound: string
}

export function ScreenResultsView({ results, onClose, onConfirm }: ScreeningResultsProps) {
  const [selectedChallans, setSelectedChallans] = useState<string[]>(
    results.map((r) => r.challanNumber)
  )
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({
    state: '',
    virtualStatus: '',
    disposed: '',
    documentImpound: '',
    vehicleImpound: '',
  })

  // Get unique values for filter options
  const filterOptions = useMemo(() => ({
    states: [...new Set(results.map(r => r.state))],
    virtualStatuses: [...new Set(results.map(r => r.virtualStatus))],
    documentImpounds: [...new Set(results.map(r => r.documentImpound))],
  }), [results])

  // Apply search and filters
  const filteredResults = useMemo(() => {
    return results.filter(result => {
      // Apply search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesSearch =
          result.violaterName.toLowerCase().includes(query) ||
          result.challanNumber.toLowerCase().includes(query) ||
          result.state.toLowerCase().includes(query) ||
          result.offence.toLowerCase().includes(query) ||
          result.place.toLowerCase().includes(query) ||
          result.rtoName.toLowerCase().includes(query)
        if (!matchesSearch) return false
      }
      // Apply filters
      if (filters.state && result.state !== filters.state) return false
      if (filters.virtualStatus && result.virtualStatus !== filters.virtualStatus) return false
      if (filters.disposed === 'yes' && !result.disposed) return false
      if (filters.disposed === 'no' && result.disposed) return false
      if (filters.documentImpound && result.documentImpound !== filters.documentImpound) return false
      if (filters.vehicleImpound === 'yes' && !result.vehicleImpound) return false
      if (filters.vehicleImpound === 'no' && result.vehicleImpound) return false
      return true
    })
  }, [results, filters, searchQuery])

  const disposedCount = results.filter((r) => r.disposed).length
  const pendingCount = results.filter((r) => !r.disposed).length

  const handleToggle = (challanNumber: string) => {
    setSelectedChallans((prev) =>
      prev.includes(challanNumber)
        ? prev.filter((c) => c !== challanNumber)
        : [...prev, challanNumber]
    )
  }

  const handleToggleAll = () => {
    if (selectedChallans.length === filteredResults.length) {
      setSelectedChallans([])
    } else {
      setSelectedChallans(filteredResults.map((r) => r.challanNumber))
    }
  }

  const handleConfirm = () => {
    onConfirm?.(selectedChallans)
  }

  const clearFilters = () => {
    setFilters({
      state: '',
      virtualStatus: '',
      disposed: '',
      documentImpound: '',
      vehicleImpound: '',
    })
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
                Screening Results
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {results.length} {results.length === 1 ? 'challan' : 'challans'} screened •{' '}
                {selectedChallans.length} selected
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-cyan-100 dark:bg-cyan-900/40 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {results.length}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Total Screened
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                <XCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {disposedCount}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Already Disposed</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {pendingCount}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Pending to Dispose</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-4">
          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, challan number, state, offence..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-900 dark:text-white"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Filters */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
                activeFilterCount > 0
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800 text-cyan-700 dark:text-cyan-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Filter className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold bg-cyan-600 text-white rounded-full">
                  {activeFilterCount}
                </span>
              )}
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
              >
                Clear all
              </button>
            )}
          </div>

          {showFilters && (
            <div className="mt-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">State</label>
                  <select
                    value={filters.state}
                    onChange={(e) => setFilters({ ...filters, state: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All States</option>
                    {filterOptions.states.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Virtual Status</label>
                  <select
                    value={filters.virtualStatus}
                    onChange={(e) => setFilters({ ...filters, virtualStatus: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All</option>
                    {filterOptions.virtualStatuses.map(vs => (
                      <option key={vs} value={vs}>{vs}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Disposed</label>
                  <select
                    value={filters.disposed}
                    onChange={(e) => setFilters({ ...filters, disposed: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Document Impound</label>
                  <select
                    value={filters.documentImpound}
                    onChange={(e) => setFilters({ ...filters, documentImpound: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All</option>
                    {filterOptions.documentImpounds.map(di => (
                      <option key={di} value={di}>{di}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Vehicle Impound</label>
                  <select
                    value={filters.vehicleImpound}
                    onChange={(e) => setFilters({ ...filters, vehicleImpound: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    <option value="">All</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Table */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="px-3 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedChallans.length === filteredResults.length && filteredResults.length > 0}
                      onChange={handleToggleAll}
                      className="w-4 h-4 text-cyan-600 bg-slate-100 border-slate-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:bg-slate-700 dark:border-slate-600"
                    />
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Violater Name
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Challan No.
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Offence
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Place
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    RTO
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    V.Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    V.Amount
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Court
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Vehicle
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Doc Impound
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Disposed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredResults.map((result) => {
                  const isSelected = selectedChallans.includes(result.challanNumber)

                  return (
                    <tr
                      key={result.challanNumber}
                      className={`transition-colors ${
                        isSelected
                          ? 'bg-cyan-50 dark:bg-cyan-900/10'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <td className="px-3 py-3 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggle(result.challanNumber)}
                          className="w-4 h-4 text-cyan-600 bg-slate-100 border-slate-300 rounded focus:ring-cyan-500 dark:focus:ring-cyan-600 dark:bg-slate-700 dark:border-slate-600"
                        />
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {result.violaterName}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm font-mono text-slate-900 dark:text-white">
                          {result.challanNumber}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-slate-400" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {result.state}
                          </span>
                        </div>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(result.challanDate)}
                        </span>
                      </td>
                      <td className="px-3 py-3">
                        <span className="text-sm text-slate-900 dark:text-white max-w-[150px] truncate block">
                          {result.offence}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-slate-400 max-w-[120px] truncate block">
                          {result.place}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {result.rtoName}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatCurrency(result.amount)}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {result.virtualStatus}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className="text-sm font-medium text-slate-900 dark:text-white">
                          {formatCurrency(result.virtualAmount)}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                            result.status === 'Disposed'
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                              : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                          }`}
                        >
                          {result.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`text-xs ${
                            result.physicalCourtStatus === 'None'
                              ? 'text-slate-400'
                              : 'text-purple-600 dark:text-purple-400 font-medium'
                          }`}
                        >
                          {result.physicalCourtStatus}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span className={`text-xs font-medium ${result.vehicleImpound ? 'text-red-600 dark:text-red-400' : 'text-slate-400'}`}>
                          {result.vehicleImpound ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            result.documentImpound === 'None'
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                              : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                          }`}
                        >
                          {result.documentImpound}
                        </span>
                      </td>
                      <td className="px-3 py-3 whitespace-nowrap">
                        {result.disposed ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                            <CheckCircle className="h-3 w-3" />
                            Yes
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                            <XCircle className="h-3 w-3" />
                            No
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between items-center mt-6">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {filteredResults.length !== results.length && (
              <span className="mr-2">Showing {filteredResults.length} of {results.length} •</span>
            )}
            {selectedChallans.length === 0 ? (
              'No challans selected'
            ) : (
              <>
                {selectedChallans.length} {selectedChallans.length === 1 ? 'challan' : 'challans'}{' '}
                selected
              </>
            )}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedChallans.length === 0}
              className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              Confirm and move to screen
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
