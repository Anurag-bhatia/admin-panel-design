import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { FileText } from 'lucide-react';
import { DashboardCards } from './DashboardCards';
import { ProposalSidebar } from './ProposalSidebar';
import { ProposalQueueTabs } from './ProposalQueueTabs';
import { ProposalTableHeader } from './ProposalTableHeader';
import { ProposalRow } from './ProposalRow';
import { BulkActionsBar } from './BulkActionsBar';
import { Pagination } from './Pagination';
import { SendQuoteModal } from './SendQuoteModal';
import { RejectModal } from './RejectModal';
import { ConvertToIncidentModal } from './ConvertToIncidentModal';
import { AssignModal } from './AssignModal';
const PAGE_SIZE = 10;
export function ProposalList({ proposals, teamMembers, dashboardStats, onPickUp, onAssign, onReassign, onSendQuote, onReviseQuote, onWithdraw, onReject, onReopen, onConvertToIncident, onUpdateServiceStatus, onView, onViewIncident, onBulkAssign, onBulkUpdateStatus, }) {
    // Tab & filter state
    const [activeTab, setActiveTab] = useState('sent');
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [filters, setFilters] = useState({});
    const [view, setView] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    // Selection state
    const [selectedIds, setSelectedIds] = useState(new Set());
    // Modal state
    const [activeModal, setActiveModal] = useState(null);
    const [modalProposalId, setModalProposalId] = useState(null);
    // Tab counts
    const tabCounts = useMemo(() => ({
        sent: proposals.filter((p) => p.status === 'sent').length,
        under_review: proposals.filter((p) => p.status === 'under_review').length,
        received: proposals.filter((p) => p.status === 'received').length,
        converted: proposals.filter((p) => p.status === 'converted').length,
        rejected: proposals.filter((p) => p.status === 'rejected').length,
    }), [proposals]);
    // Filter proposals
    const filteredProposals = useMemo(() => {
        let result = proposals.filter((p) => p.status === activeTab);
        if (typeFilter !== 'all') {
            result = result.filter((p) => p.type === typeFilter);
        }
        if (filters.assignedTo) {
            if (filters.assignedTo === 'unassigned') {
                result = result.filter((p) => !p.assignedTo);
            }
            else {
                result = result.filter((p) => p.assignedTo?.id === filters.assignedTo);
            }
        }
        if (filters.dateFrom) {
            const from = new Date(filters.dateFrom).getTime();
            result = result.filter((p) => new Date(p.createdAt).getTime() >= from);
        }
        if (filters.dateTo) {
            const to = new Date(filters.dateTo).getTime() + 86400000; // end of day
            result = result.filter((p) => new Date(p.createdAt).getTime() <= to);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter((p) => p.displayId.toLowerCase().includes(q) ||
                p.customer.name.toLowerCase().includes(q) ||
                p.customer.company.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q));
        }
        const sortBy = filters.sortBy || 'newest';
        result = [...result].sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                case 'oldest':
                    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
                case 'amount_high':
                    return b.amount - a.amount;
                case 'amount_low':
                    return a.amount - b.amount;
                case 'qty_high':
                    return b.quantity - a.quantity;
                case 'qty_low':
                    return a.quantity - b.quantity;
                default:
                    return 0;
            }
        });
        return result;
    }, [proposals, activeTab, typeFilter, filters, searchQuery]);
    // Pagination
    const totalPages = Math.ceil(filteredProposals.length / PAGE_SIZE);
    const paginatedProposals = filteredProposals.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
    // Reset page when filters change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
        setSelectedIds(new Set());
    };
    // Selection handlers
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(new Set(paginatedProposals.map((p) => p.id)));
        }
        else {
            setSelectedIds(new Set());
        }
    };
    const handleSelectOne = (id, checked) => {
        const next = new Set(selectedIds);
        if (checked) {
            next.add(id);
        }
        else {
            next.delete(id);
        }
        setSelectedIds(next);
    };
    // Modal helpers
    const openModal = (type, proposalId) => {
        setModalProposalId(proposalId);
        setActiveModal(type);
    };
    const closeModal = () => {
        setActiveModal(null);
        setModalProposalId(null);
    };
    const modalProposal = proposals.find((p) => p.id === modalProposalId);
    // Determine visible columns based on active tab
    const showAssignedCol = activeTab === 'under_review' || activeTab === 'received';
    const showServiceStatusCol = activeTab === 'converted';
    const showLinkedIncidentCol = activeTab === 'converted';
    const colCount = 7 + (showAssignedCol ? 1 : 0) + (showServiceStatusCol ? 1 : 0) + (showLinkedIncidentCol ? 1 : 0);
    const allOnPageSelected = paginatedProposals.length > 0 && paginatedProposals.every((p) => selectedIds.has(p.id));
    return (_jsxs("div", { className: "flex flex-col h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: _jsx(DashboardCards, { stats: dashboardStats }) }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsx(ProposalSidebar, { view: view, typeFilter: typeFilter, onViewChange: setView, onTypeFilterChange: (t) => {
                            setTypeFilter(t);
                            setCurrentPage(1);
                        } }), _jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx(ProposalQueueTabs, { activeTab: activeTab, counts: tabCounts, onTabChange: handleTabChange }), _jsx(ProposalTableHeader, { searchQuery: searchQuery, teamMembers: teamMembers, onSearchChange: (q) => {
                                    setSearchQuery(q);
                                    setCurrentPage(1);
                                }, onFilter: (f) => {
                                    setFilters(f);
                                    setCurrentPage(1);
                                }, onExport: () => console.log('Export proposals') }), _jsx("div", { className: "flex-1 overflow-auto bg-white dark:bg-slate-900", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 z-10", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 w-10", children: _jsx("input", { type: "checkbox", checked: allOnPageSelected, onChange: (e) => handleSelectAll(e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 cursor-pointer" }) }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Request ID" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Customer" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Type" }), _jsx("th", { className: "px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Qty" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Amount" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" }), showAssignedCol && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Assigned To" })), showServiceStatusCol && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Service Status" })), showLinkedIncidentCol && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Incident" })), _jsx("th", { className: "px-4 py-3 w-10" })] }) }), _jsx("tbody", { children: paginatedProposals.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: colCount, className: "px-4 py-16 text-center", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx(FileText, { className: "w-6 h-6 text-slate-400" }) }), _jsx("p", { className: "font-medium text-slate-700 dark:text-slate-300", children: "No proposals found" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: searchQuery
                                                                    ? 'Try adjusting your search or filters'
                                                                    : 'No proposals in this queue' })] }) }) })) : (paginatedProposals.map((proposal) => (_jsx(ProposalRow, { proposal: proposal, isSelected: selectedIds.has(proposal.id), activeTab: activeTab, onSelect: (checked) => handleSelectOne(proposal.id, checked), onView: () => onView?.(proposal.id), onPickUp: () => onPickUp?.(proposal.id), onAssign: () => openModal('assign', proposal.id), onSendQuote: () => openModal('sendQuote', proposal.id), onReassign: () => openModal('reassign', proposal.id), onReject: () => openModal('reject', proposal.id), onReviseQuote: () => openModal('reviseQuote', proposal.id), onWithdraw: () => onWithdraw?.(proposal.id), onUpdateServiceStatus: () => onUpdateServiceStatus?.(proposal.id, 'in_progress'), onViewIncident: () => proposal.linkedIncidentId
                                                    ? onViewIncident?.(proposal.linkedIncidentId)
                                                    : undefined, onReopen: () => onReopen?.(proposal.id) }, proposal.id)))) })] }) }), _jsx(Pagination, { currentPage: currentPage, totalPages: totalPages, totalItems: filteredProposals.length, pageSize: PAGE_SIZE, onPageChange: setCurrentPage })] })] }), _jsx(BulkActionsBar, { selectedCount: selectedIds.size, activeTab: activeTab, teamMembers: teamMembers, onClear: () => setSelectedIds(new Set()), onBulkAssign: (tmId) => {
                    onBulkAssign?.(Array.from(selectedIds), tmId);
                    setSelectedIds(new Set());
                }, onBulkUpdateStatus: (status) => {
                    onBulkUpdateStatus?.(Array.from(selectedIds), status);
                    setSelectedIds(new Set());
                } }), activeModal === 'sendQuote' && modalProposal && (_jsx(SendQuoteModal, { proposal: modalProposal, onSubmit: (amount, breakdown, note) => {
                    onSendQuote?.(modalProposal.id, amount, breakdown, note);
                    closeModal();
                }, onCancel: closeModal })), activeModal === 'reviseQuote' && modalProposal && (_jsx(SendQuoteModal, { proposal: modalProposal, isRevise: true, onSubmit: (amount, breakdown, note) => {
                    onReviseQuote?.(modalProposal.id, amount, breakdown, note);
                    closeModal();
                }, onCancel: closeModal })), activeModal === 'reject' && modalProposal && (_jsx(RejectModal, { proposal: modalProposal, onSubmit: (reason, note) => {
                    onReject?.(modalProposal.id, reason, note);
                    closeModal();
                }, onCancel: closeModal })), activeModal === 'convert' && modalProposal && (_jsx(ConvertToIncidentModal, { proposal: modalProposal, teamMembers: teamMembers, onSubmit: (incidentId, serviceStatus, agentId, notes) => {
                    onConvertToIncident?.(modalProposal.id, incidentId, serviceStatus, agentId, notes);
                    closeModal();
                }, onCancel: closeModal })), (activeModal === 'assign' || activeModal === 'reassign') && modalProposal && (_jsx(AssignModal, { proposal: modalProposal, teamMembers: teamMembers, isReassign: activeModal === 'reassign', onSubmit: (tmId) => {
                    if (activeModal === 'reassign') {
                        onReassign?.(modalProposal.id, tmId);
                    }
                    else {
                        onAssign?.(modalProposal.id, tmId);
                    }
                    closeModal();
                }, onCancel: closeModal }))] }));
}
