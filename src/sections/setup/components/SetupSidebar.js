import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const NAV_ITEMS = [
    { key: 'services', label: 'Services' },
    { key: 'priceCategories', label: 'Price Categories' },
    { key: 'departments', label: 'Departments' },
    { key: 'designations', label: 'Designations' },
    { key: 'masters', label: 'Masters' },
    { key: 'geographic', label: 'Geographic' },
    { key: 'auditLog', label: 'Audit Log' },
];
export function SetupSidebar({ activeTab, onTabChange }) {
    return (_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-52 shrink-0", children: _jsx("div", { className: "flex-1 py-4", children: NAV_ITEMS.map((item) => {
                const isActive = activeTab === item.key;
                const isAudit = item.key === 'auditLog';
                return (_jsxs("div", { children: [isAudit && (_jsx("div", { className: "mx-4 my-3 border-t border-slate-200 dark:border-slate-700" })), _jsx("div", { className: "px-2 mb-0.5", children: _jsx("button", { onClick: () => onTabChange(item.key), className: `w-full flex items-center rounded-lg px-3 py-2 text-[13px] font-semibold transition-all ${isActive
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: item.label }) })] }, item.key));
            }) }) }));
}
