import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import data from '@/../product/sections/rewards-config/data.json';
import { RewardsConfigDashboard } from './components/RewardsConfigDashboard';
import { SalesConfigDashboard } from './components/SalesConfigDashboard';
const TABS = [
    { key: 'sales', label: 'Sales Config' },
    { key: 'web', label: 'Web Config' },
];
export default function RewardsConfigPreview() {
    const [activeTab, setActiveTab] = useState('sales');
    return (_jsxs("div", { className: "flex h-[calc(100vh-64px)] bg-slate-100 dark:bg-slate-950", children: [_jsx("div", { className: "flex flex-col border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 w-56", children: _jsx("div", { className: "flex-1 p-3", children: TABS.map((tab, index) => {
                        const isActive = activeTab === tab.key;
                        return (_jsxs("div", { children: [_jsx("button", { onClick: () => setActiveTab(tab.key), className: `w-full text-left rounded-lg px-4 py-3 text-base font-semibold transition-all ${isActive
                                        ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-700 dark:text-cyan-400'
                                        : 'text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: tab.label }), index < TABS.length - 1 && (_jsx("div", { className: "mx-4 my-1 border-t border-slate-200 dark:border-slate-700" }))] }, tab.key));
                    }) }) }), _jsx("div", { className: "flex-1 min-w-0 overflow-auto", children: activeTab === 'sales' ? (_jsx(SalesConfigDashboard, {})) : (_jsx(RewardsConfigDashboard, { configs: data.configs, changeLog: data.changeLog, states: data.states, currentUser: data.currentUser, onAdd: (draft) => console.log('Add configuration:', draft), onUpdate: (id, draft) => console.log('Update configuration:', id, draft) })) })] }));
}
