interface IncidentsSidebarProps {
  view: 'all' | 'my'
  workType: 'cases' | 'challans'
  onViewChange?: (view: 'all' | 'my') => void
  onWorkTypeChange?: (type: 'cases' | 'challans') => void
}

export function IncidentsSidebar({
  view,
  workType,
  onViewChange,
  onWorkTypeChange,
}: IncidentsSidebarProps) {
  return (
    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52">
      <div className="flex-1 py-4">
        {/* All Incidents Section */}
        <div className="mb-2">
          <div className="px-4 py-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              All Incidents
            </span>
          </div>

          {/* Sub-items for All Incidents */}
          <div className="space-y-0.5 px-2">
            <button
              onClick={() => {
                onViewChange?.('all')
                onWorkTypeChange?.('cases')
              }}
              disabled
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'all' && workType === 'cases'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Cases</span>
              <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
                Coming soon
              </span>
            </button>

            <button
              onClick={() => {
                onViewChange?.('all')
                onWorkTypeChange?.('challans')
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'all' && workType === 'challans'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Challans</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* My Incidents Section */}
        <div>
          <div className="px-4 py-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              My Incidents
            </span>
          </div>

          {/* Sub-items for My Incidents */}
          <div className="space-y-0.5 px-2">
            <button
              onClick={() => {
                onViewChange?.('my')
                onWorkTypeChange?.('cases')
              }}
              disabled
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'my' && workType === 'cases'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              <span>Cases</span>
              <span className="ml-auto text-xs text-slate-400 dark:text-slate-500">
                Coming soon
              </span>
            </button>

            <button
              onClick={() => {
                onViewChange?.('my')
                onWorkTypeChange?.('challans')
              }}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'my' && workType === 'challans'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Challans</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
