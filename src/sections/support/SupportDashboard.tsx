import data from '@/../product/sections/support/data.json'
import { SupportDashboard } from './components/SupportDashboard'

export default function SupportDashboardPreview() {
  return (
    <SupportDashboard
      submissions={data.supportSubmissions}
      onView={(id) => console.log('View submission:', id)}
      onConvertToLead={(id) => console.log('Convert to Lead:', id)}
      onConvertToDispute={(id) => console.log('Convert to Dispute:', id)}
      onConvertToPartnership={(id) => console.log('Convert to Partnership:', id)}
    />
  )
}
