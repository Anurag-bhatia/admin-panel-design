import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, FileText, X } from 'lucide-react';
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
export function NotesTab({ notes, onAddNote, onEditNote, onDeleteNote }) {
    const [showForm, setShowForm] = useState(false);
    const [noteContent, setNoteContent] = useState('');
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!noteContent.trim())
            return;
        onAddNote?.(noteContent.trim());
        setShowForm(false);
        setNoteContent('');
    };
    const handleStartEdit = (note) => {
        setEditingNoteId(note.id);
        setEditContent(note.content);
    };
    const handleSaveEdit = (noteId) => {
        if (!editContent.trim())
            return;
        onEditNote?.(noteId, editContent.trim());
        setEditingNoteId(null);
        setEditContent('');
    };
    const handleCancelEdit = () => {
        setEditingNoteId(null);
        setEditContent('');
    };
    const sortedNotes = [...notes].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    return (_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-slate-900 dark:text-white", children: "Notes" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400", children: "Add internal notes and remarks for this challan" })] }), _jsxs("button", { onClick: () => setShowForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add Note"] })] }), showForm && (_jsxs("div", { className: "mb-6 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-base font-medium text-slate-900 dark:text-white", children: "New Note" }), _jsx("button", { onClick: () => setShowForm(false), className: "p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors", children: _jsx(X, { className: "h-4 w-4 text-slate-500" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-4", children: [_jsx("div", { children: _jsx("textarea", { value: noteContent, onChange: (e) => setNoteContent(e.target.value), placeholder: "Write your note here...", rows: 4, className: "w-full px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white resize-none", required: true }) }), _jsxs("div", { className: "flex justify-end gap-3", children: [_jsx("button", { type: "button", onClick: () => setShowForm(false), className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { type: "submit", className: "px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: "Save Note" })] })] })] })), sortedNotes.length === 0 ? (_jsxs("div", { className: "text-center py-12", children: [_jsx("div", { className: "w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4", children: _jsx(FileText, { className: "h-6 w-6 text-slate-400" }) }), _jsx("p", { className: "text-slate-900 dark:text-white font-medium mb-1", children: "No notes yet" }), _jsx("p", { className: "text-sm text-slate-500 dark:text-slate-400 mb-4", children: "Add notes to keep track of important information" }), _jsxs("button", { onClick: () => setShowForm(true), className: "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-900/20 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-4 w-4" }), "Add First Note"] })] })) : (_jsx("div", { className: "space-y-4", children: sortedNotes.map((note) => (_jsx("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4", children: editingNoteId === note.id ? (_jsxs("div", { className: "space-y-3", children: [_jsx("textarea", { value: editContent, onChange: (e) => setEditContent(e.target.value), rows: 3, className: "w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white resize-none" }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx("button", { onClick: handleCancelEdit, className: "px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors", children: "Cancel" }), _jsx("button", { onClick: () => handleSaveEdit(note.id), className: "px-3 py-1.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: "Save" })] })] })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-start justify-between gap-4 mb-3", children: _jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400", children: [_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-medium text-slate-600 dark:text-slate-300", children: note.createdByName.charAt(0) }), _jsx("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: note.createdByName }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: [formatDate(note.createdAt), " at ", formatTime(note.createdAt)] }), note.updatedAt && (_jsxs(_Fragment, { children: [_jsx("span", { children: "\u2022" }), _jsx("span", { className: "italic", children: "edited" })] }))] }) }), _jsx("p", { className: "text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap", children: note.content })] })) }, note.id))) }))] }));
}
