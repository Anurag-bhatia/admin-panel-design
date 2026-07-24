import { useMemo, useState } from 'react'
import { Search, Pencil, History, Layers } from 'lucide-react'
import type { RewardsConfig } from '@/../product/sections/rewards-config/types'
import { StatusBadge } from './StatusBadge'

interface RewardsConfigTableProps {
  configs: RewardsConfig[]
  onEdit: (id: string) => void
  onHistory: (id: string) => void
  onAdd: () => void
}

type StatusFilter = 'all' | 'active' | 'inactive'

export function RewardsConfigTable({
  configs,
  onEdit,
  onHistory,
  onAdd,
}: RewardsConfigTableProps) {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(
    () => ({
      all: configs.length,
      active: configs.filter((c) => c.status === 'active').length,
      inactive: configs.filter((c) => c.status === 'inactive').length,
    }),
    [configs],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return configs
      .filter((c) => (filter === 'all' ? true : c.status === filter))
      .filter((c) =>
        q === '' ? true : c.state.toLowerCase().includes(q),
      )
  }, [configs, filter, query])

  return (
    <div className="max-w-[1440px] mx-auto">
      {/* Table card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <FilterChip
              label="All"
              count={counts.all}
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            />
            <FilterChip
              label="Active"
              count={counts.active}
              active={filter === 'active'}
              onClick={() => setFilter('active')}
            />
            <FilterChip
              label="Inactive"
              count={counts.inactive}
              active={filter === 'inactive'}
              onClick={() => setFilter('inactive')}
            />
          </div>

          <div className="flex items-center gap-2 flex-1 min-w-0 sm:justify-end">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search state…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <EmptyState
            hasQuery={query !== '' || filter !== 'all'}
            onAdd={onAdd}
            onReset={() => {
              setQuery('')
              setFilter('all')
            }}
          />
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40">
                  <Th className="pl-5">#</Th>
                  <Th>State</Th>
                  <Th>Region</Th>
                  <Th align="right">Ops %</Th>
                  <Th align="right">Margin %</Th>
                  <Th align="right">CV %</Th>
                  <Th align="right">NCV %</Th>
                  <Th align="right" computed>
                    <span className="block leading-tight">Max CV</span>
                    <span className="block leading-tight">Reward %</span>
                  </Th>
                  <Th align="right" computed>
                    <span className="block leading-tight">Max NCV</span>
                    <span className="block leading-tight">Reward %</span>
                  </Th>
                  <Th>Status</Th>
                  <Th>Last Updated By</Th>
                  <Th align="right" className="pr-5">
                    Actions
                  </Th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filtered.map((cfg, idx) => (
                  <Row
                    key={cfg.id}
                    index={idx + 1}
                    config={cfg}
                    onEdit={() => onEdit(cfg.id)}
                    onHistory={() => onHistory(cfg.id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer meta */}
        {filtered.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Showing {filtered.length} of {configs.length} configurations.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ---------- Sub-components ----------

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string
  count: number
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
        active
          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      {label}
      <span
        className={`px-1.5 py-0.5 text-[10px] rounded-full tabular-nums ${
          active
            ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900'
            : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
        }`}
      >
        {count}
      </span>
    </button>
  )
}

function Th({
  children,
  align,
  className,
  computed,
}: {
  children: React.ReactNode
  align?: 'right'
  className?: string
  computed?: boolean
}) {
  return (
    <th
      className={`py-3 px-3 text-[10px] font-semibold uppercase tracking-wider ${
        align === 'right' ? 'text-right' : 'text-left'
      } ${
        computed
          ? 'text-cyan-700 dark:text-cyan-400'
          : 'text-slate-500 dark:text-slate-400'
      } ${className ?? ''}`}
    >
      {children}
    </th>
  )
}

function Row({
  index,
  config,
  onEdit,
  onHistory,
}: {
  index: number
  config: RewardsConfig
  onEdit: () => void
  onHistory: () => void
}) {
  const maxCv = config.marginPct - config.lawyeredCvPct
  const maxNcv = config.marginPct - config.lawyeredNcvPct

  return (
    <tr className="group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
      <td className="py-3 pl-5 pr-3 text-[13px] tabular-nums text-slate-500 dark:text-slate-400">
        {index}
      </td>
      <td className="py-3 px-3">
        <button
          type="button"
          onClick={onEdit}
          className="font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left"
        >
          {config.state}
        </button>
      </td>
      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[13px]">
        {config.region}
      </td>
      <NumCell value={config.operationsCostPct} />
      <NumCell value={config.marginPct} muted />
      <NumCell value={config.lawyeredCvPct} />
      <NumCell value={config.lawyeredNcvPct} />
      <NumCell value={maxCv} computed />
      <NumCell value={maxNcv} computed />
      <td className="py-3 px-3">
        <StatusBadge status={config.status} />
      </td>
      <td className="py-3 px-3">
        <div className="flex flex-col leading-tight">
          <span className="text-[13px] text-slate-800 dark:text-slate-200 font-medium">
            {config.lastUpdatedBy}
          </span>
          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            {formatRelative(config.lastUpdatedAt)}
          </span>
        </div>
      </td>
      <td className="py-3 pr-5 pl-3">
        <div className="flex items-center justify-end gap-1">
          <ActionButton
            icon={<Pencil className="w-3.5 h-3.5" />}
            label="Edit"
            onClick={onEdit}
            primary
          />
          <ActionButton
            icon={<History className="w-3.5 h-3.5" />}
            label="History"
            onClick={onHistory}
          />
        </div>
      </td>
    </tr>
  )
}

function NumCell({
  value,
  computed,
  muted,
}: {
  value: number
  computed?: boolean
  muted?: boolean
}) {
  return (
    <td className="py-3 px-3 text-right">
      <span
        className={`inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium ${
          computed
            ? 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300'
            : muted
              ? 'text-slate-500 dark:text-slate-400'
              : 'text-slate-800 dark:text-slate-200'
        }`}
      >
        {value}%
      </span>
    </td>
  )
}

function ActionButton({
  icon,
  label,
  onClick,
  primary,
}: {
  icon: React.ReactNode
  label: string
  onClick: () => void
  primary?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md transition-colors ${
        primary
          ? 'text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

function EmptyState({
  hasQuery,
  onAdd,
  onReset,
}: {
  hasQuery: boolean
  onAdd: () => void
  onReset: () => void
}) {
  return (
    <div className="px-6 py-16 text-center">
      <div className="mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
        <Layers className="w-5 h-5 text-slate-500" />
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
        {hasQuery ? 'No configurations match your filters' : 'No configurations yet'}
      </h3>
      <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        {hasQuery
          ? 'Try clearing filters or search terms to see all state configurations.'
          : 'Add a reward configuration for a state to define the Ops Cost, Margin, and Lawyered margins that drive the max reward passed to users.'}
      </p>
      <div className="mt-5 flex items-center justify-center gap-2">
        {hasQuery ? (
          <button
            type="button"
            onClick={onReset}
            className="px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Reset filters
          </button>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            Add your first configuration
          </button>
        )}
      </div>
    </div>
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
