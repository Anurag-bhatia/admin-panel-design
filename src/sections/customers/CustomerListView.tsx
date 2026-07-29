import { useState } from 'react'
import data from '@/../product/sections/customers/data.json'
import type {
  Customer,
  Vehicle,
  Incident,
  Challan,
} from '@/../product/sections/customers/types'
import { CustomerList } from './components/CustomerList'
import { CustomerDetail } from './components/CustomerDetail'

export default function CustomerListView() {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null)

  const customers = data.customers as Customer[]
  const vehicles = data.vehicles as Vehicle[]
  const incidents = data.incidents as Incident[]
  const challans = data.challans as Challan[]

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId) ?? null

  if (selectedCustomer) {
    const customerVehicles = vehicles.filter((v) => v.customerId === selectedCustomer.id)
    const customerIncidents = incidents.filter((i) =>
      selectedCustomer.incidentIds.includes(i.id),
    )
    const customerChallans = challans.filter((c) =>
      selectedCustomer.challanIds.includes(c.id),
    )
    return (
      <CustomerDetail
        customer={selectedCustomer}
        vehicles={customerVehicles}
        incidents={customerIncidents}
        challans={customerChallans}
        onBack={() => setSelectedCustomerId(null)}
        onViewIncident={(id) => console.log('View incident:', id)}
        onViewChallan={(id) => console.log('View challan:', id)}
      />
    )
  }

  return (
    <CustomerList
      customers={customers}
      onSearch={(query) => console.log('Search customers:', query)}
      onViewCustomer={(id) => setSelectedCustomerId(id)}
    />
  )
}
