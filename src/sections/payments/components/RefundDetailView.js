import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, ArrowRightLeft, ChevronDown, } from 'lucide-react';
import { RefundActivityTab } from './RefundActivityTab';
import { RefundNotesTab } from './RefundNotesTab';
const STATUS_LABELS = {
    'Refund Raised': {
        label: 'Refund Raised',
        className: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    },
    Completed: {
        label: 'Completed',
        className: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    },
    Hold: {
        label: 'Hold',
        className: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    },
    Rejected: {
        label: 'Rejected',
        className: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    },
};
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}
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
export function RefundDetailView({ refund, onBack, onAddNote, onAddFollowUp, onMoveTicket, }) {
    const [activeTab, setActiveTab] = useState('activity');
    const [showMoveDropdown, setShowMoveDropdown] = useState(false);
    const statusConfig = STATUS_LABELS[refund.refundStatus] || {
        label: refund.refundStatus,
        className: '',
    };
    const tabs = [
        { key: 'activity', label: `Activity (${refund.activityLog.length})` },
        { key: 'notes', label: `Notes (${refund.notes.length})` },
    ];
    const moveStages = [
        { key: 'Refund Raised', label: 'Refund Raised' },
        { key: 'Completed', label: 'Completed' },
        { key: 'Hold', label: 'Hold' },
        { key: 'Rejected', label: 'Rejected' },
    ].filter((s) => s.key !== refund.refundStatus);
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onBack, className: "p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white font-mono", children: refund.id }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusConfig.className}`, children: statusConfig.label })] })] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowMoveDropdown(!showMoveDropdown), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(ArrowRightLeft, { className: "h-4 w-4" }), "Move Ticket", _jsx(ChevronDown, { className: "h-4 w-4" })] }), showMoveDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowMoveDropdown(false) }), _jsx("div", { className: "absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: moveStages.map((stage) => (_jsx("button", { onClick: () => {
                                                    onMoveTicket?.(refund.id, stage.key);
                                                    setShowMoveDropdown(false);
                                                }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: stage.label }, stage.key))) })] }))] })] }) }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Refund Amount" }), _jsx("div", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: formatCurrency(refund.refundAmount) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Linked Incident" }), _jsx("div", { className: "text-base font-semibold font-mono text-cyan-600 dark:text-cyan-400", children: refund.linkedIncident }), _jsx("div", { className: "mt-2 pt-2 border-t border-slate-100 dark:border-slate-800", children: _jsxs("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400", children: ["Payment: ", refund.originalPaymentId] }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Customer / Subscriber" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-7 w-7 rounded-full bg-cyan-600 flex items-center justify-center text-xs font-medium text-white", children: refund.customerSubscriber.charAt(0) }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: refund.customerSubscriber })] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Initiated By" }), refund.initiatedBy ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300", children: refund.initiatedBy.charAt(0) }), _jsx("span", { className: "text-sm font-medium text-slate-700 dark:text-slate-300", children: refund.initiatedBy })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })), _jsxs("div", { className: "mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5", children: [_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Created" }), _jsx("span", { className: "text-slate-700 dark:text-slate-300", children: formatDate(refund.createdOn) })] }), _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Last Updated" }), _jsx("span", { className: "text-slate-700 dark:text-slate-300", children: formatDate(refund.lastUpdated) })] }), refund.refundDate && (_jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Refund Date" }), _jsx("span", { className: "text-slate-700 dark:text-slate-300", children: formatDate(refund.refundDate) })] }))] })] })] }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700", children: _jsx("div", { className: "flex overflow-x-auto scrollbar-hide", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.key), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${activeTab === tab.key
                                                    ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: tab.label }, tab.key))) }) }), _jsxs("div", { className: "min-h-[400px]", children: [activeTab === 'activity' && (_jsx(RefundActivityTab, { followUps: refund.followUps, activities: refund.activityLog, onAddFollowUp: (followUp) => onAddFollowUp?.(refund.id, followUp) })), activeTab === 'notes' && (_jsx(RefundNotesTab, { notes: refund.notes, onAddNote: (content) => onAddNote?.(refund.id, content) }))] })] }) })] }) })] }));
}
