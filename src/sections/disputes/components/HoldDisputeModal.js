import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, PauseCircle, Paperclip, FileText } from 'lucide-react';
function formatFileSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
export function HoldDisputeModal({ onConfirm, onClose }) {
    const [reason, setReason] = useState('');
    const [attachments, setAttachments] = useState([]);
    const fileInputRef = useRef(null);
    const canSubmit = reason.trim().length > 0;
    const handleConfirm = () => {
        if (!canSubmit)
            return;
        onConfirm?.(reason.trim(), attachments);
    };
    const handleFilesSelected = (event) => {
        const files = event.target.files;
        if (!files || files.length === 0)
            return;
        setAttachments((prev) => [...prev, ...Array.from(files)]);
        event.target.value = '';
    };
    const handleRemoveAttachment = (index) => {
        setAttachments((prev) => prev.filter((_, i) => i !== index));
    };
    return createPortal(_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Move to Hold" }) }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-6 py-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Reason" }), _jsx("textarea", { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Why is this ticket being placed on hold?", rows: 4, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none", autoFocus: true })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Attachments" }), _jsx("input", { ref: fileInputRef, type: "file", multiple: true, onChange: handleFilesSelected, className: "hidden" }), _jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(Paperclip, { className: "h-4 w-4" }), "Add attachment"] }), attachments.length > 0 && (_jsx("ul", { className: "mt-3 space-y-2", children: attachments.map((file, index) => (_jsxs("li", { className: "flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(FileText, { className: "h-4 w-4 text-slate-400 flex-shrink-0" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300 truncate", children: file.name }), _jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500 flex-shrink-0", children: formatFileSize(file.size) })] }), _jsx("button", { type: "button", onClick: () => handleRemoveAttachment(index), className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors flex-shrink-0", children: _jsx(X, { className: "h-3.5 w-3.5 text-slate-500" }) })] }, `${file.name}-${index}`))) }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { onClick: handleConfirm, disabled: !canSubmit, className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: [_jsx(PauseCircle, { className: "h-4 w-4" }), "Move to Hold"] })] })] }) }), document.body);
}
