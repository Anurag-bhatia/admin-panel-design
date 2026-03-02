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
} from 'lucide-react'
import type { ActivityLogEntry } from '@/../product/sections/disputes/types'

interface DisputeActivityTabProps {
  activities: ActivityLogEntry[]
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

function getActionConfig(action: string): {
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgColor: string
} {
  const lower = action.toLowerCase()

  if (lower.includes('created')) {
    return { icon: Plus, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' }
  }
  if (lower.includes('assigned') || lower.includes('reviewer')) {
    return { icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' }
  }
  if (lower.includes('escalated')) {
    return { icon: ArrowUpRight, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' }
  }
  if (lower.includes('priority')) {
    return { icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/30' }
  }
  if (lower.includes('resolved') || lower.includes('approved') || lower.includes('refund approved')) {
    return { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' }
  }
  if (lower.includes('rejected')) {
    return { icon: XCircle, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' }
  }
  if (lower.includes('status')) {
    return { icon: Clock, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' }
  }
  if (lower.includes('evidence') || lower.includes('upload')) {
    return { icon: Upload, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-700' }
  }
  if (lower.includes('note') || lower.includes('investigation')) {
    return { icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' }
  }

  return { icon: Clock, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-700' }
}

export function DisputeActivityTab({ activities }: DisputeActivityTabProps) {
  const sortedActivities = [...activities].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const groupedActivities = sortedActivities.reduce((groups, activity) => {
    const date = formatDate(activity.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(activity)
    return groups
  }, {} as Record<string, ActivityLogEntry[]>)

  if (sortedActivities.length === 0) {
    return (
      <div className="p-6">
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-slate-400" />
          </div>
          <p className="text-slate-900 dark:text-white font-medium mb-1">
            No activity yet
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Actions and status changes will appear here as they happen
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
          Activity Log
        </h2>

        <div className="space-y-8">
          {Object.entries(groupedActivities).map(([date, dateActivities]) => (
            <div key={date}>
              <div className="sticky top-0 bg-white dark:bg-slate-900 py-2 mb-4 z-10">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {date}
                </span>
              </div>
              <div className="space-y-4">
                {dateActivities.map((activity, index) => {
                  const config = getActionConfig(activity.action)
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
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {activity.action}
                            </p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {activity.details}
                            </p>
                            <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-1">
                                <div className="h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium">
                                  {activity.performedBy.charAt(0)}
                                </div>
                                {activity.performedBy}
                              </span>
                              <span>•</span>
                              <span>{formatTime(activity.timestamp)}</span>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap">
                            {getRelativeTime(activity.timestamp)}
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
      </div>
    </div>
  )
}
