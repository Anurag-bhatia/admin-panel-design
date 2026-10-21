import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Search, MessageCircle, Filter, CheckCheck, Paperclip, ChevronDown, X, } from 'lucide-react';
function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const minute = 60 * 1000;
    if (diff < 2 * minute)
        return 'just now';
    if (diff < 60 * minute)
        return `${Math.floor(diff / minute)}m ago`;
    if (diff < 24 * 60 * minute)
        return `${Math.floor(diff / (60 * minute))}h ago`;
    const days = Math.floor(diff / (24 * 60 * minute));
    if (days < 7)
        return `${days}d ago`;
    return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}
const WORKTYPE_LABEL = {
    case: 'Case',
    challan: 'Challan',
};
const WORKTYPE_TONE = {
    case: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    challan: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
};
export function ChatsInbox({ threads, incidents, lawyers, users, currentUserId, onOpenThread, }) {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [workTypeFilter, setWorkTypeFilter] = useState('all');
    const [stateFilter, setStateFilter] = useState('all');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const activeFilterCount = (workTypeFilter !== 'all' ? 1 : 0) + (stateFilter !== 'all' ? 1 : 0);
    const workTypeLabel = workTypeFilter === 'all' ? 'All types' : workTypeFilter === 'case' ? 'Cases' : 'Challans';
    const availableStates = useMemo(() => {
        const set = new Set(threads.map((t) => t.state));
        return Array.from(set).sort();
    }, [threads]);
    const filtered = useMemo(() => {
        return threads
            .filter((t) => {
            if (workTypeFilter !== 'all' && t.workType !== workTypeFilter)
                return false;
            if (stateFilter !== 'all' && t.state !== stateFilter)
                return false;
            if (filter === 'unread' && t.unreadCount === 0)
                return false;
            if (filter === 'assignedToMe' && t.ownerId !== currentUserId)
                return false;
            if (filter === 'unassigned' && t.ownerId)
                return false;
            if (filter === 'tatBreaching' && t.tatDaysLeft > 7)
                return false;
            if (search.trim()) {
                const incident = incidents.find((i) => i.id === t.incidentId);
                const lawyer = lawyers.find((l) => l.id === t.lawyerId);
                const haystack = [
                    t.incidentCode,
                    incident?.challanNumber,
                    incident?.vehicle,
                    lawyer?.name,
                ]
                    .filter(Boolean)
                    .join(' ')
                    .toLowerCase();
                if (!haystack.includes(search.toLowerCase().trim()))
                    return false;
            }
            return true;
        })
            .sort((a, b) => new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime());
    }, [threads, filter, workTypeFilter, stateFilter, search, currentUserId, incidents, lawyers]);
    const counts = useMemo(() => {
        const unread = threads.filter((t) => t.unreadCount > 0).length;
        const mine = threads.filter((t) => t.ownerId === currentUserId).length;
        const unassigned = threads.filter((t) => !t.ownerId).length;
        const tat = threads.filter((t) => t.tatDaysLeft <= 7).length;
        return { unread, mine, unassigned, tat, all: threads.length };
    }, [threads, currentUserId]);
    return (_jsxs("div", { className: "flex flex-col h-full bg-slate-100 dark:bg-slate-950", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4", children: [_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsx("div", { children: _jsxs("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white flex items-center gap-2", children: [_jsx(MessageCircle, { className: "h-5 w-5 text-cyan-600 dark:text-cyan-400" }), "Chats"] }) }), _jsxs("div", { className: "relative w-80", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), _jsx("input", { type: "text", value: search, onChange: (e) => setSearch(e.target.value), placeholder: "Incident ID, challan, vehicle, lawyer\u2026", className: "w-full pl-9 pr-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400" })] })] }), _jsxs("div", { className: "mt-4 flex items-center gap-2 flex-wrap", children: [_jsx(FilterChip, { label: "All", count: counts.all, active: filter === 'all', onClick: () => setFilter('all') }), _jsx(FilterChip, { label: "Unread", count: counts.unread, tone: "rose", active: filter === 'unread', onClick: () => setFilter('unread') }), _jsx(FilterChip, { label: "TAT breaching soon", count: counts.tat, tone: "red", active: filter === 'tatBreaching', onClick: () => setFilter('tatBreaching') }), _jsx("div", { className: "h-5 w-px bg-slate-200 dark:bg-slate-700 mx-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowFilterMenu((v) => !v), className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${activeFilterCount > 0
                                            ? 'bg-cyan-50 dark:bg-cyan-900/15 text-cyan-700 dark:text-cyan-400 border-cyan-200 dark:border-cyan-800'
                                            : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsx(Filter, { className: "h-3.5 w-3.5" }), "Filter", activeFilterCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full text-[10px] font-semibold bg-cyan-600 text-white", children: activeFilterCount })), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showFilterMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowFilterMenu(false) }), _jsxs("div", { className: "absolute left-0 top-full mt-2 w-72 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-4 z-20", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300", children: "Filters" }), activeFilterCount > 0 && (_jsxs("button", { onClick: () => {
                                                                    setWorkTypeFilter('all');
                                                                    setStateFilter('all');
                                                                }, className: "inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white", children: [_jsx(X, { className: "h-3 w-3" }), "Clear"] }))] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Incident type" }), _jsxs("select", { value: workTypeFilter, onChange: (e) => setWorkTypeFilter(e.target.value), className: "w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "all", children: "All types" }), _jsx("option", { value: "challan", children: "Challans" }), _jsx("option", { value: "case", children: "Cases" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-[11px] font-medium text-slate-500 dark:text-slate-400 mb-1", children: "State" }), _jsxs("select", { value: stateFilter, onChange: (e) => setStateFilter(e.target.value), className: "w-full text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1.5 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsx("option", { value: "all", children: "All states" }), availableStates.map((s) => (_jsx("option", { value: s, children: s }, s)))] })] })] })] })] }))] }), workTypeFilter !== 'all' && (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-50 dark:bg-cyan-900/15 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800", children: [workTypeLabel, _jsx("button", { onClick: () => setWorkTypeFilter('all'), className: "hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-full", children: _jsx(X, { className: "h-3 w-3" }) })] })), stateFilter !== 'all' && (_jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-cyan-50 dark:bg-cyan-900/15 text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800", children: [stateFilter, _jsx("button", { onClick: () => setStateFilter('all'), className: "hover:bg-cyan-100 dark:hover:bg-cyan-900/30 rounded-full", children: _jsx(X, { className: "h-3 w-3" }) })] }))] })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: filtered.length === 0 ? (_jsx("div", { className: "h-full flex items-center justify-center p-12", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3", children: _jsx(MessageCircle, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium", children: "No chats match your filters" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Try clearing the search or filters to see all threads." })] }) })) : (_jsx("ul", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: filtered.map((t) => {
                        const lawyer = lawyers.find((l) => l.id === t.lawyerId);
                        const incident = incidents.find((i) => i.id === t.incidentId);
                        const unread = t.unreadCount > 0;
                        const tatBreaching = t.tatDaysLeft <= 7;
                        return (_jsx("li", { children: _jsxs("button", { onClick: () => onOpenThread?.(t.incidentId), className: `w-full flex items-start gap-3 px-6 py-4 text-left transition-colors ${unread
                                    ? 'bg-cyan-50/40 dark:bg-cyan-900/5 hover:bg-cyan-50 dark:hover:bg-cyan-900/10'
                                    : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`, children: [_jsx("div", { className: "h-10 w-10 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-sm font-semibold text-cyan-700 dark:text-cyan-300 flex-shrink-0", children: lawyer?.name.replace('Adv. ', '').charAt(0) ?? '?' }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: "font-mono text-sm font-semibold text-slate-900 dark:text-white", children: t.incidentCode }), _jsx("span", { className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium border ${WORKTYPE_TONE[t.workType]}`, children: WORKTYPE_LABEL[t.workType] }), t.isExpress && (_jsx("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800", children: "Express" })), tatBreaching && (_jsxs("span", { className: "inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800", children: [t.tatDaysLeft, "d"] }))] }), _jsx("div", { className: "mt-1 flex items-center gap-2", children: _jsxs("p", { className: `text-sm truncate flex-1 ${unread
                                                        ? 'text-slate-900 dark:text-white font-medium'
                                                        : 'text-slate-500 dark:text-slate-400'}`, children: [t.lastMessageSender === 'ops' && (_jsx(CheckCheck, { className: "h-3 w-3 inline mr-1 text-sky-500" })), _jsxs("span", { className: "font-semibold text-slate-700 dark:text-slate-200", children: [t.lastMessageSender === 'ops'
                                                                    ? (t.lastMessageSenderName ?? 'You')
                                                                    : (lawyer?.name ?? 'Unassigned'), ":"] }), ' ', t.lastMessageHasAttachment && (_jsx(Paperclip, { className: "h-3 w-3 inline mr-0.5 text-slate-400" })), t.lastMessagePreview] }) })] }), _jsxs("div", { className: "flex flex-col items-end gap-1.5 flex-shrink-0", children: [_jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: timeAgo(t.lastMessageAt) }), unread && (_jsx("span", { className: "inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-semibold bg-cyan-600 text-white", children: t.unreadCount }))] })] }) }, t.threadId));
                    }) })) })] }));
}
function FilterChip({ label, count, active, tone = 'cyan', onClick, }) {
    const activeTones = {
        cyan: 'bg-cyan-600 text-white',
        rose: 'bg-rose-600 text-white',
        amber: 'bg-amber-600 text-white',
        red: 'bg-red-600 text-white',
    };
    const idleTones = {
        cyan: 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300',
        rose: 'bg-rose-50 dark:bg-rose-900/15 text-rose-700 dark:text-rose-400',
        amber: 'bg-amber-50 dark:bg-amber-900/15 text-amber-700 dark:text-amber-400',
        red: 'bg-red-50 dark:bg-red-900/15 text-red-700 dark:text-red-400',
    };
    return (_jsxs("button", { onClick: onClick, className: `inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${active ? activeTones[tone] : idleTones[tone]}`, children: [label, _jsx("span", { className: `inline-flex items-center justify-center h-4 min-w-[16px] px-1 rounded-full text-[10px] font-semibold ${active ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`, children: count })] }));
}
