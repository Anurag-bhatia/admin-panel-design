import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Scale, CreditCard, MessageSquare } from 'lucide-react';
import { ExecutiveDashboard } from './ExecutiveDashboard';
import { IncidentsTab } from './IncidentsTab';
import { LeadsTab } from './LeadsTab';
import { SubscribersTab } from './SubscribersTab';
import { PartnersTab } from './PartnersTab';
export function ReportsDashboard({ executiveSummary, incidentsReport, leadsReport, subscribersReport, lawyersReport, partnersReport, paymentsReport, disputesReport, supportReport, teamReport, filterOptions, activeTab = 'overview', onTabChange, onFilterChange, onMetricClick, onExport, onExportMetric, }) {
    const [currentFilters, setCurrentFilters] = useState({ dateRange: '30d', state: 'All States' });
    const handleFilterChange = (filters) => { setCurrentFilters(filters); onFilterChange?.(filters); };
    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'incidents', label: 'Incidents' },
        { id: 'leads', label: 'Leads' },
        { id: 'subscribers', label: 'Subscribers' },
        { id: 'lawyers', label: 'Lawyers' },
        { id: 'partners', label: 'Partners' },
        { id: 'payments', label: 'Payments' },
        { id: 'disputes', label: 'Disputes' },
    ];
    const [selectedTab, setSelectedTab] = useState(activeTab);
    const handleTabClick = (tabId) => { setSelectedTab(tabId); onTabChange?.(tabId); };
    return (_jsxs("div", { className: "min-h-screen bg-slate-50 dark:bg-slate-950", children: [
        _jsxs("div", { className: "p-6", children: [
            _jsxs("div", { className: "flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6", children: [
                _jsx("div", { children: _jsx("h1", { className: "text-2xl font-semibold text-slate-900 dark:text-slate-100", children: "Reports" }) }),
                _jsxs("div", { className: "flex flex-wrap items-center gap-3 lg:mt-1", children: [
                    _jsxs("button", { onClick: () => onExport?.('csv', selectedTab), className: "flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors", children: [
                        _jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" }) }),
                        _jsx("span", { className: "text-sm font-medium", children: "Export Report" })
                    ] }),
                    _jsx("div", { className: "relative", children: _jsx("select", { value: currentFilters.dateRange || '30d', onChange: (e) => handleFilterChange({ ...currentFilters, dateRange: e.target.value }), className: "appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]", children: filterOptions.dateRanges.map((range) => (_jsx("option", { value: range.value, children: range.label }, range.value))) }) }),
                    _jsx("div", { className: "relative", children: _jsx("select", { value: currentFilters.state || 'All States', onChange: (e) => handleFilterChange({ ...currentFilters, state: e.target.value }), className: "appearance-none bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg pl-3 pr-10 py-2 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent min-w-[160px]", children: filterOptions.states.map((state) => (_jsx("option", { value: state, children: state }, state))) }) })
                ] })
            ] }),
            _jsx("div", { className: "overflow-x-auto mb-6", children: _jsx("div", { className: "flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-fit", children: tabs.map((tab) => {
                const isActive = selectedTab === tab.id;
                return (_jsx("button", { onClick: () => handleTabClick(tab.id), className: `px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${isActive ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}`, children: tab.label }, tab.id));
            }) }) })
        ] }),
        _jsxs("div", { children: [
            selectedTab === 'overview' && (_jsx(ExecutiveDashboard, { data: executiveSummary, onCardClick: (domain) => handleTabClick(domain) })),
            selectedTab === 'incidents' && (_jsx(IncidentsTab, { data: incidentsReport, onMetricClick: (metric) => onMetricClick?.(metric, 'incidents'), onExport: (format) => onExport?.(format, 'incidents'), onExportMetric: (format, metric) => onExportMetric?.(format, metric, 'incidents') })),
            selectedTab === 'leads' && (_jsx(LeadsTab, { data: leadsReport, onMetricClick: (metric) => onMetricClick?.(metric, 'leads'), onExport: (format) => onExport?.(format, 'leads'), onExportMetric: (format, metric) => onExportMetric?.(format, metric, 'leads') })),
            selectedTab === 'subscribers' && (_jsx(SubscribersTab, { data: subscribersReport, onMetricClick: (metric) => onMetricClick?.(metric, 'subscribers'), onExport: (format) => onExport?.(format, 'subscribers'), onExportMetric: (format, metric) => onExportMetric?.(format, metric, 'subscribers') })),
            selectedTab === 'lawyers' && (_jsx("div", { className: "px-6 pb-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx(Scale, { className: "w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "Lawyers Report" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: "Legal network performance and commission tracking" })] }) })),
            selectedTab === 'partners' && (_jsx(PartnersTab, { data: partnersReport, onMetricClick: (metric) => onMetricClick?.(metric, 'partners'), onExport: (format) => onExport?.(format, 'partners'), onExportMetric: (format, metric) => onExportMetric?.(format, metric, 'partners') })),
            selectedTab === 'payments' && (_jsx("div", { className: "px-6 pb-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx(CreditCard, { className: "w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "Payments Report" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: "Financial tracking for collections and payouts" })] }) })),
            selectedTab === 'disputes' && (_jsx("div", { className: "px-6 pb-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx(MessageSquare, { className: "w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-4" }), _jsx("h3", { className: "text-lg font-semibold text-slate-900 dark:text-white mb-2", children: "Disputes Report" }), _jsx("p", { className: "text-sm text-slate-600 dark:text-slate-400", children: "Dispute resolution metrics and outcomes" })] }) }))
        ] })
    ] }));
}
