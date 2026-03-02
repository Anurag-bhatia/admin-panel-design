import { useState } from 'react'
import type { Partner } from '@/../product/sections/partners/types'
import { PartnerList } from './PartnerList'
import { PartnerDetail } from './PartnerDetail'
import { AddPartner } from './AddPartner'
import { EditPartner } from './EditPartner'
import { PartnersListHeader } from './PartnersListHeader'

interface PartnersDashboardProps {
  partners: Partner[]
  onViewIncidents?: (subscriberId: string) => void
}

export function PartnersDashboard({ partners, onViewIncidents }: PartnersDashboardProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null)

  const selectedPartner = selectedPartnerId ? partners.find(p => p.id === selectedPartnerId) : null
  const editingPartner = editingPartnerId ? partners.find(p => p.id === editingPartnerId) : null

  // If a partner is selected, show detail view
  if (selectedPartner) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        <PartnerDetail
          partner={selectedPartner}
          onBack={() => setSelectedPartnerId(null)}
          onEditPartner={(id) => setEditingPartnerId(id)}
          onViewIncidents={onViewIncidents}
          onUploadDocument={(id, file) => console.log('Upload document:', id, file)}
          onDeleteDocument={(id, documentId) => console.log('Delete document:', documentId)}
        />

        {/* Edit Partner Modal */}
        {editingPartner && (
          <EditPartner
            partner={editingPartner}
            onSubmit={(partnerData) => {
              console.log('Update partner:', editingPartnerId, partnerData)
              setEditingPartnerId(null)
            }}
            onCancel={() => setEditingPartnerId(null)}
          />
        )}
      </div>
    )
  }

  // Otherwise show list view
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <PartnersListHeader onCreatePartner={() => setShowAddModal(true)} />

        <div className="mt-6">
          <PartnerList
            partners={partners}
            onView={(id) => setSelectedPartnerId(id)}
            onToggleStatus={(id, status) => console.log('Toggle status:', id, status)}
          />
        </div>
      </div>

      {/* Add Partner Modal */}
      {showAddModal && (
        <AddPartner
          onSubmit={(partnerData) => {
            console.log('Create partner:', partnerData)
            setShowAddModal(false)
          }}
          onCancel={() => setShowAddModal(false)}
        />
      )}
    </div>
  )
}
