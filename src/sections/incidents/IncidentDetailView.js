import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { ArrowLeft, Clock, UserPlus, Scale, Search, IndianRupee, ArrowRightLeft, ChevronDown } from 'lucide-react';
import { ActivityTab } from './components/ActivityTab';
import { NotesTab } from './components/NotesTab';
import { DetailsTab } from './components/DetailsTab';
import { CallSummaryTab } from './components/CallSummaryTab';
import { AddExpenseModal } from './components/AddExpenseModal';
import { MoveQueueDetailsModal, } from './components/MoveQueueDetailsModal';
const STAGES_REQUIRING_DETAILS = [
    'refundRequested',
    'refundCompleted',
    'notSettled',
    'settled',
    'hold',
];
const CASE_CATEGORY_LABELS = {
    iaStart: 'IA Start',
    wills24: 'Wills 24',
    legalNotice: 'Legal Notice',
    others: 'Others',
    litigation: 'Litigation',
    laas: 'LAAS',
    accident: 'Accident',
    liveChallan: 'Live Challan',
    oldChallan: 'Old Challan',
    ndps: 'NDPS',
    employmentLabour: 'Employment and Labour Case',
};
// Sample notes data for demo
const SAMPLE_NOTES = [
    {
        id: 'note-001',
        content: 'Subscriber confirmed they were driving the vehicle at the time of violation. Need to verify RC documents.',
        createdAt: '2024-01-14T10:30:00Z',
        createdById: 'usr-001',
        createdByName: 'Arun Kumar',
    },
    {
        id: 'note-002',
        content: 'Challan amount seems higher than usual for this type of violation. Check with lawyer if this can be contested.',
        createdAt: '2024-01-13T15:45:00Z',
        createdById: 'usr-002',
        createdByName: 'Priya Sharma',
    },
];
export function IncidentDetailView({ incident, subscriber, assignedAgent, assignedLawyer, followUps, timelineActivities, documents, onBack, onAddFollowUp, onUploadDocument, onViewDocument, onDeleteDocument, onAssignAgent, onAssignLawyer, onMoveQueue, onScreen, onUpdate, }) {
    const isCases = incident.workType === 'case';
    const [activeTab, setActiveTab] = useState('activity');
    const [notes, setNotes] = useState(SAMPLE_NOTES);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
    const [showMoveDropdown, setShowMoveDropdown] = useState(false);
    const [pendingMoveStage, setPendingMoveStage] = useState(null);
    const screeningRuns = useMemo(() => (isCases ? [] : buildScreeningRuns(incident, subscriber)), [incident, subscriber, isCases]);
    const [activeScreeningId, setActiveScreeningId] = useState(screeningRuns[0]?.id ?? null);
    const activeScreeningRun = screeningRuns.find((run) => run.id === activeScreeningId) ?? screeningRuns[0] ?? null;
    const handleAddFollowUp = (followUp) => {
        onAddFollowUp?.(incident.id, followUp);
    };
    const handleUploadDocument = (file, type) => {
        onUploadDocument?.(incident.id, file, type);
    };
    const handleAssignAgent = (agentId) => {
        onAssignAgent?.(incident.id, agentId);
    };
    const handleAssignLawyer = (lawyerId) => {
        onAssignLawyer?.(incident.id, lawyerId);
    };
    const handleMoveQueue = (queue) => {
        if (STAGES_REQUIRING_DETAILS.includes(queue)) {
            setPendingMoveStage(queue);
            return;
        }
        onMoveQueue?.(incident.id, queue);
    };
    const handleMoveQueueWithDetails = (payload) => {
        if (!pendingMoveStage)
            return;
        console.log('Move queue details:', pendingMoveStage, payload);
        onMoveQueue?.(incident.id, pendingMoveStage);
        setPendingMoveStage(null);
    };
    const handleScreen = () => {
        onScreen?.(incident.id);
    };
    const handleAddNote = (content) => {
        const newNote = {
            id: `note-${Date.now()}`,
            content,
            createdAt: new Date().toISOString(),
            createdById: 'usr-001',
            createdByName: 'Current User',
        };
        setNotes([newNote, ...notes]);
    };
    const handleEditNote = (noteId, content) => {
        setNotes(notes.map(note => note.id === noteId
            ? { ...note, content, updatedAt: new Date().toISOString() }
            : note));
    };
    const handleDeleteNote = (noteId) => {
        setNotes(notes.filter(note => note.id !== noteId));
    };
    const getTatInfo = (deadline) => {
        const now = new Date();
        const deadlineDate = new Date(deadline);
        const diffTime = deadlineDate.getTime() - now.getTime();
        const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const totalDays = 45;
        const daysUsed = totalDays - daysLeft;
        const percentage = Math.min(100, Math.max(0, (daysUsed / totalDays) * 100));
        if (daysLeft <= 0)
            return { daysLeft, percentage: 100, status: 'critical' };
        if (daysLeft <= 7)
            return { daysLeft, percentage, status: 'warning' };
        return { daysLeft, percentage, status: 'ok' };
    };
    const tatInfo = getTatInfo(incident.tatDeadline);
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onBack, className: "p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white font-mono", children: incident.incidentId }), incident.isExpress && (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800", children: "Express" }))] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => setShowExpenseModal(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(IndianRupee, { className: "h-4 w-4" }), "Add Expense"] }), !isCases && (_jsxs("button", { onClick: handleScreen, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(Search, { className: "h-4 w-4" }), "Screen"] })), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowMoveDropdown(!showMoveDropdown), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(ArrowRightLeft, { className: "h-4 w-4" }), "Move Ticket", _jsx(ChevronDown, { className: "h-4 w-4" })] }), showMoveDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowMoveDropdown(false) }), _jsx("div", { className: "absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: [
                                                        { key: 'newIncidents', label: 'New Incidents' },
                                                        { key: 'inProgress', label: 'In Progress' },
                                                        { key: 'settled', label: 'Settled' },
                                                        { key: 'notSettled', label: 'Not Settled' },
                                                        { key: 'hold', label: 'Hold' },
                                                        { key: 'refundRequested', label: 'Refund Requested' },
                                                        { key: 'refundCompleted', label: 'Refund Completed' },
                                                    ]
                                                        .filter((q) => q.key !== incident.queue)
                                                        .map((queue) => (_jsx("button", { onClick: () => {
                                                            handleMoveQueue(queue.key);
                                                            setShowMoveDropdown(false);
                                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: queue.label }, queue.key))) })] }))] })] })] }) }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "TAT Deadline" }), _jsx(Clock, { className: `h-4 w-4 ${tatInfo.status === 'critical'
                                                        ? 'text-red-500'
                                                        : tatInfo.status === 'warning'
                                                            ? 'text-amber-500'
                                                            : 'text-emerald-500'}` })] }), _jsx("div", { className: `text-2xl font-bold ${tatInfo.status === 'critical'
                                                ? 'text-red-600 dark:text-red-400'
                                                : tatInfo.status === 'warning'
                                                    ? 'text-amber-600 dark:text-amber-400'
                                                    : 'text-slate-900 dark:text-white'}`, children: tatInfo.daysLeft <= 0 ? 'Overdue' : `${Math.abs(tatInfo.daysLeft)} days` }), _jsx("div", { className: "mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full rounded-full transition-all ${tatInfo.status === 'critical'
                                                    ? 'bg-red-500'
                                                    : tatInfo.status === 'warning'
                                                        ? 'bg-amber-500'
                                                        : 'bg-emerald-500'}`, style: { width: `${tatInfo.percentage}%` } }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Subscriber" }), _jsx("div", { className: "text-base font-semibold text-slate-900 dark:text-white", children: subscriber.name }), _jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: subscriber.contactPerson }), _jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: subscriber.phone })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Vehicle" }), _jsx("div", { className: "text-base font-mono font-semibold text-slate-900 dark:text-white", children: incident.vehicle }), isCases ? (_jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.type === 'onSpot'
                                                        ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                                                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'}`, children: incident.type === 'onSpot' ? 'On Spot' : 'On Call' }), incident.caseCategory && (_jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400", children: CASE_CATEGORY_LABELS[incident.caseCategory] || incident.caseCategory }))] })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: ["#", incident.challanNumber] }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.type === 'contest'
                                                                ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                                : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`, children: incident.type === 'payAndClose' ? 'PPT' : 'Bulk' }), (incident.challanType === 'court' || incident.challanType === 'online') && (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.challanType === 'court'
                                                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                                                : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'}`, children: incident.challanType === 'court' ? 'Court' : 'Online' }))] })] }))] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-3", children: "Assignments" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: assignedAgent?.name || 'No agent assigned' })] }), _jsx("button", { onClick: () => onAssignAgent?.(incident.id, ''), className: "text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium", children: assignedAgent ? 'Change' : 'Assign' })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Scale, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: assignedLawyer?.name.replace('Adv. ', '') || 'No lawyer assigned' })] }), _jsx("button", { onClick: () => onAssignLawyer?.(incident.id, ''), className: "text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium", children: assignedLawyer ? 'Change' : 'Assign' })] })] })] })] }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "flex", children: [!isCases && (_jsx("button", { onClick: () => setActiveTab('screeningDetails'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'screeningDetails'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Screening Details" })), _jsx("button", { onClick: () => setActiveTab('activity'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'activity'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Activity" }), _jsx("button", { onClick: () => setActiveTab('notes'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'notes'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Notes" }), _jsx("button", { onClick: () => setActiveTab('details'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'details'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Details" }), _jsx("button", { onClick: () => setActiveTab('callSummary'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'callSummary'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Call Summary" })] }) }), _jsxs("div", { className: "min-h-[400px]", children: [activeTab === 'screeningDetails' && !isCases && (_jsxs("div", { className: "p-5 space-y-4", children: [screeningRuns.length > 0 && (_jsx("div", { className: "flex items-center gap-2 flex-wrap", children: screeningRuns.map((run) => {
                                                            const isActive = run.id === (activeScreeningRun?.id ?? null);
                                                            return (_jsx("button", { type: "button", onClick: () => setActiveScreeningId(run.id), className: `inline-flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors ${isActive
                                                                    ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white'
                                                                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { className: "font-medium", children: run.dateLabel }) }, run.id));
                                                        }) })), activeScreeningRun && (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsx("div", { className: "flex items-center justify-between px-6 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-800/40", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: activeScreeningRun.dateLabel }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: ["\u00B7 ", activeScreeningRun.timeLabel] })] }) }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-5", children: [_jsx(Detail, { label: "Violater", value: activeScreeningRun.violaterName }), _jsx(Detail, { label: "Challan Number", value: _jsx("span", { className: "font-mono", children: activeScreeningRun.challanNumber }) }), _jsx(Detail, { label: "State", value: activeScreeningRun.state }), _jsx(Detail, { label: "Date", value: activeScreeningRun.dateLabel }), _jsx(Detail, { label: "Offence", value: activeScreeningRun.offence }), _jsx(Detail, { label: "Place", value: activeScreeningRun.place }), _jsx(Detail, { label: "RTO", value: activeScreeningRun.rto }), _jsx(Detail, { label: "Amount", value: `₹${activeScreeningRun.amount.toLocaleString('en-IN')}` }), _jsx(Detail, { label: "Virtual Status", value: _jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded text-xs font-mono font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300", children: activeScreeningRun.virtualStatus }) }), _jsx(Detail, { label: "Virtual Amount", value: `₹${activeScreeningRun.virtualAmount.toLocaleString('en-IN')}` }), _jsx(Detail, { label: "Status", value: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${activeScreeningRun.statusClass}`, children: activeScreeningRun.status }) }), _jsx(Detail, { label: "Physical Court", value: _jsx("span", { className: "text-sm font-medium text-purple-600 dark:text-purple-400", children: activeScreeningRun.court }) }), _jsx(Detail, { label: "Vehicle Impound", value: activeScreeningRun.vehicleImpound }), _jsx(Detail, { label: "Document Impound", value: activeScreeningRun.docImpound }), _jsx(Detail, { label: "Disposed", value: activeScreeningRun.disposed })] }) })] }))] })), activeTab === 'activity' && (_jsx(ActivityTab, { followUps: followUps, activities: timelineActivities, onAddFollowUp: handleAddFollowUp })), activeTab === 'notes' && (_jsx(NotesTab, { notes: notes, onAddNote: handleAddNote, onEditNote: handleEditNote, onDeleteNote: handleDeleteNote })), activeTab === 'details' && (_jsx(DetailsTab, { incident: incident, subscriber: subscriber, documents: documents, onUploadDocument: handleUploadDocument, onViewDocument: onViewDocument, onDeleteDocument: onDeleteDocument })), activeTab === 'callSummary' && (_jsx(CallSummaryTab, {}))] })] }) })] }) }), showExpenseModal && (_jsx(AddExpenseModal, { incidentId: incident.incidentId, workType: isCases ? 'cases' : 'challans', onSubmit: (expense) => {
                    console.log('Expense added:', expense);
                    setShowExpenseModal(false);
                }, onCancel: () => setShowExpenseModal(false) })), pendingMoveStage && (_jsx(MoveQueueDetailsModal, { incidentId: incident.incidentId, stage: pendingMoveStage, onSubmit: handleMoveQueueWithDetails, onCancel: () => setPendingMoveStage(null) }))] }));
}
function Detail({ label, value }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: label }), _jsx("div", { className: "mt-1 text-sm font-medium text-slate-900 dark:text-white", children: value })] }));
}
function buildScreeningRuns(incident, subscriber) {
    const base = {
        violaterName: subscriber.contactPerson,
        challanNumber: incident.challanNumber,
        state: incident.state,
        offence: incident.offence || 'Over Speeding',
        place: `NH-8, ${incident.state}`,
        rto: `${incident.state} RTO`,
        amount: incident.amount,
        virtualAmount: incident.amount,
    };
    const createdMs = new Date(incident.createdAt).getTime();
    const day = 24 * 60 * 60 * 1000;
    const runsMeta = [
        {
            offsetDays: 14,
            virtualStatus: '04',
            status: 'Court Pending',
            statusClass: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400',
            court: 'Hearing Awaited',
            vehicleImpound: 'No',
            docImpound: 'None',
            disposed: 'No',
        },
        {
            offsetDays: 7,
            virtualStatus: '03',
            status: 'In Progress',
            statusClass: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400',
            court: 'Notice Issued',
            vehicleImpound: 'No',
            docImpound: 'None',
            disposed: 'No',
        },
        {
            offsetDays: 0,
            virtualStatus: '02',
            status: 'Pending',
            statusClass: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
            court: 'Not Listed',
            vehicleImpound: 'No',
            docImpound: 'None',
            disposed: 'No',
        },
    ];
    return runsMeta.map((meta, idx) => {
        const runDate = new Date(createdMs + meta.offsetDays * day);
        return {
            id: `screening-${idx}`,
            number: runsMeta.length - idx,
            dateLabel: runDate.toLocaleDateString('en-IN', { dateStyle: 'medium' }),
            timeLabel: runDate.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
            }),
            ...base,
            ...meta,
        };
    });
}
