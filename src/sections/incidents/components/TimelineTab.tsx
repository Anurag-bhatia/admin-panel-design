import {
  Plus,
  UserPlus,
  Scale,
  FileText,
  CheckCircle,
  ArrowRight,
  Upload,
  MessageSquare,
  Clock,
  AlertCircle,
} from 'lucide-react'
import type { TimelineActivity, TimelineAction } from '@/../product/sections/incidents/types'

interface TimelineTabProps {
  activities: TimelineActivity[]
}

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

export function TimelineTab({ activities }: TimelineTabProps) {
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  // Group activities by date
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
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Activity Timeline
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Complete audit trail of all actions on this challan
        </p>
      </div>

      {/* Timeline */}
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
              {/* Date Header */}
              <div className="sticky top-0 bg-slate-50 dark:bg-slate-900 py-2 mb-4 z-10">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {date}
                </span>
              </div>

              {/* Activities for this date */}
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
                      {/* Timeline Line */}
                      {index < dateActivities.length - 1 && (
                        <div className="absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                      )}

                      {/* Icon */}
                      <div
                        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`}
                      >
                        <Icon className={`h-4 w-4 ${config.color}`} />
                      </div>

                      {/* Content */}
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
                          <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                            {getRelativeTime(activity.createdAt)}
                          </span>
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
    </div>
  )
}
