import { useState } from 'react'
import subscribersData from '@/../product/sections/subscribers/data.json'
import customersData from '@/../product/sections/customers/data.json'
import type {
  Customer,
  Vehicle,
  Incident as CustomerIncident,
  Challan as CustomerChallan,
} from '@/../product/sections/customers/types'
import { SubscribersDashboard } from './components/SubscribersDashboard'
import { CustomerList } from '../customers/components/CustomerList'
import { CustomerDetail } from '../customers/components/CustomerDetail'

type UsersTab = 'customers' | 'subscribers' | 'multi-subscribers'

const TABS: { key: UsersTab; label: string }[] = [
  { key: 'customers', label: 'Customers' },
  { key: 'subscribers', label: 'Subscribers' },
  { key: 'multi-subscribers', label: 'Multi-Subscribers' },
]

export default function SubscribersDashboardPreview() {
  const [activeTab, setActiveTab] = useState<UsersTab>('subscribers')
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const customers = customersData.customers as Customer[]
  const customerVehiclesAll = customersData.vehicles as Vehicle[]
  const customerIncidentsAll = customersData.incidents as CustomerIncident[]
  const customerChallansAll = customersData.challans as CustomerChallan[]
  const selectedCustomer =
    customers.find((c) => c.id === selectedCustomerId) ?? null

  return (
    <div className="flex h-full bg-slate-100 dark:bg-slate-950">
      {/* Users Sidebar */}
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
        {activeTab === 'multi-subscribers' ? (
          <div className="flex h-full items-center justify-center p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Multi-Subscribers
              </h2>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Coming soon.
              </p>
            </div>
          </div>
        ) : activeTab === 'customers' ? (
          selectedCustomer ? (
            <CustomerDetail
              customer={selectedCustomer}
              vehicles={customerVehiclesAll.filter(
                (v) => v.customerId === selectedCustomer.id,
              )}
              incidents={customerIncidentsAll.filter((i) =>
                selectedCustomer.incidentIds.includes(i.id),
              )}
              challans={customerChallansAll.filter((c) =>
                selectedCustomer.challanIds.includes(c.id),
              )}
              onBack={() => setSelectedCustomerId(null)}
              onViewIncident={(id) => console.log('View incident:', id)}
              onViewChallan={(id) => console.log('View challan:', id)}
            />
          ) : (
            <CustomerList
              customers={customers}
              onSearch={(query) => console.log('Search customers:', query)}
              onViewCustomer={(id) => setSelectedCustomerId(id)}
            />
          )
        ) : (
          <SubscribersDashboard
            subscribers={subscribersData.subscribers as any}
            subscriptions={subscribersData.subscriptions as any}
            users={subscribersData.users as any}
            partners={subscribersData.partners}
            subscriberSources={subscribersData.subscriberSources}
            subscriberTypes={subscribersData.subscriberTypes}
            subscriberSubTypes={subscribersData.subscriberSubTypes}
            planTypes={subscribersData.planTypes}
            priceCategories={subscribersData.priceCategories}
            utmSources={subscribersData.utmSources}
            vehicleTypes={subscribersData.vehicleTypes}
            userTypes={subscribersData.userTypes}
            documents={subscribersData.documents as any}
            vehicles={subscribersData.vehicles as any}
            drivers={subscribersData.drivers as any}
            followUps={subscribersData.followUps as any}
            onViewIncident={(incidentId) => console.log('View incident:', incidentId)}
          />
        )}
      </div>
    </div>
  )
}
