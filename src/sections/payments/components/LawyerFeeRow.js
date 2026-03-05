import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreHorizontal, CheckCircle } from 'lucide-react';
const STATUS_LABELS = {
    'To Pay': {
        label: 'To Pay',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    Completed: {
        label: 'Completed',
        className: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400',
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
export function LawyerFeeRow({ fee, onViewLawyerProfile, onMarkComplete, }) {
    const [showMenu, setShowMenu] = useState(false);
    const statusConfig = STATUS_LABELS[fee.status] || {
        label: fee.status,
        className: '',
    };
    return (_jsxs("tr", { className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer", onClick: onViewLawyerProfile, children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: fee.lawyerId }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-7 w-7 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-xs font-semibold text-cyan-700 dark:text-cyan-400", children: fee.lawyerName.replace('Adv. ', '').charAt(0) }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: fee.lawyerName })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(fee.totalAmount) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-medium text-emerald-600 dark:text-emerald-400", children: formatCurrency(fee.commissionAmount) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.className}`, children: statusConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(fee.dueDate) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(fee.paidDate) }) }), _jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-slate-500" }) }), showMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowMenu(false) }), _jsx("div", { className: "absolute right-0 top-full mt-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: fee.status !== 'Completed' ? (_jsxs("button", { onClick: () => {
                                            onMarkComplete?.();
                                            setShowMenu(false);
                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), "Mark as Complete"] })) : (_jsx("div", { className: "px-3 py-2 text-sm text-slate-400 dark:text-slate-500", children: "No actions available" })) })] }))] }) })] }));
}
