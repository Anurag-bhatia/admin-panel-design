import { useMemo, useRef, useState, useEffect } from 'react'
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
} from 'lucide-react'
import type {
  Coupon,
  CouponChallanType,
  CouponPlatform,
  CouponStatus,
  CouponType,
} from '@/../product/sections/cms/types'

interface CouponListProps {
  coupons: Coupon[]
  onCreate?: () => void
  onEdit?: (id: string) => void
  onView?: (id: string) => void
  onPause?: (id: string) => void
  onResume?: (id: string) => void
  onArchive?: (id: string) => void
  onClone?: (id: string) => void
  onSearch?: (query: string) => void
}

const statusLabels: Record<CouponStatus, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  expired: 'Expired',
  archived: 'Archived',
}

const statusBadgeClass: Record<CouponStatus, string> = {
  draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
  paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
  archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
}

const platformLabels: Record<CouponPlatform, string> = {
  challanpay: 'ChallanPay',
  lots247: 'LOTS247',
}

const challanTypeLabels: Record<CouponChallanType, string> = {
  online: 'Online',
  regularCourt: 'Regular',
  xpressCourt: 'XPress',
}

type SortKey = 'created' | 'expiry' | 'usage'

const perPage = 25

function getEffectiveStatus(coupon: Coupon, now: Date): CouponStatus {
  if (coupon.status === 'archived') return 'archived'
  if (coupon.status === 'expired') return 'expired'
  const end = new Date(coupon.endAt)
  if (end.getTime() < now.getTime()) return 'expired'
  return coupon.status
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatValue(coupon: Coupon): string {
  if (coupon.type === 'flat') return `₹${coupon.value}`
  return `${coupon.value}%`
}

function formatValueSub(coupon: Coupon): string {
  if (coupon.type === 'flat') return 'Flat'
  if (coupon.maxDiscountCap) return `Capped at ₹${coupon.maxDiscountCap}`
  return 'Percentage'
}

function formatUsage(coupon: Coupon): string {
  if (coupon.totalUsageLimit == null) return `${coupon.usageCount} / ∞`
  return `${coupon.usageCount} / ${coupon.totalUsageLimit}`
}

export function CouponList({
  coupons,
  onCreate,
  onEdit,
  onView,
  onPause,
  onResume,
  onArchive,
  onClone,
  onSearch,
}: CouponListProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<CouponStatus | 'all'>('all')
  const [typeFilter, setTypeFilter] = useState<CouponType | 'all'>('all')
  const [platformFilter, setPlatformFilter] = useState<CouponPlatform | 'all'>('all')
  const [challanTypeFilter, setChallanTypeFilter] = useState<CouponChallanType | 'all'>('all')
  const [stateFilter, setStateFilter] = useState<string>('all')
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

  const allStates = useMemo(() => {
    const set = new Set<string>()
    coupons.forEach((c) => c.states.forEach((s) => set.add(s)))
    return Array.from(set).sort()
  }, [coupons])

  const filtered = useMemo(() => {
    return coupons
      .map((c) => ({ ...c, effectiveStatus: getEffectiveStatus(c, now) }))
      .filter((c) => {
        if (searchQuery && !c.code.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (statusFilter !== 'all' && c.effectiveStatus !== statusFilter) return false
        if (typeFilter !== 'all' && c.type !== typeFilter) return false
        if (platformFilter !== 'all' && !c.platforms.includes(platformFilter)) return false
        if (challanTypeFilter !== 'all' && !c.challanTypes.includes(challanTypeFilter))
          return false
        if (stateFilter !== 'all') {
          if (c.states.length === 0) return false
          if (!c.states.includes(stateFilter)) return false
        }
        return true
      })
      .sort((a, b) => {
        const dir = sortDir === 'asc' ? 1 : -1
        if (sortKey === 'usage') return dir * (a.usageCount - b.usageCount)
        if (sortKey === 'expiry')
          return dir * (new Date(a.endAt).getTime() - new Date(b.endAt).getTime())
        return dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
      })
  }, [coupons, searchQuery, statusFilter, typeFilter, platformFilter, challanTypeFilter, stateFilter, sortKey, sortDir, now])

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage))
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage)

  const activeFilterCount =
    (statusFilter !== 'all' ? 1 : 0) +
    (typeFilter !== 'all' ? 1 : 0) +
    (platformFilter !== 'all' ? 1 : 0) +
    (challanTypeFilter !== 'all' ? 1 : 0) +
    (stateFilter !== 'all' ? 1 : 0)

  const clearFilters = () => {
    setStatusFilter('all')
    setTypeFilter('all')
    setPlatformFilter('all')
    setChallanTypeFilter('all')
    setStateFilter('all')
    setCurrentPage(1)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Coupons</h1>
        <button
          onClick={onCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Create Coupon
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="relative w-full sm:flex-1 sm:max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by code…"
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <FilterSelect
              label="Status"
              value={statusFilter}
              onChange={(v) => {
                setStatusFilter(v as CouponStatus | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All statuses' },
                { value: 'draft', label: 'Draft' },
                { value: 'active', label: 'Active' },
                { value: 'paused', label: 'Paused' },
                { value: 'expired', label: 'Expired' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            <FilterSelect
              label="Type"
              value={typeFilter}
              onChange={(v) => {
                setTypeFilter(v as CouponType | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All types' },
                { value: 'flat', label: 'Flat' },
                { value: 'percentage', label: 'Percentage' },
              ]}
            />
            <FilterSelect
              label="Platform"
              value={platformFilter}
              onChange={(v) => {
                setPlatformFilter(v as CouponPlatform | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All platforms' },
                { value: 'challanpay', label: 'ChallanPay' },
                { value: 'lots247', label: 'LOTS247' },
              ]}
            />
            <FilterSelect
              label="Challan type"
              value={challanTypeFilter}
              onChange={(v) => {
                setChallanTypeFilter(v as CouponChallanType | 'all')
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All challan types' },
                { value: 'online', label: 'Online' },
                { value: 'regularCourt', label: 'Regular Court' },
                { value: 'xpressCourt', label: 'XPress Court' },
              ]}
            />
            <FilterSelect
              label="State"
              value={stateFilter}
              onChange={(v) => {
                setStateFilter(v)
                setCurrentPage(1)
              }}
              options={[
                { value: 'all', label: 'All states' },
                ...allStates.map((s) => ({ value: s, label: s })),
              ]}
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
                  Code
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Value
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Challan Type
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Platform
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Location
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Status
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Validity
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Usage
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
              {paginated.map((coupon) => {
                const effective = coupon.effectiveStatus
                const canEdit = effective === 'draft'
                const canPause = effective === 'active'
                const canResume = effective === 'paused'
                const canArchive = effective === 'draft' || effective === 'paused'
                const isTerminal = effective === 'expired' || effective === 'archived'
                return (
                  <tr
                    key={coupon.id}
                    onClick={() => onView?.(coupon.id)}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3.5">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {coupon.code}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-medium">{formatValue(coupon)}</span>
                        <span className="text-xs text-slate-400">{formatValueSub(coupon)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {coupon.challanTypes.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {challanTypeLabels[t]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex flex-wrap gap-1">
                        {coupon.platforms.map((p) => (
                          <span
                            key={p}
                            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${
                              p === 'challanpay'
                                ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                : 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                            }`}
                          >
                            {platformLabels[p]}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300">
                      {coupon.states.length === 0 ? (
                        <span className="text-slate-400">All states</span>
                      ) : coupon.states.length <= 2 ? (
                        coupon.states.join(', ')
                      ) : (
                        <span>
                          {coupon.states.slice(0, 2).join(', ')}{' '}
                          <span className="text-slate-400">+{coupon.states.length - 2}</span>
                        </span>
                      )}
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
                        <span>{formatDate(coupon.startAt)}</span>
                        <span className="text-xs text-slate-400">
                          → {formatDate(coupon.endAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap">
                      {formatUsage(coupon)}
                    </td>
                    <td className="px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span>{coupon.createdBy}</span>
                        <span className="text-xs text-slate-400">
                          {formatDate(coupon.createdAt)}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <div className="relative" ref={openMenuId === coupon.id ? menuRef : null}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuId((prev) => (prev === coupon.id ? null : coupon.id))
                          }}
                          className="p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {openMenuId === coupon.id && (
                          <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-20">
                            <MenuItem
                              icon={<Eye className="w-3.5 h-3.5" />}
                              label="View details"
                              onClick={() => {
                                setOpenMenuId(null)
                                onView?.(coupon.id)
                              }}
                            />
                            {canEdit && (
                              <MenuItem
                                icon={<Pencil className="w-3.5 h-3.5" />}
                                label="Edit"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onEdit?.(coupon.id)
                                }}
                              />
                            )}
                            {canPause && (
                              <MenuItem
                                icon={<Pause className="w-3.5 h-3.5" />}
                                label="Pause"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onPause?.(coupon.id)
                                }}
                              />
                            )}
                            {canResume && (
                              <MenuItem
                                icon={<Play className="w-3.5 h-3.5" />}
                                label="Resume"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onResume?.(coupon.id)
                                }}
                              />
                            )}
                            {canArchive && (
                              <MenuItem
                                icon={<Archive className="w-3.5 h-3.5" />}
                                label="Archive"
                                onClick={() => {
                                  setOpenMenuId(null)
                                  onArchive?.(coupon.id)
                                }}
                              />
                            )}
                            <MenuItem
                              icon={<Copy className="w-3.5 h-3.5" />}
                              label="Clone"
                              onClick={() => {
                                setOpenMenuId(null)
                                onClone?.(coupon.id)
                              }}
                            />
                            {isTerminal && (
                              <div className="px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-700 mt-1">
                                Read-only — no further actions.
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
                  <td colSpan={10} className="px-4 py-12 text-center text-sm text-slate-400">
                    No coupons match the current filters.
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
    { key: 'usage', dir: 'desc', label: 'Most used' },
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
        <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30">
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
