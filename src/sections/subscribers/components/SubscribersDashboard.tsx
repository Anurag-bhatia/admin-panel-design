import { useState } from 'react'
import type { Subscriber, Subscription, User } from '@/../product/sections/subscribers/types'
import { SubscriberList } from './SubscriberList'
import { SubscriberDetail } from './SubscriberDetail'

interface SubscribersDashboardProps {
  subscribers: Subscriber[]
  subscriptions: Subscription[]
  users: User[]
  partners: any[]
  subscriberSources: string[]
  subscriberTypes: string[]
  subscriberSubTypes: Record<string, string[]>
  planTypes: string[]
  priceCategories: string[]
  documents?: any[]
  vehicles?: any[]
  drivers?: any[]
  followUps?: any[]
  onViewIncident?: (incidentId: string) => void
}

export function SubscribersDashboard({
  subscribers,
  subscriptions,
  users,
  partners,
  subscriberSources,
  subscriberTypes,
  subscriberSubTypes,
  planTypes,
  priceCategories,
  documents = [],
  vehicles = [],
  drivers = [],
  followUps = [],
  onViewIncident
}: SubscribersDashboardProps) {
  const [selectedSubscriberId, setSelectedSubscriberId] = useState<string | null>(null)

  const selectedSubscriber = selectedSubscriberId ? subscribers.find(s => s.id === selectedSubscriberId) : null
  const selectedSubscription = selectedSubscriber ? subscriptions.find(sub => sub.subscriberId === selectedSubscriber.id) : null
  const assignedUser = selectedSubscriber ? users.find(u => u.id === selectedSubscriber.assignedOwner) : null
  const subscriberDocuments = selectedSubscriber ? documents.filter((doc: any) => doc.subscriberId === selectedSubscriber.id) : []
  const subscriberVehicles = selectedSubscriber ? vehicles.filter((veh: any) => veh.subscriberId === selectedSubscriber.id) : []
  const subscriberDrivers = selectedSubscriber ? drivers.filter((drv: any) => drv.subscriberId === selectedSubscriber.id) : []
  const subscriberFollowUps = selectedSubscriber ? followUps.filter((fup: any) => fup.subscriberId === selectedSubscriber.id) : []

  // Sample incidents data
  const incidents = selectedSubscriber ? [
    {
      id: 'IRN-124501',
      vehicleNumber: 'MH02AB1234',
      status: 'Resolved',
      date: '2024-01-20T10:30:00Z'
    },
    {
      id: 'IRN-124502',
      vehicleNumber: 'MH02CD5678',
      status: 'In Progress',
      date: '2024-01-25T14:15:00Z'
    }
  ] : []

  // Sample challans data
  const challans = selectedSubscriber ? [
    { id: 'MH11279200417102541', vehicleNumber: 'MH02AB1234', violation: 'Overspeeding on National Highway Beyond Permissible Limit', amount: 2000, status: 'pending', challanType: 'online', date: '2024-02-10T08:30:00Z', location: 'Mumbai-Pune Expressway, Lonavala' },
    { id: 'MH11279200417102542', vehicleNumber: 'MH02AB1234', violation: 'Red Light Jump at Signal Controlled Intersection', amount: 5000, status: 'resolved', challanType: 'court', date: '2024-01-15T11:00:00Z', location: 'Andheri Signal, Mumbai' },
    { id: 'MH11279200417102543', vehicleNumber: 'MH02AB1234', violation: 'No Parking in Designated No-Parking Zone', amount: 1500, status: 'pending', challanType: 'online', date: '2024-02-20T14:45:00Z', location: 'Bandra West, Mumbai' },
    { id: 'MH11279200417102544', vehicleNumber: 'MH02CD5678', violation: 'Overloading Beyond Permitted Gross Vehicle Weight', amount: 10000, status: 'pending', challanType: 'court', date: '2024-02-05T09:15:00Z', location: 'Vashi Toll Naka, Navi Mumbai' },
    { id: 'MH11279200417102545', vehicleNumber: 'MH02CD5678', violation: 'Lane Violation and Dangerous Driving on Expressway', amount: 3000, status: 'resolved', challanType: 'online', date: '2023-12-28T16:30:00Z', location: 'Eastern Express Highway, Thane' },
    { id: 'MH11279200417102546', vehicleNumber: 'MH04EF9012', violation: 'Expired Vehicle Registration and Fitness Certificate', amount: 7500, status: 'pending', challanType: 'court', date: '2024-02-18T10:00:00Z', location: 'Hinjewadi, Pune' },
    { id: 'MH11279200417102547', vehicleNumber: 'MH04EF9012', violation: 'Riding Without Helmet in Municipal Corporation Area', amount: 1000, status: 'resolved', challanType: 'online', date: '2024-01-05T13:20:00Z', location: 'FC Road, Pune' },
  ] : []

  // Sample team members
  const teamMembers = selectedSubscriber ? users.slice(0, 3) : []

  // Sample API catalogue data
  const apiCatalogue = selectedSubscriber ? [
    {
      id: 'challan-api', name: 'Challan API', enabled: true, credits: 500, creditPerHit: 2, usedCredits: 320,
      transactions: [
        { id: 'txn-1', description: 'Challan lookup — MH02AB1234', creditsUsed: 2, date: '2026-03-05T14:30:00Z' },
        { id: 'txn-2', description: 'Challan lookup — UP32MM5678', creditsUsed: 2, date: '2026-03-04T11:15:00Z' },
        { id: 'txn-3', description: 'Bulk challan fetch — 5 vehicles', creditsUsed: 10, date: '2026-03-03T09:00:00Z' },
        { id: 'txn-4', description: 'Challan lookup — DL03EF9012', creditsUsed: 2, date: '2026-03-01T16:45:00Z' },
      ]
    },
    {
      id: 'rc-api', name: 'RC API', enabled: true, credits: 200, creditPerHit: 5, usedCredits: 185,
      transactions: [
        { id: 'txn-5', description: 'RC verification — MH02AB1234', creditsUsed: 5, date: '2026-03-05T10:00:00Z' },
        { id: 'txn-6', description: 'RC verification — GJ01XY9876', creditsUsed: 5, date: '2026-03-04T08:30:00Z' },
        { id: 'txn-7', description: 'Bulk RC fetch — 3 vehicles', creditsUsed: 15, date: '2026-03-02T13:20:00Z' },
      ]
    },
    {
      id: 'dl-api', name: 'DL API', enabled: false, credits: 0, creditPerHit: 0, usedCredits: 0,
      transactions: []
    },
  ] : []

  // Sample reports data
  const reports = selectedSubscriber ? [
    { id: 'RPT-001', subscriberId: selectedSubscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-03-01T06:00:00Z', fileSize: 245760, period: 'February 2026', periodStart: '2026-02-01', periodEnd: '2026-02-28' },
    { id: 'RPT-002', subscriberId: selectedSubscriber.id, reportType: 'MIS-Challan' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-03-01T06:05:00Z', fileSize: 184320, period: 'February 2026', periodStart: '2026-02-01', periodEnd: '2026-02-28' },
    { id: 'RPT-003', subscriberId: selectedSubscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'generating' as const, category: 'monthly' as const, generatedAt: '2026-03-06T06:00:00Z', fileSize: null, period: 'March 2026', periodStart: '2026-03-01', periodEnd: '2026-03-31' },
    { id: 'RPT-004', subscriberId: selectedSubscriber.id, reportType: 'MIS-Challan' as const, format: 'CSV' as const, status: 'failed' as const, category: 'monthly' as const, generatedAt: '2026-02-01T06:00:00Z', fileSize: null, period: 'January 2026', periodStart: '2026-01-01', periodEnd: '2026-01-31' },
    { id: 'RPT-005', subscriberId: selectedSubscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-02-01T06:00:00Z', fileSize: 312400, period: 'January 2026', periodStart: '2026-01-01', periodEnd: '2026-01-31' },
    { id: 'RPT-006', subscriberId: selectedSubscriber.id, reportType: 'ICR' as const, format: 'PDF' as const, status: 'ready' as const, category: 'incident' as const, generatedAt: '2026-02-15T10:30:00Z', fileSize: 524288, incidentId: 'IRN-124501', incidentVehicle: 'MH02AB1234', incidentStatus: 'Resolved' },
    { id: 'RPT-007', subscriberId: selectedSubscriber.id, reportType: 'ISR' as const, format: 'PDF' as const, status: 'ready' as const, category: 'incident' as const, generatedAt: '2026-02-15T10:35:00Z', fileSize: 412672, incidentId: 'IRN-124501', incidentVehicle: 'MH02AB1234', incidentStatus: 'Resolved' },
    { id: 'RPT-008', subscriberId: selectedSubscriber.id, reportType: 'ICR' as const, format: 'PDF' as const, status: 'generating' as const, category: 'incident' as const, generatedAt: '2026-03-05T14:20:00Z', fileSize: null, incidentId: 'IRN-124502', incidentVehicle: 'MH02CD5678', incidentStatus: 'In Progress' },
    { id: 'RPT-009', subscriberId: selectedSubscriber.id, reportType: 'ISR' as const, format: 'PDF' as const, status: 'failed' as const, category: 'incident' as const, generatedAt: '2026-03-04T09:00:00Z', fileSize: null, incidentId: 'IRN-124502', incidentVehicle: 'MH02CD5678', incidentStatus: 'In Progress' },
  ] : []

  // If a subscriber is selected, show detail view
  if (selectedSubscriber) {
    return (
      <SubscriberDetail
        subscriber={selectedSubscriber}
        subscription={selectedSubscription || null}
        assignedUser={assignedUser || null}
        incidents={incidents}
        challans={challans}
        documents={subscriberDocuments}
        vehicles={subscriberVehicles}
        teamMembers={teamMembers}
        apiCatalogue={apiCatalogue}
        reports={reports}
        onDownloadReport={(id) => console.log('Download report:', id)}
        onRetryReport={(id) => console.log('Retry report:', id)}
        onSaveApiCatalogue={(id, config) => console.log('Save API config:', id, config)}
        onBack={() => setSelectedSubscriberId(null)}
        onEdit={(id) => console.log('Edit subscriber:', id)}
        onUploadDocument={(subscriberId, file) => console.log('Upload document:', subscriberId, file.name)}
        onDeleteDocument={(subscriberId, docId) => console.log('Delete document:', subscriberId, docId)}
        onViewIncident={onViewIncident}
        onViewChallan={(challanId) => console.log('View challan:', challanId)}
        users={users}
        partners={partners}
        subscriberSources={subscriberSources}
        subscriberTypes={subscriberTypes}
        subscriberSubTypes={subscriberSubTypes}
      />
    )
  }

  // Otherwise show list view
  return (
    <SubscriberList
      subscribers={subscribers}
      subscriptions={subscriptions}
      users={users}
      partners={partners}
      subscriberSources={subscriberSources}
      subscriberTypes={subscriberTypes}
      subscriberSubTypes={subscriberSubTypes}
      planTypes={planTypes}
      priceCategories={priceCategories}
      onViewDetails={(id) => setSelectedSubscriberId(id)}
      onEdit={(id) => console.log('Edit subscriber:', id)}
      onAddSubscriber={() => console.log('Add subscriber')}
      onBulkUpload={() => console.log('Bulk upload')}
      onSearch={(query) => console.log('Search:', query)}
      onFilter={(filters) => console.log('Filter:', filters)}
    />
  )
}
