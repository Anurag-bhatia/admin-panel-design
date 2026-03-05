import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreHorizontal, CheckCircle2, Search, UserPlus, Scale, ArrowRight, Edit, X, Receipt, } from 'lucide-react';
const TYPE_LABELS = {
    payAndClose: 'PPT',
    contest: 'Bulk',
};
const CHALLAN_TYPE_LABELS = {
    court: 'Court',
    online: 'Online',
};
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
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function IncidentRow({ incident, isSelected, users, lawyers, onSelect, onView, onValidate, onScreen, onAssignAgent, onAssignLawyer, onMoveQueue, onAddExpense, onUpdate, }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showAgentDropdown, setShowAgentDropdown] = useState(false);
    const [showLawyerDropdown, setShowLawyerDropdown] = useState(false);
    const [showQueueDropdown, setShowQueueDropdown] = useState(false);
    const [showSettlementModal, setShowSettlementModal] = useState(false);
    const [settlementFees, setSettlementFees] = useState({
        totalAmountReceived: 0,
        challanAmount: 0,
        convenienceFee: 0,
        gst: 0,
        gatewayCharges: 0,
        discount: 0,
    });
    const [pendingQueue, setPendingQueue] = useState(null);
    const [isAddingExpense, setIsAddingExpense] = useState(false);
    const handleMoveToQueue = (queue) => {
        if (queue === 'settled' || queue === 'notSettled') {
            setPendingQueue(queue);
            setIsAddingExpense(false);
            setShowSettlementModal(true);
            setShowMenu(false);
            setShowQueueDropdown(false);
        }
        else {
            onMoveQueue?.(queue);
            setShowMenu(false);
        }
    };
    const handleAddExpense = () => {
        setIsAddingExpense(true);
        setPendingQueue(null);
        setShowSettlementModal(true);
        setShowMenu(false);
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
    const assignedAgent = users.find((u) => u.id === incident.assignedAgentId);
    const assignedLawyer = lawyers.find((l) => l.id === incident.assignedLawyerId);
    return (_jsxs(_Fragment, { children: [_jsxs("tr", { className: `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''}`, onClick: onView, children: [_jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: (e) => onSelect(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800" }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: incident.incidentId }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: incident.source })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: incident.subscriberName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: incident.subscriberId })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm text-slate-700 dark:text-slate-300", children: incident.vehicle }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${incident.type === 'contest'
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                                : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'}`, children: TYPE_LABELS[incident.type] }) }), _jsx("td", { className: "px-4 py-3", children: incident.challanType === 'court' || incident.challanType === 'online' ? (_jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${incident.challanType === 'court'
                                ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400'
                                : 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'}`, children: CHALLAN_TYPE_LABELS[incident.challanType] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(incident.createdAt) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(incident.createdAt) })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(incident.lastUpdatedAt) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(incident.lastUpdatedAt) })] }) }), _jsx("td", { className: "px-4 py-3", children: incident.queue === 'newIncidents' || incident.queue === 'screening' ? (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })) : assignedAgent ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300", children: assignedAgent.name.charAt(0) }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: assignedAgent.name.split(' ')[0] })] })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3", children: assignedLawyer ? (_jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300 truncate max-w-[120px]", children: assignedLawyer.name.replace('Adv. ', '') })) : (_jsx("span", { className: "text-sm text-slate-400 dark:text-slate-500", children: "\u2014" })) }), _jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-slate-500" }) }), showMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => {
                                                setShowMenu(false);
                                                setShowAgentDropdown(false);
                                                setShowLawyerDropdown(false);
                                                setShowQueueDropdown(false);
                                            } }), _jsx("div", { className: "absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: incident.queue === 'notSettled' ? (_jsxs("button", { onClick: () => {
                                                    handleMoveToQueue('refund');
                                                }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(ArrowRight, { className: "h-4 w-4" }), "Send to Refund"] })) : (_jsxs(_Fragment, { children: [_jsxs("button", { onClick: () => {
                                                            if (incident.queue === 'newIncidents') {
                                                                onValidate?.();
                                                                setShowMenu(false);
                                                            }
                                                        }, disabled: incident.queue !== 'newIncidents', className: `w-full flex items-center gap-2 px-3 py-2 text-sm ${incident.queue !== 'newIncidents'
                                                            ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsx(CheckCircle2, { className: "h-4 w-4" }), "Validate"] }), _jsxs("button", { onClick: () => {
                                                            if (incident.queue === 'newIncidents') {
                                                                onScreen?.();
                                                                setShowMenu(false);
                                                            }
                                                        }, disabled: incident.queue !== 'newIncidents', className: `w-full flex items-center gap-2 px-3 py-2 text-sm ${incident.queue !== 'newIncidents'
                                                            ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsx(Search, { className: "h-4 w-4" }), "Screen"] }), _jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 my-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => incident.queue !== 'newIncidents' && setShowAgentDropdown(!showAgentDropdown), disabled: incident.queue === 'newIncidents', className: `w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${incident.queue === 'newIncidents'
                                                                    ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4" }), "Assign Agent"] }), _jsx(ArrowRight, { className: "h-3 w-3" })] }), showAgentDropdown && incident.queue !== 'newIncidents' && (_jsx("div", { className: "absolute left-full top-0 ml-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto", children: users.map((user) => (_jsxs("button", { onClick: () => {
                                                                        onAssignAgent?.(user.id);
                                                                        setShowMenu(false);
                                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("div", { className: "h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs", children: user.name.charAt(0) }), user.name] }, user.id))) }))] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => incident.queue !== 'newIncidents' && setShowLawyerDropdown(!showLawyerDropdown), disabled: incident.queue === 'newIncidents', className: `w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${incident.queue === 'newIncidents'
                                                                    ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(Scale, { className: "h-4 w-4" }), "Assign Lawyer"] }), _jsx(ArrowRight, { className: "h-3 w-3" })] }), showLawyerDropdown && incident.queue !== 'newIncidents' && (_jsx("div", { className: "absolute left-full top-0 ml-1 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-48 overflow-y-auto", children: lawyers.map((lawyer) => (_jsxs("button", { onClick: () => {
                                                                        onAssignLawyer?.(lawyer.id);
                                                                        setShowMenu(false);
                                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(Scale, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "truncate", children: lawyer.name })] }, lawyer.id))) }))] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => incident.queue !== 'newIncidents' && setShowQueueDropdown(!showQueueDropdown), disabled: incident.queue === 'newIncidents', className: `w-full flex items-center justify-between gap-2 px-3 py-2 text-sm ${incident.queue === 'newIncidents'
                                                                    ? 'text-slate-400 dark:text-slate-500 cursor-not-allowed'
                                                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(ArrowRight, { className: "h-4 w-4" }), "Move Queue"] }), _jsx(ArrowRight, { className: "h-3 w-3" })] }), showQueueDropdown && incident.queue !== 'newIncidents' && (_jsx("div", { className: "absolute left-full top-0 ml-1 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: QUEUE_OPTIONS.filter((q) => q.key !== incident.queue).map((queue) => (_jsx("button", { onClick: () => handleMoveToQueue(queue.key), className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: queue.label }, queue.key))) }))] }), _jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 my-1" }), _jsxs("button", { onClick: handleAddExpense, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(Receipt, { className: "h-4 w-4" }), "Add Expense"] }), _jsxs("button", { onClick: () => {
                                                            onUpdate?.();
                                                            setShowMenu(false);
                                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx(Edit, { className: "h-4 w-4" }), "Update"] })] })) })] }))] }) })] }), showSettlementModal && (_jsx("tr", { children: _jsx("td", { colSpan: 10, className: "p-0", children: _jsxs("div", { className: "fixed inset-0 z-50 flex items-center justify-center", children: [_jsx("div", { className: "absolute inset-0 bg-black/50", onClick: () => setShowSettlementModal(false) }), _jsxs("div", { className: "relative bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-md mx-4 p-6", children: [_jsx("button", { onClick: () => setShowSettlementModal(false), className: "absolute top-4 right-4 p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) }), _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Settlement Details' : 'Not Settled Details' }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-6", children: isAddingExpense
                                            ? 'Enter the expense details for this challan.'
                                            : `Enter the fee details before marking as ${pendingQueue === 'settled' ? 'settled' : 'not settled'}.` }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: ["Total Amount Received ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("div", { className: "relative", children: [_jsx("span", { className: "absolute left-3 top-1/2 -translate-y-1/2 text-slate-500", children: "\u20B9" }), _jsx("input", { type: "number", value: settlementFees.totalAmountReceived || '', onChange: (e) => setSettlementFees({
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
                                                                        }), placeholder: "0.00", className: "w-full pl-8 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" })] })] })] })] }), _jsxs("div", { className: "mt-6 flex justify-end gap-3", children: [_jsx("button", { onClick: () => setShowSettlementModal(false), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleSettlementConfirm, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: isAddingExpense ? 'Add Expense' : pendingQueue === 'settled' ? 'Confirm Settlement' : 'Confirm' })] })] })] }) }) }))] }));
}
