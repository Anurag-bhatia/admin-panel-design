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
