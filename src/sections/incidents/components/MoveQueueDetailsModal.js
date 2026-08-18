import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X } from 'lucide-react';
const STAGE_META = {
    refundRequested: { title: 'Move to Refund Requested', submitLabel: 'Confirm Move' },
    refundCompleted: { title: 'Move to Refund Completed', submitLabel: 'Confirm Move' },
    notSettled: { title: 'Move to Not Settled', submitLabel: 'Confirm Move' },
    settled: { title: 'Move to Settled', submitLabel: 'Confirm Move' },
    hold: { title: 'Move to Hold', submitLabel: 'Move to Hold' },
};
export function MoveQueueDetailsModal({ incidentId, stage, onSubmit, onCancel, }) {
    const [reason, setReason] = useState('');
    const [notes, setNotes] = useState('');
    const [caseTentativeAmount, setCaseTentativeAmount] = useState('');
    const [caseActualAmount, setCaseActualAmount] = useState('');
    const [caseProfessionalFees, setCaseProfessionalFees] = useState('');
    const [governmentFees, setGovernmentFees] = useState('');
    const [miscellaneousCharges, setMiscellaneousCharges] = useState('');
    const meta = STAGE_META[stage];
    const isDisabled = (() => {
        if (stage === 'refundRequested')
            return !reason.trim() || !notes.trim();
        if (stage === 'refundCompleted')
            return !notes.trim();
        if (stage === 'notSettled')
            return !reason.trim();
        if (stage === 'hold')
            return !reason.trim();
        if (stage === 'settled') {
            return (!caseTentativeAmount ||
                !caseActualAmount ||
                !caseProfessionalFees ||
                !governmentFees);
        }
        return true;
    })();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isDisabled)
            return;
        if (stage === 'refundRequested') {
            onSubmit({ reason: reason.trim(), notes: notes.trim() });
        }
        else if (stage === 'refundCompleted') {
            onSubmit({ notes: notes.trim() });
        }
        else if (stage === 'notSettled') {
            onSubmit({ reason: reason.trim() });
        }
        else if (stage === 'hold') {
            onSubmit({ reason: reason.trim() });
        }
        else if (stage === 'settled') {
            onSubmit({
                caseTentativeAmount: parseFloat(caseTentativeAmount) || 0,
                caseActualAmount: parseFloat(caseActualAmount) || 0,
                caseProfessionalFees: parseFloat(caseProfessionalFees) || 0,
                governmentFees: parseFloat(governmentFees) || 0,
                miscellaneousCharges: miscellaneousCharges
                    ? parseFloat(miscellaneousCharges) || 0
                    : undefined,
            });
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900 z-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: meta.title }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5", children: incidentId })] }), _jsx("button", { onClick: onCancel, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "p-6 space-y-5", children: [stage === 'refundRequested' && (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Reason for Refund ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Explain why a refund is being requested", rows: 3, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y", required: true })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Notes ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Add any additional notes", rows: 3, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y", required: true })] })] })), stage === 'refundCompleted' && (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Notes ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Add notes about the completed refund", rows: 4, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y", required: true })] })), stage === 'notSettled' && (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Reason for Not Settled ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Explain why the case could not be settled", rows: 4, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y", required: true })] })), stage === 'hold' && (_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Reason for Hold ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Explain why this is being placed on hold", rows: 4, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-y", required: true })] })), stage === 'settled' && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Case Tentative Amount ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: caseTentativeAmount, onChange: (e) => setCaseTentativeAmount(e.target.value), placeholder: "0.00", min: "0", step: "0.01", className: "w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white", required: true })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Case Actual Amount ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: caseActualAmount, onChange: (e) => setCaseActualAmount(e.target.value), placeholder: "0.00", min: "0", step: "0.01", className: "w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white", required: true })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Case Professional Fees ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: caseProfessionalFees, onChange: (e) => setCaseProfessionalFees(e.target.value), placeholder: "0.00", min: "0", step: "0.01", className: "w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white", required: true })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Government Fees ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: governmentFees, onChange: (e) => setGovernmentFees(e.target.value), placeholder: "0.00", min: "0", step: "0.01", className: "w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white", required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Miscellaneous Charges" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: miscellaneousCharges, onChange: (e) => setMiscellaneousCharges(e.target.value), placeholder: "0.00", min: "0", step: "0.01", className: "w-full pl-8 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] })] })] })), _jsxs("div", { className: "flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { type: "button", onClick: onCancel, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", disabled: isDisabled, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: meta.submitLabel })] })] })] }) }));
}
