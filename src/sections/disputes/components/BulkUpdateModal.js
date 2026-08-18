import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Upload, FileSpreadsheet } from 'lucide-react';
function formatFileSize(bytes) {
    if (bytes < 1024)
        return bytes + ' B';
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
export function BulkUpdateModal({ onUpload, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
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
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Bulk Update Disputes" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Upload a file to update multiple disputes at once" })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsx("div", { className: "p-6 space-y-6", children: _jsx("div", { children: _jsxs("div", { onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, className: `relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragActive
                                ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'}`, children: [_jsx("input", { type: "file", id: "bulk-update-file", accept: ".csv,.xlsx,.xls", onChange: handleFileSelect, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }), _jsxs("div", { className: "pointer-events-none", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4", children: _jsx(FileSpreadsheet, { className: "h-6 w-6 text-slate-600 dark:text-slate-400" }) }), selectedFile ? (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: selectedFile.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: formatFileSize(selectedFile.size) }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        setSelectedFile(null);
                                                    }, className: "mt-3 text-sm text-red-600 dark:text-red-400 hover:underline pointer-events-auto", children: "Remove file" })] })) : (_jsxs("div", { children: [_jsxs("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: ["Drop your file here, or", ' ', _jsx("label", { htmlFor: "bulk-update-file", className: "text-cyan-600 dark:text-cyan-400 hover:underline cursor-pointer pointer-events-auto", children: "browse" })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "Supports Excel (.xlsx, .xls) and CSV files" })] }))] })] }) }) }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { onClick: handleUpload, disabled: !selectedFile, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: [_jsx(Upload, { className: "h-4 w-4" }), "Upload & Update"] })] })] }) }));
}
