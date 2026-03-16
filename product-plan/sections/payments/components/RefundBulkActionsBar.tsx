import { useState } from 'react'
import { X, ArrowRightLeft, CheckCircle, ChevronDown, FileText, Receipt } from 'lucide-react'

interface MoveOption {
  value: string
  label: string
}

interface RefundBulkActionsBarProps {
  selectedCount: number
  actionLabel?: string
  onClearSelection: () => void
  onMarkComplete?: () => void
  moveOptions?: MoveOption[]
  onMove?: (targetStage: string) => void
  onSendPI?: () => void
  onSendInvoice?: () => void
}

export function RefundBulkActionsBar({
  selectedCount,
  actionLabel = 'Mark as Complete',
  onClearSelection,
  onMarkComplete,
  moveOptions,
  onMove,
  onSendPI,
  onSendInvoice,
}: RefundBulkActionsBarProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false)

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
          {moveOptions && onMove ? (
            <div className="relative">
              <button
                onClick={() => setShowMoveMenu(!showMoveMenu)}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowRightLeft className="h-4 w-4" />
                <span>Move</span>
                <ChevronDown className="h-3.5 w-3.5" />
              </button>

              {showMoveMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMoveMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                    {moveOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onMove(option.value)
                          setShowMoveMenu(false)
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={onMarkComplete}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>{actionLabel}</span>
            </button>
          )}

          {onSendPI && (
            <>
              <div className="w-px h-5 bg-slate-700" />
              <button
                onClick={onSendPI}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <FileText className="h-4 w-4" />
                <span>Send PI</span>
              </button>
            </>
          )}

          {onSendInvoice && (
            <>
              {!onSendPI && <div className="w-px h-5 bg-slate-700" />}
              <button
                onClick={onSendInvoice}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <Receipt className="h-4 w-4" />
                <span>Send Invoice</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
