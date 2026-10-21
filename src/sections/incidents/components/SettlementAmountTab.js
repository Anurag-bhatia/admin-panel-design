import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IndianRupee } from 'lucide-react';
function formatINR(value) {
    return `₹${value.toLocaleString('en-IN')}`;
}
export function SettlementAmountTab({ amount }) {
    const challanAmount = amount;
    const governmentFee = Math.round(amount * 0.1);
    const professionalFees = 500;
    const miscFees = 150;
    const total = challanAmount + governmentFee + professionalFees + miscFees;
    const rows = [
        { label: 'Challan Amount', value: challanAmount, hint: 'Fine amount as per challan' },
        { label: 'Government Fee', value: governmentFee, hint: 'Court / statutory charges' },
        { label: 'Professional Fees', value: professionalFees, hint: 'Lawyer / agent fee' },
        { label: 'Misc Fees', value: miscFees, hint: 'Other charges' },
    ];
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Settlement Amount" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Breakdown of the settlement charges for this incident" })] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsx("div", { className: "divide-y divide-slate-200 dark:divide-slate-700", children: rows.map((row) => (_jsxs("div", { className: "flex items-center justify-between px-5 py-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: row.label }), row.hint && (_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: row.hint }))] }), _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white tabular-nums", children: formatINR(row.value) })] }, row.label))) }), _jsxs("div", { className: "flex items-center justify-between px-5 py-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(IndianRupee, { className: "h-4 w-4 text-cyan-600 dark:text-cyan-400" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Total Settlement" })] }), _jsx("span", { className: "text-base font-bold text-cyan-700 dark:text-cyan-300 tabular-nums", children: formatINR(total) })] })] })] }));
}
