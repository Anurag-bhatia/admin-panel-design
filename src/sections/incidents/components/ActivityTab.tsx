import { useState } from 'react'
import {
  Plus,
  Calendar,
  MessageSquare,
  Clock,
  X,
  UserPlus,
  Scale,
  FileText,
  CheckCircle,
  ArrowRight,
  Upload,
  AlertCircle,
} from 'lucide-react'
import type { FollowUp, TimelineActivity, TimelineAction } from '@/../product/sections/incidents/types'

interface ActivityTabProps {
  followUps: FollowUp[]
  activities: TimelineActivity[]
  onAddFollowUp?: (followUp: {
    outcome: string
    activity: string
  }) => void
}

type SubTab = 'followUp' | 'timeline'

const ACTION_CONFIG: Record<
  TimelineAction,
  { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string }
> = {
  created: {
    icon: Plus,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  agent_assigned: {
    icon: UserPlus,
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  lawyer_assigned: {
    icon: Scale,
    color: 'text-purple-600 dark:text-purple-400',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  screened: {
    icon: FileText,
    color: 'text-cyan-600 dark:text-cyan-400',
    bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
  },
  queue_changed: {
    icon: ArrowRight,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  follow_up_added: {
    icon: MessageSquare,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  document_uploaded: {
    icon: Upload,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-700',
  },
  resolved: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  status_changed: {
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  validated: {
    icon: CheckCircle,
    color: 'text-teal-600 dark:text-teal-400',
    bgColor: 'bg-teal-100 dark:bg-teal-900/30',
  },
}

const STAGE_OPTIONS = [
  'New Incidents',
  'Screening',
  'Lawyer Assigned',
  'Settled',
  'Not Settled',
  'Refund',
]

const ACTIVITY_OPTIONS = [
  'Challan sent to court',
  'Our lawyer is working on challan',
  'Challan contested in court',
  'Hearing date scheduled',
  'Fine payment completed',
  'Documents submitted to RTO',
  'Waiting for court order',
  'Challan disposed successfully',
  'Refund initiated to subscriber',
  'Subscriber contacted for details',
  'Escalated to senior lawyer',
]

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

function getRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return formatDate(dateString)
}

export function ActivityTab({ followUps, activities, onAddFollowUp }: ActivityTabProps) {
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
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  const groupedActivities = sortedActivities.reduce((groups, activity) => {
    const date = formatDate(activity.createdAt)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, TimelineActivity[]>)

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
                            followUp.outcome === 'Settled'
                              ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                              : followUp.outcome === 'Not Settled'
                              ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                              : followUp.outcome === 'Lawyer Assigned'
                              ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                              : followUp.outcome === 'Screening'
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                              : followUp.outcome === 'Refund'
                              ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
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
                    {dateActivities.map((activity, index) => {
                      const config = ACTION_CONFIG[activity.action] || {
                        icon: AlertCircle,
                        color: 'text-slate-600',
                        bgColor: 'bg-slate-100',
                      }
                      const Icon = config.icon

                      return (
                        <div key={activity.id} className="relative pl-10">
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
                                  {activity.description}
                                </p>
                                <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                  <span className="flex items-center gap-1">
                                    <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium">
                                      {activity.createdByName.charAt(0)}
                                    </div>
                                    {activity.createdByName}
                                  </span>
                                  <span>•</span>
                                  <span>{formatTime(activity.createdAt)}</span>
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
