import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AlertCircle, Users, UserCircle, Scale, Handshake, CreditCard, MessageSquare } from 'lucide-react';
export function ExecutiveDashboard({ data, onCardClick }) {
    const domains = [
        { key: 'incidents', icon: AlertCircle, title: 'Incidents', color: 'cyan', metrics: [{ label: 'Total', value: data.incidents.total }, { label: 'Resolved', value: data.incidents.resolved }, { label: 'Pending', value: data.incidents.pending }] },
        { key: 'leads', icon: Users, title: 'Leads', color: 'violet', metrics: [{ label: 'Total', value: data.leads.total }, { label: 'Converted', value: data.leads.converted }, { label: 'Conversion', value: `${data.leads.conversionRate}%` }] },
        { key: 'subscribers', icon: UserCircle, title: 'Subscribers', color: 'emerald', metrics: [{ label: 'Total', value: data.subscribers.total }, { label: 'Active', value: data.subscribers.active }, { label: 'New', value: data.subscribers.newThisMonth }] },
        { key: 'lawyers', icon: Scale, title: 'Lawyers', color: 'amber', metrics: [{ label: 'Total', value: data.lawyers.total }, { label: 'Active', value: data.lawyers.active }, { label: 'Success Rate', value: `${data.lawyers.avgSuccessRate}%` }] },
        { key: 'partners', icon: Handshake, title: 'Partners', color: 'blue', metrics: [{ label: 'Total', value: data.partners.total }, { label: 'Active', value: data.partners.active }, { label: 'Subscribers', value: data.partners.subscribersOnboarded }] },
        { key: 'payments', icon: CreditCard, title: 'Payments', color: 'green', metrics: [{ label: 'Collections', value: `₹${(data.payments.totalCollections / 100000).toFixed(1)}L` }, { label: 'Pending', value: `₹${(data.payments.pendingPayments / 100000).toFixed(1)}L` }, { label: 'Payouts', value: `₹${(data.payments.payoutsProcessed / 100000).toFixed(1)}L` }] },
        { key: 'disputes', icon: MessageSquare, title: 'Disputes', color: 'rose', metrics: [{ label: 'Total', value: data.disputes.total }, { label: 'Open', value: data.disputes.open }, { label: 'Resolved', value: data.disputes.resolved }] },
    ];
    return (_jsx("div", { className: "px-6 pb-6", children: _jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: domains.map((domain) => {
        const Icon = domain.icon;
        const trend = data[domain.key].trend;
        return (_jsx("button", { onClick: () => onCardClick?.(domain.key), className: "group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 text-left transition-all hover:border-cyan-300 dark:hover:border-cyan-700 hover:shadow-xl hover:shadow-cyan-500/10 hover:-translate-y-1", children: _jsxs("div", { className: "relative", children: [
            _jsxs("div", { className: "flex items-center justify-between mb-6", children: [
                _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl", children: _jsx(Icon, { className: "w-5 h-5 text-slate-600 dark:text-slate-400" }) }), _jsx("h3", { className: "text-base font-semibold text-slate-900 dark:text-white", children: domain.title })] }),
                _jsxs("div", { className: `px-2.5 py-1 rounded-full text-xs font-semibold ${trend > 0 ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : trend < 0 ? 'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-400'}`, children: [trend > 0 ? '+' : '', trend, "%"] })
            ] }),
            _jsx("div", { className: "space-y-3", children: domain.metrics.map((metric, idx) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("span", { className: "text-sm text-slate-600 dark:text-slate-400", children: metric.label }), _jsx("span", { className: "text-base font-semibold text-slate-900 dark:text-white", children: typeof metric.value === 'number' && metric.value >= 1000 ? metric.value.toLocaleString() : metric.value })] }, idx))) })
        ] }) }, domain.key));
    }) }) }));
}
