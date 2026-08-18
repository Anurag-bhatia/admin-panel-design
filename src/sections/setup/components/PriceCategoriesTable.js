import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
export function PriceCategoriesTable({ priceCategories, searchQuery, statusFilter, onEdit, onToggle, onDelete, }) {
    const filtered = useMemo(() => {
        let result = priceCategories;
        if (statusFilter !== 'all') {
            result = result.filter((pc) => pc.status === statusFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((pc) => pc.name.toLowerCase().includes(q) ||
                pc.description.toLowerCase().includes(q));
        }
        return result;
    }, [priceCategories, searchQuery, statusFilter]);
    if (filtered.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx("span", { className: "text-lg text-slate-400", children: "0" }) }), _jsx("p", { className: "font-medium", children: "No price categories found" }), _jsx("p", { className: "text-sm mt-1", children: searchQuery ? 'Try adjusting your search query' : 'No categories match the current filter' })] }));
    }
    return (_jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Name" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Markup" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filtered.map((pc) => (_jsxs("tr", { onClick: () => onEdit(pc.id), className: `hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${pc.isProtected ? 'bg-amber-50/30 dark:bg-amber-900/5' : ''}`, children: [_jsx("td", { className: "px-4 py-3", children: _jsx("div", { className: "flex items-center gap-2", children: _jsxs("div", { children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: pc.name }), pc.isProtected && (_jsx("span", { className: "inline-flex px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", title: "Protected \u2014 core values cannot be modified", children: "Protected" }))] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-xs truncate", children: pc.description })] }) }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `text-sm font-semibold tabular-nums ${pc.increaseBy > 0
                                    ? 'text-slate-900 dark:text-white'
                                    : 'text-slate-400 dark:text-slate-500'}`, children: pc.increaseBy > 0 ? `+${pc.increaseBy}%` : '0%' }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    if (!pc.isProtected) {
                                        onToggle(pc.id, pc.status === 'active' ? 'inactive' : 'active');
                                    }
                                }, disabled: pc.isProtected, className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${pc.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'} ${pc.isProtected ? 'opacity-60 cursor-not-allowed' : ''}`, children: pc.status === 'active' ? 'Active' : 'Inactive' }) })] }, pc.id))) })] }));
}
