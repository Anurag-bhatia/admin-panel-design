import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Clock, FileText, AlertTriangle, Calendar, Save } from 'lucide-react';
const ALL_FILE_TYPES = [
    { key: 'pdf', label: 'PDF' },
    { key: 'doc', label: 'DOC / DOCX' },
    { key: 'xls', label: 'XLS / XLSX' },
    { key: 'jpg', label: 'JPG / PNG' },
];
const WEEKDAYS = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
];
export function ChatSettingsPanel() {
    const [readOnlyDays, setReadOnlyDays] = useState(7);
    const [escalationMinutes, setEscalationMinutes] = useState(30);
    const [maxFileSize, setMaxFileSize] = useState(10);
    const [allowedTypes, setAllowedTypes] = useState(['pdf', 'doc', 'xls', 'jpg']);
    const [workingHoursStart, setWorkingHoursStart] = useState('09:00');
    const [workingHoursEnd, setWorkingHoursEnd] = useState('19:00');
    const [workingDays, setWorkingDays] = useState(['mon', 'tue', 'wed', 'thu', 'fri', 'sat']);
    const [outOfHoursMessage, setOutOfHoursMessage] = useState('Thanks for reaching out. Our team will respond on the next working day. Working hours: Mon–Sat, 9 AM – 7 PM.');
    const toggle = (list, setter, key) => {
        setter(list.includes(key) ? list.filter((x) => x !== key) : [...list, key]);
    };
    return (_jsx("div", { className: "p-6 bg-slate-50 dark:bg-slate-950", children: _jsxs("div", { className: "max-w-3xl space-y-6", children: [_jsx(SettingCard, { icon: _jsx(Clock, { className: "h-5 w-5 text-cyan-600 dark:text-cyan-400" }), title: "Read-only period after closure", description: "How long the chat stays visible (read-only) after the incident is marked Completed or Not Completed.", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", value: readOnlyDays, onChange: (e) => setReadOnlyDays(parseInt(e.target.value) || 0), min: 0, className: "w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: "days" })] }) }), _jsx(SettingCard, { icon: _jsx(AlertTriangle, { className: "h-5 w-5 text-amber-600 dark:text-amber-400" }), title: "Escalation time", description: "If a lawyer message is unanswered beyond this duration, the owner's supervisor is alerted.", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", value: escalationMinutes, onChange: (e) => setEscalationMinutes(parseInt(e.target.value) || 0), min: 5, className: "w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: "minutes (within working hours)" })] }) }), _jsx(SettingCard, { icon: _jsx(FileText, { className: "h-5 w-5 text-blue-600 dark:text-blue-400" }), title: "Attachment limits", description: "Maximum file size and the file types users can share through chat.", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Max file size" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "number", value: maxFileSize, onChange: (e) => setMaxFileSize(parseInt(e.target.value) || 0), min: 1, max: 100, className: "w-20 px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: "MB per file" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2", children: "Allowed file types" }), _jsx("div", { className: "flex flex-wrap gap-2", children: ALL_FILE_TYPES.map((t) => {
                                            const active = allowedTypes.includes(t.key);
                                            return (_jsx("button", { onClick: () => toggle(allowedTypes, setAllowedTypes, t.key), className: `px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${active
                                                    ? 'bg-cyan-600 text-white border-cyan-600'
                                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'}`, children: t.label }, t.key));
                                        }) })] })] }) }), _jsx(SettingCard, { icon: _jsx(Calendar, { className: "h-5 w-5 text-emerald-600 dark:text-emerald-400" }), title: "Working hours", description: "Escalation timers and the SLA for first response are calculated against these hours.", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { type: "time", value: workingHoursStart, onChange: (e) => setWorkingHoursStart(e.target.value), className: "px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: "to" }), _jsx("input", { type: "time", value: workingHoursEnd, onChange: (e) => setWorkingHoursEnd(e.target.value), className: "px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500" }), _jsx("span", { className: "text-sm text-slate-500 dark:text-slate-400", children: "IST" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-2", children: "Working days" }), _jsx("div", { className: "flex gap-2 flex-wrap", children: WEEKDAYS.map((d) => {
                                            const active = workingDays.includes(d.key);
                                            return (_jsx("button", { onClick: () => toggle(workingDays, setWorkingDays, d.key), className: `h-9 w-10 rounded-lg text-xs font-semibold border transition-colors ${active
                                                    ? 'bg-cyan-600 text-white border-cyan-600'
                                                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'}`, children: d.label }, d.key));
                                        }) })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1", children: "Out-of-hours auto-reply to lawyers" }), _jsx("textarea", { value: outOfHoursMessage, onChange: (e) => setOutOfHoursMessage(e.target.value), rows: 3, className: "w-full px-3 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none" })] })] }) }), _jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [_jsx("button", { className: "px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: "Discard changes" }), _jsxs("button", { className: "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors", children: [_jsx(Save, { className: "h-4 w-4" }), "Save settings"] })] })] }) }));
}
function SettingCard({ icon, title, description, children, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-5", children: [_jsxs("div", { className: "flex items-start gap-3 mb-4", children: [_jsx("div", { className: "h-10 w-10 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center flex-shrink-0", children: icon }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: description })] })] }), _jsx("div", { className: "pl-13 ml-13", children: children })] }));
}
