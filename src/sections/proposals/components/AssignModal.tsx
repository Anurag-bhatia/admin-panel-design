import { useState } from 'react'
import { X, UserPlus } from 'lucide-react'
import type { Proposal, TeamMember } from '@/../product/sections/proposals/types'

interface AssignModalProps {
  proposal: Proposal
  teamMembers: TeamMember[]
  isReassign?: boolean
  onSubmit?: (teamMemberId: string) => void
  onCancel?: () => void
}

const TYPE_BADGE_STYLES: Record<string, string> = {
  Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
  DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
  RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
}

export function AssignModal({
  proposal,
  teamMembers,
  isReassign = false,
  onSubmit,
  onCancel,
}: AssignModalProps) {
  const [selectedMemberId, setSelectedMemberId] = useState(
    proposal.assignedTo?.id ?? ''
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedMemberId) {
      onSubmit?.(selectedMemberId)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {isReassign ? 'Reassign Proposal' : 'Assign Proposal'}
          </h2>
          <button
            onClick={onCancel}
            className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-3 mb-1">
              <span className="font-mono text-sm font-medium text-slate-700 dark:text-slate-300">
                {proposal.displayId}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${
                  TYPE_BADGE_STYLES[proposal.type]
                }`}
              >
                {proposal.type}
              </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {proposal.customer.name} · {proposal.quantity} items
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Assign to <span className="text-red-500">*</span>
            </label>
            <div className="space-y-1.5">
              {teamMembers.map((tm) => (
                <label
                  key={tm.id}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedMemberId === tm.id
                      ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-950/30 dark:border-cyan-600'
                      : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <input
                    type="radio"
                    name="assignee"
                    value={tm.id}
                    checked={selectedMemberId === tm.id}
                    onChange={() => setSelectedMemberId(tm.id)}
                    className="w-4 h-4 text-cyan-600 border-slate-300 focus:ring-cyan-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {tm.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tm.role}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-6 mt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedMemberId}
              className="flex items-center gap-2 px-5 py-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-300 dark:disabled:bg-cyan-800 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <UserPlus className="h-4 w-4" />
              {isReassign ? 'Reassign' : 'Assign'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
