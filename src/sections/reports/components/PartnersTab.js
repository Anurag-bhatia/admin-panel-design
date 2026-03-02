import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileDown } from 'lucide-react';
import { MetricCard } from './MetricCard';
export function PartnersTab({ data, onMetricClick, onExport, onExportMetric }) {
    const { summary, chartData } = data;
    return (_jsxs("div", { className: "px-6 pb-6 space-y-8", children: [
        _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: Object.entries(summary).filter(([key]) => key !== 'revenueContribution').map(([key, metric]) => (_jsx(MetricCard, { metric: metric, onClick: () => onMetricClick?.(key) }, key))) }),
        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Top Performers" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'performanceRanking'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-4", children: chartData.performanceRanking.map((item, idx) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-slate-500 dark:text-slate-400 font-medium w-6", children: ["#", idx + 1] }), _jsx("span", { className: "text-slate-900 dark:text-white font-medium", children: item.partner })] }), _jsx("div", { className: "text-right", children: _jsxs("div", { className: "text-slate-900 dark:text-white font-semibold", children: [item.subscribers, " subscribers"] }) })] }), _jsx("div", { className: "h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-blue-500 rounded-full transition-all", style: { width: `${(item.subscribers / 25) * 100}%` } }) })] }, item.partner))) })
            ] }),
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Onboarding Trend" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'onboardingTrend'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-3", children: chartData.onboardingTrend.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { className: "text-slate-600 dark:text-slate-400", children: item.month }), _jsxs("span", { className: "text-slate-900 dark:text-white font-semibold", children: [item.subscribers, " subscribers"] })] }), _jsx("div", { className: "h-8 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden", children: _jsx("div", { className: "h-full bg-blue-500 transition-all", style: { width: `${(item.subscribers / 20) * 100}%` } }) })] }, item.month))) })
            ] })
        ] })
    ] }));
}
