import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { MoreHorizontal, ArrowRightLeft, AlertTriangle, ChevronDown, } from 'lucide-react';
import { AssignDepartmentModal } from './AssignDepartmentModal';
import { SettleDisputeModal } from './SettleDisputeModal';
import { RerouteDisputeModal } from './RerouteDisputeModal';
import { MoveToInProgressModal } from './MoveToInProgressModal';
import { HoldDisputeModal } from './HoldDisputeModal';
const MOVE_STAGE_OPTIONS = [
    { key: 'new_incident', label: 'New Incident' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'transfer_to_department', label: 'Transfer to Department' },
    { key: 'reroute', label: 'Reroute' },
    { key: 'settled', label: 'Settled' },
    { key: 'hold', label: 'Hold' },
];
const TYPE_LABELS = {
    refund: {
        label: 'Refund',
        className: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    },
    '48hr_refund': {
        label: '48 hr Refund',
        className: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    },
    tat_breach: {
        label: 'TAT Breach',
        className: 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400',
    },
    payment_issue: {
        label: 'Payment Issue',
        className: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    },
    legal_escalation: {
        label: 'Legal Escalation',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
    information_missing: {
        label: 'Information Missing',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    incorrect_data: {
        label: 'Incorrect Data',
        className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    },
};
const PRIORITY_LABELS = {
    critical: {
        label: 'Critical',
        className: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
    },
    high: {
        label: 'High',
        className: 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-400',
    },
    medium: {
        label: 'Medium',
        className: 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400',
    },
    low: {
        label: 'Low',
        className: 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
    },
};
const RAISED_BY_LABELS = {
    customer: 'Customer',
    subscriber: 'Subscriber',
    internal: 'Internal',
};
const PRIORITY_OPTIONS = [
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
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
export function DisputeRow({ dispute, isSelected, showDepartment = false, onSelect, onView, onMoveStage, onEscalate, onChangePriority, }) {
    const [showMenu, setShowMenu] = useState(false);
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showMoveDropdown, setShowMoveDropdown] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showSettleModal, setShowSettleModal] = useState(false);
    const [showRerouteModal, setShowRerouteModal] = useState(false);
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showHoldModal, setShowHoldModal] = useState(false);
    const typeConfig = TYPE_LABELS[dispute.disputeType] || { label: dispute.disputeType, className: '' };
    const priorityConfig = PRIORITY_LABELS[dispute.priority] || { label: dispute.priority, className: '' };
    return (_jsxs("tr", { className: `border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${isSelected ? 'bg-cyan-50 dark:bg-cyan-900/10' : ''}`, onClick: onView, children: [_jsx("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: isSelected, onChange: (e) => onSelect(e.target.checked), className: "h-4 w-4 rounded border-slate-300 dark:border-slate-600 text-cyan-600 focus:ring-cyan-500 dark:bg-slate-800" }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "font-mono text-sm font-medium text-slate-900 dark:text-white", children: dispute.disputeId.replace(/-/g, '') }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: dispute.subscriberName }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: dispute.linkedEntity.id })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${typeConfig.className}`, children: typeConfig.label }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(dispute.createdOn) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(dispute.createdOn) })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsxs("div", { children: [_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: formatDate(dispute.lastUpdated) }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatTime(dispute.lastUpdated) })] }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-1 rounded text-xs font-medium ${priorityConfig.className}`, children: priorityConfig.label }) }), showDepartment && (_jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: dispute.transferredToDepartment || '—' }) })), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: dispute.product }) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400 truncate max-w-[140px] block", children: dispute.source }) }), _jsxs("td", { className: "px-4 py-3", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowMenu(!showMenu), className: "p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors", children: _jsx(MoreHorizontal, { className: "h-4 w-4 text-slate-500" }) }), showMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => {
                                            setShowMenu(false);
                                            setShowPriorityDropdown(false);
                                            setShowMoveDropdown(false);
                                        } }), _jsxs("div", { className: "absolute right-0 top-full mt-1 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowMoveDropdown(!showMoveDropdown), className: "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(ArrowRightLeft, { className: "h-4 w-4" }), "Move Ticket"] }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showMoveDropdown && (_jsx("div", { className: "absolute right-full top-0 mr-1 w-52 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: MOVE_STAGE_OPTIONS.filter((s) => s.key !== dispute.status).map((stage) => (_jsx("button", { onClick: () => {
                                                                setShowMenu(false);
                                                                setShowMoveDropdown(false);
                                                                if (stage.key === 'transfer_to_department') {
                                                                    setShowDepartmentModal(true);
                                                                }
                                                                else if (stage.key === 'reroute') {
                                                                    setShowRerouteModal(true);
                                                                }
                                                                else if (stage.key === 'settled') {
                                                                    setShowSettleModal(true);
                                                                }
                                                                else if (stage.key === 'in_progress') {
                                                                    setShowInProgressModal(true);
                                                                }
                                                                else if (stage.key === 'hold') {
                                                                    setShowHoldModal(true);
                                                                }
                                                                else {
                                                                    onMoveStage?.(stage.key);
                                                                }
                                                            }, className: "w-full text-left px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 whitespace-nowrap", children: stage.label }, stage.key))) }))] }), _jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 my-1" }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                            setShowPriorityDropdown(!showPriorityDropdown);
                                                        }, className: "w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsxs("span", { className: "flex items-center gap-2", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), "Change Priority"] }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showPriorityDropdown && (_jsx("div", { className: "absolute right-full top-0 mr-1 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: PRIORITY_OPTIONS.map((priority) => (_jsx("button", { onClick: () => {
                                                                onChangePriority?.(priority.key);
                                                                setShowMenu(false);
                                                            }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: priority.label }, priority.key))) }))] })] })] }))] }), showDepartmentModal && (_jsx(AssignDepartmentModal, { currentDepartment: dispute.transferredToDepartment, onAssign: () => setShowDepartmentModal(false), onClose: () => setShowDepartmentModal(false) })), showSettleModal && (_jsx(SettleDisputeModal, { onSettle: (resolution) => {
                            console.log('Settle dispute:', dispute.id, 'resolution:', resolution);
                            onMoveStage?.('settled');
                            setShowSettleModal(false);
                        }, onClose: () => setShowSettleModal(false) })), showRerouteModal && (_jsx(RerouteDisputeModal, { onReroute: (details) => {
                            console.log('Reroute dispute:', dispute.id, 'details:', details);
                            onMoveStage?.('reroute');
                            setShowRerouteModal(false);
                        }, onClose: () => setShowRerouteModal(false) })), showInProgressModal && (_jsx(MoveToInProgressModal, { onConfirm: (notes) => {
                            console.log('Move dispute to In Progress:', dispute.id, 'notes:', notes);
                            onMoveStage?.('in_progress');
                            setShowInProgressModal(false);
                        }, onClose: () => setShowInProgressModal(false) })), showHoldModal && (_jsx(HoldDisputeModal, { onConfirm: (reason, attachments) => {
                            console.log('Move dispute to Hold:', dispute.id, 'reason:', reason, 'attachments:', attachments);
                            onMoveStage?.('hold');
                            setShowHoldModal(false);
                        }, onClose: () => setShowHoldModal(false) }))] })] }));
}
