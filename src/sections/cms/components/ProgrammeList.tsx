import { useEffect, useMemo, useRef, useState } from 'react'
import {
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  MoreVertical,
  Pencil,
  Pause,
  Play,
  Archive,
  Copy,
  Eye,
  X,
  Calendar,
} from 'lucide-react'
import type {
  Programme,
  ProgrammeStatus,
  ProgrammeType,
  WalletPermissions,
} from '@/../product/sections/cms/types'
import { defaultWalletPermissions } from '@/../product/sections/cms/types'

interface ProgrammeListProps {
  programmes: Programme[]
  permissions?: WalletPermissions
  onCreate?: () => void
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  onPauseIssuing?: (id: string) => void
  onPauseRedemption?: (id: string) => void
  onResume?: (id: string) => void
  onArchive?: (id: string) => void
  onClone?: (id: string) => void
  onSearch?: (query: string) => void
}

const statusLabels: Record<ProgrammeStatus, string> = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  active: 'Active',
  paused: 'Paused',
  exhausted: 'Exhausted',
  expired: 'Expired',
  archived: 'Archived',
}

const statusBadgeClass: Record<ProgrammeStatus, string> = {
  draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  scheduled: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  exhausted: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
  expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
}

const typeLabels: Record<ProgrammeType, string> = {
  firstTimeCheck: 'First-time check',
  postPaymentReward: 'Post-payment reward',
  influencer: 'Influencer',
  corporate: 'Corporate',
  specificCustomers: 'Specific customers',
}

type SortKey = 'created' | 'expiry' | 'budgetUsed'

const perPage = 25

function getEffectiveStatus(p: Programme, now: Date): ProgrammeStatus {
  if (p.status === 'archived') return 'archived'
  if (p.status === 'expired') return 'expired'
  if (p.status === 'exhausted') return 'exhausted'
  const end = new Date(p.endAt).getTime()
  const start = new Date(p.startAt).getTime()
  const t = now.getTime()
  if (t > end) return 'expired'
  if (p.coinsIssued >= p.hardStopCoins) return 'exhausted'
  if (p.status === 'scheduled' && t >= start) return 'active'
  if (p.status === 'active' && t < start) return 'scheduled'
  return p.status
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatCoins(n: number): string {
  return n.toLocaleString('en-IN')
}

function budgetPercent(p: Programme): number {
  if (p.budgetCoins === 0) return 0
  return Math.min(100, Math.round((p.coinsIssued / p.budgetCoins) * 100))
}

export function ProgrammeList({
  programmes,
  permissions = defaultWalletPermissions,
  onCreate,
  onEdit,
  onView,
  onPauseIssuing,
  onPauseRedemption,
  onResume,
  onArchive,
  onClone,
  onSearch,
}: ProgrammeListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ProgrammeStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<ProgrammeType | 'all'>('all')
  const [startDateFilter, setStartDateFilter] = useState<string>('')
  const [endDateFilter, setEndDateFilter] = useState<string>('')
  const [sortKey, setSortKey] = useState<SortKey>('created')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [filtersOpen, setFiltersOpen] = useState(false)

  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!openMenuId) return
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openMenuId])

  const now = new Date()

  const filtered = useMemo(() => {
    return programmes
      .map((p) => ({ ...p, effectiveStatus: getEffectiveStatus(p, now) }))
      .filter((p) => {
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          if (
            !p.name.toLowerCase().includes(q) &&
            !p.code.toLowerCase().includes(q)
          )
            return false
        }
        if (statusFilter !== 'all' && p.effectiveStatus !== statusFilter) return false
        if (typeFilter !== 'all' && p.type !== typeFilter) return false
        if (startDateFilter) {
          if (new Date(p.startAt).getTime() < new Date(startDateFilter).getTime())
            return false
        }
        if (endDateFilter) {
          if (new Date(p.endAt).getTime() > new Date(endDateFilter).getTime())
            return false
        }
        return true
      })
      .sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1
        if (sortKey === 'budgetUsed') return dir * (budgetPercent(a) - budgetPercent(b))
        if (sortKey === 'expiry')
          return dir * (new Date(a.endAt).getTime() - new Date(b.endAt).getTime())
        return dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      })
  }, [programmes, searchQuery, statusFilter, typeFilter, startDateFilter, endDateFilter, sortKey, sortDir, now])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (typeFilter !== 'all' ? 1 : 0) +
    (startDateFilter ? 1 : 0) +
    (endDateFilter ? 1 : 0)

  const clearFilters = () => {
    setStatusFilter('all')
    setTypeFilter('all')
    setStartDateFilter('')
    setEndDateFilter('')
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Wallet Programmes</h1>
        {permissions.createProgramme && (
          <button
            onClick={onCreate}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Create Programme
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:flex-1 sm:max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or code…"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1)
              onSearch?.(e.target.value)
            }}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
              filtersOpen || activeFilterCount > 0
                ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white">
                {activeFilterCount}
              </span>
            )}
          </button>

          <SortDropdown
            sortKey={sortKey}
            sortDir={sortDir}
            onChange={(key, dir) => {
              setSortKey(key)
              setSortDir(dir)
            }}
          />
        </div>
      </div>

      {filtersOpen && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v as ProgrammeStatus | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'draft', label: 'Draft' },
                { value: 'scheduled', label: 'Scheduled' },
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'exhausted', label: 'Exhausted' },
                { value: 'expired', label: 'Expired' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            <FilterSelect
              label="Type"
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v as ProgrammeType | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All types' },
                { value: 'firstTimeCheck', label: 'First-time check' },
                { value: 'postPaymentReward', label: 'Post-payment reward' },
                { value: 'influencer', label: 'Influencer' },
                { value: 'corporate', label: 'Corporate' },
                { value: 'specificCustomers', label: 'Specific customers' },
              ]}
            />
            <DateInput
              label="Start on or after"
              value={startDateFilter}
              onChange={(v) => {
                setStartDateFilter(v)
                setCurrentPage(1)
              }}
            />
            <DateInput
              label="End on or before"
              value={endDateFilter}
              onChange={(v) => {
                setEndDateFilter(v)
                setCurrentPage(1)
              }}
            />
          </div>
          {activeFilterCount > 0 && (
            <div className="flex items-center justify-end mt-3">
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-visible">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Name & Code
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Validity
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 min-w-[180px]">
                  Budget Used
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Created
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-20">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {paginated.map((p) => {
                const effective = p.effectiveStatus
                const canEdit = effective === 'draft' && permissions.editDraftProgramme
                const canEditLive =
                  (effective === 'active' || effective === 'scheduled' || effective === 'paused') &&
                  permissions.editDraftProgramme
                const canPause = effective === 'active' && permissions.pauseResumeIssuing
                const canPauseRedemption = effective === 'active' && permissions.pauseResumeRedemption
                const canResume =
                  effective === 'paused' &&
                  (permissions.pauseResumeIssuing || permissions.pauseResumeRedemption)
                const canArchive =
                  (effective === 'draft' ||
                    effective === 'scheduled' ||
                    effective === 'paused' ||
                    effective === 'exhausted') &&
                  permissions.archiveProgramme
                const canClone = permissions.cloneProgramme
                const isTerminal =
                  effective === 'expired' || effective === 'archived' || effective === 'exhausted'
                const pct = budgetPercent(p)
                return (
                  <tr
                    key={p.id}
                    onClick={() => onView?.(p.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-white">
                          {p.name}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {p.code}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      {typeLabels[p.type]}
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${statusBadgeClass[effective]}`}
                      >
                        {statusLabels[effective]}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{formatDate(p.startAt)}</span>
                        <span className="text-xs text-slate-400">
                          → {formatDate(p.endAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 min-w-[180px]">
                      <BudgetBar
                        percent={pct}
                        issued={p.coinsIssued}
                        budget={p.budgetCoins}
                        alertLevel={p.alertLevelPercent}
                      />
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{p.createdBy}</span>
                        <span className="text-xs text-slate-400">
                          {formatDate(p.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <div className="relative" ref={openMenuId === p.id ? menuRef : null}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuId((prev) => (prev === p.id ? null : p.id))
                          }}
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === p.id && (
                          <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-20">
                            <MenuItem
                              icon={<Eye className="w-3.5 h-3.5" />}
                              label="View details"
                              onClick={() => {
                                setOpenMenuId(null)
                                onView?.(p.id)
                              }}
                            />
                            {(canEdit || canEditLive) && (
                              <MenuItem
                                icon={<Pencil className="w-3.5 h-3.5" />}
                                label={canEdit ? 'Edit' : 'Edit (saves new version)'}
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onEdit?.(p.id)
                                }}
                              />
                            )}
                            {canPause && (
                              <MenuItem
                                icon={<Pause className="w-3.5 h-3.5" />}
                                label="Pause issuing"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onPauseIssuing?.(p.id)
                                }}
                              />
                            )}
                            {canPauseRedemption && (
                              <MenuItem
                                icon={<Pause className="w-3.5 h-3.5" />}
                                label="Pause redemption"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onPauseRedemption?.(p.id)
                                }}
                              />
                            )}
                            {canResume && (
                              <MenuItem
                                icon={<Play className="w-3.5 h-3.5" />}
                                label="Resume"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onResume?.(p.id)
                                }}
                              />
                            )}
                            {canArchive && (
                              <MenuItem
                                icon={<Archive className="w-3.5 h-3.5" />}
                                label="Archive"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onArchive?.(p.id)
                                }}
                              />
                            )}
                            {canClone && (
                              <MenuItem
                                icon={<Copy className="w-3.5 h-3.5" />}
                                label="Clone"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onClone?.(p.id)
                                }}
                              />
                            )}
                            {isTerminal && (
                              <div className="px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-700 mt-1">
                                Read-only — issuing has ended.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {paginated.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-slate-400">
                    No programmes match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Showing {(currentPage - 1) * perPage + 1}–
              {Math.min(currentPage * perPage, filtered.length)} of {filtered.length}
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &lt;
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2.5 py-1.5 text-sm rounded ${
                      page === currentPage
                        ? 'bg-cyan-500 text-white'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function BudgetBar({
  percent,
  issued,
  budget,
  alertLevel,
}: {
  percent: number
  issued: number
  budget: number
  alertLevel?: number
}) {
  const isAlert = alertLevel != null && percent >= alertLevel
  const isFull = percent >= 100
  const barColor = isFull
    ? 'bg-red-500'
    : isAlert
    ? 'bg-amber-500'
    : 'bg-cyan-500'
  return (
    <div className="flex flex-col gap-1 min-w-[160px]">
      <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
        <span className="font-medium">{formatCoins(issued)} / {formatCoins(budget)}</span>
        <span className="text-slate-400">{percent}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}

function SortDropdown({
  sortKey,
  sortDir,
  onChange,
}: {
  sortKey: SortKey
  sortDir: 'asc' | 'desc'
  onChange: (key: SortKey, dir: 'asc' | 'desc') => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const options: { key: SortKey; dir: 'asc' | 'desc'; label: string }[] = [
    { key: 'created', dir: 'desc', label: 'Newest' },
    { key: 'expiry', dir: 'asc', label: 'Expiring soon' },
    { key: 'budgetUsed', dir: 'desc', label: 'Highest budget used' },
  ]

  const current =
    options.find((o) => o.key === sortKey && o.dir === sortDir) ??
    options.find((o) => o.key === sortKey) ??
    options[0]

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${
          open
            ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
        }`}
      >
        <ArrowUpDown className="w-4 h-4" />
        Sort: {current.label}
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30">
          {options.map((opt) => {
            const isActive = opt.key === sortKey && opt.dir === sortDir
            return (
              <button
                key={`${opt.key}-${opt.dir}`}
                onClick={() => {
                  onChange(opt.key, opt.dir)
                  setOpen(false)
                }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                {opt.label}
                {isActive && <span className="text-xs">✓</span>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</span>
      <div className="relative">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full pl-10 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
        />
      </div>
    </label>
  )
}

function MenuItem({
  icon,
  label,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
    >
      {icon}
      {label}
    </button>
  )
}
