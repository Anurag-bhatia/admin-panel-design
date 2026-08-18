import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, XCircle } from 'lucide-react';
const REJECTION_REASONS = [
    'Service not available for this case',
    'Insufficient documentation',
    'Out of service area',
    'Duplicate request',
    'Invalid/incorrect details',
    'Customer request',
];
const TYPE_BADGE_STYLES = {
    Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
};
export function RejectModal({ proposal, onSubmit, onCancel }) {
    const [reason, setReason] = useState('');
    const [note, setNote] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (reason) {
            onSubmit?.(reason, note || undefined);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-100", children: "Reject Proposal" }), _jsx("button", { onClick: onCancel, className: "p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6", children: [_jsxs("div", { className: "bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("span", { className: "font-mono text-sm font-medium text-slate-700 dark:text-slate-300", children: proposal.displayId }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_BADGE_STYLES[proposal.type]}`, children: proposal.type })] }), _jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400 mb-1", children: [proposal.customer.name, " \u00B7 ", proposal.customer.company] }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: [proposal.quantity, " items \u00B7 ", proposal.description] })] }), _jsxs("div", { className: "space-y-5", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Rejection Reason ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: reason, onChange: (e) => setReason(e.target.value), required: true, className: "w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent cursor-pointer", children: [_jsx("option", { value: "", children: "Select a reason..." }), REJECTION_REASONS.map((r) => (_jsx("option", { value: r, children: r }, r)))] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Note to Customer ", _jsx("span", { className: "text-slate-400", children: "(optional)" })] }), _jsx("textarea", { value: note, onChange: (e) => setNote(e.target.value), placeholder: "Explain the rejection to the customer...", rows: 3, className: "w-full px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none" })] })] }), _jsxs("div", { className: "flex gap-3 justify-end pt-6 mt-6 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2.5 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors", children: "Cancel" }), _jsxs("button", { type: "submit", disabled: !reason, className: "flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-red-300 dark:disabled:bg-red-800 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed", children: [_jsx(XCircle, { className: "h-4 w-4" }), "Reject Proposal"] })] })] })] }) }));
}
