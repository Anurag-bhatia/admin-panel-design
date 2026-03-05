import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
}
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
export function InvestigationTab({ notes, onAddNote }) {
    const [showForm, setShowForm] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noteContent.trim())
            return;
        onAddNote?.(noteContent.trim());
        setNoteContent('');
        setShowForm(false);
    };
    const sortedNotes = [...notes].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    return (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Investigation Notes" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mt-1", children: "Internal review logs, decision reasoning, and reviewer comments" })] }), _jsxs("button", { onClick: () => setShowForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Note"] })] }), showForm && (_jsxs("div", { className: "mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-base font-medium text-slate-900 dark:text-white", children: "Add Investigation Note" }), _jsx("button", { onClick: () => setShowForm(false), className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-500" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: ["Note ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx("textarea", { value: noteContent, onChange: (e) => setNoteContent(e.target.value), placeholder: "Document your findings, reasoning, or decision...", rows: 4, className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none", required: true })] }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: () => setShowForm(false), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: "Save Note" })] })] })] })), sortedNotes.length === 0 ? (_jsxs("div", { className: "text-center py-16", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4", children: _jsx(MessageSquare, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No investigation notes yet" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: "Start documenting your review findings and reasoning" }), _jsxs("button", { onClick: () => setShowForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add First Note"] })] })) : (_jsx("div", { className: "space-y-4", children: sortedNotes.map((note, index) => (_jsxs("div", { className: "relative pl-8 pb-6 last:pb-0", children: [index < sortedNotes.length - 1 && (_jsx("div", { className: "absolute left-[11px] top-6 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" })), _jsx("div", { className: "absolute left-0 top-1 w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center", children: _jsx("div", { className: "w-2.5 h-2.5 rounded-full bg-cyan-500" }) }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300", children: note.author.charAt(0) }), _jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: note.author })] }), _jsxs("span", { className: "text-xs text-slate-500 dark:text-slate-400", children: [formatDate(note.timestamp), " at ", formatTime(note.timestamp)] })] }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300 leading-relaxed", children: note.content })] })] }, note.id))) }))] }) }));
}
