import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Plus, GripVertical, Edit2, Trash2, Check, X, Users, Scale } from 'lucide-react';
const INITIAL_TEMPLATES = [
    {
        id: 'ops-1',
        audience: 'ops',
        text: 'Please share the vehicle RC copy at your earliest.',
        active: true,
    },
    {
        id: 'ops-2',
        audience: 'ops',
        text: 'The court hearing is scheduled for the next week. Please prepare the challan copy.',
        active: true,
    },
    {
        id: 'ops-3',
        audience: 'ops',
        text: 'Could you confirm the current status with the RTO?',
        active: true,
    },
    {
        id: 'ops-4',
        audience: 'ops',
        text: 'Payment receipt received. Please proceed to close.',
        active: false,
    },
    { id: 'law-1', audience: 'lawyerChip', text: 'Need documents', active: true },
    { id: 'law-2', audience: 'lawyerChip', text: 'Incident details unclear', active: true },
    { id: 'law-3', audience: 'lawyerChip', text: 'Need a screenshot', active: true },
    { id: 'law-4', audience: 'lawyerChip', text: 'Hearing deferred', active: true },
];
export function ChatTemplatesPanel() {
    const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
    const [adding, setAdding] = useState(null);
    const [draft, setDraft] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editDraft, setEditDraft] = useState('');
    const opsTemplates = templates.filter((t) => t.audience === 'ops');
    const chipTemplates = templates.filter((t) => t.audience === 'lawyerChip');
    const handleAdd = (audience) => {
        const text = draft.trim();
        if (!text)
            return;
        setTemplates((prev) => [
            ...prev,
            {
                id: `${audience === 'ops' ? 'ops' : 'law'}-${Date.now()}`,
                audience,
                text,
                active: true,
            },
        ]);
        setDraft('');
        setAdding(null);
    };
    const handleSaveEdit = (id) => {
        const text = editDraft.trim();
        if (!text)
            return;
        setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, text } : t)));
        setEditingId(null);
        setEditDraft('');
    };
    const handleToggle = (id) => setTemplates((prev) => prev.map((t) => (t.id === id ? { ...t, active: !t.active } : t)));
    const handleDelete = (id) => setTemplates((prev) => prev.filter((t) => t.id !== id));
    const move = (id, direction) => {
        setTemplates((prev) => {
            const idx = prev.findIndex((t) => t.id === id);
            if (idx < 0)
                return prev;
            const target = prev[idx];
            const siblings = prev.filter((t) => t.audience === target.audience);
            const localIdx = siblings.findIndex((t) => t.id === id);
            const newLocalIdx = localIdx + direction;
            if (newLocalIdx < 0 || newLocalIdx >= siblings.length)
                return prev;
            const reordered = [...siblings];
            [reordered[localIdx], reordered[newLocalIdx]] = [reordered[newLocalIdx], reordered[localIdx]];
            const otherAudience = prev.filter((t) => t.audience !== target.audience);
            return [...otherAudience, ...reordered].sort((a, b) => {
                if (a.audience !== b.audience)
                    return a.audience === 'ops' ? -1 : 1;
                return 0;
            });
        });
    };
    return (_jsx("div", { className: "p-6 bg-slate-50 dark:bg-slate-950", children: _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("section", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 flex items-center justify-center", children: _jsx(Users, { className: "h-5 w-5 text-cyan-600 dark:text-cyan-400" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Ops reply templates" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Insert into the composer, edit before sending." })] })] }), _jsxs("button", { onClick: () => {
                                        setAdding('ops');
                                        setDraft('');
                                    }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-3.5 w-3.5" }), "Add"] })] }), _jsxs("ul", { className: "divide-y divide-slate-100 dark:divide-slate-800", children: [opsTemplates.map((t) => (_jsxs("li", { className: "group px-5 py-3 flex items-start gap-3", children: [_jsx("button", { onClick: () => move(t.id, -1), className: "mt-0.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-grab", title: "Reorder", children: _jsx(GripVertical, { className: "h-4 w-4" }) }), _jsx("div", { className: "flex-1 min-w-0", children: editingId === t.id ? (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: editDraft, onChange: (e) => setEditDraft(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSaveEdit(t.id), autoFocus: true, className: "flex-1 px-2 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" }), _jsx("button", { onClick: () => handleSaveEdit(t.id), className: "p-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded", children: _jsx(Check, { className: "h-3.5 w-3.5" }) }), _jsx("button", { onClick: () => setEditingId(null), className: "p-1.5 bg-slate-100 dark:bg-slate-700 text-slate-500 rounded", children: _jsx(X, { className: "h-3.5 w-3.5" }) })] })) : (_jsx("p", { className: `text-sm ${t.active
                                                    ? 'text-slate-800 dark:text-slate-200'
                                                    : 'text-slate-400 dark:text-slate-500 line-through'}`, children: t.text })) }), _jsxs("div", { className: "flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity", children: [_jsx("button", { onClick: () => handleToggle(t.id), className: `px-2 py-0.5 rounded-full text-[10px] font-medium border ${t.active
                                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                                        : 'bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'}`, children: t.active ? 'Active' : 'Inactive' }), _jsx("button", { onClick: () => {
                                                        setEditingId(t.id);
                                                        setEditDraft(t.text);
                                                    }, className: "p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded", title: "Edit", children: _jsx(Edit2, { className: "h-3.5 w-3.5" }) }), _jsx("button", { onClick: () => handleDelete(t.id), className: "p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded", title: "Delete", children: _jsx(Trash2, { className: "h-3.5 w-3.5" }) })] })] }, t.id))), adding === 'ops' && (_jsx("li", { className: "px-5 py-3 bg-slate-50 dark:bg-slate-800/40", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "text", value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleAdd('ops'), placeholder: "Enter a reply template\u2026", className: "flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 dark:text-white" }), _jsx("button", { onClick: () => handleAdd('ops'), disabled: !draft.trim(), className: "px-3 py-2 text-xs font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed", children: "Add" }), _jsx("button", { onClick: () => setAdding(null), className: "px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg", children: "Cancel" })] }) }))] })] }), _jsxs("section", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden", children: [_jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-slate-700", children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center", children: _jsx(Scale, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Lawyer quick-reply chips" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: "Shown in the empty-state of the Chats tab in the lawyer app." })] })] }), _jsxs("button", { onClick: () => {
                                        setAdding('lawyerChip');
                                        setDraft('');
                                    }, className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors", children: [_jsx(Plus, { className: "h-3.5 w-3.5" }), "Add"] })] }), _jsxs("div", { className: "p-5", children: [_jsx("div", { className: "flex flex-wrap gap-2 min-h-[48px]", children: chipTemplates.map((t) => (_jsx("div", { className: `group inline-flex items-center gap-1.5 pl-3 pr-1 py-1 rounded-full text-xs font-medium border ${t.active
                                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                                            : 'bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 line-through'}`, children: editingId === t.id ? (_jsxs(_Fragment, { children: [_jsx("input", { type: "text", value: editDraft, autoFocus: true, onChange: (e) => setEditDraft(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleSaveEdit(t.id), className: "w-32 px-1.5 py-0.5 text-xs bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-900 dark:text-white" }), _jsx("button", { onClick: () => handleSaveEdit(t.id), className: "p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded", children: _jsx(Check, { className: "h-3 w-3" }) })] })) : (_jsxs(_Fragment, { children: [_jsx("span", { children: t.text }), _jsxs("div", { className: "flex items-center", children: [_jsx("button", { onClick: () => handleToggle(t.id), className: "p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded", title: t.active ? 'Deactivate' : 'Activate', children: _jsx(Check, { className: "h-3 w-3" }) }), _jsx("button", { onClick: () => {
                                                                setEditingId(t.id);
                                                                setEditDraft(t.text);
                                                            }, className: "p-1 hover:bg-emerald-200 dark:hover:bg-emerald-900/40 rounded", title: "Edit", children: _jsx(Edit2, { className: "h-3 w-3" }) }), _jsx("button", { onClick: () => handleDelete(t.id), className: "p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-500", title: "Delete", children: _jsx(Trash2, { className: "h-3 w-3" }) })] })] })) }, t.id))) }), adding === 'lawyerChip' && (_jsxs("div", { className: "mt-3 flex items-center gap-2", children: [_jsx("input", { type: "text", value: draft, autoFocus: true, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => e.key === 'Enter' && handleAdd('lawyerChip'), placeholder: "Short chip label, e.g. Need challan copy", className: "flex-1 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 dark:text-white" }), _jsx("button", { onClick: () => handleAdd('lawyerChip'), disabled: !draft.trim(), className: "px-3 py-2 text-xs font-medium text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg disabled:bg-slate-300 disabled:cursor-not-allowed", children: "Add" }), _jsx("button", { onClick: () => setAdding(null), className: "px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg", children: "Cancel" })] }))] })] })] }) }));
}
