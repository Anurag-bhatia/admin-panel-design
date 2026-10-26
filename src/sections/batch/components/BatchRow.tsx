import type { Batch } from '@/../product/sections/batch/types'

interface BatchRowProps {
  batch: Batch
  showExpert?: boolean
  isSelected?: boolean
  onSelect?: (checked: boolean) => void
  onClick?: () => void
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

export function BatchRow({
  batch,
  showExpert = true,
  isSelected = false,
  onSelect,
  onClick,
}: BatchRowProps) {
  return (
    <tr
      className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
        isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''
      }`}
      onClick={onClick}
    >
      <td className="px-4 py-3 w-10" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={(e) => onSelect?.(e.target.checked)}
          className="h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800"
        />
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-slate-900 dark:text-white">
          {batch.batchId}
        </span>
      </td>

      {showExpert && (
        <td className="px-4 py-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              {batch.assignedExpertName}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-mono">{batch.assignedExpertId}</span>
              <span className="mx-1.5 text-slate-300 dark:text-slate-600">·</span>
              {batch.assignedExpertMobile}
            </span>
          </div>
        </td>
      )}

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
