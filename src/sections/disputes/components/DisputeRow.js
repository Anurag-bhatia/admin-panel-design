import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreHorizontal, UserPlus, AlertTriangle, ChevronDown, } from 'lucide-react';
const TYPE_LABELS = {
    refund: {
        label: 'Refund',
        className: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    },
    service: {
        label: 'Service',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    payment: {
        label: 'Payment',
        className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    },
    legal_escalation: {
        label: 'Legal',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
};
const PRIORITY_LABELS = {
    critical: {
        label: 'Critical',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
    high: {
        label: 'High',
        className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    },
    medium: {
        label: 'Medium',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    low: {
        label: 'Low',
        className: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    },
};
const RAISED_BY_LABELS = {
    customer: 'Customer',
    subscriber: 'Subscriber',
    internal: 'Internal',
};
const PRIORITY_OPTIONS = [
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
];
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function DisputeRow({ dispute, isSelected, reviewers, onSelect, onView, onAssignReviewer, onEscalate, onChangePriority, }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showReviewerDropdown, setShowReviewerDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const typeConfig = TYPE_LABELS[dispute.disputeType] || { label: dispute.disputeType, className: '' };
    const priorityConfig = PRIORITY_LABELS[dispute.priority] || { label: dispute.priority, className: '' };
    // Check if SLA is overdue
    const isOverdue = new Date(dispute.slaDeadline) < new Date();
    return (_jsxs("tr", { className: `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''}`, onClick: onView, children: [_jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: (e) => onSelect(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800" }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("span", { className: `font-mono text-sm font-medium ${isOverdue
                                ? 'text-red-600 dark:text-red-400'
                                : 'text-slate-900 dark:text-white'}`, children: dispute.disputeId }), isOverdue && (_jsxs("div", { className: "flex items-center gap-1 mt-0.5", children: [_jsx(AlertTriangle, { className: "h-3 w-3 text-red-500" }), _jsx("span", { className: "text-xs text-red-500 font-medium", children: "SLA Overdue" })] }))] }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: dispute.subscriberName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: dispute.linkedEntity.id })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${typeConfig.className}`, children: typeConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: RAISED_BY_LABELS[dispute.raisedBy] || dispute.raisedBy }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${priorityConfig.className}`, children: priorityConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(dispute.createdOn) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(dispute.createdOn) })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(dispute.lastUpdated) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(dispute.lastUpdated) })] }) }), _jsx("td", { className: "px-4 py-3", children: dispute.assignedTo ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300", children: dispute.assignedTo.charAt(0) }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: dispute.assignedTo.split(' ')[0] })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400 truncate max-w-[120px] block", children: dispute.source }) }), _jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-slate-500" }) }), showMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => {
                                        setShowMenu(false);
                                        setShowReviewerDropdown(false);
                                        setShowPriorityDropdown(false);
                                    } }), _jsxs("div", { className: "absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                        setShowReviewerDropdown(!showReviewerDropdown);
                                                        setShowPriorityDropdown(false);
                                                    }, className: "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4" }), "Assign Reviewer"] }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showReviewerDropdown && (_jsx("div", { className: "absolute right-full top-0 mr-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto", children: reviewers.map((reviewer) => (_jsxs("button", { onClick: () => {
                                                            onAssignReviewer?.(reviewer.id);
                                                            setShowMenu(false);
                                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("div", { className: "h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs", children: reviewer.name.charAt(0) }), reviewer.name] }, reviewer.id))) }))] }), _jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 my-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                        setShowPriorityDropdown(!showPriorityDropdown);
                                                        setShowReviewerDropdown(false);
                                                    }, className: "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Change Priority"] }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showPriorityDropdown && (_jsx("div", { className: "absolute right-full top-0 mr-1 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: PRIORITY_OPTIONS.filter((p) => p.key !== dispute.priority).map((priority) => (_jsx("button", { onClick: () => {
                                                            onChangePriority?.(priority.key);
                                                            setShowMenu(false);
                                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: priority.label }, priority.key))) }))] })] })] }))] }) })] }));
}
