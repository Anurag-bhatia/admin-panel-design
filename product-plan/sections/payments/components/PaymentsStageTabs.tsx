interface StageTabsProps {
  tabs: { key: string; label: string }[]
  activeTab: string
  counts: Record<string, number>
  onTabChange?: (tab: string) => void
}

export function PaymentsStageTabs({
  tabs,
  activeTab,
  counts,
  onTabChange,
}: StageTabsProps) {
  return (
    <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, index) => {
          const isActive = activeTab === tab.key
          const count = counts[tab.key] ?? 0

          return (
            <button
              key={tab.key}
              onClick={() => onTabChange?.(tab.key)}
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

              <span>{tab.label}</span>

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
