import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { X, ArrowLeft, GitMerge, AlertCircle } from 'lucide-react';
const TYPE_LABELS = {
    refund: 'Refund',
    '48hr_refund': '48 hr Refund',
    tat_breach: 'TAT Breach',
    payment_issue: 'Payment Issue',
    legal_escalation: 'Legal Escalation',
    information_missing: 'Information Missing',
    incorrect_data: 'Incorrect Data',
};
const PRIORITY_LABELS = {
    critical: { label: 'Critical', className: 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' },
    high: { label: 'High', className: 'bg-orange-50 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400' },
    medium: { label: 'Medium', className: 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' },
    low: { label: 'Low', className: 'bg-slate-50 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
};
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
const INITIAL_FORM = {
    linkedEntityType: '',
    linkedEntityId: '',
    disputeType: '',
    raisedBy: '',
    priority: '',
    source: '',
    product: '',
    reporterName: '',
    reporterNumber: '',
    description: '',
    disputedAmount: '',
};
export function CreateDisputeModal({ existingDisputes = [], onCreateDispute, onMerge, onClose, }) {
    const [form, setForm] = useState(INITIAL_FORM);
    const [view, setView] = useState('form');
    const updateField = (key, value) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };
    const isValid = form.linkedEntityType !== '' &&
        form.linkedEntityId.trim() !== '' &&
        form.disputeType !== '' &&
        form.priority !== '' &&
        form.source.trim() !== '' &&
        form.product.trim() !== '';
    const matches = useMemo(() => {
        if (form.linkedEntityType === '' || form.linkedEntityId.trim() === '') {
            return [];
        }
        const targetId = form.linkedEntityId.trim().toLowerCase();
        return existingDisputes.filter((d) => d.linkedEntity.type === form.linkedEntityType &&
            d.linkedEntity.id.toLowerCase() === targetId &&
            d.status !== 'settled');
    }, [existingDisputes, form.linkedEntityType, form.linkedEntityId]);
    const handleSubmit = () => {
        if (!isValid)
            return;
        if (matches.length > 0) {
            setView('merge');
        }
        else {
            onCreateDispute?.(form);
        }
    };
    const handleMerge = (existingId) => {
        onMerge?.(existingId, form);
    };
    const handleCreateAnyway = () => {
        onCreateDispute?.(form);
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-3", children: [view === 'merge' && (_jsx("button", { onClick: () => setView('form'), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors", children: _jsx(ArrowLeft, { className: "h-4 w-4 text-slate-500" }) })), _jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: view === 'form' ? 'Create New Dispute' : 'Similar disputes found' }) })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), view === 'merge' ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/40", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "text-sm text-amber-800 dark:text-amber-300", children: ["There ", matches.length === 1 ? 'is' : 'are', " already", ' ', _jsx("span", { className: "font-semibold", children: matches.length }), " open dispute", matches.length === 1 ? '' : 's', " linked to this entity."] })] }), _jsx("div", { className: "space-y-2 max-h-[380px] overflow-y-auto", children: matches.map((d) => {
                                        const priority = PRIORITY_LABELS[d.priority] || { label: d.priority, className: '' };
                                        const openInNewTab = () => {
                                            const url = new URL(window.location.href);
                                            url.searchParams.set('disputeId', d.id);
                                            window.open(url.toString(), '_blank', 'noopener,noreferrer');
                                        };
                                        return (_jsxs("div", { role: "button", tabIndex: 0, onClick: openInNewTab, onKeyDown: (e) => {
                                                if (e.key === 'Enter' || e.key === ' ') {
                                                    e.preventDefault();
                                                    openInNewTab();
                                                }
                                            }, className: "flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-500", children: [_jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: "font-mono text-sm font-semibold text-slate-900 dark:text-white", children: d.disputeId.replace(/-/g, '') }), _jsx("span", { className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${priority.className}`, children: priority.label })] }), _jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400", children: [_jsx("span", { children: d.subscriberName }), _jsx("span", { children: "\u00B7" }), _jsxs("span", { children: ["Created ", formatDate(d.createdOn)] })] })] }), _jsxs("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        handleMerge(d.id);
                                                    }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-md transition-colors flex-shrink-0", children: [_jsx(GitMerge, { className: "h-3.5 w-3.5" }), "Merge here"] })] }, d.id));
                                    }) })] }), _jsx("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: _jsx("button", { onClick: handleCreateAnyway, className: "px-4 py-2 text-sm font-medium text-cyan-700 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-800 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: "Create as new dispute anyway" }) })] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "p-6 space-y-5", children: [_jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Linked Entity Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.linkedEntityType, onChange: (e) => updateField('linkedEntityType', e.target.value), className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select entity type" }), _jsx("option", { value: "incident", children: "Incident" }), _jsx("option", { value: "subscriber", children: "Subscriber" }), _jsx("option", { value: "vehicle", children: "Vehicle" }), _jsx("option", { value: "payment", children: "Payment" }), _jsx("option", { value: "other", children: "Other" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: [form.linkedEntityType === 'incident'
                                                            ? 'Incident ID'
                                                            : form.linkedEntityType === 'subscriber'
                                                                ? 'Mobile Number'
                                                                : form.linkedEntityType === 'vehicle'
                                                                    ? 'Vehicle Number'
                                                                    : form.linkedEntityType === 'payment'
                                                                        ? 'Transaction ID'
                                                                        : form.linkedEntityType === 'other'
                                                                            ? 'Reference ID'
                                                                            : 'Entity ID', ' ', _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("input", { type: form.linkedEntityType === 'subscriber' ? 'tel' : 'text', inputMode: form.linkedEntityType === 'subscriber' ? 'numeric' : undefined, value: form.linkedEntityId, onChange: (e) => updateField('linkedEntityId', e.target.value), placeholder: form.linkedEntityType === 'incident'
                                                        ? 'e.g. IRN-78234'
                                                        : form.linkedEntityType === 'subscriber'
                                                            ? 'e.g. 9876543210'
                                                            : form.linkedEntityType === 'vehicle'
                                                                ? 'e.g. MH01AB1234'
                                                                : form.linkedEntityType === 'payment'
                                                                    ? 'e.g. TXN-9001'
                                                                    : form.linkedEntityType === 'other'
                                                                        ? 'Enter reference ID'
                                                                        : 'Select entity type first', className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Dispute Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.disputeType, onChange: (e) => updateField('disputeType', e.target.value), className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select type" }), _jsx("option", { value: "refund", children: "Refund" }), _jsx("option", { value: "48hr_refund", children: "48 hr Refund" }), _jsx("option", { value: "tat_breach", children: "TAT Breach" }), _jsx("option", { value: "payment_issue", children: "Payment Issue" }), _jsx("option", { value: "legal_escalation", children: "Legal Escalation" }), _jsx("option", { value: "information_missing", children: "Information Missing" }), _jsx("option", { value: "incorrect_data", children: "Incorrect Data" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Priority ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.priority, onChange: (e) => updateField('priority', e.target.value), className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select priority" }), _jsx("option", { value: "critical", children: "Critical" }), _jsx("option", { value: "high", children: "High" }), _jsx("option", { value: "medium", children: "Medium" }), _jsx("option", { value: "low", children: "Low" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Source ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.source, onChange: (e) => updateField('source', e.target.value), className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select source" }), _jsx("option", { value: "Email", children: "Email" }), _jsx("option", { value: "WhatsApp", children: "WhatsApp" }), _jsx("option", { value: "IVR", children: "IVR" }), _jsx("option", { value: "Internal", children: "Internal" }), _jsx("option", { value: "SMS", children: "SMS" }), _jsx("option", { value: "Social Media", children: "Social Media" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Product ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: form.product, onChange: (e) => updateField('product', e.target.value), className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select product" }), _jsx("option", { value: "ChallanPay", children: "ChallanPay" }), _jsx("option", { value: "LOTS247", children: "LOTS247" }), _jsx("option", { value: "RSP", children: "RSP" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Customer Name" }), _jsx("input", { type: "text", value: form.reporterName, onChange: (e) => updateField('reporterName', e.target.value), placeholder: "Enter customer name", className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Customer Number" }), _jsx("input", { type: "text", value: form.reporterNumber, onChange: (e) => updateField('reporterNumber', e.target.value), placeholder: "Enter phone number", className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Reason" }), _jsx("textarea", { value: form.description, onChange: (e) => updateField('description', e.target.value), rows: 3, placeholder: "Provide the reason for raising this dispute...", className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none" })] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !isValid, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: matches.length > 0 ? 'Continue' : 'Create Dispute' })] })] }))] }) }));
}
