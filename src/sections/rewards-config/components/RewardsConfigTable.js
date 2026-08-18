import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Search, Pencil, History, Layers } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
export function RewardsConfigTable({ configs, onEdit, onHistory, onAdd, }) {
    const [filter, setFilter] = useState('all');
    const [query, setQuery] = useState('');
    const counts = useMemo(() => ({
        all: configs.length,
        active: configs.filter((c) => c.status === 'active').length,
        inactive: configs.filter((c) => c.status === 'inactive').length,
    }), [configs]);
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return configs
            .filter((c) => (filter === 'all' ? true : c.status === filter))
            .filter((c) => q === '' ? true : c.state.toLowerCase().includes(q));
    }, [configs, filter, query]);
    return (_jsx("div", { className: "max-w-[1440px] mx-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden", children: [_jsxs("div", { className: "px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 flex-wrap", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(FilterChip, { label: "All", count: counts.all, active: filter === 'all', onClick: () => setFilter('all') }), _jsx(FilterChip, { label: "Active", count: counts.active, active: filter === 'active', onClick: () => setFilter('active') }), _jsx(FilterChip, { label: "Inactive", count: counts.inactive, active: filter === 'inactive', onClick: () => setFilter('inactive') })] }), _jsx("div", { className: "flex items-center gap-2 flex-1 min-w-0 sm:justify-end", children: _jsxs("div", { className: "relative flex-1 sm:flex-none sm:w-64", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search state\u2026", value: query, onChange: (e) => setQuery(e.target.value), className: "w-full pl-9 pr-3 h-[36px] text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500" })] }) })] }), filtered.length === 0 ? (_jsx(EmptyState, { hasQuery: query !== '' || filter !== 'all', onAdd: onAdd, onReset: () => {
                        setQuery('');
                        setFilter('all');
                    } })) : (
                /* Table */
                _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40", children: [_jsx(Th, { className: "pl-5", children: "#" }), _jsx(Th, { children: "State" }), _jsx(Th, { children: "Region" }), _jsx(Th, { align: "right", children: "Ops %" }), _jsx(Th, { align: "right", children: "Margin %" }), _jsx(Th, { align: "right", variant: "cv", children: "CV %" }), _jsxs(Th, { align: "right", variant: "cv", computed: true, children: [_jsx("span", { className: "block leading-tight", children: "Max CV" }), _jsx("span", { className: "block leading-tight", children: "Reward %" })] }), _jsx(Th, { align: "right", variant: "ncv", children: "NCV %" }), _jsxs(Th, { align: "right", variant: "ncv", computed: true, children: [_jsx("span", { className: "block leading-tight", children: "Max NCV" }), _jsx("span", { className: "block leading-tight", children: "Reward %" })] }), _jsx(Th, { children: "Last Updated By" }), _jsx(Th, { children: "Status" }), _jsx(Th, { className: "pr-5", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filtered.map((cfg, idx) => (_jsx(Row, { index: idx + 1, config: cfg, onEdit: () => onEdit(cfg.id), onHistory: () => onHistory(cfg.id) }, cfg.id))) })] }) })), filtered.length > 0 && (_jsx("div", { className: "px-5 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40", children: _jsxs("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: ["Showing ", filtered.length, " of ", configs.length, " configurations."] }) }))] }) }));
}
// ---------- Sub-components ----------
function FilterChip({ label, count, active, onClick, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: `inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${active
            ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: [label, _jsx("span", { className: `px-1.5 py-0.5 text-[10px] rounded-full tabular-nums ${active
                    ? 'bg-white/20 text-white dark:bg-slate-900/10 dark:text-slate-900'
                    : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'}`, children: count })] }));
}
function Th({ children, align, className, computed, variant, }) {
    const colorClass = variant === 'cv'
        ? 'text-cyan-700 dark:text-cyan-400'
        : variant === 'ncv'
            ? 'text-violet-700 dark:text-violet-400'
            : computed
                ? 'text-cyan-700 dark:text-cyan-400'
                : 'text-slate-500 dark:text-slate-400';
    return (_jsx("th", { className: `py-3 px-3 text-[10px] font-semibold uppercase tracking-wider ${align === 'right' ? 'text-right' : 'text-left'} ${colorClass} ${className ?? ''}`, children: children }));
}
function Row({ index, config, onEdit, onHistory, }) {
    const maxCv = config.marginPct - config.lawyeredCvPct;
    const maxNcv = config.marginPct - config.lawyeredNcvPct;
    return (_jsxs("tr", { className: "group hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors", children: [_jsx("td", { className: "py-3 pl-5 pr-3 text-[13px] tabular-nums text-slate-500 dark:text-slate-400", children: index }), _jsx("td", { className: "py-3 px-3", children: _jsx("button", { type: "button", onClick: onEdit, className: "font-medium text-slate-900 dark:text-white hover:text-cyan-700 dark:hover:text-cyan-400 transition-colors text-left", children: config.state }) }), _jsx("td", { className: "py-3 px-3 text-slate-500 dark:text-slate-400 text-[13px]", children: config.region }), _jsx(NumCell, { value: config.operationsCostPct }), _jsx(NumCell, { value: config.marginPct, muted: true }), _jsx(NumCell, { value: config.lawyeredCvPct, variant: "cv" }), _jsx(NumCell, { value: maxCv, variant: "cv", computed: true }), _jsx(NumCell, { value: config.lawyeredNcvPct, variant: "ncv" }), _jsx(NumCell, { value: maxNcv, variant: "ncv", computed: true }), _jsx("td", { className: "py-3 px-3", children: _jsxs("div", { className: "flex flex-col leading-tight", children: [_jsx("span", { className: "text-[13px] text-slate-800 dark:text-slate-200 font-medium", children: config.lastUpdatedBy }), _jsx("span", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: formatRelative(config.lastUpdatedAt) })] }) }), _jsx("td", { className: "py-3 px-3 w-px whitespace-nowrap", children: _jsx(StatusBadge, { status: config.status }) }), _jsx("td", { className: "py-3 pr-5 pl-3 w-px whitespace-nowrap", children: _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(ActionButton, { icon: _jsx(Pencil, { className: "w-3.5 h-3.5" }), label: "Edit", onClick: onEdit, primary: true }), _jsx(ActionButton, { icon: _jsx(History, { className: "w-3.5 h-3.5" }), label: "History", onClick: onHistory })] }) })] }));
}
function NumCell({ value, computed, muted, variant, }) {
    const cvComputed = 'bg-cyan-50 text-cyan-800 dark:bg-cyan-900/25 dark:text-cyan-300';
    const ncvComputed = 'bg-violet-50 text-violet-800 dark:bg-violet-900/25 dark:text-violet-300';
    const cvPlain = 'bg-cyan-50/60 text-cyan-800 dark:bg-cyan-900/15 dark:text-cyan-300';
    const ncvPlain = 'bg-violet-50/60 text-violet-800 dark:bg-violet-900/15 dark:text-violet-300';
    const colorClass = variant === 'cv'
        ? computed
            ? cvComputed
            : cvPlain
        : variant === 'ncv'
            ? computed
                ? ncvComputed
                : ncvPlain
            : computed
                ? cvComputed
                : muted
                    ? 'text-slate-500 dark:text-slate-400'
                    : 'text-slate-800 dark:text-slate-200';
    return (_jsx("td", { className: "py-3 px-3 text-right", children: _jsxs("span", { className: `inline-block px-2 py-0.5 rounded tabular-nums text-[13px] font-medium ${colorClass}`, children: [value, "%"] }) }));
}
function ActionButton({ icon, label, onClick, primary, }) {
    return (_jsxs("button", { type: "button", onClick: onClick, className: `inline-flex items-center gap-1 px-2 py-1 text-[12px] font-medium rounded-md transition-colors ${primary
            ? 'text-cyan-700 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/25'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: [icon, _jsx("span", { children: label })] }));
}
function EmptyState({ hasQuery, onAdd, onReset, }) {
    return (_jsxs("div", { className: "px-6 py-16 text-center", children: [_jsx("div", { className: "mx-auto w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4", children: _jsx(Layers, { className: "w-5 h-5 text-slate-500" }) }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: hasQuery ? 'No configurations match your filters' : 'No configurations yet' }), _jsx("p", { className: "mt-1 text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto", children: hasQuery
                    ? 'Try clearing filters or search terms to see all state configurations.'
                    : 'Add a reward configuration for a state to define the Ops Cost, Margin, and Lawyered margins that drive the max reward passed to users.' }), _jsx("div", { className: "mt-5 flex items-center justify-center gap-2", children: hasQuery ? (_jsx("button", { type: "button", onClick: onReset, className: "px-3.5 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Reset filters" })) : (_jsx("button", { type: "button", onClick: onAdd, className: "px-3.5 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: "Add your first configuration" })) })] }));
}
function formatRelative(iso) {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = now - then;
    const day = 24 * 60 * 60 * 1000;
    const days = Math.round(diff / day);
    if (days < 1)
        return 'today';
    if (days === 1)
        return 'yesterday';
    if (days < 30)
        return `${days}d ago`;
    const months = Math.round(days / 30);
    if (months < 12)
        return `${months}mo ago`;
    const years = Math.round(months / 12);
    return `${years}y ago`;
}
