import { useState } from 'react'
import {
  Plus,
  UserPlus,
  ArrowUpRight,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Upload,
  MessageSquare,
  X,
} from 'lucide-react'
import type { RefundActivityLogEntry, RefundFollowUp } from '../types'

interface RefundActivityTabProps {
  followUps: RefundFollowUp[]
  activities: RefundActivityLogEntry[]
  onAddFollowUp?: (followUp: { outcome: string; activity: string }) => void
}

type SubTab = 'followUp' | 'timeline'

const STAGE_OPTIONS = [
  'Refund Raised',
  'Under Review',
  'Approved',
  'Hold',
  'Rejected',
  'Completed',
]

const ACTIVITY_OPTIONS = [
  'Refund request raised by subscriber',
  'Refund request raised by customer',
  'Assigned to reviewer for verification',
  'Refund amount verified against payment',
  'Refund approved and initiated',
  'Refund processed successfully',
  'Refund put on hold — pending clarification',
  'Contacted subscriber for clarification',
  'Linked incident reviewed',
  'Refund rejected — insufficient grounds',
  'Refund rejected — duplicate request',
  'Escalated to finance team',
]

const ACTION_CONFIG: Record<
  string,
  { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string }
> = {
  created: {
    icon: Plus,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  assigned: {
    icon: UserPlus,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  escalated: {
    icon: ArrowUpRight,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  approved: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  hold: {
    icon: AlertTriangle,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  status: {
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  verified: {
    icon: FileText,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  processed: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  contacted: {
    icon: MessageSquare,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  reviewed: {
    icon: FileText,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  follow_up: {
    icon: MessageSquare,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
}

function getActionConfig(action: string) {
  const lower = action.toLowerCase()
  for (const [key, config] of Object.entries(ACTION_CONFIG)) {
    if (lower.includes(key)) return config
  }
  return { icon: Clock, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-700' }
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

export function RefundActivityTab({ followUps, activities, onAddFollowUp }: RefundActivityTabProps) {
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('followUp')
  const [showForm, setShowForm] = useState(false)
  const [stage, setStage] = useState('')
  const [activity, setActivity] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!stage || !activity) return

    onAddFollowUp?.({
      outcome: stage,
      activity,
    })

    setShowForm(false)
    setStage('')
    setActivity('')
  }

  const sortedFollowUps = [...followUps].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const groupedActivities = sortedActivities.reduce((groups, act) => {
    const date = formatDate(act.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(act)
    return groups
  }, {} as Record<string, RefundActivityLogEntry[]>)

  return (
    <div className="p-6">
      {/* Header with Sub-tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveSubTab('followUp')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeSubTab === 'followUp'
                ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Follow-Up ({followUps.length})
          </button>
          <button
            onClick={() => setActiveSubTab('timeline')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeSubTab === 'timeline'
                ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            Activity Log ({activities.length})
          </button>
        </div>

        {activeSubTab === 'followUp' && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Follow-Up
          </button>
        )}
      </div>

      {/* Follow-Up Content */}
      {activeSubTab === 'followUp' && (
        <>
          {/* Add Follow-Up Form */}
          {showForm && (
            <div className="mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-medium text-slate-900 dark:text-white">
                  Add Follow-Up
                </h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  <X className="h-4 w-4 text-slate-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Stage <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                      required
                    >
                      <option value="">Select stage</option>
                      {STAGE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                      Activity <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white"
                      required
                    >
                      <option value="">Select activity</option>
                      {ACTIVITY_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

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
                <div key={followUp.id} className="relative pl-8 pb-6 last:pb-0">
                  {index < sortedFollowUps.length - 1 && (
                    <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                  )}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                            followUp.outcome === 'Completed'
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : followUp.outcome === 'Rejected'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              : followUp.outcome === 'Hold'
                              ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                              : followUp.outcome === 'Approved'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              : followUp.outcome === 'Under Review'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                              : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {followUp.outcome}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(followUp.createdAt)} at {formatTime(followUp.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {followUp.notes}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Timeline Content */}
      {activeSubTab === 'timeline' && (
        <>
          {sortedActivities.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-6 w-6 text-slate-400" />
              </div>
              <p className="text-slate-900 dark:text-white font-medium mb-1">
                No activity yet
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Actions will appear here as they happen
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {Object.entries(groupedActivities).map(([date, dateActivities]) => (
                <div key={date}>
                  <div className="sticky top-0 bg-slate-50 dark:bg-slate-950 py-2 mb-4 z-10">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      {date}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {dateActivities.map((act, index) => {
                      const config = getActionConfig(act.action)
                      const Icon = config.icon

                      return (
                        <div key={act.id} className="relative pl-10">
                          {index < dateActivities.length - 1 && (
                            <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                          )}
                          <div
                            className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`}
                          >
                            <Icon className={`h-4 w-4 ${config.color}`} />
                          </div>
                          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <p className="text-sm text-slate-900 dark:text-white">
                                  {act.details}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium">
                                      {act.performedBy.charAt(0)}
                                    </div>
                                    {act.performedBy}
                                  </span>
                                  <span>&bull;</span>
                                  <span>{formatTime(act.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
