import { useState } from 'react'
import { X, UserPlus, ArrowRight, ChevronDown } from 'lucide-react'
import type { ProposalStatus, TeamMember } from '@/../product/sections/proposals/types'

interface BulkActionsBarProps {
  selectedCount: number
  activeTab: ProposalStatus
  teamMembers: TeamMember[]
  onClear?: () => void
  onBulkAssign?: (teamMemberId: string) => void
  onBulkUpdateStatus?: (status: ProposalStatus) => void
}

export function BulkActionsBar({
  selectedCount,
  activeTab,
  teamMembers,
  onClear,
  onBulkAssign,
  onBulkUpdateStatus,
}: BulkActionsBarProps) {
  const [showAssignMenu, setShowAssignMenu] = useState(false)
  const [showStatusMenu, setShowStatusMenu] = useState(false)

  if (selectedCount === 0) return null

  const statusOptions: { key: ProposalStatus; label: string }[] = (() => {
    switch (activeTab) {
      case 'sent':
        return [
          { key: 'under_review', label: 'Move to In Review' },
          { key: 'rejected', label: 'Reject' },
        ]
      case 'under_review':
        return [{ key: 'rejected', label: 'Reject' }]
      case 'rejected':
        return [{ key: 'sent', label: 'Reopen to Inbox' }]
      default:
        return []
    }
  })()

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
        {/* Selected Count */}
        <div className="flex items-center gap-2 pr-3 border-r border-slate-700">
          <span className="flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold">
            {selectedCount}
          </span>
          <span className="text-sm text-slate-300">selected</span>
          <button
            onClick={onClear}
            className="p-1 hover:bg-slate-700 rounded transition-colors"
          >
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Assign */}
          {(activeTab === 'sent' || activeTab === 'under_review') && (
            <div className="relative">
              <button
                onClick={() => {
                  setShowAssignMenu(!showAssignMenu)
                  setShowStatusMenu(false)
                }}
                className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <UserPlus className="h-4 w-4" />
                <span>Assign</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {showAssignMenu && (
                <>
                  <div
                    className="fixed inset-0"
                    onClick={() => setShowAssignMenu(false)}
                  />
                  <div className="absolute bottom-full left-0 mb-2 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                    {teamMembers.map((tm) => (
                      <button
                        key={tm.id}
                        onClick={() => {
                          onBulkAssign?.(tm.id)
                          setShowAssignMenu(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <span className="font-medium">{tm.name}</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs ml-1.5">
                          {tm.role}
                        </span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Move Queue */}
          {statusOptions.length > 0 && (
            <>
              {(activeTab === 'sent' || activeTab === 'under_review') && (
                <div className="w-px h-6 bg-slate-700 mx-1" />
              )}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowStatusMenu(!showStatusMenu)
                    setShowAssignMenu(false)
                  }}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Move Queue</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {showStatusMenu && (
                  <>
                    <div
                      className="fixed inset-0"
                      onClick={() => setShowStatusMenu(false)}
                    />
                    <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1">
                      {statusOptions.map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => {
                            onBulkUpdateStatus?.(key)
                            setShowStatusMenu(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
