import { X, CheckCircle } from 'lucide-react'

interface RefundBulkActionsBarProps {
  selectedCount: number
  onClearSelection: () => void
  onMarkComplete?: () => void
}

export function RefundBulkActionsBar({
  selectedCount,
  onClearSelection,
  onMarkComplete,
}: RefundBulkActionsBarProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        {/* Selected Count */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold">
            {selectedCount}
          </span>
          <span className="text-sm text-slate-300">selected</span>
          <button
            onClick={onClearSelection}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <button
            onClick={onMarkComplete}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            <span>Mark as Complete</span>
          </button>
        </div>
      </div>
    </div>
  )
}
