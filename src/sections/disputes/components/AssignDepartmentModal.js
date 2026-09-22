import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Building2, Search, Paperclip, FileText } from 'lucide-react';
function formatFileSize(bytes) {
    if (bytes < 1024)
        return `${bytes} B`;
    if (bytes < 1024 * 1024)
        return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
const DEPARTMENTS = [
    'Operations',
    'Legal',
    'Accounts',
    'Marketing',
    'Product',
];
export function AssignDepartmentModal({ currentDepartment, onAssign, onClose, }) {
    const [selected, setSelected] = useState(currentDepartment || null);
    const [search, setSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [person, setPerson] = useState('');
    const [notes, setNotes] = useState('');
    const [attachments, setAttachments] = useState([]);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);
    const filteredDepartments = DEPARTMENTS.filter((d) => d.toLowerCase().includes(search.toLowerCase()));
    const canSubmit = selected !== null && person.trim().length > 0;
    const handleAssign = () => {
        if (!canSubmit || !selected)
            return;
        onAssign?.(selected, person.trim(), notes.trim(), attachments);
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
    return createPortal(_jsx("div", { className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4", children: _jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl shadow-xl max-w-md w-full", children: [_jsxs("div", { className: "flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsx("div", { children: _jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Transfer to Department" }) }), _jsx("button", { onClick: onClose, className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(X, { className: "h-5 w-5 text-slate-500" }) })] }), _jsxs("div", { className: "px-6 py-5 space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Department" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" }), _jsx("input", { ref: inputRef, type: "text", value: search, onChange: (e) => {
                                                setSearch(e.target.value);
                                                setShowDropdown(true);
                                            }, onFocus: () => setShowDropdown(true), placeholder: "Search department...", className: "w-full pl-10 pr-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" }), showDropdown && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowDropdown(false) }), _jsx("div", { className: "absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 max-h-56 overflow-y-auto z-20", children: filteredDepartments.length === 0 ? (_jsx("div", { className: "px-3 py-4 text-center text-sm text-slate-500 dark:text-slate-400", children: "No departments found" })) : (filteredDepartments.map((dept) => (_jsxs("button", { onClick: () => {
                                                            setSelected(dept);
                                                            setSearch('');
                                                            setShowDropdown(false);
                                                        }, className: "w-full flex items-center gap-3 px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors", children: [_jsx("div", { className: "w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center flex-shrink-0", children: _jsx(Building2, { className: "h-4 w-4 text-slate-500 dark:text-slate-400" }) }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: dept })] }, dept)))) })] }))] }), selected && (_jsx("div", { className: "mt-2", children: _jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg", children: [_jsx(Building2, { className: "h-4 w-4 text-cyan-600 dark:text-cyan-400" }), _jsx("span", { className: "text-sm font-medium text-cyan-900 dark:text-cyan-300", children: selected }), _jsx("button", { onClick: () => {
                                                    setSelected(null);
                                                    inputRef.current?.focus();
                                                }, className: "p-0.5 hover:bg-cyan-100 dark:hover:bg-cyan-900/40 rounded transition-colors", children: _jsx(X, { className: "h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" }) })] }) }))] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Person Name" }), _jsx("input", { type: "text", value: person, onChange: (e) => setPerson(e.target.value), placeholder: "Enter the person handling this ticket...", className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Notes" }), _jsx("textarea", { value: notes, onChange: (e) => setNotes(e.target.value), placeholder: "Add any additional notes...", rows: 3, className: "w-full px-3 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5", children: "Attachments" }), _jsx("input", { ref: fileInputRef, type: "file", multiple: true, onChange: handleFilesSelected, className: "hidden" }), _jsxs("button", { type: "button", onClick: () => fileInputRef.current?.click(), className: "inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg transition-colors", children: [_jsx(Paperclip, { className: "h-4 w-4" }), "Add attachment"] }), attachments.length > 0 && (_jsx("ul", { className: "mt-3 space-y-2", children: attachments.map((file, index) => (_jsxs("li", { className: "flex items-center justify-between gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg", children: [_jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [_jsx(FileText, { className: "h-4 w-4 text-slate-400 flex-shrink-0" }), _jsx("span", { className: "text-sm text-slate-700 dark:text-slate-300 truncate", children: file.name }), _jsx("span", { className: "text-xs text-slate-400 dark:text-slate-500 flex-shrink-0", children: formatFileSize(file.size) })] }), _jsx("button", { type: "button", onClick: () => handleRemoveAttachment(index), className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors flex-shrink-0", children: _jsx(X, { className: "h-3.5 w-3.5 text-slate-500" }) })] }, `${file.name}-${index}`))) }))] })] }), _jsxs("div", { className: "flex justify-end gap-3 px-6 py-4 border-t border-slate-200 dark:border-slate-700", children: [_jsx("button", { onClick: onClose, className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: handleAssign, disabled: !canSubmit, className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed rounded-lg transition-colors", children: "Transfer" })] })] }) }), document.body);
}
