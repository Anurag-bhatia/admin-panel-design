import { jsx as _jsx } from "react/jsx-runtime";
export function StatusToggle({ value, onChange }) {
    const options = ['active', 'inactive'];
    return (_jsx("div", { className: "inline-flex items-center p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700", children: options.map((opt) => {
            const selected = value === opt;
            return (_jsx("button", { type: "button", onClick: () => onChange(opt), className: `px-4 py-1.5 text-sm font-medium rounded-md transition-all ${selected
                    ? opt === 'active'
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'}`, children: opt === 'active' ? 'Active' : 'Inactive' }, opt));
        }) }));
}
