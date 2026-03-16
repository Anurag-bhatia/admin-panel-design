import type { IncidentQueue, QueueCounts } from '../types'

interface QueueTabsProps {
  activeQueue: IncidentQueue
  queueCounts: QueueCounts
  view?: 'all' | 'my'
  workType?: 'cases' | 'challans'
  onQueueChange?: (queue: IncidentQueue) => void
}

const QUEUE_CONFIG: { key: IncidentQueue; label: string; caseLabel?: string; color: string }[] = [
  { key: 'newIncidents', label: 'New Incidents', caseLabel: 'New Cases', color: 'cyan' },
  { key: 'screening', label: 'Screening', color: 'amber' },
  { key: 'agentAssigned', label: 'Agent Assigned', color: 'orange' },
  { key: 'lawyerAssigned', label: 'Lawyer Assigned', color: 'blue' },
  { key: 'settled', label: 'Settled', color: 'emerald' },
  { key: 'notSettled', label: 'Not Settled', color: 'red' },
  { key: 'hold', label: 'Hold', color: 'slate' },
  { key: 'refund', label: 'Refund', color: 'purple' },
]

// Cases don't have screening or agentAssigned queues
const CASE_HIDDEN_QUEUES: IncidentQueue[] = ['screening', 'agentAssigned']

export function QueueTabs({
  activeQueue,
  queueCounts,
  view = 'all',
  workType = 'challans',
  onQueueChange,
}: QueueTabsProps) {
  const isCases = workType === 'cases'

  // Filter queues based on view and workType
  let displayedQueues = QUEUE_CONFIG

  if (isCases) {
    displayedQueues = displayedQueues.filter((q) => !CASE_HIDDEN_QUEUES.includes(q.key))
  }

  if (view === 'my') {
    displayedQueues = displayedQueues.filter((q) => q.key !== 'newIncidents' && q.key !== 'screening')
  }

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide">
        {displayedQueues.map((queue, index) => {
          const isActive = activeQueue === queue.key
          const count = queueCounts[queue.key]

          // Determine label
          let label = queue.label
          if (isCases && queue.caseLabel) {
            label = queue.caseLabel
          } else if (queue.key === 'agentAssigned' && view === 'my') {
            label = 'Assigned to me'
          }

          return (
            <button
              key={queue.key}
              onClick={() => onQueueChange?.(queue.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                  : 'border-transparent text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {/* Arrow indicator between tabs */}
              {index > 0 && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-xs">
                  →
                </span>
              )}

              <span>{label}</span>

              {/* Count badge */}
              <span
                className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${
                  isActive
                    ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
