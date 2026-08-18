import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
export function DesignationsTable({ designations, departments, searchQuery, statusFilter, onEdit, onToggle, onDelete, }) {
    const [deptFilter, setDeptFilter] = useState('all');
    const filtered = useMemo(() => {
        let result = designations;
        if (statusFilter !== 'all') {
            result = result.filter((d) => d.status === statusFilter);
        }
        if (deptFilter !== 'all') {
            result = result.filter((d) => d.departmentId === deptFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((d) => d.title.toLowerCase().includes(q) ||
                d.departmentName.toLowerCase().includes(q));
        }
        return result;
    }, [designations, searchQuery, statusFilter, deptFilter]);
    if (filtered.length === 0 && designations.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx("span", { className: "text-lg text-slate-400", children: "0" }) }), _jsx("p", { className: "font-medium", children: "No designations found" }), _jsx("p", { className: "text-sm mt-1", children: "Add your first designation to get started" })] }));
    }
    return (_jsxs("div", { children: [_jsxs("div", { className: "px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2 overflow-x-auto", children: [_jsx("button", { onClick: () => setDeptFilter('all'), className: `shrink-0 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${deptFilter === 'all'
                            ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: "All Departments" }), departments
                        .filter((d) => d.status === 'active')
                        .map((dept) => (_jsx("button", { onClick: () => setDeptFilter(dept.id), className: `shrink-0 px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${deptFilter === dept.id
                            ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: dept.name }, dept.id)))] }), filtered.length === 0 ? (_jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-slate-500 dark:text-slate-400", children: [_jsx("p", { className: "font-medium", children: "No designations found" }), _jsx("p", { className: "text-sm mt-1", children: "Try adjusting your filters" })] })) : (_jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Designation" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Department" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: filtered.map((desg) => (_jsxs("tr", { onClick: () => onEdit(desg.id), className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: desg.title }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400", children: desg.departmentName }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: (e) => {
                                            e.stopPropagation();
                                            onToggle(desg.id, desg.status === 'active' ? 'inactive' : 'active');
                                        }, className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${desg.status === 'active'
                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`, children: desg.status === 'active' ? 'Active' : 'Inactive' }) })] }, desg.id))) })] }))] }));
}
