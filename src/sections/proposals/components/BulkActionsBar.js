import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, UserPlus, ArrowRight, ChevronDown } from 'lucide-react';
export function BulkActionsBar({ selectedCount, activeTab, teamMembers, onClear, onBulkAssign, onBulkUpdateStatus, }) {
    const [showAssignMenu, setShowAssignMenu] = useState(false);
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    if (selectedCount === 0)
        return null;
    const statusOptions = (() => {
        switch (activeTab) {
            case 'sent':
                return [
                    { key: 'under_review', label: 'Move to In Review' },
                    { key: 'rejected', label: 'Reject' },
                ];
            case 'under_review':
                return [{ key: 'rejected', label: 'Reject' }];
            case 'rejected':
                return [{ key: 'sent', label: 'Reopen to Inbox' }];
            default:
                return [];
        }
    })();
    return (_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedCount }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: onClear, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [(activeTab === 'sent' || activeTab === 'under_review') && (_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                        setShowAssignMenu(!showAssignMenu);
                                        setShowStatusMenu(false);
                                    }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: "Assign" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showAssignMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowAssignMenu(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: teamMembers.map((tm) => (_jsxs("button", { onClick: () => {
                                                    onBulkAssign?.(tm.id);
                                                    setShowAssignMenu(false);
                                                }, className: "w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx("span", { className: "font-medium", children: tm.name }), _jsx("span", { className: "text-slate-400 dark:text-slate-500 text-xs ml-1.5", children: tm.role })] }, tm.id))) })] }))] })), statusOptions.length > 0 && (_jsxs(_Fragment, { children: [(activeTab === 'sent' || activeTab === 'under_review') && (_jsx("div", { className: "w-px h-6 bg-slate-700 mx-1" })), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                setShowStatusMenu(!showStatusMenu);
                                                setShowAssignMenu(false);
                                            }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(ArrowRight, { className: "h-4 w-4" }), _jsx("span", { children: "Move Queue" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showStatusMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowStatusMenu(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: statusOptions.map(({ key, label }) => (_jsx("button", { onClick: () => {
                                                            onBulkUpdateStatus?.(key);
                                                            setShowStatusMenu(false);
                                                        }, className: "w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: label }, key))) })] }))] })] }))] })] }) }));
}
