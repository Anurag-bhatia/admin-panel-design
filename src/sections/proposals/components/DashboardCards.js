import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Inbox, Search, Clock, Activity, CheckCircle2, IndianRupee } from 'lucide-react';
const CARDS = [
    { key: 'newRequests', label: 'New Requests', icon: Inbox, accent: 'cyan' },
    { key: 'inReview', label: 'In Review', icon: Search, accent: 'amber' },
    { key: 'awaitingResponse', label: 'Awaiting Response', icon: Clock, accent: 'blue' },
    { key: 'activeWork', label: 'Active Work', icon: Activity, accent: 'emerald' },
    { key: 'completedThisMonth', label: 'Completed This Month', icon: CheckCircle2, accent: 'green' },
    { key: 'totalValue', label: 'Total Value', icon: IndianRupee, accent: 'violet' },
];
const ACCENT_STYLES = {
    cyan: {
        bg: 'bg-cyan-50 dark:bg-cyan-950/40',
        icon: 'text-cyan-600 dark:text-cyan-400',
        text: 'text-cyan-700 dark:text-cyan-300',
    },
    amber: {
        bg: 'bg-amber-50 dark:bg-amber-950/40',
        icon: 'text-amber-600 dark:text-amber-400',
        text: 'text-amber-700 dark:text-amber-300',
    },
    blue: {
        bg: 'bg-blue-50 dark:bg-blue-950/40',
        icon: 'text-blue-600 dark:text-blue-400',
        text: 'text-blue-700 dark:text-blue-300',
    },
    emerald: {
        bg: 'bg-emerald-50 dark:bg-emerald-950/40',
        icon: 'text-emerald-600 dark:text-emerald-400',
        text: 'text-emerald-700 dark:text-emerald-300',
    },
    green: {
        bg: 'bg-green-50 dark:bg-green-950/40',
        icon: 'text-green-600 dark:text-green-400',
        text: 'text-green-700 dark:text-green-300',
    },
    violet: {
        bg: 'bg-violet-50 dark:bg-violet-950/40',
        icon: 'text-violet-600 dark:text-violet-400',
        text: 'text-violet-700 dark:text-violet-300',
    },
};
function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}
export function DashboardCards({ stats }) {
    return (_jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 px-4 sm:px-6 py-4", children: CARDS.map(({ key, label, icon: Icon, accent }) => {
            const styles = ACCENT_STYLES[accent];
            const value = stats[key];
            const displayValue = key === 'totalValue' ? formatINR(value) : value;
            return (_jsxs("div", { className: `${styles.bg} rounded-xl px-4 py-3.5 border border-transparent transition-colors`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(Icon, { className: `h-4 w-4 ${styles.icon}` }), _jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 truncate", children: label })] }), _jsx("p", { className: `text-xl font-bold tracking-tight ${styles.text}`, children: displayValue })] }, key));
        }) }));
}
