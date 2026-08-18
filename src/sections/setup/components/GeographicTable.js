import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
const LEVEL_STYLES = {
    country: {
        label: 'Country',
        classes: 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
    },
    state: {
        label: 'State',
        classes: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
    },
    city: {
        label: 'City',
        classes: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
    },
};
function buildTree(values) {
    const map = new Map();
    const roots = [];
    values.forEach((v) => map.set(v.id, { ...v, children: [] }));
    values.forEach((v) => {
        const node = map.get(v.id);
        if (v.parentId && map.has(v.parentId)) {
            map.get(v.parentId).children.push(node);
        }
        else {
            roots.push(node);
        }
    });
    return roots;
}
function GeoRow({ node, depth, expandedIds, onToggleExpand, onEdit, onToggle, }) {
    const hasChildren = node.children.length > 0;
    const isExpanded = expandedIds.has(node.id);
    const level = LEVEL_STYLES[node.level];
    return (_jsxs(_Fragment, { children: [_jsxs("tr", { onClick: () => onEdit(node.id), className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsxs("div", { className: "flex items-center gap-2", style: { paddingLeft: `${depth * 24}px` }, children: [hasChildren ? (_jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        onToggleExpand(node.id);
                                    }, className: "p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700", children: isExpanded ? (_jsx(ChevronDown, { className: "w-3.5 h-3.5" })) : (_jsx(ChevronRight, { className: "w-3.5 h-3.5" })) })) : (_jsx("span", { className: "w-[22px]" })), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: node.name })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-mono text-slate-500 dark:text-slate-400", children: node.code }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${level.classes}`, children: level.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: (e) => {
                                e.stopPropagation();
                                onToggle(node.id, node.status === 'active' ? 'inactive' : 'active');
                            }, className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${node.status === 'active'
                                ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`, children: node.status === 'active' ? 'Active' : 'Inactive' }) })] }), isExpanded &&
                node.children.map((child) => (_jsx(GeoRow, { node: child, depth: depth + 1, expandedIds: expandedIds, onToggleExpand: onToggleExpand, onEdit: onEdit, onToggle: onToggle }, child.id)))] }));
}
export function GeographicTable({ geographicValues, searchQuery, statusFilter, onEdit, onToggle, onDelete, }) {
    const [expandedIds, setExpandedIds] = useState(new Set(['geo-001']));
    const [levelFilter, setLevelFilter] = useState('all');
    const displayValues = useMemo(() => {
        let result = geographicValues;
        if (statusFilter !== 'all') {
            result = result.filter((g) => g.status === statusFilter);
        }
        if (levelFilter !== 'all') {
            result = result.filter((g) => g.level === levelFilter);
        }
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase();
            result = result.filter((g) => g.name.toLowerCase().includes(q) ||
                g.code.toLowerCase().includes(q));
        }
        return result;
    }, [geographicValues, searchQuery, statusFilter, levelFilter]);
    const toggleExpand = (id) => {
        const next = new Set(expandedIds);
        if (next.has(id)) {
            next.delete(id);
        }
        else {
            next.add(id);
        }
        setExpandedIds(next);
    };
    // If searching/filtering, show flat list. Otherwise show tree.
    const isFlat = searchQuery.trim() !== '' || levelFilter !== 'all';
    const tree = useMemo(() => buildTree(displayValues), [displayValues]);
    if (displayValues.length === 0) {
        return (_jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-3", children: _jsx("span", { className: "text-lg text-slate-400", children: "0" }) }), _jsx("p", { className: "font-medium", children: "No geographic values found" }), _jsx("p", { className: "text-sm mt-1", children: searchQuery ? 'Try adjusting your search query' : 'No values match the current filter' })] }));
    }
    return (_jsxs("div", { children: [_jsx("div", { className: "px-4 py-2.5 border-b border-slate-200 dark:border-slate-700 flex items-center gap-2", children: ['all', 'country', 'state', 'city'].map((level) => (_jsx("button", { onClick: () => setLevelFilter(level), className: `px-2.5 py-1 text-xs font-medium rounded-full transition-colors ${levelFilter === level
                        ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
                        : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: level === 'all' ? 'All Levels' : level.charAt(0).toUpperCase() + level.slice(1) + 's' }, level))) }), _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "sticky top-0 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Name" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Code" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Level" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: isFlat
                            ? displayValues.map((geo) => {
                                const level = LEVEL_STYLES[geo.level];
                                return (_jsxs("tr", { onClick: () => onEdit(geo.id), className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: geo.name }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm font-mono text-slate-500 dark:text-slate-400", children: geo.code }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${level.classes}`, children: level.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("button", { onClick: (e) => {
                                                    e.stopPropagation();
                                                    onToggle(geo.id, geo.status === 'active' ? 'inactive' : 'active');
                                                }, className: `inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium rounded-full transition-colors ${geo.status === 'active'
                                                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                                                    : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'}`, children: geo.status === 'active' ? 'Active' : 'Inactive' }) })] }, geo.id));
                            })
                            : tree.map((node) => (_jsx(GeoRow, { node: node, depth: 0, expandedIds: expandedIds, onToggleExpand: toggleExpand, onEdit: onEdit, onToggle: onToggle }, node.id))) })] })] }));
}
