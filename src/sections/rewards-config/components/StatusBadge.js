import { jsx as _jsx } from "react/jsx-runtime";
export function StatusBadge({ status }) {
    const isActive = status === 'active';
    return (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full border ${isActive
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50'
            : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700'}`, children: isActive ? 'Active' : 'Inactive' }));
}
export function ApprovalBadge({ status }) {
    const approved = status === 'approved';
    return (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 text-[11px] font-medium rounded-full ${approved
            ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900/20 dark:text-cyan-400'
            : 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400'}`, children: approved ? 'Approved' : 'Pending' }));
}
