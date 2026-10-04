import data from '@/../product/sections/rewards-config/data.json'
import type {
  RewardsConfig,
  ChangeLogEntry,
  AllowlistedUser,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard'
import { SalesConfigDashboard } from './components/SalesConfigDashboard'

interface RewardsConfigPreviewProps {
  subRoute?: string
}

export default function RewardsConfigPreview({ subRoute }: RewardsConfigPreviewProps) {
  const activeTab: 'sales' | 'web' = subRoute === 'web' ? 'web' : 'sales'

  return (
    <div className="h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 overflow-auto">
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
  )
}
