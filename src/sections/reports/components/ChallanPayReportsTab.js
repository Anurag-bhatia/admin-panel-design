import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, LabelList, } from 'recharts';
import { Users, IndianRupee, FileText, Gift, CreditCard, AlertCircle, Car } from 'lucide-react';
// — Data —
const challanBreakdown = [
    { name: 'Online', count: 1972110, value: 3508968101 },
    { name: 'Online Pending', count: 2273, value: 2103225 },
    { name: 'Court', count: 1140666, value: 2200822229 },
    { name: 'Court Pending', count: 918, value: 2206000 },
];
const challanPieData = [
    { name: 'Online', value: 1972110 },
    { name: 'Court', value: 1140666 },
    { name: 'Pending', value: 3191 },
];
const customerBarData = [
    { name: 'Paid Customers', value: 27825 },
    { name: 'Payments', value: 27814 },
    { name: 'Incidents', value: 43192 },
];
const PIE_COLORS = ['#06b6d4', '#0e7490', '#94a3b8'];
const BAR_COLORS = ['#06b6d4', '#0891b2', '#0e7490', '#155e75'];
function formatINR(num) {
    return num.toLocaleString('en-IN');
}
function formatCompact(num) {
    if (num >= 10000000)
        return `${(num / 10000000).toFixed(1)} Cr`;
    if (num >= 100000)
        return `${(num / 100000).toFixed(1)} L`;
    if (num >= 1000)
        return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}
function StatCard({ icon: Icon, label, value, sub, accent = 'cyan', }) {
    const accentMap = {
        cyan: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
        amber: 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400',
        emerald: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
        violet: 'bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400',
        rose: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
    };
    return (_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 flex items-start gap-4", children: [_jsx("div", { className: `p-2.5 rounded-lg shrink-0 ${accentMap[accent]}`, children: _jsx(Icon, { className: "w-5 h-5" }) }), _jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider", children: label }), _jsx("p", { className: "text-2xl font-bold text-slate-900 dark:text-white mt-1 tabular-nums", children: value }), sub && _jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1", children: sub })] })] }));
}
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length)
        return null;
    return (_jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3", children: [_jsx("p", { className: "text-xs font-medium text-slate-500 dark:text-slate-400 mb-1", children: label }), payload.map((entry, i) => (_jsxs("p", { className: "text-sm font-semibold text-slate-900 dark:text-white", children: [entry.name, ": ", formatINR(entry.value)] }, i)))] }));
};
export function ChallanPayReportsTab() {
    return (_jsxs("div", { className: "px-8 lg:px-12 pb-8 space-y-6", children: [_jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(StatCard, { icon: Users, label: "Total Users", value: "12,75,545", accent: "cyan" }), _jsx(StatCard, { icon: FileText, label: "Total Challans", value: "31,12,776", sub: "Online + Court", accent: "violet" }), _jsx(StatCard, { icon: IndianRupee, label: "Total Challan Value", value: "570.97 Cr", accent: "emerald" }), _jsx(StatCard, { icon: CreditCard, label: "Payment Value", value: "6,31,33,735", sub: "27,814 payments", accent: "amber" })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4", children: [_jsx(StatCard, { icon: Users, label: "Paid Customers", value: "27,825", accent: "cyan" }), _jsx(StatCard, { icon: AlertCircle, label: "Total Incidents", value: "43,192", accent: "rose" }), _jsx(StatCard, { icon: Gift, label: "Rewards Availed", value: "27,825", sub: '\u20B9 2,64,45,715 amount', accent: "emerald" }), _jsx(StatCard, { icon: Car, label: "Vehicle Numbers", value: "0", accent: "violet" })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-6", children: [_jsxs("div", { className: "lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-4", children: "Challan Distribution" }), _jsx(ResponsiveContainer, { width: "100%", height: 260, children: _jsxs(PieChart, { children: [_jsx(Pie, { data: challanPieData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 100, paddingAngle: 3, dataKey: "value", stroke: "none", children: challanPieData.map((_entry, index) => (_jsx(Cell, { fill: PIE_COLORS[index % PIE_COLORS.length] }, index))) }), _jsx(Legend, { verticalAlign: "bottom", height: 36, formatter: (value) => (_jsx("span", { className: "text-xs text-slate-600 dark:text-slate-400", children: value })) }), _jsx(Tooltip, { content: ({ active, payload }) => {
                                                if (!active || !payload?.length)
                                                    return null;
                                                const d = payload[0];
                                                return (_jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400", children: d.name }), _jsx("p", { className: "text-sm font-bold text-slate-900 dark:text-white", children: formatINR(d.value) })] }));
                                            } })] }) })] }), _jsxs("div", { className: "lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-4", children: "Challan Count by Type" }), _jsx(ResponsiveContainer, { width: "100%", height: 260, children: _jsxs(BarChart, { data: challanBreakdown, barSize: 40, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", vertical: false }), _jsx(XAxis, { dataKey: "name", tick: { fontSize: 12, fill: '#64748b' }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 11, fill: '#64748b' }, axisLine: false, tickLine: false, tickFormatter: (v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }), _jsxs(Bar, { dataKey: "count", name: "Count", radius: [6, 6, 0, 0], children: [challanBreakdown.map((_entry, index) => (_jsx(Cell, { fill: BAR_COLORS[index % BAR_COLORS.length] }, index))), _jsx(LabelList, { dataKey: "count", position: "top", formatter: formatCompact, style: { fontSize: 11, fontWeight: 600, fill: '#475569' } })] })] }) })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-4", children: "Challan Value by Type" }), _jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(BarChart, { data: challanBreakdown, barSize: 36, layout: "vertical", children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", horizontal: false }), _jsx(XAxis, { type: "number", tick: { fontSize: 11, fill: '#64748b' }, axisLine: false, tickLine: false, tickFormatter: (v) => v >= 10000000 ? `${(v / 10000000).toFixed(0)} Cr` : v >= 100000 ? `${(v / 100000).toFixed(0)} L` : formatINR(v) }), _jsx(YAxis, { type: "category", dataKey: "name", tick: { fontSize: 12, fill: '#64748b' }, axisLine: false, tickLine: false, width: 110 }), _jsx(Tooltip, { content: ({ active, payload, label }) => {
                                                if (!active || !payload?.length)
                                                    return null;
                                                return (_jsxs("div", { className: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg px-4 py-3", children: [_jsx("p", { className: "text-xs text-slate-500 dark:text-slate-400 mb-1", children: label }), _jsxs("p", { className: "text-sm font-bold text-slate-900 dark:text-white", children: ['\u20B9', " ", formatINR(payload[0].value)] })] }));
                                            } }), _jsxs(Bar, { dataKey: "value", name: "Value", radius: [0, 6, 6, 0], children: [challanBreakdown.map((_entry, index) => (_jsx(Cell, { fill: BAR_COLORS[index % BAR_COLORS.length] }, index))), _jsx(LabelList, { dataKey: "value", position: "right", formatter: formatCompact, style: { fontSize: 11, fontWeight: 600, fill: '#475569' } })] })] }) })] }), _jsxs("div", { className: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5", children: [_jsx("h3", { className: "text-sm font-semibold text-slate-900 dark:text-white mb-4", children: "Customer & Account Metrics" }), _jsx(ResponsiveContainer, { width: "100%", height: 280, children: _jsxs(BarChart, { data: customerBarData, barSize: 48, children: [_jsx(CartesianGrid, { strokeDasharray: "3 3", stroke: "#e2e8f0", vertical: false }), _jsx(XAxis, { dataKey: "name", tick: { fontSize: 12, fill: '#64748b' }, axisLine: false, tickLine: false }), _jsx(YAxis, { tick: { fontSize: 11, fill: '#64748b' }, axisLine: false, tickLine: false, tickFormatter: (v) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : v }), _jsx(Tooltip, { content: _jsx(CustomTooltip, {}) }), _jsx(Bar, { dataKey: "value", name: "Count", radius: [6, 6, 0, 0], fill: "#06b6d4", children: _jsx(LabelList, { dataKey: "value", position: "top", formatter: formatCompact, style: { fontSize: 11, fontWeight: 600, fill: '#475569' } }) })] }) })] })] })] }));
}
