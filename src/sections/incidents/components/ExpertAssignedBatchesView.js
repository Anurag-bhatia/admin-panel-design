import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Search, Filter, Users, LayoutGrid, UserRound, FileText, ChevronDown } from 'lucide-react';
import batchData from '@/../product/sections/batch/data.json';
import incidentData from '@/../product/sections/incidents/data.json';
import { IncidentRow } from './IncidentRow';
function formatDate(dateString) {
    if (!dateString)
        return '—';
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
const STATUS_LABELS = {
    'Pending Acceptance': {
        label: 'Pending Acceptance',
        className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
    Accepted: {
        label: 'Accepted',
        className: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400',
    },
    Completed: {
        label: 'Completed',
        className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    },
    'Not Completed': {
        label: 'Not Completed',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
};
export function ExpertAssignedBatchesView({ workType, onViewBatch, onViewIncident, }) {
    const batches = batchData.batches;
    const allIncidents = incidentData.incidents;
    const [searchQuery, setSearchQuery] = useState('');
    const [expertFilter, setExpertFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [sizeFilter, setSizeFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('newest');
    const [view, setView] = useState('batch');
    // Active batches = assigned to an expert but not yet terminal
    // (Pending Acceptance = awaiting expert; Accepted = expert is working on it)
    const activeBatches = useMemo(() => batches.filter((b) => b.status === 'Pending Acceptance' || b.status === 'Accepted'), [batches]);
    // Incidents that live inside an active batch
    const activeBatchIncidents = useMemo(() => {
        const incidentById = new Map(allIncidents.map((i) => [i.id, i]));
        const seen = new Set();
        const rows = [];
        for (const b of activeBatches) {
            for (const incidentId of b.incidentIds) {
                if (seen.has(incidentId))
                    continue;
                const inc = incidentById.get(incidentId);
                if (!inc)
                    continue;
                seen.add(incidentId);
                rows.push({ incident: inc, batch: b });
            }
        }
        return rows;
    }, [activeBatches, allIncidents]);
    const experts = useMemo(() => {
        const map = new Map();
        activeBatches.forEach((b) => {
            const existing = map.get(b.assignedExpertId);
            if (existing) {
                existing.batches += 1;
            }
            else {
                map.set(b.assignedExpertId, {
                    id: b.assignedExpertId,
                    name: b.assignedExpertName,
                    mobile: b.assignedExpertMobile,
                    batches: 1,
                });
            }
        });
        return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [activeBatches]);
    const filteredBatches = useMemo(() => {
        let result = activeBatches;
        if (expertFilter !== 'all') {
            result = result.filter((b) => b.assignedExpertId === expertFilter);
        }
        if (statusFilter !== 'all') {
            result = result.filter((b) => b.status === statusFilter);
        }
        if (sizeFilter !== 'all') {
            result = result.filter((b) => {
                if (sizeFilter === 'small')
                    return b.itemCount < 20;
                if (sizeFilter === 'medium')
                    return b.itemCount >= 20 && b.itemCount < 40;
                return b.itemCount >= 40;
            });
        }
        if (dateFilter !== 'all') {
            const days = dateFilter === '7d' ? 7 : dateFilter === '30d' ? 30 : 90;
            const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;
            result = result.filter((b) => new Date(b.createdDate).getTime() >= cutoff);
        }
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            result = result.filter((b) => b.batchId.toLowerCase().includes(q) ||
                b.assignedExpertId.toLowerCase().includes(q) ||
                b.assignedExpertName.toLowerCase().includes(q));
        }
        const sorted = [...result].sort((a, b) => {
            const da = new Date(a.createdDate).getTime();
            const db = new Date(b.createdDate).getTime();
            return sortOrder === 'newest' ? db - da : da - db;
        });
        return sorted;
    }, [activeBatches, expertFilter, statusFilter, sizeFilter, dateFilter, sortOrder, searchQuery]);
    const filteredIncidentRows = useMemo(() => {
        let result = activeBatchIncidents;
        if (expertFilter !== 'all') {
            result = result.filter(({ batch }) => batch.assignedExpertId === expertFilter);
        }
        const q = searchQuery.trim().toLowerCase();
        if (q) {
            result = result.filter(({ incident, batch }) => incident.incidentId.toLowerCase().includes(q) ||
                incident.subscriberName.toLowerCase().includes(q) ||
                incident.vehicle.toLowerCase().includes(q) ||
                (incident.challanNumber ?? '').toLowerCase().includes(q) ||
                batch.batchId.toLowerCase().includes(q) ||
                batch.assignedExpertName.toLowerCase().includes(q));
        }
        return result;
    }, [activeBatchIncidents, expertFilter, searchQuery]);
    const expertGroups = useMemo(() => {
        const expertMap = new Map();
        for (const b of filteredBatches) {
            const current = expertMap.get(b.assignedExpertId);
            if (current) {
                current.batches.push(b);
            }
            else {
                expertMap.set(b.assignedExpertId, {
                    id: b.assignedExpertId,
                    name: b.assignedExpertName,
                    mobile: b.assignedExpertMobile,
                    batches: [b],
                });
            }
        }
        return Array.from(expertMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [filteredBatches]);
    const label = workType === 'cases' ? 'cases' : 'challans';
    const countsRight = view === 'incident'
        ? `${filteredIncidentRows.length} ${filteredIncidentRows.length === 1 ? 'incident' : 'incidents'}`
        : view === 'expert'
            ? `${expertGroups.length} ${expertGroups.length === 1 ? 'expert' : 'experts'}`
            : `${filteredBatches.length} active ${filteredBatches.length === 1 ? 'batch' : 'batches'}`;
    const viewIcon = view === 'incident' ? (_jsx(FileText, { className: "w-4 h-4" })) : view === 'expert' ? (_jsx(UserRound, { className: "w-4 h-4" })) : (_jsx(LayoutGrid, { className: "w-4 h-4" }));
    return (_jsxs("div", { className: "flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [_jsxs("div", { className: "relative flex-1 min-w-[220px] max-w-md", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: view === 'incident'
                                        ? 'Search by incident ID, subscriber, vehicle...'
                                        : 'Search by Batch ID, expert ID, name...', value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }), _jsxs("div", { className: "relative", children: [_jsx(Filter, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }), _jsxs("select", { value: expertFilter, onChange: (e) => setExpertFilter(e.target.value), className: "pl-9 pr-8 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none min-w-[200px]", children: [_jsxs("option", { value: "all", children: ["All experts (", experts.length, ")"] }), experts.map((e) => (_jsxs("option", { value: e.id, children: [e.name, " (", e.batches, ")"] }, e.id)))] })] }), _jsxs("select", { value: statusFilter, onChange: (e) => setStatusFilter(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none", children: [_jsx("option", { value: "all", children: "All statuses" }), _jsx("option", { value: "Pending Acceptance", children: "Pending Acceptance" }), _jsx("option", { value: "Accepted", children: "Accepted" })] }), _jsxs("select", { value: sizeFilter, onChange: (e) => setSizeFilter(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none", children: [_jsx("option", { value: "all", children: "Any size" }), _jsx("option", { value: "small", children: "< 20 incidents" }), _jsx("option", { value: "medium", children: "20 \u2013 39 incidents" }), _jsx("option", { value: "large", children: "40+ incidents" })] }), _jsxs("select", { value: dateFilter, onChange: (e) => setDateFilter(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none", children: [_jsx("option", { value: "all", children: "Any time" }), _jsx("option", { value: "7d", children: "Last 7 days" }), _jsx("option", { value: "30d", children: "Last 30 days" }), _jsx("option", { value: "90d", children: "Last 90 days" })] }), _jsxs("select", { value: sortOrder, onChange: (e) => setSortOrder(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none", children: [_jsx("option", { value: "newest", children: "Newest first" }), _jsx("option", { value: "oldest", children: "Oldest first" })] }), _jsxs("div", { className: "ml-auto flex items-center gap-3", children: [_jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: countsRight }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400 pointer-events-none", children: viewIcon }), _jsxs("select", { value: view, onChange: (e) => setView(e.target.value), className: "pl-9 pr-9 py-2 text-sm font-medium bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 appearance-none min-w-[160px]", children: [_jsx("option", { value: "batch", children: "By Batch" }), _jsx("option", { value: "expert", children: "By Expert" }), _jsx("option", { value: "incident", children: "By Incident" })] }), _jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" })] })] })] }) }), _jsxs("div", { className: "flex-1 overflow-auto bg-slate-50 dark:bg-slate-950", children: [view === 'batch' && (_jsx(BatchGrid, { batches: filteredBatches, emptyHint: expertFilter !== 'all' || searchQuery
                            ? 'Try adjusting your filters'
                            : `Batches appear here when 2+ ${label} are assigned to an expert`, onViewBatch: onViewBatch })), view === 'expert' && (_jsx(ExpertGroupedList, { groups: expertGroups, onViewBatch: onViewBatch, emptyHint: expertFilter !== 'all' || searchQuery
                            ? 'Try adjusting your filters'
                            : 'No active batches to show by expert' })), view === 'incident' && (_jsx(IncidentFlatList, { rows: filteredIncidentRows, workType: workType, onViewIncident: onViewIncident, emptyHint: expertFilter !== 'all' || searchQuery
                            ? 'Try adjusting your filters'
                            : `No ${label} in active batches` }))] })] }));
}
function BatchGrid({ batches, emptyHint, onViewBatch, }) {
    if (batches.length === 0) {
        return _jsx(EmptyState, { title: "No active batches", hint: emptyHint });
    }
    return (_jsx("div", { className: "bg-white dark:bg-slate-900", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Batch ID" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Expert" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Incidents" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Total Challan Amount" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Accepted Incidents" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Rejected Incidents" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" })] }) }), _jsx("tbody", { children: batches.map((batch) => {
                        const statusConfig = STATUS_LABELS[batch.status] || {
                            label: batch.status,
                            className: '',
                        };
                        return (_jsxs("tr", { onClick: () => onViewBatch(batch.batchId), className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsx("td", { className: "px-4 py-4", children: _jsx("span", { className: "font-mono text-sm font-semibold text-slate-900 dark:text-white", children: batch.batchId }) }), _jsxs("td", { className: "px-4 py-4", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: batch.assignedExpertName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [_jsx("span", { className: "font-mono", children: batch.assignedExpertId }), _jsx("span", { className: "mx-1.5 text-slate-300 dark:text-slate-600", children: "\u00B7" }), batch.assignedExpertMobile] })] }), _jsx("td", { className: "px-4 py-4 text-sm text-slate-700 dark:text-slate-300", children: batch.itemCount }), _jsx("td", { className: "px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(batch.totalAmount) }), _jsx("td", { className: "px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white", children: batch.assignedCount }), _jsx("td", { className: "px-4 py-4 text-sm font-semibold text-slate-900 dark:text-white", children: batch.rejectedCount }), _jsx("td", { className: "px-4 py-4 whitespace-nowrap", children: _jsx("span", { className: `inline-flex items-center whitespace-nowrap px-2.5 py-1 rounded text-sm font-semibold ${statusConfig.className}`, children: statusConfig.label }) }), _jsx("td", { className: "px-4 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap", children: formatDate(batch.createdDate) })] }, batch.batchId));
                    }) })] }) }));
}
function ExpertGroupedList({ groups, onViewBatch, emptyHint, }) {
    if (groups.length === 0) {
        return _jsx(EmptyState, { title: "No experts to show", hint: emptyHint });
    }
    return (_jsx("div", { className: "p-4 space-y-4", children: groups.map((g) => {
            const totals = g.batches.reduce((acc, b) => {
                acc.items += b.itemCount;
                acc.assigned += b.assignedCount;
                acc.rejected += b.rejectedCount;
                acc.expired += b.expiredCount;
                return acc;
            }, { items: 0, assigned: 0, rejected: 0, expired: 0 });
            return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden", children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white truncate", children: g.name }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [_jsx("span", { className: "font-mono", children: g.id }), _jsx("span", { className: "mx-1.5 text-slate-300 dark:text-slate-600", children: "\u00B7" }), g.mobile] })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs", children: [_jsxs("span", { className: "px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium", children: [g.batches.length, " ", g.batches.length === 1 ? 'batch' : 'batches'] }), _jsxs("span", { className: "px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium", children: [totals.items, " incidents"] }), _jsx(OutcomeChip, { label: "Accepted Incidents", value: totals.assigned, tone: "slate", compact: true }), _jsx(OutcomeChip, { label: "Rejected Incidents", value: totals.rejected, tone: "slate", compact: true })] })] }), _jsx("div", { className: "p-3 grid grid-cols-1 md:grid-cols-2 gap-3", children: g.batches.map((batch) => (_jsx(BatchCard, { batch: batch, onClick: () => onViewBatch(batch.batchId) }, batch.batchId))) })] }, g.id));
        }) }));
}
function IncidentFlatList({ rows, workType, onViewIncident, emptyHint, }) {
    const users = incidentData.users ?? [];
    const lawyers = incidentData.lawyers ?? [];
    const isCases = workType === 'cases';
    const [selectedIds, setSelectedIds] = useState(new Set());
    const incidents = rows.map((r) => r.incident);
    const allSelected = incidents.length > 0 && incidents.every((i) => selectedIds.has(i.id));
    const someSelected = selectedIds.size > 0 && !allSelected;
    const toggleOne = (id, checked) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            if (checked)
                next.add(id);
            else
                next.delete(id);
            return next;
        });
    };
    const toggleAll = (checked) => {
        setSelectedIds(checked ? new Set(incidents.map((i) => i.id)) : new Set());
    };
    if (rows.length === 0) {
        return _jsx(EmptyState, { title: "No incidents in active batches", hint: emptyHint });
    }
    return (_jsx("div", { className: "bg-white dark:bg-slate-900", children: _jsxs("table", { className: "w-full table-fixed", children: [_jsxs("colgroup", { children: [_jsx("col", { className: "w-12" }), _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-32" }), _jsx("col", { className: "w-64" }), !isCases && _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-32" }), _jsx("col", { className: "w-32" }), _jsx("col", { className: "w-32" }), !isCases && _jsx("col", { className: "w-40" }), isCases && _jsx("col", { className: "w-40" }), _jsx("col", { className: "w-12" })] }), _jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left", children: _jsx("input", { type: "checkbox", checked: allSelected, ref: (el) => {
                                        if (el)
                                            el.indeterminate = someSelected;
                                    }, onChange: (e) => toggleAll(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-700" }) }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: isCases ? 'Case ID' : 'Incident ID' }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Batch ID" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Subscriber / Vehicle" }), !isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Challan No / Amount" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: isCases ? 'Type' : 'Challan' }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Updated" }), !isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Employee" })), isCases && (_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Lawyer" })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: _jsx("span", { className: "sr-only", children: "Actions" }) })] }) }), _jsx("tbody", { children: rows.map(({ incident, batch }) => (_jsx(IncidentRow, { incident: incident, isSelected: selectedIds.has(incident.id), users: users, lawyers: lawyers, workType: workType, batchId: batch.batchId, showSettlement: false, onSelect: (checked) => toggleOne(incident.id, checked), onView: () => onViewIncident?.(incident.id) }, incident.id))) })] }) }));
}
function EmptyState({ title, hint }) {
    return (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-center", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx(Users, { className: "w-6 h-6 text-slate-400" }) }), _jsx("p", { className: "font-medium text-slate-700 dark:text-slate-300", children: title }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: hint })] }));
}
function BatchCard({ batch, onClick }) {
    const statusConfig = STATUS_LABELS[batch.status] || {
        label: batch.status,
        className: '',
    };
    return (_jsxs("button", { type: "button", onClick: onClick, className: "text-left bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 hover:border-cyan-400 dark:hover:border-cyan-500 hover:shadow-sm transition-all", children: [_jsxs("div", { className: "flex items-start justify-between gap-3 mb-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "font-mono text-sm font-semibold text-slate-900 dark:text-white", children: batch.batchId }), _jsx("p", { className: "mt-1 text-sm font-medium text-slate-900 dark:text-white truncate", children: batch.assignedExpertName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [_jsx("span", { className: "font-mono", children: batch.assignedExpertId }), _jsx("span", { className: "mx-1.5 text-slate-300 dark:text-slate-600", children: "\u00B7" }), batch.assignedExpertMobile] })] }), _jsx("span", { className: `inline-flex items-center shrink-0 whitespace-nowrap px-2.5 py-1 rounded text-sm font-semibold ${statusConfig.className}`, children: statusConfig.label })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 mb-3", children: [_jsx(OutcomeChip, { label: "Accepted Incidents", value: batch.assignedCount, tone: "slate" }), _jsx(OutcomeChip, { label: "Rejected Incidents", value: batch.rejectedCount, tone: "slate" })] }), _jsxs("div", { className: "flex items-center justify-between text-xs text-slate-500 dark:text-slate-400", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { children: [_jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: batch.itemCount }), ' ', "incidents"] }), _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: formatCurrency(batch.totalAmount) })] }), _jsxs("span", { children: ["Created ", formatDate(batch.createdDate)] })] })] }));
}
const TONE_CLASSES = {
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-900/40',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/40',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/40',
    slate: 'bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};
function OutcomeChip({ label, value, tone, compact = false, }) {
    if (compact) {
        return (_jsxs("span", { className: `inline-flex items-center gap-1 px-2 py-1 rounded-md border text-[11px] font-medium ${TONE_CLASSES[tone]}`, children: [_jsx("span", { className: "uppercase tracking-wide", children: label }), _jsx("span", { className: "font-semibold", children: value })] }));
    }
    return (_jsxs("div", { className: `flex items-center justify-between px-2.5 py-1.5 rounded-lg border ${TONE_CLASSES[tone]}`, children: [_jsx("span", { className: "text-[11px] font-medium uppercase tracking-wide", children: label }), _jsx("span", { className: "text-sm font-semibold", children: value })] }));
}
