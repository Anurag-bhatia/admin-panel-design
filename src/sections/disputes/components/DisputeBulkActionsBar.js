import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { X, AlertTriangle, ArrowRightLeft, ChevronDown, } from 'lucide-react';
import { AssignDepartmentModal } from './AssignDepartmentModal';
import { SettleDisputeModal } from './SettleDisputeModal';
import { RerouteDisputeModal } from './RerouteDisputeModal';
import { MoveToInProgressModal } from './MoveToInProgressModal';
import { HoldDisputeModal } from './HoldDisputeModal';
const PRIORITY_OPTIONS = [
    { key: 'critical', label: 'Critical' },
    { key: 'high', label: 'High' },
    { key: 'medium', label: 'Medium' },
    { key: 'low', label: 'Low' },
];
const MOVE_STAGE_OPTIONS = [
    { key: 'new_incident', label: 'New Incident' },
    { key: 'in_progress', label: 'In Progress' },
    { key: 'transfer_to_department', label: 'Transfer to Department' },
    { key: 'reroute', label: 'Reroute' },
    { key: 'settled', label: 'Settled' },
    { key: 'hold', label: 'Hold' },
];
export function DisputeBulkActionsBar({ selectedCount, currentStage, onClearSelection, onChangePriority, onMoveStage, }) {
    const [showPriorityDropdown, setShowPriorityDropdown] = useState(false);
    const [showMoveDropdown, setShowMoveDropdown] = useState(false);
    const [showDepartmentModal, setShowDepartmentModal] = useState(false);
    const [showSettleModal, setShowSettleModal] = useState(false);
    const [showRerouteModal, setShowRerouteModal] = useState(false);
    const [showInProgressModal, setShowInProgressModal] = useState(false);
    const [showHoldModal, setShowHoldModal] = useState(false);
    return (_jsxs("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300", children: [_jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedCount }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: onClearSelection, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                            setShowPriorityDropdown(!showPriorityDropdown);
                                            setShowMoveDropdown(false);
                                        }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(AlertTriangle, { className: "h-4 w-4" }), _jsx("span", { children: "Change Priority" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showPriorityDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowPriorityDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: PRIORITY_OPTIONS.map((priority) => (_jsx("button", { onClick: () => {
                                                        onChangePriority?.(priority.key);
                                                        setShowPriorityDropdown(false);
                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: priority.label }, priority.key))) })] }))] }), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                            setShowMoveDropdown(!showMoveDropdown);
                                            setShowPriorityDropdown(false);
                                        }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(ArrowRightLeft, { className: "h-4 w-4" }), _jsx("span", { children: "Move Ticket" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showMoveDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowMoveDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-44 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1", children: MOVE_STAGE_OPTIONS.filter((s) => s.key !== currentStage).map((stage) => (_jsx("button", { onClick: () => {
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
                                                    }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: stage.label }, stage.key))) })] }))] })] })] }), showDepartmentModal && (_jsx(AssignDepartmentModal, { onAssign: (department) => {
                    onMoveStage?.('transfer_to_department', department);
                    setShowDepartmentModal(false);
                }, onClose: () => setShowDepartmentModal(false) })), showSettleModal && (_jsx(SettleDisputeModal, { onSettle: (resolution) => {
                    console.log('Bulk settle disputes with resolution:', resolution);
                    onMoveStage?.('settled');
                    setShowSettleModal(false);
                }, onClose: () => setShowSettleModal(false) })), showRerouteModal && (_jsx(RerouteDisputeModal, { onReroute: (details) => {
                    console.log('Bulk reroute disputes with details:', details);
                    onMoveStage?.('reroute');
                    setShowRerouteModal(false);
                }, onClose: () => setShowRerouteModal(false) })), showInProgressModal && (_jsx(MoveToInProgressModal, { onConfirm: (notes) => {
                    console.log('Bulk move disputes to In Progress with notes:', notes);
                    onMoveStage?.('in_progress');
                    setShowInProgressModal(false);
                }, onClose: () => setShowInProgressModal(false) })), showHoldModal && (_jsx(HoldDisputeModal, { onConfirm: (reason, attachments) => {
                    console.log('Bulk move disputes to Hold with reason:', reason, 'attachments:', attachments);
                    onMoveStage?.('hold');
                    setShowHoldModal(false);
                }, onClose: () => setShowHoldModal(false) }))] }));
}
