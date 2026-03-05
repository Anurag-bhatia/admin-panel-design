import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, UserPlus, AlertTriangle, ChevronDown, } from 'lucide-react';
const PRIORITY_OPTIONS = [
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
];
export function DisputeBulkActionsBar({ selectedCount, reviewers, onClearSelection, onAssignReviewer, onChangePriority, }) {
    const [showReviewerDropdown, setShowReviewerDropdown] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    return (_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedCount }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: onClearSelection, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                        setShowReviewerDropdown(!showReviewerDropdown);
                                        setShowPriorityDropdown(false);
                                    }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: "Assign Reviewer" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showReviewerDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowReviewerDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto", children: reviewers.map((reviewer) => (_jsxs("button", { onClick: () => {
                                                    onAssignReviewer?.(reviewer.id);
                                                    setShowReviewerDropdown(false);
                                                }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium", children: reviewer.name.charAt(0) }), reviewer.name] }, reviewer.id))) })] }))] }), _jsx("div", { className: "w-px h-6 bg-slate-700 mx-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                        setShowPriorityDropdown(!showPriorityDropdown);
                                        setShowReviewerDropdown(false);
                                    }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx("span", { children: "Change Priority" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showPriorityDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowPriorityDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: PRIORITY_OPTIONS.map((priority) => (_jsx("button", { onClick: () => {
                                                    onChangePriority?.(priority.key);
                                                    setShowPriorityDropdown(false);
                                                }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: priority.label }, priority.key))) })] }))] })] })] }) }));
}
