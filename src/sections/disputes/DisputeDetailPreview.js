import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/disputes/data.json';
import { DisputeDetailView } from './components/DisputeDetailView';
const SAMPLE_FOLLOW_UPS = [
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
];
export default function DisputeDetailPreview() {
    // Pick a dispute with rich data for the preview (under_review with investigation notes and evidence)
    const dispute = data.disputes.find(d => d.id === 'dsp-002') || data.disputes[0];
    const reviewers = data.reviewers;
    return (_jsx("div", { className: "h-[calc(100vh-64px)] overflow-auto", children: _jsx(DisputeDetailView, { dispute: dispute, reviewers: reviewers, followUps: SAMPLE_FOLLOW_UPS, onBack: () => console.log('Navigate back to disputes list'), onAssignReviewer: (disputeId, reviewerId) => console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId), onEscalate: (id) => console.log('Escalate dispute:', id), onApproveRefund: (id) => console.log('Approve refund for dispute:', id), onRejectDispute: (id) => console.log('Reject dispute:', id), onCloseDispute: (id) => console.log('Close/resolve dispute:', id), onAddInvestigationNote: (id, content) => console.log('Add investigation note to dispute:', id, content), onUploadEvidence: (id, file, type) => console.log('Upload document to dispute:', id, file.name, type), onViewDocument: (docId) => console.log('View document:', docId), onDeleteDocument: (docId) => console.log('Delete document:', docId), onAddFollowUp: (id, followUp) => console.log('Add follow-up to dispute:', id, followUp) }) }));
}
