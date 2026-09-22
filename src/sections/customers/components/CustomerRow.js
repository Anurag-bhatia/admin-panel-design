import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Car, CheckCircle2 } from 'lucide-react';
export function CustomerRow({ customer, onClick }) {
    // Mock data for paid challans - in real app, this would come from the customer object
    const paidChallans = customer.totalIncidents || 0;
    const paidChallanAmount = (customer.totalIncidents || 0) * 1500; // Mock calculation
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };
    return (_jsxs("div", { onClick: onClick, className: "flex items-center gap-3 px-4 py-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors", children: [_jsx("div", { className: "flex-1 min-w-0", children: _jsx("p", { className: "font-semibold text-slate-900 dark:text-slate-100 truncate text-sm", children: customer.name }) }), _jsx("div", { className: "flex-1 min-w-0 hidden sm:block", children: _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 truncate font-medium", children: customer.customerId }) }), _jsxs("div", { className: "flex-1 hidden md:flex items-center gap-2", children: [_jsx(Car, { className: "w-4 h-4 text-slate-400 dark:text-slate-500" }), _jsx("span", { className: "text-sm font-semibold text-slate-600 dark:text-slate-400", children: customer.totalVehicles })] }), _jsx("div", { className: "flex-1 hidden lg:block", children: _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 truncate", children: customer.mobile }) }), _jsx("div", { className: "flex-1 hidden xl:flex items-center gap-2", children: paidChallans > 0 ? (_jsxs(_Fragment, { children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-500" }), _jsx("span", { className: "text-sm font-semibold text-emerald-600 dark:text-emerald-400", children: paidChallans })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "0" })) }), _jsx("div", { className: "flex-1 hidden xl:block", children: paidChallanAmount > 0 ? (_jsx("span", { className: "text-sm font-semibold text-emerald-600 dark:text-emerald-400", children: formatCurrency(paidChallanAmount) })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u20B90" })) })] }));
}
