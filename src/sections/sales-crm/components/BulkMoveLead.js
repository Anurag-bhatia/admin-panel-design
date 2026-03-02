import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X, ArrowRight, RefreshCw } from 'lucide-react';
import { useState } from 'react';
export function BulkMoveLead({ mode, selectedCount, users, onMove, onClose }) {
    const [moveType, setMoveType] = useState('status');
    const [selectedValue, setSelectedValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'assigned', label: 'Assigned' },
        { value: 'follow-up', label: 'Follow-up' },
        { value: 'quotations', label: 'Quotations' },
        { value: 'projected', label: 'Projected' },
        { value: 'invoiced', label: 'Ready to Invoice' },
        { value: 'sales', label: 'Sales' },
        { value: 'lost', label: 'Lost' }
    ];
    const ownerOptions = [
        { value: 'unassigned', label: 'Unassigned' },
        ...users.map(user => ({ value: user.id, label: user.fullName }))
    ];
    const handleSubmit = async () => {
        if (!selectedValue)
            return;
        setIsSubmitting(true);
        try {
            const field = mode === 'move' ? 'status' : moveType;
            onMove?.(field, selectedValue);
            setSelectedValue('');
            setMoveType('status');
            onClose?.();
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const currentOptions = mode === 'move' ? statusOptions : (moveType === 'status' ? statusOptions : ownerOptions);
    const isMove = mode === 'move';
    const title = isMove ? 'Move Leads' : 'Bulk Update Leads';
    const submitLabel = isMove ? 'Move Leads' : 'Update Leads';
    const submittingLabel = isMove ? 'Moving...' : 'Updating...';
    const Icon = isMove ? ArrowRight : RefreshCw;
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50", children: _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-lg shadow-lg max-w-md w-full mx-4", children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg", children: _jsx(Icon, { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: title }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: [selectedCount, " selected"] })] })] }), _jsx("button", { onClick: onClose, className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-500 dark:text-slate-400" }) })] }), _jsxs("div", { className: "p-6 space-y-4", children: [!isMove && _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3", children: "Update by" }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsx("button", { onClick: () => {
                                                setMoveType('status');
                                                setSelectedValue('');
                                            }, className: `px-4 py-2 rounded-lg font-medium text-sm transition-colors ${moveType === 'status'
                                                ? 'bg-cyan-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: "Status" }), _jsx("button", { onClick: () => {
                                                setMoveType('owner');
                                                setSelectedValue('');
                                            }, className: `px-4 py-2 rounded-lg font-medium text-sm transition-colors ${moveType === 'owner'
                                                ? 'bg-cyan-600 text-white'
                                                : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'}`, children: "Owner" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: isMove ? 'Move to Stage' : `Select ${moveType === 'status' ? 'Status' : 'Owner'}` }), _jsxs("select", { value: selectedValue, onChange: e => setSelectedValue(e.target.value), className: "w-full px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat", children: [_jsx("option", { value: "", children: "Choose a stage..." }), currentOptions.map(option => (_jsx("option", { value: option.value, children: option.label }, option.value)))] })] }), _jsx("div", { className: "p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600", children: _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400", children: isMove
                                    ? 'Moving leads will change their lifecycle stage for all selected leads.'
                                    : moveType === 'status'
                                        ? 'Changing the status will update all selected leads and trigger any associated workflows.'
                                        : 'Assigning to an owner will update the lead assignment for all selected leads.' }) })] }), _jsxs("div", { className: "flex gap-3 p-6 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50", children: [_jsx("button", { onClick: onClose, className: "flex-1 px-4 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSubmit, disabled: !selectedValue || isSubmitting, className: "flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg font-medium hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors", children: isSubmitting ? submittingLabel : submitLabel })] })] }) }));
}
