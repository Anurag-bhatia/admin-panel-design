import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Plus } from 'lucide-react';
export function PartnersListHeader({ onCreatePartner }) {
    return (_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Partners" }) }), _jsxs("button", { onClick: onCreatePartner, className: "flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { children: "Add Partner" })] })] }));
}
