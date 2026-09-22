import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Search, Download } from 'lucide-react';
import { defaultWalletPermissions } from '@/../product/sections/cms/types';
const actionLabels = {
    created: 'Created',
    edited: 'Edited',
    activated: 'Activated',
    scheduled: 'Scheduled',
    issuingPaused: 'Issuing paused',
    issuingResumed: 'Issuing resumed',
    redemptionPaused: 'Redemption paused',
    redemptionResumed: 'Redemption resumed',
    archived: 'Archived',
    cloned: 'Cloned',
    uploadProcessed: 'Upload processed',
    exported: 'Exported',
};
const actionBadge = {
    created: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    edited: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    activated: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    scheduled: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    issuingPaused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    issuingResumed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    redemptionPaused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    redemptionResumed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
    cloned: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
    uploadProcessed: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    exported: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
};
function formatTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function WalletAuditLog({ entries, permissions = defaultWalletPermissions }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [actionFilter, setActionFilter] = useState('all');
    const [actorFilter, setActorFilter] = useState('all');
    const actors = useMemo(() => {
        return Array.from(new Set(entries.map((e) => e.actorName))).sort();
    }, [entries]);
    const filtered = useMemo(() => {
        return entries
            .filter((e) => {
            if (actionFilter !== 'all' && e.action !== actionFilter)
                return false;
            if (actorFilter !== 'all' && e.actorName !== actorFilter)
                return false;
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!e.details.toLowerCase().includes(q) &&
                    !(e.programmeCode ?? '').toLowerCase().includes(q) &&
                    !e.actorName.toLowerCase().includes(q))
                    return false;
            }
            return true;
        })
            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [entries, searchQuery, actionFilter, actorFilter]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Audit Log" }), permissions.exportData && (_jsxs("button", { className: "inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800", children: [_jsx(Download, { className: "w-4 h-4" }), "Export CSV"] }))] }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-4", children: [_jsxs("div", { className: "relative flex-1 min-w-[240px]", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search details, code or user\u2026", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] }), _jsxs("select", { value: actionFilter, onChange: (e) => setActionFilter(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200", children: [_jsx("option", { value: "all", children: "All actions" }), Object.keys(actionLabels).map((a) => (_jsx("option", { value: a, children: actionLabels[a] }, a)))] }), _jsxs("select", { value: actorFilter, onChange: (e) => setActorFilter(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200", children: [_jsx("option", { value: "all", children: "All users" }), actors.map((a) => (_jsx("option", { value: a, children: a }, a)))] })] }), _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Action" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "User" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Timestamp" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Programme" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Details" })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [filtered.map((e) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${actionBadge[e.action]}`, children: actionLabels[e.action] }) }), _jsx("td", { className: "px-4 py-3 text-sm font-medium text-slate-900 dark:text-white whitespace-nowrap", children: e.actorName }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: formatTime(e.timestamp) }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200 font-mono whitespace-nowrap", children: e.programmeCode ?? '—' }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: e.details })] }, e.id))), filtered.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 5, className: "px-4 py-12 text-center text-sm text-slate-400", children: "No entries match the current filters." }) }))] })] }) }) })] }));
}
