import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Paperclip, Send, Phone, Lock, Zap, StickyNote, Check, CheckCheck, FileText, Image as ImageIcon, Download, Save, CornerUpLeft, X, ChevronDown, Users, RotateCcw, AlertCircle, } from 'lucide-react';
const DEFAULT_TEMPLATES = [
    { id: 'tpl-1', text: 'Please share the vehicle RC copy at your earliest.' },
    { id: 'tpl-2', text: 'Court hearing is scheduled for the next week. Prepare the challan copy.' },
    { id: 'tpl-3', text: 'Could you confirm the current status with the RTO?' },
    { id: 'tpl-4', text: 'Payment receipt received. Please proceed to close.' },
];
function formatTime(iso) {
    return new Date(iso).toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
    });
}
function formatDateDivider(iso) {
    const date = new Date(iso);
    const today = new Date();
    const yesterday = new Date(today.getTime() - 86400000);
    if (date.toDateString() === today.toDateString())
        return 'Today';
    if (date.toDateString() === yesterday.toDateString())
        return 'Yesterday';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function buildSampleMessages(lawyerName, opsName) {
    const now = Date.now();
    const minute = 60 * 1000;
    return [
        {
            id: 'm-sys-1',
            sender: 'system',
            body: `Chat started with ${lawyerName}`,
            createdAt: new Date(now - 180 * minute).toISOString(),
        },
        {
            id: 'm-1',
            sender: 'lawyer',
            senderName: lawyerName,
            body: 'Hi team, I need the challan copy for this incident. The one in the file is not legible.',
            createdAt: new Date(now - 165 * minute).toISOString(),
        },
        {
            id: 'm-2',
            sender: 'ops',
            senderName: opsName,
            body: 'Sure, sharing the clean copy and the RC in a minute.',
            createdAt: new Date(now - 160 * minute).toISOString(),
            status: 'read',
        },
        {
            id: 'm-3',
            sender: 'ops',
            senderName: opsName,
            attachments: [
                {
                    id: 'att-1',
                    kind: 'document',
                    name: 'challan-HR26-copy.pdf',
                    sizeLabel: '1.2 MB',
                },
                {
                    id: 'att-2',
                    kind: 'document',
                    name: 'rc-HR26-2024.pdf',
                    sizeLabel: '640 KB',
                },
            ],
            createdAt: new Date(now - 158 * minute).toISOString(),
            status: 'read',
        },
        {
            id: 'm-4',
            sender: 'lawyer',
            senderName: lawyerName,
            body: 'Received. The challan date on the RTO portal shows a different fine amount — attaching a screenshot.',
            createdAt: new Date(now - 120 * minute).toISOString(),
        },
        {
            id: 'm-5',
            sender: 'lawyer',
            senderName: lawyerName,
            attachments: [
                {
                    id: 'att-3',
                    kind: 'image',
                    name: 'rto-portal-screenshot.jpg',
                    sizeLabel: '820 KB',
                    thumbnailUrl: '',
                },
            ],
            createdAt: new Date(now - 118 * minute).toISOString(),
        },
        {
            id: 'm-note-1',
            sender: 'ops',
            senderName: opsName,
            isInternalNote: true,
            body: 'Confirmed with finance — the virtual amount is correct, we will reconcile after settlement.',
            createdAt: new Date(now - 90 * minute).toISOString(),
            status: 'sent',
        },
        {
            id: 'm-6',
            sender: 'ops',
            senderName: opsName,
            body: 'Thanks, we have escalated with the RTO. The physical court hearing is scheduled for 15 Oct.',
            createdAt: new Date(now - 45 * minute).toISOString(),
            status: 'read',
            replyTo: {
                id: 'm-4',
                sender: 'lawyer',
                preview: 'Received. The challan date on the RTO portal shows a different fine amount…',
            },
        },
        {
            id: 'm-7',
            sender: 'lawyer',
            senderName: lawyerName,
            body: 'Noted. Will keep you posted after the hearing.',
            createdAt: new Date(now - 12 * minute).toISOString(),
        },
    ];
}
export function ChatsTab({ incidentId: _incidentId, lawyer, owner, users, isReadOnly = false, canReopen = false, quickReplyTemplates = DEFAULT_TEMPLATES, currentUserName = 'Priya Sharma', onCall, onAssignToMe, onAssign, onReopen, onSaveAttachmentToDocuments, }) {
    const lawyerName = lawyer?.name.replace('Adv. ', '') ?? 'Unassigned Lawyer';
    const [messages, setMessages] = useState(() => buildSampleMessages(lawyerName, currentUserName));
    const [draft, setDraft] = useState('');
    const [isInternalNote, setIsInternalNote] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showOwnerMenu, setShowOwnerMenu] = useState(false);
    const [replyTarget, setReplyTarget] = useState(null);
    const [isDraggingFile, setIsDraggingFile] = useState(false);
    const [isLawyerTyping, setIsLawyerTyping] = useState(false);
    const scrollRef = useRef(null);
    const textareaRef = useRef(null);
    const groups = useMemo(() => {
        const map = new Map();
        for (const m of messages) {
            const key = new Date(m.createdAt).toDateString();
            if (!map.has(key))
                map.set(key, []);
            map.get(key).push(m);
        }
        return Array.from(map.entries()).map(([key, items]) => ({
            key,
            label: formatDateDivider(items[0].createdAt),
            items,
        }));
    }, [messages]);
    useEffect(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
    }, [messages.length]);
    useEffect(() => {
        const t = setTimeout(() => setIsLawyerTyping(true), 1800);
        const u = setTimeout(() => setIsLawyerTyping(false), 4600);
        return () => {
            clearTimeout(t);
            clearTimeout(u);
        };
    }, []);
    const handleSend = () => {
        if (isReadOnly)
            return;
        const trimmed = draft.trim();
        if (!trimmed)
            return;
        const newMessage = {
            id: `m-${Date.now()}`,
            sender: 'ops',
            senderName: currentUserName,
            body: trimmed,
            createdAt: new Date().toISOString(),
            status: 'sent',
            isInternalNote,
            replyTo: replyTarget && (replyTarget.sender === 'lawyer' || replyTarget.sender === 'ops')
                ? {
                    id: replyTarget.id,
                    sender: replyTarget.sender,
                    preview: (replyTarget.body ?? replyTarget.attachments?.[0]?.name ?? '').slice(0, 80),
                }
                : undefined,
        };
        setMessages((prev) => [...prev, newMessage]);
        setDraft('');
        setReplyTarget(null);
        setIsInternalNote(false);
    };
    const handleTemplate = (text) => {
        setDraft((prev) => (prev ? `${prev} ${text}` : text));
        setShowTemplates(false);
        textareaRef.current?.focus();
    };
    const handleSaveAttachment = (messageId, attachmentId) => {
        setMessages((prev) => prev.map((m) => m.id === messageId
            ? {
                ...m,
                attachments: m.attachments?.map((a) => a.id === attachmentId ? { ...a, savedToDocuments: true } : a),
            }
            : m));
        onSaveAttachmentToDocuments?.(messageId, attachmentId);
    };
    const onDragOver = (e) => {
        e.preventDefault();
        if (!isReadOnly)
            setIsDraggingFile(true);
    };
    const onDragLeave = () => setIsDraggingFile(false);
    const onDrop = (e) => {
        e.preventDefault();
        setIsDraggingFile(false);
        if (isReadOnly)
            return;
        const files = Array.from(e.dataTransfer.files);
        if (!files.length)
            return;
        const atts = files.map((f, i) => ({
            id: `drop-${Date.now()}-${i}`,
            kind: f.type.startsWith('image/') ? 'image' : 'document',
            name: f.name,
            sizeLabel: `${Math.max(1, Math.round(f.size / 1024))} KB`,
        }));
        setMessages((prev) => [
            ...prev,
            {
                id: `m-${Date.now()}`,
                sender: 'ops',
                senderName: currentUserName,
                attachments: atts,
                createdAt: new Date().toISOString(),
                status: 'sent',
            },
        ]);
    };
    return (_jsxs("div", { className: "relative flex flex-col h-[640px]", onDragOver: onDragOver, onDragLeave: onDragLeave, onDrop: onDrop, children: [_jsxs("div", { className: "flex items-center justify-between gap-3 px-5 py-3 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: [_jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [_jsx("div", { className: "h-9 w-9 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-sm font-semibold text-cyan-700 dark:text-cyan-300 flex-shrink-0", children: lawyerName.charAt(0) }), _jsxs("div", { className: "min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "text-sm font-semibold text-slate-900 dark:text-white truncate", children: lawyerName }), lawyer && (_jsx("span", { className: "text-xs font-mono text-slate-500 dark:text-slate-400", children: lawyer.id }))] }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 truncate", children: [lawyer?.phone ?? 'No contact on file', lawyer?.state && _jsxs(_Fragment, { children: [" \u00B7 ", lawyer.state] })] })] })] }), _jsxs("div", { className: "flex items-center gap-2 flex-shrink-0", children: [lawyer?.phone && (_jsxs("button", { onClick: () => onCall?.(lawyer.phone), className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 rounded-lg border border-emerald-200 dark:border-emerald-800 transition-colors", children: [_jsx(Phone, { className: "h-3.5 w-3.5" }), "Call"] })), _jsxs("div", { className: "relative", children: [_jsxs("button", { onClick: () => setShowOwnerMenu((v) => !v), className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors", children: [_jsx(Users, { className: "h-3.5 w-3.5" }), owner ? owner.name.split(' ')[0] : 'Unassigned', _jsx(ChevronDown, { className: "h-3 w-3" })] }), showOwnerMenu && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowOwnerMenu(false) }), _jsxs("div", { className: "absolute right-0 top-full mt-1 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-20", children: [_jsx("button", { onClick: () => {
                                                            onAssignToMe?.();
                                                            setShowOwnerMenu(false);
                                                        }, className: "w-full text-left px-3 py-2 text-sm text-cyan-700 dark:text-cyan-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium", children: "Assign to me" }), _jsx("div", { className: "border-t border-slate-100 dark:border-slate-700 my-1" }), _jsx("div", { className: "px-3 py-1.5 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500", children: "Assign to anyone" }), users.slice(0, 6).map((u) => (_jsxs("button", { onClick: () => {
                                                            onAssign?.(u.id);
                                                            setShowOwnerMenu(false);
                                                        }, className: "w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: [_jsx("div", { className: "h-5 w-5 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-[10px] font-medium text-slate-600 dark:text-slate-300", children: u.name.charAt(0) }), _jsx("span", { className: "truncate", children: u.name })] }, u.id)))] })] }))] })] })] }), _jsxs("div", { ref: scrollRef, className: "flex-1 overflow-y-auto px-5 py-4 space-y-4 bg-slate-50 dark:bg-slate-950", children: [groups.map((group) => (_jsxs("div", { className: "space-y-3", children: [_jsx("div", { className: "flex items-center justify-center", children: _jsx("span", { className: "inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-medium bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-400", children: group.label }) }), group.items.map((m) => (_jsx(MessageBubble, { message: m, onReply: () => setReplyTarget(m), onSaveAttachment: (attachmentId) => handleSaveAttachment(m.id, attachmentId) }, m.id)))] }, group.key))), isLawyerTyping && !isReadOnly && (_jsxs("div", { className: "flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pl-1", children: [_jsxs("div", { className: "flex gap-1", children: [_jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse" }), _jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:150ms]" }), _jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-slate-400 animate-pulse [animation-delay:300ms]" })] }), _jsxs("span", { children: [lawyerName.split(' ')[0], " is typing\u2026"] })] }))] }), isReadOnly ? (_jsx("div", { className: "border-t border-slate-200 dark:border-slate-700 bg-amber-50 dark:bg-amber-900/10 px-5 py-3", children: _jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "flex items-center gap-2 text-sm text-amber-800 dark:text-amber-300", children: [_jsx(Lock, { className: "h-4 w-4" }), "This incident is closed. Chat is read-only."] }), canReopen && (_jsxs("button", { onClick: () => onReopen?.(), className: "inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-900 dark:text-amber-200 bg-amber-100 dark:bg-amber-900/30 hover:bg-amber-200 dark:hover:bg-amber-900/50 rounded-lg border border-amber-300 dark:border-amber-800 transition-colors", children: [_jsx(RotateCcw, { className: "h-3.5 w-3.5" }), "Reopen chat"] }))] }) })) : (_jsxs("div", { className: "border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900", children: [replyTarget && (_jsxs("div", { className: "flex items-start justify-between gap-3 px-5 pt-3", children: [_jsxs("div", { className: "flex-1 border-l-2 border-cyan-500 bg-slate-50 dark:bg-slate-800 rounded-r-md px-3 py-1.5 min-w-0", children: [_jsxs("p", { className: "text-[11px] font-medium text-cyan-700 dark:text-cyan-300", children: ["Replying to ", replyTarget.sender === 'lawyer' ? lawyerName : replyTarget.senderName] }), _jsx("p", { className: "text-xs text-slate-600 dark:text-slate-400 truncate", children: replyTarget.body ?? replyTarget.attachments?.[0]?.name })] }), _jsx("button", { onClick: () => setReplyTarget(null), className: "p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded", children: _jsx(X, { className: "h-4 w-4 text-slate-500" }) })] })), isInternalNote && (_jsxs("div", { className: "mx-5 mt-3 flex items-center gap-2 rounded-md border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 text-[11px] font-medium text-amber-800 dark:text-amber-300", children: [_jsx(StickyNote, { className: "h-3.5 w-3.5" }), "Internal note mode \u2014 this will NOT be visible to the lawyer."] })), _jsxs("div", { className: "px-5 py-3", children: [_jsxs("div", { className: "flex items-end gap-2", children: [_jsx("button", { className: "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", title: "Attach file", children: _jsx(Paperclip, { className: "h-5 w-5" }) }), _jsxs("div", { className: "relative", children: [_jsx("button", { onClick: () => setShowTemplates((v) => !v), className: "p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", title: "Quick replies", children: _jsx(Zap, { className: "h-5 w-5" }) }), showTemplates && (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-10", onClick: () => setShowTemplates(false) }), _jsxs("div", { className: "absolute bottom-full left-0 mb-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-20", children: [_jsxs("div", { className: "px-3 py-2 border-b border-slate-100 dark:border-slate-700", children: [_jsx("p", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300", children: "Quick replies" }), _jsx("p", { className: "text-[11px] text-slate-500 dark:text-slate-400", children: "Click to insert into composer. You can edit before sending." })] }), _jsx("div", { className: "max-h-64 overflow-y-auto", children: quickReplyTemplates.map((t) => (_jsx("button", { onClick: () => handleTemplate(t.text), className: "w-full text-left px-3 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700", children: t.text }, t.id))) })] })] }))] }), _jsx("button", { onClick: () => setIsInternalNote((v) => !v), className: `p-2 rounded-lg transition-colors ${isInternalNote
                                            ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
                                            : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`, title: "Toggle internal note", children: _jsx(StickyNote, { className: "h-5 w-5" }) }), _jsx("div", { className: "flex-1", children: _jsx("textarea", { ref: textareaRef, value: draft, onChange: (e) => setDraft(e.target.value), onKeyDown: (e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }, placeholder: isInternalNote
                                                ? 'Internal note (not visible to lawyer)…'
                                                : 'Type a message or paste a screenshot…', rows: 1, className: `w-full px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border rounded-lg focus:outline-none focus:ring-2 resize-none max-h-32 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white ${isInternalNote
                                                ? 'border-amber-300 dark:border-amber-800 focus:ring-amber-400'
                                                : 'border-slate-200 dark:border-slate-700 focus:ring-cyan-500'}` }) }), _jsx("button", { onClick: handleSend, disabled: !draft.trim(), className: `p-2.5 rounded-lg transition-colors ${draft.trim()
                                            ? isInternalNote
                                                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                                                : 'bg-cyan-600 hover:bg-cyan-700 text-white'
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`, children: _jsx(Send, { className: "h-4 w-4" }) })] }), _jsxs("p", { className: "mt-2 text-[11px] text-slate-400 dark:text-slate-500 flex items-center gap-1", children: [_jsx(AlertCircle, { className: "h-3 w-3" }), "Messages can't be deleted, unsent, or edited once sent."] })] })] })), isDraggingFile && (_jsx("div", { className: "absolute inset-0 z-30 bg-cyan-500/10 border-2 border-dashed border-cyan-500 rounded-xl flex items-center justify-center pointer-events-none", children: _jsxs("div", { className: "text-center", children: [_jsx(Paperclip, { className: "h-8 w-8 text-cyan-600 dark:text-cyan-400 mx-auto mb-2" }), _jsxs("p", { className: "text-sm font-semibold text-cyan-700 dark:text-cyan-300", children: ["Drop files to share with ", lawyerName.split(' ')[0]] })] }) }))] }));
}
function MessageBubble({ message, onReply, onSaveAttachment }) {
    if (message.sender === 'system') {
        return (_jsx("div", { className: "flex items-center justify-center", children: _jsx("span", { className: "inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium bg-slate-200/60 dark:bg-slate-800 text-slate-600 dark:text-slate-400", children: message.body }) }));
    }
    const isOps = message.sender === 'ops';
    const isNote = message.isInternalNote;
    return (_jsx("div", { className: `group flex ${isOps ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `flex items-end gap-2 max-w-[75%] ${isOps ? 'flex-row-reverse' : ''}`, children: [!isOps && (_jsx("div", { className: "h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-[10px] font-semibold text-slate-700 dark:text-slate-200 flex-shrink-0 mb-5", children: message.senderName?.charAt(0) })), _jsxs("div", { className: "flex flex-col gap-1 min-w-0", children: [isOps && message.senderName && !isNote && (_jsx("span", { className: "text-[11px] text-slate-500 dark:text-slate-400 self-end px-1", children: message.senderName })), !isOps && message.senderName && (_jsx("span", { className: "text-[11px] text-slate-500 dark:text-slate-400 px-1", children: message.senderName })), _jsxs("div", { className: `relative rounded-2xl px-3.5 py-2 shadow-sm ${isNote
                                ? 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'
                                : isOps
                                    ? 'bg-cyan-600 text-white'
                                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700'}`, children: [isNote && (_jsxs("div", { className: "flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1", children: [_jsx(StickyNote, { className: "h-3 w-3" }), "Internal note \u00B7 Not visible to lawyer"] })), message.replyTo && (_jsxs("div", { className: `mb-1.5 rounded-md border-l-2 pl-2 pr-1.5 py-1 text-[11px] ${isOps
                                        ? 'border-cyan-200 bg-cyan-700/30 text-cyan-50'
                                        : 'border-cyan-500 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300'}`, children: [_jsx("p", { className: "font-medium", children: message.replyTo.sender === 'ops' ? 'Support' : 'Lawyer' }), _jsx("p", { className: "truncate", children: message.replyTo.preview })] })), message.body && (_jsx("p", { className: `text-sm whitespace-pre-wrap break-words ${isNote
                                        ? 'text-amber-900 dark:text-amber-200'
                                        : isOps
                                            ? 'text-white'
                                            : 'text-slate-800 dark:text-slate-100'}`, children: message.body })), message.attachments && message.attachments.length > 0 && (_jsx("div", { className: `${message.body ? 'mt-2' : ''} space-y-1.5`, children: message.attachments.map((a) => (_jsx(AttachmentBubble, { attachment: a, isOps: isOps, isNote: isNote, onSave: () => onSaveAttachment(a.id) }, a.id))) })), _jsxs("div", { className: `flex items-center gap-1 mt-1 text-[10px] ${isNote
                                        ? 'text-amber-700/80 dark:text-amber-300/70'
                                        : isOps
                                            ? 'text-cyan-100'
                                            : 'text-slate-400 dark:text-slate-500'}`, children: [_jsx("span", { children: formatTime(message.createdAt) }), isOps && message.status && !isNote && _jsx(StatusTicks, { status: message.status })] }), _jsx("button", { onClick: onReply, className: `absolute top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full bg-white dark:bg-slate-900 shadow border border-slate-200 dark:border-slate-700 ${isOps ? '-left-7' : '-right-7'}`, title: "Reply", children: _jsx(CornerUpLeft, { className: "h-3 w-3 text-slate-600 dark:text-slate-300" }) })] })] })] }) }));
}
function AttachmentBubble({ attachment, isOps, isNote, onSave, }) {
    const neutral = isNote || !isOps;
    return (_jsxs("div", { className: `flex items-center gap-2 rounded-lg px-2 py-2 ${neutral
            ? 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700'
            : 'bg-cyan-700/40 border border-cyan-400/40'}`, children: [_jsx("div", { className: `h-8 w-8 rounded flex items-center justify-center flex-shrink-0 ${attachment.kind === 'image'
                    ? neutral
                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                        : 'bg-white/15 text-white'
                    : neutral
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                        : 'bg-white/15 text-white'}`, children: attachment.kind === 'image' ? (_jsx(ImageIcon, { className: "h-4 w-4" })) : (_jsx(FileText, { className: "h-4 w-4" })) }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("p", { className: `text-xs font-medium truncate ${neutral ? 'text-slate-800 dark:text-slate-100' : 'text-white'}`, children: attachment.name }), _jsx("p", { className: `text-[11px] ${neutral ? 'text-slate-500 dark:text-slate-400' : 'text-cyan-100'}`, children: attachment.sizeLabel })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs("button", { onClick: onSave, disabled: attachment.savedToDocuments, className: `inline-flex items-center gap-1 px-1.5 py-1 rounded text-[10px] font-medium transition-colors ${attachment.savedToDocuments
                            ? neutral
                                ? 'text-emerald-700 dark:text-emerald-300'
                                : 'text-emerald-200'
                            : neutral
                                ? 'text-cyan-700 dark:text-cyan-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/20'
                                : 'text-white hover:bg-white/20'}`, title: attachment.savedToDocuments ? 'Saved to incident documents' : 'Save to incident documents', children: [_jsx(Save, { className: "h-3 w-3" }), attachment.savedToDocuments ? 'Saved' : 'Save'] }), _jsx("button", { className: `p-1 rounded transition-colors ${neutral
                            ? 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                            : 'text-white hover:bg-white/20'}`, title: "Download", children: _jsx(Download, { className: "h-3 w-3" }) })] })] }));
}
function StatusTicks({ status }) {
    if (status === 'sending')
        return _jsx("span", { className: "opacity-80", children: "\u00B7" });
    if (status === 'failed')
        return _jsx("span", { className: "text-red-200 font-medium", children: "Failed" });
    if (status === 'sent')
        return _jsx(Check, { className: "h-3 w-3" });
    if (status === 'delivered')
        return _jsx(CheckCheck, { className: "h-3 w-3" });
    if (status === 'read')
        return _jsx(CheckCheck, { className: "h-3 w-3 text-sky-200" });
    return null;
}
