import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
export function MainNav({ items, onNavigate, isCollapsed = false, darkMode = false }) {
    // Auto-expand items that have active children
    const getInitialExpanded = () => {
        const expanded = new Set();
        items.forEach(item => {
            if (item.children?.some(child => child.isActive)) {
                expanded.add(item.href);
            }
        });
        return expanded;
    };
    const [expandedItems, setExpandedItems] = useState(getInitialExpanded());
    const toggleExpanded = (href) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(href)) {
            newExpanded.delete(href);
        }
        else {
            newExpanded.add(href);
        }
        setExpandedItems(newExpanded);
    };
    return (_jsx("nav", { className: "flex-1 overflow-y-auto py-4", children: _jsx("ul", { className: `space-y-1 ${isCollapsed ? 'px-2' : 'px-3'}`, children: items.map((item) => {
                const hasChildren = item.children && item.children.length > 0;
                const isExpanded = expandedItems.has(item.href) && !isCollapsed;
                const hasActiveChild = item.children?.some(child => child.isActive);
                return (_jsxs("li", { children: [_jsxs("button", { onClick: () => {
                                if (hasChildren && !isCollapsed) {
                                    toggleExpanded(item.href);
                                }
                                else {
                                    onNavigate?.(item.href);
                                }
                            }, className: `w-full flex items-center rounded-lg text-sm font-medium transition-colors ${isCollapsed ? 'justify-center px-3 py-2.5' : 'space-x-3 px-3 py-2.5'} ${item.isActive
                                ? 'bg-cyan-600 text-white'
                                : hasActiveChild
                                    ? darkMode
                                        ? 'bg-cyan-900/30 text-cyan-300'
                                        : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-300'
                                    : darkMode
                                        ? 'text-zinc-300 hover:bg-zinc-800'
                                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`, title: isCollapsed ? item.label : undefined, children: [item.icon && (_jsx(item.icon, { className: `w-5 h-5 flex-shrink-0 ${item.isActive
                                        ? 'text-white'
                                        : hasActiveChild
                                            ? darkMode
                                                ? 'text-cyan-400'
                                                : 'text-cyan-600 dark:text-cyan-400'
                                            : darkMode
                                                ? 'text-zinc-400'
                                                : 'text-slate-500 dark:text-slate-400'}` })), !isCollapsed && (_jsxs(_Fragment, { children: [_jsx("span", { className: "truncate flex-1 text-left", children: item.label }), hasChildren && (isExpanded ? (_jsx(ChevronDown, { className: "w-4 h-4 flex-shrink-0" })) : (_jsx(ChevronRight, { className: "w-4 h-4 flex-shrink-0" })))] }))] }), hasChildren && isExpanded && !isCollapsed && (_jsx("ul", { className: "mt-1 space-y-1 pl-8", children: item.children.map((child) => (_jsx("li", { children: _jsx("button", { onClick: () => onNavigate?.(child.href), className: `w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${child.isActive
                                        ? 'bg-cyan-600 text-white'
                                        : darkMode
                                            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200'
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}`, children: _jsx("span", { className: "truncate", children: child.label }) }) }, child.href))) }))] }, item.href));
            }) }) }));
}
