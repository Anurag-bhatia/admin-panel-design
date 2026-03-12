import { useState } from 'react'
import data from '@/../product/sections/disputes/data.json'
import { DisputeList } from './components/DisputeList'
import { DisputeDetailView } from './components/DisputeDetailView'
import { BulkUpdateModal } from './components/BulkUpdateModal'
import { CreateDisputeModal } from './components/CreateDisputeModal'
import { AssignReviewerModal } from './components/AssignReviewerModal'
import type { DisputeFollowUp } from './components/DisputeActivityTab'
import type {
  Dispute,
  StageCounts,
  Reviewer,
} from '@/../product/sections/disputes/types'

const SAMPLE_FOLLOW_UPS: DisputeFollowUp[] = [
  {
    id: 'fu-001',
    outcome: 'In Progress',
    notes: 'Contacted subscriber to collect additional documentation. Subscriber confirmed the refund was not received despite system showing processed.',
    createdAt: '2026-02-20T14:30:00Z',
    createdByName: 'Neha Kapoor',
  },
  {
    id: 'fu-002',
    outcome: 'In Progress',
    notes: 'Verified with payment team — refund was initiated but failed due to incorrect bank details. Re-initiated refund with updated details.',
    createdAt: '2026-02-18T11:15:00Z',
    createdByName: 'Vikram Singh',
  },
  {
    id: 'fu-003',
    outcome: 'Open',
    notes: 'Dispute raised by subscriber. Initial review of linked incident confirms challan was disposed but refund not triggered.',
    createdAt: '2026-02-15T09:00:00Z',
    createdByName: 'Priya Malhotra',
  },
]

type ViewMode = 'list' | 'detail'
type ModalType = 'bulkUpdate' | 'create' | 'assignReviewer' | null

export default function DisputeListPreview() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [assignDisputeIds, setAssignDisputeIds] = useState<string[]>([])

  const selectedDispute = data.disputes.find(d => d.id === selectedDisputeId) as Dispute | undefined

  const handleViewDispute = (id: string) => {
    setSelectedDisputeId(id)
    setViewMode('detail')
  }

  const handleBack = () => {
    setViewMode('list')
    setSelectedDisputeId(null)
  }

  // Detail view
  if (viewMode === 'detail' && selectedDispute) {
    return (
      <div className="h-[calc(100vh-64px)] overflow-auto">
        <DisputeDetailView
          dispute={selectedDispute}
          reviewers={data.reviewers as Reviewer[]}
          followUps={SAMPLE_FOLLOW_UPS}
          onBack={handleBack}
          onAssignReviewer={(disputeId, reviewerId) =>
            console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId)
          }
          onEscalate={(id) => console.log('Escalate dispute:', id)}
          onApproveRefund={(id) => console.log('Approve refund for dispute:', id)}
          onRejectDispute={(id) => console.log('Reject dispute:', id)}
          onCloseDispute={(id) => console.log('Close/resolve dispute:', id)}
          onAddInvestigationNote={(id, content) =>
            console.log('Add investigation note to dispute:', id, content)
          }
          onUploadEvidence={(id, file, type) =>
            console.log('Upload document to dispute:', id, file.name, type)
          }
          onViewDocument={(docId) => console.log('View document:', docId)}
          onDeleteDocument={(docId) => console.log('Delete document:', docId)}
          onAddFollowUp={(id, followUp) =>
            console.log('Add follow-up to dispute:', id, followUp)
          }
        />
      </div>
    )
  }

  // List view with modals
  return (
    <>
      <div className="h-[calc(100vh-64px)]">
        <DisputeList
          disputes={data.disputes as Dispute[]}
          stageCounts={data.stageCounts as StageCounts}
          reviewers={data.reviewers as Reviewer[]}
          onViewDispute={handleViewDispute}
          onCreateDispute={() => setActiveModal('create')}
          onBulkUpdate={() => setActiveModal('bulkUpdate')}
          onAssignReviewer={(disputeId) => {
            setAssignDisputeIds([disputeId])
            setActiveModal('assignReviewer')
          }}
          onEscalate={(id) => console.log('Escalate dispute:', id)}
          onChangePriority={(id, priority) =>
            console.log('Change priority:', id, priority)
          }
          onBulkAssignReviewer={(ids) => {
            setAssignDisputeIds(ids)
            setActiveModal('assignReviewer')
          }}
          onBulkChangePriority={(ids, priority) =>
            console.log('Bulk change priority:', priority, 'for disputes:', ids)
          }
          onExport={(ids) => console.log('Export disputes:', ids)}
          onSearch={(query) => console.log('Search:', query)}
          onFilter={(filters) => console.log('Filter:', filters)}
          onStageChange={(stage) => console.log('Stage changed:', stage)}
          onPageChange={(page) => console.log('Page changed:', page)}
        />
      </div>

      {/* Bulk Update Modal */}
      {activeModal === 'bulkUpdate' && (
        <BulkUpdateModal
          onUpload={(file) => {
            console.log('Bulk update with file:', file.name)
            setActiveModal(null)
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Create Dispute Modal */}
      {activeModal === 'create' && (
        <CreateDisputeModal
          onCreateDispute={(formData) => {
            console.log('Create dispute:', formData)
            setActiveModal(null)
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Assign Reviewer Modal */}
      {activeModal === 'assignReviewer' && (
        <AssignReviewerModal
          selectedCount={assignDisputeIds.length}
          reviewers={data.reviewers as Reviewer[]}
          onAssign={(reviewerId, notes) => {
            console.log('Assign reviewer:', reviewerId, 'to disputes:', assignDisputeIds, 'notes:', notes)
            setActiveModal(null)
            setAssignDisputeIds([])
          }}
          onClose={() => {
            setActiveModal(null)
            setAssignDisputeIds([])
          }}
        />
      )}
    </>
  )
}
