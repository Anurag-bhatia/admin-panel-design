import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, Download } from 'lucide-react';
import data from '@/../product/sections/batch/data.json';
import incidentsData from '@/../product/sections/incidents/data.json';
import { BatchRow } from './components/BatchRow';
import { BatchDetailView } from './BatchDetailView';
import { IncidentDetailView } from '../incidents/IncidentDetailView';
const BATCH_TABS = [
    { key: 'pending', label: 'Pending Acceptance' },
    { key: 'accepted', label: 'Accepted' },
    { key: 'completed', label: 'Completed' },
    { key: 'not_completed', label: 'Not Completed' },
];
function isBatchInStage(batch, stage) {
    if (stage === 'pending')
        return batch.status === 'Pending Acceptance';
    if (stage === 'accepted')
        return batch.status === 'Accepted';
    if (stage === 'completed')
        return batch.status === 'Completed';
    if (stage === 'not_completed')
        return batch.status === 'Not Completed';
    return true;
}
export default function BatchListPreview() {
    const batches = data.batches;
    const incidents = incidentsData.incidents;
    const subscribers = incidentsData.subscribers;
    const users = incidentsData.users;
    const lawyers = incidentsData.lawyers;
    const [stage, setStage] = useState('pending');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIds, setSelectedIds] = useState(new Set());
    const [viewMode, setViewMode] = useState('list');
    const [selectedBatchId, setSelectedBatchId] = useState(null);
    const [selectedIncidentId, setSelectedIncidentId] = useState(null);
    const headerCheckboxRef = useRef(null);
    const showExpertColumn = stage !== 'pending';
    const selectedBatch = batches.find((b) => b.batchId === selectedBatchId) ?? null;
    const selectedIncident = incidents.find((i) => i.id === selectedIncidentId) ?? null;
    const incidentSubscriber = selectedIncident
        ? subscribers.find((s) => s.id === selectedIncident.subscriberId) ?? null
        : null;
    const incidentAgent = selectedIncident?.assignedAgentId
        ? users.find((u) => u.id === selectedIncident.assignedAgentId) ?? null
        : null;
    const incidentLawyer = selectedIncident?.assignedLawyerId
        ? lawyers.find((l) => l.id === selectedIncident.assignedLawyerId) ?? null
        : null;
    const followUps = selectedIncidentId
        ? incidentsData.followUps.filter((f) => f.incidentId === selectedIncidentId)
        : [];
    const timelineActivities = selectedIncidentId
        ? incidentsData.timelineActivities.filter((t) => t.incidentId === selectedIncidentId)
        : [];
    const incidentDocuments = selectedIncidentId
        ? incidentsData.documents.filter((d) => d.incidentId === selectedIncidentId)
        : [];
    const openBatchDetail = (batchId) => {
        setSelectedBatchId(batchId);
        setViewMode('batchDetail');
    };
    const openIncidentDetail = (incidentId) => {
        setSelectedIncidentId(incidentId);
        setViewMode('incidentDetail');
    };
    const backToList = () => {
        setViewMode('list');
        setSelectedBatchId(null);
        setSelectedIncidentId(null);
    };
    const backToBatchDetail = () => {
        setViewMode('batchDetail');
        setSelectedIncidentId(null);
    };
    useEffect(() => {
        setSelectedIds(new Set());
    }, [stage]);
    const counts = useMemo(() => ({
        pending: batches.filter((b) => b.status === 'Pending Acceptance').length,
        accepted: batches.filter((b) => b.status === 'Accepted').length,
        completed: batches.filter((b) => b.status === 'Completed').length,
        not_completed: batches.filter((b) => b.status === 'Not Completed').length,
    }), [batches]);
    const filtered = useMemo(() => {
        let result = batches.filter((b) => isBatchInStage(b, stage));
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            result = result.filter((b) => b.batchId.toLowerCase().includes(q) ||
                b.assignedExpertId.toLowerCase().includes(q) ||
                b.assignedExpertName.toLowerCase().includes(q));
        }
        return result;
    }, [batches, stage, searchQuery]);
    const allSelected = filtered.length > 0 && filtered.every((b) => selectedIds.has(b.batchId));
    const someSelected = filtered.some((b) => selectedIds.has(b.batchId)) && !allSelected;
    useEffect(() => {
        if (headerCheckboxRef.current) {
            headerCheckboxRef.current.indeterminate = someSelected;
        }
    }, [someSelected]);
    const toggleSelectAll = (checked) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            filtered.forEach((b) => {
                if (checked)
                    next.add(b.batchId);
                else
                    next.delete(b.batchId);
            });
            return next;
        });
    };
    const toggleSelectOne = (batchId, checked) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (checked)
                next.add(batchId);
            else
                next.delete(batchId);
            return next;
        });
    };
    if (viewMode === 'incidentDetail' && selectedIncident && incidentSubscriber) {
        return (_jsx(IncidentDetailView, { incident: selectedIncident, subscriber: incidentSubscriber, assignedAgent: incidentAgent, assignedLawyer: incidentLawyer, followUps: followUps, timelineActivities: timelineActivities, documents: incidentDocuments, users: users, lawyers: lawyers, onBack: backToBatchDetail }));
    }
    if (viewMode === 'batchDetail' && selectedBatch) {
        return (_jsx(BatchDetailView, { batch: selectedBatch, incidents: incidents, onBack: backToList, onViewIncident: openIncidentDetail }));
    }
    return (_jsx("div", { className: "flex h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950", children: _jsxs("div", { className: "flex-1 flex flex-col min-w-0", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: _jsx("div", { className: "flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide", children: BATCH_TABS.map((tab, index) => {
                            const isActive = stage === tab.key;
                            const count = counts[tab.key];
                            return (_jsxs("button", { onClick: () => setStage(tab.key), className: `relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${isActive
                                    ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                                    : 'border-transparent text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [index > 0 && (_jsx("span", { className: "absolute -left-2 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-xs", children: "\u2192" })), _jsx("span", { children: tab.label }), _jsx("span", { className: `inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${isActive
                                            ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: count })] }, tab.key));
                        }) }) }), _jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "relative flex-1 max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by Batch ID, expert ID, name...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("button", { onClick: () => console.log('Export batches'), className: "inline-flex items-center gap-2 px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Export"] })] }) }), _jsx("div", { className: "flex-1 bg-white dark:bg-slate-900 overflow-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left w-10", children: _jsx("input", { ref: headerCheckboxRef, type: "checkbox", checked: allSelected, onChange: (e) => toggleSelectAll(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700" }) }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Batch ID" }), showExpertColumn && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Expert" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Items" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Total Challan Amount" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created Date" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Last Updated" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: showExpertColumn ? 7 : 6, className: "px-4 py-16 text-center text-slate-500 dark:text-slate-400", children: _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center", children: _jsx("svg", { className: "w-6 h-6 text-slate-400", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" }) }) }), _jsx("p", { className: "font-medium", children: "No batches found" }), _jsx("p", { className: "text-sm", children: searchQuery
                                                        ? 'Try adjusting your search query'
                                                        : 'No batches in this stage yet' })] }) }) })) : (filtered.map((batch) => (_jsx(BatchRow, { batch: batch, showExpert: showExpertColumn, isSelected: selectedIds.has(batch.batchId), onSelect: (checked) => toggleSelectOne(batch.batchId, checked), onClick: () => openBatchDetail(batch.batchId) }, batch.batchId)))) })] }) })] }) }));
}
