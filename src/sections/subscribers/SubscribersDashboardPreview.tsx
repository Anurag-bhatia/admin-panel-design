import data from '@/../product/sections/subscribers/data.json'
import { SubscribersDashboard } from './components/SubscribersDashboard'

export default function SubscribersDashboardPreview() {
  return (
    <SubscribersDashboard
      subscribers={data.subscribers as any}
      subscriptions={data.subscriptions as any}
      users={data.users as any}
      partners={data.partners}
      subscriberSources={data.subscriberSources}
      subscriberTypes={data.subscriberTypes}
      subscriberSubTypes={data.subscriberSubTypes}
      planTypes={data.planTypes}
      priceCategories={data.priceCategories}
      documents={data.documents as any}
      vehicles={data.vehicles as any}
      drivers={data.drivers as any}
      followUps={data.followUps as any}
      onViewIncident={(incidentId) => console.log('View incident:', incidentId)}
    />
  )
}
