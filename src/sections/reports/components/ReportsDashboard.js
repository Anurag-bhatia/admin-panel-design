import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { ChallanPayReportsTab } from './ChallanPayReportsTab';
export function ReportsDashboard({ executiveSummary, incidentsReport, leadsReport, subscribersReport, lawyersReport, partnersReport, paymentsReport, disputesReport, supportReport, teamReport, filterOptions, activeTab = 'overview', onTabChange, onFilterChange, onMetricClick, onExport, onExportMetric, }) {
    const [currentFilters, setCurrentFilters] = useState({
        dateRange: '30d',
        state: 'All States',
    });
    const handleFilterChange = (filters) => {
        setCurrentFilters(filters);
        onFilterChange?.(filters);
    };
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'challanpay-reports', label: 'ChallanPay Reports' },
    ];
    const [selectedTab, setSelectedTab] = useState(activeTab);
    const handleTabClick = (tabId) => {
        setSelectedTab(tabId);
        onTabChange?.(tabId);
    };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [_jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6", children: [_jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Analytics" }) }), _jsxs("div", { className: "flex flex-wrap items-center gap-3 lg:mt-1", children: [_jsx("input", { type: "date", defaultValue: "2023-01-01", className: "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" }), _jsx("span", { className: "text-xs text-slate-400", children: "to" }), _jsx("input", { type: "date", defaultValue: "2026-03-09", className: "bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent" }), _jsx("div", { className: "relative", children: _jsx("select", { value: currentFilters.state || 'All States', onChange: (e) => handleFilterChange({ ...currentFilters, state: e.target.value }), className: "appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]", children: filterOptions.states.map((state) => (_jsx("option", { value: state, children: state }, state))) }) }), _jsxs("button", { onClick: () => onExport?.('csv', selectedTab), className: "flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors", children: [_jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }), _jsx("span", { className: "text-sm font-medium", children: "Export" })] })] })] }), _jsx("div", { className: "overflow-x-auto mb-6", children: _jsx("div", { className: "flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit", children: tabs.map((tab) => {
                                const isActive = selectedTab === tab.id;
                                return (_jsx("button", { onClick: () => handleTabClick(tab.id), className: `px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${isActive
                                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: tab.label }, tab.id));
                            }) }) })] }), _jsxs("div", { children: [selectedTab === 'overview' && (_jsx(ExecutiveDashboard, { data: executiveSummary, onCardClick: (domain) => handleTabClick(domain) })), selectedTab === 'challanpay-reports' && (_jsx(ChallanPayReportsTab, {}))] })] }));
}
