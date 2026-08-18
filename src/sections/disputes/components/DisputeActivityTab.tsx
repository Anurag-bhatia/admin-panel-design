import { Clock } from 'lucide-react'
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

const ACTION_CHIP_CLASSES: Record<string, string> = {
  created: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  assigned: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  reviewer: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
  escalated: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  priority: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
  resolved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  settled: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
  rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  status: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
  evidence: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
  investigation: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  note: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  follow: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
  merged: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
  transferred: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
  moved: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
}

function getChipClass(action: string): string {
  const lower = action.toLowerCase()
  for (const key of Object.keys(ACTION_CHIP_CLASSES)) {
    if (lower.includes(key)) return ACTION_CHIP_CLASSES[key]
  }
  return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
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
        <div className="space-y-4">
          {sortedActivities.map((act, index) => (
            <div key={act.id} className="relative pl-8 pb-6 last:pb-0">
              {index < sortedActivities.length - 1 && (
                <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
              )}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              </div>
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChipClass(act.action)}`}
                    >
                      {act.action}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {formatDate(act.timestamp)} at {formatTime(act.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  {act.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
