import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { IncidentsSidebar } from './IncidentsSidebar';
import { ChatsInbox } from './ChatsInbox';
import { buildSampleChatThreads } from './chatThreadsSampleData';
import { QueueTabs } from './QueueTabs';
import { IncidentsTableHeader } from './IncidentsTableHeader';
import { IncidentRow } from './IncidentRow';
import { BulkActionsBar } from './BulkActionsBar';
import { Pagination } from './Pagination';
import { ExpertAssignedBatchesView } from './ExpertAssignedBatchesView';
export function IncidentList({ incidents, challanQueueCounts, caseQueueCounts, pagination, users, lawyers, sources, offenceTypes, onViewIncident, onOpenChat, onAddChallan, onAddCase, onScreen, onAssignAgent, onAssignLawyer, onMoveQueue, onBulkUpdate, onExport, onSearch, onFilter, onQueueChange, onPageChange, onViewBatch, }) {
    // Sidebar state
    const [selection, setSelection] = useState({
        kind: 'incidents',
        view: 'all',
        workType: 'challans',
    });
    const sidebarView = selection.kind === 'incidents' ? selection.view : 'all';
    const rawWorkType = selection.kind === 'incidents' ? selection.workType : 'challans';
    const workType = rawWorkType === 'cases' || rawWorkType === 'challans' ? rawWorkType : 'challans';
    const isPlaceholderWorkType = selection.kind === 'incidents' &&
        selection.workType !== 'cases' &&
        selection.workType !== 'challans';
    const isChatsView = selection.kind === 'chats';
    const isToolsView = selection.kind === 'tools';
    const chatThreads = useMemo(() => buildSampleChatThreads(incidents), [incidents]);
    const chatsUnreadCount = useMemo(() => chatThreads.filter((t) => t.unreadCount > 0).length, [chatThreads]);
    const unreadByIncident = useMemo(() => {
        const map = new Map();
        chatThreads.forEach((t) => {
            if (t.unreadCount > 0)
                map.set(t.incidentId, t.unreadCount);
        });
        return map;
    }, [chatThreads]);
    // Active queue
    const [activeQueue, setActiveQueue] = useState('newIncidents');
    // Search
    const [searchQuery, setSearchQuery] = useState('');
    // Selection
    const [selectedIds, setSelectedIds] = useState(new Set());
    // Current user ID (for demo, using first user)
    const currentUserId = 'usr-001';
    const isCases = workType === 'cases';
    const queueCounts = isCases ? caseQueueCounts : challanQueueCounts;
    // Filter incidents by workType, active queue, and view (all vs my)
    const filteredIncidents = useMemo(() => {
        const workTypeMatch = (incident) => incident.workType === (isCases ? 'case' : 'challan');
        let filtered = activeQueue === 'all'
            ? incidents.filter(workTypeMatch)
            : incidents.filter((incident) => incident.queue === activeQueue && workTypeMatch(incident));
        // If "My Incidents" view, filter by assigned agent (for challans) or assigned lawyer (for cases)
        if (sidebarView === 'my') {
            if (isCases) {
                filtered = filtered.filter((incident) => incident.assignedLawyerId !== null);
            }
            else {
                filtered = filtered.filter((incident) => incident.assignedAgentId === currentUserId);
            }
        }
        return filtered;
    }, [incidents, activeQueue, sidebarView, isCases]);
    // Search filtering (client-side demo)
    const displayedIncidents = useMemo(() => {
        if (!searchQuery.trim())
            return filteredIncidents;
        const query = searchQuery.toLowerCase();
        return filteredIncidents.filter((incident) => incident.incidentId.toLowerCase().includes(query) ||
            incident.subscriberName.toLowerCase().includes(query) ||
            incident.vehicle.toLowerCase().includes(query) ||
            incident.challanNumber.toLowerCase().includes(query));
    }, [filteredIncidents, searchQuery]);
    const handleQueueChange = (queue) => {
        setActiveQueue(queue);
        setSelectedIds(new Set());
        onQueueChange?.(queue);
    };
    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedIds(new Set(displayedIncidents.map((i) => i.id)));
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
    const allSelected = displayedIncidents.length > 0 &&
        displayedIncidents.every((i) => selectedIds.has(i.id));
    const someSelected = selectedIds.size > 0 && !allSelected;
    const showSettlement = activeQueue !== 'inProgress';
    // Compute queue counts based on view (all vs my)
    const displayedQueueCounts = useMemo(() => {
        if (sidebarView === 'all')
            return queueCounts;
        // For "My Incidents", compute counts for current user's incidents
        const workTypeValue = isCases ? 'case' : 'challan';
        const myIncidents = isCases
            ? incidents.filter((inc) => inc.workType === workTypeValue && inc.assignedLawyerId !== null)
            : incidents.filter((inc) => inc.workType === workTypeValue && inc.assignedAgentId === currentUserId);
        return {
            all: myIncidents.length,
            newIncidents: myIncidents.filter((inc) => inc.queue === 'newIncidents').length,
            screening: myIncidents.filter((inc) => inc.queue === 'screening').length,
            inProgress: myIncidents.filter((inc) => inc.queue === 'inProgress').length,
            expertAssigned: myIncidents.filter((inc) => inc.queue === 'expertAssigned').length,
            underReview: myIncidents.filter((inc) => inc.queue === 'underReview').length,
            settled: myIncidents.filter((inc) => inc.queue === 'settled').length,
            notSettled: myIncidents.filter((inc) => inc.queue === 'notSettled').length,
            hold: myIncidents.filter((inc) => inc.queue === 'hold').length,
            refundRequested: myIncidents.filter((inc) => inc.queue === 'refundRequested').length,
            refundHold: myIncidents.filter((inc) => inc.queue === 'refundHold').length,
            refundRejected: myIncidents.filter((inc) => inc.queue === 'refundRejected').length,
            refundCompleted: myIncidents.filter((inc) => inc.queue === 'refundCompleted').length,
        };
    }, [sidebarView, queueCounts, incidents, isCases]);
    const handleSelectionChange = (next) => {
        setSelection(next);
        if (next.kind === 'incidents') {
            setSelectedIds(new Set());
            if (next.view === 'my' && activeQueue === 'newIncidents') {
                setActiveQueue('inProgress');
            }
            if (next.workType !== workType) {
                setActiveQueue('newIncidents');
            }
        }
    };
    return (_jsxs("div", { className: "flex h-full bg-slate-100 dark:bg-slate-950", children: [_jsx(IncidentsSidebar, { selection: selection, chatsUnreadCount: chatsUnreadCount, onChangeSelection: handleSelectionChange }), _jsx("div", { className: "flex-1 flex flex-col min-w-0", children: isChatsView ? (_jsx(ChatsInbox, { threads: chatThreads, incidents: incidents, lawyers: lawyers, users: users, currentUserId: currentUserId, onOpenThread: (incidentId) => (onOpenChat ?? onViewIncident)?.(incidentId) })) : isToolsView ? (_jsx(PlaceholderPanel, { title: selection.kind === 'tools' && selection.tool === 'incidentDid'
                        ? 'Incident DID'
                        : 'Vendor cancellations', hint: "This tool is coming soon." })) : isPlaceholderWorkType ? (_jsx(PlaceholderPanel, { title: selection.kind === 'incidents' && selection.workType === 'rtoAssistance'
                        ? 'RTO Assistance'
                        : 'Other', hint: "No incidents to show in this workstream yet." })) : (_jsxs(_Fragment, { children: [_jsx(QueueTabs, { activeQueue: activeQueue, queueCounts: displayedQueueCounts, view: sidebarView, workType: workType, onQueueChange: handleQueueChange }), activeQueue === 'expertAssigned' ? (_jsx(ExpertAssignedBatchesView, { workType: workType, onViewBatch: (batchId) => onViewBatch?.(batchId), onViewIncident: (incidentId) => onViewIncident?.(incidentId) })) : (_jsxs(_Fragment, { children: [_jsx(IncidentsTableHeader, { users: users, lawyers: lawyers, sources: sources, searchQuery: searchQuery, workType: workType, onSearchChange: (query) => {
                                        setSearchQuery(query);
                                        onSearch?.(query);
                                    }, onAddChallan: onAddChallan, onAddCase: onAddCase, onBulkUpdate: () => console.log('Bulk update clicked'), onExport: () => onExport?.(selectedIds.size > 0 ? selectedArray : 'all'), onFilter: onFilter }), _jsx("div", { className: "flex-1 overflow-auto bg-white dark:bg-slate-900", children: _jsxs("table", { className: "w-full table-fixed", children: [_jsxs("colgroup", { children: [_jsx("col", { className: "w-12" }), _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-64" }), !isCases && _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-32" }), _jsx("col", { className: "w-32" }), _jsx("col", { className: "w-32" }), showSettlement && _jsx("col", { className: "w-36" }), !isCases && _jsx("col", { className: "w-40" }), isCases && _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-12" })] }), _jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left", children: _jsx("input", { type: "checkbox", checked: allSelected, ref: (el) => {
                                                                    if (el)
                                                                        el.indeterminate = someSelected;
                                                                }, onChange: (e) => handleSelectAll(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700" }) }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: isCases ? 'Case ID' : 'Incident ID' }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Subscriber / Vehicle" }), !isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Challan No / Amount" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: isCases ? 'Type' : 'Challan' }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Updated" }), showSettlement && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Settlement" })), !isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Employee" })), isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Lawyer" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx("tbody", { children: displayedIncidents.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: (isCases ? 9 : 10) - (showSettlement ? 0 : 1), className: "px-4 py-16 text-center text-slate-500 dark:text-slate-400", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-slate-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" }) }) }), _jsxs("p", { className: "font-medium", children: ["No ", isCases ? 'cases' : 'challans', " found"] }), _jsx("p", { className: "text-sm", children: searchQuery
                                                                        ? 'Try adjusting your search query'
                                                                        : `No ${isCases ? 'cases' : 'challans'} in this queue yet` })] }) }) })) : (displayedIncidents.map((incident) => (_jsx(IncidentRow, { incident: incident, isSelected: selectedIds.has(incident.id), users: users, lawyers: lawyers, workType: workType, showSettlement: showSettlement, unreadChatCount: unreadByIncident.get(incident.id) ?? 0, onOpenChat: () => onOpenChat?.(incident.id), onSelect: (checked) => handleSelectOne(incident.id, checked), onView: () => onViewIncident?.(incident.id), onScreen: () => onScreen?.([incident.id]), onAssignAgent: (agentId) => onAssignAgent?.([incident.id], agentId), onAssignLawyer: (lawyerId) => onAssignLawyer?.([incident.id], lawyerId), onMoveQueue: (queue) => onMoveQueue?.([incident.id], queue), onUpdate: () => console.log('Update incident:', incident.id) }, incident.id)))) })] }) }), _jsx(Pagination, { pagination: pagination, onPageChange: onPageChange })] }))] })) }), !isChatsView && activeQueue !== 'expertAssigned' && selectedIds.size > 0 && (_jsx(BulkActionsBar, { selectedCount: selectedIds.size, activeQueue: activeQueue, workType: workType, onClearSelection: () => setSelectedIds(new Set()), onScreen: () => onScreen?.(selectedArray), onAssignAgent: () => onAssignAgent?.(selectedArray), onAssignLawyer: () => onAssignLawyer?.(selectedArray), onMoveQueue: (queue) => onMoveQueue?.(selectedArray, queue), onBulkUpdate: (file) => onBulkUpdate?.(selectedArray, file) }))] }));
}
function PlaceholderPanel({ title, hint }) {
    return (_jsx("div", { className: "flex-1 flex items-center justify-center bg-slate-50 dark:bg-slate-950", children: _jsxs("div", { className: "text-center px-6", children: [_jsx("p", { className: "text-lg font-semibold text-slate-700 dark:text-slate-200", children: title }), _jsx("p", { className: "mt-1 text-sm text-slate-500 dark:text-slate-400", children: hint })] }) }));
}
