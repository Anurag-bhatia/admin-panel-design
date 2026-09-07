import { useState } from 'react'
import {
  X,
  ArrowRight,
  UserPlus,
  ChevronDown,
} from 'lucide-react'
import type { Lead } from '@/../product/sections/sales-crm/types'

interface BulkActionsBarProps {
  selectedCount: number
  onClearSelection: () => void
  onMoveStatus?: (status: Lead['status'], notes: string) => void
  onAssignOwner?: () => void
}

const STATUS_OPTIONS: { key: Lead['status']; label: string }[] = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'follow-up', label: 'Follow-up' },
  { key: 'projected', label: 'Projected' },
  { key: 'invoiced', label: 'Ready to Invoice' },
  { key: 'sales', label: 'Converted' },
  { key: 'lost', label: 'Lost' },
]

export function BulkActionsBar({
  selectedCount,
  onClearSelection,
  onMoveStatus,
  onAssignOwner,
}: BulkActionsBarProps) {
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)
  const [pendingStatus, setPendingStatus] = useState<{ key: Lead['status']; label: string } | null>(null)
  const [notes, setNotes] = useState('')

  const handleStatusPick = (status: { key: Lead['status']; label: string }) => {
    setShowStatusDropdown(false)
    if (status.key === 'assigned') {
      onAssignOwner?.()
      return
    }
    setPendingStatus(status)
    setNotes('')
  }

  const handleNotesSubmit = () => {
    if (!pendingStatus) return
    onMoveStatus?.(pendingStatus.key, notes)
    setPendingStatus(null)
    setNotes('')
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
            {/* Move Status */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusDropdown(!showStatusDropdown)
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
                <span>Move Status</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {showStatusDropdown && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowStatusDropdown(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto">
                    {STATUS_OPTIONS.map((status) => (
                      <button
                        key={status.key}
                        onClick={() => handleStatusPick(status)}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Assign Owner */}
            <button
              onClick={() => {
                setShowStatusDropdown(false)
                onAssignOwner?.()
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
            >
              <UserPlus className="h-4 w-4" />
              <span>Assign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Notes modal for non-Assigned status moves */}
      {pendingStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Move to {pendingStatus.label}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{selectedCount} selected</p>
              </div>
              <button
                onClick={() => setPendingStatus(null)}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Notes
              </label>
              <textarea
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Add a note about this status change..."
                rows={4}
                className="w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
              />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setPendingStatus(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNotesSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Move to {pendingStatus.label}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
