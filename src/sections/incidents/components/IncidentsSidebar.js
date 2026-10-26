import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const WORK_TYPES = [
    { key: 'cases', label: 'Cases' },
    { key: 'challans', label: 'Challans' },
    { key: 'rtoAssistance', label: 'RTO Assistance' },
    { key: 'other', label: 'Other' },
];
const TOOLS = [
    { key: 'incidentDid', label: 'Incident DID' },
    { key: 'vendorCancellations', label: 'Vendor cancellations' },
];
export function IncidentsSidebar({ selection, chatsUnreadCount = 0, onChangeSelection, }) {
    const isIncident = (view, workType) => selection.kind === 'incidents' && selection.view === view && selection.workType === workType;
    const isTool = (tool) => selection.kind === 'tools' && selection.tool === tool;
    return (_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56", children: _jsxs("div", { className: "flex-1 py-4 overflow-y-auto", children: [_jsx(SidebarSection, { title: "All Incidents", children: WORK_TYPES.map((wt) => (_jsx(SidebarItem, { label: wt.label, active: isIncident('all', wt.key), onClick: () => onChangeSelection?.({ kind: 'incidents', view: 'all', workType: wt.key }) }, `all-${wt.key}`))) }), _jsx(Divider, {}), _jsx(SidebarSection, { title: "My Incidents", children: WORK_TYPES.map((wt) => (_jsx(SidebarItem, { label: wt.label, active: isIncident('my', wt.key), onClick: () => onChangeSelection?.({ kind: 'incidents', view: 'my', workType: wt.key }) }, `my-${wt.key}`))) }), _jsx(Divider, {}), _jsx(SidebarSection, { title: "Tools", children: TOOLS.map((t) => (_jsx(SidebarItem, { label: t.label, active: isTool(t.key), onClick: () => onChangeSelection?.({ kind: 'tools', tool: t.key }) }, t.key))) }), _jsx(Divider, {}), _jsx("div", { className: "px-2", children: _jsxs("button", { onClick: () => onChangeSelection?.({ kind: 'chats' }), className: `w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm transition-all ${selection.kind === 'chats'
                            ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx("span", { children: "Chats" }), chatsUnreadCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-full text-[10px] font-semibold bg-red-500 text-white", children: chatsUnreadCount }))] }) })] }) }));
}
function SidebarSection({ title, children, }) {
    return (_jsxs("div", { className: "mb-2", children: [_jsx("div", { className: "px-4 py-2", children: _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }) }), _jsx("div", { className: "space-y-0.5 px-2", children: children })] }));
}
function SidebarItem({ label, active, onClick, }) {
    return (_jsx("button", { onClick: onClick, className: `w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${active
            ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
            : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: _jsx("span", { children: label }) }));
}
function Divider() {
    return _jsx("div", { className: "mx-4 my-3 border-t border-slate-200 dark:border-slate-700" });
}
