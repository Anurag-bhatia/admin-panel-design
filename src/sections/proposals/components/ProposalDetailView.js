import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Phone, Mail, Building2, Send, ExternalLink, Clock, User, MessageSquare, FileText, LinkIcon, Plus, Pencil, Download, Receipt, } from 'lucide-react';
import { SendQuoteModal } from './SendQuoteModal';
import { RejectModal } from './RejectModal';
import { ConvertToIncidentModal } from './ConvertToIncidentModal';
import { AssignModal } from './AssignModal';
import { AddQuotationModal, IssuerHeader } from '../../sales-crm/components/AddQuotationModal';
function proposalToLead(p) {
    const phone = p.customer.phone ?? '';
    const email = p.customer.email ?? '';
    return {
        id: p.id,
        source: 'proposal',
        type: 'B2B',
        subType: p.type,
        lotsFor: '',
        numberOfTrucks: p.quantity,
        phoneNumber: phone,
        country: 'India',
        state: '',
        city: '',
        companyAlias: p.customer.company,
        companyName: p.customer.company,
        emailId: email,
        contactPerson: p.customer.name,
        gstNumber: '',
        area: '',
        addressLane: '',
        pinCode: '',
        status: 'quotations',
        assignedTo: p.assignedTo?.id ?? null,
        assignedTeam: null,
        createdDate: p.createdAt,
        lastActivityDate: p.updatedAt,
    };
}
// =============================================================================
// Helpers
// =============================================================================
function formatINR(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
}
function formatDateTime(dateString) {
    const d = new Date(dateString);
    return (d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) +
        ', ' +
        d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
}
function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1)
        return 'just now';
    if (diffMins < 60)
        return `${diffMins}m ago`;
    if (diffHours < 24)
        return `${diffHours}h ago`;
    if (diffDays < 7)
        return `${diffDays}d ago`;
    return formatDate(dateString);
}
const STATUS_STYLES = {
    sent: { label: 'Inbox', className: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300' },
    under_review: { label: 'In Review', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
    quotations: { label: 'Quotations', className: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300' },
    received: { label: 'Quote Sent', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    converted: { label: 'Converted', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
    rejected: { label: 'Rejected', className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
};
const SERVICE_STATUS_STYLES = {
    pending: { label: 'Pending', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
    in_progress: { label: 'In Progress', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300' },
    completed: { label: 'Completed', className: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300' },
    not_applicable: { label: 'N/A', className: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400' },
};
const TYPE_BADGE_STYLES = {
    Challan: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
    DL: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    RC: 'bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300',
};
const ITEM_STATUS_STYLES = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
};
const STATE_CODES = ['UP32', 'MH12', 'DL01', 'KA05', 'RJ14', 'GJ01', 'TN22', 'HR26'];
const CHALLAN_TYPES = ['Court', 'Online'];
const FIRST_NAMES = ['Ramesh', 'Sunil', 'Mohan', 'Vijay', 'Arjun', 'Bharat', 'Kamlesh', 'Ajay', 'Rakesh', 'Suresh'];
const LAST_NAMES = ['Yadav', 'Tiwari', 'Kumar', 'Singh', 'Patel', 'Sharma', 'Verma', 'Gupta'];
function generateFallbackItems(proposal) {
    const count = Math.max(1, proposal.quantity);
    const seed = proposal.id;
    const items = [];
    for (let i = 0; i < count; i++) {
        const state = STATE_CODES[i % STATE_CODES.length];
        const suffix = String(1001 + i).padStart(4, '0');
        if (proposal.type === 'Challan') {
            const perItemAmount = Math.round(proposal.amount / count) || 5000;
            items.push({
                id: `${seed}-item-${i + 1}`,
                challanId: `CH-${state}-${suffix}`,
                challanType: CHALLAN_TYPES[i % CHALLAN_TYPES.length],
                vehicleNumber: `${state} AB ${suffix}`,
                amount: perItemAmount,
                status: 'pending',
            });
        }
        else if (proposal.type === 'DL') {
            const firstName = FIRST_NAMES[i % FIRST_NAMES.length];
            const lastName = LAST_NAMES[i % LAST_NAMES.length];
            items.push({
                id: `${seed}-item-${i + 1}`,
                licenceNumber: `${state}202600${String(10000 + i).padStart(5, '0')}`,
                driverName: `${firstName} ${lastName}`,
                status: 'pending',
            });
        }
        else {
            items.push({
                id: `${seed}-item-${i + 1}`,
                rcNumber: `${state} TC ${suffix}`,
                vehicleNumber: `${state} AA ${suffix}`,
                status: 'pending',
            });
        }
    }
    return items;
}
// =============================================================================
// Component
// =============================================================================
export function ProposalDetailView({ proposal, items, activities, comments, teamMembers, onBack, onPickUp, onAssign, onReassign, onSendQuote, onReviseQuote, onWithdraw, onReject, onReopen, onConvertToIncident, onUpdateServiceStatus, onViewIncident, onSendComment, }) {
    const [activeTab, setActiveTab] = useState('details');
    const [activeModal, setActiveModal] = useState(null);
    const [showAddQuotation, setShowAddQuotation] = useState(false);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);
    const proposalComments = comments
        .filter((c) => c.entityId === proposal.id)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const proposalActivities = activities
        .filter((a) => a.proposalId === proposal.id)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    useEffect(() => {
        if (activeTab === 'notes') {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }, [activeTab, proposalComments.length]);
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            onSendComment?.(proposal.id, newMessage.trim());
            setNewMessage('');
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };
    const tabs = [
        { key: 'details', label: 'Details', icon: FileText, show: true },
        { key: 'items', label: 'Quantity', icon: FileText, show: true },
        { key: 'quotations', label: 'Quotations', icon: Receipt, show: proposal.status === 'quotations' },
        { key: 'notes', label: 'Notes', icon: MessageSquare, show: true },
        { key: 'incidents', label: 'Incidents', icon: LinkIcon, show: proposal.status === 'converted' },
    ];
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Details Tab
    // ───────────────────────────────────────────────────────────────────────────
    const renderDetailsTab = () => (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wider", children: "Proposal Information" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsx(InfoField, { label: "Type", value: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_BADGE_STYLES[proposal.type]}`, children: proposal.type }) }), _jsx(InfoField, { label: "Quantity", value: `${proposal.quantity} items` }), _jsx(InfoField, { label: "Amount", value: proposal.amount > 0 ? formatINR(proposal.amount) : '—' }), _jsx(InfoField, { label: "Status", value: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLES[proposal.status].className}`, children: STATUS_STYLES[proposal.status].label }) }), _jsx(InfoField, { label: "Created", value: formatDateTime(proposal.createdAt) }), _jsx(InfoField, { label: "Last Updated", value: formatDateTime(proposal.updatedAt) })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3 uppercase tracking-wider", children: "Customer" }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800 rounded-lg p-4 space-y-2.5", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(User, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: proposal.customer.name })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Building2, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: proposal.customer.company })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Phone, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: proposal.customer.phone })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Mail, { className: "h-4 w-4 text-slate-400" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: proposal.customer.email })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-slate-100 mb-2 uppercase tracking-wider", children: "Assigned To" }), proposal.assignedTo ? (_jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: proposal.assignedTo.name })) : (_jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500 italic", children: "Unassigned" }))] }), proposal.status === 'rejected' && proposal.rejectionReason && (_jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-red-700 dark:text-red-400 mb-2 uppercase tracking-wider", children: "Rejection Reason" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 rounded-lg p-4", children: proposal.rejectionReason })] }))] }));
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Items Tab
    // ───────────────────────────────────────────────────────────────────────────
    const renderItemsTab = () => {
        const displayItems = items.length > 0
            ? items
            : generateFallbackItems(proposal);
        const isChallan = 'challanId' in displayItems[0];
        const isDL = 'licenceNumber' in displayItems[0];
        return (_jsx("div", { className: "overflow-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700", children: _jsxs("tr", { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "#" }), isChallan && (_jsxs(_Fragment, { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Challan Number" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Challan Type" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Vehicle" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Amount" })] })), isDL && (_jsxs(_Fragment, { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Licence No." }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Driver Name" })] })), !isChallan && !isDL && (_jsxs(_Fragment, { children: [_jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "RC Number" }), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Vehicle" })] })), _jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400", children: "Status" })] }) }), _jsx("tbody", { children: displayItems.map((item, idx) => (_jsxs("tr", { className: "border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50", children: [_jsx("td", { className: "px-4 py-3 text-sm text-slate-500 dark:text-slate-400", children: idx + 1 }), isChallan && (_jsxs(_Fragment, { children: [_jsx("td", { className: "px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100", children: item.challanId }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: item.challanType ?? '—' }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: item.vehicleNumber }), _jsx("td", { className: "px-4 py-3 text-sm font-medium tabular-nums text-slate-900 dark:text-slate-100", children: formatINR(item.amount) })] })), isDL && (_jsxs(_Fragment, { children: [_jsx("td", { className: "px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100", children: item.licenceNumber }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: item.driverName })] })), !isChallan && !isDL && (_jsxs(_Fragment, { children: [_jsx("td", { className: "px-4 py-3 text-sm font-mono text-slate-900 dark:text-slate-100", children: item.rcNumber }), _jsx("td", { className: "px-4 py-3 text-sm text-slate-700 dark:text-slate-300", children: item.vehicleNumber })] })), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold capitalize ${ITEM_STATUS_STYLES[item.status] ?? ''}`, children: item.status.replace('_', ' ') }) })] }, item.id))) })] }) }));
    };
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Quotations Tab
    // ───────────────────────────────────────────────────────────────────────────
    const renderQuotationsTab = () => {
        const quotationNumber = proposal.displayId.replace(/^REQ-/i, '');
        const subtotal = proposal.amount > 0 ? proposal.amount : 17000;
        const discount = 0;
        const gst = Math.round((subtotal - discount) * 0.18);
        const total = subtotal - discount + gst;
        return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6 flex-wrap gap-3", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50", children: "Quotation Preview" }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: ["QTN-", quotationNumber, " \u00B7 Issued ", formatDate(proposal.updatedAt)] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("button", { onClick: () => setShowAddQuotation(true), className: "inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium transition-colors", children: [_jsx(Pencil, { className: "w-4 h-4" }), "Modify Quotation"] }), _jsxs("button", { className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download PDF"] })] })] }), _jsxs("div", { className: "border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-950 overflow-hidden", children: [_jsx(IssuerHeader, {}), _jsxs("div", { className: "p-6 sm:p-8", children: [_jsxs("div", { className: "flex items-start justify-between mb-6 pb-6 border-b border-slate-200 dark:border-slate-800 flex-wrap gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Quotation for" }), _jsx("p", { className: "text-lg font-semibold text-slate-900 dark:text-slate-50 mt-1", children: proposal.customer.company || proposal.customer.name }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: [proposal.customer.name, " \u00B7 ", proposal.customer.email] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "From" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-slate-50 mt-1", children: "LOTS247" }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: ["Valid till ", formatDate(proposal.updatedAt)] })] })] }), _jsxs("table", { className: "w-full text-sm mb-6", children: [_jsx("thead", { children: _jsxs("tr", { className: "text-left text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800", children: [_jsx("th", { className: "py-2 font-medium", children: "Item" }), _jsx("th", { className: "py-2 font-medium text-right", children: "Qty" }), _jsx("th", { className: "py-2 font-medium text-right", children: "Amount" })] }) }), _jsx("tbody", { className: "text-slate-900 dark:text-slate-50", children: _jsxs("tr", { className: "border-b border-slate-100 dark:border-slate-800", children: [_jsxs("td", { className: "py-3", children: [proposal.type, " Service"] }), _jsx("td", { className: "py-3 text-right", children: proposal.quantity }), _jsx("td", { className: "py-3 text-right", children: formatINR(subtotal) })] }) })] }), _jsxs("div", { className: "ml-auto max-w-xs space-y-2 text-sm", children: [_jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400", children: [_jsx("span", { children: "Subtotal" }), _jsx("span", { children: formatINR(subtotal) })] }), _jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400", children: [_jsx("span", { children: "Discount (0%)" }), _jsxs("span", { children: ["-", formatINR(discount)] })] }), _jsxs("div", { className: "flex justify-between text-slate-600 dark:text-slate-400", children: [_jsx("span", { children: "GST (18%)" }), _jsx("span", { children: formatINR(gst) })] }), _jsxs("div", { className: "flex justify-between pt-2 border-t border-slate-200 dark:border-slate-800 font-semibold text-slate-900 dark:text-slate-50", children: [_jsx("span", { children: "Total" }), _jsx("span", { children: formatINR(total) })] })] })] })] })] }));
    };
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Notes Tab (Chat)
    // ───────────────────────────────────────────────────────────────────────────
    const renderNotesTab = () => (_jsxs("div", { className: "flex flex-col h-full", children: [_jsxs("div", { className: "flex-1 overflow-auto p-4 space-y-3", children: [proposalComments.length === 0 ? (_jsxs("div", { className: "py-12 text-center", children: [_jsx(MessageSquare, { className: "h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No messages yet. Start the conversation." })] })) : (proposalComments.map((comment) => {
                        const isTeam = comment.authorType === 'team';
                        return (_jsx("div", { className: `flex ${isTeam ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `max-w-[75%] rounded-xl px-4 py-3 ${isTeam
                                    ? 'bg-cyan-600 text-white rounded-br-sm'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'}`, children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("span", { className: `text-xs font-semibold ${isTeam ? 'text-cyan-100' : 'text-slate-500 dark:text-slate-400'}`, children: comment.authorName }), _jsx("span", { className: `inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${isTeam
                                                    ? 'bg-cyan-500 text-white'
                                                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`, children: isTeam ? 'Team' : 'Customer' })] }), _jsx("p", { className: `text-sm leading-relaxed ${isTeam ? 'text-white' : 'text-slate-700 dark:text-slate-300'}`, children: comment.message }), _jsx("p", { className: `text-[10px] mt-1.5 ${isTeam ? 'text-cyan-200' : 'text-slate-400 dark:text-slate-500'}`, children: timeAgo(comment.createdAt) })] }) }, comment.id));
                    })), _jsx("div", { ref: messagesEndRef })] }), _jsx("div", { className: "border-t border-slate-200 dark:border-slate-700 p-4 bg-white dark:bg-slate-900", children: _jsxs("div", { className: "flex items-end gap-2", children: [_jsx("textarea", { value: newMessage, onChange: (e) => setNewMessage(e.target.value), onKeyDown: handleKeyDown, placeholder: "Type a message... (Enter to send, Shift+Enter for newline)", rows: 2, className: "flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none" }), _jsx("button", { onClick: handleSendMessage, disabled: !newMessage.trim(), className: "p-2.5 bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 text-white disabled:text-slate-400 rounded-lg transition-colors", children: _jsx(Send, { className: "h-4 w-4" }) })] }) })] }));
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Incidents Tab
    // ───────────────────────────────────────────────────────────────────────────
    const renderIncidentsTab = () => (_jsx("div", { className: "p-6", children: proposal.linkedIncidentId ? (_jsx("div", { className: "space-y-4", children: _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800 rounded-lg p-5 space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1", children: "Linked Incident" }), _jsx("button", { onClick: () => onViewIncident?.(proposal.linkedIncidentId), className: "font-mono text-base font-semibold text-cyan-600 dark:text-cyan-400 hover:underline", children: proposal.linkedIncidentId })] }), _jsxs("button", { onClick: () => onViewIncident?.(proposal.linkedIncidentId), className: "flex items-center gap-2 px-3 py-2 text-sm text-cyan-600 dark:text-cyan-400 border border-cyan-300 dark:border-cyan-700 rounded-lg hover:bg-cyan-50 dark:hover:bg-cyan-950/30 transition-colors", children: [_jsx(ExternalLink, { className: "h-3.5 w-3.5" }), "View Incident"] })] }), proposal.serviceStatus && (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2", children: "Service Status" }), _jsx("span", { className: `inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${SERVICE_STATUS_STYLES[proposal.serviceStatus].className}`, children: SERVICE_STATUS_STYLES[proposal.serviceStatus].label })] }))] }) })) : (_jsxs("div", { className: "py-12 text-center", children: [_jsx(LinkIcon, { className: "h-10 w-10 text-slate-300 dark:text-slate-600 mx-auto mb-3" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "No incident linked yet." })] })) }));
    // ───────────────────────────────────────────────────────────────────────────
    // Render: Right Sidebar — Timeline
    // ───────────────────────────────────────────────────────────────────────────
    const renderSidebar = () => (_jsx("div", { className: "w-80 shrink-0 border-l border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 overflow-y-auto", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-3 mb-6", children: [_jsx("div", { className: "w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center", children: _jsx(Clock, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" }) }), _jsx("h4", { className: "text-base font-semibold text-slate-900 dark:text-slate-100", children: "Timeline" })] }), proposalActivities.length === 0 ? (_jsx("p", { className: "text-sm text-slate-400 dark:text-slate-500", children: "No activity yet" })) : (_jsx("div", { className: "space-y-5", children: proposalActivities.map((act) => (_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-400 dark:bg-cyan-500 mt-1.5 shrink-0" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-slate-100", children: act.notes }), _jsx("p", { className: "text-xs text-cyan-600 dark:text-cyan-400 mt-0.5", children: formatDate(act.timestamp) })] })] }, act.id))) }))] }) }));
    // ───────────────────────────────────────────────────────────────────────────
    // Main Render
    // ───────────────────────────────────────────────────────────────────────────
    return (_jsxs("div", { className: "flex flex-col h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950", children: [_jsx("div", { className: "bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4", children: _jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex items-start gap-4", children: [_jsx("button", { onClick: onBack, className: "mt-1 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors", children: _jsx(ArrowLeft, { className: "h-5 w-5" }) }), _jsx("div", { children: _jsxs("div", { className: "flex items-center gap-3 mb-1", children: [_jsx("h1", { className: "font-mono text-lg font-bold text-slate-900 dark:text-slate-100", children: proposal.displayId }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${STATUS_STYLES[proposal.status].className}`, children: STATUS_STYLES[proposal.status].label }), _jsx("span", { className: `inline-flex items-center px-2 py-0.5 rounded-md text-xs font-semibold ${TYPE_BADGE_STYLES[proposal.type]}`, children: proposal.type })] }) })] }), proposal.status === 'quotations' && (_jsxs("button", { onClick: () => setShowAddQuotation(true), className: "inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Quotation"] }))] }) }), _jsxs("div", { className: "flex flex-1 overflow-hidden", children: [_jsxs("div", { className: "flex-1 flex flex-col overflow-hidden", children: [_jsx("div", { className: "border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: _jsx("div", { className: "flex items-center gap-1 px-4 overflow-x-auto scrollbar-hide", children: tabs
                                        .filter((t) => t.show)
                                        .map((tab) => {
                                        const isActive = activeTab === tab.key;
                                        const Icon = tab.icon;
                                        return (_jsxs("button", { onClick: () => setActiveTab(tab.key), className: `flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${isActive
                                                ? 'border-cyan-500 text-cyan-600 dark:text-cyan-400'
                                                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300 dark:hover:border-slate-600'}`, children: [_jsx(Icon, { className: "h-4 w-4" }), tab.label, tab.key === 'notes' && proposalComments.length > 0 && (_jsx("span", { className: `inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${isActive ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`, children: proposalComments.length })), tab.key === 'items' && items.length > 0 && (_jsx("span", { className: `inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold ${isActive ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'}`, children: items.length }))] }, tab.key));
                                    }) }) }), _jsxs("div", { className: "flex-1 overflow-auto bg-white dark:bg-slate-900", children: [activeTab === 'details' && renderDetailsTab(), activeTab === 'items' && renderItemsTab(), activeTab === 'quotations' && renderQuotationsTab(), activeTab === 'notes' && renderNotesTab(), activeTab === 'incidents' && renderIncidentsTab()] })] }), _jsx("div", { className: "hidden lg:block", children: renderSidebar() })] }), activeModal === 'sendQuote' && (_jsx(SendQuoteModal, { proposal: proposal, onSubmit: (amount, breakdown, note) => {
                    onSendQuote?.(proposal.id, amount, breakdown, note);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), activeModal === 'reviseQuote' && (_jsx(SendQuoteModal, { proposal: proposal, isRevise: true, onSubmit: (amount, breakdown, note) => {
                    onReviseQuote?.(proposal.id, amount, breakdown, note);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), activeModal === 'reject' && (_jsx(RejectModal, { proposal: proposal, onSubmit: (reason, note) => {
                    onReject?.(proposal.id, reason, note);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), activeModal === 'convert' && (_jsx(ConvertToIncidentModal, { proposal: proposal, teamMembers: teamMembers, onSubmit: (incidentId, serviceStatus, agentId, notes) => {
                    onConvertToIncident?.(proposal.id, incidentId, serviceStatus, agentId, notes);
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), (activeModal === 'assign' || activeModal === 'reassign') && (_jsx(AssignModal, { proposal: proposal, teamMembers: teamMembers, isReassign: activeModal === 'reassign', onSubmit: (tmId) => {
                    if (activeModal === 'reassign') {
                        onReassign?.(proposal.id, tmId);
                    }
                    else {
                        onAssign?.(proposal.id, tmId);
                    }
                    setActiveModal(null);
                }, onCancel: () => setActiveModal(null) })), showAddQuotation && (() => {
                const lead = proposalToLead(proposal);
                return (_jsx(AddQuotationModal, { leads: [lead], initialLeadId: lead.id, hideQuotationType: true, hideSubscriptionPlan: true, hideDiscount: true, onSave: () => setShowAddQuotation(false), onClose: () => setShowAddQuotation(false) }));
            })()] }));
}
// =============================================================================
// Sub-components
// =============================================================================
function InfoField({ label, value }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 mb-0.5", children: label }), _jsx("div", { className: "text-sm text-slate-900 dark:text-slate-100", children: value })] }));
}
