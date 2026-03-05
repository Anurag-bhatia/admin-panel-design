import { jsx as _jsx } from "react/jsx-runtime";
import data from '@/../product/sections/disputes/data.json';
import { DisputeDetailView } from './components/DisputeDetailView';
export default function DisputeDetailPreview() {
    // Pick a dispute with rich data for the preview (under_review with investigation notes and evidence)
    const dispute = data.disputes.find(d => d.id === 'dsp-002') || data.disputes[0];
    const reviewers = data.reviewers;
    return (_jsx("div", { className: "h-[calc(100vh-64px)] overflow-auto", children: _jsx(DisputeDetailView, { dispute: dispute, reviewers: reviewers, onBack: () => console.log('Navigate back to disputes list'), onAssignReviewer: (disputeId, reviewerId) => console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId), onEscalate: (id) => console.log('Escalate dispute:', id), onApproveRefund: (id) => console.log('Approve refund for dispute:', id), onRejectDispute: (id) => console.log('Reject dispute:', id), onCloseDispute: (id) => console.log('Close/resolve dispute:', id), onAddInvestigationNote: (id, content) => console.log('Add investigation note to dispute:', id, content), onUploadEvidence: (id, file) => console.log('Upload evidence to dispute:', id, file.name) }) }));
}
