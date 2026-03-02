import { useState } from 'react'
import type { Lawyer, LawyersProps } from '../types'
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
