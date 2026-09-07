import { useState } from 'react'
import { X, ArrowRightLeft, CheckCircle, ChevronDown, FileText, Receipt, StickyNote } from 'lucide-react'

interface MoveOption {
  value: string
  label: string
}

interface RefundBulkActionsBarProps {
  selectedCount: number
  actionLabel?: string
  moveLabel?: string
  onClearSelection: () => void
  onMarkComplete?: () => void
  moveOptions?: MoveOption[]
  onMove?: (targetStage: string, notes?: string) => void
  moveRequiresNotes?: boolean
  onSendPI?: () => void
  onSendInvoice?: () => void
  onAddNote?: (note: string) => void
}

export function RefundBulkActionsBar({
  selectedCount,
  actionLabel = 'Mark as Complete',
  moveLabel = 'Move',
  onClearSelection,
  onMarkComplete,
  moveOptions,
  onMove,
  moveRequiresNotes = false,
  onSendPI,
  onSendInvoice,
  onAddNote,
}: RefundBulkActionsBarProps) {
  const [showMoveMenu, setShowMoveMenu] = useState(false)
  const [showNoteModal, setShowNoteModal] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [pendingMove, setPendingMove] = useState<MoveOption | null>(null)
  const [moveNotes, setMoveNotes] = useState('')

  return (
    <>
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
                  <span>{moveLabel}</span>
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
                            setShowMoveMenu(false)
                            if (moveRequiresNotes) {
                              setPendingMove(option)
                              setMoveNotes('')
                            } else {
                              onMove(option.value)
                            }
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

            {onAddNote && (
              <>
                <div className="w-px h-5 bg-slate-700" />
                <button
                  onClick={() => setShowNoteModal(true)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <StickyNote className="h-4 w-4" />
                  <span>Add Note</span>
                </button>
              </>
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

      {/* Move-with-notes modal */}
      {pendingMove && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setPendingMove(null); setMoveNotes('') }} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Move to {pendingMove.label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{selectedCount} selected</p>
              </div>
              <button
                onClick={() => { setPendingMove(null); setMoveNotes('') }}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Notes
              </label>
              <textarea
                value={moveNotes}
                onChange={(e) => setMoveNotes(e.target.value)}
                placeholder="Add a note about this status change..."
                rows={4}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => { setPendingMove(null); setMoveNotes('') }}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onMove?.(pendingMove.value, moveNotes)
                  setPendingMove(null)
                  setMoveNotes('')
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Move to {pendingMove.label}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowNoteModal(false); setNoteText('') }} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Add Note</h3>
              <button
                onClick={() => { setShowNoteModal(false); setNoteText('') }}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Add a note for {selectedCount} selected {selectedCount === 1 ? 'item' : 'items'}
            </p>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Type your note here..."
              rows={4}
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              autoFocus
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => { setShowNoteModal(false); setNoteText('') }}
                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (noteText.trim()) {
                    onAddNote?.(noteText.trim())
                  }
                  setShowNoteModal(false)
                  setNoteText('')
                }}
                disabled={!noteText.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
