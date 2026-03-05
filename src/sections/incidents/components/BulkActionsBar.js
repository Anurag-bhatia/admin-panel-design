import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { X, CheckCircle2, Search, UserPlus, Scale, ArrowRight, Upload, ChevronDown, Receipt, } from 'lucide-react';
const QUEUE_OPTIONS = [
    { key: 'newIncidents', label: 'New Incidents' },
    { key: 'screening', label: 'Screening' },
    { key: 'agentAssigned', label: 'Agent Assigned' },
    { key: 'lawyerAssigned', label: 'Lawyer Assigned' },
    { key: 'settled', label: 'Settled' },
    { key: 'notSettled', label: 'Not Settled' },
    { key: 'hold', label: 'Hold' },
    { key: 'refund', label: 'Refund' },
];
export function BulkActionsBar({ selectedCount, users, lawyers, activeQueue, onClearSelection, onValidate, onScreen, onAssignAgent, onAssignLawyer, onMoveQueue, onAddExpense, onBulkUpdate, }) {
    const isNewIncidents = activeQueue === 'newIncidents';
    const [showAgentDropdown, setShowAgentDropdown] = useState(false);
    const [showLawyerDropdown, setShowLawyerDropdown] = useState(false);
    const [showQueueDropdown, setShowQueueDropdown] = useState(false);
    const [showBulkUpdateModal, setShowBulkUpdateModal] = useState(false);
    const [showSettlementModal, setShowSettlementModal] = useState(false);
    const [pendingQueue, setPendingQueue] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const [settlementFees, setSettlementFees] = useState({
        totalAmountReceived: 0,
        challanAmount: 0,
        convenienceFee: 0,
        gst: 0,
        gatewayCharges: 0,
        discount: 0,
    });
    const fileInputRef = useRef(null);
    const handleMoveToQueue = (queue) => {
        if (queue === 'settled' || queue === 'notSettled') {
            setPendingQueue(queue);
            setIsAddingExpense(false);
            setShowSettlementModal(true);
            setShowQueueDropdown(false);
        }
        else {
            onMoveQueue?.(queue);
            setShowQueueDropdown(false);
        }
    };
    const handleAddExpense = () => {
        setIsAddingExpense(true);
        setPendingQueue(null);
        setShowSettlementModal(true);
    };
    const handleSettlementConfirm = () => {
        if (isAddingExpense) {
            onAddExpense?.(settlementFees);
        }
        else if (pendingQueue) {
            onMoveQueue?.(pendingQueue, settlementFees);
        }
        setShowSettlementModal(false);
        setPendingQueue(null);
        setIsAddingExpense(false);
        setSettlementFees({ totalAmountReceived: 0, challanAmount: 0, convenienceFee: 0, gst: 0, gatewayCharges: 0, discount: 0 });
    };
    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            onBulkUpdate?.(file);
            setShowBulkUpdateModal(false);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedCount }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: onClearSelection, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsx("div", { className: "flex items-center gap-1", children: activeQueue === 'notSettled' ? (_jsxs("button", { onClick: () => onMoveQueue?.('refund'), className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(ArrowRight, { className: "h-4 w-4" }), _jsx("span", { children: "Send to Refund" })] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                            if (activeQueue === 'screening') {
                                                onValidate?.();
                                            }
                                        }, disabled: activeQueue !== 'screening', className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeQueue !== 'screening'
                                            ? 'text-slate-500 cursor-not-allowed'
                                            : 'text-white hover:bg-slate-700'}`, children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), _jsx("span", { children: "Validate" })] }), _jsxs("button", { onClick: () => {
                                            if (activeQueue === 'newIncidents') {
                                                onScreen?.();
                                            }
                                        }, disabled: activeQueue !== 'newIncidents', className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${activeQueue !== 'newIncidents'
                                            ? 'text-slate-500 cursor-not-allowed'
                                            : 'text-white hover:bg-slate-700'}`, children: [_jsx(Search, { className: "h-4 w-4" }), _jsx("span", { children: "Screen" })] }), _jsx("div", { className: "w-px h-6 bg-slate-700 mx-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                    if (!isNewIncidents) {
                                                        setShowAgentDropdown(!showAgentDropdown);
                                                        setShowLawyerDropdown(false);
                                                        setShowQueueDropdown(false);
                                                    }
                                                }, disabled: isNewIncidents, className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isNewIncidents
                                                    ? 'text-slate-500 cursor-not-allowed'
                                                    : 'text-white hover:bg-slate-700'}`, title: isNewIncidents ? 'Available after screening' : undefined, children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: "Assign Agent" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showAgentDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowAgentDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto", children: users.map((user) => (_jsxs("button", { onClick: () => {
                                                                onAssignAgent?.(user.id);
                                                                setShowAgentDropdown(false);
                                                            }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center text-xs font-medium", children: user.name.charAt(0) }), user.name] }, user.id))) })] }))] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                    if (!isNewIncidents) {
                                                        setShowLawyerDropdown(!showLawyerDropdown);
                                                        setShowAgentDropdown(false);
                                                        setShowQueueDropdown(false);
                                                    }
                                                }, disabled: isNewIncidents, className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isNewIncidents
                                                    ? 'text-slate-500 cursor-not-allowed'
                                                    : 'text-white hover:bg-slate-700'}`, title: isNewIncidents ? 'Available after screening' : undefined, children: [_jsx(Scale, { className: "h-4 w-4" }), _jsx("span", { children: "Assign Lawyer" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showLawyerDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowLawyerDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto", children: lawyers.map((lawyer) => (_jsxs("button", { onClick: () => {
                                                                onAssignLawyer?.(lawyer.id);
                                                                setShowLawyerDropdown(false);
                                                            }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(Scale, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "truncate", children: lawyer.name })] }, lawyer.id))) })] }))] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                    if (!isNewIncidents) {
                                                        setShowQueueDropdown(!showQueueDropdown);
                                                        setShowAgentDropdown(false);
                                                        setShowLawyerDropdown(false);
                                                    }
                                                }, disabled: isNewIncidents, className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${isNewIncidents
                                                    ? 'text-slate-500 cursor-not-allowed'
                                                    : 'text-white hover:bg-slate-700'}`, title: isNewIncidents ? 'Available after screening' : undefined, children: [_jsx(ArrowRight, { className: "h-4 w-4" }), _jsx("span", { children: "Move Queue" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showQueueDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowQueueDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: QUEUE_OPTIONS.map((queue) => (_jsx("button", { onClick: () => handleMoveToQueue(queue.key), className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: queue.label }, queue.key))) })] }))] }), _jsx("div", { className: "w-px h-6 bg-slate-700 mx-1" }), _jsxs("button", { onClick: handleAddExpense, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(Receipt, { className: "h-4 w-4" }), _jsx("span", { children: "Add Expense" })] }), _jsxs("button", { onClick: () => setShowBulkUpdateModal(true), className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-cyan-400 hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), _jsx("span", { children: "Bulk Update" })] })] })) })] }) }), showBulkUpdateModal && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: () => setShowBulkUpdateModal(false) }), _jsxs("div", { className: "relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6", children: [_jsx("button", { onClick: () => setShowBulkUpdateModal(false), className: "absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) }), _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "Bulk Update Challans" }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-6", children: ["Upload an Excel or CSV file to update ", selectedCount, " selected challans."] }), _jsxs("div", { onClick: () => fileInputRef.current?.click(), className: "border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer hover:border-cyan-500 dark:hover:border-cyan-500 hover:bg-cyan-50/50 dark:hover:bg-cyan-900/10 transition-colors", children: [_jsx(Upload, { className: "h-10 w-10 text-slate-400 mx-auto mb-3" }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: "Click to upload or drag and drop" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Excel (.xlsx, .xls) or CSV files" }), _jsx("input", { ref: fileInputRef, type: "file", accept: ".xlsx,.xls,.csv", onChange: handleFileChange, className: "hidden" })] }), _jsx("div", { className: "mt-6 flex justify-end gap-3", children: _jsx("button", { onClick: () => setShowBulkUpdateModal(false), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }) })] })] })), showSettlementModal && (_jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: () => setShowSettlementModal(false) }), _jsxs("div", { className: "relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6", children: [_jsx("button", { onClick: () => setShowSettlementModal(false), className: "absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) }), _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Settlement Details' : 'Not Settled Details' }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-6", children: isAddingExpense
                                    ? `Enter the expense details for ${selectedCount} selected challan${selectedCount > 1 ? 's' : ''}.`
                                    : `Enter the fee details for ${selectedCount} selected challan${selectedCount > 1 ? 's' : ''} before marking as ${pendingQueue === 'settled' ? 'settled' : 'not settled'}.` }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: ["Total Amount Received ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.totalAmountReceived || '', onChange: (e) => setSettlementFees({
                                                            ...settlementFees,
                                                            totalAmountReceived: parseFloat(e.target.value) || 0,
                                                        }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: ["Challan Amount ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.challanAmount || '', onChange: (e) => setSettlementFees({
                                                            ...settlementFees,
                                                            challanAmount: parseFloat(e.target.value) || 0,
                                                        }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: "Convenience Fee" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.convenienceFee || '', onChange: (e) => setSettlementFees({
                                                                    ...settlementFees,
                                                                    convenienceFee: parseFloat(e.target.value) || 0,
                                                                }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: "GST" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.gst || '', onChange: (e) => setSettlementFees({
                                                                    ...settlementFees,
                                                                    gst: parseFloat(e.target.value) || 0,
                                                                }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: "Gateway Charges" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.gatewayCharges || '', onChange: (e) => setSettlementFees({
                                                                    ...settlementFees,
                                                                    gatewayCharges: parseFloat(e.target.value) || 0,
                                                                }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: "Discount" }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.discount || '', onChange: (e) => setSettlementFees({
                                                                    ...settlementFees,
                                                                    discount: parseFloat(e.target.value) || 0,
                                                                }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [_jsx("button", { onClick: () => setShowSettlementModal(false), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSettlementConfirm, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Confirm Settlement' : 'Confirm' })] })] })] }))] }));
}
