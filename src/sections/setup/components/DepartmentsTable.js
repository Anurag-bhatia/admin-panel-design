import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
export function DepartmentsTable({ departments, searchQuery, statusFilter, onEdit, onToggle, onDelete, }) {
    const filtered = useMemo(() => {
        let result = departments;
        if (statusFilter !== 'all') {
            result = result.filter((d) => d.status === statusFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((d) => d.name.toLowerCase().includes(q));
        }
        return result;
    }, [departments, searchQuery, statusFilter]);
    if (filtered.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx("span", { className: "text-lg text-slate-400", children: "0" }) }), _jsx("p", { className: "font-medium", children: "No departments found" }), _jsx("p", { className: "text-sm mt-1", children: searchQuery ? 'Try adjusting your search query' : 'No departments match the current filter' })] }));
    }
    return (_jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Department" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Head Count" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filtered.map((dept) => (_jsxs("tr", { onClick: () => onEdit(dept.id), className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: dept.name }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm tabular-nums text-slate-600 dark:text-slate-300", children: dept.headCount }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: (e) => {
                                    e.stopPropagation();
                                    onToggle(dept.id, dept.status === 'active' ? 'inactive' : 'active');
                                }, className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${dept.status === 'active'
                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`, children: dept.status === 'active' ? 'Active' : 'Inactive' }) })] }, dept.id))) })] }));
}
