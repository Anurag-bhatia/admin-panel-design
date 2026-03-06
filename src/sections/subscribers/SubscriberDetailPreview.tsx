import data from '@/../product/sections/subscribers/data.json'
import { SubscriberDetail } from './components/SubscriberDetail'

export default function SubscriberDetailPreview() {
  const subscriber = data.subscribers[0] as any
  const subscription = data.subscriptions.find((sub: any) => sub.subscriberId === subscriber.id) as any
  const assignedUser = data.users.find((user: any) => user.id === subscriber.assignedOwner) as any

  // Sample incidents data (would come from incidents section in real app)
  const incidents = [
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
  ]

  // Sample challans data
  const challans = [
    {
      id: 'CH-2024-001',
      vehicleNumber: 'MH02AB1234',
      violation: 'Over Speeding',
      amount: 2000,
      status: 'resolved',
      challanType: 'online',
      date: '2024-01-15T09:30:00Z',
      location: 'Mumbai-Pune Expressway, Lonavala'
    },
    {
      id: 'CH-2024-002',
      vehicleNumber: 'UP32MM5678',
      violation: 'Red Light Violation',
      amount: 1500,
      status: 'pending',
      challanType: 'court',
      date: '2024-01-28T16:45:00Z',
      location: 'Lucknow-Agra Expressway, Unnao'
    },
    {
      id: 'CH-2024-003',
      vehicleNumber: 'DL03EF9012',
      violation: 'No Helmet',
      amount: 500,
      status: 'resolved',
      challanType: 'online',
      date: '2024-02-02T11:20:00Z',
      location: 'Connaught Place, New Delhi'
    }
  ]

  // Sample team members
  const teamMembers = data.users.slice(0, 3).map((user: any) => user)

  // Sample documents data
  const documents = data.documents.filter((doc: any) => doc.subscriberId === subscriber.id)

  // Sample API catalogue data
  const apiCatalogue = [
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
  ]

  // Sample reports data
  const reports = [
    // Monthly reports
    { id: 'RPT-001', subscriberId: subscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-03-01T06:00:00Z', fileSize: 245760, period: 'February 2026', periodStart: '2026-02-01', periodEnd: '2026-02-28' },
    { id: 'RPT-002', subscriberId: subscriber.id, reportType: 'MIS-Challan' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-03-01T06:05:00Z', fileSize: 184320, period: 'February 2026', periodStart: '2026-02-01', periodEnd: '2026-02-28' },
    { id: 'RPT-003', subscriberId: subscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'generating' as const, category: 'monthly' as const, generatedAt: '2026-03-06T06:00:00Z', fileSize: null, period: 'March 2026', periodStart: '2026-03-01', periodEnd: '2026-03-31' },
    { id: 'RPT-004', subscriberId: subscriber.id, reportType: 'MIS-Challan' as const, format: 'CSV' as const, status: 'failed' as const, category: 'monthly' as const, generatedAt: '2026-02-01T06:00:00Z', fileSize: null, period: 'January 2026', periodStart: '2026-01-01', periodEnd: '2026-01-31' },
    { id: 'RPT-005', subscriberId: subscriber.id, reportType: 'MIS' as const, format: 'CSV' as const, status: 'ready' as const, category: 'monthly' as const, generatedAt: '2026-02-01T06:00:00Z', fileSize: 312400, period: 'January 2026', periodStart: '2026-01-01', periodEnd: '2026-01-31' },
    // Incident reports
    { id: 'RPT-006', subscriberId: subscriber.id, reportType: 'ICR' as const, format: 'PDF' as const, status: 'ready' as const, category: 'incident' as const, generatedAt: '2026-02-15T10:30:00Z', fileSize: 524288, incidentId: 'IRN-124501', incidentVehicle: 'MH02AB1234', incidentStatus: 'Resolved' },
    { id: 'RPT-007', subscriberId: subscriber.id, reportType: 'ISR' as const, format: 'PDF' as const, status: 'ready' as const, category: 'incident' as const, generatedAt: '2026-02-15T10:35:00Z', fileSize: 412672, incidentId: 'IRN-124501', incidentVehicle: 'MH02AB1234', incidentStatus: 'Resolved' },
    { id: 'RPT-008', subscriberId: subscriber.id, reportType: 'ICR' as const, format: 'PDF' as const, status: 'generating' as const, category: 'incident' as const, generatedAt: '2026-03-05T14:20:00Z', fileSize: null, incidentId: 'IRN-124502', incidentVehicle: 'MH02CD5678', incidentStatus: 'In Progress' },
    { id: 'RPT-009', subscriberId: subscriber.id, reportType: 'ISR' as const, format: 'PDF' as const, status: 'failed' as const, category: 'incident' as const, generatedAt: '2026-03-04T09:00:00Z', fileSize: null, incidentId: 'IRN-124502', incidentVehicle: 'MH02CD5678', incidentStatus: 'In Progress' },
  ]

  // Vehicles linked to this subscriber
  const vehicles = [
    { id: 'VEH-001', subscriberId: 'LWD-1160523', vehicleNumber: 'MH02AB1234', vehicleType: 'truck' as const, make: 'Tata', model: 'Prima', registrationDate: '2022-03-15', status: 'active' as const },
    { id: 'VEH-002', subscriberId: 'LWD-1160523', vehicleNumber: 'MH02CD5678', vehicleType: 'truck' as const, make: 'Ashok Leyland', model: 'Captain', registrationDate: '2021-08-20', status: 'active' as const }
  ]

  return (
    <SubscriberDetail
      subscriber={subscriber}
      subscription={subscription}
      assignedUser={assignedUser}
      incidents={incidents}
      challans={challans}
      documents={documents}
      vehicles={vehicles}
      teamMembers={teamMembers}
      apiCatalogue={apiCatalogue}
      reports={reports}
      onDownloadReport={(id) => console.log('Download report:', id)}
      onRetryReport={(id) => console.log('Retry report:', id)}
      onSaveApiCatalogue={(id, config) => console.log('Save API config:', id, config)}
      onBack={() => console.log('Back to list')}
      onEdit={(id) => console.log('Edit subscriber:', id)}
      onUploadDocument={(subscriberId, file) => console.log('Upload document:', subscriberId, file.name)}
      onDeleteDocument={(subscriberId, docId) => console.log('Delete document:', subscriberId, docId)}
      onViewIncident={(incidentId) => console.log('View incident:', incidentId)}
      onViewChallan={(challanId) => console.log('View challan:', challanId)}
      onAssignTeamMember={() => console.log('Assign team member')}
      onRemoveTeamMember={(userId) => console.log('Remove team member:', userId)}
    />
  )
}
