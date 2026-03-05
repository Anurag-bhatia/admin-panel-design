import { useState } from 'react'
import { MoreHorizontal, CheckCircle } from 'lucide-react'
import type { PartnerPayout } from '@/../product/sections/payments/types'

interface PartnerPayoutRowProps {
  payout: PartnerPayout
  onViewPartnerProfile?: () => void
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

export function PartnerPayoutRow({
  payout,
  onViewPartnerProfile,
  onMarkComplete,
}: PartnerPayoutRowProps) {
  const [showMenu, setShowMenu] = useState(false)
  const statusConfig = STATUS_LABELS[payout.status] || {
    label: payout.status,
    className: '',
  }

  return (
    <tr
      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      onClick={onViewPartnerProfile}
    >
      {/* Partner ID */}
      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
          {payout.partnerId}
        </span>
      </td>

      {/* Partner Name */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-400">
            {payout.partnerName.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {payout.partnerName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {payout.companyName}
            </span>
          </div>
        </div>
      </td>

      {/* Subscribers */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {payout.subscriberCount}
        </span>
      </td>

      {/* Total Earnings */}
      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(payout.totalEarnings)}
        </span>
      </td>

      {/* Payout Amount */}
      <td className="px-4 py-3">
        <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          {formatCurrency(payout.payoutAmount)}
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
          {formatDate(payout.dueDate)}
        </span>
      </td>

      {/* Paid Date */}
      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(payout.paidDate)}
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
                {payout.status !== 'Completed' ? (
                  <button
                    onClick={() => {
                      onMarkComplete?.()
                      setShowMenu(false)
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Mark as Paid
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
