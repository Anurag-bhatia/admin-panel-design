import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/proposals/data.json';
import { ProposalList } from './components/ProposalList';
import { ProposalDetailView } from './components/ProposalDetailView';
export default function ProposalListPreview() {
    const [viewMode, setViewMode] = useState('list');
    const [selectedId, setSelectedId] = useState(null);
    const proposals = data.proposals;
    const selectedProposal = proposals.find((p) => p.id === selectedId);
    const selectedItems = selectedId
        ? (data.proposalItems[selectedId] ?? [])
        : [];
    const handleView = (id) => {
        setSelectedId(id);
        setViewMode('detail');
    };
    const handleBack = () => {
        setViewMode('list');
        setSelectedId(null);
    };
    if (viewMode === 'detail' && selectedProposal) {
        return (_jsx(ProposalDetailView, { proposal: selectedProposal, items: selectedItems, activities: data.activities, comments: data.comments, teamMembers: data.teamMembers, onBack: handleBack, onPickUp: (id) => console.log('Pick up:', id), onAssign: (id, tmId) => console.log('Assign:', id, 'to', tmId), onReassign: (id, tmId) => console.log('Reassign:', id, 'to', tmId), onSendQuote: (id, amount, breakdown, note) => console.log('Send quote:', id, amount, breakdown, note), onReviseQuote: (id, amount, breakdown, note) => console.log('Revise quote:', id, amount, breakdown, note), onWithdraw: (id) => console.log('Withdraw:', id), onReject: (id, reason, note) => console.log('Reject:', id, reason, note), onReopen: (id) => console.log('Reopen:', id), onConvertToIncident: (id, incidentId, status, agentId, notes) => console.log('Convert:', id, incidentId, status, agentId, notes), onUpdateServiceStatus: (id, status) => console.log('Update service status:', id, status), onViewIncident: (incidentId) => console.log('View incident:', incidentId), onSendComment: (proposalId, message) => console.log('Send comment:', proposalId, message) }));
    }
    return (_jsx(ProposalList, { proposals: proposals, proposalItems: data.proposalItems, activities: data.activities, comments: data.comments, teamMembers: data.teamMembers, dashboardStats: data.dashboardStats, onPickUp: (id) => console.log('Pick up:', id), onAssign: (id, tmId) => console.log('Assign:', id, 'to', tmId), onReassign: (id, tmId) => console.log('Reassign:', id, 'to', tmId), onSendQuote: (id, amount, breakdown, note) => console.log('Send quote:', id, amount, breakdown, note), onReviseQuote: (id, amount, breakdown, note) => console.log('Revise quote:', id, amount, breakdown, note), onWithdraw: (id) => console.log('Withdraw:', id), onReject: (id, reason, note) => console.log('Reject:', id, reason, note), onReopen: (id) => console.log('Reopen:', id), onConvertToIncident: (id, incidentId, status, agentId, notes) => console.log('Convert:', id, incidentId, status, agentId, notes), onUpdateServiceStatus: (id, status) => console.log('Update service status:', id, status), onView: handleView, onViewIncident: (incidentId) => console.log('View incident:', incidentId), onSendComment: (proposalId, message) => console.log('Send comment:', proposalId, message), onBulkAssign: (ids, tmId) => console.log('Bulk assign:', ids, tmId), onBulkUpdateStatus: (ids, status) => console.log('Bulk update status:', ids, status) }));
}
