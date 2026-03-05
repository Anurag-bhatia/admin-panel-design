import { useState } from 'react'
import type { Partner } from '@/../product/sections/partners/types'
import { PartnerList } from './PartnerList'
import { PartnerDetail } from './PartnerDetail'
import { AddPartner } from './AddPartner'
import { AddPartnerChallanPay } from './AddPartnerChallanPay'
import { EditPartner } from './EditPartner'
import { PartnersListHeader } from './PartnersListHeader'

interface PartnersDashboardProps {
  partners: Partner[]
  onViewIncidents?: (subscriberId: string) => void
}

export function PartnersDashboard({ partners, onViewIncidents }: PartnersDashboardProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState<null | 'challanPay' | 'lots247'>(null)
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null)
  const [activePartnerType, setActivePartnerType] = useState<'challanPay' | 'lots247'>('challanPay')

  const selectedPartner = selectedPartnerId ? partners.find(p => p.id === selectedPartnerId) : null
  const editingPartner = editingPartnerId ? partners.find(p => p.id === editingPartnerId) : null

  const challanPayCount = partners.filter(p => p.partnerType === 'challanPay').length
  const lots247Count = partners.filter(p => p.partnerType === 'lots247').length
  const filteredPartners = partners.filter(p => p.partnerType === activePartnerType)

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
        <PartnersListHeader
          onCreateChallanPay={() => setShowAddModal('challanPay')}
          onCreateLots247={() => setShowAddModal('lots247')}
        />

        {/* Partner Type Tabs */}
        <div className="mt-6">
          <div className="inline-flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl p-1">
            {([
              { key: 'challanPay' as const, label: 'ChallanPay', count: challanPayCount },
              { key: 'lots247' as const, label: 'LOTS247', count: lots247Count },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActivePartnerType(tab.key)}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePartnerType === tab.key
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <PartnerList
            partners={filteredPartners}
            partnerType={activePartnerType}
            onView={(id) => setSelectedPartnerId(id)}
            onToggleStatus={(id, status) => console.log('Toggle status:', id, status)}
          />
        </div>
      </div>

      {/* Add ChallanPay Partner Modal */}
      {showAddModal === 'challanPay' && (
        <AddPartnerChallanPay
          onSubmit={(data) => {
            console.log('Create ChallanPay partner:', data)
            setShowAddModal(null)
          }}
          onCancel={() => setShowAddModal(null)}
        />
      )}

      {/* Add LOTS247 Partner Modal */}
      {showAddModal === 'lots247' && (
        <AddPartner
          onSubmit={(partnerData) => {
            console.log('Create partner:', partnerData)
            setShowAddModal(null)
          }}
          onCancel={() => setShowAddModal(null)}
        />
      )}
    </div>
  )
}
