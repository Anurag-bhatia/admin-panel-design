import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X, ShieldQuestion } from 'lucide-react';
export function ConfirmationModal({ mode, draft, onConfirm, onCancel, }) {
    const marginPct = draft.operationsCostPct !== null ? 100 - draft.operationsCostPct : null;
    const maxCv = marginPct !== null && draft.lawyeredCvPct !== null
        ? marginPct - draft.lawyeredCvPct
        : null;
    const maxNcv = marginPct !== null && draft.lawyeredNcvPct !== null
        ? marginPct - draft.lawyeredNcvPct
        : null;
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [_jsx("div", { className: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm", onClick: onCancel }), _jsxs("div", { className: "relative w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150", children: [_jsxs("div", { className: "flex items-start justify-between px-6 pt-6 pb-3", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-full bg-cyan-50 dark:bg-cyan-900/30 flex-shrink-0", children: _jsx(ShieldQuestion, { className: "w-[18px] h-[18px] text-cyan-700 dark:text-cyan-400" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-base font-semibold text-slate-900 dark:text-white leading-snug", children: mode === 'add'
                                                    ? 'Add this reward configuration?'
                                                    : 'Update this reward configuration?' }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "Review the values below. This action will be recorded in the change history." })] })] }), _jsx("button", { type: "button", onClick: onCancel, className: "p-1.5 -mt-1 -mr-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "mx-6 mb-5 mt-2 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2.5", children: [_jsx(SummaryRow, { label: "State", value: draft.state ?? '—', strong: true }), _jsx(SummaryRow, { label: "Region", value: draft.region, muted: true }), _jsx("div", { className: "h-px bg-slate-200 dark:bg-slate-700/60 my-2" }), _jsx(SummaryRow, { label: "Operations Cost %", value: draft.operationsCostPct !== null ? `${draft.operationsCostPct}%` : '—' }), _jsx(SummaryRow, { label: "Margin %", value: marginPct !== null ? `${marginPct}%` : '—', muted: true }), _jsx("div", { className: "h-px bg-slate-200 dark:bg-slate-700/60 my-2" }), _jsx(SummaryRow, { label: "Max CV Reward %", value: maxCv !== null ? `${maxCv}%` : '—', highlight: true }), _jsx(SummaryRow, { label: "Max NCV Reward %", value: maxNcv !== null ? `${maxNcv}%` : '—', highlight: true })] }), _jsxs("div", { className: "flex items-center justify-end gap-2 px-6 pb-5", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "No" }), _jsx("button", { type: "button", onClick: onConfirm, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors shadow-sm", children: mode === 'add' ? 'Yes, Add Configuration' : 'Yes, Update Configuration' })] })] })] }));
}
function SummaryRow({ label, value, muted, strong, highlight, }) {
    return (_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400 text-[12px]", children: label }), _jsx("span", { className: `tabular-nums ${highlight
                    ? 'font-semibold text-cyan-700 dark:text-cyan-300'
                    : strong
                        ? 'font-semibold text-slate-900 dark:text-white'
                        : muted
                            ? 'text-slate-500 dark:text-slate-400'
                            : 'font-medium text-slate-800 dark:text-slate-100'}`, children: value })] }));
}
