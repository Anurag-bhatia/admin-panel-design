import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { X, ArrowRight, UserPlus, ChevronDown, Paperclip, FileText, } from 'lucide-react';
const STATUS_OPTIONS = [
    { key: 'assigned', label: 'Assigned' },
    { key: 'follow-up', label: 'Follow-up' },
    { key: 'projected', label: 'Projected' },
    { key: 'invoiced', label: 'Ready to Invoice' },
    { key: 'sales', label: 'Converted' },
    { key: 'lost', label: 'Lost' },
];
export function BulkActionsBar({ selectedCount, onClearSelection, onMoveStatus, onAssignOwner, }) {
    const [showStatusDropdown, setShowStatusDropdown] = useState(false);
    const [pendingStatus, setPendingStatus] = useState(null);
    const [notes, setNotes] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [notesError, setNotesError] = useState(null);
    const attachmentInputRef = useRef(null);
    const handleStatusPick = (status) => {
        setShowStatusDropdown(false);
        if (status.key === 'assigned') {
            onAssignOwner?.();
            return;
        }
        setPendingStatus(status);
        setNotes('');
        setAttachments([]);
        setNotesError(null);
    };
    const handleNotesSubmit = () => {
        if (!pendingStatus)
            return;
        if (!notes.trim()) {
            setNotesError('Notes are required');
            return;
        }
        onMoveStatus?.(pendingStatus.key, notes);
        setPendingStatus(null);
        setNotes('');
        setAttachments([]);
        setNotesError(null);
    };
    const handleAttachmentPick = (files) => {
        if (!files || files.length === 0)
            return;
        setAttachments(prev => [...prev, ...Array.from(files)]);
        if (attachmentInputRef.current)
            attachmentInputRef.current.value = '';
    };
    const removeAttachment = (idx) => {
        setAttachments(prev => prev.filter((_, i) => i !== idx));
    };
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 duration-300", children: _jsxs("div", { className: "flex items-center gap-2 px-4 py-3 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border border-slate-700", children: [_jsxs("div", { className: "flex items-center gap-2 pr-3 border-r border-slate-700", children: [_jsx("span", { className: "flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full bg-cyan-500 text-white text-sm font-semibold", children: selectedCount }), _jsx("span", { className: "text-sm text-slate-300", children: "selected" }), _jsx("button", { onClick: onClearSelection, className: "p-1 hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-400" }) })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => {
                                                setShowStatusDropdown(!showStatusDropdown);
                                            }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(ArrowRight, { className: "h-4 w-4" }), _jsx("span", { children: "Move Status" }), _jsx(ChevronDown, { className: "h-3 w-3" })] }), showStatusDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0", onClick: () => setShowStatusDropdown(false) }), _jsx("div", { className: "absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-60 overflow-y-auto", children: STATUS_OPTIONS.map((status) => (_jsx("button", { onClick: () => handleStatusPick(status), className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: status.label }, status.key))) })] }))] }), _jsxs("button", { onClick: () => {
                                        setShowStatusDropdown(false);
                                        onAssignOwner?.();
                                    }, className: "inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(UserPlus, { className: "h-4 w-4" }), _jsx("span", { children: "Assign" })] })] })] }) }), pendingStatus && (_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-lg w-full", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: ["Move to ", pendingStatus.label] }), _jsxs("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-0.5", children: [selectedCount, " selected"] })] }), _jsx("button", { onClick: () => setPendingStatus(null), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "w-5 h-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-6 py-5 space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: ["Notes ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: notes, onChange: e => {
                                                setNotes(e.target.value);
                                                if (notesError)
                                                    setNotesError(null);
                                            }, placeholder: "Add a note about this status change...", rows: 4, className: `w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none ${notesError ? 'border-red-400 dark:border-red-500' : 'border-slate-200 dark:border-slate-700'}` }), notesError && _jsx("p", { className: "mt-1 text-xs text-red-500", children: notesError })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Attachments" }), _jsx("input", { ref: attachmentInputRef, type: "file", multiple: true, className: "hidden", onChange: e => handleAttachmentPick(e.target.files) }), _jsxs("button", { type: "button", onClick: () => attachmentInputRef.current?.click(), className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx(Paperclip, { className: "w-4 h-4" }), "Add attachment"] }), attachments.length > 0 && (_jsx("ul", { className: "mt-2 space-y-1.5", children: attachments.map((file, idx) => (_jsxs("li", { className: "flex items-center justify-between gap-2 px-3 py-2 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(FileText, { className: "w-4 h-4 text-slate-400 shrink-0" }), _jsx("span", { className: "text-sm text-slate-900 dark:text-slate-100 truncate", children: file.name }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400 shrink-0", children: ["(", (file.size / 1024).toFixed(1), " KB)"] })] }), _jsx("button", { type: "button", onClick: () => removeAttachment(idx), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded", children: _jsx(X, { className: "w-3.5 h-3.5 text-slate-500" }) })] }, `${file.name}-${idx}`))) }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-800", children: [_jsx("button", { onClick: () => setPendingStatus(null), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsxs("button", { onClick: handleNotesSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: ["Move to ", pendingStatus.label] })] })] }) }))] }));
}
