import { useState } from 'react'
import data from '@/../product/sections/disputes/data.json'
import { DisputeList } from './components/DisputeList'
import { DisputeDetailView } from './components/DisputeDetailView'
import { BulkUpdateModal } from './components/BulkUpdateModal'
import { ImportDisputesModal } from './components/ImportDisputesModal'
import { CreateDisputeModal } from './components/CreateDisputeModal'
import type {
  Dispute,
  StageCounts,
  Reviewer,
} from '@/../product/sections/disputes/types'

type ViewMode = 'list' | 'detail'
type ModalType = 'bulkUpdate' | 'import' | 'create' | null

export default function DisputeListPreview() {
  const [viewMode, setViewMode] = useState<ViewMode>('list')
  const [selectedDisputeId, setSelectedDisputeId] = useState<string | null>(null)
  const [activeModal, setActiveModal] = useState<ModalType>(null)

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
          onUploadEvidence={(id, file) =>
            console.log('Upload evidence to dispute:', id, file.name)
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
          onImportDisputes={() => setActiveModal('import')}
          onBulkUpdate={() => setActiveModal('bulkUpdate')}
          onAssignReviewer={(disputeId, reviewerId) =>
            console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId)
          }
          onEscalate={(id) => console.log('Escalate dispute:', id)}
          onChangePriority={(id, priority) =>
            console.log('Change priority:', id, priority)
          }
          onBulkAssignReviewer={(ids, reviewerId) =>
            console.log('Bulk assign reviewer:', reviewerId, 'to disputes:', ids)
          }
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

      {/* Import Disputes Modal */}
      {activeModal === 'import' && (
        <ImportDisputesModal
          onImport={(file) => {
            console.log('Import disputes from file:', file.name)
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
    </>
  )
}
