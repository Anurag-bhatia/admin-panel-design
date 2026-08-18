import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { Plus, ChevronDown, Download } from 'lucide-react';
export function PartnersListHeader({ onCreateChallanPay, onCreateLots247, onExport }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showDropdown]);
    return (_jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Partners" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: onExport, className: "flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-xs sm:text-sm font-medium transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), _jsx("span", { children: "Export" })] }), _jsxs("div", { className: "relative", ref: dropdownRef, children: [_jsxs("button", { onClick: () => setShowDropdown(!showDropdown), className: "flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors shadow-sm", children: [_jsx(Plus, { className: "w-4 h-4 sm:w-5 sm:h-5" }), _jsx("span", { children: "Add Partner" }), _jsx(ChevronDown, { className: `w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}` })] }), showDropdown && (_jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20 py-1", children: [_jsx("button", { onClick: () => { onCreateChallanPay?.(); setShowDropdown(false); }, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "ChallanPay" }), _jsx("button", { onClick: () => { onCreateLots247?.(); setShowDropdown(false); }, className: "w-full px-4 py-2.5 text-left text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "LOTS247" })] }))] })] })] }));
}
