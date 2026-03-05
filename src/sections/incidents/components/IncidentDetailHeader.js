import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowLeft, Clock, CheckCircle, UserPlus, Scale, MoreHorizontal, Search, } from 'lucide-react';
const TYPE_LABELS = {
    payAndClose: 'PPT',
    contest: 'Bulk',
};
const CHALLAN_TYPE_LABELS = {
    court: 'Court',
    online: 'Online',
};
const STATUS_CONFIG = {
    pending_screening: {
        label: 'Pending Screening',
        color: 'text-amber-700 dark:text-amber-400',
        bgColor: 'bg-amber-50 dark:bg-amber-900/20',
    },
    screening_in_progress: {
        label: 'Screening',
        color: 'text-blue-700 dark:text-blue-400',
        bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    lawyer_working: {
        label: 'Lawyer Working',
        color: 'text-cyan-700 dark:text-cyan-400',
        bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    },
    court_hearing_scheduled: {
        label: 'Court Scheduled',
        color: 'text-purple-700 dark:text-purple-400',
        bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    resolved: {
        label: 'Resolved',
        color: 'text-emerald-700 dark:text-emerald-400',
        bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
    },
    unresolved: {
        label: 'Unresolved',
        color: 'text-red-700 dark:text-red-400',
        bgColor: 'bg-red-50 dark:bg-red-900/20',
    },
    refund_initiated: {
        label: 'Refund Initiated',
        color: 'text-violet-700 dark:text-violet-400',
        bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    },
};
function getTatInfo(deadline) {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - now.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // Assuming 45-day TAT
    const totalDays = 45;
    const daysUsed = totalDays - daysLeft;
    const percentage = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));
    if (daysLeft <= 0)
        return { daysLeft, percentage: 100, status: 'critical' };
    if (daysLeft <= 7)
        return { daysLeft, percentage, status: 'warning' };
    return { daysLeft, percentage, status: 'ok' };
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
export function IncidentDetailHeader({ incident, subscriber, assignedAgent, assignedLawyer, onBack, onValidate, onScreen, onAssignAgent, onAssignLawyer, onMoveQueue, }) {
    const statusConfig = STATUS_CONFIG[incident.status] || {
        label: incident.status,
        color: 'text-slate-700',
        bgColor: 'bg-slate-50',
    };
    const tatInfo = getTatInfo(incident.tatDeadline);
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onBack, className: "p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white font-mono", children: incident.incidentId })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: onValidate, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), "Validate"] }), _jsxs("button", { onClick: onScreen, className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(Search, { className: "h-4 w-4" }), "Screen"] }), _jsx("button", { className: "p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(MoreHorizontal, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) })] })] }), _jsx("div", { className: "px-6 py-4", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "TAT Deadline" }), _jsx(Clock, { className: `h-4 w-4 ${tatInfo.status === 'critical'
                                                ? 'text-red-500'
                                                : tatInfo.status === 'warning'
                                                    ? 'text-amber-500'
                                                    : 'text-emerald-500'}` })] }), _jsx("div", { className: `text-2xl font-bold ${tatInfo.status === 'critical'
                                        ? 'text-red-600 dark:text-red-400'
                                        : tatInfo.status === 'warning'
                                            ? 'text-amber-600 dark:text-amber-400'
                                            : 'text-slate-900 dark:text-white'}`, children: tatInfo.daysLeft <= 0 ? 'Overdue' : `${Math.abs(tatInfo.daysLeft)} days left` }), _jsx("div", { className: "mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full rounded-full transition-all ${tatInfo.status === 'critical'
                                            ? 'bg-red-500'
                                            : tatInfo.status === 'warning'
                                                ? 'bg-amber-500'
                                                : 'bg-emerald-500'}`, style: { width: `${tatInfo.percentage}%` } }) })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Subscriber" }), _jsx("div", { className: "text-base font-semibold text-slate-900 dark:text-white", children: subscriber.name }), _jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: [subscriber.contactPerson, " \u2022 ", subscriber.phone] })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Vehicle & Type" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-base font-mono font-semibold text-slate-900 dark:text-white", children: incident.vehicle }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.type === 'contest'
                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`, children: TYPE_LABELS[incident.type] }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.challanType === 'court'
                                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                                : incident.challanType === 'online'
                                                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                                                    : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'}`, children: CHALLAN_TYPE_LABELS[incident.challanType] })] }), _jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: ["#", incident.challanNumber] })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Assignments" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-300", children: assignedAgent?.name || 'No agent' })] }) }), _jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Scale, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-300", children: assignedLawyer?.name.replace('Adv. ', '') || 'No lawyer' })] }) })] })] })] }) })] }));
}
