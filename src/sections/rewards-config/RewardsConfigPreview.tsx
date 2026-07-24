import data from '@/../product/sections/rewards-config/data.json'
import type {
  RewardsConfig,
  ChangeLogEntry,
  AllowlistedUser,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard'

export default function RewardsConfigPreview() {
  return (
    <div className="h-[calc(100vh-64px)] overflow-auto">
      <RewardsConfigDashboard
        configs={data.configs as RewardsConfig[]}
        changeLog={data.changeLog as ChangeLogEntry[]}
        states={data.states as string[]}
        currentUser={data.currentUser as AllowlistedUser}
        onAdd={(draft) => console.log('Add configuration:', draft)}
        onUpdate={(id, draft) => console.log('Update configuration:', id, draft)}
      />
    </div>
  )
}
