import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Info } from 'lucide-react';
export function InfoTooltip({ label }) {
    const [open, setOpen] = useState(false);
    return (_jsxs("span", { className: "relative inline-flex", onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), onFocus: () => setOpen(true), onBlur: () => setOpen(false), children: [_jsx(Info, { className: "w-3.5 h-3.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 cursor-help", tabIndex: 0 }), open && (_jsxs("span", { className: "absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 z-10 px-2 py-1 text-[11px] font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-md whitespace-nowrap shadow-lg", children: [label, _jsx("span", { className: "absolute left-1/2 -translate-x-1/2 top-full w-1.5 h-1.5 bg-slate-900 dark:bg-slate-700 rotate-45 -mt-0.5" })] }))] }));
}
