import type { Batch } from '@/../product/sections/payments/types'

interface BatchRowProps {
  batch: Batch
  onClick?: () => void
}

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  Created: {
    label: 'Created',
    className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
  },
  Accepted: {
    label: 'Accepted',
    className: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400',
  },
  'In Progress': {
    label: 'In Progress',
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

export function BatchRow({ batch, onClick }: BatchRowProps) {
  const statusConfig = STATUS_LABELS[batch.status] || {
    label: batch.status,
    className: '',
  }

  return (
    <tr
      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
          {batch.batchId}
        </span>
      </td>

      <td className="px-4 py-3">
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900 dark:text-white">
            {batch.assignedExpertName}
          </span>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            {batch.assignedExpertId}
          </span>
        </div>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {batch.itemCount}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {formatCurrency(batch.totalAmount)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.className}`}
        >
          {statusConfig.label}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(batch.createdDate)}
        </span>
      </td>

      <td className="px-4 py-3">
        <span className="text-sm text-slate-700 dark:text-slate-300">
          {formatDate(batch.lastUpdated)}
        </span>
      </td>
    </tr>
  )
}
