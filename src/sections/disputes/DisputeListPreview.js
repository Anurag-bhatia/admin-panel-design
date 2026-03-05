import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/disputes/data.json';
import { DisputeList } from './components/DisputeList';
import { DisputeDetailView } from './components/DisputeDetailView';
import { BulkUpdateModal } from './components/BulkUpdateModal';
import { ImportDisputesModal } from './components/ImportDisputesModal';
import { CreateDisputeModal } from './components/CreateDisputeModal';
export default function DisputeListPreview() {
    const [viewMode, setViewMode] = useState('list');
    const [selectedDisputeId, setSelectedDisputeId] = useState(null);
    const [activeModal, setActiveModal] = useState(null);
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
        return (_jsx("div", { className: "h-[calc(100vh-64px)] overflow-auto", children: _jsx(DisputeDetailView, { dispute: selectedDispute, reviewers: data.reviewers, onBack: handleBack, onAssignReviewer: (disputeId, reviewerId) => console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId), onEscalate: (id) => console.log('Escalate dispute:', id), onApproveRefund: (id) => console.log('Approve refund for dispute:', id), onRejectDispute: (id) => console.log('Reject dispute:', id), onCloseDispute: (id) => console.log('Close/resolve dispute:', id), onAddInvestigationNote: (id, content) => console.log('Add investigation note to dispute:', id, content), onUploadEvidence: (id, file) => console.log('Upload evidence to dispute:', id, file.name) }) }));
    }
    // List view with modals
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "h-[calc(100vh-64px)]", children: _jsx(DisputeList, { disputes: data.disputes, stageCounts: data.stageCounts, reviewers: data.reviewers, onViewDispute: handleViewDispute, onCreateDispute: () => setActiveModal('create'), onImportDisputes: () => setActiveModal('import'), onBulkUpdate: () => setActiveModal('bulkUpdate'), onAssignReviewer: (disputeId, reviewerId) => console.log('Assign reviewer:', reviewerId, 'to dispute:', disputeId), onEscalate: (id) => console.log('Escalate dispute:', id), onChangePriority: (id, priority) => console.log('Change priority:', id, priority), onBulkAssignReviewer: (ids, reviewerId) => console.log('Bulk assign reviewer:', reviewerId, 'to disputes:', ids), onBulkChangePriority: (ids, priority) => console.log('Bulk change priority:', priority, 'for disputes:', ids), onExport: (ids) => console.log('Export disputes:', ids), onSearch: (query) => console.log('Search:', query), onFilter: (filters) => console.log('Filter:', filters), onStageChange: (stage) => console.log('Stage changed:', stage), onPageChange: (page) => console.log('Page changed:', page) }) }), activeModal === 'bulkUpdate' && (_jsx(BulkUpdateModal, { onUpload: (file) => {
                    console.log('Bulk update with file:', file.name);
                    setActiveModal(null);
                }, onClose: () => setActiveModal(null) })), activeModal === 'import' && (_jsx(ImportDisputesModal, { onImport: (file) => {
                    console.log('Import disputes from file:', file.name);
                    setActiveModal(null);
                }, onClose: () => setActiveModal(null) })), activeModal === 'create' && (_jsx(CreateDisputeModal, { onCreateDispute: (formData) => {
                    console.log('Create dispute:', formData);
                    setActiveModal(null);
                }, onClose: () => setActiveModal(null) }))] }));
}
