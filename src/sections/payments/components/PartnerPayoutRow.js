import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreHorizontal, CheckCircle } from 'lucide-react';
const STATUS_LABELS = {
    Eligible: {
        label: 'Eligible',
        className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    },
    Requested: {
        label: 'Requested',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    'Auto-Processed': {
        label: 'Auto-Processed',
        className: 'bg-violet-50 dark:bg-violet-900/20 text-violet-700 dark:text-violet-400',
    },
    Processing: {
        label: 'Processing',
        className: 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400',
    },
    Processed: {
        label: 'Processed',
        className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
    },
    Failed: {
        label: 'Failed',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
};
function formatDate(dateString) {
    if (!dateString)
        return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
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
export function PartnerPayoutRow({ payout, isSelected = false, onSelect, onViewPartnerProfile, onMarkComplete, }) {
    const [showMenu, setShowMenu] = useState(false);
    const statusConfig = STATUS_LABELS[payout.status] || {
        label: payout.status,
        className: '',
    };
    return (_jsxs("tr", { className: `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''}`, onClick: onViewPartnerProfile, children: [_jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: (e) => onSelect?.(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800" }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: payout.partnerId }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-7 w-7 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xs font-semibold text-violet-700 dark:text-violet-400", children: payout.partnerName.charAt(0) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: payout.partnerName }), _jsx("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: payout.companyName })] })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(payout.totalEarnings) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-medium text-emerald-600 dark:text-emerald-400", children: formatCurrency(payout.payoutAmount) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.className}`, children: statusConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(payout.dueDate) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(payout.paidDate) }) }), _jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-slate-500" }) }), showMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowMenu(false) }), _jsx("div", { className: "absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: ['Completed', 'Hold', 'Failed'].map((action) => (_jsxs("button", { onClick: () => {
                                            onMarkComplete?.();
                                            setShowMenu(false);
                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), action] }, action))) })] }))] }) })] }));
}
