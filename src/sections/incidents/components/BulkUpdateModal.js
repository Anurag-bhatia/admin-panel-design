import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Upload, FileSpreadsheet, AlertCircle, Download } from 'lucide-react';
function formatFileSize(bytes) {
    if (bytes < 1024)
        return bytes + ' B';
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
export function BulkUpdateModal({ selectedCount, onUpload, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            const validTypes = [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',
            ];
            if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                setSelectedFile(file);
            }
        }
    };
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        }
        else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            const validTypes = [
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'text/csv',
            ];
            if (validTypes.includes(file.type) || file.name.endsWith('.csv') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                setSelectedFile(file);
            }
        }
    };
    const handleUpload = () => {
        if (selectedFile) {
            onUpload?.(selectedFile);
        }
    };
    const handleDownloadTemplate = () => {
        // In a real implementation, this would download a template file
        console.log('Download template');
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Bulk Update Challans" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: selectedCount === 1
                                        ? '1 challan selected'
                                        : `${selectedCount} challans selected` })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("div", { className: "p-6 space-y-6", children: [_jsx("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(AlertCircle, { className: "h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm text-blue-900 dark:text-blue-300 font-medium mb-2", children: "How to use bulk update:" }), _jsxs("ol", { className: "text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside", children: [_jsx("li", { children: "Download the template file below" }), _jsx("li", { children: "Fill in the data for the challans you want to update" }), _jsx("li", { children: "Upload the completed file" }), _jsx("li", { children: "Review the changes before confirming" })] })] })] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Step 1: Download Template" }), _jsxs("button", { onClick: handleDownloadTemplate, className: "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-900/20 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 border border-cyan-200 dark:border-cyan-800 rounded-lg transition-colors", children: [_jsx(Download, { className: "h-4 w-4" }), "Download Excel Template"] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2", children: "The template includes the incident IDs of selected challans" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: "Step 2: Upload Completed File" }), _jsxs("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, className: `relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                        : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'}`, children: [_jsx("input", { type: "file", id: "file-upload", accept: ".csv,.xlsx,.xls,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv", onChange: handleFileSelect, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }), _jsxs("div", { className: "pointer-events-none", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4", children: _jsx(FileSpreadsheet, { className: "h-6 w-6 text-slate-600 dark:text-slate-400" }) }), selectedFile ? (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: selectedFile.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatFileSize(selectedFile.size) }), _jsx("button", { onClick: (e) => {
                                                                e.stopPropagation();
                                                                setSelectedFile(null);
                                                            }, className: "mt-3 text-sm text-red-600 dark:text-red-400 hover:underline pointer-events-auto", children: "Remove file" })] })) : (_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: ["Drop your file here, or", ' ', _jsx("label", { htmlFor: "file-upload", className: "text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer pointer-events-auto", children: "browse" })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Supports Excel (.xlsx, .xls) and CSV files" })] }))] })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2", children: "Maximum file size: 10 MB" })] }), _jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 border border-slate-200 dark:border-slate-700", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-2", children: "Supported update fields:" }), _jsxs("div", { className: "grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400", children: [_jsx("div", { children: "\u2022 Challan Number" }), _jsx("div", { children: "\u2022 Vehicle Number" }), _jsx("div", { children: "\u2022 State" }), _jsx("div", { children: "\u2022 Offence" }), _jsx("div", { children: "\u2022 Fine Amount" }), _jsx("div", { children: "\u2022 Status" }), _jsx("div", { children: "\u2022 Queue" }), _jsx("div", { children: "\u2022 Resolution Notes" })] })] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { onClick: handleUpload, disabled: !selectedFile, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload & Update"] })] })] }) }));
}
