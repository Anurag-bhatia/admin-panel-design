import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, UserPlus, ArrowUpRight, AlertTriangle, CheckCircle, XCircle, Clock, FileText, Upload, } from 'lucide-react';
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
function getRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1)
        return 'Just now';
    if (diffMins < 60)
        return `${diffMins}m ago`;
    if (diffHours < 24)
        return `${diffHours}h ago`;
    if (diffDays < 7)
        return `${diffDays}d ago`;
    return formatDate(dateString);
}
function getActionConfig(action) {
    const lower = action.toLowerCase();
    if (lower.includes('created')) {
        return { icon: Plus, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' };
    }
    if (lower.includes('assigned') || lower.includes('reviewer')) {
        return { icon: UserPlus, color: 'text-blue-600 dark:text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' };
    }
    if (lower.includes('escalated')) {
        return { icon: ArrowUpRight, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' };
    }
    if (lower.includes('priority')) {
        return { icon: AlertTriangle, color: 'text-amber-600 dark:text-amber-400', bgColor: 'bg-amber-100 dark:bg-amber-900/30' };
    }
    if (lower.includes('resolved') || lower.includes('approved') || lower.includes('refund approved')) {
        return { icon: CheckCircle, color: 'text-emerald-600 dark:text-emerald-400', bgColor: 'bg-emerald-100 dark:bg-emerald-900/30' };
    }
    if (lower.includes('rejected')) {
        return { icon: XCircle, color: 'text-red-600 dark:text-red-400', bgColor: 'bg-red-100 dark:bg-red-900/30' };
    }
    if (lower.includes('status')) {
        return { icon: Clock, color: 'text-orange-600 dark:text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' };
    }
    if (lower.includes('evidence') || lower.includes('upload')) {
        return { icon: Upload, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-700' };
    }
    if (lower.includes('note') || lower.includes('investigation')) {
        return { icon: FileText, color: 'text-indigo-600 dark:text-indigo-400', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' };
    }
    return { icon: Clock, color: 'text-slate-600 dark:text-slate-400', bgColor: 'bg-slate-100 dark:bg-slate-700' };
}
export function DisputeActivityTab({ activities }) {
    const sortedActivities = [...activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    const groupedActivities = sortedActivities.reduce((groups, activity) => {
        const date = formatDate(activity.timestamp);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {});
    if (sortedActivities.length === 0) {
        return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4", children: _jsx(Clock, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No activity yet" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Actions and status changes will appear here as they happen" })] }) }));
    }
    return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-6", children: "Activity Log" }), _jsx("div", { className: "space-y-8", children: Object.entries(groupedActivities).map(([date, dateActivities]) => (_jsxs("div", { children: [_jsx("div", { className: "sticky top-0 bg-white dark:bg-slate-900 py-2 mb-4 z-10", children: _jsx("span", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: date }) }), _jsx("div", { className: "space-y-4", children: dateActivities.map((activity, index) => {
                                    const config = getActionConfig(activity.action);
                                    const Icon = config.icon;
                                    return (_jsxs("div", { className: "relative pl-10", children: [index < dateActivities.length - 1 && (_jsx("div", { className: "absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" })), _jsx("div", { className: `absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`, children: _jsx(Icon, { className: `h-4 w-4 ${config.color}` }) }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: activity.action }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 mt-1", children: activity.details }), _jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("div", { className: "h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium", children: activity.performedBy.charAt(0) }), activity.performedBy] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTime(activity.timestamp) })] })] }), _jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap", children: getRelativeTime(activity.timestamp) })] }) })] }, activity.id));
                                }) })] }, date))) })] }) }));
}
