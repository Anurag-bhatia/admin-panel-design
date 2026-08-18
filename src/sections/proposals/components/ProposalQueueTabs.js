import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TABS = [
    { key: 'sent', label: 'Inbox' },
    { key: 'under_review', label: 'In Review' },
    { key: 'received', label: 'Quote Sent' },
    { key: 'converted', label: 'Converted' },
    { key: 'rejected', label: 'Rejected' },
];
export function ProposalQueueTabs({ activeTab, counts, onTabChange }) {
    return (_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: _jsx("div", { className: "flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide", children: TABS.map((tab, index) => {
                const isActive = activeTab === tab.key;
                const count = counts[tab.key] ?? 0;
                return (_jsxs("button", { onClick: () => onTabChange?.(tab.key), className: `relative flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${isActive
                        ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                        : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [index > 0 && (_jsx("span", { className: "absolute -left-1.5 text-slate-300 dark:text-slate-600 text-xs pointer-events-none", children: "\u203A" })), _jsx("span", { children: tab.label }), _jsx("span", { className: `inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-semibold ${isActive
                                ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`, children: count })] }, tab.key));
            }) }) }));
}
