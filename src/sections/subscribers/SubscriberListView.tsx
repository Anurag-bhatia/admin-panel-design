import data from '@/../product/sections/subscribers/data.json'
import { SubscriberList } from './components/SubscriberList'

export default function SubscriberListPreview() {
  return (
    <SubscriberList
      subscribers={data.subscribers as any}
      subscriptions={data.subscriptions as any}
      users={data.users as any}
      partners={data.partners}
      subscriberSources={data.subscriberSources}
      subscriberTypes={data.subscriberTypes}
      subscriberSubTypes={data.subscriberSubTypes}
      planTypes={data.planTypes}
      priceCategories={data.priceCategories}
      onViewDetails={(id) => console.log('View details:', id)}
      onEdit={(id) => console.log('Edit subscriber:', id)}
      onAddSubscriber={() => console.log('Add subscriber')}
      onBulkUpload={() => console.log('Bulk upload')}
      onSearch={(query) => console.log('Search:', query)}
      onFilter={(filters) => console.log('Filter:', filters)}
    />
  )
}
