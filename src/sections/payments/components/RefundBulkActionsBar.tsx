import { useRef, useState } from 'react'
import { X, ArrowRightLeft, CheckCircle, ChevronDown, FileText, Receipt, StickyNote, Paperclip } from 'lucide-react'

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
  const [moveNotesError, setMoveNotesError] = useState<string | null>(null)
  const [moveAttachments, setMoveAttachments] = useState<File[]>([])
  const moveAttachmentInputRef = useRef<HTMLInputElement>(null)

  const resetMoveModal = () => {
    setPendingMove(null)
    setMoveNotes('')
    setMoveNotesError(null)
    setMoveAttachments([])
  }

  const handleMoveAttachmentPick = (files: FileList | null) => {
    if (!files || files.length === 0) return
    setMoveAttachments(prev => [...prev, ...Array.from(files)])
    if (moveAttachmentInputRef.current) moveAttachmentInputRef.current.value = ''
  }

  const removeMoveAttachment = (idx: number) => {
    setMoveAttachments(prev => prev.filter((_, i) => i !== idx))
  }

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
                              setMoveNotesError(null)
                              setMoveAttachments([])
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
          <div className="absolute inset-0 bg-black/50" onClick={resetMoveModal} />
          <div className="relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 w-full max-w-lg mx-4">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Move to {pendingMove.label}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{selectedCount} selected</p>
              </div>
              <button
                onClick={resetMoveModal}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Notes <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={moveNotes}
                  onChange={(e) => {
                    setMoveNotes(e.target.value)
                    if (moveNotesError) setMoveNotesError(null)
                  }}
                  placeholder="Add a note about this status change..."
                  rows={4}
                  className={`w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${moveNotesError ? 'border-red-500' : 'border-slate-200 dark:border-slate-700'}`}
                />
                {moveNotesError && <p className="mt-1 text-xs text-red-500">{moveNotesError}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Attachments
                </label>
                <input
                  ref={moveAttachmentInputRef}
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => handleMoveAttachmentPick(e.target.files)}
                />
                <button
                  type="button"
                  onClick={() => moveAttachmentInputRef.current?.click()}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  Add attachment
                </button>
                {moveAttachments.length > 0 && (
                  <ul className="mt-2 space-y-1.5">
                    {moveAttachments.map((file, idx) => (
                      <li key={`${file.name}-${idx}`} className="flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span className="text-xs font-medium text-slate-900 dark:text-slate-50 truncate">{file.name}</span>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeMoveAttachment(idx)}
                          className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded shrink-0"
                        >
                          <X className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={resetMoveModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!moveNotes.trim()) {
                    setMoveNotesError('Notes are required')
                    return
                  }
                  onMove?.(pendingMove.value, moveNotes)
                  resetMoveModal()
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
