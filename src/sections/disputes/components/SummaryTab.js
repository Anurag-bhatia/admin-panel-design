import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TYPE_LABELS = {
    refund: 'Refund Dispute',
    service: 'Service Dispute',
    payment: 'Payment Dispute',
    legal_escalation: 'Legal Escalation',
};
const RAISED_BY_LABELS = {
    customer: 'Customer',
    subscriber: 'Subscriber',
    internal: 'Internal',
};
const STATUS_LABELS = {
    open: {
        label: 'Open',
        className: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
    },
    under_review: {
        label: 'Under Review',
        className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    },
    escalated: {
        label: 'Escalated',
        className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    },
    resolved: {
        label: 'Resolved',
        className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    },
    rejected: {
        label: 'Rejected',
        className: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    },
};
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function SummaryTab({ dispute }) {
    const statusConfig = STATUS_LABELS[dispute.status] || { label: dispute.status, className: '' };
    return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-4", children: "Dispute Overview" }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Dispute ID" }), _jsx("p", { className: "text-sm font-mono font-semibold text-slate-900 dark:text-white", children: dispute.disputeId })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Status" }), _jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded text-xs font-medium ${statusConfig.className}`, children: statusConfig.label })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Dispute Type" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: TYPE_LABELS[dispute.disputeType] || dispute.disputeType })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Raised By" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: RAISED_BY_LABELS[dispute.raisedBy] || dispute.raisedBy })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Source" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: dispute.source })] }), dispute.disputedAmount !== null && (_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Disputed Amount" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(dispute.disputedAmount) })] })), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Created On" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: formatDateTime(dispute.createdOn) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Last Updated" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: formatDateTime(dispute.lastUpdated) })] })] }) })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-4", children: "Reason" }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6", children: _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed", children: dispute.reason || dispute.description }) })] })] }) }));
}
