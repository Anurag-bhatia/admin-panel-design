import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
export function MetricCard({ metric, onClick, className = '' }) {
    const { value, trend, label, description } = metric;
    const isPositive = trend > 0;
    const isNegative = trend < 0;
    const trendColor = isPositive
        ? 'text-emerald-600 dark:text-emerald-400'
        : isNegative
            ? 'text-rose-600 dark:text-rose-400'
            : 'text-slate-500 dark:text-slate-400';
    const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;
    return (_jsx("button", { onClick: onClick, className: `group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 text-left transition-all hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-lg hover:shadow-cyan-500/10 ${className}`, children: _jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:via-cyan-500/0 group-hover:to-transparent rounded-xl transition-all duration-300" }), _jsx("div", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-1", children: typeof value === 'number' && value >= 1000 ? value.toLocaleString() : value }), _jsxs("div", { className: `flex items-center gap-1.5 mb-3 ${trendColor}`, children: [_jsx(TrendIcon, { className: "w-4 h-4" }), _jsxs("span", { className: "text-sm font-semibold", children: [Math.abs(trend), "%"] })] }), _jsx("div", { className: "text-sm font-medium text-slate-700 dark:text-slate-300 mb-1", children: label }), _jsx("div", { className: "text-xs text-slate-500 dark:text-slate-400 line-clamp-2", children: description })] }) }));
}
