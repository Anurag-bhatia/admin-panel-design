import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { Calendar, Clock, MoreVertical, Eye, Phone, MapPin, Truck, Building2 } from 'lucide-react';
import { LeadDetailView } from './LeadDetailView';
import { EditLeadModal } from './EditLeadModal';
import { AddFollowUpModal } from './AddFollowUpModal';
import { UploadDocumentModal } from './UploadDocumentModal';
export function MyLeads({ currentUser, leads, todaysMeetings, todaysPriorities, timelineActivities, users, leadSources, serviceTypes, serviceSubTypes, activityTypes, documentCategories, onViewLead, onLogFollowUp, onSendQuotation, onMarkConverted, onMarkLost, onEditLead, onAddFollowUp, onUploadDocument }) {
    const [activeTab, setActiveTab] = useState('follow-up');
    const [followUpSegment, setFollowUpSegment] = useState('warm');
    const [openDropdownId, setOpenDropdownId] = useState(null);
    const [selectedLeadId, setSelectedLeadId] = useState(null);
    const [editLeadId, setEditLeadId] = useState(null);
    const [followUpLeadId, setFollowUpLeadId] = useState(null);
    const [uploadDocLeadId, setUploadDocLeadId] = useState(null);
    // Get today's date
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    // Filter leads by tab and segment
    const filteredLeads = useMemo(() => {
        let filtered = leads;
        // Filter by tab
        if (activeTab === 'assigned') {
            filtered = filtered.filter(l => l.status === 'assigned' || l.status === 'new');
        }
        else if (activeTab === 'follow-up') {
            filtered = filtered.filter(l => l.status === 'follow-up');
            // Apply follow-up segment filter
            if (followUpSegment === 'warm') {
                filtered = filtered.filter(l => l.temperature === 'warm');
            }
            else if (followUpSegment === 'cold') {
                filtered = filtered.filter(l => l.temperature === 'cold');
            }
        }
        else if (activeTab === 'quotations') {
            filtered = filtered.filter(l => l.status === 'quotations');
        }
        else if (activeTab === 'sales') {
            filtered = filtered.filter(l => l.status === 'sales');
        }
        else if (activeTab === 'lost') {
            filtered = filtered.filter(l => l.status === 'lost');
        }
        return filtered;
    }, [leads, activeTab, followUpSegment]);
    // Count leads per tab
    const tabCounts = useMemo(() => ({
        assigned: leads.filter(l => l.status === 'assigned' || l.status === 'new').length,
        'follow-up': leads.filter(l => l.status === 'follow-up').length,
        quotations: leads.filter(l => l.status === 'quotations').length,
        sales: leads.filter(l => l.status === 'sales').length,
        lost: leads.filter(l => l.status === 'lost').length
    }), [leads]);
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    };
    const getStatusBadgeClasses = (status) => {
        const baseClasses = 'px-2.5 py-1 text-xs font-medium rounded-full';
        const variants = {
            new: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
            assigned: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
            'follow-up': 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
            quotations: 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300',
            projected: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
            invoiced: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300',
            sales: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
            lost: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400',
        };
        return `${baseClasses} ${variants[status]}`;
    };
    const STATUS_LABELS = {
        new: 'New',
        assigned: 'Assigned',
        'follow-up': 'Follow-up',
        quotations: 'Quotations',
        projected: 'Projected',
        invoiced: 'Ready to Invoice',
        sales: 'Converted',
        lost: 'Lost',
    };
    const getUserName = (userId) => {
        if (!userId)
            return 'Unassigned';
        const user = users.find(u => u.id === userId);
        return user?.fullName || 'Unknown';
    };
    // Get selected lead and modal leads
    const selectedLead = selectedLeadId ? leads.find(l => l.id === selectedLeadId) : null;
    const editLead = editLeadId ? leads.find(l => l.id === editLeadId) : null;
    const followUpLead = followUpLeadId ? leads.find(l => l.id === followUpLeadId) : null;
    const uploadDocLead = uploadDocLeadId ? leads.find(l => l.id === uploadDocLeadId) : null;
    // If a lead is selected, show detail view
    if (selectedLead) {
        return (_jsxs(_Fragment, { children: [_jsx(LeadDetailView, { lead: selectedLead, timelineActivities: timelineActivities, documents: [], users: users, onClose: () => setSelectedLeadId(null), onEdit: () => setEditLeadId(selectedLead.id), onChangeStatus: (leadId, status) => console.log('Change status:', { leadId, status }), onAddFollowUp: () => setFollowUpLeadId(selectedLead.id), onUploadDocument: () => setUploadDocLeadId(selectedLead.id) }), editLead && (_jsx(EditLeadModal, { lead: editLead, leadSources: leadSources, serviceTypes: serviceTypes, serviceSubTypes: serviceSubTypes, onSubmit: (id, leadData) => {
                        onEditLead?.(id, leadData);
                        setEditLeadId(null);
                    }, onClose: () => setEditLeadId(null) })), followUpLead && (_jsx(AddFollowUpModal, { leadId: followUpLead.id, leadName: followUpLead.companyAlias, activityTypes: activityTypes, onSubmit: (leadId, followUpData) => {
                        onAddFollowUp?.(leadId, followUpData);
                        setFollowUpLeadId(null);
                    }, onClose: () => setFollowUpLeadId(null) })), uploadDocLead && (_jsx(UploadDocumentModal, { leadId: uploadDocLead.id, leadName: uploadDocLead.companyAlias, documentCategories: documentCategories, onUpload: (leadId, file, category) => {
                        onUploadDocument?.(leadId, file, category);
                        setUploadDocLeadId(null);
                    }, onClose: () => setUploadDocLeadId(null) }))] }));
    }
    return (_jsx("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: _jsxs("div", { className: "max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8", children: [_jsxs("div", { className: "mb-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx(Calendar, { className: "w-5 h-5 text-cyan-600 dark:text-cyan-400" }), _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "My Leads" })] }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: today })] }), todaysMeetings.length > 0 && (_jsxs("div", { className: "mb-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(Clock, { className: "w-4 h-4 text-cyan-600 dark:text-cyan-400" }), _jsx("h2", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider", children: "Today's Meetings" })] }), _jsx("div", { className: "space-y-2", children: todaysMeetings.map(meeting => (_jsx("div", { className: "flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer", onClick: () => setSelectedLeadId(meeting.leadId), children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-cyan-100 dark:bg-cyan-900/30", children: [_jsx("span", { className: "text-sm font-semibold text-cyan-600 dark:text-cyan-400", children: meeting.timeSlot.split(':')[0] }), _jsx("span", { className: "text-xs text-cyan-600 dark:text-cyan-400", children: meeting.timeSlot.split(' ')[1] })] }), _jsxs("div", { children: [_jsx("p", { className: "font-medium text-slate-900 dark:text-white", children: meeting.leadName }), _jsxs("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: [meeting.meetingType, " \u2022 ", meeting.duration] })] })] }) }, meeting.id))) })] })), _jsx("div", { className: "mb-6", children: _jsx("div", { className: "border-b border-slate-200 dark:border-slate-800 overflow-x-auto", children: _jsx("nav", { className: "flex gap-4 sm:gap-6 min-w-max px-1", "aria-label": "Lead tabs", children: [
                                { key: 'assigned', label: 'Assigned Leads' },
                                { key: 'follow-up', label: 'Follow-up' },
                                { key: 'quotations', label: 'Quotation' },
                                { key: 'sales', label: 'Converted' },
                                { key: 'lost', label: 'Lost' }
                            ].map(tab => (_jsxs("button", { onClick: () => setActiveTab(tab.key), className: `pb-2.5 sm:pb-3 px-1 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${activeTab === tab.key
                                    ? 'border-cyan-600 text-cyan-600'
                                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`, children: [tab.label, _jsx("span", { className: `ml-1.5 sm:ml-2 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium ${activeTab === tab.key
                                            ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'}`, children: tabCounts[tab.key] })] }, tab.key))) }) }) }), activeTab === 'follow-up' && (_jsx("div", { className: "mb-6 flex gap-2", children: [
                        { key: 'warm', label: 'Warm Leads' },
                        { key: 'cold', label: 'Cold Leads' },
                        { key: 'all', label: 'All' }
                    ].map(segment => (_jsx("button", { onClick: () => setFollowUpSegment(segment.key), className: `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${followUpSegment === segment.key
                            ? 'bg-cyan-600 text-white'
                            : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: segment.label }, segment.key))) })), _jsx("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden", children: filteredLeads.length === 0 ? (_jsx("div", { className: "p-8 sm:p-12 text-center", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx("div", { className: "w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Building2, { className: "w-6 h-6 sm:w-8 sm:h-8 text-slate-400" }) }), _jsx("h3", { className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "No leads found" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400", children: activeTab === 'follow-up'
                                        ? 'Try selecting a different segment'
                                        : 'There are no leads in this category' })] }) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "hidden lg:block overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", children: [_jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Lead ID" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Company" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Contact" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Service Type" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Assigned To" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: filteredLeads.map(lead => (_jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", children: [_jsxs("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: [_jsx("div", { className: "text-sm font-medium text-cyan-600 dark:text-cyan-400", children: lead.id }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: lead.source })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: lead.companyAlias }), _jsxs("div", { className: "text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5", children: [_jsx(MapPin, { className: "w-3 h-3" }), lead.city, ", ", lead.state] })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: [_jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: lead.contactPerson }), _jsx("div", { className: "flex items-center gap-3 mt-1", children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400", children: [_jsx(Phone, { className: "w-3 h-3" }), lead.phoneNumber.slice(0, 10), "..."] }) })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: [_jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: lead.type }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: [_jsx(Truck, { className: "w-3 h-3" }), lead.numberOfTrucks, " trucks"] })] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: _jsx("span", { className: getStatusBadgeClasses(lead.status), children: STATUS_LABELS[lead.status] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => setSelectedLeadId(lead.id), children: _jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: getUserName(lead.assignedTo) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", onClick: e => e.stopPropagation(), children: _jsxs("div", { className: "relative inline-block", onClick: e => e.stopPropagation(), children: [_jsx("button", { onClick: () => setOpenDropdownId(openDropdownId === lead.id ? null : lead.id), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors", children: _jsx(MoreVertical, { className: "w-5 h-5 text-slate-400" }) }), openDropdownId === lead.id && (_jsx("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10", children: _jsx("div", { className: "py-1", children: _jsxs("button", { onClick: () => {
                                                                                setSelectedLeadId(lead.id);
                                                                                setOpenDropdownId(null);
                                                                            }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(Eye, { className: "w-4 h-4" }), "View Details"] }) }) }))] }) })] }, lead.id))) })] }) }), _jsx("div", { className: "lg:hidden divide-y divide-slate-200 dark:divide-slate-800", children: filteredLeads.map(lead => (_jsxs("div", { onClick: () => setSelectedLeadId(lead.id), className: "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1", children: lead.id }), _jsx("div", { className: "text-sm sm:text-base font-semibold text-slate-900 dark:text-white", children: lead.companyAlias })] }), _jsx("span", { className: getStatusBadgeClasses(lead.status), children: STATUS_LABELS[lead.status] })] }), _jsxs("div", { className: "space-y-2 text-xs sm:text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Building2, { className: "w-4 h-4" }), _jsx("span", { children: lead.contactPerson })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Phone, { className: "w-4 h-4" }), _jsx("span", { children: lead.phoneNumber })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsxs("span", { children: [lead.city, ", ", lead.state] })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Truck, { className: "w-4 h-4" }), _jsxs("span", { children: [lead.type, " \u2022 ", lead.numberOfTrucks, " trucks"] })] })] }), _jsx("div", { className: "mt-3 pt-3 border-t border-slate-200 dark:border-slate-800", children: _jsxs("div", { className: "text-xs sm:text-sm", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Assigned to: " }), _jsx("span", { className: "text-slate-900 dark:text-white font-medium", children: getUserName(lead.assignedTo) })] }) })] }, lead.id))) })] })) }), _jsx("div", { className: "mt-4 text-sm text-slate-600 dark:text-slate-400", children: _jsxs("p", { children: ["Showing ", _jsx("span", { className: "font-medium text-slate-900 dark:text-slate-100", children: filteredLeads.length }), ' ', "lead", filteredLeads.length !== 1 ? 's' : '', activeTab === 'follow-up' && ` (${followUpSegment === 'all' ? 'all' : followUpSegment})`] }) })] }) }));
}
