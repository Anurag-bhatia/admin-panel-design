import { useState } from 'react'
import type { Partner } from '@/../product/sections/partners/types'
import { PartnerList } from './PartnerList'
import { PartnerDetail } from './PartnerDetail'
import { AddPartner } from './AddPartner'
import { AddPartnerChallanPay } from './AddPartnerChallanPay'
import { EditPartner } from './EditPartner'
import { PartnersListHeader } from './PartnersListHeader'
import { AssignAgentModal } from '../../incidents/components/AssignAgentModal'
import { AddSubscriberModal } from '../../subscribers/components/AddSubscriberModal'
import subscriberData from '@/../product/sections/subscribers/data.json'
import incidentData from '@/../product/sections/incidents/data.json'

interface PartnersDashboardProps {
  partners: Partner[]
  onViewIncidents?: (subscriberId: string) => void
}

export function PartnersDashboard({ partners, onViewIncidents }: PartnersDashboardProps) {
  const [selectedPartnerId, setSelectedPartnerId] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState<null | 'challanPay' | 'lots247'>(null)
  const [editingPartnerId, setEditingPartnerId] = useState<string | null>(null)
  const [activePartnerType, setActivePartnerType] = useState<'challanPay' | 'lots247'>('challanPay')
  const [showAddSubscriberModal, setShowAddSubscriberModal] = useState(false)
  const [bulkAssignPartnerIds, setBulkAssignPartnerIds] = useState<string[] | null>(null)

  const selectedPartner = selectedPartnerId ? partners.find(p => p.id === selectedPartnerId) : null
  const editingPartner = editingPartnerId ? partners.find(p => p.id === editingPartnerId) : null

  const challanPayPartners = partners.filter(p => p.partnerType === 'challanPay')
  const challanPayCount = challanPayPartners.length
  const lots247Count = partners.filter(p => p.partnerType === 'lots247').length
  const filteredPartners = partners.filter(p => p.partnerType === activePartnerType)

  // Stage counts for ChallanPay summary cards
  const stageOnboarding = challanPayPartners.filter(p => p.stage === 'onboarding').length
  const stageActivation = challanPayPartners.filter(p => p.stage === 'activation').length
  const stageTraining = challanPayPartners.filter(p => p.stage === 'training').length
  const stageMobilisation = challanPayPartners.filter(p => p.stage === 'mobilisation').length

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
          onAddSubscriber={() => setShowAddSubscriberModal(true)}
          onBulkImportSubscribers={() => console.log('Bulk import subscribers')}
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

        {/* Add Subscriber Modal */}
        {showAddSubscriberModal && (
          <AddSubscriberModal
            users={subscriberData.users as any}
            partners={subscriberData.partners}
            subscriberSources={subscriberData.subscriberSources}
            subscriberTypes={subscriberData.subscriberTypes}
            subscriberSubTypes={subscriberData.subscriberSubTypes}
            onSubmit={(data) => {
              console.log('Add subscriber from partner:', selectedPartner.id, data)
              setShowAddSubscriberModal(false)
            }}
            onClose={() => setShowAddSubscriberModal(false)}
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
          onExport={() => console.log('Export partners')}
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

        {/* Summary Cards — ChallanPay only */}
        {activePartnerType === 'challanPay' && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {([
              { label: 'Total RoadSmart Partners', value: challanPayCount, border: 'border-l-cyan-500', iconBg: 'bg-cyan-100 dark:bg-cyan-900/30', iconColor: 'text-cyan-600 dark:text-cyan-400' },
              { label: 'Onboarding', value: stageOnboarding, border: 'border-l-amber-500', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400' },
              { label: 'Activation', value: stageActivation, border: 'border-l-blue-500', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400' },
              { label: 'Training', value: stageTraining, border: 'border-l-violet-500', iconBg: 'bg-violet-100 dark:bg-violet-900/30', iconColor: 'text-violet-600 dark:text-violet-400' },
              { label: 'Mobilisation', value: stageMobilisation, border: 'border-l-emerald-500', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400' },
            ] as const).map((card) => (
              <div key={card.label} className={`bg-white dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-800 border-l-[3px] ${card.border} shadow-sm`}>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">{card.label}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6">
          <PartnerList
            partners={filteredPartners}
            partnerType={activePartnerType}
            onView={(id) => setSelectedPartnerId(id)}
            onToggleStatus={(id, status) => console.log('Toggle status:', id, status)}
            onBulkAssign={(ids) => setBulkAssignPartnerIds(ids)}
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

      {/* Assign Agent Modal */}
      {bulkAssignPartnerIds && (
        <AssignAgentModal
          selectedCount={bulkAssignPartnerIds.length}
          users={incidentData.users as any}
          entityLabel="partner"
          onAssign={(agentId, notes) => {
            console.log('Assign agent:', agentId, 'to partners:', bulkAssignPartnerIds, 'notes:', notes)
            setBulkAssignPartnerIds(null)
          }}
          onClose={() => setBulkAssignPartnerIds(null)}
        />
      )}
    </div>
  )
}
