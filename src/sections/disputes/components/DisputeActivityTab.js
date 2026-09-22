import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Clock } from 'lucide-react';
const ACTION_CHIP_CLASSES = {
    created: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    assigned: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    reviewer: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400',
    escalated: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    priority: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
    resolved: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    settled: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
    rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
    status: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400',
    evidence: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300',
    investigation: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    note: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    follow: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400',
    merged: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400',
    transferred: 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400',
    moved: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
};
function getChipClass(action) {
    const lower = action.toLowerCase();
    for (const key of Object.keys(ACTION_CHIP_CLASSES)) {
        if (lower.includes(key))
            return ACTION_CHIP_CLASSES[key];
    }
    return 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300';
}
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
export function DisputeActivityTab({ activities }) {
    const sortedActivities = [...activities].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return (_jsxs("div", { className: "p-6", children: [_jsx("div", { className: "mb-6", children: _jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: ["Activity Log (", activities.length, ")"] }) }), sortedActivities.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4", children: _jsx(Clock, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No activity yet" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Actions will appear here as they happen" })] })) : (_jsx("div", { className: "space-y-4", children: sortedActivities.map((act, index) => (_jsxs("div", { className: "relative pl-8 pb-6 last:pb-0", children: [index < sortedActivities.length - 1 && (_jsx("div", { className: "absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" })), _jsx("div", { className: "absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center", children: _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-500" }) }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4 mb-2", children: [_jsx("div", { className: "flex items-center gap-2 flex-wrap", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getChipClass(act.action)}`, children: act.action }) }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap", children: [formatDate(act.timestamp), " at ", formatTime(act.timestamp)] })] }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: act.details })] })] }, act.id))) }))] }));
}
