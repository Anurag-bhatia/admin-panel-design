import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { X, Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
export function UploadDocumentModal({ leadId, leadName, documentCategories, onUpload, onClose }) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [category, setCategory] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const [errors, setErrors] = useState({});
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
            setSelectedFile(files[0]);
        }
    };
    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        }
    };
    const handleUpload = () => {
        const newErrors = {};
        if (!selectedFile) {
            newErrors.file = 'Please select a file to upload';
        }
        if (!category) {
            newErrors.category = 'Please select a document category';
        }
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        if (selectedFile && category) {
            onUpload(leadId, selectedFile, category);
        }
    };
    const formatFileSize = (bytes) => {
        if (bytes === 0)
            return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };
    return (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full my-8", children: [_jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-base sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white", children: "Upload Document" }), _jsx("p", { className: "text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5", children: leadName })] }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-4 sm:px-6 py-4 sm:py-6 space-y-5", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Document Category ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsxs("select", { value: category, onChange: e => {
                                        setCategory(e.target.value);
                                        setErrors({ ...errors, category: '' });
                                    }, className: `w-full pl-3 pr-9 py-2.5 bg-white dark:bg-slate-950 border ${errors.category ? 'border-red-500' : 'border-slate-300 dark:border-slate-700'} rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23475569%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.25rem] bg-[right_0.5rem_center] bg-no-repeat`, children: [_jsx("option", { value: "", children: "Select Category" }), documentCategories.map(cat => (_jsx("option", { value: cat, children: cat }, cat)))] }), errors.category && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.category })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2", children: ["Select File ", _jsx("span", { className: "text-red-500", children: "*" })] }), !selectedFile ? (_jsx("div", { onDragOver: handleDragOver, onDragLeave: handleDragLeave, onDrop: handleDrop, className: `border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging
                                        ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20'
                                        : errors.file
                                            ? 'border-red-300 dark:border-red-800'
                                            : 'border-slate-300 dark:border-slate-700 hover:border-cyan-400 dark:hover:border-cyan-600'}`, children: _jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: "w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4", children: _jsx(Upload, { className: "w-6 h-6 text-slate-400" }) }), _jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white mb-1", children: "Drag and drop your file here" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-4", children: "or" }), _jsxs("label", { className: "px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors", children: ["Browse Files", _jsx("input", { type: "file", accept: ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png", onChange: handleFileSelect, className: "hidden" })] }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-3", children: "PDF, DOC, XLS, PPT, or Images (max 10 MB)" })] }) })) : (_jsx("div", { className: "border-2 border-cyan-500 dark:border-cyan-600 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-6", children: _jsxs("div", { className: "flex items-start gap-4", children: [_jsx("div", { className: "w-12 h-12 bg-cyan-100 dark:bg-cyan-900/40 rounded-lg flex items-center justify-center shrink-0", children: _jsx(FileText, { className: "w-6 h-6 text-cyan-600 dark:text-cyan-400" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: selectedFile.name }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: formatFileSize(selectedFile.size) })] }), _jsx("button", { onClick: () => {
                                                                    setSelectedFile(null);
                                                                    setErrors({ ...errors, file: '' });
                                                                }, className: "p-1 hover:bg-cyan-200 dark:hover:bg-cyan-800 rounded transition-colors", children: _jsx(X, { className: "w-4 h-4 text-slate-500" }) })] }), _jsxs("div", { className: "flex items-center gap-2 mt-3", children: [_jsx(CheckCircle, { className: "w-4 h-4 text-green-600" }), _jsx("span", { className: "text-xs text-green-700 dark:text-green-400 font-medium", children: "File ready to upload" })] })] })] }) })), errors.file && _jsx("p", { className: "mt-1 text-xs text-red-500", children: errors.file })] })] }), _jsxs("div", { className: "flex items-center justify-end gap-3 px-4 sm:px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleUpload, disabled: !selectedFile || !category, className: "px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-cyan-600", children: "Upload Document" })] })] }) }));
}
