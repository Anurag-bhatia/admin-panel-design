import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { ArrowLeft, Building2, FileText, UserPlus, MessageSquare, Upload, ChevronDown, Clock } from 'lucide-react';
function InfoField({ label, value }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 font-medium mb-1", children: label }), _jsx("p", { className: "text-sm text-slate-900 dark:text-slate-50", children: value })] }));
}
export function LeadDetailView({ lead, timelineActivities, documents, users, onClose, onEdit, onAssign, onChangeStatus, onAddFollowUp, onUploadDocument }) {
    const [activeTab, setActiveTab] = useState('details');
    const [showStatusMenu, setShowStatusMenu] = useState(false);
    const leadTimeline = timelineActivities.filter(activity => activity.leadId === lead.id);
    const leadDocuments = documents.filter(doc => doc.leadId === lead.id);
    const assignedUser = users.find(u => u.id === lead.assignedTo);
    const statusOptions = [
        { value: 'new', label: 'New' },
        { value: 'assigned', label: 'Assigned' },
        { value: 'follow-up', label: 'Follow-up' },
        { value: 'quotations', label: 'Quotations' },
        { value: 'projected', label: 'Projected' },
        { value: 'invoiced', label: 'Ready to Invoice' },
        { value: 'sales', label: 'Sales' },
        { value: 'lost', label: 'Lost' },
    ];
    const handleStatusChange = (newStatus) => {
        onChangeStatus?.(lead.id, newStatus);
        setShowStatusMenu(false);
    };
    const getStatusBadgeClasses = (status) => {
        const baseClasses = 'px-3 py-1.5 text-xs font-medium rounded-full';
        const variants = {
            new: 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            assigned: 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
            'follow-up': 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
            quotations: 'bg-cyan-50 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
            projected: 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
            invoiced: 'bg-teal-50 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
            sales: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
            lost: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        };
        return `${baseClasses} ${variants[status]}`;
    };
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };
    const formatDateTime = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const getTabIcon = (tab) => {
        const icons = {
            details: _jsx(Building2, { className: "w-4 h-4" }),
            documents: _jsx(FileText, { className: "w-4 h-4" }),
        };
        return icons[tab];
    };
    return (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950 p-6 lg:p-8", children: _jsxs("div", { className: "max-w-7xl mx-auto", children: [
        _jsxs("div", { className: "flex items-center gap-4 mb-8", children: [
            _jsx("button", { onClick: onClose, className: "flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) }),
            _jsxs("div", { className: "flex-1", children: [
                _jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
                    _jsx("h1", { className: "text-3xl font-semibold text-slate-900 dark:text-slate-50", children: lead.companyAlias || lead.companyName }),
                    _jsxs("div", { className: "relative", children: [
                        _jsxs("button", { onClick: () => setShowStatusMenu(!showStatusMenu), className: `${getStatusBadgeClasses(lead.status)} inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity`, children: [lead.status.charAt(0).toUpperCase() + lead.status.slice(1).replace('-', ' '), _jsx(ChevronDown, { className: "w-3 h-3" })] }),
                        showStatusMenu && (_jsxs(_Fragment, { children: [
                            _jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowStatusMenu(false) }),
                            _jsx("div", { className: "absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-20", children: _jsx("div", { className: "py-1", children: statusOptions.map(option => (_jsxs("button", { onClick: () => handleStatusChange(option.value), className: `w-full px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-between ${lead.status === option.value ? 'bg-slate-50 dark:bg-slate-700' : ''}`, children: [_jsx("span", { className: "text-slate-900 dark:text-white", children: option.label }), lead.status === option.value && (_jsx("div", { className: "w-2 h-2 rounded-full bg-cyan-600" }))] }, option.value))) }) })
                        ] }))
                    ] })
                ] }),
                _jsxs("p", { className: "text-slate-500 dark:text-slate-400 mt-1", children: ["Lead ID: ", lead.id] })
            ] }),
            _jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                _jsxs("button", { onClick: onAddFollowUp, className: "flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors", children: [_jsx(MessageSquare, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Follow-up" })] }),
                _jsxs("button", { onClick: onAssign, className: "flex items-center gap-2 px-3 sm:px-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors", children: [_jsx(UserPlus, { className: "w-4 h-4" }), _jsx("span", { className: "hidden sm:inline", children: "Assign" })] }),
                _jsx("button", { onClick: onEdit, className: "px-4 py-2.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors", children: "Edit Details" })
            ] })
        ] }),
        _jsx("div", { className: "mb-6 -mx-6 lg:-mx-8 px-6 lg:px-8 overflow-x-auto", children: _jsx("div", { className: "flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit min-w-full", children: ['details', 'documents'].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab), className: `inline-flex items-center gap-2 px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium rounded-md transition-colors whitespace-nowrap flex-shrink-0 ${activeTab === tab ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: [getTabIcon(tab), tab.charAt(0).toUpperCase() + tab.slice(1)] }, tab))) }) }),
        activeTab === 'details' && (
            _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
                _jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6", children: [
                    _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mb-6", children: "Lead Information" }),
                    _jsxs("div", { className: "space-y-8", children: [
                        _jsxs("div", { children: [
                            _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4", children: "Classification" }),
                            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                                _jsx(InfoField, { label: "Company Name", value: lead.companyName }),
                                _jsx(InfoField, { label: "Company Alias", value: lead.companyAlias }),
                                _jsx(InfoField, { label: "Source", value: lead.source }),
                                _jsx(InfoField, { label: "Type", value: lead.type }),
                                _jsx(InfoField, { label: "Sub Type", value: lead.subType }),
                                _jsx(InfoField, { label: "LOTS For", value: lead.lotsFor }),
                                _jsx(InfoField, { label: "Number of Trucks", value: `${lead.numberOfTrucks}` }),
                                _jsx(InfoField, { label: "GST Number", value: lead.gstNumber })
                            ] })
                        ] }),
                        _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-800 pt-6", children: [
                            _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4", children: "POC Information" }),
                            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                                _jsx(InfoField, { label: "Contact Person", value: lead.contactPerson }),
                                _jsx(InfoField, { label: "Phone", value: lead.phoneNumber }),
                                _jsx(InfoField, { label: "Email", value: lead.emailId })
                            ] })
                        ] }),
                        _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-800 pt-6", children: [
                            _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4", children: "Location" }),
                            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                                _jsx(InfoField, { label: "Country", value: lead.country }),
                                _jsx(InfoField, { label: "State", value: lead.state }),
                                _jsx(InfoField, { label: "City", value: lead.city }),
                                _jsx(InfoField, { label: "Area", value: lead.area }),
                                _jsx(InfoField, { label: "Address Lane", value: lead.addressLane }),
                                _jsx(InfoField, { label: "Pin Code", value: lead.pinCode })
                            ] })
                        ] }),
                        _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-800 pt-6", children: [
                            _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4", children: "Assignment" }),
                            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                                _jsx(InfoField, { label: "Assigned To", value: assignedUser ? assignedUser.fullName : 'Unassigned' }),
                                assignedUser && _jsx(InfoField, { label: "Role", value: assignedUser.role }),
                                lead.assignedTeam && _jsx(InfoField, { label: "Team", value: lead.assignedTeam })
                            ] })
                        ] }),
                        _jsxs("div", { className: "border-t border-slate-200 dark:border-slate-800 pt-6", children: [
                            _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mb-4", children: "Metadata" }),
                            _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
                                _jsx(InfoField, { label: "Created", value: formatDate(lead.createdDate) }),
                                _jsx(InfoField, { label: "Last Activity", value: formatDate(lead.lastActivityDate) })
                            ] })
                        ] })
                    ] })
                ] }),
                _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6", children: [
                    _jsxs("div", { className: "flex items-center justify-between mb-4", children: [
                        _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50", children: "Activity Timeline" }),
                        _jsx("button", { onClick: onAddFollowUp, className: "text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:underline", children: "+ Add" })
                    ] }),
                    leadTimeline.length === 0 ? (
                        _jsxs("div", { className: "text-center py-12", children: [
                            _jsx(Clock, { className: "w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto mb-2" }),
                            _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No activities yet" })
                        ] })
                    ) : (
                        _jsx("div", { className: "space-y-4 max-h-[600px] overflow-y-auto", children: leadTimeline.map(activity => (
                            _jsxs("div", { className: "flex gap-3", children: [
                                _jsx("div", { className: "w-1.5 h-1.5 bg-cyan-600 rounded-full mt-2 shrink-0" }),
                                _jsxs("div", { className: "flex-1 pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0", children: [
                                    _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-50 mb-0.5", children: activity.description }),
                                    _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [activity.performedByName, " \u00B7 ", formatDateTime(activity.timestamp)] }),
                                    activity.details?.notes && (_jsx("p", { className: "text-xs text-slate-600 dark:text-slate-300 mt-1.5", children: activity.details.notes }))
                                ] })
                            ] }, activity.id)
                        )) })
                    )
                ] })
            ] })
        ),
        activeTab === 'documents' && (
            _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                    _jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: ["Documents (", leadDocuments.length, ")"] }),
                    _jsxs("button", { onClick: onUploadDocument, className: "inline-flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors", children: [_jsx(Upload, { className: "w-4 h-4" }), "Upload Document"] })
                ] }),
                leadDocuments.length === 0 ? (
                    _jsxs("div", { className: "text-center py-12", children: [
                        _jsx(FileText, { className: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" }),
                        _jsx("p", { className: "text-slate-500 dark:text-slate-400", children: "No documents uploaded yet" })
                    ] })
                ) : (
                    _jsx("div", { className: "space-y-2", children: leadDocuments.map(doc => (
                        _jsx("div", { className: "flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg", children:
                            _jsxs("div", { className: "flex items-center gap-3", children: [
                                _jsx(FileText, { className: "w-5 h-5 text-slate-400" }),
                                _jsxs("div", { children: [
                                    _jsx("p", { className: "font-medium text-slate-900 dark:text-slate-50", children: doc.fileName }),
                                    _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [doc.category, " \u2022 Uploaded ", formatDate(doc.uploadedDate)] })
                                ] })
                            ] })
                        }, doc.id)
                    )) })
                )
            ] })
        )
    ] }) }));
}
