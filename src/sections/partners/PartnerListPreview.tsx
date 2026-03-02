import data from '@/../product/sections/partners/data.json'
import { PartnersDashboard } from './components/PartnersDashboard'

export default function PartnerListPreview() {
  return (
    <PartnersDashboard
      partners={data.partners as any}
      onViewIncidents={(subscriberId) => console.log('View incidents for subscriber:', subscriberId)}
    />
  )
}
