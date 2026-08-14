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
} from 'lucide-react'
import type { ActivityLogEntry } from '@/../product/sections/disputes/types'

export interface DisputeFollowUp {
  id: string
  outcome: string
  notes: string
  createdAt: string
  createdByName: string
}

interface DisputeActivityTabProps {
  activities: ActivityLogEntry[]
}

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
  priority: {
    icon: AlertTriangle,
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
  },
  resolved: {
    icon: CheckCircle,
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
  },
  status: {
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bgColor: 'bg-orange-100 dark:bg-orange-900/30',
  },
  evidence: {
    icon: Upload,
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-100 dark:bg-slate-700',
  },
  investigation: {
    icon: FileText,
    color: 'text-indigo-600 dark:text-indigo-400',
    bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
  },
  follow_up_added: {
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

export function DisputeActivityTab({ activities }: DisputeActivityTabProps) {
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
  }, {} as Record<string, ActivityLogEntry[]>)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Activity Log ({activities.length})
        </h2>
      </div>

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
                              <span>•</span>
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
    </div>
  )
}
