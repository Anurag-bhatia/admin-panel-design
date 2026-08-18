import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/disputes/data.json';
import { DisputeList } from './components/DisputeList';
import { DisputeDetailView } from './components/DisputeDetailView';
import { BulkUpdateModal } from './components/BulkUpdateModal';
import { CreateDisputeModal } from './components/CreateDisputeModal';
import { AssignReviewerModal } from './components/AssignReviewerModal';
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
export default function DisputeListPreview() {
    const [viewMode, setViewMode] = useState('list');
    const [selectedDisputeId, setSelectedDisputeId] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
    const [assignDisputeIds, setAssignDisputeIds] = useState([]);
    const selectedDispute = data.disputes.find(d => d.id === selectedDisputeId);
    const handleViewDispute = (id) => {
        setSelectedDisputeId(id);
        setViewMode('detail');
    };
    const handleBack = () => {
        setViewMode('list');
        setSelectedDisputeId(null);
    };
    // Detail view
    if (viewMode === 'detail' && selectedDispute) {
        return (_jsx("div", { className: "h-[calc(100vh-64px)] overflow-auto", children: _jsx(DisputeDetailView, { dispute: selectedDispute, reviewers: data.reviewers, followUps: SAMPLE_FOLLOW_UPS, onBack: handleBack, onAssignReviewer: (disputeId, reviewerId) => console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId), onEscalate: (id) => console.log('Escalate dispute:', id), onApproveRefund: (id) => console.log('Approve refund for dispute:', id), onRejectDispute: (id) => console.log('Reject dispute:', id), onCloseDispute: (id) => console.log('Close/resolve dispute:', id), onAddInvestigationNote: (id, content) => console.log('Add investigation note to dispute:', id, content), onUploadEvidence: (id, file, type) => console.log('Upload document to dispute:', id, file.name, type), onViewDocument: (docId) => console.log('View document:', docId), onDeleteDocument: (docId) => console.log('Delete document:', docId), onAddFollowUp: (id, followUp) => console.log('Add follow-up to dispute:', id, followUp) }) }));
    }
    // List view with modals
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-[calc(100vh-64px)]", children: _jsx(DisputeList, { disputes: data.disputes, stageCounts: data.stageCounts, reviewers: data.reviewers, onViewDispute: handleViewDispute, onCreateDispute: () => setActiveModal('create'), onBulkUpdate: () => setActiveModal('bulkUpdate'), onAssignReviewer: (disputeId) => {
                        setAssignDisputeIds([disputeId]);
                        setActiveModal('assignReviewer');
                    }, onEscalate: (id) => console.log('Escalate dispute:', id), onChangePriority: (id, priority) => console.log('Change priority:', id, priority), onBulkAssignReviewer: (ids) => {
                        setAssignDisputeIds(ids);
                        setActiveModal('assignReviewer');
                    }, onBulkChangePriority: (ids, priority) => console.log('Bulk change priority:', priority, 'for disputes:', ids), onExport: (ids) => console.log('Export disputes:', ids), onSearch: (query) => console.log('Search:', query), onFilter: (filters) => console.log('Filter:', filters), onStageChange: (stage) => console.log('Stage changed:', stage), onPageChange: (page) => console.log('Page changed:', page) }) }), activeModal === 'bulkUpdate' && (_jsx(BulkUpdateModal, { onUpload: (file) => {
                    console.log('Bulk update with file:', file.name);
                    setActiveModal(null);
                }, onClose: () => setActiveModal(null) })), activeModal === 'create' && (_jsx(CreateDisputeModal, { onCreateDispute: (formData) => {
                    console.log('Create dispute:', formData);
                    setActiveModal(null);
                }, onClose: () => setActiveModal(null) })), activeModal === 'assignReviewer' && (_jsx(AssignReviewerModal, { selectedCount: assignDisputeIds.length, reviewers: data.reviewers, onAssign: (reviewerId, notes) => {
                    console.log('Assign reviewer:', reviewerId, 'to disputes:', assignDisputeIds, 'notes:', notes);
                    setActiveModal(null);
                    setAssignDisputeIds([]);
                }, onClose: () => {
                    setActiveModal(null);
                    setAssignDisputeIds([]);
                } }))] }));
}
