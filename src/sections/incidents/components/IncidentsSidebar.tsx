export type IncidentWorkType = 'cases' | 'challans' | 'rtoAssistance' | 'other'
export type IncidentTool = 'incidentDid' | 'vendorCancellations'

export type SidebarSelection =
  | { kind: 'incidents'; view: 'all' | 'my'; workType: IncidentWorkType }
  | { kind: 'chats' }
  | { kind: 'tools'; tool: IncidentTool }

interface IncidentsSidebarProps {
  selection: SidebarSelection
  chatsUnreadCount?: number
  onChangeSelection?: (selection: SidebarSelection) => void
}

const WORK_TYPES: { key: IncidentWorkType; label: string }[] = [
  { key: 'cases', label: 'Cases' },
  { key: 'challans', label: 'Challans' },
  { key: 'rtoAssistance', label: 'RTO Assistance' },
  { key: 'other', label: 'Other' },
]

const TOOLS: { key: IncidentTool; label: string }[] = [
  { key: 'incidentDid', label: 'Incident DID' },
  { key: 'vendorCancellations', label: 'Vendor cancellations' },
]

export function IncidentsSidebar({
  selection,
  chatsUnreadCount = 0,
  onChangeSelection,
}: IncidentsSidebarProps) {
  const isIncident = (view: 'all' | 'my', workType: IncidentWorkType) =>
    selection.kind === 'incidents' && selection.view === view && selection.workType === workType

  const isTool = (tool: IncidentTool) =>
    selection.kind === 'tools' && selection.tool === tool

  return (
    <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56">
      <div className="flex-1 py-4 overflow-y-auto">
        {/* All Incidents Section */}
        <SidebarSection title="All Incidents">
          {WORK_TYPES.map((wt) => (
            <SidebarItem
              key={`all-${wt.key}`}
              label={wt.label}
              active={isIncident('all', wt.key)}
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'all', workType: wt.key })
              }
            />
          ))}
        </SidebarSection>

        <Divider />

        {/* My Incidents Section */}
        <SidebarSection title="My Incidents">
          {WORK_TYPES.map((wt) => (
            <SidebarItem
              key={`my-${wt.key}`}
              label={wt.label}
              active={isIncident('my', wt.key)}
              onClick={() =>
                onChangeSelection?.({ kind: 'incidents', view: 'my', workType: wt.key })
              }
            />
          ))}
        </SidebarSection>

        <Divider />

        {/* Tools Section */}
        <SidebarSection title="Tools">
          {TOOLS.map((t) => (
            <SidebarItem
              key={t.key}
              label={t.label}
              active={isTool(t.key)}
              onClick={() => onChangeSelection?.({ kind: 'tools', tool: t.key })}
            />
          ))}
        </SidebarSection>

        <Divider />

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

function SidebarSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-2">
      <div className="px-4 py-2">
        <span className="text-sm font-semibold text-slate-900 dark:text-white">
          {title}
        </span>
      </div>
      <div className="space-y-0.5 px-2">{children}</div>
    </div>
  )
}

function SidebarItem({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
        active
          ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
      }`}
    >
      <span>{label}</span>
    </button>
  )
}

function Divider() {
  return <div className="mx-4 my-3 border-t border-slate-200 dark:border-slate-700" />
}
