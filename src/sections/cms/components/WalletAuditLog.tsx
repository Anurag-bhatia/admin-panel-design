import { useMemo, useState } from 'react'
import { Search, Download } from 'lucide-react'
import type { AuditAction, AuditLogEntry, WalletPermissions } from '@/../product/sections/cms/types'
import { defaultWalletPermissions } from '@/../product/sections/cms/types'

interface WalletAuditLogProps {
  entries: AuditLogEntry[]
  permissions?: WalletPermissions
}

const actionLabels: Record<AuditAction, string> = {
  created: 'Created',
  edited: 'Edited',
  activated: 'Activated',
  scheduled: 'Scheduled',
  issuingPaused: 'Issuing paused',
  issuingResumed: 'Issuing resumed',
  redemptionPaused: 'Redemption paused',
  redemptionResumed: 'Redemption resumed',
  archived: 'Archived',
  cloned: 'Cloned',
  uploadProcessed: 'Upload processed',
  exported: 'Exported',
}

const actionBadge: Record<AuditAction, string> = {
  created: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  edited: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  activated: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
  scheduled: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
  issuingPaused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  issuingResumed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  redemptionPaused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
  redemptionResumed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
  cloned: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
  uploadProcessed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
  exported: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function WalletAuditLog({ entries, permissions = defaultWalletPermissions }: WalletAuditLogProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [actionFilter, setActionFilter] = useState<AuditAction | 'all'>('all')
  const [actorFilter, setActorFilter] = useState<string>('all')

  const actors = useMemo(() => {
    return Array.from(new Set(entries.map((e) => e.actorName))).sort()
  }, [entries])

  const filtered = useMemo(() => {
    return entries
      .filter((e) => {
        if (actionFilter !== 'all' && e.action !== actionFilter) return false
        if (actorFilter !== 'all' && e.actorName !== actorFilter) return false
        if (searchQuery) {
          const q = searchQuery.toLowerCase()
          if (
            !e.details.toLowerCase().includes(q) &&
            !(e.programmeCode ?? '').toLowerCase().includes(q) &&
            !e.actorName.toLowerCase().includes(q)
          )
            return false
        }
        return true
      })
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  }, [entries, searchQuery, actionFilter, actorFilter])

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Audit Log</h1>
        {permissions.exportData && (
          <button className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search details, code or user…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
          />
        </div>
        <select
          value={actionFilter}
          onChange={(e) => setActionFilter(e.target.value as AuditAction | 'all')}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
        >
          <option value="all">All actions</option>
          {(Object.keys(actionLabels) as AuditAction[]).map((a) => (
            <option key={a} value={a}>
              {actionLabels[a]}
            </option>
          ))}
        </select>
        <select
          value={actorFilter}
          onChange={(e) => setActorFilter(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200"
        >
          <option value="all">All users</option>
          {actors.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Action
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  User
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Timestamp
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Programme
                </th>
                <th className="text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filtered.map((e) => (
                <tr key={e.id}>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${actionBadge[e.action]}`}
                    >
                      {actionLabels[e.action]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap">
                    {e.actorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap">
                    {formatTime(e.timestamp)}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200 font-mono whitespace-nowrap">
                    {e.programmeCode ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700 dark:text-slate-200">
                    {e.details}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-slate-400">
                    No entries match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
