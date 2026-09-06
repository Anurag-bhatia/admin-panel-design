import { useState } from 'react'
import data from '@/../product/sections/rewards-config/data.json'
import type {
  RewardsConfig,
  ChangeLogEntry,
  AllowlistedUser,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard'
import { SalesConfigDashboard } from './components/SalesConfigDashboard'

type RewardsTab = 'sales' | 'web'

const TABS: { key: RewardsTab; label: string }[] = [
  { key: 'sales', label: 'Sales Config' },
  { key: 'web', label: 'Web Config' },
]

export default function RewardsConfigPreview() {
  const [activeTab, setActiveTab] = useState<RewardsTab>('sales')

  return (
    <div className="flex h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950">
      {/* Rewards Config Sidebar */}
      <div className="flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56">
        <div className="flex-1 p-3">
          {TABS.map((tab, index) => {
            const isActive = activeTab === tab.key
            return (
              <div key={tab.key}>
                <button
                  onClick={() => setActiveTab(tab.key)}
                  className={`w-full text-left rounded-lg px-4 py-3 text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                      : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
                {index < TABS.length - 1 && (
                  <div className="mx-4 my-1 border-t border-slate-200 dark:border-slate-700" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0 overflow-auto">
        {activeTab === 'sales' ? (
          <SalesConfigDashboard />
        ) : (
          <RewardsConfigDashboard
            configs={data.configs as RewardsConfig[]}
            changeLog={data.changeLog as ChangeLogEntry[]}
            states={data.states as string[]}
            currentUser={data.currentUser as AllowlistedUser}
            onAdd={(draft) => console.log('Add configuration:', draft)}
            onUpdate={(id, draft) => console.log('Update configuration:', id, draft)}
          />
        )}
      </div>
    </div>
  )
}
