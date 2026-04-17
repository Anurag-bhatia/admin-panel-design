import type { ProposalType } from '@/../product/sections/proposals/types'

type ViewMode = 'all' | 'my'
type TypeFilter = ProposalType | 'all'

interface ProposalSidebarProps {
  view: ViewMode
  typeFilter: TypeFilter
  onViewChange?: (view: ViewMode) => void
  onTypeFilterChange?: (type: TypeFilter) => void
}

export function ProposalSidebar({
  view,
  typeFilter,
  onViewChange,
  onTypeFilterChange,
}: ProposalSidebarProps) {
  return (
    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52">
      <div className="flex-1 py-4">
        {/* View Section */}
        <div className="mb-2">
          <div className="px-4 py-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              All Proposals
            </span>
          </div>

          <div className="space-y-0.5 px-2">
            <button
              onClick={() => onViewChange?.('all')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'all'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>All Proposals</span>
            </button>

            <button
              onClick={() => onViewChange?.('my')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                view === 'my'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>My Proposals</span>
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* Type Section */}
        <div>
          <div className="px-4 py-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              Type
            </span>
          </div>

          <div className="space-y-0.5 px-2">
            <button
              onClick={() => onTypeFilterChange?.('all')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                typeFilter === 'all'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>All Types</span>
            </button>

            <button
              onClick={() => onTypeFilterChange?.('Challan')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                typeFilter === 'Challan'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Challan</span>
            </button>

            <button
              onClick={() => onTypeFilterChange?.('DL')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                typeFilter === 'DL'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>DL</span>
            </button>

            <button
              onClick={() => onTypeFilterChange?.('RC')}
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                typeFilter === 'RC'
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>RC</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
