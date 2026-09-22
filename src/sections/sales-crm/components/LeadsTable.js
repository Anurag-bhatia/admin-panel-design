import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { MoreVertical, Eye, UserPlus, Phone, MapPin, Truck, Building2, FileText, Receipt, ChevronLeft, ChevronRight } from 'lucide-react';
export function LeadsTable({ leads, users, selectedLeads = new Set(), onSelectLead, onSelectAll, onViewLead, onAssignLead, onChangeStatus, onSendPI, onSendInvoice }) {
    const [openActionMenu, setOpenActionMenu] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 10;
    const totalPages = Math.max(1, Math.ceil(leads.length / pageSize));
    useEffect(() => {
        setCurrentPage(1);
    }, [leads.length]);
    useEffect(() => {
        if (currentPage > totalPages)
            setCurrentPage(totalPages);
    }, [currentPage, totalPages]);
    const paginatedLeads = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        return leads.slice(start, start + pageSize);
    }, [leads, currentPage, pageSize]);
    const startItem = leads.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
    const endItem = Math.min(currentPage * pageSize, leads.length);
    const getPageNumbers = () => {
        const pages = [];
        const maxVisible = 5;
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        }
        else {
            pages.push(1);
            if (currentPage > 3)
                pages.push('ellipsis');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++)
                pages.push(i);
            if (currentPage < totalPages - 2)
                pages.push('ellipsis');
            if (totalPages > 1)
                pages.push(totalPages);
        }
        return pages;
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
            rejected: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
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
        rejected: 'Rejected',
    };
    const getUserName = (userId) => {
        if (!userId)
            return 'Unassigned';
        const user = users.find(u => u.id === userId);
        return user?.fullName || 'Unknown';
    };
    if (leads.length === 0) {
        return (_jsx("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx("div", { className: "w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4", children: _jsx(Building2, { className: "w-6 h-6 sm:w-8 sm:h-8 text-slate-400" }) }), _jsx("h3", { className: "text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "No leads found" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400", children: "Try adjusting your search or filters, or add a new lead to get started." })] }) }));
    }
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 shadow-sm overflow-visible", children: [_jsx("div", { className: "hidden lg:block overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", children: [_jsx("th", { className: "px-4 py-3 w-4", children: _jsx("input", { type: "checkbox", checked: selectedLeads.size === leads.length && leads.length > 0, onChange: e => onSelectAll?.(e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer" }) }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Lead ID" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Company" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "POC" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Type" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Status" }), _jsx("th", { className: "px-6 py-3 text-left text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Assigned To" }), _jsx("th", { className: "px-6 py-3 text-right text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider", children: "Actions" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-200 dark:divide-slate-800", children: paginatedLeads.map(lead => (_jsxs("tr", { className: "hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors", children: [_jsx("td", { className: "px-4 py-4 w-4", onClick: e => e.stopPropagation(), children: _jsx("input", { type: "checkbox", checked: selectedLeads.has(lead.id), onChange: e => onSelectLead?.(lead.id, e.target.checked), className: "w-4 h-4 rounded border-slate-300 dark:border-slate-600 cursor-pointer" }) }), _jsxs("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onViewLead?.(lead.id), children: [_jsx("div", { className: "text-sm font-medium text-cyan-600 dark:text-cyan-400", children: lead.id }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400", children: lead.source })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => onViewLead?.(lead.id), children: [_jsx("div", { className: "text-sm font-medium text-slate-900 dark:text-white", children: lead.companyAlias }), _jsxs("div", { className: "text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5", children: [_jsx(MapPin, { className: "w-3 h-3" }), lead.city, ", ", lead.state] })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => onViewLead?.(lead.id), children: [_jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: lead.contactPerson }), _jsx("div", { className: "flex items-center gap-3 mt-1", children: _jsxs("div", { className: "flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400", children: [_jsx(Phone, { className: "w-3 h-3" }), lead.phoneNumber.slice(0, 10), "..."] }) })] }), _jsxs("td", { className: "px-6 py-4 cursor-pointer", onClick: () => onViewLead?.(lead.id), children: [_jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: lead.type }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: [_jsx(Truck, { className: "w-3 h-3" }), lead.numberOfTrucks, " trucks"] })] }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onViewLead?.(lead.id), children: _jsx("span", { className: getStatusBadgeClasses(lead.status), children: STATUS_LABELS[lead.status] }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap cursor-pointer", onClick: () => onViewLead?.(lead.id), children: _jsx("div", { className: "text-sm text-slate-900 dark:text-white", children: getUserName(lead.assignedTo) }) }), _jsx("td", { className: "px-6 py-4 whitespace-nowrap text-right", onClick: e => e.stopPropagation(), children: _jsxs("div", { className: "relative inline-block", onClick: e => e.stopPropagation(), children: [_jsx("button", { onClick: () => setOpenActionMenu(openActionMenu === lead.id ? null : lead.id), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors", children: _jsx(MoreVertical, { className: "w-5 h-5 text-slate-400" }) }), openActionMenu === lead.id && (_jsx("div", { className: "absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg z-10", children: _jsxs("div", { className: "py-1", children: [_jsxs("button", { onClick: () => {
                                                                    onViewLead?.(lead.id);
                                                                    setOpenActionMenu(null);
                                                                }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(Eye, { className: "w-4 h-4" }), "View Details"] }), onAssignLead && lead.status !== 'sales' && lead.status !== 'lost' && (_jsxs("button", { onClick: () => {
                                                                    onAssignLead(lead.id);
                                                                    setOpenActionMenu(null);
                                                                }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(UserPlus, { className: "w-4 h-4" }), "Assign Lead"] })), (onSendPI || onSendInvoice) && (lead.status === 'invoiced' || lead.status === 'sales') && (_jsxs(_Fragment, { children: [_jsx("div", { className: "border-t border-slate-200 dark:border-slate-700 my-1" }), onSendPI && (_jsxs("button", { onClick: () => {
                                                                            onSendPI(lead);
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(FileText, { className: "w-4 h-4" }), "Send PI"] })), onSendInvoice && (_jsxs("button", { onClick: () => {
                                                                            onSendInvoice(lead);
                                                                            setOpenActionMenu(null);
                                                                        }, className: "w-full px-4 py-2 text-left text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2", children: [_jsx(Receipt, { className: "w-4 h-4" }), "Send Invoice"] }))] }))] }) }))] }) })] }, lead.id))) })] }) }), _jsx("div", { className: "lg:hidden divide-y divide-slate-200 dark:divide-slate-800", children: paginatedLeads.map(lead => (_jsxs("div", { onClick: () => onViewLead?.(lead.id), className: "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors", children: [_jsxs("div", { className: "flex items-start justify-between mb-3", children: [_jsxs("div", { children: [_jsx("div", { className: "text-xs sm:text-sm font-medium text-cyan-600 dark:text-cyan-400 mb-1", children: lead.id }), _jsx("div", { className: "text-sm sm:text-base font-semibold text-slate-900 dark:text-white", children: lead.companyAlias })] }), _jsx("span", { className: getStatusBadgeClasses(lead.status), children: STATUS_LABELS[lead.status] })] }), _jsxs("div", { className: "space-y-2 text-xs sm:text-sm", children: [_jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Building2, { className: "w-4 h-4" }), _jsx("span", { children: lead.contactPerson })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Phone, { className: "w-4 h-4" }), _jsx("span", { children: lead.phoneNumber })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(MapPin, { className: "w-4 h-4" }), _jsxs("span", { children: [lead.city, ", ", lead.state] })] }), _jsxs("div", { className: "flex items-center gap-2 text-slate-600 dark:text-slate-400", children: [_jsx(Truck, { className: "w-4 h-4" }), _jsxs("span", { children: [lead.type, " \u2022 ", lead.numberOfTrucks, " trucks"] })] })] }), _jsx("div", { className: "mt-3 pt-3 border-t border-slate-200 dark:border-slate-800", children: _jsxs("div", { className: "text-xs sm:text-sm", children: [_jsx("span", { className: "text-slate-500 dark:text-slate-400", children: "Assigned to: " }), _jsx("span", { className: "text-slate-900 dark:text-white font-medium", children: getUserName(lead.assignedTo) })] }) })] }, lead.id))) }), _jsxs("div", { className: "flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: [_jsxs("div", { className: "text-sm text-slate-500 dark:text-slate-400", children: ["Showing", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: startItem }), ' ', "to", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: endItem }), ' ', "of", ' ', _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: leads.length }), ' ', "results"] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx("button", { onClick: () => setCurrentPage(currentPage - 1), disabled: currentPage === 1, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${currentPage === 1
                                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronLeft, { className: "h-4 w-4" }) }), getPageNumbers().map((page, index) => page === 'ellipsis' ? (_jsx("span", { className: "w-8 h-8 flex items-center justify-center text-slate-400", children: "..." }, `ellipsis-${index}`)) : (_jsx("button", { onClick: () => setCurrentPage(page), className: `inline-flex items-center justify-center min-w-[32px] h-8 px-2 rounded-md text-sm font-medium transition-colors ${page === currentPage
                                    ? 'bg-cyan-500 text-white'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: page }, page))), _jsx("button", { onClick: () => setCurrentPage(currentPage + 1), disabled: currentPage === totalPages, className: `inline-flex items-center justify-center w-8 h-8 rounded-md text-sm transition-colors ${currentPage === totalPages
                                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`, children: _jsx(ChevronRight, { className: "h-4 w-4" }) })] })] })] }));
}
