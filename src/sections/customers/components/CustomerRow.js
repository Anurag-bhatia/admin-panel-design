import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Car, AlertCircle } from 'lucide-react';
export function CustomerRow({ customer, isSelected, onSelect }) {
    const pendingChallans = customer.totalIncidents || 0;
    const pendingChallanAmount = (customer.totalIncidents || 0) * 1500;
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    return (_jsxs("div", { className: `flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-700 ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/20' : 'bg-white dark:bg-slate-800'}`, children: [_jsx("div", { className: "flex-shrink-0 w-4", children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: e => onSelect(e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer" }) }), _jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: "font-semibold text-slate-900 dark:text-slate-100 truncate text-sm", children: customer.name }) }), _jsx("div", { className: "flex-1 min-w-0 hidden sm:block", children: _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 truncate font-medium", children: customer.customerId }) }), _jsxs("div", { className: "flex-1 hidden md:flex items-center gap-2", children: [_jsx(Car, { className: "w-4 h-4 text-slate-400 dark:text-slate-500" }), _jsx("span", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400", children: customer.totalVehicles })] }), _jsx("div", { className: "flex-1 hidden lg:block", children: _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 truncate", children: customer.mobile }) }), _jsx("div", { className: "flex-1 hidden xl:flex items-center gap-2", children: pendingChallans > 0 ? (_jsxs(_Fragment, { children: [_jsx(AlertCircle, { className: "w-4 h-4 text-amber-500" }), _jsx("span", { className: "text-sm font-semibold text-amber-600 dark:text-amber-400", children: pendingChallans })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "0" })) }), _jsx("div", { className: "flex-1 hidden xl:block", children: pendingChallanAmount > 0 ? (_jsx("span", { className: "text-sm font-semibold text-amber-600 dark:text-amber-400", children: formatCurrency(pendingChallanAmount) })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u20B90" })) })] }));
}
