import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
function formatDateTime(dateString) {
    return new Intl.DateTimeFormat('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    }).format(new Date(dateString));
}
const ACTION_STYLES = {
    created: {
        label: 'Created',
        classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    updated: {
        label: 'Updated',
        classes: 'bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    },
    deleted: {
        label: 'Deleted',
        classes: 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    },
    value_added: {
        label: 'Value Added',
        classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
    },
    value_deactivated: {
        label: 'Value Deactivated',
        classes: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    },
    reordered: {
        label: 'Reordered',
        classes: 'bg-violet-50 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
    },
};
const AREA_STYLES = {
    Services: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    'Price Categories': 'bg-violet-50 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400',
    Departments: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    Designations: 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400',
    Masters: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    Geographic: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
};
const ALL_AREAS = ['Services', 'Price Categories', 'Departments', 'Designations', 'Masters', 'Geographic'];
const ALL_ACTIONS = ['created', 'updated', 'deleted', 'value_added', 'value_deactivated', 'reordered'];
export function AuditLogTable({ auditEntries, searchQuery }) {
    const [areaFilter, setAreaFilter] = useState('all');
    const [actionFilter, setActionFilter] = useState('all');
    const [userFilter, setUserFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const uniqueUsers = useMemo(() => [...new Set(auditEntries.map((e) => e.performedBy))].sort(), [auditEntries]);
    const hasActiveFilters = areaFilter !== 'all' || actionFilter !== 'all' || userFilter !== 'all';
    const clearFilters = () => {
        setAreaFilter('all');
        setActionFilter('all');
        setUserFilter('all');
    };
    const filtered = useMemo(() => {
        let result = [...auditEntries].sort((a, b) => new Date(b.performedAt).getTime() - new Date(a.performedAt).getTime());
        if (areaFilter !== 'all') {
            result = result.filter((e) => e.area === areaFilter);
        }
        if (actionFilter !== 'all') {
            result = result.filter((e) => e.action === actionFilter);
        }
        if (userFilter !== 'all') {
            result = result.filter((e) => e.performedBy === userFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((e) => e.recordName.toLowerCase().includes(q) ||
                e.area.toLowerCase().includes(q) ||
                e.performedBy.toLowerCase().includes(q) ||
                (e.field && e.field.toLowerCase().includes(q)));
        }
        return result;
    }, [auditEntries, areaFilter, actionFilter, userFilter, searchQuery]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2", children: [_jsxs("button", { onClick: () => setShowFilters(!showFilters), className: `inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${showFilters || hasActiveFilters
                            ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: ["Filters", hasActiveFilters && (_jsx("span", { className: "inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full bg-cyan-600 text-white", children: [areaFilter, actionFilter, userFilter].filter((f) => f !== 'all').length }))] }), hasActiveFilters && (_jsx("button", { onClick: clearFilters, className: "inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300", children: "Clear" })), _jsxs("span", { className: "text-xs text-slate-400 dark:text-slate-500 ml-auto", children: [filtered.length, " ", filtered.length === 1 ? 'entry' : 'entries'] })] }), showFilters && (_jsxs("div", { className: "px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 flex items-center gap-4 flex-wrap", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Area" }), _jsxs("select", { value: areaFilter, onChange: (e) => setAreaFilter(e.target.value), className: "text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: [_jsx("option", { value: "all", children: "All Areas" }), ALL_AREAS.map((a) => (_jsx("option", { value: a, children: a }, a)))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Action" }), _jsxs("select", { value: actionFilter, onChange: (e) => setActionFilter(e.target.value), className: "text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: [_jsx("option", { value: "all", children: "All Actions" }), ALL_ACTIONS.map((a) => (_jsx("option", { value: a, children: ACTION_STYLES[a].label }, a)))] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("label", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "User" }), _jsxs("select", { value: userFilter, onChange: (e) => setUserFilter(e.target.value), className: "text-xs px-2 py-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: [_jsx("option", { value: "all", children: "All Users" }), uniqueUsers.map((u) => (_jsx("option", { value: u, children: u }, u)))] })] })] })), filtered.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx("span", { className: "text-lg text-slate-400", children: "0" }) }), _jsx("p", { className: "font-medium", children: "No audit entries found" }), _jsx("p", { className: "text-sm mt-1", children: searchQuery || hasActiveFilters
                            ? 'Try adjusting your search or filters'
                            : 'Configuration changes will appear here' })] })) : (_jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "When" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Area" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Action" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Record" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Change" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filtered.map((entry) => {
                            const actionStyle = ACTION_STYLES[entry.action];
                            const areaStyle = AREA_STYLES[entry.area] || 'bg-slate-100 text-slate-600';
                            return (_jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: formatDateTime(entry.performedAt) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${areaStyle}`, children: entry.area }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 text-[10px] font-medium rounded-full ${actionStyle.classes}`, children: actionStyle.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: entry.recordName }) }), _jsx("td", { className: "px-4 py-3", children: entry.oldValue || entry.newValue ? (_jsxs("div", { className: "flex items-center gap-1.5 text-xs", children: [entry.oldValue && (_jsx("span", { className: "px-1.5 py-0.5 rounded bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 line-through", children: entry.oldValue })), entry.oldValue && entry.newValue && (_jsx("span", { className: "text-slate-400 shrink-0", children: "\u2192" })), entry.newValue && (_jsx("span", { className: "px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400", children: entry.newValue }))] })) : (_jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500", children: "\u2014" })) })] }, entry.id));
                        }) })] }))] }));
}
