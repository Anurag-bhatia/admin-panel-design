export type SidebarSelection =
  | { kind: 'incidents'; view: 'all' | 'my'; workType: 'cases' | 'challans' }
  | { kind: 'chats' }

interface IncidentsSidebarProps {
  selection: SidebarSelection
  chatsUnreadCount?: number
  onChangeSelection?: (selection: SidebarSelection) => void
}

export function IncidentsSidebar({
  selection,
  chatsUnreadCount = 0,
  onChangeSelection,
}: IncidentsSidebarProps) {
  const isIncident = (view: 'all' | 'my', workType: 'cases' | 'challans') =>
    selection.kind === 'incidents' && selection.view === view && selection.workType === workType

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

          <div className="space-y-0.5 px-2">
            <button
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'all', workType: 'cases' })
              }
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isIncident('all', 'cases')
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Cases (L1, L2)</span>
            </button>

            <button
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'all', workType: 'challans' })
              }
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isIncident('all', 'challans')
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Challans (L3, L4)</span>
            </button>
          </div>
        </div>

        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* My Incidents Section */}
        <div>
          <div className="px-4 py-2">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">
              My Incidents
            </span>
          </div>

          <div className="space-y-0.5 px-2">
            <button
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'my', workType: 'cases' })
              }
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isIncident('my', 'cases')
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Cases (L1, L2)</span>
            </button>

            <button
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'my', workType: 'challans' })
              }
              className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                isIncident('my', 'challans')
                  ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <span>Challans (L3, L4)</span>
            </button>
          </div>
        </div>

        <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />

        {/* Chats */}
        <div className="px-2">
          <button
            onClick={() => onChangeSelection?.({ kind: 'chats' })}
            className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
              selection.kind === 'chats'
                ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            <span>Chats</span>
            {chatsUnreadCount > 0 && (
              <span className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-semibold bg-red-500 text-white">
                {chatsUnreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
