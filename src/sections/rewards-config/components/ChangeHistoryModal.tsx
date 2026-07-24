import { X, History, ArrowRight, PlusCircle, Pencil } from 'lucide-react'
import type { ChangeLogEntry } from '@/../product/sections/rewards-config/types'

interface ChangeHistoryModalProps {
  state: string
  entries: ChangeLogEntry[]
  onClose: () => void
}

const FIELD_LABELS: Record<string, string> = {
  operationsCostPct: 'Operations Cost %',
  marginPct: 'Margin %',
  lawyeredCvPct: 'Lawyered CV %',
  lawyeredNcvPct: 'Lawyered NCV %',
  status: 'Status',
}

function formatDate(iso: string) {
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

function formatValue(field: string, raw: unknown): string {
  if (raw === undefined || raw === null || raw === '') return '—'
  if (field === 'status') {
    const v = String(raw)
    return v.charAt(0).toUpperCase() + v.slice(1)
  }
  return `${raw}%`
}

export function ChangeHistoryModal({ state, entries, onClose }: ChangeHistoryModalProps) {
  const sorted = [...entries].sort(
    (a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime(),
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0">
              <History className="w-[18px] h-[18px] text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white">
                History - {state}
              </h2>
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

        {/* Log */}
        <div className="flex-1 overflow-y-auto">
          {sorted.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">
                No changes recorded yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {sorted.map((entry, idx) => (
                <LogRow entry={entry} first={idx === 0} key={entry.id} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

function LogRow({ entry, first }: { entry: ChangeLogEntry; first: boolean }) {
  const isCreate = entry.action === 'created'
  const Icon = isCreate ? PlusCircle : Pencil

  return (
    <div className="px-6 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
      <div className="flex items-start gap-3">
        <div
          className={`flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5 ${
            isCreate
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'
          }`}
        >
          <Icon className="w-3.5 h-3.5" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {isCreate ? 'Initial creation' : 'Updated'}
              </span>
              {first && (
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400">
                  Current
                </span>
              )}
            </div>
            <div className="flex flex-col items-end leading-tight">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                {formatDate(entry.changedAt)}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                by{' '}
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {entry.changedBy}
                </span>
              </span>
            </div>
          </div>

          {/* Field changes */}
          <div className="mt-0.5 space-y-0.5">
            {entry.fieldsChanged.map((field) => (
              <div
                key={field}
                className="flex items-center gap-2 flex-wrap text-[12px]"
              >
                <span className="text-slate-500 dark:text-slate-400 min-w-[130px]">
                  {FIELD_LABELS[field] ?? field}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className={`px-1.5 py-0.5 rounded-md tabular-nums font-mono text-[11px] ${
                      isCreate
                        ? 'text-slate-400 dark:text-slate-500 line-through'
                        : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'
                    }`}
                  >
                    {isCreate ? '—' : formatValue(field, entry.before[field as keyof typeof entry.before])}
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                  <span className="px-1.5 py-0.5 rounded-md tabular-nums font-mono text-[11px] bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400">
                    {formatValue(field, entry.after[field as keyof typeof entry.after])}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
