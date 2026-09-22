import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef, useState, useEffect } from 'react';
import { Plus, Search, Filter, ArrowUpDown, MoreVertical, Pencil, Pause, Play, Archive, Copy, Eye, X, } from 'lucide-react';
const statusLabels = {
    draft: 'Draft',
    active: 'Active',
    paused: 'Paused',
    expired: 'Expired',
    archived: 'Archived',
};
const statusBadgeClass = {
    draft: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    active: 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300',
    paused: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    expired: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    archived: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400',
};
const platformLabels = {
    challanpay: 'ChallanPay',
    lots247: 'LOTS247',
};
const challanTypeLabels = {
    online: 'Online',
    regularCourt: 'Regular',
    xpressCourt: 'XPress',
};
const perPage = 25;
function getEffectiveStatus(coupon, now) {
    if (coupon.status === 'archived')
        return 'archived';
    if (coupon.status === 'expired')
        return 'expired';
    const end = new Date(coupon.endAt);
    if (end.getTime() < now.getTime())
        return 'expired';
    return coupon.status;
}
function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function formatValue(coupon) {
    if (coupon.type === 'flat')
        return `₹${coupon.value}`;
    return `${coupon.value}%`;
}
function formatValueSub(coupon) {
    if (coupon.type === 'flat')
        return 'Flat';
    if (coupon.maxDiscountCap)
        return `Capped at ₹${coupon.maxDiscountCap}`;
    return 'Percentage';
}
function formatUsage(coupon) {
    if (coupon.totalUsageLimit == null)
        return `${coupon.usageCount} / ∞`;
    return `${coupon.usageCount} / ${coupon.totalUsageLimit}`;
}
export function CouponList({ coupons, onCreate, onEdit, onView, onPause, onResume, onArchive, onClone, onSearch, }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [typeFilter, setTypeFilter] = useState('all');
    const [platformFilter, setPlatformFilter] = useState('all');
    const [challanTypeFilter, setChallanTypeFilter] = useState('all');
    const [stateFilter, setStateFilter] = useState('all');
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
    const allStates = useMemo(() => {
        const set = new Set();
        coupons.forEach((c) => c.states.forEach((s) => set.add(s)));
        return Array.from(set).sort();
    }, [coupons]);
    const filtered = useMemo(() => {
        return coupons
            .map((c) => ({ ...c, effectiveStatus: getEffectiveStatus(c, now) }))
            .filter((c) => {
            if (searchQuery && !c.code.toLowerCase().includes(searchQuery.toLowerCase()))
                return false;
            if (statusFilter !== 'all' && c.effectiveStatus !== statusFilter)
                return false;
            if (typeFilter !== 'all' && c.type !== typeFilter)
                return false;
            if (platformFilter !== 'all' && !c.platforms.includes(platformFilter))
                return false;
            if (challanTypeFilter !== 'all' && !c.challanTypes.includes(challanTypeFilter))
                return false;
            if (stateFilter !== 'all') {
                if (c.states.length === 0)
                    return false;
                if (!c.states.includes(stateFilter))
                    return false;
            }
            return true;
        })
            .sort((a, b) => {
            const dir = sortDir === 'asc' ? 1 : -1;
            if (sortKey === 'usage')
                return dir * (a.usageCount - b.usageCount);
            if (sortKey === 'expiry')
                return dir * (new Date(a.endAt).getTime() - new Date(b.endAt).getTime());
            return dir * (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        });
    }, [coupons, searchQuery, statusFilter, typeFilter, platformFilter, challanTypeFilter, stateFilter, sortKey, sortDir, now]);
    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const activeFilterCount = (statusFilter !== 'all' ? 1 : 0) +
        (typeFilter !== 'all' ? 1 : 0) +
        (platformFilter !== 'all' ? 1 : 0) +
        (challanTypeFilter !== 'all' ? 1 : 0) +
        (stateFilter !== 'all' ? 1 : 0);
    const clearFilters = () => {
        setStatusFilter('all');
        setTypeFilter('all');
        setPlatformFilter('all');
        setChallanTypeFilter('all');
        setStateFilter('all');
        setCurrentPage(1);
    };
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Coupons" }), _jsxs("button", { onClick: onCreate, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4" }), "Create Coupon"] })] }), _jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-4", children: [_jsxs("div", { className: "relative w-full sm:flex-1 sm:max-w-2xl", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by code\u2026", value: searchQuery, onChange: (e) => {
                                    setSearchQuery(e.target.value);
                                    setCurrentPage(1);
                                    onSearch?.(e.target.value);
                                }, className: "w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { className: "flex items-center gap-3 ml-auto", children: [_jsxs("button", { onClick: () => setFiltersOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${filtersOpen || activeFilterCount > 0
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4" }), "Filters", activeFilterCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white", children: activeFilterCount }))] }), _jsx(SortDropdown, { sortKey: sortKey, sortDir: sortDir, onChange: (key, dir) => {
                                    setSortKey(key);
                                    setSortDir(dir);
                                } })] })] }), filtersOpen && (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-4 mb-4", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3", children: [_jsx(FilterSelect, { label: "Status", value: statusFilter, onChange: (v) => {
                                    setStatusFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All statuses' },
                                    { value: 'draft', label: 'Draft' },
                                    { value: 'active', label: 'Active' },
                                    { value: 'paused', label: 'Paused' },
                                    { value: 'expired', label: 'Expired' },
                                    { value: 'archived', label: 'Archived' },
                                ] }), _jsx(FilterSelect, { label: "Type", value: typeFilter, onChange: (v) => {
                                    setTypeFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All types' },
                                    { value: 'flat', label: 'Flat' },
                                    { value: 'percentage', label: 'Percentage' },
                                ] }), _jsx(FilterSelect, { label: "Platform", value: platformFilter, onChange: (v) => {
                                    setPlatformFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All platforms' },
                                    { value: 'challanpay', label: 'ChallanPay' },
                                    { value: 'lots247', label: 'LOTS247' },
                                ] }), _jsx(FilterSelect, { label: "Challan type", value: challanTypeFilter, onChange: (v) => {
                                    setChallanTypeFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All challan types' },
                                    { value: 'online', label: 'Online' },
                                    { value: 'regularCourt', label: 'Regular Court' },
                                    { value: 'xpressCourt', label: 'XPress Court' },
                                ] }), _jsx(FilterSelect, { label: "State", value: stateFilter, onChange: (v) => {
                                    setStateFilter(v);
                                    setCurrentPage(1);
                                }, options: [
                                    { value: 'all', label: 'All states' },
                                    ...allStates.map((s) => ({ value: s, label: s })),
                                ] })] }), activeFilterCount > 0 && (_jsx("div", { className: "flex items-center justify-end mt-3", children: _jsxs("button", { onClick: clearFilters, className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white", children: [_jsx(X, { className: "w-3.5 h-3.5" }), "Clear filters"] }) }))] })), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-visible", children: [_jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Code" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Value" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Challan Type" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Platform" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Location" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Status" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Validity" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Usage" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3", children: "Created" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3 w-20", children: "Actions" })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [paginated.map((coupon) => {
                                            const effective = coupon.effectiveStatus;
                                            const canEdit = effective === 'draft';
                                            const canPause = effective === 'active';
                                            const canResume = effective === 'paused';
                                            const canArchive = effective === 'draft' || effective === 'paused';
                                            const isTerminal = effective === 'expired' || effective === 'archived';
                                            return (_jsxs("tr", { onClick: () => onView?.(coupon.id), className: "hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer", children: [_jsx("td", { className: "px-4 py-3.5", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: coupon.code }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "font-medium", children: formatValue(coupon) }), _jsx("span", { className: "text-xs text-slate-400", children: formatValueSub(coupon) })] }) }), _jsx("td", { className: "px-4 py-3.5", children: _jsx("div", { className: "flex flex-wrap gap-1", children: coupon.challanTypes.map((t) => (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: challanTypeLabels[t] }, t))) }) }), _jsx("td", { className: "px-4 py-3.5", children: _jsx("div", { className: "flex flex-wrap gap-1", children: coupon.platforms.map((p) => (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${p === 'challanpay'
                                                                    ? 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                                                    : 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'}`, children: platformLabels[p] }, p))) }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300", children: coupon.states.length === 0 ? (_jsx("span", { className: "text-slate-400", children: "All states" })) : coupon.states.length <= 2 ? (coupon.states.join(', ')) : (_jsxs("span", { children: [coupon.states.slice(0, 2).join(', '), ' ', _jsxs("span", { className: "text-slate-400", children: ["+", coupon.states.length - 2] })] })) }), _jsx("td", { className: "px-4 py-3.5", children: _jsx("span", { className: `inline-flex items-center px-2.5 py-1 text-xs font-medium rounded-full ${statusBadgeClass[effective]}`, children: statusLabels[effective] }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: formatDate(coupon.startAt) }), _jsxs("span", { className: "text-xs text-slate-400", children: ["\u2192 ", formatDate(coupon.endAt)] })] }) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-700 dark:text-slate-200 whitespace-nowrap", children: formatUsage(coupon) }), _jsx("td", { className: "px-4 py-3.5 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: coupon.createdBy }), _jsx("span", { className: "text-xs text-slate-400", children: formatDate(coupon.createdAt) })] }) }), _jsx("td", { className: "px-4 py-3.5", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", ref: openMenuId === coupon.id ? menuRef : null, children: [_jsx("button", { onClick: (e) => {
                                                                        e.stopPropagation();
                                                                        setOpenMenuId((prev) => (prev === coupon.id ? null : coupon.id));
                                                                    }, className: "p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(MoreVertical, { className: "w-4 h-4" }) }), openMenuId === coupon.id && (_jsxs("div", { className: "absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-20", children: [_jsx(MenuItem, { icon: _jsx(Eye, { className: "w-3.5 h-3.5" }), label: "View details", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onView?.(coupon.id);
                                                                            } }), canEdit && (_jsx(MenuItem, { icon: _jsx(Pencil, { className: "w-3.5 h-3.5" }), label: "Edit", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onEdit?.(coupon.id);
                                                                            } })), canPause && (_jsx(MenuItem, { icon: _jsx(Pause, { className: "w-3.5 h-3.5" }), label: "Pause", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onPause?.(coupon.id);
                                                                            } })), canResume && (_jsx(MenuItem, { icon: _jsx(Play, { className: "w-3.5 h-3.5" }), label: "Resume", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onResume?.(coupon.id);
                                                                            } })), canArchive && (_jsx(MenuItem, { icon: _jsx(Archive, { className: "w-3.5 h-3.5" }), label: "Archive", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onArchive?.(coupon.id);
                                                                            } })), _jsx(MenuItem, { icon: _jsx(Copy, { className: "w-3.5 h-3.5" }), label: "Clone", onClick: () => {
                                                                                setOpenMenuId(null);
                                                                                onClone?.(coupon.id);
                                                                            } }), isTerminal && (_jsx("div", { className: "px-3 py-1.5 text-[11px] text-slate-400 border-t border-slate-100 dark:border-slate-700 mt-1", children: "Read-only \u2014 no further actions." }))] }))] }) })] }, coupon.id));
                                        }), paginated.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 10, className: "px-4 py-12 text-center text-sm text-slate-400", children: "No coupons match the current filters." }) }))] })] }) }), filtered.length > 0 && (_jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700", children: [_jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Showing ", (currentPage - 1) * perPage + 1, "\u2013", Math.min(currentPage * perPage, filtered.length), " of ", filtered.length] }), totalPages > 1 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => setCurrentPage((p) => Math.max(1, p - 1)), disabled: currentPage === 1, className: "px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed", children: "<" }), Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (_jsx("button", { onClick: () => setCurrentPage(page), className: `px-2.5 py-1.5 text-sm rounded ${page === currentPage
                                            ? 'bg-cyan-500 text-white'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'}`, children: page }, page))), _jsx("button", { onClick: () => setCurrentPage((p) => Math.min(totalPages, p + 1)), disabled: currentPage === totalPages, className: "px-2.5 py-1.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded disabled:opacity-40 disabled:cursor-not-allowed", children: ">" })] }))] }))] })] }));
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
        { key: 'usage', dir: 'desc', label: 'Most used' },
    ];
    const current = options.find((o) => o.key === sortKey && o.dir === sortDir) ??
        options.find((o) => o.key === sortKey) ??
        options[0];
    return (_jsxs("div", { className: "relative", ref: ref, children: [_jsxs("button", { onClick: () => setOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${open
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(ArrowUpDown, { className: "w-4 h-4" }), "Sort: ", current.label] }), open && (_jsx("div", { className: "absolute right-0 top-full mt-1 w-52 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg py-1 z-30", children: options.map((opt) => {
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
function MenuItem({ icon, label, onClick, }) {
    return (_jsxs("button", { onClick: onClick, className: "w-full flex items-center gap-2 px-3 py-1.5 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [icon, label] }));
}
