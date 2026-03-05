import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileText, Upload, Download, Trash2, Eye, X, MapPin, Car, FileCheck, Building, } from 'lucide-react';
const TYPE_LABELS = {
    payAndClose: 'PPT',
    contest: 'Bulk',
};
const CHALLAN_TYPE_LABELS = {
    court: 'Court',
    online: 'Online',
};
const STATUS_LABELS = {
    pending_screening: 'Pending Screening',
    screening_in_progress: 'Screening',
    lawyer_working: 'Lawyer Working',
    court_hearing_scheduled: 'Court Scheduled',
    resolved: 'Resolved',
    unresolved: 'Unresolved',
    refund_initiated: 'Refund Initiated',
};
const DOCUMENT_TYPE_OPTIONS = [
    { value: 'challan', label: 'Challan' },
    { value: 'vehicle_document', label: 'Vehicle Document' },
    { value: 'court_document', label: 'Court Document' },
    { value: 'receipt', label: 'Receipt' },
    { value: 'other', label: 'Other' },
];
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0,
    }).format(amount);
}
function formatFileSize(bytes) {
    if (bytes < 1024)
        return bytes + ' B';
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
const DOCUMENT_TYPE_ICONS = {
    challan: FileText,
    vehicle_document: Car,
    court_document: Building,
    receipt: FileCheck,
    other: FileText,
};
export function DetailsTab({ incident, subscriber, documents, onUploadDocument, onViewDocument, onDeleteDocument, }) {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentType, setDocumentType] = useState('challan');
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleUpload = () => {
        if (selectedFile && onUploadDocument) {
            onUploadDocument(selectedFile, documentType);
            setSelectedFile(null);
            setDocumentType('challan');
            setShowUploadForm(false);
        }
    };
    const sortedDocuments = [...documents].sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
    return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-4", children: "Challan Information" }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Incident ID" }), _jsx("p", { className: "text-sm font-mono font-semibold text-slate-900 dark:text-white", children: incident.incidentId })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Challan Number" }), _jsx("p", { className: "text-sm font-mono font-semibold text-slate-900 dark:text-white", children: incident.challanNumber })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Vehicle Number" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Car, { className: "h-4 w-4 text-slate-400" }), _jsx("p", { className: "text-sm font-mono font-semibold text-slate-900 dark:text-white", children: incident.vehicle })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "State" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(MapPin, { className: "h-4 w-4 text-slate-400" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: incident.state })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Type" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: TYPE_LABELS[incident.type] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Challan" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: CHALLAN_TYPE_LABELS[incident.challanType] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Offence" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: incident.offence || 'Not screened yet' })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Fine Amount" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: formatCurrency(incident.amount) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Source" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: incident.source })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Created At" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: formatDateTime(incident.createdAt) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Last Updated" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: formatDateTime(incident.lastUpdatedAt) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "TAT Deadline" }), _jsx("p", { className: "text-sm font-semibold text-red-600 dark:text-red-400", children: formatDate(incident.tatDeadline) })] })] }), incident.resolutionNotes && (_jsxs("div", { className: "mt-6 pt-6 border-t border-slate-200 dark:border-slate-700", children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2", children: "Resolution Notes" }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: incident.resolutionNotes })] }))] })] }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-4", children: "Subscriber Details" }), _jsx("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Subscriber Name" }), _jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: subscriber.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: subscriber.companyAlias })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Subscriber ID" }), _jsx("p", { className: "text-sm font-mono text-slate-900 dark:text-white", children: subscriber.id })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Contact Person" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscriber.contactPerson })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Phone" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscriber.phone })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Email" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscriber.email })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: "Total Vehicles" }), _jsx("p", { className: "text-sm text-slate-900 dark:text-white", children: subscriber.totalVehicles })] })] }) })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Documents" }), _jsxs("button", { onClick: () => setShowUploadForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload Document"] })] }), showUploadForm && (_jsxs("div", { className: "mb-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-base font-medium text-slate-900 dark:text-white", children: "Upload New Document" }), _jsx("button", { onClick: () => {
                                                setShowUploadForm(false);
                                                setSelectedFile(null);
                                            }, className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-500" }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Document Type" }), _jsx("select", { value: documentType, onChange: (e) => setDocumentType(e.target.value), className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white", children: DOCUMENT_TYPE_OPTIONS.map((opt) => (_jsx("option", { value: opt.value, children: opt.label }, opt.value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Select File" }), _jsx("input", { type: "file", onChange: handleFileSelect, className: "w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 dark:file:bg-cyan-900/20 dark:file:text-cyan-400 dark:hover:file:bg-cyan-900/30" }), selectedFile && (_jsxs("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: ["Selected: ", selectedFile.name, " (", formatFileSize(selectedFile.size), ")"] }))] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { onClick: () => {
                                                        setShowUploadForm(false);
                                                        setSelectedFile(null);
                                                    }, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Upload" })] })] })] })), sortedDocuments.length === 0 ? (_jsxs("div", { className: "text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4", children: _jsx(FileText, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No documents uploaded" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: "Upload challan receipts, court documents, or other files" }), _jsxs("button", { onClick: () => setShowUploadForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload First Document"] })] })) : (_jsx("div", { className: "space-y-3", children: sortedDocuments.map((doc) => {
                                const Icon = DOCUMENT_TYPE_ICONS[doc.type];
                                return (_jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0", children: _jsx(Icon, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: doc.name }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [DOCUMENT_TYPE_OPTIONS.find((t) => t.value === doc.type)?.label, " \u2022", ' ', formatFileSize(doc.size), " \u2022 ", formatDateTime(doc.uploadedAt)] })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-4", children: [_jsx("button", { onClick: () => onViewDocument?.(doc.id), className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "View document", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => onViewDocument?.(doc.id), className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "Download document", children: _jsx(Download, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => onDeleteDocument?.(doc.id), className: "p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors", title: "Delete document", children: _jsx(Trash2, { className: "h-4 w-4" }) })] })] }) }, doc.id));
                            }) }))] })] }) }));
}
