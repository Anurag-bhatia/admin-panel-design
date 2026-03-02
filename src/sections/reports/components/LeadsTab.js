import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileDown } from 'lucide-react';
import { MetricCard } from './MetricCard';
export function LeadsTab({ data, onMetricClick, onExport, onExportMetric }) {
    const { summary, chartData } = data;
    return (_jsxs("div", { className: "px-6 pb-6 space-y-8", children: [
        _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4", children: Object.entries(summary).map(([key, metric]) => (_jsx(MetricCard, { metric: metric, onClick: () => onMetricClick?.(key) }, key))) }),
        _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Pipeline Stages" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'pipelineStages'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-3", children: chartData.pipelineStages.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsx("span", { className: "text-slate-700 dark:text-slate-300", children: item.stage }), _jsx("span", { className: "text-slate-900 dark:text-white font-semibold", children: item.count })] }), _jsx("div", { className: "h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden", children: _jsx("div", { className: "h-full bg-violet-500 rounded-full transition-all", style: { width: `${(item.count / 80) * 100}%` } }) })] }, item.stage))) })
            ] }),
            _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6", children: [
                _jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: "Lead Sources" }), _jsx("button", { onClick: () => onExportMetric?.('csv', 'sourceBreakdown'), className: "p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors", children: _jsx(FileDown, { className: "w-4 h-4 text-slate-600 dark:text-slate-400" }) })] }),
                _jsx("div", { className: "space-y-4", children: chartData.sourceBreakdown.map((item) => (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-2", children: [_jsx("span", { className: "text-slate-700 dark:text-slate-300 font-medium", children: item.source }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-slate-900 dark:text-white font-semibold", children: item.count }), _jsxs("span", { className: "text-slate-500 dark:text-slate-400 text-xs ml-2", children: ["(", item.converted, " converted)"] })] })] }), _jsxs("div", { className: "flex gap-1", children: [_jsx("div", { className: "h-2 bg-violet-500 rounded-full", style: { width: `${(item.count / 160) * 100}%` } }), _jsx("div", { className: "h-2 bg-emerald-500 rounded-full", style: { width: `${(item.converted / 160) * 100}%` } })] })] }, item.source))) })
            ] })
        ] })
    ] }));
}
