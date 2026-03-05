import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, ArrowRight, AlertTriangle } from 'lucide-react';
const QUEUE_OPTIONS = [
    {
        value: 'newIncidents',
        label: 'New Incidents',
        description: 'Newly created challans awaiting screening',
    },
    {
        value: 'screening',
        label: 'Screening',
        description: 'Challans being screened for validity and details',
    },
    {
        value: 'lawyerAssigned',
        label: 'Lawyer Assigned',
        description: 'Challans assigned to lawyers for resolution',
    },
    {
        value: 'settled',
        label: 'Settled',
        description: 'Successfully resolved challans',
    },
    {
        value: 'notSettled',
        label: 'Not Settled',
        description: 'Challans that could not be resolved',
    },
    {
        value: 'refund',
        label: 'Refund',
        description: 'Challans pending refund processing',
    },
];
export function MoveQueueModal({ selectedCount, currentQueue, onMove, onClose, }) {
    const [selectedQueue, setSelectedQueue] = useState(null);
    const handleMove = () => {
        if (selectedQueue) {
            onMove?.(selectedQueue);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Move Queue" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: selectedCount === 1
                                        ? '1 challan selected'
                                        : `${selectedCount} challans selected` })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), currentQueue && (_jsx("div", { className: "px-6 pt-4", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Current Queue" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mt-0.5", children: QUEUE_OPTIONS.find((q) => q.value === currentQueue)?.label })] }), _jsx(ArrowRight, { className: "h-5 w-5 text-slate-400" }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Target Queue" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mt-0.5", children: selectedQueue
                                            ? QUEUE_OPTIONS.find((q) => q.value === selectedQueue)?.label
                                            : 'Select below' })] })] }) })), _jsx("div", { className: "flex-1 overflow-y-auto px-6 py-4", children: _jsx("div", { className: "space-y-2", children: QUEUE_OPTIONS.map((queue) => {
                            const isCurrent = currentQueue === queue.value;
                            const isSelected = selectedQueue === queue.value;
                            return (_jsx("button", { onClick: () => setSelectedQueue(queue.value), disabled: isCurrent, className: `w-full p-4 rounded-lg border-2 text-left transition-all ${isCurrent
                                    ? 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/30 opacity-50 cursor-not-allowed'
                                    : isSelected
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-white dark:bg-slate-800'}`, children: _jsxs("div", { className: "flex items-start justify-between gap-3", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `font-medium ${isCurrent
                                                                ? 'text-slate-500 dark:text-slate-400'
                                                                : isSelected
                                                                    ? 'text-cyan-900 dark:text-cyan-300'
                                                                    : 'text-slate-900 dark:text-white'}`, children: queue.label }), isCurrent && (_jsx("span", { className: "text-xs px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400", children: "Current" }))] }), _jsx("p", { className: `text-sm mt-1 ${isCurrent
                                                        ? 'text-slate-400 dark:text-slate-500'
                                                        : isSelected
                                                            ? 'text-cyan-700 dark:text-cyan-400'
                                                            : 'text-slate-500 dark:text-slate-400'}`, children: queue.description })] }), isSelected && !isCurrent && (_jsx("div", { className: "flex-shrink-0", children: _jsx("div", { className: "w-5 h-5 rounded-full bg-cyan-600 flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-white", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M5 13l4 4L19 7" }) }) }) }))] }) }, queue.value));
                        }) }) }), selectedQueue && currentQueue !== selectedQueue && (_jsx("div", { className: "px-6 pb-4", children: _jsxs("div", { className: "flex items-start gap-3 px-4 py-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg", children: [_jsx(AlertTriangle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-amber-900 dark:text-amber-300 font-medium", children: "Confirm queue movement" }), _jsxs("p", { className: "text-xs text-amber-700 dark:text-amber-400 mt-1", children: [selectedCount === 1
                                                ? 'This challan will be moved to the selected queue.'
                                                : `All ${selectedCount} selected challans will be moved to the selected queue.`, ' ', "Make sure this is the correct stage for these challans."] })] })] }) })), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleMove, disabled: !selectedQueue || currentQueue === selectedQueue, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Move to Queue" })] })] }) }));
}
