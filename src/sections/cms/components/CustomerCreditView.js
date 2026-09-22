import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Search, Phone, Car, Download, ArrowLeft } from 'lucide-react';
import { defaultWalletPermissions } from '@/../product/sections/cms/types';
const sourceLabels = {
    firstTimeCheck: 'First-time check',
    postPaymentReward: 'Post-payment reward',
    influencer: 'Influencer',
    corporate: 'Corporate',
    specificCustomers: 'Specific customer',
    couponConversion: 'Coupon conversion',
};
const entryTypeLabels = {
    issue: 'Issue',
    reservation: 'Reservation',
    use: 'Use',
    release: 'Release',
    expiry: 'Expiry',
    reversal: 'Reversal',
};
const entryTypeBadge = {
    issue: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300',
    reservation: 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300',
    use: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
    release: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    expiry: 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300',
    reversal: 'bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300',
};
function formatDate(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
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
function formatCoins(n) {
    return n.toLocaleString('en-IN');
}
export function CustomerCreditView({ customerCredits, permissions = defaultWalletPermissions }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMobile, setSelectedMobile] = useState(null);
    const [entryTypeFilter, setEntryTypeFilter] = useState('all');
    const selected = useMemo(() => customerCredits.find((c) => c.mobileNumber === selectedMobile), [customerCredits, selectedMobile]);
    const searchResults = useMemo(() => {
        if (!searchQuery)
            return customerCredits.slice(0, 5);
        const q = searchQuery.toLowerCase().replace(/\s+/g, '');
        return customerCredits.filter((c) => c.mobileNumber.includes(q) ||
            c.vehicleNumbers.some((v) => v.toLowerCase().includes(q)) ||
            (c.customerName ?? '').toLowerCase().includes(q.toLowerCase()));
    }, [customerCredits, searchQuery]);
    const filteredHistory = useMemo(() => {
        if (!selected)
            return [];
        if (entryTypeFilter === 'all')
            return selected.history;
        return selected.history.filter((h) => h.entryType === entryTypeFilter);
    }, [selected, entryTypeFilter]);
    if (selected) {
        return (_jsxs("div", { children: [_jsxs("button", { onClick: () => setSelectedMobile(null), className: "inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white mb-4", children: [_jsx(ArrowLeft, { className: "w-4 h-4" }), "Back to search"] }), _jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4 mb-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-1", children: selected.customerName ?? 'Customer credit' }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 text-sm text-slate-600 dark:text-slate-400", children: [_jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx(Phone, { className: "w-3.5 h-3.5" }), selected.mobileNumber] }), selected.vehicleNumbers.map((v) => (_jsxs("span", { className: "inline-flex items-center gap-1.5 font-mono", children: [_jsx(Car, { className: "w-3.5 h-3.5" }), v] }, v)))] })] }), permissions.exportData && (_jsxs("button", { className: "inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800", children: [_jsx(Download, { className: "w-4 h-4" }), "Export history"] }))] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6", children: [_jsx(StatCard, { label: "Total available", value: `${formatCoins(selected.totalAvailable)} coins`, sub: `≈ ₹${formatCoins(selected.totalAvailable)}`, tone: "cyan" }), _jsx(StatCard, { label: "Reserved", value: `${formatCoins(selected.totalReserved)} coins`, sub: "Held by unpaid orders", tone: "amber" }), _jsx(StatCard, { label: "Active lots", value: `${selected.lots.length}`, sub: `from ${new Set(selected.lots.map((l) => l.source)).size} source${new Set(selected.lots.map((l) => l.source)).size > 1 ? 's' : ''}`, tone: "slate" })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden mb-6", children: [_jsx("div", { className: "px-5 py-3 border-b border-slate-200 dark:border-slate-700", children: _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Balance by lot" }) }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Programme" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Source" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Issued" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Available" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Reserved" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Dates" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: selected.lots.map((lot) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3", children: lot.programmeName ? (_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm text-slate-900 dark:text-white", children: lot.programmeName }), _jsx("span", { className: "text-xs text-slate-400 font-mono", children: lot.programmeCode })] })) : (_jsx("span", { className: "text-sm text-slate-400 italic", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: sourceLabels[lot.source] }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: formatCoins(lot.coinsIssued) }), _jsx("td", { className: "px-4 py-3 text-sm font-semibold text-cyan-700 dark:text-cyan-300", children: formatCoins(lot.coinsAvailable) }), _jsx("td", { className: "px-4 py-3 text-sm text-amber-700 dark:text-amber-300", children: formatCoins(lot.coinsReserved) }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { children: formatDate(lot.issuedOn) }), _jsxs("span", { className: "text-xs text-slate-400", children: ["\u2192 ", formatDate(lot.expiresOn)] })] }) })] }, lot.id))) })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden", children: [_jsxs("div", { className: "px-5 py-3 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "History" }), _jsxs("select", { value: entryTypeFilter, onChange: (e) => setEntryTypeFilter(e.target.value), className: "px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200", children: [_jsx("option", { value: "all", children: "All entries" }), _jsx("option", { value: "issue", children: "Issue" }), _jsx("option", { value: "reservation", children: "Reservation" }), _jsx("option", { value: "use", children: "Use" }), _jsx("option", { value: "release", children: "Release" }), _jsx("option", { value: "expiry", children: "Expiry" }), _jsx("option", { value: "reversal", children: "Reversal" })] })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Entry" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Coins" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Running Balance" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Order ID" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Caused By" }), _jsx("th", { className: "text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5", children: "Timestamp" })] }) }), _jsxs("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: [filteredHistory
                                                .slice()
                                                .reverse()
                                                .map((h) => (_jsxs("tr", { children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 text-xs font-medium rounded ${entryTypeBadge[h.entryType]}`, children: entryTypeLabels[h.entryType] }) }), _jsxs("td", { className: `px-4 py-3 text-sm font-semibold ${h.coins >= 0 ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`, children: [h.coins >= 0 ? '+' : '', formatCoins(h.coins)] }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: formatCoins(h.runningBalance) }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300 font-mono", children: h.orderId ?? '—' }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-200", children: h.causedBy }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-600 dark:text-slate-300 whitespace-nowrap", children: formatTime(h.timestamp) })] }, h.id))), filteredHistory.length === 0 && (_jsx("tr", { children: _jsx("td", { colSpan: 6, className: "px-4 py-8 text-center text-sm text-slate-400", children: "No entries match this filter." }) }))] })] }) })] })] }));
    }
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-6", children: "Customer Credit" }), _jsxs("div", { className: "relative mb-6 max-w-2xl", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" }), _jsx("input", { type: "text", placeholder: "Search by mobile number, vehicle number or name\u2026", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsx("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden", children: searchResults.length === 0 ? (_jsx("div", { className: "p-12 text-center text-sm text-slate-400", children: "No customers match." })) : (_jsx("div", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: searchResults.map((c) => (_jsxs("button", { onClick: () => setSelectedMobile(c.mobileNumber), className: "w-full flex items-center justify-between gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-left", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: c.customerName ?? c.mobileNumber }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1", children: [_jsxs("span", { className: "inline-flex items-center gap-1", children: [_jsx(Phone, { className: "w-3 h-3" }), c.mobileNumber] }), c.vehicleNumbers.map((v) => (_jsxs("span", { className: "inline-flex items-center gap-1 font-mono", children: [_jsx(Car, { className: "w-3 h-3" }), v] }, v)))] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("p", { className: "text-sm font-semibold text-cyan-700 dark:text-cyan-300", children: [formatCoins(c.totalAvailable), " coins"] }), _jsxs("p", { className: "text-xs text-slate-400", children: [c.lots.length, " active lot", c.lots.length > 1 ? 's' : ''] })] })] }, c.mobileNumber))) })) })] }));
}
function StatCard({ label, value, sub, tone, }) {
    const toneClasses = {
        cyan: 'text-cyan-700 dark:text-cyan-300',
        amber: 'text-amber-700 dark:text-amber-300',
        slate: 'text-slate-700 dark:text-slate-200',
    }[tone];
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2", children: label }), _jsx("p", { className: `text-2xl font-bold ${toneClasses}`, children: value }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: sub })] }));
}
