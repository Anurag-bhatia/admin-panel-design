import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
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
const CHALLAN_TYPE_LABELS = {
    court: 'Court',
    online: 'Online',
};
const TYPE_LABELS = {
    payAndClose: 'PPT',
    contest: 'Bulk',
    onSpot: 'On Spot',
    onCall: 'On Call',
};
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
function formatStatus(status) {
    return status
        .split('_')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
}
export function BatchDetailView({ batch, incidents, onBack, onViewIncident, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const batchIncidents = useMemo(() => {
        const byId = new Map(incidents.map((i) => [i.id, i]));
        return batch.incidentIds
            .map((id) => byId.get(id))
            .filter((i) => Boolean(i));
    }, [batch.incidentIds, incidents]);
    const uniqueStates = useMemo(() => {
        const set = new Set();
        for (const i of batchIncidents) {
            if (i.state)
                set.add(i.state);
        }
        return Array.from(set).sort();
    }, [batchIncidents]);
    const filtered = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        if (!q)
            return batchIncidents;
        return batchIncidents.filter((i) => i.incidentId.toLowerCase().includes(q) ||
            i.subscriberName.toLowerCase().includes(q) ||
            i.vehicle.toLowerCase().includes(q) ||
            (i.challanNumber ?? '').toLowerCase().includes(q));
    }, [batchIncidents, searchQuery]);
    const statusConfig = STATUS_LABELS[batch.status] || {
        label: batch.status,
        className: '',
    };
    return (_jsx("div", { className: "h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950 overflow-auto", children: _jsxs("div", { className: "max-w-7xl mx-auto p-6 space-y-6", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-6", children: [_jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [_jsx("button", { type: "button", onClick: onBack, "aria-label": "Back to batches", className: "mt-1 inline-flex items-center justify-center w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white transition-colors shrink-0", children: _jsx(ArrowLeft, { className: "w-4 h-4" }) }), _jsx("div", { className: "min-w-0", children: _jsx("h1", { className: "font-mono text-xl font-semibold text-slate-900 dark:text-white", children: batch.batchId }) })] }), _jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded text-xs font-semibold ${statusConfig.className}`, children: statusConfig.label })] }), _jsxs("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4", children: [_jsx(SummaryItem, { label: "Expert", value: batch.assignedExpertName, sub: `${batch.assignedExpertId} · ${batch.assignedExpertMobile}` }), _jsx(SummaryItem, { label: "Incidents", value: String(batch.itemCount) }), _jsx(SummaryItem, { label: "Total Challan Amount", value: formatCurrency(batch.totalAmount) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Total States" }), _jsxs("div", { className: "mt-1 flex items-baseline gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: uniqueStates.length }), uniqueStates.length > 0 && (_jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: uniqueStates.join(', ') }))] })] }), _jsx(SummaryItem, { label: "Created Date", value: formatDate(batch.createdDate) }), _jsx(SummaryItem, { label: "Last Updated", value: formatDate(batch.lastUpdated) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-slate-200 dark:border-slate-800", children: [_jsx(OutcomeStat, { label: "Accepted", value: batch.assignedCount, tone: "cyan" }), _jsx(OutcomeStat, { label: "Rejected", value: batch.rejectedCount, tone: "red" })] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("h2", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: ["Incidents (", batchIncidents.length, ")"] }), _jsxs("div", { className: "relative w-full max-w-xs", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by ID, subscriber, vehicle...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Incident ID" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Subscriber & Vehicle" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Challan / Amount" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Type" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Lawyer Status" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Created" })] }) }), _jsx("tbody", { children: filtered.length === 0 ? (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-4 py-16 text-center text-sm text-slate-500 dark:text-slate-400", children: batchIncidents.length === 0
                                                    ? 'No incidents in this batch yet'
                                                    : 'No incidents match your search' }) })) : (filtered.map((incident) => (_jsxs("tr", { onClick: () => onViewIncident(incident.id), className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer", children: [_jsx("td", { className: "px-4 py-4", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: incident.incidentId }) }), _jsxs("td", { className: "px-4 py-4", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: incident.subscriberName }), _jsx("span", { className: "mt-1 inline-flex items-center px-2 py-0.5 rounded font-mono text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: incident.vehicle })] }), _jsx("td", { className: "px-4 py-4", children: incident.workType === 'challan' ? (_jsxs(_Fragment, { children: [_jsx("p", { className: "font-mono text-sm text-slate-900 dark:text-white", children: incident.challanNumber }), _jsxs("p", { className: "mt-1 text-xs font-medium text-slate-700 dark:text-slate-300", children: ["\u20B9", incident.amount.toLocaleString('en-IN')] })] })) : (_jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: "\u2014" })) }), _jsxs("td", { className: "px-4 py-4", children: [incident.workType === 'challan' &&
                                                            (incident.challanType === 'court' || incident.challanType === 'online') && (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.challanType === 'court'
                                                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                                                : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'}`, children: CHALLAN_TYPE_LABELS[incident.challanType] })), incident.workType === 'case' && (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400", children: TYPE_LABELS[incident.type] ?? incident.type }))] }), _jsx("td", { className: "px-4 py-4", children: incident.status === 'resolved' || incident.status === 'unresolved' ? (_jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: "\u2014" })) : (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: formatStatus(incident.status) })) }), _jsx("td", { className: "px-4 py-4 text-sm text-slate-700 dark:text-slate-300 whitespace-nowrap", children: formatDate(incident.createdAt) })] }, incident.id)))) })] }) })] })] }) }));
}
function SummaryItem({ label, value, sub, }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400", children: label }), _jsx("p", { className: "mt-1 text-sm font-medium text-slate-900 dark:text-white", children: value }), sub && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: sub }))] }));
}
const OUTCOME_TONES = {
    cyan: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 border-cyan-100 dark:border-cyan-900/40',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-100 dark:border-red-900/40',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-100 dark:border-amber-900/40',
};
function OutcomeStat({ label, value, tone, }) {
    return (_jsxs("div", { className: `rounded-lg border px-4 py-3 text-center ${OUTCOME_TONES[tone]}`, children: [_jsx("p", { className: "text-xs font-medium uppercase tracking-wider", children: label }), _jsx("p", { className: "mt-1 text-xl font-semibold", children: value })] }));
}
