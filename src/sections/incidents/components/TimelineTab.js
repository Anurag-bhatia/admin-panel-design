import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus, UserPlus, Scale, FileText, CheckCircle, ArrowRight, Upload, MessageSquare, Clock, AlertCircle, } from 'lucide-react';
const ACTION_CONFIG = {
    created: {
        icon: Plus,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    agent_assigned: {
        icon: UserPlus,
        color: 'text-blue-600 dark:text-blue-400',
        bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    },
    lawyer_assigned: {
        icon: Scale,
        color: 'text-purple-600 dark:text-purple-400',
        bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    screened: {
        icon: FileText,
        color: 'text-cyan-600 dark:text-cyan-400',
        bgColor: 'bg-cyan-100 dark:bg-cyan-900/30',
    },
    queue_changed: {
        icon: ArrowRight,
        color: 'text-amber-600 dark:text-amber-400',
        bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    },
    follow_up_added: {
        icon: MessageSquare,
        color: 'text-indigo-600 dark:text-indigo-400',
        bgColor: 'bg-indigo-100 dark:bg-indigo-900/30',
    },
    document_uploaded: {
        icon: Upload,
        color: 'text-slate-600 dark:text-slate-400',
        bgColor: 'bg-slate-100 dark:bg-slate-700',
    },
    resolved: {
        icon: CheckCircle,
        color: 'text-emerald-600 dark:text-emerald-400',
        bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
    },
    status_changed: {
        icon: Clock,
        color: 'text-orange-600 dark:text-orange-400',
        bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
    validated: {
        icon: CheckCircle,
        color: 'text-teal-600 dark:text-teal-400',
        bgColor: 'bg-teal-100 dark:bg-teal-900/30',
    },
};
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
export function TimelineTab({ activities }) {
    const sortedActivities = [...activities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    // Group activities by date
    const groupedActivities = sortedActivities.reduce((groups, activity) => {
        const date = formatDate(activity.createdAt);
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(activity);
        return groups;
    }, {});
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Activity Timeline" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Complete audit trail of all actions on this challan" })] }), sortedActivities.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4", children: _jsx(Clock, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No activity yet" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Actions will appear here as they happen" })] })) : (_jsx("div", { className: "space-y-8", children: Object.entries(groupedActivities).map(([date, dateActivities]) => (_jsxs("div", { children: [_jsx("div", { className: "sticky top-0 bg-slate-50 dark:bg-slate-900 py-2 mb-4 z-10", children: _jsx("span", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: date }) }), _jsx("div", { className: "space-y-4", children: dateActivities.map((activity, index) => {
                                const config = ACTION_CONFIG[activity.action] || {
                                    icon: AlertCircle,
                                    color: 'text-slate-600',
                                    bgColor: 'bg-slate-100',
                                };
                                const Icon = config.icon;
                                return (_jsxs("div", { className: "relative pl-10", children: [index < dateActivities.length - 1 && (_jsx("div", { className: "absolute left-[15px] top-8 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" })), _jsx("div", { className: `absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${config.bgColor}`, children: _jsx(Icon, { className: `h-4 w-4 ${config.color}` }) }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: activity.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx("div", { className: "h-4 w-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[9px] font-medium", children: activity.createdByName.charAt(0) }), activity.createdByName] }), _jsx("span", { children: "\u2022" }), _jsx("span", { children: formatTime(activity.createdAt) })] })] }), _jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500 whitespace-nowrap", children: getRelativeTime(activity.createdAt) })] }) })] }, activity.id));
                            }) })] }, date))) }))] }));
}
