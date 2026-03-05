import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const QUEUE_CONFIG = [
    { key: 'newIncidents', label: 'New Incidents', color: 'cyan' },
    { key: 'screening', label: 'Screening', color: 'amber' },
    { key: 'agentAssigned', label: 'Agent Assigned', color: 'orange' },
    { key: 'lawyerAssigned', label: 'Lawyer Assigned', color: 'blue' },
    { key: 'settled', label: 'Settled', color: 'emerald' },
    { key: 'notSettled', label: 'Not Settled', color: 'red' },
    { key: 'hold', label: 'Hold', color: 'slate' },
    { key: 'refund', label: 'Refund', color: 'purple' },
];
export function QueueTabs({ activeQueue, queueCounts, view = 'all', onQueueChange, }) {
    // Filter out newIncidents and screening for "My Incidents" view
    const displayedQueues = view === 'my'
        ? QUEUE_CONFIG.filter((q) => q.key !== 'newIncidents' && q.key !== 'screening')
        : QUEUE_CONFIG;
    return (_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: _jsx("div", { className: "flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide", children: displayedQueues.map((queue, index) => {
                const isActive = activeQueue === queue.key;
                const count = queueCounts[queue.key];
                return (_jsxs("button", { onClick: () => onQueueChange?.(queue.key), className: `relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${isActive
                        ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                        : 'border-transparent text-slate-900 dark:text-slate-300 hover:text-slate-700 dark:hover:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [index > 0 && (_jsx("span", { className: "absolute -left-2 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600 text-xs", children: "\u2192" })), _jsx("span", { children: queue.key === 'agentAssigned' && view === 'my'
                                ? 'Assigned to me'
                                : queue.label }), _jsx("span", { className: `inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${isActive
                                ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: count })] }, queue.key));
            }) }) }));
}
