import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { FileText, Upload, Download, Eye, X, FileCheck, Image, File, } from 'lucide-react';
const DOCUMENT_TYPE_ICONS = {
    evidence: FileText,
    correspondence: FileText,
    receipt: FileCheck,
    screenshot: Image,
    other: File,
    pdf: FileText,
    image: Image,
};
function getDocIcon(type) {
    const lower = type.toLowerCase();
    for (const [key, icon] of Object.entries(DOCUMENT_TYPE_ICONS)) {
        if (lower.includes(key))
            return icon;
    }
    return FileText;
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
function formatFileSize(size) {
    if (typeof size === 'string')
        return size;
    if (size < 1024)
        return size + ' B';
    if (size < 1024 * 1024)
        return (size / 1024).toFixed(1) + ' KB';
    return (size / (1024 * 1024)).toFixed(1) + ' MB';
}
export function EvidenceTab({ evidence, onUploadEvidence, onViewDocument }) {
    const [showModal, setShowModal] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const [documentType, setDocumentType] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [typeFilter, setTypeFilter] = useState('all');
    const fileInputRef = useRef(null);
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
            if (!documentName) {
                setDocumentName(file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            setSelectedFile(file);
            if (!documentName) {
                setDocumentName(file.name.replace(/\.[^/.]+$/, ''));
            }
        }
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleUpload = () => {
        if (selectedFile && onUploadEvidence) {
            onUploadEvidence(selectedFile, 'other');
            closeModal();
        }
    };
    const closeModal = () => {
        setShowModal(false);
        setSelectedFile(null);
        setDocumentName('');
        setDocumentType('');
        setIsDragging(false);
    };
    const uniqueTypes = Array.from(new Set(evidence.map((e) => e.type)));
    const filteredEvidence = typeFilter === 'all'
        ? evidence
        : evidence.filter((e) => e.type === typeFilter);
    const sortedEvidence = [...filteredEvidence].sort((a, b) => new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime());
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Documents" }), _jsxs("button", { onClick: () => setShowModal(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload Document"] })] }), uniqueTypes.length > 0 && (_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsxs("button", { onClick: () => setTypeFilter('all'), className: `px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${typeFilter === 'all'
                                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`, children: ["All (", evidence.length, ")"] }), uniqueTypes.map((type) => (_jsxs("button", { onClick: () => setTypeFilter(type), className: `px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${typeFilter === type
                                    ? 'bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400'
                                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'}`, children: [type, " (", evidence.filter((e) => e.type === type).length, ")"] }, type)))] })), sortedEvidence.length === 0 ? (_jsxs("div", { className: "text-center py-12 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4", children: _jsx(FileText, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No documents uploaded" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: "Upload evidence, receipts, correspondence, or other files" }), _jsxs("button", { onClick: () => setShowModal(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload First Document"] })] })) : (_jsx("div", { className: "space-y-3", children: sortedEvidence.map((item) => {
                            const Icon = getDocIcon(item.type);
                            return (_jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0", children: _jsx(Icon, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: item.fileName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [formatFileSize(item.fileSize), " \u2022 ", formatDateTime(item.uploadedOn)] })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-4", children: [_jsx("button", { onClick: () => onViewDocument?.(item.id), className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "View document", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx("button", { onClick: () => onViewDocument?.(item.id), className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "Download document", children: _jsx(Download, { className: "h-4 w-4" }) })] })] }) }, item.id));
                        }) }))] }), showModal && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 bg-black/50 z-40", onClick: closeModal }), _jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-lg", onClick: (e) => e.stopPropagation(), children: [_jsxs("div", { className: "flex items-start justify-between p-6 pb-4 border-b border-slate-200 dark:border-slate-700", children: [_jsx("div", { children: _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Upload Document" }) }), _jsx("button", { onClick: closeModal, className: "p-1.5 -mr-1.5 -mt-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("div", { className: "p-6 space-y-5", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Document Name" }), _jsx("input", { type: "text", value: documentName, onChange: (e) => setDocumentName(e.target.value), placeholder: "e.g. Aadhaar Card \u2013 Front & Back", className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500" })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: ["Document Type ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: documentType, onChange: (e) => setDocumentType(e.target.value), className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-slate-900 dark:text-white", children: [_jsx("option", { value: "", children: "Select document type" }), _jsx("option", { value: "Vehicle", children: "Vehicle" }), _jsx("option", { value: "Company", children: "Company" }), _jsx("option", { value: "Driver", children: "Driver" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-900 dark:text-white mb-2", children: "File" }), _jsxs("div", { onDrop: handleDrop, onDragOver: handleDragOver, onDragLeave: handleDragLeave, onClick: () => fileInputRef.current?.click(), className: `relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${isDragging
                                                        ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/10'
                                                        : selectedFile
                                                            ? 'border-emerald-300 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-900/10'
                                                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-slate-800/50'}`, children: [_jsx("input", { ref: fileInputRef, type: "file", onChange: handleFileSelect, accept: ".pdf,.jpg,.jpeg,.png", className: "hidden" }), selectedFile ? (_jsxs("div", { children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-3", children: _jsx(FileText, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }) }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white", children: selectedFile.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: formatFileSize(selectedFile.size) }), _jsx("button", { onClick: (e) => {
                                                                        e.stopPropagation();
                                                                        setSelectedFile(null);
                                                                    }, className: "mt-2 text-xs text-red-500 hover:text-red-600 dark:hover:text-red-400 font-medium", children: "Remove" })] })) : (_jsxs("div", { children: [_jsx("div", { className: "w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-3", children: _jsx(Upload, { className: "h-5 w-5 text-slate-400" }) }), _jsxs("p", { className: "text-sm text-slate-700 dark:text-slate-300", children: ["Drop file here or", ' ', _jsx("span", { className: "text-cyan-600 dark:text-cyan-400 font-medium", children: "browse" })] }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-1", children: "PDF, JPG, PNG up to 10MB" })] }))] })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: closeModal, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-200 dark:disabled:bg-slate-700 disabled:text-slate-400 dark:disabled:text-slate-500 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Upload" })] })] }) })] }))] }));
}
