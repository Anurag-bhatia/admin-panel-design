import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Plus, Search, Filter, ArrowUpDown, MoreVertical, Pencil, Pause, Play, Archive, Copy, Eye, X, Calendar, } from 'lucide-react';
import { defaultWalletPermissions } from '@/../product/sections/cms/types';
const statusLabels = {
    draft: 'Draft',
    scheduled: 'Scheduled',
    active: 'Active',
    paused: 'Paused',
    exhausted: 'Exhausted',
    expired: 'Expired',
    archived: 'Archived',
};
const statusBadgeClass = {
    draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    scheduled: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
    active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    exhausted: 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
    expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
};
const typeLabels = {
    firstTimeCheck: 'First-time check',
    postPaymentReward: 'Post-payment reward',
    influencer: 'Influencer',
    corporate: 'Corporate',
    specificCustomers: 'Specific customers',
};
const perPage = 25;
function getEffectiveStatus(p, now) {
    if (p.status === 'archived')
        return 'archived';
    if (p.status === 'expired')
        return 'expired';
    if (p.status === 'exhausted')
        return 'exhausted';
    const end = new Date(p.endAt).getTime();
    const start = new Date(p.startAt).getTime();
    const t = now.getTime();
    if (t > end)
        return 'expired';
    if (p.coinsIssued >= p.hardStopCoins)
        return 'exhausted';
    if (p.status === 'scheduled' && t >= start)
        return 'active';
    if (p.status === 'active' && t < start)
        return 'scheduled';
    return p.status;
}
function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatCoins(n) {
    return n.toLocaleString('en-IN');
}
function budgetPercent(p) {
    if (p.budgetCoins === 0)
        return 0;
    return Math.min(100, Math.round((p.coinsIssued / p.budgetCoins) * 100));
}
export function ProgrammeList({ programmes, permissions = defaultWalletPermissions, onCreate, onEdit, onView, onPauseIssuing, onPauseRedemption, onResume, onArchive, onClone, onSearch, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [sortKey, setSortKey] = useState('created');
    const [sortDir, setSortDir] = useState('desc');
    const [currentPage, setCurrentPage] = useState(1);
    const [openMenuId, setOpenMenuId] = useState(null);
    const [filtersOpen, setFiltersOpen] = useState(false);
    const menuRef = useRef(null);
    useEffect(() => {
        if (!openMenuId)
            return;
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpenMenuId(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [openMenuId]);
    const now = new Date();
    const filtered = useMemo(() => {
        return programmes
            .map((p) => ({ ...p, effectiveStatus: getEffectiveStatus(p, now) }))
            .filter((p) => {
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                if (!p.name.toLowerCase().includes(q) &&
                    !p.code.toLowerCase().includes(q))
                    return false;
            }
            if (statusFilter !== 'all' && p.effectiveStatus !== statusFilter)
                return false;
            if (typeFilter !== 'all' && p.type !== typeFilter)
                return false;
            if (startDateFilter) {
                if (new Date(p.startAt).getTime() < new Date(startDateFilter).getTime())
                    return false;
            }
            if (endDateFilter) {
                if (new Date(p.endAt).getTime() > new Date(endDateFilter).getTime())
                    return false;
            }
            return true;
        })
            .sort((a, b) => {
            const dir = sortDir === 'asc' ? 1 : -1;
            if (sortKey === 'budgetUsed')
                return dir * (budgetPercent(a) - budgetPercent(b));
            if (sortKey === 'expiry')
                return dir * (new Date(a.endAt).getTime() - new Date(b.endAt).getTime());
            return dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });
    }, [programmes, searchQuery, statusFilter, typeFilter, startDateFilter, endDateFilter, sortKey, sortDir, now]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const activeFilterCount = (statusFilter !== 'all' ? 1 : 0) +
        (typeFilter !== 'all' ? 1 : 0) +
        (startDateFilter ? 1 : 0) +
        (endDateFilter ? 1 : 0);
    const clearFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setStartDateFilter('');
        setEndDateFilter('');
        setCurrentPage(1);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Wallet Programmes" }), permissions.createProgramme && (_jsxs("button", { onClick: onCreate, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4" }), "Create Programme"] }))] }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-4", children: [_jsxs("div", { className: "relative w-full sm:flex-1 sm:max-w-2xl", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by name or code\u2026", value: searchQuery, onChange: (e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                    onSearch?.(e.target.value);
                                }, className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { className: "flex items-center gap-3 ml-auto", children: [_jsxs("button", { onClick: () => setFiltersOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${filtersOpen || activeFilterCount > 0
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4" }), "Filters", activeFilterCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white", children: activeFilterCount }))] }), _jsx(SortDropdown, { sortKey: sortKey, sortDir: sortDir, onChange: (key, dir) => {
                                    setSortKey(key);
                                    setSortDir(dir);
                                } })] })] }), filtersOpen && (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3", children: [_jsx(FilterSelect, { label: "Status", value: statusFilter, onChange: (v) => {
                                    setStatusFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All statuses' },
                                    { value: 'draft', label: 'Draft' },
                                    { value: 'scheduled', label: 'Scheduled' },
                                    { value: 'active', label: 'Active' },
                                    { value: 'paused', label: 'Paused' },
                                    { value: 'exhausted', label: 'Exhausted' },
                                    { value: 'expired', label: 'Expired' },
                                    { value: 'archived', label: 'Archived' },
                                ] }), _jsx(FilterSelect, { label: "Type", value: typeFilter, onChange: (v) => {
                                    setTypeFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All types' },
                                    { value: 'firstTimeCheck', label: 'First-time check' },
                                    { value: 'postPaymentReward', label: 'Post-payment reward' },
                                    { value: 'influencer', label: 'Influencer' },
                                    { value: 'corporate', label: 'Corporate' },
                                    { value: 'specificCustomers', label: 'Specific customers' },
                                ] }), _jsx(DateInput, { label: "Start on or after", value: startDateFilter, onChange: (v) => {
                                    setStartDateFilter(v);
                                    setCurrentPage(1);
                                } }), _jsx(DateInput, { label: "End on or before", value: endDateFilter, onChange: (v) => {
                                    setEndDateFilter(v);
                                    setCurrentPage(1);
                                } })] }), activeFilterCount > 0 && (_jsx("div", { className: "flex items-center justify-end mt-3", children: _jsxs("button", { onClick: clearFilters, className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white", children: [_jsx(X, { className: "w-3.5 h-3.5" }), "Clear filters"] }) }))] })), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-visible", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Name & Code" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Type" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Status" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Validity" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 min-w-[180px]", children: "Budget Used" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Created" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-20", children: "Actions" })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [paginated.map((p) => {
                                            const effective = p.effectiveStatus;
                                            const canEdit = effective === 'draft' && permissions.editDraftProgramme;
                                            const canEditLive = (effective === 'active' || effective === 'scheduled' || effective === 'paused') &&
                                                permissions.editDraftProgramme;
                                            const canPause = effective === 'active' && permissions.pauseResumeIssuing;
                                            const canPauseRedemption = effective === 'active' && permissions.pauseResumeRedemption;
                                            const canResume = effective === 'paused' &&
                                                (permissions.pauseResumeIssuing || permissions.pauseResumeRedemption);
                                            const canArchive = (effective === 'draft' ||
                                                effective === 'scheduled' ||
                                                effective === 'paused' ||
                                                effective === 'exhausted') &&
                                                permissions.archiveProgramme;
                                            const canClone = permissions.cloneProgramme;
                                            const isTerminal = effective === 'expired' || effective === 'archived' || effective === 'exhausted';
                                            const pct = budgetPercent(p);
                                            return (_jsxs("tr", { onClick: () => onView?.(p.id), className: "hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer", children: [_jsx("td", { className: "px-4 py-3.5", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: p.name }), _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400 font-mono", children: p.code })] }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap", children: typeLabels[p.type] }), _jsx("td", { className: "px-4 py-3.5", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${statusBadgeClass[effective]}`, children: statusLabels[effective] }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: formatDate(p.startAt) }), _jsxs("span", { className: "text-xs text-slate-400", children: ["\u2192 ", formatDate(p.endAt)] })] }) }), _jsx("td", { className: "px-4 py-3.5 min-w-[180px]", children: _jsx(BudgetBar, { percent: pct, issued: p.coinsIssued, budget: p.budgetCoins, alertLevel: p.alertLevelPercent }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: p.createdBy }), _jsx("span", { className: "text-xs text-slate-400", children: formatDate(p.createdAt) })] }) }), _jsx("td", { className: "px-4 py-3.5", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", ref: openMenuId === p.id ? menuRef : null, children: [_jsx("button", { onClick: (e) => {
                                                                        e.stopPropagation();
                                                                        setOpenMenuId((prev) => (prev === p.id ? null : p.id));
                                                                    }, className: "p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }), openMenuId === p.id && (_jsxs("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-20", children: [_jsx(MenuItem, { icon: _jsx(Eye, { className: "w-3.5 h-3.5" }), label: "View details", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onView?.(p.id);
                                                                            } }), (canEdit || canEditLive) && (_jsx(MenuItem, { icon: _jsx(Pencil, { className: "w-3.5 h-3.5" }), label: canEdit ? 'Edit' : 'Edit (saves new version)', onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onEdit?.(p.id);
                                                                            } })), canPause && (_jsx(MenuItem, { icon: _jsx(Pause, { className: "w-3.5 h-3.5" }), label: "Pause issuing", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onPauseIssuing?.(p.id);
                                                                            } })), canPauseRedemption && (_jsx(MenuItem, { icon: _jsx(Pause, { className: "w-3.5 h-3.5" }), label: "Pause redemption", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onPauseRedemption?.(p.id);
                                                                            } })), canResume && (_jsx(MenuItem, { icon: _jsx(Play, { className: "w-3.5 h-3.5" }), label: "Resume", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onResume?.(p.id);
                                                                            } })), canArchive && (_jsx(MenuItem, { icon: _jsx(Archive, { className: "w-3.5 h-3.5" }), label: "Archive", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onArchive?.(p.id);
                                                                            } })), canClone && (_jsx(MenuItem, { icon: _jsx(Copy, { className: "w-3.5 h-3.5" }), label: "Clone", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onClone?.(p.id);
                                                                            } })), isTerminal && (_jsx("div", { className: "px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-700 mt-1", children: "Read-only \u2014 issuing has ended." }))] }))] }) })] }, p.id));
                                        }), paginated.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 7, className: "px-4 py-12 text-center text-sm text-slate-400", children: "No programmes match the current filters." }) }))] })] }) }), filtered.length > 0 && (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700", children: [_jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Showing ", (currentPage - 1) * perPage + 1, "\u2013", Math.min(currentPage * perPage, filtered.length), " of ", filtered.length] }), totalPages > 1 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, className: "px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed", children: "<" }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => setCurrentPage(page), className: `px-2.5 py-1.5 text-sm rounded ${page === currentPage
                                            ? 'bg-cyan-500 text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`, children: page }, page))), _jsx("button", { onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, className: "px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed", children: ">" })] }))] }))] })] }));
}
function BudgetBar({ percent, issued, budget, alertLevel, }) {
    const isAlert = alertLevel != null && percent >= alertLevel;
    const isFull = percent >= 100;
    const barColor = isFull
        ? 'bg-red-500'
        : isAlert
            ? 'bg-amber-500'
            : 'bg-cyan-500';
    return (_jsxs("div", { className: "flex flex-col gap-1 min-w-[160px]", children: [_jsxs("div", { className: "flex items-center justify-between text-xs text-slate-600 dark:text-slate-300", children: [_jsxs("span", { className: "font-medium", children: [formatCoins(issued), " / ", formatCoins(budget)] }), _jsxs("span", { className: "text-slate-400", children: [percent, "%"] })] }), _jsx("div", { className: "w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${barColor} transition-all`, style: { width: `${percent}%` } }) })] }));
}
function SortDropdown({ sortKey, sortDir, onChange, }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);
    const options = [
        { key: 'created', dir: 'desc', label: 'Newest' },
        { key: 'expiry', dir: 'asc', label: 'Expiring soon' },
        { key: 'budgetUsed', dir: 'desc', label: 'Highest budget used' },
    ];
    const current = options.find((o) => o.key === sortKey && o.dir === sortDir) ??
        options.find((o) => o.key === sortKey) ??
        options[0];
    return (_jsxs("div", { className: "relative", ref: ref, children: [_jsxs("button", { onClick: () => setOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${open
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(ArrowUpDown, { className: "w-4 h-4" }), "Sort: ", current.label] }), open && (_jsx("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30", children: options.map((opt) => {
                    const isActive = opt.key === sortKey && opt.dir === sortDir;
                    return (_jsxs("button", { onClick: () => {
                            onChange(opt.key, opt.dir);
                            setOpen(false);
                        }, className: `w-full flex items-center justify-between px-3 py-2 text-sm transition-colors ${isActive
                            ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300 font-medium'
                            : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [opt.label, isActive && _jsx("span", { className: "text-xs", children: "\u2713" })] }, `${opt.key}-${opt.dir}`));
                }) }))] }));
}
function FilterSelect({ label, value, onChange, options, }) {
    return (_jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: label }), _jsx("select", { value: value, onChange: (e) => onChange(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: options.map((o) => (_jsx("option", { value: o.value, children: o.label }, o.value))) })] }));
}
function DateInput({ label, value, onChange, }) {
    return (_jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: label }), _jsxs("div", { className: "relative", children: [_jsx(Calendar, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" }), _jsx("input", { type: "date", value: value, onChange: (e) => onChange(e.target.value), className: "w-full pl-10 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] }));
}
function MenuItem({ icon, label, onClick, }) {
    return (_jsxs("button", { onClick: onClick, className: "w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [icon, label] }));
}
