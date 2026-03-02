import { useState } from 'react'
import {
  X,
  UserPlus,
  AlertTriangle,
  ChevronDown,
} from 'lucide-react'
import type { DisputePriority, Reviewer } from '@/../product/sections/disputes/types'

interface DisputeBulkActionsBarProps {
  selectedCount: number
  reviewers: Reviewer[]
  onClearSelection: () => void
  onAssignReviewer?: (reviewerId: string) => void
  onChangePriority?: (priority: DisputePriority) => void
}

const PRIORITY_OPTIONS: { key: DisputePriority; label: string }[] = [
  { key: 'critical', label: 'Critical' },
  { key: 'high', label: 'High' },
  { key: 'medium', label: 'Medium' },
  { key: 'low', label: 'Low' },
]

export function DisputeBulkActionsBar({
  selectedCount,
  reviewers,
  onClearSelection,
  onAssignReviewer,
  onChangePriority,
}: DisputeBulkActionsBarProps) {
  const [showReviewerDropdown, setShowReviewerDropdown] = useState(false)
  const [showPriorityDropdown, setShowPriorityDropdown] = useState(false)

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
          {/* Assign Reviewer */}
          <div className="relative">
            <button
              onClick={() => {
                setShowReviewerDropdown(!showReviewerDropdown)
                setShowPriorityDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Assign Reviewer</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showReviewerDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowReviewerDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                  {reviewers.map((reviewer) => (
                    <button
                      key={reviewer.id}
                      onClick={() => {
                        onAssignReviewer?.(reviewer.id)
                        setShowReviewerDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      <div className="h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium">
                        {reviewer.name.charAt(0)}
                      </div>
                      {reviewer.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-slate-700 mx-1" />

          {/* Change Priority */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPriorityDropdown(!showPriorityDropdown)
                setShowReviewerDropdown(false)
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Change Priority</span>
              <ChevronDown className="h-3 w-3" />
            </button>
            {showPriorityDropdown && (
              <>
                <div
                  className="fixed inset-0"
                  onClick={() => setShowPriorityDropdown(false)}
                />
                <div className="absolute bottom-full left-0 mb-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                  {PRIORITY_OPTIONS.map((priority) => (
                    <button
                      key={priority.key}
                      onClick={() => {
                        onChangePriority?.(priority.key)
                        setShowPriorityDropdown(false)
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                    >
                      {priority.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
