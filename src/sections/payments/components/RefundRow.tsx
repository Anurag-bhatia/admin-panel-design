import { useState } from 'react'
import { MoreHorizontal, CheckCircle } from 'lucide-react'
import type { Refund } from '@/../product/sections/payments/types'

interface RefundRowProps {
  refund: Refund
  isSelected: boolean
  onSelect: (selected: boolean) => void
  onApprove?: () => void
  onProcess?: () => void
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  Initiated: {
    label: 'Initiated',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
  },
  Approved: {
    label: 'Approved',
    className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  },
  Completed: {
    label: 'Completed',
    className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
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

export function RefundRow({
  refund,
  isSelected,
  onSelect,
  onApprove,
  onProcess,
}: RefundRowProps) {
  const [showMenu, setShowMenu] = useState(false)

  const statusConfig = STATUS_LABELS[refund.refundStatus] || {
    label: refund.refundStatus,
    className: '',
  }

  return (
    <tr
      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
        isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''
      }`}
    >
      {/* Checkbox */}
      <td className="px-4 py-3">
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

      {/* Approved By */}
      <td className="px-4 py-3">
        {refund.approvedBy ? (
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300">
              {refund.approvedBy.charAt(0)}
            </div>
            <span className="text-sm text-slate-700 dark:text-slate-300">
              {refund.approvedBy.split(' ')[0]}
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
      <td className="px-4 py-3">
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
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                {refund.refundStatus !== 'Completed' ? (
                  <button
                    onClick={() => {
                      onProcess?.()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Complete
                  </button>
                ) : (
                  <div className="px-3 py-2 text-sm text-slate-400 dark:text-slate-500">
                    No actions available
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </td>
    </tr>
  )
}
