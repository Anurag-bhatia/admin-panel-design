import data from '@/../product/sections/rewards-config/data.json'
import cmsData from '@/../product/sections/cms/data.json'
import type {
  RewardsConfig,
  ChangeLogEntry,
  AllowlistedUser,
} from '@/../product/sections/rewards-config/types'
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard'
import { SalesConfigDashboard } from './components/SalesConfigDashboard'
import { CMSDashboard } from '../cms/components/CMSDashboard'

interface RewardsConfigPreviewProps {
  subRoute?: string
}

type ConfigTab = 'sales' | 'web' | 'coupon' | 'wallet'

function resolveTab(subRoute: string | undefined): ConfigTab {
  if (subRoute === 'web' || subRoute === 'coupon' || subRoute === 'wallet') return subRoute
  return 'sales'
}

export default function RewardsConfigPreview({ subRoute }: RewardsConfigPreviewProps) {
  const activeTab = resolveTab(subRoute)

  if (activeTab === 'coupon' || activeTab === 'wallet') {
    return (
      <CMSDashboard
        subRoute={activeTab}
        blogs={cmsData.blogs as any}
        eventsNews={cmsData.eventsNews as any}
        banners={cmsData.banners as any}
        coupons={cmsData.coupons as any}
        programmes={cmsData.programmes as any}
        auditLog={cmsData.auditLog as any}
        customerCredits={cmsData.customerCredits as any}
      />
    )
  }

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
