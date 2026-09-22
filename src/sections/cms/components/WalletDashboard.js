import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Target, Ticket, ArrowUp, ArrowDown } from 'lucide-react';
function formatCoins(n) {
    return n.toLocaleString('en-IN');
}
function budgetPct(p) {
    if (p.budgetCoins === 0)
        return 0;
    return Math.min(100, Math.round((p.coinsIssued / p.budgetCoins) * 100));
}
export function WalletDashboard({ programmes }) {
    const totals = useMemo(() => {
        let issued = 0;
        let used = 0;
        let expired = 0;
        programmes.forEach((p) => {
            issued += p.coinsIssued;
            used += p.coinsUsed;
            expired += p.coinsExpired;
        });
        const outstanding = issued - used - expired;
        return { issued, used, expired, outstanding };
    }, [programmes]);
    const budgetRows = useMemo(() => {
        return [...programmes]
            .filter((p) => p.status !== 'archived' && p.status !== 'expired')
            .sort((a, b) => budgetPct(b) - budgetPct(a))
            .slice(0, 6);
    }, [programmes]);
    const conversionCounts = { converted: 128, used: 92, unused: 36 };
    const successMeasures = { successfulConversions: 92 };
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-6", children: "Wallet Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6", children: [_jsx(Tile, { label: "Outstanding credit", primary: `${formatCoins(totals.outstanding)} coins` }), _jsx(Tile, { label: "Issued (all time)", primary: `${formatCoins(totals.issued)} coins` }), _jsx(Tile, { label: "Conversions", primary: `${successMeasures.successfulConversions}` })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Target, { className: "w-4 h-4 text-slate-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Budget used" })] }), budgetRows.length === 0 ? (_jsx("p", { className: "text-sm text-slate-400 py-6 text-center", children: "No live programmes." })) : (_jsx("div", { className: "space-y-6", children: budgetRows.map((p) => {
                                    const pct = budgetPct(p);
                                    const isAlert = p.alertLevelPercent != null && pct >= p.alertLevelPercent;
                                    const isFull = pct >= 100;
                                    const barColor = isFull
                                        ? 'bg-red-500'
                                        : isAlert
                                            ? 'bg-amber-500'
                                            : 'bg-cyan-500';
                                    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium text-slate-900 dark:text-white", children: p.name }), _jsx("span", { className: "ml-2 text-xs text-slate-400 font-mono", children: p.code })] }), _jsxs("span", { className: "text-slate-500", children: [formatCoins(p.coinsIssued), " / ", formatCoins(p.budgetCoins), " \u00B7 ", pct, "%"] })] }), _jsx("div", { className: "w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${barColor} transition-all`, style: { width: `${pct}%` } }) })] }, p.id));
                                }) }))] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Ticket, { className: "w-4 h-4 text-slate-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Coupon conversion" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(StatRow, { label: "Converted", value: conversionCounts.converted }), _jsx(StatRow, { label: "Used", value: conversionCounts.used, trend: "up" }), _jsx(StatRow, { label: "Unused", value: conversionCounts.unused, trend: "down" })] }), _jsx("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800", children: _jsxs("p", { className: "text-xs text-slate-400", children: [Math.round((conversionCounts.used / conversionCounts.converted) * 100), "% of converted credit has been used."] }) })] })] })] }));
}
function Tile({ label, primary, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-3", children: label }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: primary })] }));
}
function StatRow({ label, value, trend, }) {
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-slate-600 dark:text-slate-300", children: label }), _jsxs("div", { className: "flex items-center gap-1.5", children: [trend === 'up' && _jsx(ArrowUp, { className: "w-3.5 h-3.5 text-emerald-500" }), trend === 'down' && _jsx(ArrowDown, { className: "w-3.5 h-3.5 text-red-500" }), _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: value })] })] }));
}
