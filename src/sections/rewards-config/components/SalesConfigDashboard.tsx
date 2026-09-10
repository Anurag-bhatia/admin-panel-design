import { useEffect, useMemo, useState } from 'react'
import { Plus, Pencil, Search, Layers, X, History, ChevronDown } from 'lucide-react'
import rewardsData from '@/../product/sections/rewards-config/data.json'
import type {
  RewardsConfig,
  ChangeLogEntry,
  AllowlistedUser,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigDashboard } from './RewardsConfigDashboard'

type SalesCategory = 'caas' | 'zeroChallans' | 'rto' | 'laas'

interface SalesConfigHistoryEntry {
  amount: number
  changedBy: string
  changedAt: string
}

interface SalesConfigRow {
  id: string
  category: SalesCategory
  service: string
  amount: number
  lastUpdatedBy: string
  lastUpdatedAt: string
  history: SalesConfigHistoryEntry[]
}

const CATEGORY_TABS: { key: SalesCategory; label: string }[] = [
  { key: 'caas', label: 'CAAS' },
  { key: 'zeroChallans', label: 'Zero Challans' },
  { key: 'rto', label: 'RTO' },
  { key: 'laas', label: 'LAAS' },
]

const SEED_HISTORIANS = ['Priya Sharma', 'Arjun Mehta', 'Rohan Kapoor']

const seedHistory = (currentAmount: number, currentAt: string): SalesConfigHistoryEntry[] => {
  const base = new Date(currentAt).getTime()
  const step1 = new Date(base - 45 * 24 * 60 * 60 * 1000).toISOString()
  const step2 = new Date(base - 120 * 24 * 60 * 60 * 1000).toISOString()
  const prev1 = Math.max(0, Math.round(currentAmount * 0.9))
  const prev2 = Math.max(0, Math.round(currentAmount * 0.75))
  return [
    { amount: prev1, changedBy: SEED_HISTORIANS[1], changedAt: step1 },
    { amount: prev2, changedBy: SEED_HISTORIANS[2], changedAt: step2 },
  ]
}

const RAW_ROWS: Omit<SalesConfigRow, 'history'>[] = [
  // CAAS
  { id: 'caas-bulk', category: 'caas', service: 'Bulk Challans', amount: 500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-10' },
  { id: 'caas-ppt', category: 'caas', service: 'Pay per Transaction Challans', amount: 250, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-22' },
  // RTO
  { id: 'rto-rc-renewal', category: 'rto', service: 'RC Renewal', amount: 1200, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-01' },
  { id: 'rto-rc-retrieval', category: 'rto', service: 'RC Retrieval', amount: 900, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-01' },
  { id: 'rto-license-renewal', category: 'rto', service: 'License Renewal', amount: 1000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-06-15' },
  { id: 'rto-license-retrieval', category: 'rto', service: 'License Retrieval', amount: 800, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-06-15' },
  { id: 'rto-fitness-renewal', category: 'rto', service: 'Fitness Renewal', amount: 850, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-05-30' },
  { id: 'rto-fitness-retrieval', category: 'rto', service: 'Fitness Retrieval', amount: 700, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-05-30' },
  { id: 'rto-ownership-transfer', category: 'rto', service: 'Ownership Transfer', amount: 1500, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-05' },
  { id: 'rto-number-updating', category: 'rto', service: 'Number Updating', amount: 600, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-10' },
  // LAAS
  { id: 'laas-oncall', category: 'laas', service: '24×7 On Call Legal Support', amount: 2500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-12' },
  { id: 'laas-onsite', category: 'laas', service: 'On-Site Lawyer Support', amount: 5000, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-05' },
  { id: 'laas-theft', category: 'laas', service: 'Theft', amount: 4000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-08' },
  { id: 'laas-detention', category: 'laas', service: 'Detention', amount: 4500, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-07-02' },
  { id: 'laas-bail', category: 'laas', service: 'Bail', amount: 3500, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-28' },
  { id: 'laas-accidents', category: 'laas', service: 'Accidents', amount: 6000, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-14' },
  { id: 'laas-firs', category: 'laas', service: 'FIRs', amount: 3000, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-20' },
  { id: 'laas-superdari', category: 'laas', service: 'Superdari', amount: 4200, lastUpdatedBy: 'Arjun Mehta', lastUpdatedAt: '2026-06-18' },
  { id: 'laas-impound', category: 'laas', service: 'Vehicle Impounding', amount: 5500, lastUpdatedBy: 'Priya Sharma', lastUpdatedAt: '2026-07-03' },
  { id: 'laas-eway', category: 'laas', service: 'E-Way Bill Issues', amount: 3800, lastUpdatedBy: 'Rohan Kapoor', lastUpdatedAt: '2026-06-25' },
]

const INITIAL_ROWS: SalesConfigRow[] = RAW_ROWS.map((r) => ({
  ...r,
  history: seedHistory(r.amount, r.lastUpdatedAt),
}))

interface ZeroChallanRow {
  id: string
  state: string
  region: string
  offence: string
  amount: number
  lastUpdatedBy: string
  lastUpdatedAt: string
  history: SalesConfigHistoryEntry[]
}

const RAW_ZERO_ROWS: Omit<ZeroChallanRow, 'history'>[] = [
  {
    id: 'zc-mh-signal',
    state: 'Maharashtra',
    region: 'All Regions',
    offence: 'Signal Jump',
    amount: 1000,
    lastUpdatedBy: 'Priya Sharma',
    lastUpdatedAt: '2026-07-14',
  },
  {
    id: 'zc-dl-no-helmet',
    state: 'Delhi',
    region: 'All Regions',
    offence: 'No Helmet',
    amount: 500,
    lastUpdatedBy: 'Arjun Mehta',
    lastUpdatedAt: '2026-07-06',
  },
]

const INITIAL_ZERO_ROWS: ZeroChallanRow[] = RAW_ZERO_ROWS.map((r) => ({
  ...r,
  history: seedHistory(r.amount, r.lastUpdatedAt),
}))

const AVAILABLE_STATES = (rewardsData.states as string[]) ?? []

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString('en-IN')}`

export function SalesConfigDashboard() {
  const [activeCategory, setActiveCategory] = useState<SalesCategory>('caas')
  const [query, setQuery] = useState('')
  const [rowsState, setRowsState] = useState<SalesConfigRow[]>(INITIAL_ROWS)
  const [editingRow, setEditingRow] = useState<SalesConfigRow | null>(null)
  const [historyRow, setHistoryRow] = useState<SalesConfigRow | null>(null)
  const [addingCategory, setAddingCategory] = useState<SalesCategory | null>(null)
  const [caasAddTrigger, setCaasAddTrigger] = useState(0)
  const [zeroRowsState, setZeroRowsState] =
    useState<ZeroChallanRow[]>(INITIAL_ZERO_ROWS)
  const [editingZeroRow, setEditingZeroRow] = useState<ZeroChallanRow | null>(null)
  const [historyZeroRow, setHistoryZeroRow] = useState<ZeroChallanRow | null>(null)
  const [addingZeroChallan, setAddingZeroChallan] = useState(false)

  const categoryCounts = useMemo(() => {
    const counts = CATEGORY_TABS.reduce(
      (acc, tab) => {
        acc[tab.key] = rowsState.filter((r) => r.category === tab.key).length
        return acc
      },
      {} as Record<SalesCategory, number>,
    )
    counts.zeroChallans = zeroRowsState.length
    return counts
  }, [rowsState, zeroRowsState])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return rowsState
      .filter((r) => r.category === activeCategory)
      .filter((r) => (q === '' ? true : r.service.toLowerCase().includes(q)))
  }, [rowsState, activeCategory, query])

  const zeroRows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return zeroRowsState.filter((r) =>
      q === ''
        ? true
        : r.state.toLowerCase().includes(q) ||
          r.region.toLowerCase().includes(q) ||
          r.offence.toLowerCase().includes(q),
    )
  }, [zeroRowsState, query])

  const totalForCategory = categoryCounts[activeCategory]

  const handleSaveAmount = (id: string, amount: number) => {
    setRowsState((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const priorEntry: SalesConfigHistoryEntry = {
          amount: r.amount,
          changedBy: r.lastUpdatedBy,
          changedAt: r.lastUpdatedAt,
        }
        return {
          ...r,
          amount,
          lastUpdatedBy: 'You',
          lastUpdatedAt: new Date().toISOString(),
          history: [priorEntry, ...r.history],
        }
      }),
    )
    setEditingRow(null)
  }

  const isCaas = activeCategory === 'caas'
  const isZeroChallans = activeCategory === 'zeroChallans'

  const handleAddClick = () => {
    if (isCaas) {
      setCaasAddTrigger((n) => n + 1)
    } else if (isZeroChallans) {
      setAddingZeroChallan(true)
    } else {
      setAddingCategory(activeCategory)
    }
  }

  const handleSaveZeroAmount = (id: string, amount: number) => {
    setZeroRowsState((prev) =>
      prev.map((r) => {
        if (r.id !== id) return r
        const priorEntry: SalesConfigHistoryEntry = {
          amount: r.amount,
          changedBy: r.lastUpdatedBy,
          changedAt: r.lastUpdatedAt,
        }
        return {
          ...r,
          amount,
          lastUpdatedBy: 'You',
          lastUpdatedAt: new Date().toISOString(),
          history: [priorEntry, ...r.history],
        }
      }),
    )
    setEditingZeroRow(null)
  }

  const handleAddZeroChallanSubmit = (
    state: string,
    region: string,
    offence: string,
    amount: number,
  ) => {
    const newRow: ZeroChallanRow = {
      id: `zc-${Date.now()}`,
      state,
      region,
      offence,
      amount,
      lastUpdatedBy: 'You',
      lastUpdatedAt: new Date().toISOString(),
      history: [],
    }
    setZeroRowsState((prev) => [...prev, newRow])
    setAddingZeroChallan(false)
  }

  const handleAddSubmit = (category: SalesCategory, name: string, amount: number) => {
    const newRow: SalesConfigRow = {
      id: `${category}-${Date.now()}`,
      category,
      service: name,
      amount,
      lastUpdatedBy: 'You',
      lastUpdatedAt: new Date().toISOString(),
      history: [],
    }
    setRowsState((prev) => [...prev, newRow])
    setAddingCategory(null)
  }

  return (
    <div className="min-h-full bg-slate-50 dark:bg-slate-950">
      {/* Module header */}
      <div>
        <div className="max-w-[1440px] mx-auto px-6 py-5">
          <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
            Configuration
          </h1>
        </div>
      </div>

      {/* Category tabs + Add button */}
      <div className="max-w-[1440px] mx-auto px-6 pt-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveCategory(tab.key)}
                  className={`px-4 py-1.5 text-sm font-medium whitespace-nowrap rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label} ({categoryCounts[tab.key]})
                </button>
              )
            })}
          </div>
          <button
            type="button"
            onClick={handleAddClick}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Add Configuration
          </button>
        </div>
      </div>

      {/* Body */}
      {isCaas ? (
        <RewardsConfigDashboard
          configs={rewardsData.configs as RewardsConfig[]}
          changeLog={rewardsData.changeLog as ChangeLogEntry[]}
          states={rewardsData.states as string[]}
          currentUser={rewardsData.currentUser as AllowlistedUser}
          embedded
          lockedProduct="challanPay"
          addTrigger={caasAddTrigger}
          onAdd={(draft) => console.log('Add CAAS state config:', draft)}
          onUpdate={(id, draft) => console.log('Update CAAS state config:', id, draft)}
        />
      ) : isZeroChallans ? (
        <div className="px-6 py-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4 flex-wrap">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search state, region, offence…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                  />
                </div>
              </div>

              {zeroRows.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <Layers className="w-5 h-5 text-slate-500" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                    {query ? 'No records match your search' : 'No configurations yet'}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    {query
                      ? 'Try clearing the search to see all Zero Challan configurations.'
                      : 'Add a Zero Challan configuration to get started.'}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                        <Th className="pl-5">State</Th>
                        <Th>Region</Th>
                        <Th>Offence</Th>
                        <Th align="right">Amount</Th>
                        <Th className="pr-5">Actions</Th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {zeroRows.map((row) => (
                        <tr
                          key={row.id}
                          className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                        >
                          <td className="py-3 pl-5 pr-3">
                            <button
                              type="button"
                              onClick={() => setEditingZeroRow(row)}
                              className="font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left"
                            >
                              {row.state}
                            </button>
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 text-[13px]">
                            {row.region}
                          </td>
                          <td className="py-3 px-3 text-slate-600 dark:text-slate-300 text-[13px]">
                            {row.offence}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <span className="inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300">
                              {formatCurrency(row.amount)}
                            </span>
                          </td>
                          <td className="py-3 pr-5 pl-3 w-px whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setEditingZeroRow(row)}
                                className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25 transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => setHistoryZeroRow(row)}
                                className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                              >
                                <History className="w-3.5 h-3.5" />
                                <span>History</span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {zeroRows.length > 0 && (
                <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Showing {zeroRows.length} of {totalForCategory} configurations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
      <div className="px-6 py-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
            {/* Toolbar */}
            <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-end gap-4 flex-wrap">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search service…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
                />
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="px-6 py-16 text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5 text-slate-500" />
                </div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {query ? 'No services match your search' : 'No configurations yet'}
                </h3>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {query
                    ? 'Try clearing the search to see all services in this category.'
                    : 'Add a reward configuration for this service category to get started.'}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                      <Th className="pl-5">#</Th>
                      <Th>Service</Th>
                      <Th align="right">Amount</Th>
                      <Th>Last Updated By</Th>
                      <Th className="pr-5">Actions</Th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {rows.map((row, idx) => (
                      <tr
                        key={row.id}
                        className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors"
                      >
                        <td className="py-3 pl-5 pr-3 text-[13px] tabular-nums text-slate-500 dark:text-slate-400">
                          {idx + 1}
                        </td>
                        <td className="py-3 px-3">
                          <button
                            type="button"
                            onClick={() => setEditingRow(row)}
                            className="font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left"
                          >
                            {row.service}
                          </button>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className="inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300">
                            {formatCurrency(row.amount)}
                          </span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-col leading-tight">
                            <span className="text-[13px] text-slate-800 dark:text-slate-200 font-medium">
                              {row.lastUpdatedBy}
                            </span>
                            <span className="text-[11px] text-slate-500 dark:text-slate-400">
                              {formatRelative(row.lastUpdatedAt)}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 pr-5 pl-3 w-px whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => setEditingRow(row)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25 transition-colors"
                            >
                              <Pencil className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setHistoryRow(row)}
                              className="inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <History className="w-3.5 h-3.5" />
                              <span>History</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {rows.length > 0 && (
              <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Showing {rows.length} of {totalForCategory} configurations.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {editingRow && (
        <EditAmountModal
          row={editingRow}
          onClose={() => setEditingRow(null)}
          onSave={handleSaveAmount}
        />
      )}

      {addingCategory && (
        <AddConfigModal
          category={addingCategory}
          onClose={() => setAddingCategory(null)}
          onSave={handleAddSubmit}
        />
      )}

      {historyRow && (
        <ServiceHistoryModal
          row={historyRow}
          onClose={() => setHistoryRow(null)}
        />
      )}

      {editingZeroRow && (
        <EditZeroAmountModal
          row={editingZeroRow}
          onClose={() => setEditingZeroRow(null)}
          onSave={handleSaveZeroAmount}
        />
      )}

      {addingZeroChallan && (
        <AddZeroChallanModal
          existingStates={zeroRowsState.map((r) => r.state)}
          onClose={() => setAddingZeroChallan(false)}
          onSave={handleAddZeroChallanSubmit}
        />
      )}

      {historyZeroRow && (
        <ZeroChallanHistoryModal
          row={historyZeroRow}
          onClose={() => setHistoryZeroRow(null)}
        />
      )}
    </div>
  )
}

function EditAmountModal({
  row,
  onClose,
  onSave,
}: {
  row: SalesConfigRow
  onClose: () => void
  onSave: (id: string, amount: number) => void
}) {
  const [amount, setAmount] = useState<string>(String(row.amount))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = () => {
    const parsed = Number(amount)
    if (amount === '' || isNaN(parsed) || parsed < 0) {
      setError('Please enter a valid amount')
      return
    }
    onSave(row.id, Math.round(parsed))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-amount-title"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2
              id="edit-amount-title"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Edit Amount
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {row.service}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5">
          <label
            htmlFor="amount-input"
            className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
          >
            Amount
          </label>
          <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent">
            <span className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
              ₹
            </span>
            <input
              id="amount-input"
              type="number"
              min={0}
              step="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                if (error) setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              autoFocus
              className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AddConfigModal({
  category,
  onClose,
  onSave,
}: {
  category: SalesCategory
  onClose: () => void
  onSave: (category: SalesCategory, name: string, amount: number) => void
}) {
  const [name, setName] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{ name?: string; amount?: string }>({})

  const categoryLabel =
    CATEGORY_TABS.find((t) => t.key === category)?.label ?? category.toUpperCase()

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = () => {
    const next: { name?: string; amount?: string } = {}
    const trimmed = name.trim()
    if (!trimmed) next.name = 'Please enter a service name'
    const parsed = Number(amount)
    if (amount === '' || isNaN(parsed) || parsed < 0) {
      next.amount = 'Please enter a valid amount'
    }
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    onSave(category, trimmed, Math.round(parsed))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-config-title"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2
              id="add-config-title"
              className="text-base font-semibold text-slate-900 dark:text-white"
            >
              Add Configuration
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {categoryLabel}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label
              htmlFor="add-name-input"
              className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
            >
              Name
            </label>
            <input
              id="add-name-input"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              autoFocus
              placeholder="e.g. New Service"
              className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.name}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="add-amount-input"
              className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5"
            >
              Amount
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent">
              <span className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                ₹
              </span>
              <input
                id="add-amount-input"
                type="number"
                min={0}
                step="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (errors.amount) setErrors((prev) => ({ ...prev, amount: undefined }))
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            {errors.amount && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.amount}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

function Th({
  children,
  align,
  className,
}: {
  children: React.ReactNode
  align?: 'right'
  className?: string
}) {
  return (
    <th
      className={`py-3 px-3 text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${className ?? ''}`}
    >
      {children}
    </th>
  )
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime()
  const now = Date.now()
  const diff = now - then
  const day = 24 * 60 * 60 * 1000
  const days = Math.round(diff / day)
  if (days < 1) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.round(months / 12)
  return `${years}y ago`
}

function formatHistoryDate(iso: string): string {
  const d = new Date(iso)
  const day = d.getDate()
  const month = d.toLocaleString('en-US', { month: 'short' })
  const year = String(d.getFullYear()).slice(-2)
  const hh = d.getHours()
  const mm = String(d.getMinutes()).padStart(2, '0')
  const period = hh >= 12 ? 'PM' : 'AM'
  const hour12 = hh % 12 === 0 ? 12 : hh % 12
  return `${day} ${month} '${year}, ${hour12}:${mm} ${period}`
}

function ServiceHistoryModal({
  row,
  onClose,
}: {
  row: SalesConfigRow
  onClose: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const timeline: (SalesConfigHistoryEntry & { isCurrent: boolean })[] = [
    { amount: row.amount, changedBy: row.lastUpdatedBy, changedAt: row.lastUpdatedAt, isCurrent: true },
    ...row.history.map((h) => ({ ...h, isCurrent: false })),
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <History className="w-[18px] h-[18px] text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                History – {row.service}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Amount change log
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {timeline.length === 1 && row.history.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">No changes recorded yet.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {timeline.map((entry, idx) => (
                <li key={`${entry.changedAt}-${idx}`} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-semibold bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300">
                          {formatCurrency(entry.amount)}
                        </span>
                        {entry.isCurrent && (
                          <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        by <span className="font-medium text-slate-700 dark:text-slate-200">{entry.changedBy}</span>
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatHistoryDate(entry.changedAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function EditZeroAmountModal({
  row,
  onClose,
  onSave,
}: {
  row: ZeroChallanRow
  onClose: () => void
  onSave: (id: string, amount: number) => void
}) {
  const [amount, setAmount] = useState<string>(String(row.amount))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = () => {
    const parsed = Number(amount)
    if (amount === '' || isNaN(parsed) || parsed < 0) {
      setError('Please enter a valid amount')
      return
    }
    onSave(row.id, Math.round(parsed))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Edit Amount
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              {row.state} · {row.region} · {row.offence}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
            Amount
          </label>
          <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent">
            <span className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
              ₹
            </span>
            <input
              type="number"
              min={0}
              step="1"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value)
                if (error) setError(null)
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  handleSubmit()
                }
              }}
              autoFocus
              className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              placeholder="0"
            />
          </div>
          {error && (
            <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

function AddZeroChallanModal({
  existingStates: _existingStates,
  onClose,
  onSave,
}: {
  existingStates: string[]
  onClose: () => void
  onSave: (state: string, region: string, offence: string, amount: number) => void
}) {
  const [state, setState] = useState('')
  const [region, setRegion] = useState('All Regions')
  const [offence, setOffence] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState<{
    state?: string
    region?: string
    offence?: string
    amount?: string
  }>({})

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSubmit = () => {
    const next: {
      state?: string
      region?: string
      offence?: string
      amount?: string
    } = {}
    if (!state) next.state = 'Please select a state'
    const trimmedRegion = region.trim()
    if (!trimmedRegion) next.region = 'Please enter a region'
    const trimmedOffence = offence.trim()
    if (!trimmedOffence) next.offence = 'Please enter an offence'
    const parsed = Number(amount)
    if (amount === '' || isNaN(parsed) || parsed < 0) {
      next.amount = 'Please enter a valid amount'
    }
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    onSave(state, trimmedRegion, trimmedOffence, Math.round(parsed))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-5 py-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Add Configuration
            </h2>
            <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
              Zero Challans
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="px-5 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
              State
            </label>
            <div className="relative">
              <select
                value={state}
                onChange={(e) => {
                  setState(e.target.value)
                  if (errors.state)
                    setErrors((prev) => ({ ...prev, state: undefined }))
                }}
                className={`w-full appearance-none pl-3 pr-9 h-10 text-sm rounded-lg border bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 ${
                  !state
                    ? 'text-slate-400 dark:text-slate-500'
                    : 'text-slate-900 dark:text-white'
                } border-slate-300 dark:border-slate-600`}
              >
                <option value="" disabled>
                  Select a state…
                </option>
                {AVAILABLE_STATES.map((s) => (
                  <option key={s} value={s} className="text-slate-900 dark:text-white">
                    {s}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            </div>
            {errors.state && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.state}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
              Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => {
                setRegion(e.target.value)
                if (errors.region)
                  setErrors((prev) => ({ ...prev, region: undefined }))
              }}
              placeholder="e.g. All Regions"
              className="w-full px-3 h-10 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {errors.region && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.region}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
              Offence
            </label>
            <input
              type="text"
              value={offence}
              onChange={(e) => {
                setOffence(e.target.value)
                if (errors.offence)
                  setErrors((prev) => ({ ...prev, offence: undefined }))
              }}
              placeholder="e.g. Signal Jump"
              className="w-full px-3 h-10 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            {errors.offence && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.offence}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
              Amount
            </label>
            <div className="flex items-center rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 overflow-hidden focus-within:ring-2 focus-within:ring-cyan-500 focus-within:border-transparent">
              <span className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60">
                ₹
              </span>
              <input
                type="number"
                min={0}
                step="1"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  if (errors.amount)
                    setErrors((prev) => ({ ...prev, amount: undefined }))
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleSubmit()
                  }
                }}
                placeholder="0"
                className="w-full px-3 py-2 text-sm bg-transparent text-slate-900 dark:text-white focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
              />
            </div>
            {errors.amount && (
              <p className="mt-1.5 text-xs text-red-600 dark:text-red-400">
                {errors.amount}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

function ZeroChallanHistoryModal({
  row,
  onClose,
}: {
  row: ZeroChallanRow
  onClose: () => void
}) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  const timeline: (SalesConfigHistoryEntry & { isCurrent: boolean })[] = [
    {
      amount: row.amount,
      changedBy: row.lastUpdatedBy,
      changedAt: row.lastUpdatedAt,
      isCurrent: true,
    },
    ...row.history.map((h) => ({ ...h, isCurrent: false })),
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <History className="w-[18px] h-[18px] text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                History – {row.state}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {row.region} · {row.offence}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {timeline.length === 1 && row.history.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No changes recorded yet.
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {timeline.map((entry, idx) => (
                <li key={`${entry.changedAt}-${idx}`} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-semibold bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300">
                          {formatCurrency(entry.amount)}
                        </span>
                        {entry.isCurrent && (
                          <span className="text-[11px] font-medium uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                        by{' '}
                        <span className="font-medium text-slate-700 dark:text-slate-200">
                          {entry.changedBy}
                        </span>
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatHistoryDate(entry.changedAt)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex items-center justify-end gap-2 px-5 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/40 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
