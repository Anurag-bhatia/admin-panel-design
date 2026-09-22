import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { DisputesSidebar } from './DisputesSidebar';
import { StageTabs } from './StageTabs';
import { DisputesTableHeader } from './DisputesTableHeader';
import { DisputeRow } from './DisputeRow';
import { DisputeBulkActionsBar } from './DisputeBulkActionsBar';
import { Pagination } from './Pagination';
export function DisputeList({ disputes, stageCounts, reviewers, onViewDispute, onCreateDispute, onBulkUpdate, onAssignReviewer, onEscalate, onChangePriority, onBulkAssignReviewer, onBulkChangePriority, onBulkMoveStage, onExport, onSearch, onFilter, onStageChange, onPageChange, }) {
    // Sidebar state
    const [sidebarView, setSidebarView] = useState('all');
    // Active stage
    const [activeStage, setActiveStage] = useState('new_incident');
    // Search
    const [searchQuery, setSearchQuery] = useState('');
    // Filters (client-side)
    const [filters, setFilters] = useState({});
    // Selection
    const [selectedIds, setSelectedIds] = useState(new Set());
    // Current user name (for "My Disputes" filtering in demo)
    const currentUserName = 'Neha Kapoor';
    // Filter disputes by active stage and view
    const filteredDisputes = useMemo(() => {
        let filtered = disputes.filter((dispute) => dispute.status === activeStage);
        if (sidebarView === 'my') {
            filtered = filtered.filter((dispute) => dispute.assignedTo === currentUserName);
        }
        if (filters.type) {
            filtered = filtered.filter((d) => d.disputeType === filters.type);
        }
        if (filters.priority) {
            filtered = filtered.filter((d) => d.priority === filters.priority);
        }
        if (filters.assignedTo) {
            filtered = filtered.filter((d) => d.assignedTo === filters.assignedTo);
        }
        if (filters.department) {
            filtered = filtered.filter((d) => d.transferredToDepartment === filters.department);
        }
        if (filters.dateFrom) {
            filtered = filtered.filter((d) => d.createdOn >= filters.dateFrom);
        }
        if (filters.dateTo) {
            filtered = filtered.filter((d) => d.createdOn <= filters.dateTo);
        }
        return filtered;
    }, [disputes, activeStage, sidebarView, filters]);
    // Search filtering (client-side demo)
    const displayedDisputes = useMemo(() => {
        if (!searchQuery.trim())
            return filteredDisputes;
        const query = searchQuery.toLowerCase();
        return filteredDisputes.filter((dispute) => dispute.disputeId.toLowerCase().includes(query) ||
            dispute.subscriberName.toLowerCase().includes(query) ||
            dispute.linkedEntity.id.toLowerCase().includes(query) ||
            dispute.linkedEntity.label.toLowerCase().includes(query));
    }, [filteredDisputes, searchQuery]);
    const handleStageChange = (stage) => {
        setActiveStage(stage);
        setSelectedIds(new Set());
        onStageChange?.(stage);
    };
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(new Set(displayedDisputes.map((d) => d.id)));
        }
        else {
            setSelectedIds(new Set());
        }
    };
    const handleSelectOne = (id, checked) => {
        const newSelected = new Set(selectedIds);
        if (checked) {
            newSelected.add(id);
        }
        else {
            newSelected.delete(id);
        }
        setSelectedIds(newSelected);
    };
    const selectedArray = Array.from(selectedIds);
    const allSelected = displayedDisputes.length > 0 &&
        displayedDisputes.every((d) => selectedIds.has(d.id));
    const someSelected = selectedIds.size > 0 && !allSelected;
    // Compute stage counts based on view
    const displayedStageCounts = useMemo(() => {
        if (sidebarView === 'all')
            return stageCounts;
        const myDisputes = disputes.filter((d) => d.assignedTo === currentUserName);
        return {
            new_incident: myDisputes.filter((d) => d.status === 'new_incident').length,
            in_progress: myDisputes.filter((d) => d.status === 'in_progress').length,
            assigned: myDisputes.filter((d) => d.status === 'assigned').length,
            transfer_to_department: myDisputes.filter((d) => d.status === 'transfer_to_department').length,
            reroute: myDisputes.filter((d) => d.status === 'reroute').length,
            settled: myDisputes.filter((d) => d.status === 'settled').length,
            not_settled: myDisputes.filter((d) => d.status === 'not_settled').length,
            hold: myDisputes.filter((d) => d.status === 'hold').length,
        };
    }, [sidebarView, stageCounts, disputes]);
    return (_jsxs("div", { className: "flex h-full bg-slate-100 dark:bg-slate-950", children: [_jsx(DisputesSidebar, { view: sidebarView, onViewChange: (view) => {
                    setSidebarView(view);
                    setSelectedIds(new Set());
                } }), _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsx(StageTabs, { activeStage: activeStage, stageCounts: displayedStageCounts, onStageChange: handleStageChange }), _jsx(DisputesTableHeader, { reviewers: reviewers, searchQuery: searchQuery, onSearchChange: (query) => {
                            setSearchQuery(query);
                            onSearch?.(query);
                        }, onBulkUpdate: onBulkUpdate, onCreateDispute: onCreateDispute, onFilter: (f) => {
                            setFilters(f);
                            onFilter?.(f);
                        } }), _jsx("div", { className: "flex-1 overflow-auto bg-white dark:bg-slate-900", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left", children: _jsx("input", { type: "checkbox", checked: allSelected, ref: (el) => {
                                                        if (el)
                                                            el.indeterminate = someSelected;
                                                    }, onChange: (e) => handleSelectAll(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700" }) }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Dispute ID" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Linked Entity" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Type" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Updated" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Priority" }), activeStage === 'transfer_to_department' && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Department" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Product" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Source" }), _jsx("th", { className: "px-4 py-3 text-left", children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx("tbody", { children: displayedDisputes.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: activeStage === 'transfer_to_department' ? 11 : 10, className: "px-4 py-16 text-center text-slate-500 dark:text-slate-400", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-slate-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" }) }) }), _jsx("p", { className: "font-medium", children: "No disputes found" }), _jsx("p", { className: "text-sm", children: searchQuery
                                                            ? 'Try adjusting your search query'
                                                            : 'No disputes in this stage yet' })] }) }) })) : (displayedDisputes.map((dispute) => (_jsx(DisputeRow, { dispute: dispute, isSelected: selectedIds.has(dispute.id), showDepartment: activeStage === 'transfer_to_department', onSelect: (checked) => handleSelectOne(dispute.id, checked), onView: () => onViewDispute?.(dispute.id), onEscalate: () => onEscalate?.(dispute.id), onChangePriority: (priority) => onChangePriority?.(dispute.id, priority) }, dispute.id)))) })] }) }), _jsx(Pagination, { currentPage: 1, totalPages: 1, totalItems: displayedDisputes.length, itemsPerPage: 25, onPageChange: onPageChange })] }), selectedIds.size > 0 && (_jsx(DisputeBulkActionsBar, { selectedCount: selectedIds.size, currentStage: activeStage, onClearSelection: () => setSelectedIds(new Set()), onChangePriority: (priority) => onBulkChangePriority?.(selectedArray, priority), onMoveStage: (stage, department) => {
                    onBulkMoveStage?.(selectedArray, stage, department);
                    setSelectedIds(new Set());
                } }))] }));
}
