import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Clock, UserPlus, Scale, CheckCircle, Search, IndianRupee } from 'lucide-react';
import { ActivityTab } from './components/ActivityTab';
import { NotesTab } from './components/NotesTab';
import { DetailsTab } from './components/DetailsTab';
import { CallSummaryTab } from './components/CallSummaryTab';
import { AddExpenseModal } from './components/AddExpenseModal';
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
export function IncidentDetailView({ incident, subscriber, assignedAgent, assignedLawyer, followUps, timelineActivities, documents, users, lawyers, onBack, onAddFollowUp, onUploadDocument, onViewDocument, onDeleteDocument, onAssignAgent, onAssignLawyer, onMoveQueue, onValidate, onScreen, onUpdate, }) {
    const [activeTab, setActiveTab] = useState('activity');
    const [notes, setNotes] = useState(SAMPLE_NOTES);
    const [showExpenseModal, setShowExpenseModal] = useState(false);
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
        onMoveQueue?.(incident.id, queue);
    };
    const handleValidate = () => {
        onValidate?.(incident.id);
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
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 py-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("button", { onClick: onBack, className: "p-2 -ml-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsx("h1", { className: "text-xl font-semibold text-slate-900 dark:text-white font-mono", children: incident.incidentId })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => setShowExpenseModal(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(IndianRupee, { className: "h-4 w-4" }), "Add Expense"] }), _jsxs("button", { onClick: handleValidate, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: [_jsx(CheckCircle, { className: "h-4 w-4" }), "Validate"] }), _jsxs("button", { onClick: handleScreen, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Search, { className: "h-4 w-4" }), "Screen"] })] })] }) }), _jsx("div", { className: "p-6", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-6", children: [_jsxs("div", { className: "lg:col-span-1 space-y-4", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("span", { className: "text-sm font-medium text-slate-500 dark:text-slate-400", children: "TAT Deadline" }), _jsx(Clock, { className: `h-4 w-4 ${tatInfo.status === 'critical'
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
                                                        : 'bg-emerald-500'}`, style: { width: `${tatInfo.percentage}%` } }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Subscriber" }), _jsx("div", { className: "text-base font-semibold text-slate-900 dark:text-white", children: subscriber.name }), _jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: subscriber.contactPerson }), _jsx("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: subscriber.phone })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Vehicle" }), _jsx("div", { className: "text-base font-mono font-semibold text-slate-900 dark:text-white", children: incident.vehicle }), _jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: ["#", incident.challanNumber] }), _jsxs("div", { className: "flex gap-2 mt-2", children: [_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.type === 'contest'
                                                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                                                        : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'}`, children: incident.type === 'payAndClose' ? 'PPT' : 'Bulk' }), (incident.challanType === 'court' || incident.challanType === 'online') && (_jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${incident.challanType === 'court'
                                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                                        : 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'}`, children: incident.challanType === 'court' ? 'Court' : 'Online' }))] })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("div", { className: "text-sm font-medium text-slate-500 dark:text-slate-400 mb-3", children: "Assignments" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(UserPlus, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: assignedAgent?.name || 'No agent assigned' })] }), _jsx("button", { onClick: () => onAssignAgent?.(incident.id, ''), className: "text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium", children: assignedAgent ? 'Change' : 'Assign' })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Scale, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300", children: assignedLawyer?.name.replace('Adv. ', '') || 'No lawyer assigned' })] }), _jsx("button", { onClick: () => onAssignLawyer?.(incident.id, ''), className: "text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 font-medium", children: assignedLawyer ? 'Change' : 'Assign' })] })] })] })] }), _jsx("div", { className: "lg:col-span-3", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700", children: _jsxs("div", { className: "flex", children: [_jsx("button", { onClick: () => setActiveTab('activity'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'activity'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Activity" }), _jsx("button", { onClick: () => setActiveTab('notes'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'notes'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Notes" }), _jsx("button", { onClick: () => setActiveTab('details'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'details'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Details" }), _jsx("button", { onClick: () => setActiveTab('callSummary'), className: `px-6 py-4 text-sm font-medium transition-colors border-b-2 ${activeTab === 'callSummary'
                                                        ? 'border-cyan-600 text-cyan-600 dark:border-cyan-400 dark:text-cyan-400'
                                                        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: "Call Summary" })] }) }), _jsxs("div", { className: "min-h-[400px]", children: [activeTab === 'activity' && (_jsx(ActivityTab, { followUps: followUps, activities: timelineActivities, onAddFollowUp: handleAddFollowUp })), activeTab === 'notes' && (_jsx(NotesTab, { notes: notes, onAddNote: handleAddNote, onEditNote: handleEditNote, onDeleteNote: handleDeleteNote })), activeTab === 'details' && (_jsx(DetailsTab, { incident: incident, subscriber: subscriber, documents: documents, onUploadDocument: handleUploadDocument, onViewDocument: onViewDocument, onDeleteDocument: onDeleteDocument })), activeTab === 'callSummary' && (_jsx(CallSummaryTab, {}))] })] }) })] }) }), showExpenseModal && (_jsx(AddExpenseModal, { incidentId: incident.incidentId, onSubmit: (expense) => {
                    console.log('Expense added:', expense);
                    setShowExpenseModal(false);
                }, onCancel: () => setShowExpenseModal(false) }))] }));
}
