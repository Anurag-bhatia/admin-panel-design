import data from '@/../product/sections/disputes/data.json'
import { DisputeDetailView } from './components/DisputeDetailView'
import type {
  Dispute,
  Reviewer,
} from '@/../product/sections/disputes/types'

export default function DisputeDetailPreview() {
  // Pick a dispute with rich data for the preview (under_review with investigation notes and evidence)
  const dispute = (data.disputes as Dispute[]).find(d => d.id === 'dsp-002') || (data.disputes[0] as Dispute)
  const reviewers = data.reviewers as Reviewer[]

  return (
    <div className="h-[calc(100vh-64px)] overflow-auto">
      <DisputeDetailView
        dispute={dispute}
        reviewers={reviewers}
        onBack={() => console.log('Navigate back to disputes list')}
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
