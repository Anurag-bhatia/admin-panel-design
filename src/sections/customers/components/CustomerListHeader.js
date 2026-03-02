import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function CustomerListHeader({ onAddCustomer }) {
    return (_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Registered Visitors" }) }), _jsx("div", { className: "flex gap-3", children: _jsx("button", { onClick: onAddCustomer, className: "px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors", children: "+ Add Visitor" }) })] }));
}
