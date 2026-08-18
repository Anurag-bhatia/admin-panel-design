import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X, History, ArrowRight, PlusCircle, Pencil } from 'lucide-react';
const FIELD_LABELS = {
    operationsCostPct: 'Operations Cost %',
    marginPct: 'Margin %',
    lawyeredCvPct: 'Lawyered CV %',
    lawyeredNcvPct: 'Lawyered NCV %',
    status: 'Status',
};
function formatDate(iso) {
    const d = new Date(iso);
    const day = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'short' });
    const year = String(d.getFullYear()).slice(-2);
    const hh = d.getHours();
    const mm = String(d.getMinutes()).padStart(2, '0');
    const period = hh >= 12 ? 'PM' : 'AM';
    const hour12 = hh % 12 === 0 ? 12 : hh % 12;
    return `${day} ${month} '${year}, ${hour12}:${mm} ${period}`;
}
function formatValue(field, raw) {
    if (raw === undefined || raw === null || raw === '')
        return '—';
    if (field === 'status') {
        const v = String(raw);
        return v.charAt(0).toUpperCase() + v.slice(1);
    }
    return `${raw}%`;
}
export function ChangeHistoryModal({ state, entries, onClose }) {
    const sorted = [...entries].sort((a, b) => new Date(b.changedAt).getTime() - new Date(a.changedAt).getTime());
    return (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center px-4", children: [_jsx("div", { className: "fixed inset-0 bg-slate-900/40 dark:bg-black/60 backdrop-blur-sm", onClick: onClose }), _jsxs("div", { className: "relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex-shrink-0", children: _jsx(History, { className: "w-[18px] h-[18px] text-slate-600 dark:text-slate-300" }) }), _jsx("div", { children: _jsxs("h2", { className: "text-base font-semibold text-slate-900 dark:text-white", children: ["History - ", state] }) })] }), _jsx("button", { type: "button", onClick: onClose, className: "p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex-shrink-0", children: _jsx(X, { className: "w-4 h-4" }) })] }), _jsx("div", { className: "flex-1 overflow-y-auto", children: sorted.length === 0 ? (_jsx("div", { className: "px-6 py-12 text-center", children: _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No changes recorded yet." }) })) : (_jsx("div", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: sorted.map((entry, idx) => (_jsx(LogRow, { entry: entry, first: idx === 0 }, entry.id))) })) })] })] }));
}
function LogRow({ entry, first }) {
    const isCreate = entry.action === 'created';
    const Icon = isCreate ? PlusCircle : Pencil;
    return (_jsx("div", { className: "px-6 py-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: `flex items-center justify-center w-7 h-7 rounded-full flex-shrink-0 mt-0.5 ${isCreate
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-cyan-50 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400'}`, children: _jsx(Icon, { className: "w-3.5 h-3.5" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-baseline justify-between gap-4 flex-wrap", children: [_jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [_jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: isCreate ? 'Initial creation' : 'Updated' }), first && (_jsx("span", { className: "px-1.5 py-0.5 text-[10px] font-medium rounded-full bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400", children: "Current" }))] }), _jsxs("div", { className: "flex flex-col items-end leading-tight", children: [_jsx("span", { className: "text-[11px] text-slate-500 dark:text-slate-400 tabular-nums", children: formatDate(entry.changedAt) }), _jsxs("span", { className: "text-[11px] text-slate-500 dark:text-slate-400 mt-0.5", children: ["by", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: entry.changedBy })] })] })] }), _jsx("div", { className: "mt-0.5 space-y-0.5", children: entry.fieldsChanged.map((field) => (_jsxs("div", { className: "flex items-center gap-2 flex-wrap text-[12px]", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400 min-w-[130px]", children: FIELD_LABELS[field] ?? field }), _jsxs("span", { className: "inline-flex items-center gap-1.5", children: [_jsx("span", { className: `px-1.5 py-0.5 rounded-md tabular-nums font-mono text-[11px] ${isCreate
                                                    ? 'text-slate-400 dark:text-slate-500 line-through'
                                                    : 'bg-rose-50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-400'}`, children: isCreate ? '—' : formatValue(field, entry.before[field]) }), _jsx(ArrowRight, { className: "w-3 h-3 text-slate-400" }), _jsx("span", { className: "px-1.5 py-0.5 rounded-md tabular-nums font-mono text-[11px] bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400", children: formatValue(field, entry.after[field]) })] })] }, field))) })] })] }) }));
}
