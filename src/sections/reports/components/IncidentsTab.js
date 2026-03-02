import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileDown } from 'lucide-react';
import { MetricCard } from './MetricCard';
export function IncidentsTab({ data, onMetricClick, onExport, onExportMetric }) {
    const { summary, chartData } = data;
    return (_jsxs("div", { className: "px-6 pb-6 space-y-8", children: [
        _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4", children: Object.entries(summary).map(([key, metric]) => (_jsx(MetricCard, { metric: metric, onClick: () => onMetricClick?.(key) }, key))) }),
        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Volume Trend" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'volumeTrend'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-3", children: chartData.volumeTrend.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { className: "text-slate-600 dark:text-slate-400", children: item.month }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: "text-cyan-600 dark:text-cyan-400", children: ["Created: ", item.created] }), _jsxs("span", { className: "text-emerald-600 dark:text-emerald-400", children: ["Resolved: ", item.resolved] })] })] }), _jsxs("div", { className: "flex gap-1 h-8", children: [_jsx("div", { className: "bg-cyan-500 rounded transition-all hover:bg-cyan-600", style: { width: `${(item.created / 250) * 100}%` } }), _jsx("div", { className: "bg-emerald-500 rounded transition-all hover:bg-emerald-600", style: { width: `${(item.resolved / 250) * 100}%` } })] })] }, item.month))) })
            ] }),
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Status Breakdown" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'statusBreakdown'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-3", children: chartData.statusBreakdown.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { className: "text-slate-700 dark:text-slate-300", children: item.status }), _jsxs("span", { className: "text-slate-900 dark:text-white font-semibold", children: [item.count, " (", item.percentage, "%)"] })] }), _jsx("div", { className: "h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-cyan-500 rounded-full transition-all", style: { width: `${item.percentage}%` } }) })] }, item.status))) })
            ] })
        ] })
    ] }));
}
