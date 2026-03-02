import { useState } from 'react'
import { Plus, Calendar, MessageSquare, X } from 'lucide-react'
import type { FollowUp } from '@/../product/sections/incidents/types'

interface FollowUpTabProps {
  followUps: FollowUp[]
  onAddFollowUp?: (followUp: {
    outcome: string
  }) => void
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

const OUTCOME_OPTIONS = [
  'In Progress',
  'Scheduled',
  'Assigned',
  'Resolved',
  'Not Resolved',
  'Pending',
  'Escalated',
]

export function FollowUpTab({ followUps, onAddFollowUp }: FollowUpTabProps) {
  const [showForm, setShowForm] = useState(false)
  const [outcome, setOutcome] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!outcome) return

    onAddFollowUp?.({
      outcome,
    })

    setShowForm(false)
    setOutcome('')
  }

  const sortedFollowUps = [...followUps].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Follow-Up Activities
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Track communication and progress for this challan
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Follow-Up
        </button>
      </div>

      {/* Add Follow-Up Form */}
      {showForm && (
        <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-medium text-slate-900 dark:text-white">
              Log New Follow-Up
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Outcome */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                Outcome <span className="text-red-500">*</span>
              </label>
              <select
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                required
              >
                <option value="">Select outcome</option>
                {OUTCOME_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
              >
                Save Follow-Up
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Follow-Up List */}
      {sortedFollowUps.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-900 dark:text-white font-medium mb-1">
            No follow-ups yet
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Start tracking communication and progress
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add First Follow-Up
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedFollowUps.map((followUp, index) => (
            <div
              key={followUp.id}
              className="relative pl-8 pb-6 last:pb-0"
            >
              {/* Timeline Line */}
              {index < sortedFollowUps.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
              )}

              {/* Timeline Dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              </div>

              {/* Content */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        followUp.outcome === 'Resolved'
                          ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                          : followUp.outcome === 'Not Resolved'
                          ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                          : followUp.outcome === 'In Progress'
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {followUp.outcome}
                    </span>
                    {followUp.nextFollowUpDate && (
                      <span className="inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                        <Calendar className="h-3 w-3" />
                        Next: {formatDate(followUp.nextFollowUpDate)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(followUp.createdAt)} at {formatTime(followUp.createdAt)}
                  </span>
                </div>

                <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">
                  {followUp.notes}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-medium">
                    {followUp.createdByName.charAt(0)}
                  </div>
                  <span>{followUp.createdByName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
