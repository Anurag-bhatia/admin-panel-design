import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { Target, Ticket, ArrowUp, ArrowDown, RefreshCw, AlertTriangle, TrendingUp, Users, } from 'lucide-react';
function formatCoins(n) {
    return n.toLocaleString('en-IN');
}
function formatInr(n) {
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
    // Sample metrics — these would come from reporting APIs in production.
    const conversionCounts = { converted: 128, used: 92, unused: 36 };
    const successMeasures = {
        successfulConversions: 92,
        repeatRate: 34, // % of credited customers who placed a second paid order
    };
    const refundSummary = {
        refundRequested: { count: 14, valueInr: 48500 },
        hold: { count: 3, valueInr: 9200 },
        delayed: { count: 2, valueInr: 7400 },
        referralCount: 4,
    };
    const anomalies = {
        reconciliationMismatches: 2,
        repeatedCreditsVehicles: 5,
        lastRunIso: '2026-10-10T05:00:00Z',
    };
    return (_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white mb-6", children: "CP Pockets Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsx(Tile, { label: "Outstanding credit", primary: `${formatCoins(totals.outstanding)} CP Coins`, sub: `≈ ₹${formatInr(totals.outstanding)}` }), _jsx(Tile, { label: "Issued (all time)", primary: `${formatCoins(totals.issued)} CP Coins`, sub: `${formatCoins(totals.used)} used · ${formatCoins(totals.expired)} expired` }), _jsx(Tile, { label: "Successful conversions", primary: `${successMeasures.successfulConversions}`, sub: "Credit \u2192 paid ChallanPay txn", icon: _jsx(TrendingUp, { className: "w-4 h-4" }) }), _jsx(Tile, { label: "Repeat rate", primary: `${successMeasures.repeatRate}%`, sub: "Returned for a second paid txn", icon: _jsx(Users, { className: "w-4 h-4" }) })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6", children: [_jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Target, { className: "w-4 h-4 text-slate-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Budget used" })] }), budgetRows.length === 0 ? (_jsx("p", { className: "text-sm text-slate-400 py-6 text-center", children: "No live programmes." })) : (_jsx("div", { className: "space-y-6", children: budgetRows.map((p) => {
                                    const pct = budgetPct(p);
                                    const isAlert = p.alertLevelPercent != null && pct >= p.alertLevelPercent;
                                    const isFull = pct >= 100;
                                    const barColor = isFull
                                        ? 'bg-red-500'
                                        : isAlert
                                            ? 'bg-amber-500'
                                            : 'bg-cyan-500';
                                    return (_jsxs("div", { children: [_jsxs("div", { className: "flex items-center justify-between text-sm mb-1", children: [_jsxs("div", { children: [_jsx("span", { className: "font-medium text-slate-900 dark:text-white", children: p.name }), _jsx("span", { className: "ml-2 text-xs text-slate-400 font-mono", children: p.code })] }), _jsxs("span", { className: "text-slate-500", children: [formatCoins(p.coinsIssued), " / ", formatCoins(p.budgetCoins), " \u00B7 ", pct, "%"] })] }), _jsx("div", { className: "w-full h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden", children: _jsx("div", { className: `h-full ${barColor} transition-all`, style: { width: `${pct}%` } }) })] }, p.id));
                                }) }))] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Ticket, { className: "w-4 h-4 text-slate-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Coupon conversion" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(StatRow, { label: "Converted", value: conversionCounts.converted }), _jsx(StatRow, { label: "Used", value: conversionCounts.used, trend: "up" }), _jsx(StatRow, { label: "Unused", value: conversionCounts.unused, trend: "down" })] }), _jsx("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800", children: _jsxs("p", { className: "text-xs text-slate-400", children: [Math.round((conversionCounts.used / conversionCounts.converted) * 100), "% of converted credit has been used."] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(RefreshCw, { className: "w-4 h-4 text-slate-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Refunds" }), _jsxs("span", { className: "ml-auto text-xs text-slate-400", children: [refundSummary.referralCount, " from referral tickets"] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3", children: [_jsx(RefundCell, { label: "In progress", count: refundSummary.refundRequested.count, valueInr: refundSummary.refundRequested.valueInr, tone: "cyan" }), _jsx(RefundCell, { label: "On hold", count: refundSummary.hold.count, valueInr: refundSummary.hold.valueInr, tone: "amber" }), _jsx(RefundCell, { label: "Delayed", count: refundSummary.delayed.count, valueInr: refundSummary.delayed.valueInr, tone: "red" })] }), _jsx("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800", children: _jsx("p", { className: "text-xs text-slate-400", children: "Refunds go back to the original payment method; CP Coins used on a refunded incident return to the balance." }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(AlertTriangle, { className: "w-4 h-4 text-amber-500" }), _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: "Anomalies" }), _jsxs("span", { className: "ml-auto text-xs text-slate-400", children: ["Last run ", formatRunTime(anomalies.lastRunIso)] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(AnomalyRow, { label: "Reconciliation mismatches", count: anomalies.reconciliationMismatches, hint: "Entries vs orders, payments and refunds" }), _jsx(AnomalyRow, { label: "Repeated credits to one vehicle", count: anomalies.repeatedCreditsVehicles, hint: "Suspected multiple-mobile reuse" })] }), _jsx("div", { className: "mt-4 pt-3 border-t border-slate-100 dark:border-slate-800", children: _jsx("button", { className: "text-xs font-medium text-cyan-700 dark:text-cyan-300 hover:underline", children: "View entries behind these \u2192" }) })] })] })] }));
}
function formatRunTime(iso) {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
    });
}
function Tile({ label, primary, sub, icon, }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-5", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide", children: label }), icon && _jsx("span", { className: "text-slate-400", children: icon })] }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: primary }), sub && _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: sub })] }));
}
function StatRow({ label, value, trend, }) {
    return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-slate-600 dark:text-slate-300", children: label }), _jsxs("div", { className: "flex items-center gap-1.5", children: [trend === 'up' && _jsx(ArrowUp, { className: "w-3.5 h-3.5 text-emerald-500" }), trend === 'down' && _jsx(ArrowDown, { className: "w-3.5 h-3.5 text-red-500" }), _jsx("span", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: value })] })] }));
}
function RefundCell({ label, count, valueInr, tone, }) {
    const toneCls = {
        cyan: 'text-cyan-700 dark:text-cyan-300',
        amber: 'text-amber-700 dark:text-amber-300',
        red: 'text-red-700 dark:text-red-300',
    }[tone];
    return (_jsxs("div", { className: "bg-slate-50 dark:bg-slate-800/60 rounded-lg px-3 py-3", children: [_jsx("p", { className: "text-[11px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1", children: label }), _jsx("p", { className: `text-lg font-bold ${toneCls}`, children: count }), _jsxs("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5", children: ["\u20B9", formatInr(valueInr)] })] }));
}
function AnomalyRow({ label, count, hint, }) {
    return (_jsxs("div", { className: "flex items-center justify-between gap-3", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-slate-900 dark:text-white truncate", children: label }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: hint })] }), _jsx("span", { className: `inline-flex items-center justify-center min-w-[2rem] px-2 py-1 text-sm font-bold rounded-md ${count > 0
                    ? 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200'
                    : 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'}`, children: count })] }));
}
