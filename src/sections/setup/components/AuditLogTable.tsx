import { useMemo, useState } from 'react'
import type { AuditEntry, AuditAction, ConfigArea } from '@/../product/sections/setup/types'

interface AuditLogTableProps {
  auditEntries: AuditEntry[]
  searchQuery: string
}

function formatDateTime(dateString: string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(dateString))
}

const ACTION_STYLES: Record<AuditAction, { label: string; classes: string }> = {
  created: {
    label: 'Created',
    classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  updated: {
    label: 'Updated',
    classes: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  },
  deleted: {
    label: 'Deleted',
    classes: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  },
  value_added: {
    label: 'Value Added',
    classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  },
  value_deactivated: {
    label: 'Value Deactivated',
    classes: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  },
  reordered: {
    label: 'Reordered',
    classes: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  },
}

const AREA_STYLES: Record<ConfigArea, string> = {
  Services: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  'Price Categories': 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
  Departments: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  Designations: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
  Masters: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  Geographic: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
}

const ALL_AREAS: ConfigArea[] = ['Services', 'Price Categories', 'Departments', 'Designations', 'Masters', 'Geographic']
const ALL_ACTIONS: AuditAction[] = ['created', 'updated', 'deleted', 'value_added', 'value_deactivated', 'reordered']

export function AuditLogTable({ auditEntries, searchQuery }: AuditLogTableProps) {
  const [areaFilter, setAreaFilter] = useState<ConfigArea | 'all'>('all')
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all')
  const [userFilter, setUserFilter] = useState<string>('all')
  const [showFilters, setShowFilters] = useState(false)

  const uniqueUsers = useMemo(
    () => [...new Set(auditEntries.map((e) => e.performedBy))].sort(),
    [auditEntries]
  )

  const hasActiveFilters = areaFilter !== 'all' || actionFilter !== 'all' || userFilter !== 'all'

  const clearFilters = () => {
    setAreaFilter('all')
    setActionFilter('all')
    setUserFilter('all')
  }

  const filtered = useMemo(() => {
    let result = [...auditEntries].sort(
      (a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime()
    )

    if (areaFilter !== 'all') {
      result = result.filter((e) => e.area === areaFilter)
    }
    if (actionFilter !== 'all') {
      result = result.filter((e) => e.action === actionFilter)
    }
    if (userFilter !== 'all') {
      result = result.filter((e) => e.performedBy === userFilter)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (e) =>
          e.recordName.toLowerCase().includes(q) ||
          e.area.toLowerCase().includes(q) ||
          e.performedBy.toLowerCase().includes(q) ||
          (e.field && e.field.toLowerCase().includes(q))
      )
    }
    return result
  }, [auditEntries, areaFilter, actionFilter, userFilter, searchQuery])

  return (
    <div>
      {/* Filter bar */}
      <div className="px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            showFilters || hasActiveFilters
              ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400'
              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
          }`}
        >
          Filters
          {hasActiveFilters && (
            <span className="inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-cyan-600 text-white">
              {[areaFilter, actionFilter, userFilter].filter((f) => f !== 'all').length}
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          >
            Clear
          </button>
        )}
        <span className="text-xs text-slate-400 dark:text-slate-500 ml-auto">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      {/* Filter dropdowns */}
      {showFilters && (
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Area</label>
            <select
              value={areaFilter}
              onChange={(e) => setAreaFilter(e.target.value as ConfigArea | 'all')}
              className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Areas</option>
              {ALL_AREAS.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">Action</label>
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value as AuditAction | 'all')}
              className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Actions</option>
              {ALL_ACTIONS.map((a) => (
                <option key={a} value={a}>{ACTION_STYLES[a].label}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs font-medium text-slate-500 dark:text-slate-400">User</label>
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              <option value="all">All Users</option>
              {uniqueUsers.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3">
            <span className="text-lg text-slate-400">0</span>
          </div>
          <p className="font-medium">No audit entries found</p>
          <p className="text-sm mt-1">
            {searchQuery || hasActiveFilters
              ? 'Try adjusting your search or filters'
              : 'Configuration changes will appear here'}
          </p>
        </div>
      ) : (
        <table className="w-full">
          <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                When
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Area
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Action
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Record
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Change
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((entry) => {
              const actionStyle = ACTION_STYLES[entry.action]
              const areaStyle = AREA_STYLES[entry.area] || 'bg-slate-100 text-slate-600'

              return (
                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-4 py-3">
                    <p className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {formatDateTime(entry.performedAt)}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${areaStyle}`}>
                      {entry.area}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${actionStyle.classes}`}>
                      {actionStyle.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{entry.recordName}</p>
                  </td>
                  <td className="px-4 py-3">
                    {entry.oldValue || entry.newValue ? (
                      <div className="flex items-center gap-1.5 text-xs">
                        {entry.oldValue && (
                          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 line-through">
                            {entry.oldValue}
                          </span>
                        )}
                        {entry.oldValue && entry.newValue && (
                          <span className="text-slate-400 shrink-0">&rarr;</span>
                        )}
                        {entry.newValue && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400">
                            {entry.newValue}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 dark:text-slate-500">—</span>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </div>
  )
}
