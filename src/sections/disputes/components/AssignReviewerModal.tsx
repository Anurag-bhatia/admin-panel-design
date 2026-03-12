import { useState, useRef } from 'react'
import { X, Search } from 'lucide-react'
import type { Reviewer } from '@/../product/sections/disputes/types'

interface AssignReviewerModalProps {
  selectedCount: number
  reviewers: Reviewer[]
  currentReviewerId?: string | null
  onAssign?: (reviewerId: string, notes: string) => void
  onClose?: () => void
}

export function AssignReviewerModal({
  selectedCount,
  reviewers,
  currentReviewerId,
  onAssign,
  onClose,
}: AssignReviewerModalProps) {
  const [search, setSearch] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedReviewerId, setSelectedReviewerId] = useState<string | null>(currentReviewerId || null)
  const [notes, setNotes] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredReviewers = reviewers.filter(
    (reviewer) =>
      reviewer.name.toLowerCase().includes(search.toLowerCase()) ||
      reviewer.role.toLowerCase().includes(search.toLowerCase())
  )

  const selectedReviewer = selectedReviewerId
    ? reviewers.find((r) => r.id === selectedReviewerId)
    : null

  const handleAssign = () => {
    if (selectedReviewerId) {
      onAssign?.(selectedReviewerId, notes)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Assign Reviewer
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedCount === 1
                ? '1 dispute selected'
                : `${selectedCount} disputes selected`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Search with dropdown */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Reviewer
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setShowDropdown(true)
                }}
                onFocus={() => {
                  if (search.trim()) setShowDropdown(true)
                }}
                placeholder="Search by name or role..."
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
              />

              {/* Search results dropdown */}
              {showDropdown && search.trim() && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowDropdown(false)}
                  />
                  <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto z-20">
                    {filteredReviewers.length === 0 ? (
                      <div className="px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400">
                        No reviewers found
                      </div>
                    ) : (
                      filteredReviewers.map((reviewer) => (
                        <button
                          key={reviewer.id}
                          onClick={() => {
                            setSelectedReviewerId(reviewer.id)
                            setSearch('')
                            setShowDropdown(false)
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center flex-shrink-0 text-xs font-medium text-slate-600 dark:text-slate-300">
                            {reviewer.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 dark:text-white truncate">
                              {reviewer.name}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                              {reviewer.role}
                            </div>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Selected reviewer chip */}
            {selectedReviewer && (
              <div className="mt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                  <div className="w-5 h-5 rounded-full bg-cyan-600 text-white flex items-center justify-center text-[10px] font-medium">
                    {selectedReviewer.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-cyan-900 dark:text-cyan-300">
                    {selectedReviewer.name}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedReviewerId(null)
                      inputRef.current?.focus()
                    }}
                    className="p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded transition-colors"
                  >
                    <X className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note about this assignment..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedReviewerId}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Assign Reviewer
          </button>
        </div>
      </div>
    </div>
  )
}
