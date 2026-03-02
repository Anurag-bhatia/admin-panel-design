import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Upload, Download } from 'lucide-react';
export function BulkUploadModal({ onUpload, onDownloadTemplate, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
                setSelectedFile(file);
            }
        }
    };
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };
    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        }
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full my-8", children: [_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsx("h2", { className: "text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white", children: "Bulk Upload Subscribers" }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-6 py-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto", children: [_jsx("div", { children: _jsxs("button", { onClick: onDownloadTemplate, className: "inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Download, { className: "w-4 h-4" }), "Download Sample Template"] }) }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3", children: "Upload Your File" }), _jsxs("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, className: `relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                        : 'border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600'}`, children: [_jsx("input", { type: "file", accept: ".xlsx,.xls", onChange: handleFileSelect, className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer" }), _jsx(Upload, { className: "w-12 h-12 mx-auto mb-4 text-slate-400" }), selectedFile ? (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: selectedFile.name }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: [(selectedFile.size / 1024).toFixed(2), " KB"] })] })) : (_jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: "Drop your Excel file here" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: "or click to browse (.xlsx, .xls)" })] }))] })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed transition-colors", children: "Upload & Process" })] })] }) }));
}
