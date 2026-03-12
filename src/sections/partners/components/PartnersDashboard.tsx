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
  const [expandedStage, setExpandedStage] = useState<string | null>(null)

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

  // Sub-card metrics for the expanded stage
  const getStageSubMetrics = (stageName: string) => {
    const stagePartners = challanPayPartners.filter(p => p.stage === stageName)
    return {
      active: stagePartners.filter(p => p.status === 'active').length,
      inactive: stagePartners.filter(p => p.status === 'inactive').length,
      assigned: stagePartners.filter(p => p.assignedTo).length,
      unassigned: stagePartners.filter(p => !p.assignedTo).length,
    }
  }

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
          <div className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {([
                { key: 'total', label: 'Total RoadSmart Partners', value: challanPayCount, accent: 'cyan' },
                { key: 'onboarding', label: 'Onboarding', value: stageOnboarding, accent: 'amber' },
                { key: 'activation', label: 'Activation', value: stageActivation, accent: 'blue' },
                { key: 'training', label: 'Training', value: stageTraining, accent: 'violet' },
                { key: 'mobilisation', label: 'Mobilisation', value: stageMobilisation, accent: 'emerald' },
              ] as const).map((card) => {
                const isExpanded = expandedStage === card.key
                const accentBorder: Record<string, string> = {
                  cyan: 'border-l-cyan-500',
                  amber: 'border-l-amber-500',
                  blue: 'border-l-blue-500',
                  violet: 'border-l-violet-500',
                  emerald: 'border-l-emerald-500',
                }
                const accentBg: Record<string, string> = {
                  cyan: 'bg-cyan-50 dark:bg-cyan-950/20',
                  amber: 'bg-amber-50 dark:bg-amber-950/20',
                  blue: 'bg-blue-50 dark:bg-blue-950/20',
                  violet: 'bg-violet-50 dark:bg-violet-950/20',
                  emerald: 'bg-emerald-50 dark:bg-emerald-950/20',
                }

                return (
                  <div
                    key={card.key}
                    className={`relative rounded-xl p-4 border-l-[3px] transition-all cursor-default ${accentBorder[card.accent]} ${
                      isExpanded
                        ? `${accentBg[card.accent]} border border-slate-200/80 dark:border-slate-700/80 shadow-md`
                        : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{card.label}</p>
                        <p className="text-3xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                      </div>
                      {card.key !== 'total' && (
                        <button
                          onClick={() => setExpandedStage(isExpanded ? null : card.key)}
                          className={`mt-0.5 w-7 h-7 flex items-center justify-center rounded-lg transition-all ${
                            isExpanded
                              ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200 rotate-45'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-700 dark:hover:text-slate-200'
                          }`}
                        >
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <line x1="6" y1="2" x2="6" y2="10" />
                            <line x1="2" y1="6" x2="10" y2="6" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Expanded Sub-Cards */}
            {expandedStage && expandedStage !== 'total' && (() => {
              const metrics = getStageSubMetrics(expandedStage)
              const stageLabel = expandedStage.charAt(0).toUpperCase() + expandedStage.slice(1)

              return (
                <div className="mt-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">{stageLabel} Breakdown</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {([
                      { label: 'Active', value: metrics.active, dot: 'bg-emerald-500' },
                      { label: 'Inactive', value: metrics.inactive, dot: 'bg-slate-300 dark:bg-slate-600' },
                      { label: 'Assigned', value: metrics.assigned, dot: 'bg-blue-500' },
                      { label: 'Unassigned', value: metrics.unassigned, dot: 'bg-amber-400' },
                    ]).map((sub) => (
                      <div key={sub.label} className="bg-white dark:bg-slate-900 rounded-lg px-3.5 py-3 border border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${sub.dot}`} />
                          <span className="text-xs text-slate-400 dark:text-slate-500">{sub.label}</span>
                        </div>
                        <p className="text-lg font-bold text-slate-800 dark:text-white">{sub.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })()}
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
