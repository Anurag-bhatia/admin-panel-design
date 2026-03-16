import { useState } from 'react'
import { MoreHorizontal, ArrowRightLeft } from 'lucide-react'
import type { Refund } from '../types'

interface RefundRowProps {
  refund: Refund
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onApprove?: () => void
  onProcess?: () => void
  onMove?: (targetStage: string) => void
  onClick?: () => void
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  'Refund Raised': {
    label: 'Refund Raised',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  Completed: {
    label: 'Completed',
    className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
  },
  Hold: {
    label: 'Hold',
    className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
  },
  Rejected: {
    label: 'Rejected',
    className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  },
}

function formatDate(dateString: string | null): string {
  if (!dateString) return '—'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

const MOVE_OPTIONS = [
  { value: 'Refund Raised', label: 'Refund Raised' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Hold', label: 'Hold' },
  { value: 'Rejected', label: 'Rejected' },
]

export function RefundRow({
  refund,
  isSelected,
  onSelect,
  onApprove,
  onProcess,
  onMove,
  onClick,
}: RefundRowProps) {
  const [showMenu, setShowMenu] = useState(false)

  const statusConfig = STATUS_LABELS[refund.refundStatus] || {
    label: refund.refundStatus,
    className: '',
  }

  return (
    <tr
      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
        isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''
      }`}
      onClick={onClick}
    >
      {/* Checkbox */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800"
        />
      </td>

      {/* Refund ID */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
          {refund.id}
        </span>
      </td>

      {/* Linked Incident */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm text-cyan-600 dark:text-cyan-400">
          {refund.linkedIncident}
        </span>
      </td>

      {/* Customer/Subscriber */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {refund.customerSubscriber}
        </span>
      </td>

      {/* Refund Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(refund.refundAmount)}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </td>

      {/* Initiated By */}
      <td className="px-4 py-3">
        {refund.initiatedBy ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
              {refund.initiatedBy.charAt(0)}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {refund.initiatedBy.split(' ')[0]}
            </span>
          </div>
        ) : (
          <span className="text-sm text-slate-400 dark:text-slate-500">—</span>
        )}
      </td>

      {/* Refund Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(refund.refundDate)}
        </span>
      </td>

      {/* Actions Menu */}
      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <MoreHorizontal className="h-4 w-4 text-slate-500" />
          </button>

          {showMenu && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setShowMenu(false)}
              />
              <div className="absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                <div className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  Move to
                </div>
                {MOVE_OPTIONS.filter((o) => o.value !== refund.refundStatus).map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onMove?.(option.value)
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
