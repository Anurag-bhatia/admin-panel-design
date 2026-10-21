import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from 'react';
import { Download, BarChart3, Clock, Ticket, RefreshCw, Filter, Info, X, } from 'lucide-react';
import { defaultWalletPermissions } from '@/../product/sections/cms/types';
const reports = [
    {
        id: 'creditSummary',
        label: 'Credit summary',
        description: 'Issued, used, expired and outstanding, by programme and source.',
        icon: _jsx(BarChart3, { className: "w-4 h-4" }),
    },
    {
        id: 'ageing',
        label: 'Ageing & expiring',
        description: 'Outstanding credit by age and value due to expire in the coming period.',
        icon: _jsx(Clock, { className: "w-4 h-4" }),
    },
    {
        id: 'couponConversion',
        label: 'Coupon conversion',
        description: 'Converted, used, reversed and expired conversion value, reported separately.',
        icon: _jsx(Ticket, { className: "w-4 h-4" }),
    },
    {
        id: 'refunds',
        label: 'Refunds',
        description: 'Requested, hold, rejected and completed refunds, split by Referral tag, with time to completion.',
        icon: _jsx(RefreshCw, { className: "w-4 h-4" }),
    },
];
function formatCoins(n) {
    return n.toLocaleString('en-IN');
}
function formatInr(n) {
    return n.toLocaleString('en-IN');
}
export function WalletReports({ programmes, permissions = defaultWalletPermissions }) {
    const [selected, setSelected] = useState('creditSummary');
    const [dateFrom, setDateFrom] = useState('2026-09-01');
    const [dateTo, setDateTo] = useState('2026-10-10');
    const [programmeFilter, setProgrammeFilter] = useState('all');
    const scoped = useMemo(() => {
        if (programmeFilter === 'all')
            return programmes;
        return programmes.filter((p) => p.id === programmeFilter);
    }, [programmes, programmeFilter]);
    return (_jsxs("div", { children: [_jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3 mb-6", children: [_jsx("h1", { className: "text-2xl font-bold text-slate-900 dark:text-white", children: "Reports" }), _jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [_jsx(FiltersPopover, { dateFrom: dateFrom, dateTo: dateTo, programmeFilter: programmeFilter, programmes: programmes, onChangeFrom: setDateFrom, onChangeTo: setDateTo, onChangeProgramme: setProgrammeFilter }), permissions.exportData && (_jsxs("button", { className: "inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800", children: [_jsx(Download, { className: "w-4 h-4" }), "Export CSV"] }))] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-4 gap-4", children: [_jsx("div", { className: "lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2 space-y-1 h-fit", children: reports.map((r) => {
                            const isActive = selected === r.id;
                            return (_jsxs("div", { className: `flex items-center gap-2 rounded-lg transition-colors ${isActive
                                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-900'
                                    : 'border border-transparent hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsxs("button", { onClick: () => setSelected(r.id), className: "flex-1 min-w-0 flex items-center gap-3 text-left px-3 py-2.5", children: [_jsx("span", { className: isActive
                                                    ? 'text-cyan-700 dark:text-cyan-300'
                                                    : 'text-slate-500 dark:text-slate-400', children: r.icon }), _jsx("span", { className: `text-sm font-semibold truncate ${isActive
                                                    ? 'text-cyan-900 dark:text-cyan-100'
                                                    : 'text-slate-900 dark:text-white'}`, children: r.label })] }), _jsx(InfoHint, { text: r.description })] }, r.id));
                        }) }), _jsxs("div", { className: "lg:col-span-3", children: [selected === 'creditSummary' && _jsx(CreditSummaryReport, { programmes: scoped }), selected === 'ageing' && _jsx(AgeingReport, { programmes: scoped }), selected === 'couponConversion' && _jsx(CouponConversionReport, {}), selected === 'refunds' && _jsx(RefundsReport, {}), selected === 'successMeasures' && _jsx(SuccessMeasuresReport, {}), selected === 'exceptions' && _jsx(ExceptionsReport, {})] })] })] }));
}
function InfoHint({ text }) {
    const [open, setOpen] = useState(false);
    return (_jsxs("div", { className: "relative mr-2", onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [_jsx("button", { type: "button", onClick: () => setOpen((v) => !v), className: "p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/60", "aria-label": "More info", children: _jsx(Info, { className: "w-3.5 h-3.5" }) }), open && (_jsx("div", { className: "absolute right-0 top-full mt-1 w-64 bg-slate-900 dark:bg-slate-700 text-white text-xs px-3 py-2 rounded-md shadow-lg z-30 leading-relaxed", children: text }))] }));
}
const DEFAULT_FROM = '2026-09-01';
const DEFAULT_TO = '2026-10-10';
function FiltersPopover({ dateFrom, dateTo, programmeFilter, programmes, onChangeFrom, onChangeTo, onChangeProgramme, }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        if (!open)
            return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target))
                setOpen(false);
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);
    const activeCount = (dateFrom !== DEFAULT_FROM ? 1 : 0) +
        (dateTo !== DEFAULT_TO ? 1 : 0) +
        (programmeFilter !== 'all' ? 1 : 0);
    const clear = () => {
        onChangeFrom(DEFAULT_FROM);
        onChangeTo(DEFAULT_TO);
        onChangeProgramme('all');
    };
    return (_jsxs("div", { className: "relative", ref: ref, children: [_jsxs("button", { onClick: () => setOpen((v) => !v), className: `inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors ${open || activeCount > 0
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-900 text-cyan-700 dark:text-cyan-300'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`, children: [_jsx(Filter, { className: "w-4 h-4" }), "Filters", activeCount > 0 && (_jsx("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-semibold rounded-full bg-cyan-600 text-white", children: activeCount }))] }), open && (_jsxs("div", { className: "absolute right-0 top-full mt-1 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg p-4 z-30", children: [_jsxs("div", { className: "space-y-3", children: [_jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "From" }), _jsx("input", { type: "date", value: dateFrom, onChange: (e) => onChangeFrom(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" })] }), _jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "To" }), _jsx("input", { type: "date", value: dateTo, onChange: (e) => onChangeTo(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white" })] }), _jsxs("label", { className: "flex flex-col gap-1", children: [_jsx("span", { className: "text-xs font-medium text-slate-500 dark:text-slate-400", children: "Programme" }), _jsxs("select", { value: programmeFilter, onChange: (e) => onChangeProgramme(e.target.value), className: "px-3 py-2 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white", children: [_jsx("option", { value: "all", children: "All programmes" }), programmes.map((p) => (_jsx("option", { value: p.id, children: p.name }, p.id)))] })] })] }), activeCount > 0 && (_jsx("div", { className: "flex items-center justify-end mt-3 pt-3 border-t border-slate-100 dark:border-slate-800", children: _jsxs("button", { onClick: clear, className: "inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white", children: [_jsx(X, { className: "w-3.5 h-3.5" }), "Clear filters"] }) }))] }))] }));
}
function ReportCard({ title, children }) {
    return (_jsxs("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden", children: [_jsx("div", { className: "px-5 py-3 border-b border-slate-200 dark:border-slate-700", children: _jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: title }) }), children] }));
}
function CreditSummaryReport({ programmes }) {
    const totals = useMemo(() => {
        let issued = 0;
        let used = 0;
        let expired = 0;
        programmes.forEach((p) => {
            issued += p.coinsIssued;
            used += p.coinsUsed;
            expired += p.coinsExpired;
        });
        return { issued, used, expired, outstanding: issued - used - expired };
    }, [programmes]);
    return (_jsxs(ReportCard, { title: "Credit summary \u2014 by programme", children: [_jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 border-b border-slate-100 dark:border-slate-800", children: [_jsx(SummaryStat, { label: "Issued", value: `${formatCoins(totals.issued)}` }), _jsx(SummaryStat, { label: "Used", value: `${formatCoins(totals.used)}` }), _jsx(SummaryStat, { label: "Expired", value: `${formatCoins(totals.expired)}` }), _jsx(SummaryStat, { label: "Outstanding", value: `${formatCoins(totals.outstanding)}`, tone: "cyan" })] }), _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { children: "Programme" }), _jsx(Th, { children: "Source" }), _jsx(Th, { align: "right", children: "Issued" }), _jsx(Th, { align: "right", children: "Used" }), _jsx(Th, { align: "right", children: "Expired" }), _jsx(Th, { align: "right", children: "Outstanding" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: programmes.map((p) => {
                                const outstanding = p.coinsIssued - p.coinsUsed - p.coinsExpired;
                                return (_jsxs("tr", { children: [_jsx(Td, { children: _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-sm font-medium text-slate-900 dark:text-white", children: p.name }), _jsx("span", { className: "text-xs text-slate-400 font-mono", children: p.code })] }) }), _jsx(Td, { children: sourceLabel(p.type) }), _jsx(Td, { align: "right", children: formatCoins(p.coinsIssued) }), _jsx(Td, { align: "right", children: formatCoins(p.coinsUsed) }), _jsx(Td, { align: "right", children: formatCoins(p.coinsExpired) }), _jsx(Td, { align: "right", className: "font-semibold text-cyan-700 dark:text-cyan-300", children: formatCoins(outstanding) })] }, p.id));
                            }) })] }) })] }));
}
function AgeingReport({ programmes }) {
    const outstanding = programmes.reduce((acc, p) => acc + (p.coinsIssued - p.coinsUsed - p.coinsExpired), 0);
    const buckets = [
        { label: '0–7 days', share: 0.18, expiringNext30: 0.08 },
        { label: '8–30 days', share: 0.42, expiringNext30: 0.22 },
        { label: '31–60 days', share: 0.28, expiringNext30: 0.45 },
        { label: '61–90 days', share: 0.09, expiringNext30: 0.78 },
        { label: '90+ days', share: 0.03, expiringNext30: 0.98 },
    ];
    return (_jsx(ReportCard, { title: "Ageing & expiring", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { children: "Age bucket" }), _jsx(Th, { align: "right", children: "Outstanding CP Coins" }), _jsx(Th, { align: "right", children: "Share" }), _jsx(Th, { align: "right", children: "Expiring in next 30 days" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: buckets.map((b) => {
                            const coins = Math.round(outstanding * b.share);
                            const expiring = Math.round(coins * b.expiringNext30);
                            return (_jsxs("tr", { children: [_jsx(Td, { children: b.label }), _jsx(Td, { align: "right", children: formatCoins(coins) }), _jsxs(Td, { align: "right", children: [Math.round(b.share * 100), "%"] }), _jsx(Td, { align: "right", className: "text-amber-700 dark:text-amber-300", children: formatCoins(expiring) })] }, b.label));
                        }) })] }) }) }));
}
function CouponConversionReport() {
    const rows = [
        { bucket: 'Converted', value: 128, note: 'Coupons exchanged for credit' },
        { bucket: 'Used', value: 92, note: 'Converted credit spent on an order' },
        { bucket: 'Reversed', value: 3, note: 'Rolled back by an authorised process' },
        { bucket: 'Expired', value: 11, note: 'Converted credit that lapsed unused' },
    ];
    return (_jsx(ReportCard, { title: "Coupon conversion", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { children: "Bucket" }), _jsx(Th, { align: "right", children: "Conversions" }), _jsx(Th, { children: "Note" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: rows.map((r) => (_jsxs("tr", { children: [_jsx(Td, { className: "font-medium text-slate-900 dark:text-white", children: r.bucket }), _jsx(Td, { align: "right", children: r.value }), _jsx(Td, { className: "text-slate-500 dark:text-slate-400", children: r.note })] }, r.bucket))) })] }) }) }));
}
function RefundsReport() {
    const rows = [
        {
            status: 'Refund Requested',
            direct: { count: 10, valueInr: 36000, avgDays: 1.2 },
            referral: { count: 4, valueInr: 12500, avgDays: 1.4 },
        },
        {
            status: 'Hold',
            direct: { count: 2, valueInr: 6400, avgDays: 4.1 },
            referral: { count: 1, valueInr: 2800, avgDays: 5.6 },
        },
        {
            status: 'Rejected',
            direct: { count: 1, valueInr: 1200, avgDays: 2.0 },
            referral: { count: 0, valueInr: 0, avgDays: 0 },
        },
        {
            status: 'Completed',
            direct: { count: 182, valueInr: 428900, avgDays: 3.2 },
            referral: { count: 24, valueInr: 61400, avgDays: 3.9 },
        },
    ];
    return (_jsx(ReportCard, { title: "Refunds \u2014 split by Referral tag", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsxs("thead", { children: [_jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { rowSpan: 2, children: "Status" }), _jsx(Th, { colSpan: 3, align: "center", className: "border-l border-slate-200 dark:border-slate-700", children: "Direct" }), _jsx(Th, { colSpan: 3, align: "center", className: "border-l border-slate-200 dark:border-slate-700", children: "Referral" })] }), _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { align: "right", className: "border-l border-slate-200 dark:border-slate-700", children: "Count" }), _jsx(Th, { align: "right", children: "Value" }), _jsx(Th, { align: "right", children: "Avg days" }), _jsx(Th, { align: "right", className: "border-l border-slate-200 dark:border-slate-700", children: "Count" }), _jsx(Th, { align: "right", children: "Value" }), _jsx(Th, { align: "right", children: "Avg days" })] })] }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: rows.map((r) => (_jsxs("tr", { children: [_jsx(Td, { className: "font-medium text-slate-900 dark:text-white", children: r.status }), _jsx(Td, { align: "right", className: "border-l border-slate-100 dark:border-slate-800", children: r.direct.count }), _jsxs(Td, { align: "right", children: ["\u20B9", formatInr(r.direct.valueInr)] }), _jsx(Td, { align: "right", children: r.direct.avgDays > 0 ? r.direct.avgDays.toFixed(1) : '—' }), _jsx(Td, { align: "right", className: "border-l border-slate-100 dark:border-slate-800", children: r.referral.count }), _jsxs(Td, { align: "right", children: ["\u20B9", formatInr(r.referral.valueInr)] }), _jsx(Td, { align: "right", children: r.referral.avgDays > 0 ? r.referral.avgDays.toFixed(1) : '—' })] }, r.status))) })] }) }) }));
}
function SuccessMeasuresReport() {
    return (_jsx(ReportCard, { title: "Success measures (section 2)", children: _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 p-5", children: [_jsxs("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2", children: "Successful conversions" }), _jsx("p", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: "92" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "Customers who received credit and completed a paid ChallanPay transaction." })] }), _jsxs("div", { className: "rounded-lg border border-slate-200 dark:border-slate-700 p-4", children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2", children: "Repeat rate" }), _jsx("p", { className: "text-3xl font-bold text-slate-900 dark:text-white", children: "34%" }), _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: "Share of successful-conversion customers who returned for a second paid transaction." })] })] }) }));
}
function ExceptionsReport() {
    const rows = [
        {
            kind: 'Repeated credits to one vehicle',
            count: 5,
            hint: 'DL1AB1234 credited via 3 mobile numbers in 7 days',
        },
        {
            kind: 'Daily reconciliation mismatch',
            count: 2,
            hint: 'Credit used vs order totals, 09 Oct run',
        },
        {
            kind: 'Payment success but debit retry',
            count: 1,
            hint: 'Resolved by scheduled retry',
        },
    ];
    return (_jsx(ReportCard, { title: "Exceptions", children: _jsx("div", { className: "overflow-x-auto", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { children: _jsxs("tr", { className: "bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-700", children: [_jsx(Th, { children: "Exception" }), _jsx(Th, { align: "right", children: "Count" }), _jsx(Th, { children: "Detail" })] }) }), _jsx("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-700", children: rows.map((r) => (_jsxs("tr", { children: [_jsx(Td, { className: "font-medium text-slate-900 dark:text-white", children: r.kind }), _jsx(Td, { align: "right", className: "text-amber-700 dark:text-amber-300 font-semibold", children: r.count }), _jsx(Td, { className: "text-slate-500 dark:text-slate-400", children: r.hint })] }, r.kind))) })] }) }) }));
}
function SummaryStat({ label, value, tone, }) {
    return (_jsxs("div", { children: [_jsx("p", { className: "text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-1", children: label }), _jsx("p", { className: `text-lg font-bold ${tone === 'cyan' ? 'text-cyan-700 dark:text-cyan-300' : 'text-slate-900 dark:text-white'}`, children: value })] }));
}
function Th({ children, align = 'left', colSpan, rowSpan, className = '', }) {
    const alignCls = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
    return (_jsx("th", { colSpan: colSpan, rowSpan: rowSpan, className: `text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-2.5 ${alignCls} ${className}`, children: children }));
}
function Td({ children, align = 'left', className = '', }) {
    const alignCls = align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left';
    return (_jsx("td", { className: `px-4 py-3 text-sm text-slate-700 dark:text-slate-200 ${alignCls} ${className}`, children: children }));
}
function sourceLabel(type) {
    switch (type) {
        case 'firstTimeCheck':
            return 'First-time check';
        case 'postPaymentReward':
            return 'Post-payment reward';
        case 'corporate':
            return 'Corporate benefit';
        case 'specificCustomers':
            return 'Specific customers';
    }
}
