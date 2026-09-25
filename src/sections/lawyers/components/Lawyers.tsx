import { useState } from 'react'
import type { Lawyer, LawyersProps } from '@/../product/sections/lawyers/types'
import { LawyerTable } from './LawyerTable'
import { LawyerProfile } from './LawyerProfile'
import { LawyerForm } from './LawyerForm'

type View = 'list' | 'profile' | 'add' | 'edit'

// Sample data for the new tabs
const sampleIncidents = [
  {
    id: '1',
    incidentId: 'INC-2024-001',
    challanNo: 'DL-CH-2024-0892',
    vehicleNo: 'DL-01-AB-1234',
    violationType: 'Over Speeding',
    amount: 2500,
    status: 'Resolved' as const,
    assignedDate: '2024-01-15',
    resolutionDate: '2024-01-22',
  },
  {
    id: '2',
    incidentId: 'INC-2024-002',
    challanNo: 'DL-CH-2024-1023',
    vehicleNo: 'DL-02-CD-5678',
    violationType: 'Red Light Violation',
    amount: 5000,
    status: 'In Progress' as const,
    assignedDate: '2024-01-20',
    resolutionDate: null,
  },
  {
    id: '3',
    incidentId: 'INC-2024-003',
    challanNo: 'DL-CH-2024-1156',
    vehicleNo: 'HR-26-EF-9012',
    violationType: 'No Parking',
    amount: 1500,
    status: 'Assigned' as const,
    assignedDate: '2024-01-25',
    resolutionDate: null,
  },
  {
    id: '4',
    incidentId: 'INC-2024-004',
    challanNo: 'DL-CH-2024-0756',
    vehicleNo: 'DL-03-GH-3456',
    violationType: 'Driving Without Helmet',
    amount: 1000,
    status: 'Closed' as const,
    assignedDate: '2024-01-10',
    resolutionDate: '2024-01-18',
  },
]

const samplePendingInvoices = [
  {
    id: '1',
    incidentId: 'INC-2024-001',
    resolutionDate: '2024-01-22',
    commissionAmount: 500,
    status: 'Settled' as const,
  },
  {
    id: '2',
    incidentId: 'INC-2024-004',
    resolutionDate: '2024-01-18',
    commissionAmount: 200,
    status: 'Not Settled' as const,
  },
  {
    id: '3',
    incidentId: 'INC-2023-089',
    resolutionDate: '2024-01-05',
    commissionAmount: 750,
    status: 'Refund' as const,
  },
]

const sampleTeam = [
  {
    id: 't1',
    name: 'Rohan Verma',
    role: 'Associate Lawyer',
    email: 'rohan.verma@firm.in',
    mobile: '+91 98110 45623',
    assignedIncidents: 24,
    activeIncidents: 7,
    resolvedIncidents: 17,
    joinedDate: '2023-03-15',
    status: 'Active' as const,
    incidentIds: [
      'IRN-2024-0018', 'IRN-2024-0024', 'IRN-2024-0037', 'IRN-2024-0051',
      'IRN-2024-0062', 'IRN-2024-0078', 'IRN-2024-0089', 'IRN-2024-0104',
    ],
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    role: 'Paralegal',
    email: 'priya.sharma@firm.in',
    mobile: '+91 98211 78345',
    assignedIncidents: 18,
    activeIncidents: 4,
    resolvedIncidents: 14,
    joinedDate: '2023-07-01',
    status: 'Active' as const,
    incidentIds: [
      'IRN-2024-0021', 'IRN-2024-0033', 'IRN-2024-0045', 'IRN-2024-0067',
      'IRN-2024-0081', 'IRN-2024-0092',
    ],
  },
  {
    id: 't3',
    name: 'Arjun Mehta',
    role: 'Junior Lawyer',
    email: 'arjun.mehta@firm.in',
    mobile: '+91 99900 12467',
    assignedIncidents: 31,
    activeIncidents: 9,
    resolvedIncidents: 22,
    joinedDate: '2022-11-20',
    status: 'Active' as const,
    incidentIds: [
      'IRN-2024-0012', 'IRN-2024-0029', 'IRN-2024-0041', 'IRN-2024-0053',
      'IRN-2024-0069', 'IRN-2024-0074', 'IRN-2024-0087', 'IRN-2024-0095',
      'IRN-2024-0111',
    ],
  },
  {
    id: 't4',
    name: 'Neha Kapoor',
    role: 'Legal Assistant',
    email: 'neha.kapoor@firm.in',
    mobile: '+91 97112 88790',
    assignedIncidents: 12,
    activeIncidents: 0,
    resolvedIncidents: 12,
    joinedDate: '2024-01-10',
    status: 'Inactive' as const,
    incidentIds: [
      'IRN-2023-0198', 'IRN-2023-0212', 'IRN-2023-0234', 'IRN-2023-0256',
    ],
  },
]

const sampleTransactions = [
  {
    id: '1',
    transactionId: 'TXN-2024-0045',
    invoiceNo: 'INV-2024-0023',
    amount: 15000,
    paymentDate: '2024-01-10',
    paymentMethod: 'Bank Transfer' as const,
    status: 'Paid' as const,
  },
  {
    id: '2',
    transactionId: 'TXN-2024-0032',
    invoiceNo: 'INV-2024-0018',
    amount: 8500,
    paymentDate: '2024-01-05',
    paymentMethod: 'UPI' as const,
    status: 'Paid' as const,
  },
  {
    id: '3',
    transactionId: 'TXN-2023-0198',
    invoiceNo: 'INV-2023-0156',
    amount: 22000,
    paymentDate: '2023-12-28',
    paymentMethod: 'Bank Transfer' as const,
    status: 'Paid' as const,
  },
]

export function Lawyers({ lawyers: initialLawyers }: LawyersProps) {
  const [lawyers, setLawyers] = useState<Lawyer[]>(initialLawyers)
  const [currentView, setCurrentView] = useState<View>('list')
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null)

  const handleView = (id: string) => {
    const lawyer = lawyers.find((l) => l.id === id)
    if (lawyer) {
      setSelectedLawyer(lawyer)
      setCurrentView('profile')
    }
  }

  const handleEdit = (id: string) => {
    const lawyer = lawyers.find((l) => l.id === id)
    if (lawyer) {
      setSelectedLawyer(lawyer)
      setCurrentView('edit')
    }
  }

  const handleAdd = () => {
    setSelectedLawyer(null)
    setCurrentView('add')
  }

  const handleDeactivate = (id: string) => {
    setLawyers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, activityState: 'Inactive' as const } : l))
    )
  }

  const handleReactivate = (id: string) => {
    setLawyers((prev) =>
      prev.map((l) => (l.id === id ? { ...l, activityState: 'Active' as const } : l))
    )
  }

  const handleBack = () => {
    setCurrentView('list')
    setSelectedLawyer(null)
  }

  const handleSave = (lawyer: Lawyer) => {
    if (currentView === 'add') {
      setLawyers((prev) => [lawyer, ...prev])
    } else {
      setLawyers((prev) => prev.map((l) => (l.id === lawyer.id ? lawyer : l)))
    }
    setCurrentView('list')
    setSelectedLawyer(null)
  }

  if (currentView === 'profile' && selectedLawyer) {
    return (
      <LawyerProfile
        lawyer={selectedLawyer}
        incidents={sampleIncidents}
        pendingInvoices={samplePendingInvoices}
        transactions={sampleTransactions}
        team={sampleTeam}
        onBack={handleBack}
        onEdit={() => setCurrentView('edit')}
        onDeactivate={() => {
          handleDeactivate(selectedLawyer.id)
          setSelectedLawyer({ ...selectedLawyer, activityState: 'Inactive' })
        }}
        onReactivate={() => {
          handleReactivate(selectedLawyer.id)
          setSelectedLawyer({ ...selectedLawyer, activityState: 'Active' })
        }}
        onViewIncident={(id) => console.log('View incident:', id)}
        onViewTransaction={(id) => console.log('View transaction:', id)}
        onViewTeamMember={(id) => console.log('View team member:', id)}
      />
    )
  }

  if (currentView === 'add' || (currentView === 'edit' && selectedLawyer)) {
    return (
      <LawyerForm
        lawyer={selectedLawyer}
        onBack={handleBack}
        onSave={handleSave}
        isEdit={currentView === 'edit'}
      />
    )
  }

  return (
    <LawyerTable
      lawyers={lawyers}
      onView={handleView}
      onEdit={handleEdit}
      onAdd={handleAdd}
      onDeactivate={handleDeactivate}
      onReactivate={handleReactivate}
    />
  )
}
