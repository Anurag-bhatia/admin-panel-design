import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp } from 'lucide-react';
function formatPct(value) {
    if (value === null || Number.isNaN(value))
        return '—';
    return `${value}%`;
}
export function MaxRewardPreview({ marginPct, lawyeredCvPct, lawyeredNcvPct, }) {
    const maxCv = marginPct !== null && lawyeredCvPct !== null
        ? Math.max(0, marginPct - lawyeredCvPct)
        : null;
    const maxNcv = marginPct !== null && lawyeredNcvPct !== null
        ? Math.max(0, marginPct - lawyeredNcvPct)
        : null;
    return (_jsxs("div", { className: "rounded-xl border border-cyan-100 dark:border-cyan-900/40 bg-gradient-to-br from-cyan-50/70 to-white dark:from-cyan-950/20 dark:to-slate-900 p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx("div", { className: "flex items-center justify-center w-6 h-6 rounded-md bg-cyan-100 dark:bg-cyan-900/40", children: _jsx(TrendingUp, { className: "w-3.5 h-3.5 text-cyan-700 dark:text-cyan-400" }) }), _jsx("p", { className: "text-sm font-semibold text-slate-700 dark:text-slate-200", children: "Max Reward Preview" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: [_jsx(PreviewCell, { label: "Max CV Reward %", value: formatPct(maxCv), accent: "primary" }), _jsx(PreviewCell, { label: "Max NCV Reward %", value: formatPct(maxNcv), accent: "primary" })] })] }));
}
function PreviewCell({ label, value, accent, }) {
    return (_jsxs("div", { className: `rounded-lg p-3 ${accent === 'primary'
            ? 'bg-white dark:bg-slate-900/60 border border-cyan-100 dark:border-cyan-900/40'
            : 'bg-transparent'}`, children: [_jsx("p", { className: "text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: label }), value && (_jsx("p", { className: `text-2xl font-semibold mt-1 ${accent === 'primary'
                    ? 'text-cyan-700 dark:text-cyan-300'
                    : 'text-slate-700 dark:text-slate-300'}`, children: value }))] }));
}
