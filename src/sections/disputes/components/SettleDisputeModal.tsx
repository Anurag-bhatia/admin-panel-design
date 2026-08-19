import { useState } from 'react'
import { createPortal } from 'react-dom'
import { X, CheckCircle, ChevronDown } from 'lucide-react'

interface SettleDisputeModalProps {
  onSettle?: (resolution: string, notes: string) => void
  onClose?: () => void
}

const RESOLUTION_OPTIONS = [
  'Refund Completed',
  'Incident has been created',
  'Incident has been resolved',
  'Update has been shared with the customer',
  'Other',
]

export function SettleDisputeModal({ onSettle, onClose }: SettleDisputeModalProps) {
  const [selected, setSelected] = useState<string | null>(null)
  const [otherText, setOtherText] = useState('')
  const [notes, setNotes] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)

  const isOther = selected === 'Other'
  const canSubmit = selected !== null && (!isOther || otherText.trim().length > 0)

  const handleSettle = () => {
    if (!canSubmit || !selected) return
    const resolution = isOther ? otherText.trim() : selected
    onSettle?.(resolution, notes.trim())
  }

  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Settle Dispute
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Resolution
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-left"
              >
                <span className={selected ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'}>
                  {selected || 'Select a resolution...'}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>

              {showDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20">
                    {RESOLUTION_OPTIONS.map((option) => (
                      <button
                        key={option}
                        onClick={() => {
                          setSelected(option)
                          setShowDropdown(false)
                        }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {isOther && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Please specify
              </label>
              <textarea
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Enter resolution details..."
                rows={3}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
                autoFocus
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSettle}
            disabled={!canSubmit}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <CheckCircle className="h-4 w-4" />
            Move to Settled
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
