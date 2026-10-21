import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const STATUS_LABELS = {
    Created: {
        label: 'Created',
        className: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
    },
    Accepted: {
        label: 'Accepted',
        className: 'bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400',
    },
    'In Progress': {
        label: 'In Progress',
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
export function BatchRow({ batch, onClick }) {
    const statusConfig = STATUS_LABELS[batch.status] || {
        label: batch.status,
        className: '',
    };
    return (_jsxs("tr", { className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer", onClick: onClick, children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: batch.batchId }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: batch.assignedExpertName }), _jsx("span", { className: "font-mono text-xs text-slate-500 dark:text-slate-400", children: batch.assignedExpertId })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: batch.itemCount }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(batch.totalAmount) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${statusConfig.className}`, children: statusConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(batch.createdDate) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(batch.lastUpdated) }) })] }));
}
