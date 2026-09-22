import data from '@/../product/sections/cms/data.json'
import { CMSDashboard } from './components/CMSDashboard'

export default function CMSDashboardPreview() {
  return (
    <CMSDashboard
      blogs={data.blogs as any}
      eventsNews={data.eventsNews as any}
      banners={data.banners as any}
      coupons={data.coupons as any}
      programmes={data.programmes as any}
      auditLog={data.auditLog as any}
      customerCredits={data.customerCredits as any}
    />
  )
}
