import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ArrowRight, AlertTriangle } from 'lucide-react';
export function StepIndicator({ step, status, children, isLast = false }) {
    return (_jsxs("div", { className: "relative", children: [!isLast && (_jsx("div", { className: "absolute left-[10px] top-[28px] w-[2px] h-[calc(100%+16px)] bg-stone-200 dark:bg-stone-700", "aria-hidden": "true" })), _jsx("div", { className: "absolute -left-[2px] top-0 z-10", children: _jsx(StepBadge, { step: step, status: status }) }), _jsx("div", { className: "pl-10", children: children })] }));
}
function StepBadge({ step, status }) {
    const baseClasses = "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200";
    if (status === 'completed') {
        return (_jsx("div", { className: `${baseClasses} bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400`, children: _jsx(Check, { className: "w-3 h-3", strokeWidth: 2.5 }) }));
    }
    if (status === 'current') {
        return (_jsx("div", { className: `${baseClasses} bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 shadow-sm`, children: _jsx(ArrowRight, { className: "w-3 h-3", strokeWidth: 2.5 }) }));
    }
    if (status === 'skipped') {
        return (_jsx("div", { className: `${baseClasses} bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400`, children: _jsx(AlertTriangle, { className: "w-3 h-3", strokeWidth: 2.5 }) }));
    }
    // upcoming
    return (_jsx("div", { className: `${baseClasses} bg-stone-200 dark:bg-stone-700 text-stone-500 dark:text-stone-400`, children: step }));
}
