import { useState } from 'react'
import { MoreHorizontal, CheckCircle } from 'lucide-react'
import type { LawyerFee } from '@/../product/sections/payments/types'

interface LawyerFeeRowProps {
  fee: LawyerFee
  onViewLawyerProfile?: () => void
  onMarkComplete?: () => void
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  'To Pay': {
    label: 'To Pay',
    className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
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

export function LawyerFeeRow({
  fee,
  onViewLawyerProfile,
  onMarkComplete,
}: LawyerFeeRowProps) {
  const [showMenu, setShowMenu] = useState(false)
  const statusConfig = STATUS_LABELS[fee.status] || {
    label: fee.status,
    className: '',
  }

  return (
    <tr
      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      onClick={onViewLawyerProfile}
    >
      {/* Lawyer ID */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
          {fee.lawyerId}
        </span>
      </td>

      {/* Lawyer Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-xs font-semibold text-cyan-700 dark:text-cyan-400">
            {fee.lawyerName.replace('Adv. ', '').charAt(0)}
          </div>
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {fee.lawyerName}
          </span>
        </div>
      </td>

      {/* Total Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(fee.totalAmount)}
        </span>
      </td>

      {/* Commission Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {formatCurrency(fee.commissionAmount)}
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

      {/* Due Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(fee.dueDate)}
        </span>
      </td>

      {/* Paid Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(fee.paidDate)}
        </span>
      </td>

      {/* Actions */}
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
              <div className="absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                {fee.status !== 'Completed' ? (
                  <button
                    onClick={() => {
                      onMarkComplete?.()
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
