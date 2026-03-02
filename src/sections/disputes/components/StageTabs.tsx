import type { DisputeStatus, StageCounts } from '@/../product/sections/disputes/types'

interface StageTabsProps {
  activeStage: DisputeStatus
  stageCounts: StageCounts
  onStageChange?: (stage: DisputeStatus) => void
}

const STAGE_CONFIG: { key: DisputeStatus; label: string }[] = [
  { key: 'open', label: 'Open' },
  { key: 'under_review', label: 'Under Review' },
  { key: 'escalated', label: 'In Progress' },
  { key: 'resolved', label: 'Resolved' },
  { key: 'rejected', label: 'Rejected' },
]

export function StageTabs({
  activeStage,
  stageCounts,
  onStageChange,
}: StageTabsProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide">
        {STAGE_CONFIG.map((stage, index) => {
          const isActive = activeStage === stage.key
          const count = stageCounts[stage.key]

          return (
            <button
              key={stage.key}
              onClick={() => onStageChange?.(stage.key)}
              className={`relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                  : 'border-transparent text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
            >
              {index > 0 && (
                <span className="absolute -left-2 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-xs">
                  →
                </span>
              )}

              <span>{stage.label}</span>

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
