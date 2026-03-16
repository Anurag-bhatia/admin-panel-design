interface DisputesSidebarProps {
  view: 'all' | 'my'
  onViewChange?: (view: 'all' | 'my') => void
}

export function DisputesSidebar({
  view,
  onViewChange,
}: DisputesSidebarProps) {
  return (
    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52">
      <div className="flex-1 py-4">
        {/* All Disputes */}
        <div className="px-2 mb-1">
          <button
            onClick={() => onViewChange?.('all')}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              view === 'all'
                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            All Disputes
          </button>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* My Disputes */}
        <div className="px-2">
          <button
            onClick={() => onViewChange?.('my')}
            className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition-all ${
              view === 'my'
                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            My Disputes
          </button>
        </div>
      </div>
    </div>
  )
}
