import { X, ShieldQuestion } from 'lucide-react'
import type { ConfigDraft } from '@/../product/sections/rewards-config/types'

interface ConfirmationModalProps {
  mode: 'add' | 'edit'
  draft: ConfigDraft
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmationModal({
  mode,
  draft,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const marginPct =
    draft.operationsCostPct !== null ? 100 - draft.operationsCostPct : null
  const maxCv =
    marginPct !== null && draft.lawyeredCvPct !== null
      ? marginPct - draft.lawyeredCvPct
      : null
  const maxNcv =
    marginPct !== null && draft.lawyeredNcvPct !== null
      ? marginPct - draft.lawyeredNcvPct
      : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div
        className="fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-3">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex-shrink-0">
              <ShieldQuestion className="w-[18px] h-[18px] text-cyan-700 dark:text-cyan-400" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900 dark:text-white leading-snug">
                {mode === 'add'
                  ? 'Add this reward configuration?'
                  : 'Update this reward configuration?'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Review the values below. This action will be recorded in the change
                history.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onCancel}
            className="p-1.5 -mt-1 -mr-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Summary */}
        <div className="mx-6 mb-5 mt-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2.5">
          <SummaryRow label="State" value={draft.state ?? '—'} strong />
          <SummaryRow label="Region" value={draft.region} muted />
          <div className="h-px bg-slate-200 dark:bg-slate-700/60 my-2" />
          <SummaryRow
            label="Operations Cost %"
            value={draft.operationsCostPct !== null ? `${draft.operationsCostPct}%` : '—'}
          />
          <SummaryRow
            label="Margin %"
            value={marginPct !== null ? `${marginPct}%` : '—'}
            muted
          />
          <div className="h-px bg-slate-200 dark:bg-slate-700/60 my-2" />
          <SummaryRow
            label="Max CV Reward %"
            value={maxCv !== null ? `${maxCv}%` : '—'}
            highlight
          />
          <SummaryRow
            label="Max NCV Reward %"
            value={maxNcv !== null ? `${maxNcv}%` : '—'}
            highlight
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-6 pb-5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            No
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm"
          >
            {mode === 'add' ? 'Yes, Add Configuration' : 'Yes, Update Configuration'}
          </button>
        </div>
      </div>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  muted,
  strong,
  highlight,
}: {
  label: string
  value: string
  muted?: boolean
  strong?: boolean
  highlight?: boolean
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500 dark:text-slate-400 text-[12px]">{label}</span>
      <span
        className={`tabular-nums ${
          highlight
            ? 'font-semibold text-cyan-700 dark:text-cyan-300'
            : strong
              ? 'font-semibold text-slate-900 dark:text-white'
              : muted
                ? 'text-slate-500 dark:text-slate-400'
                : 'font-medium text-slate-800 dark:text-slate-100'
        }`}
      >
        {value}
      </span>
    </div>
  )
}
