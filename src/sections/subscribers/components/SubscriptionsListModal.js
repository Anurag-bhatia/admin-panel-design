import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { X } from 'lucide-react';
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
export function SubscriptionsListModal({ subscriberName, subscriptions, onSelect, onClose, }) {
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        document.addEventListener('keydown', onKey);
        return () => document.removeEventListener('keydown', onKey);
    }, [onClose]);
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-slate-950/70 p-4", onClick: onClose, children: _jsxs("div", { className: "w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Subscriptions" }), _jsxs("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: [subscriberName, " \u00B7 Select a plan to view details"] })] }), _jsx("button", { onClick: onClose, className: "p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors", "aria-label": "Close", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "max-h-[60vh] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800", children: subscriptions.length === 0 ? (_jsx("p", { className: "px-5 py-8 text-center text-sm text-slate-400", children: "No subscriptions found" })) : (subscriptions.map((sub) => (_jsx("button", { onClick: () => onSelect(sub.id), className: "w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors", children: _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: sub.subscriptionName }), _jsxs("p", { className: "mt-0.5 text-xs text-slate-500 dark:text-slate-400", children: [sub.planType, " \u00B7 ", formatDate(sub.startDate), " \u2013 ", formatDate(sub.endDate)] })] }) }, sub.id)))) })] }) }));
}
