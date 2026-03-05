import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FileText, Upload, Download, Eye, X, } from 'lucide-react';
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
export function EvidenceTab({ evidence, onUploadEvidence }) {
    const [showUploadForm, setShowUploadForm] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleUpload = () => {
        if (selectedFile && onUploadEvidence) {
            onUploadEvidence(selectedFile);
            setSelectedFile(null);
            setShowUploadForm(false);
        }
    };
    const sortedEvidence = [...evidence].sort((a, b) => new Date(b.uploadedOn).getTime() - new Date(a.uploadedOn).getTime());
    return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Evidence & Documents" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Documents uploaded by both the disputing party and the internal team" })] }), _jsxs("button", { onClick: () => setShowUploadForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload Evidence"] })] }), showUploadForm && (_jsxs("div", { className: "mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-base font-medium text-slate-900 dark:text-white", children: "Upload Evidence" }), _jsx("button", { onClick: () => {
                                        setShowUploadForm(false);
                                        setSelectedFile(null);
                                    }, className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-500" }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Select File" }), _jsx("input", { type: "file", onChange: handleFileSelect, className: "w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 dark:file:bg-cyan-900/20 dark:file:text-cyan-400 dark:hover:file:bg-cyan-900/30" }), selectedFile && (_jsxs("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: ["Selected: ", selectedFile.name, " (", (selectedFile.size / 1024).toFixed(1), " KB)"] }))] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { onClick: () => {
                                                setShowUploadForm(false);
                                                setSelectedFile(null);
                                            }, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Upload" })] })] })] })), sortedEvidence.length === 0 ? (_jsxs("div", { className: "text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4", children: _jsx(FileText, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No evidence uploaded" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: "Upload documents, screenshots, or other evidence files" }), _jsxs("button", { onClick: () => setShowUploadForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload First Evidence"] })] })) : (_jsx("div", { className: "space-y-3", children: sortedEvidence.map((item) => (_jsx("div", { className: "bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-4 hover:border-slate-300 dark:hover:border-slate-600 transition-colors", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [_jsx("div", { className: "w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0", children: _jsx(FileText, { className: "h-5 w-5 text-slate-600 dark:text-slate-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: item.fileName }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [item.type, " \u2022 ", item.fileSize, " \u2022 Uploaded by ", item.uploadedBy] }), _jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 mt-0.5", children: formatDateTime(item.uploadedOn) })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0 ml-4", children: [_jsx("button", { className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "View", children: _jsx(Eye, { className: "h-4 w-4" }) }), _jsx("button", { className: "p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", title: "Download", children: _jsx(Download, { className: "h-4 w-4" }) })] })] }) }, item.id))) }))] }) }));
}
